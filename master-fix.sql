-- MASTER ROLE SYNC & FIX (V2 - Safe from Auth Schema Restrictions)
-- This script redefines role-checking functions to use vidya.profiles.

-- 1. vidya.has_role
-- Checks if the current user has the required role in their profile.
CREATE OR REPLACE FUNCTION vidya.has_role(required_role text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM vidya.profiles
    WHERE id = auth.uid()
    AND role @> ARRAY[required_role]
  );
END;
$$;

-- 2. Grant access
GRANT EXECUTE ON FUNCTION vidya.has_role(text) TO anon, authenticated, service_role;

-- 3. Re-apply RLS Policies to ensure they use the new function correctly
DROP POLICY IF EXISTS "Admins can manage courses" ON vidya.courses;
CREATE POLICY "Admins can manage courses" ON vidya.courses
  FOR ALL USING (
    vidya.has_role('admin') OR 
    vidya.has_role('super_admin')
  );

DROP POLICY IF EXISTS "Public view courses" ON vidya.courses;
CREATE POLICY "Public view courses" ON vidya.courses
  FOR SELECT USING (is_published = true OR vidya.has_role('admin'));

-- 4. Re-apply Chapter Policies
DROP POLICY IF EXISTS "Public view chapters" ON vidya.chapters;
CREATE POLICY "Public view chapters" ON vidya.chapters
  FOR SELECT USING (
    is_published = true OR vidya.has_role('admin')
  );

DROP POLICY IF EXISTS "Admins can manage chapters" ON vidya.chapters;
CREATE POLICY "Admins can manage chapters" ON vidya.chapters
  FOR ALL USING (
    vidya.has_role('admin')
  );
