-- COMPLETE DATABASE FIX
-- This script will:
-- 1. Drop and recreate the vidya.profiles table with the CORRECT schema.
-- 2. Backfill profiles from existing auth.users.
-- 3. Re-establish all Sync Triggers and RLS Policies.

-- A. PRE-CLEANUP (Remove constraints if they exist on old table)
ALTER TABLE IF EXISTS vidya.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- B. DROP TABLE (Safe since it is reported empty)
DROP TABLE IF EXISTS vidya.profiles CASCADE;

-- B. CREATE TABLE (With role as text[])
CREATE TABLE vidya.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text,
    full_name text,
    avatar_url text,
    bio text,
    role text[] DEFAULT ARRAY['user'],
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- C. ENABLE RLS
ALTER TABLE vidya.profiles ENABLE ROW LEVEL SECURITY;

-- D. BACKFILL DATA
INSERT INTO vidya.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  (raw_user_meta_data->>'full_name'), 
  ARRAY['user']
FROM auth.users;

-- E. RE-CREATE SYNC FUNCTION & TRIGGER (Profile -> Auth Metadata)
CREATE OR REPLACE FUNCTION vidya.sync_roles_to_metadata()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = 
    jsonb_set(
      COALESCE(raw_app_meta_data, '{}'::jsonb),
      '{roles}',
      to_jsonb(NEW.role)
    )
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_role_change ON vidya.profiles;
CREATE TRIGGER on_profile_role_change
  AFTER INSERT OR UPDATE OF role ON vidya.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE vidya.sync_roles_to_metadata();

-- F. HELPER FUNCTION (has_role)
CREATE OR REPLACE FUNCTION vidya.has_role(required_role text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_roles text[];
BEGIN
  SELECT (raw_app_meta_data->'roles')::text[]
  INTO current_roles
  FROM auth.users
  WHERE id = auth.uid();

  RETURN required_role = ANY(current_roles);
END;
$$;

-- G. RLS POLICIES

-- 1. Users can view own profile
CREATE POLICY "Users can view own profile" ON vidya.profiles
  FOR SELECT USING (auth.uid() = id);

-- 2. Users can update own profile
CREATE POLICY "Users can update own profile" ON vidya.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. Admins can manage all profiles
CREATE POLICY "Admins can manage all profiles" ON vidya.profiles
  FOR ALL
  USING (
    vidya.has_role('admin') OR vidya.has_role('super_admin')
  );

-- H. SYNC MANUAL RUN (To ensure metadata is up to date immediately)
DO $$
DECLARE
  p RECORD;
BEGIN
  FOR p IN SELECT * FROM vidya.profiles LOOP
    UPDATE auth.users
    SET raw_app_meta_data = 
      jsonb_set(
        COALESCE(raw_app_meta_data, '{}'::jsonb),
        '{roles}',
        to_jsonb(p.role)
      )
    WHERE id = p.id;
  END LOOP;
END;
$$;

-- I. RE-APPLY USER SIGNUP TRIGGER (To capture FUTURE signups)
CREATE OR REPLACE FUNCTION vidya.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO vidya.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    ARRAY['user']
  );
  return NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE vidya.handle_new_user();

-- DONE.
-- Remember to run the "Make me admin" update manually if needed:
-- UPDATE vidya.profiles SET role = ARRAY['user', 'admin', 'super_admin'] WHERE email = 'your_email@example.com';
