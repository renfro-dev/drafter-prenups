// Replit Auth integration - Based on blueprint:javascript_log_in_with_replit
import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

const AUTH_PROVIDER = process.env.AUTH_PROVIDER || "replit";

// Only require Replit envs when using Replit auth
if (AUTH_PROVIDER === "replit" && !process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

// Supabase JWKS resolver (used only when AUTH_PROVIDER === 'supabase')
const getSupabaseJwks = memoize(() => {
  const explicitJwksUrl = process.env.SUPABASE_JWKS_URL;
  const supabaseUrl = process.env.SUPABASE_URL;
  const jwksUrl = explicitJwksUrl || (supabaseUrl ? `${supabaseUrl.replace(/\/$/, "")}/auth/v1/jwks` : undefined);
  if (!jwksUrl) {
    throw new Error("Set SUPABASE_JWKS_URL or SUPABASE_URL to verify Supabase JWTs");
  }
  return createRemoteJWKSet(new URL(jwksUrl));
}, { maxAge: 60 * 60 * 1000 });

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

  // Use direct database URL from environment
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('SUPABASE_DB_URL or DATABASE_URL environment variable is required');
  }

  const sessionStore = new pgStore({
    conString: dbUrl,
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

async function setupAuthReplit(app: Express) {
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
    let state = undefined;
    
    // Validate and encode returnTo URL as state parameter
    if (req.query.returnTo) {
      const returnTo = decodeURIComponent(req.query.returnTo as string);
      // Only allow relative paths starting with "/" to prevent open redirect
      // Also reject protocol-relative URLs starting with "//"
      if (returnTo.startsWith('/') && !returnTo.startsWith('//')) {
        // Encode returnTo as base64 for the state parameter
        state = Buffer.from(JSON.stringify({ returnTo })).toString('base64');
      }
    }
    
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
      state,
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Callback received');
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
      req.logIn(user, (err) => {
        if (err) {
          console.error('[Auth] Login error:', err);
          return next(err);
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] User logged in successfully');
        }
        
        // Extract returnTo from state parameter
        let returnTo = "/";
        if (req.query.state) {
          try {
            const stateData = JSON.parse(Buffer.from(req.query.state as string, 'base64').toString());
            if (stateData.returnTo) {
              // Validate again to prevent tampering
              if (stateData.returnTo.startsWith('/') && !stateData.returnTo.startsWith('//')) {
                returnTo = stateData.returnTo;
              }
            }
          } catch (e) {
            // Failed to parse state - use default "/"
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

const isAuthenticatedReplit: RequestHandler = async (req, res, next) => {
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

// Supabase Bearer JWT verification
const isAuthenticatedSupabase: RequestHandler = async (req: any, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || Array.isArray(authHeader)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const match = authHeader.match(/^Bearer (.+)$/i);
    const token = match?.[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const jwks = getSupabaseJwks();
    const { payload } = await jwtVerify(token, jwks, {
      // Accept default algorithms per JWKS; optionally assert issuer/audience if provided
      issuer: process.env.SUPABASE_JWT_ISSUER || undefined,
      audience: process.env.SUPABASE_JWT_AUDIENCE || undefined,
    });

    // Attach claims in a shape compatible with ensureCanonicalUser
    const claims: JWTPayload & {
      email?: string;
      user_metadata?: Record<string, any>;
    } = payload as any;

    req.user = {
      claims: {
        sub: claims.sub,
        email: claims.email,
        first_name: (claims as any).user_metadata?.first_name || (claims as any).user_metadata?.firstName,
        last_name: (claims as any).user_metadata?.last_name || (claims as any).user_metadata?.lastName,
        profile_image_url: (claims as any).user_metadata?.avatar_url || (claims as any).user_metadata?.picture,
      },
    };

    return next();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Auth] Supabase JWT verification failed:', err);
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Public exports that switch based on AUTH_PROVIDER
export const setupAuth = AUTH_PROVIDER === 'replit'
  ? setupAuthReplit
  : (async (app: Express) => {
      app.set("trust proxy", 1);
      return; // no-op for Supabase
    });

export const isAuthenticated: RequestHandler = AUTH_PROVIDER === 'replit'
  ? isAuthenticatedReplit
  : isAuthenticatedSupabase;

// Optional attachment of user if a valid Supabase Bearer token is present.
// Does not enforce auth; simply sets req.user when verification succeeds.
const attachSupabaseUserIfPresent: RequestHandler = async (req: any, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || Array.isArray(authHeader)) {
      return next();
    }
    const match = (authHeader as string).match(/^Bearer (.+)$/i);
    const token = match?.[1];
    if (!token) {
      return next();
    }

    const jwks = getSupabaseJwks();
    const { payload } = await jwtVerify(token, jwks, {
      issuer: process.env.SUPABASE_JWT_ISSUER || undefined,
      audience: process.env.SUPABASE_JWT_AUDIENCE || undefined,
    });

    const claims: JWTPayload & {
      email?: string;
      user_metadata?: Record<string, any>;
    } = payload as any;

    req.user = {
      claims: {
        sub: claims.sub,
        email: claims.email,
        first_name: (claims as any).user_metadata?.first_name || (claims as any).user_metadata?.firstName,
        last_name: (claims as any).user_metadata?.last_name || (claims as any).user_metadata?.lastName,
        profile_image_url: (claims as any).user_metadata?.avatar_url || (claims as any).user_metadata?.picture,
      },
    };
  } catch (_err) {
    // Silently ignore invalid/absent tokens for optional attach
  } finally {
    next();
  }
};

// Export a no-op in Replit mode; real attach in Supabase mode
export const attachUserIfPresent: RequestHandler = AUTH_PROVIDER === 'replit'
  ? ((req, _res, next) => next())
  : attachSupabaseUserIfPresent;
