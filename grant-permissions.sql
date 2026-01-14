-- Grant usage on the schema to standard Supabase roles
GRANT USAGE ON SCHEMA vidya TO anon, authenticated, service_role;

-- Grant all privileges on all tables in the schema to service_role and postgres (superuser)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA vidya TO service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA vidya TO postgres;

-- Ensure future tables also get these grants
ALTER DEFAULT PRIVILEGES IN SCHEMA vidya GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA vidya GRANT ALL ON TABLES TO postgres;

-- Grant select usage to authenticated users (RLS will still apply)
GRANT SELECT ON ALL TABLES IN SCHEMA vidya TO authenticated;

-- Specific grant for profiles if needed explicitly (though ALL TABLES covers it)
GRANT ALL ON TABLE vidya.profiles TO service_role;
