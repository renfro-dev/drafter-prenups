import type { RequestHandler } from "express";
import { storage } from "../storage";

/**
 * Middleware that ensures the authenticated user exists in the database
 * and attaches the canonical user record to req.authUser.
 * 
 * This middleware should run after isAuthenticated to ensure:
 * 1. User record exists in database (upserted from OIDC claims)
 * 2. Downstream handlers use the canonical database user.id instead of claims.sub
 * 3. Foreign key constraints are satisfied for all user-related operations
 * 
 * Usage:
 *   app.get('/api/endpoint', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
 *     const userId = req.authUser.id; // Use canonical database ID
 *   });
 */
export const ensureCanonicalUser: RequestHandler = async (req: any, res, next) => {
  try {
    // Ensure user is authenticated (this should be guaranteed by isAuthenticated middleware)
    if (!req.user?.claims) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const claims = req.user.claims;

    // Upsert user and get the canonical database record
    const user = await storage.upsertUser({
      id: claims.sub,
      email: claims.email,
      firstName: claims.first_name,
      lastName: claims.last_name,
      profileImageUrl: claims.profile_image_url,
    });

    // Attach canonical user to request
    req.authUser = user;

    next();
  } catch (error) {
    console.error('[ensureCanonicalUser] Failed to upsert user:', error);
    res.status(500).json({ error: 'Failed to process user authentication' });
  }
};
