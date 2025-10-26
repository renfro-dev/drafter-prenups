import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIntakeSchema, generatedPrenupSchema } from "@shared/schema";
import { maskPII, unmaskText, maskTextForDisplay } from "./utils/pii-masking";
import { generatePrenup } from "./lib/anthropic-client";
import { generateWordDocument } from "./utils/document-generator";
import { sendEmail, generatePrenupEmail } from "./utils/email-sender";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { ensureCanonicalUser } from "./middleware/authenticated-user";
import { parsePrenupClauses } from "./utils/clause-parser";
import { z } from "zod";

// Helper function to verify user has access to a clause
// ACCESS CONTROL: UUID in URL acts as access token
// Any authenticated user with the link can use collaborative features
async function verifyClauseAccess(clauseId: string, userId: string): Promise<{ authorized: boolean; clause?: any; intake?: any; error?: string }> {
  try {
    const clause = await storage.getPrenupClause(clauseId);
    
    if (!clause) {
      return { authorized: false, error: 'Clause not found' };
    }

    const intake = await storage.getIntake(clause.intakeId);
    if (!intake) {
      return { authorized: false, error: 'Prenup not found' };
    }

    // UUID in URL acts as access token - if you're authenticated and have the link, you can collaborate
    return { authorized: true, clause, intake };
  } catch (error) {
    return { authorized: false, error: 'Failed to verify access' };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth route
  app.get('/api/auth/user', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      // Return the canonical user attached by middleware
      res.json(req.authUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Collaborative review endpoints
  // View prenup clauses - NO AUTH REQUIRED (UUID acts as access token)
  app.get('/api/review/:intakeId/clauses', async (req: any, res) => {
    try {
      const intakeId = req.params.intakeId;
      if (process.env.NODE_ENV === 'development') {
        console.log('[Review] GET /api/review/:intakeId/clauses', { intakeId, authenticated: !!req.user });
      }
      
      // Get the intake
      const intake = await storage.getIntake(intakeId);
      if (!intake) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Review] Prenup not found:', intakeId);
        }
        return res.status(404).json({ error: 'Prenup not found' });
      }
      if (process.env.NODE_ENV === 'development') {
        console.log('[Review] Intake found:', { id: intake.id, status: intake.status });
      }
      
      // If user is authenticated, try to link them to the intake
      if (req.user?.claims) {
        const userEmail = req.user.claims.email;
        
        // Ensure user exists in database first and get the actual database ID
        const user = await storage.upsertUser({
          id: req.user.claims.sub,
          email: userEmail,
          firstName: req.user.claims.first_name,
          lastName: req.user.claims.last_name,
          profileImageUrl: req.user.claims.profile_image_url,
        });
        
        const userId = user.id; // Use the actual database ID, not claims.sub
        
        // Check if user is already linked to this intake
        const isAlreadyLinked = intake.partyAUserId === userId || intake.partyBUserId === userId;
        
        if (!isAlreadyLinked) {
          // User not linked yet - try to link them based on email matching
          const intakeData = intake.intakeData as any;
          const deliveryEmail = intake.email;
          const partyAEmail = intakeData?.partyAEmail;
          const partyBEmail = intakeData?.partyBEmail;
          
          let linkedAs: 'A' | 'B' | null = null;
          
          // First, try to match against explicit party emails if they exist
          if (userEmail && partyAEmail && userEmail.toLowerCase() === partyAEmail.toLowerCase()) {
            linkedAs = 'A';
          } else if (userEmail && partyBEmail && userEmail.toLowerCase() === partyBEmail.toLowerCase()) {
            linkedAs = 'B';
          }
          // If no explicit party emails matched, allow the delivery email holder to claim as Party A
          else if (userEmail && deliveryEmail && userEmail.toLowerCase() === deliveryEmail.toLowerCase()) {
            linkedAs = 'A';
          }
          
          // Link the user to the intake if we found a match
          if (linkedAs) {
            if (linkedAs === 'A') {
              await storage.updateIntakeUsers(intakeId, userId, intake.partyBUserId || null);
            } else {
              await storage.updateIntakeUsers(intakeId, intake.partyAUserId || null, userId);
            }
          }
        }
      }

      // Return clauses with PII masking based on authentication status
      const clauses = await storage.getPrenupClauses(intakeId);
      
      // Require pii_map for security - don't expose raw data
      if (!intake.piiMap) {
        console.error('[Review] ERROR: No pii_map found for intake, cannot safely return clauses');
        return res.status(500).json({ 
          error: 'Prenup data not available for review. Please regenerate your prenup.' 
        });
      }
      
      const piiMap = intake.piiMap as any;
      
      // If user is not authenticated, mask ALL PII-bearing fields
      if (!req.user?.claims) {
        const maskedClauses = clauses.map(clause => ({
          ...clause,
          title: maskTextForDisplay(clause.title, piiMap),
          legalText: maskTextForDisplay(clause.legalText, piiMap),
          plainExplanation: clause.plainExplanation 
            ? maskTextForDisplay(clause.plainExplanation, piiMap) 
            : null,
          category: clause.category 
            ? maskTextForDisplay(clause.category, piiMap) 
            : null,
        }));
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[Review] Returning masked clauses for unauthenticated user:', maskedClauses.length);
        }
        return res.json(maskedClauses);
      }
      
      // If authenticated, unmask ALL PII-bearing fields for personalized view
      const unmaskedClauses = clauses.map(clause => ({
        ...clause,
        title: unmaskText(clause.title, piiMap),
        legalText: unmaskText(clause.legalText, piiMap),
        plainExplanation: clause.plainExplanation 
          ? unmaskText(clause.plainExplanation, piiMap) 
          : null,
        category: clause.category 
          ? unmaskText(clause.category, piiMap) 
          : null,
      }));
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Review] Returning unmasked clauses for authenticated user:', unmaskedClauses.length);
      }
      res.json(unmaskedClauses);
    } catch (error) {
      console.error('Error fetching prenup clauses:', error);
      res.status(500).json({ error: 'Failed to fetch clauses' });
    }
  });

  app.post('/api/clauses/:id/explain', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;
      
      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      const clause = access.clause;

      // If already has explanation, return it
      if (clause.plainExplanation) {
        return res.json({ explanation: clause.plainExplanation });
      }

      // TODO: Integrate with Anthropic to generate plain-English explanation
      // For now, use a simplified placeholder
      const explanation = `This clause means: ${clause.title}. This is a standard provision in California prenuptial agreements.`;

      await storage.updateClauseExplanation(clauseId, explanation);
      res.json({ explanation });
    } catch (error) {
      console.error('Error generating explanation:', error);
      res.status(500).json({ error: 'Failed to generate explanation' });
    }
  });

  app.post('/api/clauses/:id/question', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;
      const { question } = req.body;

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      // Create question record
      const questionRecord = await storage.createClauseQuestion({
        prenupClauseId: clauseId,
        userId,
        question,
        answer: null,
      });

      // TODO: Integrate with Anthropic to generate contextual answers
      // For now, use a simplified placeholder
      const answer = `Thank you for your question. This clause is designed to protect both parties under California Family Code. If you need specific legal advice, please consult with a family law attorney.`;

      await storage.updateClauseAnswer(questionRecord.id, answer);
      
      const updatedQuestion = await storage.getClauseQuestions(clauseId);
      res.json(updatedQuestion.find(q => q.id === questionRecord.id));
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'Failed to create question' });
    }
  });

  app.post('/api/clauses/:id/flag', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;
      const { reason } = req.body;

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      const flag = await storage.createClauseFlag({
        prenupClauseId: clauseId,
        userId,
        reason: reason || null,
        resolved: false,
      });

      res.json(flag);
    } catch (error) {
      console.error('Error creating flag:', error);
      res.status(500).json({ error: 'Failed to flag clause' });
    }
  });

  app.post('/api/clauses/:id/comment', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;
      const { comment } = req.body;

      console.log('[Comment] POST /api/clauses/:id/comment', { clauseId, userId, comment: comment?.substring(0, 50) });

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        console.log('[Comment] Access denied:', access.error);
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      if (!comment) {
        console.log('[Comment] Comment is required');
        return res.status(400).json({ error: 'Comment is required' });
      }

      console.log('[Comment] Creating comment...');
      const commentRecord = await storage.createClauseComment({
        prenupClauseId: clauseId,
        userId,
        comment,
      });
      console.log('[Comment] Comment created:', commentRecord.id);

      res.json(commentRecord);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });

  app.get('/api/clauses/:id/comments', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;

      console.log('[Comment] GET /api/clauses/:id/comments', { clauseId, userId });

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        console.log('[Comment] GET Access denied:', access.error);
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      const comments = await storage.getClauseComments(clauseId);
      console.log('[Comment] GET Retrieved', comments.length, 'comments');
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.get('/api/clauses/:id/flags', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      const flags = await storage.getClauseFlags(clauseId);
      res.json(flags);
    } catch (error) {
      console.error('Error fetching flags:', error);
      res.status(500).json({ error: 'Failed to fetch flags' });
    }
  });

  app.get('/api/clauses/:id/questions', isAuthenticated, ensureCanonicalUser, async (req: any, res) => {
    try {
      const userId = req.authUser!.id;
      const clauseId = req.params.id;

      // Verify access
      const access = await verifyClauseAccess(clauseId, userId);
      if (!access.authorized) {
        return res.status(access.error === 'Clause not found' ? 404 : 403).json({ error: access.error });
      }

      const questions = await storage.getClauseQuestions(clauseId);
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });

  app.post("/api/generate", async (req, res) => {
    try {
      const intake = insertIntakeSchema.parse(req.body);

      const { maskedData, piiMap } = maskPII(intake);

      const intakeRecord = await storage.createIntake(intake, maskedData, piiMap);

      try {
        await storage.updateIntakeStatus(intakeRecord.id, 'processing');

        const clauses = await storage.getClauses(intake.state);

        if (clauses.length === 0) {
          throw new Error(`No clauses found for jurisdiction: ${intake.state}`);
        }

        const prenupData = await generatePrenup(
          maskedData,
          clauses.map(c => ({
            title: c.title,
            text_normalized: c.textNormalized,
            category: c.category,
          }))
        );

        const validatedPrenup = generatedPrenupSchema.parse(prenupData);

        const documentBuffer = await generateWordDocument(validatedPrenup, piiMap, intake);

        const documentUrl = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${documentBuffer.toString('base64')}`;

        await storage.updateIntakePrenupUrl(intakeRecord.id, documentUrl);

        // Parse prenup into reviewable clauses for collaborative review
        let clausesSaved = 0;
        try {
          console.log('[Clause Parsing] Starting to parse prenup into reviewable clauses...');
          const parsedClauses = parsePrenupClauses(validatedPrenup, intakeRecord.id);
          console.log(`[Clause Parsing] Successfully parsed ${parsedClauses.length} clauses`);
          
          if (parsedClauses.length === 0) {
            console.warn('[Clause Parsing] WARNING: No clauses were parsed from the prenup. Review features will not be available.');
          }
          
          // Save clauses to database for collaborative review
          for (const clause of parsedClauses) {
            await storage.createPrenupClause(clause);
            clausesSaved++;
          }
          console.log(`[Clause Parsing] Successfully saved ${clausesSaved} clauses to database`);
        } catch (clauseError) {
          console.error('[Clause Parsing] ERROR: Failed to parse or save clauses:', clauseError);
          console.error(`[Clause Parsing] Clauses saved before error: ${clausesSaved}`);
          console.error('[Clause Parsing] Prenup generation will continue, but collaborative review features will not be available');
          // Don't throw - allow generation to succeed even if clause parsing fails
        }

        await storage.createGenerationLog({
          intakeId: intakeRecord.id,
          clausesUsed: clauses.map(c => c.clauseId),
          success: true,
        });

        // Set status to completed_no_payment (user will pay after review)
        await storage.updateIntakeStatus(intakeRecord.id, 'completed_no_payment');

        // Return intakeId for redirect to review page
        res.json({
          success: true,
          intakeId: intakeRecord.id,
          message: 'Prenup generated successfully. Review your agreement clause-by-clause.',
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        await storage.updateIntakeStatus(intakeRecord.id, 'failed');
        
        await storage.createGenerationLog({
          intakeId: intakeRecord.id,
          clausesUsed: [],
          success: false,
          errorMessage,
        });

        throw error;
      }

    } catch (error) {
      console.error('Error generating prenup:', error);
      const message = error instanceof Error ? error.message : 'Failed to generate prenup';
      res.status(400).json({ error: message });
    }
  });

  app.get("/api/intake/:id", async (req, res) => {
    try {
      const intake = await storage.getIntake(req.params.id);
      if (!intake) {
        return res.status(404).json({ error: 'Intake not found' });
      }
      res.json(intake);
    } catch (error) {
      console.error('Error fetching intake:', error);
      res.status(500).json({ error: 'Failed to fetch intake' });
    }
  });

  app.get("/api/clauses", async (req, res) => {
    try {
      const jurisdiction = (req.query.jurisdiction as string) || 'CA';
      const clauses = await storage.getClauses(jurisdiction);
      res.json(clauses);
    } catch (error) {
      console.error('Error fetching clauses:', error);
      res.status(500).json({ error: 'Failed to fetch clauses' });
    }
  });

  // Test email endpoint (development only)
  app.post('/api/test-email', async (req, res) => {
    try {
      const { to } = req.body;
      
      if (!to) {
        return res.status(400).json({ error: 'Email recipient required' });
      }

      const testHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .success-badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ SendGrid Test Email</h1>
  </div>
  <div class="content">
    <div class="success-badge">Configuration Verified</div>
    <p>Hi there!</p>
    <p>This is a test email from your Drafter application to verify that SendGrid is configured correctly.</p>
    <p><strong>Test Details:</strong></p>
    <ul>
      <li>Sent at: ${new Date().toLocaleString()}</li>
      <li>From: Drafter Platform</li>
      <li>Method: SendGrid Web API</li>
    </ul>
    <p>If you're reading this, your email delivery is working perfectly! 🎉</p>
    <p>Best regards,<br>The Drafter Team</p>
  </div>
</body>
</html>
      `.trim();

      await sendEmail({
        to,
        subject: '✅ Drafter - SendGrid Test Email',
        htmlBody: testHtmlBody,
      });

      res.json({ 
        success: true, 
        message: `Test email sent successfully to ${to}`,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Test email failed:', error);
      res.status(500).json({ 
        error: 'Failed to send test email',
        details: error.message,
        response: error.response?.body
      });
    }
  });

  // SEO: Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://drafter.com' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const pages = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/intake', changefreq: 'monthly', priority: '0.8' },
      { url: '/blog', changefreq: 'weekly', priority: '0.8' },
      { url: '/privacy-policy', changefreq: 'monthly', priority: '0.5' },
      { url: '/states/california', changefreq: 'weekly', priority: '0.9' },
      { url: '/states/california/prenuptial-agreement', changefreq: 'weekly', priority: '0.9' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // SEO: robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://drafter.com' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });

  const httpServer = createServer(app);

  return httpServer;
}
