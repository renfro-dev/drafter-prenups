-- Supabase Migration Script
-- This script creates all necessary tables for the Drafter_Nups application

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Session storage table (Required for authentication)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessions(expire);

-- User storage table (Required for authentication)
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
  paid BOOLEAN DEFAULT FALSE,
  payment_amount NUMERIC(10, 2),
  payment_date TIMESTAMP,
  stripe_payment_intent_id TEXT,
  promo_code_used TEXT,
  review_completed BOOLEAN DEFAULT FALSE,
  review_completed_date TIMESTAMP,
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

-- Clause Reviews - tracks which clauses have been reviewed by users
CREATE TABLE IF NOT EXISTS clause_reviews (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  prenup_clause_id VARCHAR NOT NULL REFERENCES prenup_clauses(id),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  reviewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(prenup_clause_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_clause_reviews_clause ON clause_reviews(prenup_clause_id);
CREATE INDEX IF NOT EXISTS idx_clause_reviews_user ON clause_reviews(user_id);

-- Add RLS (Row Level Security) policies if needed
-- Note: You may want to configure RLS policies in Supabase dashboard
-- based on your security requirements
