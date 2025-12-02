# Environment Variables Setup

Copy this file to `.env` and fill in the values.

```bash
cp ENV_EXAMPLE.md .env
```

## Database Connection
# Connect to your PostgreSQL database (e.g., via Neon, Supabase, or local)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

## Authentication (JWT)
# Generate a strong random string for these secrets (e.g., `openssl rand -base64 32`)
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"

## AI Integration (Google Gemini)
# Get your API key from Google AI Studio: https://aistudio.google.com/
GEMINI_API_KEY="your-gemini-api-key"

## Email Service (Resend)
# Get your API key from Resend: https://resend.com/
RESEND_API_KEY="re_123456789"

## Security (Arcjet)
# Get your API key from Arcjet: https://arcjet.com/
ARCJET_KEY="aj_123456789"

## Background Jobs (Inngest) - Optional for local dev, required for production
# Get your keys from Inngest: https://www.inngest.com/
# INNGEST_EVENT_KEY="your-inngest-event-key"
# INNGEST_SIGNING_KEY="your-inngest-signing-key"
