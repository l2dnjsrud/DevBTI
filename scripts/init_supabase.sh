#!/bin/bash
# init_supabase.sh
# Script to initialize Supabase for the Dev Personality Test

echo "Initializing Supabase project for Dev Personality Test..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "Supabase CLI could not be found. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Initialize Supabase project
echo "Creating Supabase project..."
supabase init

# Link to existing project (if you have one)
# supabase link --project-ref your-project-ref

# Apply migrations
echo "Applying database migrations..."
supabase db push

# Deploy functions
echo "Deploying Edge Functions..."
supabase functions deploy

echo "Supabase initialization complete!"
echo "Don't forget to update your environment variables:"
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"