
-- Create Tools Table
CREATE TABLE IF NOT EXISTS vidya.tools (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    category_id uuid REFERENCES vidya.categories(id),
    category_name text, -- Denormalized for convenience
    image_url text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vidya.tools ENABLE ROW LEVEL SECURITY;

-- Helper policies
DROP POLICY IF EXISTS "Public read tools" ON vidya.tools;
CREATE POLICY "Public read tools" ON vidya.tools FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage tools" ON vidya.tools;
CREATE POLICY "Admins can manage tools" ON vidya.tools
  FOR ALL
  USING (vidya.has_role('admin') OR vidya.has_role('super_admin'));
