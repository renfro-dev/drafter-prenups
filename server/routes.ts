import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIntakeSchema, generatedPrenupSchema } from "@shared/schema";
import { maskPII, unmaskText } from "./utils/pii-masking";
import { generatePrenup } from "./lib/anthropic-client";
import { generateWordDocument } from "./utils/document-generator";
import { sendEmail, generatePrenupEmail } from "./utils/email-sender";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

        await storage.createGenerationLog({
          intakeId: intakeRecord.id,
          clausesUsed: clauses.map(c => c.clauseId),
          success: true,
        });

        const partyAName = piiMap.names[Object.keys(piiMap.names).find(k => k.startsWith('PARTY_A_')) || ''] || 'Party A';
        const partyBName = piiMap.names[Object.keys(piiMap.names).find(k => k.startsWith('PARTY_B_')) || ''] || 'Party B';

        let emailDelivered = false;
        try {
          await sendEmail({
            to: intake.email,
            subject: 'Your Prenuptial Agreement is Ready - Drafter',
            htmlBody: generatePrenupEmail(partyAName, partyBName),
            attachments: [
              {
                filename: `Prenuptial-Agreement-${partyAName.replace(/\s+/g, '-')}-${partyBName.replace(/\s+/g, '-')}.docx`,
                content: documentBuffer,
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              },
            ],
          });
          
          emailDelivered = true;
          await storage.updateIntakeStatus(intakeRecord.id, 'completed');
        } catch (emailError) {
          console.error('Email delivery failed:', emailError);
          await storage.updateIntakeStatus(intakeRecord.id, 'completed_no_email');
        }

        res.json({
          success: true,
          intakeId: intakeRecord.id,
          emailDelivered,
          downloadUrl: emailDelivered ? undefined : documentUrl,
          message: emailDelivered 
            ? 'Prenup generated successfully. Check your email for the document.'
            : 'Prenup generated successfully. Email delivery failed - you can download the document below.',
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

  // SEO: Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://drafter.com' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const pages = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/intake', changefreq: 'monthly', priority: '0.8' },
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
