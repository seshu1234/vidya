-- Create Categories Table
CREATE TABLE IF NOT EXISTS vidya.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    image_url text,
    icon text, 
    color text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vidya.categories ENABLE ROW LEVEL SECURITY;

-- Helper policies
DROP POLICY IF EXISTS "Public read categories" ON vidya.categories;
CREATE POLICY "Public read categories" ON vidya.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON vidya.categories;
CREATE POLICY "Admins can manage categories" ON vidya.categories
  FOR ALL
  USING (vidya.has_role('admin') OR vidya.has_role('super_admin'));

-- Seed with current categories from courses table
INSERT INTO vidya.categories (name, slug)
SELECT DISTINCT category, lower(replace(category, ' & ', '-')) as slug 
FROM vidya.courses 
WHERE category IS NOT NULL
ON CONFLICT (name) DO NOTHING;
