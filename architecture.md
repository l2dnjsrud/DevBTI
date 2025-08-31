# 시스템 아키텍처 문서 (Dev Personality Test)

---

## 1. 전체 아키텍처 개요

```
사용자 브라우저
↓
Next.js (프론트엔드, TypeScript)
↓
API Gateway (Next.js API Routes or FastAPI/Express)
↓
Supabase (PostgreSQL + Auth + Real-time)
↓
분석 엔진 (Python 모듈, 점수 계산 + 유형 매핑)
```

- **프론트엔드**: Next.js, TailwindCSS, shadcn UI
- **백엔드**: FastAPI(Python) 또는 Express(Node.js)
- **DB**: Supabase (PostgreSQL + Auth + Real-time + Edge Functions)
- **AI 모듈**: 질문 문항 변형, 추천 전략 자동화
- **시각화**: Chart.js / D3.js (레이더 차트, 히스토그램, 곡선)

---

## 2. 기능 모듈 구조

### 프론트엔드 (Next.js)

```
/frontend
├─ pages/
│  ├─ index.tsx           # 랜딩 페이지
│  ├─ test/              # 검사 진행 흐름
│  ├─ result/            # 결과 리포트
│  └─ api/               # API proxy
├─ components/
│  ├─ QuestionCard.tsx   # 질문 카드
│  ├─ ProgressBar.tsx    # 진행률 UI
│  ├─ RadarChart.tsx     # 레이더 차트
│  ├─ Histogram.tsx      # 분포 그래프
│  └─ HumorBox.tsx       # 사이드 밈 코멘트
├─ features/
│  ├─ test/              # 검사 로직
│  ├─ scoring/           # 점수 계산 프론트 헬퍼
│  └─ share/             # 공유 이미지 생성
├─ lib/
│  └─ supabase.ts        # Supabase 클라이언트 설정
└─ styles/               # TailwindCSS config
```

---

### 백엔드 (FastAPI or Express)

```
/backend
├─ main.py               # FastAPI 엔트리포인트
├─ routes/
│  ├─ questions.py       # 질문지 제공
│  ├─ submit.py          # 검사 결과 제출
│  └─ result.py          # 결과 리포트 데이터
├─ services/
│  ├─ scoring.py         # 수식 모델 점수 계산
│  ├─ archetype.py       # 유형 매핑 로직
│  └─ recommendation.py  # 개선 전략 생성
├─ lib/
│  └─ supabase_client.py # Supabase 서버 클라이언트
└─ tests/                # 단위 테스트
```

---

### Supabase 구조

```
/db
├─ migrations/           # DB 마이그레이션 스크립트
├─ functions/           # Supabase Edge Functions
│  ├─ calculate-score/  # 점수 계산 로직
│  └─ generate-report/ # 리포트 생성
└─ policies/           # Row Level Security 정책
```

---

## 3. API 설계

### (1) 질문지 제공
- **GET** `/api/questions`
- 응답 예시:
```json
{
  "questions": [
    {
      "id": "Q1",
      "text": "나는 버그를 해결할 때 원인을 끝까지 추적한다.",
      "type": "likert",
      "scale": ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"]
    },
    {
      "id": "Q5", 
      "text": "팀원이 마감 하루 전에 기능 추가를 요청한다. 어떻게 할까?",
      "type": "sjt",
      "options": ["협의 후 조정", "팀장에게 escalation", "무리해서라도 시도", "git push --force 🚨"]
    }
  ]
}
```

### (2) 검사 제출
- **POST** `/api/submit`
- 요청 예시:
```json
{
  "user_id": "anon-123",
  "answers": [
    {"id": "Q1", "value": 4},
    {"id": "Q2", "value": 2},
    {"id": "Q5", "value": "협의 후 조정"}
  ],
  "meta": {
    "role": "backend",
    "experience": "junior"
  }
}
```

- 응답 예시:
```json
{
  "score": {
    "C": 72,
    "P": 68,
    "A": 55,
    "L": 80,
    "M": 60,
    "total": 67
  },
  "archetype": "전략가형 🧠"
}
```

### (3) 결과 리포트 조회
- **GET** `/api/result/{user_id}`
- 응답 예시:
```json
{
  "archetype": "전략가형 🧠",
  "strengths": ["설계와 문제 해결에 강점"],
  "weaknesses": ["협업 적응력 낮음"],
  "recommendations": [
    "작은 개인 프로젝트로 아키텍처 설계 경험 쌓기",
    "코드 리뷰 시 의도 설명 훈련"
  ],
  "charts": {
    "radar": [72, 68, 55, 80, 60],
    "histogram": { "C": {"percentile": 80, "avg": 65} }
  },
  "humor": "너 git push --force 골랐네? 🤡 실무에선 절대 금지!"
}
```

---

## 4. Supabase DB 스키마

### users 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 사용자 식별자 |
| role | TEXT | 직군 (frontend/backend 등) |
| experience | TEXT | 주니어/시니어 등 |
| created_at | TIMESTAMP | 가입일시 |
| auth_user_id | UUID | Supabase Auth 연결 (nullable) |

### answers 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 답변 ID |
| user_id | UUID (FK) | 사용자 ID |
| question_id | TEXT | 문항 ID |
| value | JSONB | 답변 값 (수치 or 선택지) |
| created_at | TIMESTAMP | 답변 일시 |

### results 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 결과 ID |
| user_id | UUID (FK) | 사용자 ID |
| archetype | TEXT | 유형 |
| score | JSONB | 점수 상세 (C,P,A,L,M, total) |
| created_at | TIMESTAMP | 검사일시 |

### questions 테이블 (관리용)
| 필드 | 타입 | 설명 |
|------|------|------|
| id | TEXT (PK) | 문항 ID |
| text | TEXT | 질문 내용 |
| type | TEXT | likert/sjt |
| options | JSONB | 선택지 배열 |
| category | TEXT | 평가 영역 (C,P,A,L,M) |

---

## 5. Supabase 활용 전략

### (1) Authentication
```typescript
// 익명 사용자 처리
const { data: { user } } = await supabase.auth.signInAnonymously()

// 계정 연결 (2차 확장)
const { data: { user } } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})
```

### (2) Real-time 기능
```typescript
// 검사 진행률 실시간 동기화 (팀 검사용)
const channel = supabase.channel('test-progress')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'answers'
  }, (payload) => {
    // 진행률 업데이트
  })
  .subscribe()
```

### (3) Edge Functions
```typescript
// 점수 계산 서버사이드 함수
const { data, error } = await supabase.functions.invoke('calculate-score', {
  body: { answers, meta }
})
```

### (4) Row Level Security
```sql
-- 사용자별 데이터 격리
CREATE POLICY "Users can only see own data" ON results
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);
```

---

## 6. 시각화 컴포넌트

- **RadarChart.tsx** → 5축 점수 표시
- **Histogram.tsx** → 전체 분포 + 사용자 위치 아이콘
- **GrowthCurve.tsx** → Perf(t) vs 개선 시뮬레이션
- **BurnoutGauge.tsx** → 번아웃 위험도 표시 (Low/Med/High)
- **HumorBox.tsx** → 밈 코멘트 사이드 출력

---

## 7. 확장 기능

### (1) 계정 기반 저장
- Supabase Auth 연동으로 결과 히스토리, 재검사 비교

### (2) 직군/레벨 세분화 분포
- 동료 대비 위치 확인, Supabase 집계 함수 활용

### (3) 공유 이미지 생성
- 유형/밈/미니 차트 포함 PNG 자동 렌더링 (Canvas API or Puppeteer)

### (4) B2B 모드
- 팀 단위 보고서, 조직별 분포 (Supabase RLS로 조직별 격리)

---

## 8. 개발 플로우 (스프린트)

### MVP (2주)
- Supabase 프로젝트 생성 및 테이블 설계
- 문항 25개, 응답 저장, 점수 계산, 유형 매핑
- 결과 페이지(유형+레이더 차트+간단 전략)
- 공유 이미지 생성

### 2차 (4주)
- 직군/경력 입력 보상 → 분포 비교
- Supabase Auth 연동 → 재검사 비교
- 번아웃 게이지, 성장 곡선
- Real-time 기능 테스트

### 3차 (B2B 준비)
- 팀 리포트 (RLS 정책 적용)
- 관리용 대시보드 (Supabase Dashboard 활용)
- Edge Functions로 API 확장

---

## 9. Supabase 설정 가이드

### 환경변수
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 클라이언트 초기화
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 마이그레이션 예시
```sql
-- 001_initial_schema.sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT,
  experience TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  auth_user_id UUID REFERENCES auth.users(id)
);

CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,
  category TEXT
);

CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question_id TEXT REFERENCES questions(id),
  value JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  archetype TEXT,
  score JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

이제 이 두 문서로 **Supabase 기반 개발자 성격 진단 서비스** 프로젝트를 바로 킥오프할 수 있어!