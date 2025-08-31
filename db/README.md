# Dev Personality Test - Database

Database schema and migrations for the Dev Personality Test application, using Supabase (PostgreSQL).

## Project Structure

```
/db
├─ migrations/         # Database migration scripts
├─ functions/          # Supabase Edge Functions
├─ policies/           # Row Level Security policies
```

## Supabase Setup

1. Create a new Supabase project
2. Run the migration scripts in the [migrations](migrations/) directory
3. Set up the Row Level Security policies in the [policies](policies/) directory
4. Deploy the Edge Functions in the [functions](functions/) directory

## Tables

- `users` - User information
- `questions` - Test questions
- `answers` - User answers to questions
- `results` - Test results and analysis

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```