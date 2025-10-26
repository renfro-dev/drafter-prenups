// Replit Auth integration - Based on blueprint:javascript_log_in_with_replit
import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    const claims = tokens.claims();
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Verify function called for user:', claims?.email);
    }
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(claims);
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] User upserted successfully:', claims?.sub);
    }
    verified(null, user);
  };

  for (const domain of process.env
    .REPLIT_DOMAINS!.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`,
      },
      verify,
    );
    passport.use(strategy);
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req, res, next) => {
    // Store returnTo in session instead of OAuth state parameter
    // This is more reliable as the session persists across OAuth redirects
    if (req.query.returnTo) {
      const returnTo = decodeURIComponent(req.query.returnTo as string);
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Login request with returnTo:', returnTo);
        console.log('[Auth] Session ID before save:', req.sessionID);
      }
      // Only allow relative paths starting with "/" to prevent open redirect
      // Also reject protocol-relative URLs starting with "//"
      if (returnTo.startsWith('/') && !returnTo.startsWith('//')) {
        (req.session as any).returnTo = returnTo;
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] Stored returnTo in session:', returnTo);
          console.log('[Auth] Full session data:', JSON.stringify(req.session));
        }
        // Explicitly save session before OAuth redirect to ensure persistence
        req.session.save((err) => {
          if (err) {
            console.error('[Auth] Session save error:', err);
          } else if (process.env.NODE_ENV === 'development') {
            console.log('[Auth] Session saved successfully, ID:', req.sessionID);
          }
          passport.authenticate(`replitauth:${req.hostname}`, {
            prompt: "login consent",
            scope: ["openid", "email", "profile", "offline_access"],
          })(req, res, next);
        });
        return;
      }
    }
    
    // No returnTo parameter, proceed with normal auth
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Callback received');
      console.log('[Auth] Session ID in callback:', req.sessionID);
      console.log('[Auth] Full session data in callback:', JSON.stringify(req.session));
    }
    passport.authenticate(`replitauth:${req.hostname}`, (err: any, user: any) => {
      if (err) {
        console.error('[Auth] Authentication error:', err);
        return res.redirect("/api/login");
      }
      if (!user) {
        console.error('[Auth] No user returned from authentication');
        return res.redirect("/api/login");
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] User authenticated, logging in...');
      }
      
      // Save returnTo BEFORE req.logIn (which regenerates the session)
      const savedReturnTo = (req.session as any).returnTo;
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Saved returnTo before login:', savedReturnTo);
      }
      
      req.logIn(user, (err) => {
        if (err) {
          console.error('[Auth] Login error:', err);
          return next(err);
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] User logged in successfully');
        }
        
        // Retrieve returnTo from saved value (session was regenerated by logIn)
        let returnTo = "/";
        if (savedReturnTo) {
          // Validate again to prevent tampering
          if (savedReturnTo.startsWith('/') && !savedReturnTo.startsWith('//')) {
            returnTo = savedReturnTo;
          }
          if (process.env.NODE_ENV === 'development') {
            console.log('[Auth] Using saved returnTo:', returnTo);
          }
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] Redirecting to:', returnTo);
        }
        return res.redirect(returnTo);
      });
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Auth] isAuthenticated check:', {
      isAuthenticated: req.isAuthenticated(),
      hasUser: !!user,
    });
  }

  if (!req.isAuthenticated() || !user?.expires_at) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Authentication failed: not authenticated or no expiry');
    }
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
