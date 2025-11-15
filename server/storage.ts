import { 
  type Intake, 
  type InsertIntake, 
  type Clause, 
  type InsertClause, 
  type GenerationLog, 
  type PIIMap,
  type User,
  type UpsertUser,
  type PrenupClause,
  type InsertPrenupClause,
  type ClauseComment,
  type InsertClauseComment,
  type ClauseFlag,
  type InsertClauseFlag,
  type ClauseQuestion,
  type InsertClauseQuestion,
  type ClauseReview,
  type InsertClauseReview,
} from "@shared/schema";
import postgres from "postgres";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Lazy initialization of database connection
let sql: ReturnType<typeof postgres>;

function getDb() {
  if (!sql) {
    // Use direct database URL from environment
    const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('SUPABASE_DB_URL or DATABASE_URL environment variable is required');
    }

    sql = postgres(dbUrl, {
      ssl: "require",
    });
  }
  return sql;
}

export interface IStorage {
  // Auth methods - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  markWelcomeEmailSent(userId: string): Promise<void>;
  
  // Terms acceptances
  createTermsAcceptance(data: {
    email: string;
    partyAName: string;
    partyBName: string;
    ip?: string | null;
    userAgent?: string | null;
    version?: string | null;
    userId?: string | null;
  }): Promise<void>;
  hasAcceptedTerms(email: string): Promise<boolean>;
  
  // Intake methods
  createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake>;
  getIntake(id: string): Promise<Intake | undefined>;
  updateIntakePrenupUrl(id: string, url: string): Promise<void>;
  updateIntakeStatus(id: string, status: string): Promise<void>;
  updateIntakeReviewCompleted(id: string, completed: boolean): Promise<void>;
  updateIntakeUsers(id: string, partyAUserId: string | null, partyBUserId: string | null): Promise<void>;
  
  // Legal clause library methods
  getClauses(jurisdiction: string, categories?: string[]): Promise<Clause[]>;
  createClause(clause: InsertClause): Promise<Clause>;
  
  // Generation log methods
  createGenerationLog(log: {
    intakeId: string;
    clausesUsed: any;
    promptTokens?: number;
    completionTokens?: number;
    success: boolean;
    errorMessage?: string;
  }): Promise<GenerationLog>;
  
  // Collaborative review methods
  createPrenupClause(clause: InsertPrenupClause): Promise<PrenupClause>;
  getPrenupClause(id: string): Promise<PrenupClause | undefined>;
  getPrenupClauses(intakeId: string): Promise<PrenupClause[]>;
  updateClauseExplanation(id: string, explanation: string): Promise<void>;
  
  createClauseComment(comment: InsertClauseComment): Promise<ClauseComment>;
  getClauseComments(prenupClauseId: string): Promise<ClauseComment[]>;
  
  createClauseFlag(flag: InsertClauseFlag): Promise<ClauseFlag>;
  getClauseFlags(prenupClauseId: string): Promise<ClauseFlag[]>;
  resolveClauseFlag(id: string): Promise<void>;
  
  createClauseQuestion(question: InsertClauseQuestion): Promise<ClauseQuestion>;
  updateClauseAnswer(id: string, answer: string): Promise<void>;
  getClauseQuestions(prenupClauseId: string): Promise<ClauseQuestion[]>;
  
  createClauseReview(review: InsertClauseReview): Promise<ClauseReview>;
  getClauseReview(prenupClauseId: string, userId: string): Promise<ClauseReview | undefined>;
  getUserReviewedClauses(userId: string, intakeId: string): Promise<string[]>;
  getReviewProgress(intakeId: string): Promise<{ total: number; reviewed: number }>;
}

export class DatabaseStorage implements IStorage {
  async createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake> {
    const result = await getDb()`
      INSERT INTO intakes (email, state, party_a_name, party_b_name, wedding_date, intake_data, masked_data, pii_map, status)
      VALUES (${intake.email}, ${intake.state}, ${intake.partyAName}, ${intake.partyBName}, 
              ${intake.weddingDate}, ${JSON.stringify(intake)}, ${JSON.stringify(maskedData)}, 
              ${JSON.stringify(piiMap)}, 'pending')
      RETURNING *
    `;
    return result[0] as Intake;
  }

  async getIntake(id: string): Promise<Intake | undefined> {
    const result = await getDb()`SELECT * FROM intakes WHERE id = ${id}`;
    if (!result[0]) return undefined;

    const row = result[0];
    return {
      id: row.id,
      email: row.email,
      state: row.state,
      partyAName: row.party_a_name,
      partyBName: row.party_b_name,
      partyAUserId: row.party_a_user_id,
      partyBUserId: row.party_b_user_id,
      weddingDate: row.wedding_date,
      intakeData: typeof row.intake_data === 'string' ? JSON.parse(row.intake_data) : row.intake_data,
      maskedData: typeof row.masked_data === 'string' ? JSON.parse(row.masked_data) : row.masked_data,
      piiMap: typeof row.pii_map === 'string' ? JSON.parse(row.pii_map) : row.pii_map,
      prenupDocUrl: row.prenup_doc_url,
      status: row.status,
      paid: row.paid,
      paymentAmount: row.payment_amount,
      paymentDate: row.payment_date,
      stripePaymentIntentId: row.stripe_payment_intent_id,
      promoCodeUsed: row.promo_code_used,
      reviewCompleted: row.review_completed,
      reviewCompletedDate: row.review_completed_date,
      createdAt: row.created_at,
    } as Intake;
  }

  async updateIntakePrenupUrl(id: string, url: string): Promise<void> {
    await getDb()`UPDATE intakes SET prenup_doc_url = ${url}, status = 'completed' WHERE id = ${id}`;
  }

  async updateIntakeStatus(id: string, status: string): Promise<void> {
    await getDb()`UPDATE intakes SET status = ${status} WHERE id = ${id}`;
  }

  async updateIntakeReviewCompleted(id: string, completed: boolean): Promise<void> {
    if (completed) {
      await getDb()`UPDATE intakes SET review_completed = TRUE, review_completed_date = NOW() WHERE id = ${id}`;
    } else {
      await getDb()`UPDATE intakes SET review_completed = FALSE, review_completed_date = NULL WHERE id = ${id}`;
    }
  }

  async getClauses(jurisdiction: string, categories?: string[]): Promise<Clause[]> {
    let result;
    if (categories && categories.length > 0) {
      result = await getDb()`
        SELECT * FROM clauses 
        WHERE jurisdiction = ${jurisdiction} AND category = ANY(${categories})
        ORDER BY category, clause_id
      `;
    } else {
      result = await getDb()`
        SELECT * FROM clauses 
        WHERE jurisdiction = ${jurisdiction}
        ORDER BY category, clause_id
      `;
    }
    
    return result.map(row => ({
      id: row.id,
      clauseId: row.clause_id,
      title: row.title,
      category: row.category,
      jurisdiction: row.jurisdiction,
      textNormalized: row.text_normalized,
      applicableWhen: row.applicable_when,
      version: row.version,
      createdAt: row.created_at,
    })) as Clause[];
  }

  async createClause(clause: InsertClause): Promise<Clause> {
    const result = await getDb()`
      INSERT INTO clauses (clause_id, title, category, jurisdiction, text_normalized, applicable_when, version)
      VALUES (${clause.clauseId}, ${clause.title}, ${clause.category}, ${clause.jurisdiction}, 
              ${clause.textNormalized}, ${clause.applicableWhen ? JSON.stringify(clause.applicableWhen) : null}, 
              ${clause.version})
      RETURNING *
    `;
    return result[0] as Clause;
  }

  async createGenerationLog(log: {
    intakeId: string;
    clausesUsed: any;
    promptTokens?: number;
    completionTokens?: number;
    success: boolean;
    errorMessage?: string;
  }): Promise<GenerationLog> {
    const result = await getDb()`
      INSERT INTO generation_logs (intake_id, clauses_used, prompt_tokens, completion_tokens, success, error_message)
      VALUES (${log.intakeId}, ${JSON.stringify(log.clausesUsed)}, ${log.promptTokens || null}, 
              ${log.completionTokens || null}, ${log.success}, ${log.errorMessage || null})
      RETURNING *
    `;
    return result[0] as GenerationLog;
  }

  // Auth methods - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const result = await getDb()`SELECT * FROM users WHERE id = ${id}`;
    if (!result[0]) return undefined;
    const row = result[0];
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      profileImageUrl: row.profile_image_url,
      welcomeEmailSent: !!row.welcome_email_sent,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } as User;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Handle conflicts on email to support:
    // 1. Same user logging in again (email match)
    // 2. Different OIDC sub but same email (update existing record, keep ID stable)
    // NOTE: We keep the user ID stable to avoid breaking foreign key references
    const result = await getDb()`
      INSERT INTO users (id, email, first_name, last_name, profile_image_url)
      VALUES (${userData.id}, ${userData.email}, ${userData.firstName || null}, 
              ${userData.lastName || null}, ${userData.profileImageUrl || null})
      ON CONFLICT (email) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        profile_image_url = EXCLUDED.profile_image_url,
        updated_at = NOW()
      RETURNING *
    `;
    const row = result[0];
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      profileImageUrl: row.profile_image_url,
      welcomeEmailSent: !!row.welcome_email_sent,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } as User;
  }

  async createTermsAcceptance(data: { email: string; partyAName: string; partyBName: string; ip?: string | null; userAgent?: string | null; version?: string | null; userId?: string | null; }): Promise<void> {
    await getDb()`
      INSERT INTO terms_acceptances (email, party_a_name, party_b_name, ip, user_agent, version, user_id)
      VALUES (${data.email}, ${data.partyAName}, ${data.partyBName}, ${data.ip || null}, ${data.userAgent || null}, ${data.version || null}, ${data.userId || null})
    `;
  }
  async hasAcceptedTerms(email: string): Promise<boolean> {
    const result = await getDb()`SELECT EXISTS(SELECT 1 FROM terms_acceptances WHERE email = ${email}) as ok`;
    return !!result?.[0]?.ok;
  }

  async markWelcomeEmailSent(userId: string): Promise<void> {
    await getDb()`
      UPDATE users
      SET welcome_email_sent = TRUE, updated_at = NOW()
      WHERE id = ${userId}
    `;
  }

  async updateIntakeUsers(id: string, partyAUserId: string | null, partyBUserId: string | null): Promise<void> {
    await getDb()`
      UPDATE intakes 
      SET party_a_user_id = ${partyAUserId}, party_b_user_id = ${partyBUserId}
      WHERE id = ${id}
    `;
  }

  // Collaborative review methods
  async createPrenupClause(clause: InsertPrenupClause): Promise<PrenupClause> {
    const result = await getDb()`
      INSERT INTO prenup_clauses (intake_id, clause_number, title, legal_text, plain_explanation, category)
      VALUES (${clause.intakeId}, ${clause.clauseNumber}, ${clause.title}, ${clause.legalText}, 
              ${clause.plainExplanation || null}, ${clause.category || null})
      RETURNING *
    `;
    const row = result[0];
    return {
      id: row.id,
      intakeId: row.intake_id,
      clauseNumber: row.clause_number,
      title: row.title,
      legalText: row.legal_text,
      plainExplanation: row.plain_explanation,
      category: row.category,
      createdAt: row.created_at,
    } as PrenupClause;
  }

  async getPrenupClause(id: string): Promise<PrenupClause | undefined> {
    const result = await getDb()`
      SELECT * FROM prenup_clauses 
      WHERE id = ${id}
      LIMIT 1
    `;
    if (!result[0]) return undefined;
    const row = result[0];
    return {
      id: row.id,
      intakeId: row.intake_id,
      clauseNumber: row.clause_number,
      title: row.title,
      legalText: row.legal_text,
      plainExplanation: row.plain_explanation,
      category: row.category,
      createdAt: row.created_at,
    } as PrenupClause;
  }

  async getPrenupClauses(intakeId: string): Promise<PrenupClause[]> {
    const result = await getDb()`
      SELECT * FROM prenup_clauses 
      WHERE intake_id = ${intakeId}
      ORDER BY clause_number
    `;
    return result.map(row => ({
      id: row.id,
      intakeId: row.intake_id,
      clauseNumber: row.clause_number,
      title: row.title,
      legalText: row.legal_text,
      plainExplanation: row.plain_explanation,
      category: row.category,
      createdAt: row.created_at,
    })) as PrenupClause[];
  }

  async updateClauseExplanation(id: string, explanation: string): Promise<void> {
    await getDb()`
      UPDATE prenup_clauses 
      SET plain_explanation = ${explanation}
      WHERE id = ${id}
    `;
  }

  async createClauseComment(comment: InsertClauseComment): Promise<ClauseComment> {
    console.log('[Storage] Creating comment:', { prenupClauseId: comment.prenupClauseId, userId: comment.userId });
    const result = await getDb()`
      INSERT INTO clause_comments (prenup_clause_id, user_id, comment)
      VALUES (${comment.prenupClauseId}, ${comment.userId}, ${comment.comment})
      RETURNING *
    `;
    console.log('[Storage] Comment insert result:', result.length, 'rows');
    const row = result[0];
    const commentRecord = {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      comment: row.comment,
      createdAt: row.created_at,
    } as ClauseComment;
    console.log('[Storage] Returning comment:', commentRecord.id);
    return commentRecord;
  }

  async getClauseComments(prenupClauseId: string): Promise<ClauseComment[]> {
    console.log('[Storage] Getting comments for clause:', prenupClauseId);
    const result = await getDb()`
      SELECT * FROM clause_comments 
      WHERE prenup_clause_id = ${prenupClauseId}
      ORDER BY created_at
    `;
    console.log('[Storage] Found', result.length, 'comments');
    return result.map(row => ({
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      comment: row.comment,
      createdAt: row.created_at,
    })) as ClauseComment[];
  }

  async createClauseFlag(flag: InsertClauseFlag): Promise<ClauseFlag> {
    const result = await getDb()`
      INSERT INTO clause_flags (prenup_clause_id, user_id, reason, resolved)
      VALUES (${flag.prenupClauseId}, ${flag.userId}, ${flag.reason || null}, ${flag.resolved || false})
      RETURNING *
    `;
    const row = result[0];
    return {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      reason: row.reason,
      resolved: row.resolved,
      createdAt: row.created_at,
    } as ClauseFlag;
  }

  async getClauseFlags(prenupClauseId: string): Promise<ClauseFlag[]> {
    const result = await getDb()`
      SELECT * FROM clause_flags 
      WHERE prenup_clause_id = ${prenupClauseId}
      ORDER BY created_at
    `;
    return result.map(row => ({
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      reason: row.reason,
      resolved: row.resolved,
      createdAt: row.created_at,
    })) as ClauseFlag[];
  }

  async resolveClauseFlag(id: string): Promise<void> {
    await getDb()`
      UPDATE clause_flags 
      SET resolved = TRUE
      WHERE id = ${id}
    `;
  }

  async createClauseQuestion(question: InsertClauseQuestion): Promise<ClauseQuestion> {
    const result = await getDb()`
      INSERT INTO clause_questions (prenup_clause_id, user_id, question, answer)
      VALUES (${question.prenupClauseId}, ${question.userId}, ${question.question}, ${question.answer || null})
      RETURNING *
    `;
    const row = result[0];
    return {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      question: row.question,
      answer: row.answer,
      createdAt: row.created_at,
    } as ClauseQuestion;
  }

  async updateClauseAnswer(id: string, answer: string): Promise<void> {
    await getDb()`
      UPDATE clause_questions 
      SET answer = ${answer}
      WHERE id = ${id}
    `;
  }

  async getClauseQuestions(prenupClauseId: string): Promise<ClauseQuestion[]> {
    const result = await getDb()`
      SELECT * FROM clause_questions 
      WHERE prenup_clause_id = ${prenupClauseId}
      ORDER BY created_at
    `;
    return result.map(row => ({
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      question: row.question,
      answer: row.answer,
      createdAt: row.created_at,
    })) as ClauseQuestion[];
  }

  async createClauseReview(review: InsertClauseReview): Promise<ClauseReview> {
    const result = await getDb()`
      INSERT INTO clause_reviews (prenup_clause_id, user_id)
      VALUES (${review.prenupClauseId}, ${review.userId})
      ON CONFLICT (prenup_clause_id, user_id) DO NOTHING
      RETURNING *
    `;
    if (result.length === 0) {
      // Already reviewed, fetch existing review
      const existing = await getDb()`
        SELECT * FROM clause_reviews 
        WHERE prenup_clause_id = ${review.prenupClauseId} AND user_id = ${review.userId}
      `;
      const row = existing[0];
      return {
        id: row.id,
        prenupClauseId: row.prenup_clause_id,
        userId: row.user_id,
        reviewedAt: row.reviewed_at,
      } as ClauseReview;
    }
    const row = result[0];
    return {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      reviewedAt: row.reviewed_at,
    } as ClauseReview;
  }

  async getClauseReview(prenupClauseId: string, userId: string): Promise<ClauseReview | undefined> {
    const result = await getDb()`
      SELECT * FROM clause_reviews 
      WHERE prenup_clause_id = ${prenupClauseId} AND user_id = ${userId}
    `;
    if (result.length === 0) {
      return undefined;
    }
    const row = result[0];
    return {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      reviewedAt: row.reviewed_at,
    } as ClauseReview;
  }

  async getUserReviewedClauses(userId: string, intakeId: string): Promise<string[]> {
    const result = await getDb()`
      SELECT cr.prenup_clause_id 
      FROM clause_reviews cr
      JOIN prenup_clauses pc ON cr.prenup_clause_id = pc.id
      WHERE cr.user_id = ${userId} AND pc.intake_id = ${intakeId}
    `;
    return result.map(row => row.prenup_clause_id as string);
  }

  async getReviewProgress(intakeId: string): Promise<{ total: number; reviewed: number }> {
    // Get total clauses for this prenup
    const totalResult = await getDb()`
      SELECT COUNT(*) as count FROM prenup_clauses WHERE intake_id = ${intakeId}
    `;
    const total = parseInt(totalResult[0].count as string);

    // Get count of unique clause reviews (distinct clause_id)
    const reviewedResult = await getDb()`
      SELECT COUNT(DISTINCT cr.prenup_clause_id) as count
      FROM clause_reviews cr
      JOIN prenup_clauses pc ON cr.prenup_clause_id = pc.id
      WHERE pc.intake_id = ${intakeId}
    `;
    const reviewed = parseInt(reviewedResult[0].count as string);

    return { total, reviewed };
  }
}

// ---------------- In-Memory Storage (Local fallback) ----------------

class InMemoryStorage implements IStorage {
  private usersById = new Map<string, User>();
  private usersByEmail = new Map<string, string>();
  private intakes = new Map<string, Intake>();
  private clauses: Clause[] = [];
  private termsAcceptances: Array<{ email: string; partyAName: string; partyBName: string; agreedAt: string; ip?: string | null; ua?: string | null; version?: string | null; userId?: string | null; }> = [];
  private prenupClausesByIntake = new Map<string, PrenupClause[]>();
  private commentsByClause = new Map<string, ClauseComment[]>();
  private flagsByClause = new Map<string, ClauseFlag[]>();
  private questionsByClause = new Map<string, ClauseQuestion[]>();
  private reviewsByClause = new Map<string, ClauseReview[]>();

  constructor() {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const clausesJSON = readFileSync(
        join(__dirname, "../data/clauses/california-clauses.json").replace("/server/server/", "/server/"),
        "utf-8"
      );
      const californiaClausesData = JSON.parse(clausesJSON);
      this.clauses = californiaClausesData.map((c: any): Clause => ({
        id: randomUUID(),
        clauseId: c.clauseId,
        title: c.title,
        category: c.category,
        jurisdiction: c.jurisdiction,
        textNormalized: c.textNormalized,
        applicableWhen: c.applicableWhen,
        version: c.version,
        createdAt: new Date().toISOString() as any,
      }));
      console.log(`[InMemoryStorage] Seeded ${this.clauses.length} California clauses`);
    } catch (e) {
      console.warn('[InMemoryStorage] Could not load California clauses JSON. Review features may be limited.');
      this.clauses = [];
    }
  }

  // Auth
  async getUser(id: string): Promise<User | undefined> {
    return this.usersById.get(id);
  }
  async upsertUser(user: UpsertUser): Promise<User> {
    // Keep ID stable per email
    const existingId = user.email ? this.usersByEmail.get(user.email) : undefined;
    const id = existingId || user.id || randomUUID();
    const existing = this.usersById.get(id);
    const record: User = {
      id,
      email: (user.email || existing?.email || null) as any,
      firstName: (user.firstName ?? existing?.firstName) as any,
      lastName: (user.lastName ?? existing?.lastName) as any,
      profileImageUrl: (user.profileImageUrl ?? existing?.profileImageUrl) as any,
      welcomeEmailSent: existing?.welcomeEmailSent ?? false,
      createdAt: (existing?.createdAt || new Date().toISOString()) as any,
      updatedAt: new Date().toISOString() as any,
    };
    this.usersById.set(id, record);
    if (user.email) this.usersByEmail.set(user.email, id);
    return record;
  }

  async markWelcomeEmailSent(userId: string): Promise<void> {
    const user = this.usersById.get(userId);
    if (user) {
      (user as any).welcomeEmailSent = true;
      (user as any).updatedAt = new Date().toISOString() as any;
      this.usersById.set(userId, user);
    }
  }
  async createTermsAcceptance(data: { email: string; partyAName: string; partyBName: string; ip?: string | null; userAgent?: string | null; version?: string | null; userId?: string | null; }): Promise<void> {
    this.termsAcceptances.push({
      email: data.email,
      partyAName: data.partyAName,
      partyBName: data.partyBName,
      agreedAt: new Date().toISOString(),
      ip: data.ip || null,
      ua: data.userAgent || null,
      version: data.version || null,
      userId: data.userId || null,
    });
  }
  async hasAcceptedTerms(email: string): Promise<boolean> {
    return this.termsAcceptances.some(t => t.email.toLowerCase() === (email || '').toLowerCase());
  }

  // Intake
  async createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake> {
    const id = randomUUID();
    const rec: Intake = {
      id,
      email: intake.email,
      state: intake.state,
      partyAName: intake.partyAName,
      partyBName: intake.partyBName,
      partyAUserId: null as any,
      partyBUserId: null as any,
      weddingDate: intake.weddingDate,
      intakeData: intake as any,
      maskedData,
      piiMap,
      prenupDocUrl: null as any,
      status: 'pending',
      paid: false as any,
      paymentAmount: null as any,
      paymentDate: null as any,
      stripePaymentIntentId: null as any,
      promoCodeUsed: null as any,
      reviewCompleted: false as any,
      reviewCompletedDate: null as any,
      createdAt: new Date().toISOString() as any,
    };
    this.intakes.set(id, rec);
    return rec;
  }
  async getIntake(id: string): Promise<Intake | undefined> {
    return this.intakes.get(id);
  }
  async updateIntakePrenupUrl(id: string, url: string): Promise<void> {
    const rec = this.intakes.get(id);
    if (rec) {
      rec.prenupDocUrl = url as any;
      rec.status = 'completed' as any;
    }
  }
  async updateIntakeStatus(id: string, status: string): Promise<void> {
    const rec = this.intakes.get(id);
    if (rec) rec.status = status as any;
  }
  async updateIntakeReviewCompleted(id: string, completed: boolean): Promise<void> {
    const rec = this.intakes.get(id);
    if (rec) {
      rec.reviewCompleted = completed as any;
      rec.reviewCompletedDate = completed ? new Date().toISOString() as any : null as any;
    }
  }
  async updateIntakeUsers(id: string, partyAUserId: string | null, partyBUserId: string | null): Promise<void> {
    const rec = this.intakes.get(id);
    if (rec) {
      rec.partyAUserId = partyAUserId as any;
      rec.partyBUserId = partyBUserId as any;
    }
  }

  // Clause library
  async getClauses(jurisdiction: string, categories?: string[]): Promise<Clause[]> {
    const list = this.clauses.filter(c => c.jurisdiction === jurisdiction);
    if (categories && categories.length) {
      return list.filter(c => categories.includes(c.category));
    }
    return list;
  }
  async createClause(clause: InsertClause): Promise<Clause> {
    const created: Clause = {
      id: randomUUID(),
      clauseId: clause.clauseId,
      title: clause.title,
      category: clause.category,
      jurisdiction: clause.jurisdiction,
      textNormalized: clause.textNormalized,
      applicableWhen: clause.applicableWhen as any,
      version: clause.version,
      createdAt: new Date().toISOString() as any,
    };
    this.clauses.push(created);
    return created;
  }

  // Generation logs
  async createGenerationLog(log: { intakeId: string; clausesUsed: any; promptTokens?: number | undefined; completionTokens?: number | undefined; success: boolean; errorMessage?: string | undefined; }): Promise<GenerationLog> {
    return {
      id: randomUUID(),
      intakeId: log.intakeId,
      clausesUsed: log.clausesUsed as any,
      promptTokens: log.promptTokens as any,
      completionTokens: log.completionTokens as any,
      success: log.success,
      errorMessage: log.errorMessage as any,
      createdAt: new Date().toISOString() as any,
    } as GenerationLog;
  }

  // Collaborative review
  async createPrenupClause(clause: InsertPrenupClause): Promise<PrenupClause> {
    const rec: PrenupClause = {
      id: randomUUID(),
      intakeId: clause.intakeId,
      clauseNumber: clause.clauseNumber,
      title: clause.title,
      legalText: clause.legalText,
      plainExplanation: clause.plainExplanation || null as any,
      category: clause.category || null as any,
      createdAt: new Date().toISOString() as any,
    };
    const list = this.prenupClausesByIntake.get(clause.intakeId) || [];
    list.push(rec);
    this.prenupClausesByIntake.set(clause.intakeId, list);
    return rec;
  }
  async getPrenupClause(id: string): Promise<PrenupClause | undefined> {
    for (const list of this.prenupClausesByIntake.values()) {
      const found = list.find(c => c.id === id);
      if (found) return found;
    }
    return undefined;
  }
  async getPrenupClauses(intakeId: string): Promise<PrenupClause[]> {
    return [...(this.prenupClausesByIntake.get(intakeId) || [])].sort((a,b) => a.clauseNumber - b.clauseNumber);
    }
  async updateClauseExplanation(id: string, explanation: string): Promise<void> {
    for (const list of this.prenupClausesByIntake.values()) {
      const found = list.find(c => c.id === id);
      if (found) {
        (found as any).plainExplanation = explanation;
        return;
      }
    }
  }

  async createClauseComment(comment: InsertClauseComment): Promise<ClauseComment> {
    const rec: ClauseComment = {
      id: randomUUID(),
      prenupClauseId: comment.prenupClauseId,
      userId: comment.userId,
      comment: comment.comment,
      createdAt: new Date().toISOString() as any,
    };
    const list = this.commentsByClause.get(comment.prenupClauseId) || [];
    list.push(rec);
    this.commentsByClause.set(comment.prenupClauseId, list);
    return rec;
  }
  async getClauseComments(prenupClauseId: string): Promise<ClauseComment[]> {
    return [...(this.commentsByClause.get(prenupClauseId) || [])];
  }

  async createClauseFlag(flag: InsertClauseFlag): Promise<ClauseFlag> {
    const rec: ClauseFlag = {
      id: randomUUID(),
      prenupClauseId: flag.prenupClauseId,
      userId: flag.userId,
      reason: flag.reason || null as any,
      resolved: flag.resolved || false,
      createdAt: new Date().toISOString() as any,
    };
    const list = this.flagsByClause.get(flag.prenupClauseId) || [];
    list.push(rec);
    this.flagsByClause.set(flag.prenupClauseId, list);
    return rec;
  }
  async getClauseFlags(prenupClauseId: string): Promise<ClauseFlag[]> {
    return [...(this.flagsByClause.get(prenupClauseId) || [])];
  }
  async resolveClauseFlag(id: string): Promise<void> {
    for (const list of this.flagsByClause.values()) {
      const found = list.find(f => f.id === id);
      if (found) {
        (found as any).resolved = true;
        return;
      }
    }
  }

  async createClauseQuestion(question: InsertClauseQuestion): Promise<ClauseQuestion> {
    const rec: ClauseQuestion = {
      id: randomUUID(),
      prenupClauseId: question.prenupClauseId,
      userId: question.userId,
      question: question.question,
      answer: question.answer || null as any,
      createdAt: new Date().toISOString() as any,
    };
    const list = this.questionsByClause.get(question.prenupClauseId) || [];
    list.push(rec);
    this.questionsByClause.set(question.prenupClauseId, list);
    return rec;
  }
  async updateClauseAnswer(id: string, answer: string): Promise<void> {
    for (const list of this.questionsByClause.values()) {
      const found = list.find(q => q.id === id);
      if (found) {
        (found as any).answer = answer;
        return;
      }
    }
  }
  async getClauseQuestions(prenupClauseId: string): Promise<ClauseQuestion[]> {
    return [...(this.questionsByClause.get(prenupClauseId) || [])];
  }

  async createClauseReview(review: InsertClauseReview): Promise<ClauseReview> {
    const list = this.reviewsByClause.get(review.prenupClauseId) || [];
    const existing = list.find(r => r.userId === review.userId);
    if (existing) return existing;
    const rec: ClauseReview = {
      id: randomUUID(),
      prenupClauseId: review.prenupClauseId,
      userId: review.userId,
      reviewedAt: new Date().toISOString() as any,
    };
    list.push(rec);
    this.reviewsByClause.set(review.prenupClauseId, list);
    return rec;
  }
  async getClauseReview(prenupClauseId: string, userId: string): Promise<ClauseReview | undefined> {
    const list = this.reviewsByClause.get(prenupClauseId) || [];
    return list.find(r => r.userId === userId);
  }
  async getUserReviewedClauses(userId: string, intakeId: string): Promise<string[]> {
    const cla = this.prenupClausesByIntake.get(intakeId) || [];
    const reviewedIds: string[] = [];
    for (const c of cla) {
      const list = this.reviewsByClause.get(c.id) || [];
      if (list.find(r => r.userId === userId)) reviewedIds.push(c.id);
    }
    return reviewedIds;
  }
  async getReviewProgress(intakeId: string): Promise<{ total: number; reviewed: number; }> {
    const cla = this.prenupClausesByIntake.get(intakeId) || [];
    const total = cla.length;
    const reviewedSet = new Set<string>();
    for (const c of cla) {
      const list = this.reviewsByClause.get(c.id) || [];
      if (list.length > 0) reviewedSet.add(c.id);
    }
    return { total, reviewed: reviewedSet.size };
  }
}

function createStorage(): IStorage {
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[Storage] No SUPABASE_DB_URL/DATABASE_URL found. Using in-memory storage.');
    return new InMemoryStorage();
  }
  return new DatabaseStorage();
}

export const storage: IStorage = createStorage();
