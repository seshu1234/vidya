-- Migration: Automatic Profile Creation & Admin Setup

-- 0. Helper function to check roles (Self-contained)
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

-- 1. Create a function to handle new user signup
CREATE OR REPLACE FUNCTION vidya.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO vidya.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    ARRAY['user'] -- Default role is always 'user'
  );
  return NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger off auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE vidya.handle_new_user();

-- 3. Script to promote yourself to Super Admin (Replace 'YOUR_EMAIL' with your actual email)
-- This is a template query. Run this separately in SQL Editor.
-- UPDATE vidya.profiles
-- SET role = ARRAY['user', 'admin', 'super admin']
-- WHERE email = 'your_email@example.com';

-- 4. Ensure RLS allows Admins to manage all profiles
DROP POLICY IF EXISTS "Admins can manage all profiles" ON vidya.profiles;
CREATE POLICY "Admins can manage all profiles" ON vidya.profiles
  FOR ALL
  USING (
    vidya.has_role('admin') OR vidya.has_role('super_admin')
  );

-- 5. RPC to delete user by admin
CREATE OR REPLACE FUNCTION vidya.delete_user_by_admin(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the requestor is an admin
  IF NOT (vidya.has_role('admin') OR vidya.has_role('super_admin')) THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  -- Delete from auth.users (this will cascade to profiles due to FK)
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;
