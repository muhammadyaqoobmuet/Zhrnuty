-- Enable UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Leave as-is for future use)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL, -- from Clerk
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  plan TEXT DEFAULT 'free', -- 'free' or 'premium'
  paddle_customer_id VARCHAR(255), -- from Paddle
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ✅ FIXED: 2. PDF SUMMARIES TABLE
-- Changed `user_id UUID` → `user_id TEXT`
-- Removed foreign key for now
CREATE TABLE pdf_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- using Clerk user id directly like "user_abc123"
  original_file_url TEXT NOT NULL,
  summary_text TEXT,
  title TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ✅ FIXED: 3. PAYMENTS TABLE
-- Same fix here: change `user_id UUID` → `user_id TEXT`
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- using Clerk user id directly
  paddle_payment_id VARCHAR(255) UNIQUE NOT NULL,
  amount INTEGER NOT NULL, -- in cents, e.g., 700 for $7
  currency VARCHAR(10) DEFAULT 'USD',
  status TEXT NOT NULL, -- e.g., 'completed', 'failed'
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. TRIGGER FUNCTION TO AUTO-UPDATE 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. TRIGGERS
CREATE TRIGGER trg_users_updated
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_pdfs_updated
  BEFORE UPDATE ON pdf_summaries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_payments_updated
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
