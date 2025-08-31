-- 001_rls_policies.sql
-- Row Level Security policies for the Dev Personality Test

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can only see own data" ON results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can only insert own answers" ON answers
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can only see own answers" ON answers
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow public read access to questions (they are static)
CREATE POLICY "Public read access to questions" ON questions
  FOR SELECT USING (true);

-- Allow public read access to users (for anonymous users)
CREATE POLICY "Public read access to users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Public insert access to users" ON users
  FOR INSERT WITH CHECK (true);