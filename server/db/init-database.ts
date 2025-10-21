import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL!);

// Inline SQL for all tables - no file dependencies needed for production
const CREATE_TABLES_SQL = `
-- Session storage table (Required for Replit Auth)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessions(expire);

-- User storage table (Required for Replit Auth)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email VARCHAR UNIQUE,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Intake table - stores user prenup intake data
CREATE TABLE IF NOT EXISTS intakes (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'CA',
  party_a_name TEXT,
  party_b_name TEXT,
  party_a_user_id VARCHAR REFERENCES users(id),
  party_b_user_id VARCHAR REFERENCES users(id),
  wedding_date TEXT,
  intake_data JSONB NOT NULL,
  masked_data JSONB,
  pii_map JSONB,
  prenup_doc_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intakes_email ON intakes(email);
CREATE INDEX IF NOT EXISTS idx_intakes_status ON intakes(status);

-- Clauses table - stores jurisdiction-specific legal clauses
CREATE TABLE IF NOT EXISTS clauses (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  clause_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  text_normalized TEXT NOT NULL,
  applicable_when JSONB,
  version TEXT NOT NULL DEFAULT '1.0',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clauses_jurisdiction ON clauses(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_clauses_category ON clauses(category);

-- Generation logs - tracks AI generation attempts
CREATE TABLE IF NOT EXISTS generation_logs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  intake_id VARCHAR NOT NULL REFERENCES intakes(id),
  clauses_used JSONB,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_generation_logs_intake ON generation_logs(intake_id);

-- Prenup Clauses - parsed clauses from generated documents for collaborative review
CREATE TABLE IF NOT EXISTS prenup_clauses (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  intake_id VARCHAR NOT NULL REFERENCES intakes(id),
  clause_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  legal_text TEXT NOT NULL,
  plain_explanation TEXT,
  category TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prenup_clauses_intake ON prenup_clauses(intake_id);

-- Clause Comments - comments from either party on specific clauses
CREATE TABLE IF NOT EXISTS clause_comments (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  prenup_clause_id VARCHAR NOT NULL REFERENCES prenup_clauses(id),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clause_comments_clause ON clause_comments(prenup_clause_id);
CREATE INDEX IF NOT EXISTS idx_clause_comments_user ON clause_comments(user_id);

-- Clause Flags - flags for clauses that need discussion
CREATE TABLE IF NOT EXISTS clause_flags (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  prenup_clause_id VARCHAR NOT NULL REFERENCES prenup_clauses(id),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  reason TEXT,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clause_flags_clause ON clause_flags(prenup_clause_id);
CREATE INDEX IF NOT EXISTS idx_clause_flags_user ON clause_flags(user_id);

-- Clause Questions - Q&A threads with AI for specific clauses
CREATE TABLE IF NOT EXISTS clause_questions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  prenup_clause_id VARCHAR NOT NULL REFERENCES prenup_clauses(id),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  question TEXT NOT NULL,
  answer TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clause_questions_clause ON clause_questions(prenup_clause_id);
CREATE INDEX IF NOT EXISTS idx_clause_questions_user ON clause_questions(user_id);
`;

export async function initializeDatabase() {
  console.log('Initializing database...');

  try {
    // Execute all CREATE TABLE statements
    // Remove comment lines first, then split into statements
    const lines = CREATE_TABLES_SQL.split('\n').filter(line => !line.trim().startsWith('--'));
    const cleanSQL = lines.join('\n');
    
    const statements = cleanSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await sql(statement);
    }
    console.log('✓ Database tables created');

    // Check if clauses need to be seeded
    const existingClauses = await sql`SELECT COUNT(*) as count FROM clauses`;
    const clauseCount = parseInt(existingClauses[0].count as string);

    if (clauseCount === 0) {
      console.log('Seeding California clauses...');
      
      try {
        const clausesJSON = readFileSync(
          join(__dirname, '../../data/clauses/california-clauses.json'),
          'utf-8'
        );
        const californiaClausesData = JSON.parse(clausesJSON);
        
        for (const clause of californiaClausesData) {
          await sql`
            INSERT INTO clauses (clause_id, title, category, jurisdiction, text_normalized, version)
            VALUES (${clause.clauseId}, ${clause.title}, ${clause.category}, 
                    ${clause.jurisdiction}, ${clause.textNormalized}, ${clause.version})
            ON CONFLICT (clause_id) DO NOTHING
          `;
        }
        
        console.log(`✓ Seeded ${californiaClausesData.length} California clauses`);
      } catch (clauseError) {
        console.warn('Warning: Could not load California clauses:', clauseError);
        console.warn('This is expected in production build. Clauses can be seeded manually.');
      }
    } else {
      console.log(`✓ Database already contains ${clauseCount} clauses`);
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
