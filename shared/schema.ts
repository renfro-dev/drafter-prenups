import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Intake table - stores user prenup intake data
export const intakes = pgTable("intakes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  state: text("state").notNull().default("CA"),
  partyAName: text("party_a_name"),
  partyBName: text("party_b_name"),
  partyAUserId: varchar("party_a_user_id").references(() => users.id),
  partyBUserId: varchar("party_b_user_id").references(() => users.id),
  weddingDate: text("wedding_date"),
  intakeData: jsonb("intake_data").notNull(),
  maskedData: jsonb("masked_data"),
  piiMap: jsonb("pii_map"),
  prenupDocUrl: text("prenup_doc_url"),
  status: text("status").notNull().default("pending"),
  paid: boolean("paid").notNull().default(false),
  paymentAmount: integer("payment_amount"),
  paymentDate: timestamp("payment_date"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  promoCodeUsed: text("promo_code_used"),
  reviewCompleted: boolean("review_completed").notNull().default(false),
  reviewCompletedDate: timestamp("review_completed_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clauses table - stores jurisdiction-specific legal clauses
export const clauses = pgTable("clauses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clauseId: text("clause_id").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  jurisdiction: text("jurisdiction").notNull(),
  textNormalized: text("text_normalized").notNull(),
  applicableWhen: jsonb("applicable_when"),
  version: text("version").notNull().default("1.0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Generation logs - tracks AI generation attempts
export const generationLogs = pgTable("generation_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  intakeId: varchar("intake_id").references(() => intakes.id).notNull(),
  clausesUsed: jsonb("clauses_used"),
  promptTokens: integer("prompt_tokens"),
  completionTokens: integer("completion_tokens"),
  success: boolean("success").notNull().default(false),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Prenup Clauses - parsed clauses from generated documents for collaborative review
export const prenupClauses = pgTable("prenup_clauses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  intakeId: varchar("intake_id").references(() => intakes.id).notNull(),
  clauseNumber: integer("clause_number").notNull(),
  title: text("title").notNull(),
  legalText: text("legal_text").notNull(),
  plainExplanation: text("plain_explanation"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clause Comments - comments from either party on specific clauses
export const clauseComments = pgTable("clause_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prenupClauseId: varchar("prenup_clause_id").references(() => prenupClauses.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clause Flags - flags for clauses that need discussion
export const clauseFlags = pgTable("clause_flags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prenupClauseId: varchar("prenup_clause_id").references(() => prenupClauses.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  reason: text("reason"),
  resolved: boolean("resolved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clause Questions - Q&A threads with AI for specific clauses
export const clauseQuestions = pgTable("clause_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prenupClauseId: varchar("prenup_clause_id").references(() => prenupClauses.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  question: text("question").notNull(),
  answer: text("answer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Clause Reviews - track which clauses users have reviewed
export const clauseReviews = pgTable("clause_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prenupClauseId: varchar("prenup_clause_id").references(() => prenupClauses.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  reviewedAt: timestamp("reviewed_at").defaultNow().notNull(),
});

// Asset schema
export const assetSchema = z.object({
  type: z.enum(["real_property", "bank_account", "investment", "retirement", "business", "vehicle", "personal_property", "other"]),
  description: z.string().min(1, "Description is required"),
  value: z.number().min(0, "Value must be positive"),
  owner: z.enum(["A", "B", "joint"]).default("A"),
});

// Debt schema
export const debtSchema = z.object({
  type: z.enum(["student_loan", "credit_card", "mortgage", "auto_loan", "personal_loan", "business_debt", "other"]),
  description: z.string().min(1, "Description is required"),
  value: z.number().min(0, "Value must be positive"),
  party: z.enum(["A", "B", "joint"]).default("A"),
});

// Complete intake schema
export const insertIntakeSchema = z.object({
  email: z.string().email("Valid email required"),
  state: z.string().default("CA"),
  partyAName: z.string().min(2, "Name required"),
  partyBName: z.string().min(2, "Name required"),
  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  assets: z.array(assetSchema).default([]),
  debts: z.array(debtSchema).default([]),
  spousalSupportWaived: z.boolean().default(false),
  separatePropertyProtection: z.boolean().default(true),
  counselRepresented: z.boolean().default(false),
  additionalProvisions: z.string().optional(),
});

// Clause insert schema
export const insertClauseSchema = createInsertSchema(clauses).omit({
  id: true,
  createdAt: true,
});

// Auth types - Required for Replit Auth
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Types
export type Intake = typeof intakes.$inferSelect;
export type InsertIntake = z.infer<typeof insertIntakeSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type Debt = z.infer<typeof debtSchema>;
export type Clause = typeof clauses.$inferSelect;
export type InsertClause = z.infer<typeof insertClauseSchema>;
export type GenerationLog = typeof generationLogs.$inferSelect;

// Collaborative review types
export type PrenupClause = typeof prenupClauses.$inferSelect;
export type InsertPrenupClause = typeof prenupClauses.$inferInsert;
export type ClauseComment = typeof clauseComments.$inferSelect;
export type InsertClauseComment = typeof clauseComments.$inferInsert;
export type ClauseFlag = typeof clauseFlags.$inferSelect;
export type InsertClauseFlag = typeof clauseFlags.$inferInsert;
export type ClauseQuestion = typeof clauseQuestions.$inferSelect;
export type InsertClauseQuestion = typeof clauseQuestions.$inferInsert;

// PII Masking types
export interface PIIMap {
  names: { [key: string]: string };
  values: { [key: string]: number };
  descriptions: { [key: string]: string };
  dates: { [key: string]: string };
}

// Generated prenup section schema
export const prenupSectionSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export const generatedPrenupSchema = z.object({
  jurisdiction: z.string(),
  sections: z.array(prenupSectionSchema),
});

export type PrenupSection = z.infer<typeof prenupSectionSchema>;
export type GeneratedPrenup = z.infer<typeof generatedPrenupSchema>;
