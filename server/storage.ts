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
} from "@shared/schema";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface IStorage {
  // Auth methods - Required for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Intake methods
  createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake>;
  getIntake(id: string): Promise<Intake | undefined>;
  updateIntakePrenupUrl(id: string, url: string): Promise<void>;
  updateIntakeStatus(id: string, status: string): Promise<void>;
  updateIntakeUsers(id: string, partyAUserId: string, partyBUserId: string): Promise<void>;
  
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
}

export class DatabaseStorage implements IStorage {
  async createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake> {
    const result = await sql`
      INSERT INTO intakes (email, state, party_a_name, party_b_name, wedding_date, intake_data, masked_data, pii_map, status)
      VALUES (${intake.email}, ${intake.state}, ${intake.partyAName}, ${intake.partyBName}, 
              ${intake.weddingDate}, ${JSON.stringify(intake)}, ${JSON.stringify(maskedData)}, 
              ${JSON.stringify(piiMap)}, 'pending')
      RETURNING *
    `;
    return result[0] as Intake;
  }

  async getIntake(id: string): Promise<Intake | undefined> {
    const result = await sql`SELECT * FROM intakes WHERE id = ${id}`;
    return result[0] as Intake | undefined;
  }

  async updateIntakePrenupUrl(id: string, url: string): Promise<void> {
    await sql`UPDATE intakes SET prenup_doc_url = ${url}, status = 'completed' WHERE id = ${id}`;
  }

  async updateIntakeStatus(id: string, status: string): Promise<void> {
    await sql`UPDATE intakes SET status = ${status} WHERE id = ${id}`;
  }

  async getClauses(jurisdiction: string, categories?: string[]): Promise<Clause[]> {
    let result;
    if (categories && categories.length > 0) {
      result = await sql`
        SELECT * FROM clauses 
        WHERE jurisdiction = ${jurisdiction} AND category = ANY(${categories})
        ORDER BY category, clause_id
      `;
    } else {
      result = await sql`
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
    const result = await sql`
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
    const result = await sql`
      INSERT INTO generation_logs (intake_id, clauses_used, prompt_tokens, completion_tokens, success, error_message)
      VALUES (${log.intakeId}, ${JSON.stringify(log.clausesUsed)}, ${log.promptTokens || null}, 
              ${log.completionTokens || null}, ${log.success}, ${log.errorMessage || null})
      RETURNING *
    `;
    return result[0] as GenerationLog;
  }

  // Auth methods - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (!result[0]) return undefined;
    const row = result[0];
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      profileImageUrl: row.profile_image_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } as User;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const result = await sql`
      INSERT INTO users (id, email, first_name, last_name, profile_image_url)
      VALUES (${userData.id}, ${userData.email}, ${userData.firstName || null}, 
              ${userData.lastName || null}, ${userData.profileImageUrl || null})
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
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
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } as User;
  }

  async updateIntakeUsers(id: string, partyAUserId: string, partyBUserId: string): Promise<void> {
    await sql`
      UPDATE intakes 
      SET party_a_user_id = ${partyAUserId}, party_b_user_id = ${partyBUserId}
      WHERE id = ${id}
    `;
  }

  // Collaborative review methods
  async createPrenupClause(clause: InsertPrenupClause): Promise<PrenupClause> {
    const result = await sql`
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
    const result = await sql`
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
    const result = await sql`
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
    await sql`
      UPDATE prenup_clauses 
      SET plain_explanation = ${explanation}
      WHERE id = ${id}
    `;
  }

  async createClauseComment(comment: InsertClauseComment): Promise<ClauseComment> {
    const result = await sql`
      INSERT INTO clause_comments (prenup_clause_id, user_id, comment)
      VALUES (${comment.prenupClauseId}, ${comment.userId}, ${comment.comment})
      RETURNING *
    `;
    const row = result[0];
    return {
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      comment: row.comment,
      createdAt: row.created_at,
    } as ClauseComment;
  }

  async getClauseComments(prenupClauseId: string): Promise<ClauseComment[]> {
    const result = await sql`
      SELECT * FROM clause_comments 
      WHERE prenup_clause_id = ${prenupClauseId}
      ORDER BY created_at
    `;
    return result.map(row => ({
      id: row.id,
      prenupClauseId: row.prenup_clause_id,
      userId: row.user_id,
      comment: row.comment,
      createdAt: row.created_at,
    })) as ClauseComment[];
  }

  async createClauseFlag(flag: InsertClauseFlag): Promise<ClauseFlag> {
    const result = await sql`
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
    const result = await sql`
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
    await sql`
      UPDATE clause_flags 
      SET resolved = TRUE
      WHERE id = ${id}
    `;
  }

  async createClauseQuestion(question: InsertClauseQuestion): Promise<ClauseQuestion> {
    const result = await sql`
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
    await sql`
      UPDATE clause_questions 
      SET answer = ${answer}
      WHERE id = ${id}
    `;
  }

  async getClauseQuestions(prenupClauseId: string): Promise<ClauseQuestion[]> {
    const result = await sql`
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
}

export const storage = new DatabaseStorage();
