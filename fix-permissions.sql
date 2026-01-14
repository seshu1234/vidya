-- Grant Permissions on Tables
GRANT ALL ON ALL TABLES IN SCHEMA vidya TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA vidya TO service_role;

-- Grant Read Access to Public/Auth Users
GRANT SELECT ON ALL TABLES IN SCHEMA vidya TO anon, authenticated;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA vidya TO anon, authenticated;

-- Allow Authenticated Users to Insert/Update their own data (RLS will filter, but Table Permission is needed)
GRANT INSERT, UPDATE, DELETE ON vidya.profiles TO authenticated;
GRANT INSERT, UPDATE, DELETE ON vidya.enrollments TO authenticated;
GRANT INSERT, UPDATE, DELETE ON vidya.progress TO authenticated;
GRANT INSERT, UPDATE, DELETE ON vidya.onboarding TO authenticated;
