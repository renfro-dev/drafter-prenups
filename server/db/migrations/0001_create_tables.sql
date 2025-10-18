-- Create intakes table
CREATE TABLE IF NOT EXISTS intakes (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'CA',
  party_a_name TEXT,
  party_b_name TEXT,
  wedding_date TEXT,
  intake_data JSONB NOT NULL,
  masked_data JSONB,
  pii_map JSONB,
  prenup_doc_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create clauses table
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

-- Create generation_logs table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_intakes_email ON intakes(email);
CREATE INDEX IF NOT EXISTS idx_intakes_status ON intakes(status);
CREATE INDEX IF NOT EXISTS idx_clauses_jurisdiction ON clauses(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_clauses_category ON clauses(category);
CREATE INDEX IF NOT EXISTS idx_generation_logs_intake ON generation_logs(intake_id);
