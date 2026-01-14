-- Migration: Update role to array and sync to app_metadata

-- 1. Alter vidya.profiles table
DO $$
BEGIN
    -- If role is not an array yet, convert it
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'vidya'
          AND table_name = 'profiles'
          AND column_name = 'role'
          AND data_type = 'text'
    ) THEN
        -- Drop the old check constraint
        ALTER TABLE vidya.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
        
        -- Convert column to text[] using a user-defined conversion (e.g., if value is 'user' -> {'user'})
        ALTER TABLE vidya.profiles 
        ALTER COLUMN role TYPE text[] 
        USING ARRAY[role];
        
        -- Set default
        ALTER TABLE vidya.profiles 
        ALTER COLUMN role SET DEFAULT ARRAY['user'];
    END IF;
END $$;

-- 2. Function to sync profile roles to auth.users raw_app_meta_data
CREATE OR REPLACE FUNCTION vidya.sync_roles_to_metadata()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE auth.users
    SET raw_app_meta_data = 
        coalesce(raw_app_meta_data, '{}'::jsonb) || 
        jsonb_build_object('roles', NEW.role)
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger on profiles update/insert
DROP TRIGGER IF EXISTS on_profile_role_change ON vidya.profiles;
CREATE TRIGGER on_profile_role_change
AFTER INSERT OR UPDATE OF role ON vidya.profiles
FOR EACH ROW
EXECUTE FUNCTION vidya.sync_roles_to_metadata();

-- 4. Sync existing users (one-time)
UPDATE auth.users u
SET raw_app_meta_data = 
    coalesce(raw_app_meta_data, '{}'::jsonb) || 
    jsonb_build_object('roles', p.role)
FROM vidya.profiles p
WHERE u.id = p.id;

-- 5. Helper function to check role in RLS (if needed later)
-- usage: auth.has_role('admin')
CREATE OR REPLACE FUNCTION auth.has_role(required_role text)
RETURNS boolean AS $$
DECLARE
    user_roles text[];
BEGIN
    user_roles := (auth.jwt() -> 'app_metadata' ->> 'roles')::text[];
    RETURN requested_role = ANY(user_roles);
END;
$$ LANGUAGE plpgsql STABLE;
