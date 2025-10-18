import { type Intake, type InsertIntake, type Clause, type InsertClause, type GenerationLog, type PIIMap } from "@shared/schema";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface IStorage {
  createIntake(intake: InsertIntake, maskedData: any, piiMap: PIIMap): Promise<Intake>;
  getIntake(id: string): Promise<Intake | undefined>;
  updateIntakePrenupUrl(id: string, url: string): Promise<void>;
  updateIntakeStatus(id: string, status: string): Promise<void>;
  
  getClauses(jurisdiction: string, categories?: string[]): Promise<Clause[]>;
  createClause(clause: InsertClause): Promise<Clause>;
  
  createGenerationLog(log: {
    intakeId: string;
    clausesUsed: any;
    promptTokens?: number;
    completionTokens?: number;
    success: boolean;
    errorMessage?: string;
  }): Promise<GenerationLog>;
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
}

export const storage = new DatabaseStorage();
