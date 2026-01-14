-- Migration: Setup Role Synchronization (Profile -> Auth Metadata)

-- 1. Create function to sync roles to auth.users
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

-- 2. Create trigger on profiles table
DROP TRIGGER IF EXISTS on_profile_role_change ON vidya.profiles;
CREATE TRIGGER on_profile_role_change
  AFTER INSERT OR UPDATE OF role ON vidya.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE vidya.sync_roles_to_metadata();

-- 3. Run a manual sync for existing profiles (just in case)
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
