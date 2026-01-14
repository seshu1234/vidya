-- Migration: Course Management Schema

-- 0. Cleanup Old Tables (Ensure clean slate)
DROP TABLE IF EXISTS vidya.chapters CASCADE;
DROP TABLE IF EXISTS vidya.courses CASCADE;

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS vidya.courses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    category text,
    image_url text, -- For course thumbnail
    price integer DEFAULT 0, -- Stored in smallest unit (e.g. cents/paise)
    is_published boolean DEFAULT false,
    metadata jsonb DEFAULT '{}'::jsonb, 
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Chapters Table
CREATE TABLE IF NOT EXISTS vidya.chapters (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid REFERENCES vidya.courses(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    slug text NOT NULL, -- URL friendly 
    content text, -- Markdown or descriptions
    video_url text, -- Mux or YouTube
    position integer DEFAULT 0, -- Logic for ordering
    is_free boolean DEFAULT false, -- Preview allowed?
    is_published boolean DEFAULT false, 
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(course_id, slug)
);

-- 3. Enable RLS
ALTER TABLE vidya.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.chapters ENABLE ROW LEVEL SECURITY;

-- 4. Policies

-- A. Courses
-- Public can view published courses. Admins can view all.
DROP POLICY IF EXISTS "Public can view published courses" ON vidya.courses;
CREATE POLICY "Public can view published courses" ON vidya.courses
  FOR SELECT USING (is_published = true OR vidya.has_role('admin') OR vidya.has_role('super_admin'));

-- Admins full access
DROP POLICY IF EXISTS "Admins can manage courses" ON vidya.courses;
CREATE POLICY "Admins can manage courses" ON vidya.courses
  FOR ALL
  USING (vidya.has_role('admin') OR vidya.has_role('super_admin'));

-- B. Chapters
-- Public can view published chapters of published courses. Admins view all.
DROP POLICY IF EXISTS "Public can view published chapters" ON vidya.chapters;
CREATE POLICY "Public can view published chapters" ON vidya.chapters
  FOR SELECT 
  USING (
    (is_published = true AND EXISTS (
      SELECT 1 FROM vidya.courses WHERE id = course_id AND is_published = true
    )) 
    OR vidya.has_role('admin') OR vidya.has_role('super_admin')
  );

-- Admins full access
DROP POLICY IF EXISTS "Admins can manage chapters" ON vidya.chapters;
CREATE POLICY "Admins can manage chapters" ON vidya.chapters
  FOR ALL
  USING (vidya.has_role('admin') OR vidya.has_role('super_admin'));
