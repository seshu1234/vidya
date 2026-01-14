-- Migration: Backfill Missing Profiles for Existing Users

INSERT INTO vidya.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  (raw_user_meta_data->>'full_name'), 
  ARRAY['user']
FROM auth.users
WHERE id NOT IN (SELECT id FROM vidya.profiles)
ON CONFLICT (id) DO NOTHING;

-- Optional: Run the sync script manually after this to ensure these new profiles have their roles synced to metadata
-- (This part repeats the logic from setup-sync.sql for convenience)
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
