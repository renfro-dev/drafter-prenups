# Supabase Setup Instructions

## 1. Get Your Database Connection String

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `plaxsvcywyedymqbmpcj`
3. Navigate to: **Project Settings** → **Database**
4. Under "Connection string" section:
   - Choose the **"Connection pooling"** tab (recommended for serverless/connection pooling)
   - **OR** choose **"URI"** tab for direct connection
5. Click **"Copy"** to copy the full connection string
6. It will look something like:
   ```
   postgresql://postgres.plaxsvcywyedymqbmpcj:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
7. **IMPORTANT**: The `[YOUR-PASSWORD]` placeholder needs to be replaced with your actual database password

## 2. Update Your .env File

Open your `.env` file and add this line with your actual connection string:
```bash
SUPABASE_DB_URL=postgresql://postgres.plaxsvcywyedymqbmpcj:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Make sure to replace `[YOUR-PASSWORD]` with your real database password!**

## 3. Run the SQL Migration

Before starting your app, you need to create the database tables:

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase-migration.sql` file
4. Paste it into the SQL editor
5. Click **"Run"** to execute the migration

This will create all the necessary tables for your application.

## 4. Start Your Development Server

Once you've:
- Added the `SUPABASE_DB_URL` to `.env`
- Run the SQL migration in Supabase

You can start your server:
```bash
npm run dev
```

## Troubleshooting

If you get "Tenant or user not found":
- Double-check your database password
- Make sure you're using the connection pooling URL (port 6543), not the direct connection
- Verify the project reference matches your Supabase URL

## Next Steps

After the migration is complete, you may want to:
1. Configure Row Level Security (RLS) policies in Supabase for your tables
2. Set up proper authentication (currently set to `AUTH_PROVIDER=none`)
3. Update the `SESSION_SECRET` in `.env` to a secure random string

## Supabase Auth Setup

1. Enable your desired providers in Supabase Dashboard → Authentication → Providers (e.g., Google OAuth).
2. Add these environment variables:

```bash
# Server
AUTH_PROVIDER=supabase
# Either provide SUPABASE_JWKS_URL directly or SUPABASE_URL to derive it
SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
# Optional (recommended): strict validation
SUPABASE_JWT_AUDIENCE=authenticated
SUPABASE_JWT_ISSUER=https://YOUR-PROJECT-ref.supabase.co/auth/v1

# Client (Vite)
VITE_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Client login flow uses Supabase OAuth. The header "Sign in" triggers Google by default and redirects back to your site.
4. API calls automatically attach `Authorization: Bearer <access_token>` to hit protected endpoints like `/api/auth/user`.

If you need local/offline dev, you can run Supabase locally and point the above variables to your local instance.
