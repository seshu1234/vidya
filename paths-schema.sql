-- 1. Paths Table
CREATE TABLE IF NOT EXISTS vidya.paths (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    icon text, -- Lucide icon name or URL
    color text, -- Tailwind class or hex
    duration text,
    role text,
    salary_range text,
    companies jsonb DEFAULT '[]'::jsonb, -- Array of strings
    metadata jsonb DEFAULT '{}'::jsonb,
    is_published boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Path Courses (Join Table)
CREATE TABLE IF NOT EXISTS vidya.path_courses (
    path_id uuid REFERENCES vidya.paths(id) ON DELETE CASCADE,
    course_id uuid REFERENCES vidya.courses(id) ON DELETE CASCADE,
    order_index integer DEFAULT 0,
    PRIMARY KEY (path_id, course_id)
);

-- Enable RLS
ALTER TABLE vidya.paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.path_courses ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public Read
CREATE POLICY "Public read paths" ON vidya.paths FOR SELECT USING (true);
CREATE POLICY "Public read path_courses" ON vidya.path_courses FOR SELECT USING (true);

-- Admin Write (Service Role will bypass, but good to have)
-- Assuming admin/service_role usage for CMS

-- Permissions for Service Role & Anon (Updates to fix-permissions logic)
GRANT ALL ON ALL TABLES IN SCHEMA vidya TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA vidya TO anon, authenticated;
