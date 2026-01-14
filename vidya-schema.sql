-- Create schema for Vidya LMS
CREATE SCHEMA IF NOT EXISTS vidya;

-- Grant usage to standard Supabase roles
GRANT USAGE ON SCHEMA vidya TO postgres, anon, authenticated, service_role;

-- 1. Profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS vidya.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text,
    full_name text,
    avatar_url text,
    bio text,
    role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'instructor')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Onboarding Data
CREATE TABLE IF NOT EXISTS vidya.onboarding (
    user_id uuid REFERENCES vidya.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    goal text, -- "Get a Job", "Learn Skill"
    experience_level text, -- "Beginner", "Intermediate"
    target_role text, -- "Frontend Dev"
    completed_at timestamptz DEFAULT now()
);

-- 3. Course Catalog
CREATE TABLE IF NOT EXISTS vidya.courses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    category text,
    image_url text,
    price integer DEFAULT 0,
    is_published boolean DEFAULT false,
    metadata jsonb DEFAULT '{}'::jsonb, -- For hex colors, icons
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. Course Chapters
CREATE TABLE IF NOT EXISTS vidya.chapters (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid REFERENCES vidya.courses(id) ON DELETE CASCADE NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    content text, -- Markdown content
    video_url text,
    order_index integer DEFAULT 0,
    is_free boolean DEFAULT false, -- For preview
    created_at timestamptz DEFAULT now(),
    UNIQUE(course_id, slug)
);

-- 5. Enrollments
CREATE TABLE IF NOT EXISTS vidya.enrollments (
    user_id uuid REFERENCES vidya.profiles(id) ON DELETE CASCADE,
    course_id uuid REFERENCES vidya.courses(id) ON DELETE CASCADE,
    enrolled_at timestamptz DEFAULT now(),
    status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    PRIMARY KEY (user_id, course_id)
);

-- 6. Progress (Chapter level)
CREATE TABLE IF NOT EXISTS vidya.progress (
    user_id uuid REFERENCES vidya.profiles(id) ON DELETE CASCADE,
    chapter_id uuid REFERENCES vidya.chapters(id) ON DELETE CASCADE,
    completed_at timestamptz DEFAULT now(),
    notes text,
    PRIMARY KEY (user_id, chapter_id)
);

-- 7. Certificates
CREATE TABLE IF NOT EXISTS vidya.certificates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES vidya.profiles(id) ON DELETE CASCADE,
    course_id uuid REFERENCES vidya.courses(id) ON DELETE CASCADE,
    issued_at timestamptz DEFAULT now(),
    certificate_url text,
    credential_id text UNIQUE
);

-- Enable RLS
ALTER TABLE vidya.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE vidya.certificates ENABLE ROW LEVEL SECURITY;

-- Helper policies (Basic)
-- Profiles
CREATE POLICY "Users can read own profile" ON vidya.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON vidya.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses/Chapters: Public read
CREATE POLICY "Public read courses" ON vidya.courses FOR SELECT USING (true);
CREATE POLICY "Public read chapters" ON vidya.chapters FOR SELECT USING (true);

-- Enrollments/Progress: Users can read/write own
CREATE POLICY "Users can read own enrollments" ON vidya.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON vidya.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own progress" ON vidya.progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON vidya.progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON vidya.progress FOR UPDATE USING (auth.uid() = user_id);
