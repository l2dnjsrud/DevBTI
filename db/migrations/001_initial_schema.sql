-- 001_initial_schema.sql
-- Create the initial database schema for the Dev Personality Test

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role TEXT,
  experience TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  auth_user_id UUID REFERENCES auth.users(id)
);

-- Questions table
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,
  category TEXT
);

-- Answers table
CREATE TABLE answers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question_id TEXT REFERENCES questions(id),
  value JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Results table
CREATE TABLE results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  archetype TEXT,
  score JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample questions data
INSERT INTO questions (id, text, type, options, category) VALUES
('Q1', '나는 버그를 해결할 때 원인을 끝까지 추적한다.', 'likert', '["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"]', 'P'),
('Q2', '새로운 기술을 배울 때 문서를 먼저 읽고 이해하려고 노력한다.', 'likert', '["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"]', 'L'),
('Q3', '팀원이 마감 하루 전에 기능 추가를 요청한다. 어떻게 할까?', 'sjt', '["협의 후 조정", "팀장에게 escalation", "무리해서라도 시도", "git push --force 🚨"]', 'A');