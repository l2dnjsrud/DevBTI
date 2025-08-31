# Project Structure

This document describes the overall structure of the Dev Personality Test project.

## Root Directory

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Backend API (FastAPI or Express)
├── db/                # Database schema, migrations, and functions
├── docs/              # Documentation files
├── tests/             # Test files
├── scripts/           # Utility scripts
├── README.md          # Main project documentation
├── architecture.md    # System architecture documentation
└── vibe_coding_guide.md # Coding guidelines
```

## Frontend Directory

```
frontend/
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   ├── index.tsx      # Home page
│   ├── test.tsx       # Test page
│   └── result.tsx     # Result page
├── components/        # React components
│   ├── ui/            # Basic UI components
│   └── QuestionCard.tsx # Question component
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── styles/            # CSS and Tailwind config
├── public/            # Static assets
├── tests/             # Frontend tests
├── package.json       # Frontend dependencies
└── README.md          # Frontend documentation
```

## Backend Directory

```
backend/
├── main.py            # FastAPI entry point (planned)
├── routes/            # API routes (planned)
├── services/          # Business logic (planned)
├── lib/               # Utilities and clients (planned)
├── tests/             # Backend tests (planned)
└── README.md          # Backend documentation
```

## Database Directory

```
db/
├── migrations/        # Database migration scripts
├── functions/         # Supabase Edge Functions
├── policies/          # Row Level Security policies
└── README.md          # Database documentation
```

## Documentation Directory

```
docs/
├── api.md             # API documentation
├── scoring_algorithm.md # Scoring algorithm documentation
├── ui_components.md   # UI components documentation
├── hooks.md           # Custom hooks documentation
└── services.md        # Services documentation
```

## Tests Directory

```
tests/
├── Button.test.tsx    # Button component tests
├── QuestionCard.test.tsx # QuestionCard component tests
└── useQuestions.test.ts # useQuestions hook tests
```

## Scripts Directory

```
scripts/
├── setup_dev.sh       # Development environment setup
└── init_supabase.sh   # Supabase initialization
```