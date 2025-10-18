import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Intake table - stores user prenup intake data
export const intakes = pgTable("intakes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  state: text("state").notNull().default("CA"),
  partyAName: text("party_a_name"),
  partyBName: text("party_b_name"),
  weddingDate: text("wedding_date"),
  intakeData: jsonb("intake_data").notNull(),
  maskedData: jsonb("masked_data"),
  piiMap: jsonb("pii_map"),
  prenupDocUrl: text("prenup_doc_url"),
  status: text("status").notNull().default("pending"),
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

// Types
export type Intake = typeof intakes.$inferSelect;
export type InsertIntake = z.infer<typeof insertIntakeSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type Debt = z.infer<typeof debtSchema>;
export type Clause = typeof clauses.$inferSelect;
export type InsertClause = z.infer<typeof insertClauseSchema>;
export type GenerationLog = typeof generationLogs.$inferSelect;

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
