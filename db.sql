-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.affiliate_products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text CHECK (category = ANY (ARRAY['book'::text, 'course'::text, 'hardware'::text])),
  price_label text,
  affiliate_link text NOT NULL,
  image_url text,
  rating numeric DEFAULT 4.0,
  exam_tags ARRAY DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT affiliate_products_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ai_semantic_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  embedding USER-DEFINED,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ai_semantic_cache_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ai_verification_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  job_id bigint,
  model_a text NOT NULL,
  model_b text NOT NULL,
  audit_results jsonb NOT NULL,
  confidence_score numeric,
  is_flagged boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ai_verification_logs_pkey PRIMARY KEY (id),
  CONSTRAINT ai_verification_logs_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.alerts (
  id bigint NOT NULL DEFAULT nextval('alerts_id_seq'::regclass),
  user_id uuid,
  name text NOT NULL,
  filters jsonb NOT NULL,
  education_level text,
  channels jsonb DEFAULT '["email"]'::jsonb,
  frequency text DEFAULT 'daily'::text,
  is_active boolean DEFAULT true,
  last_sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT alerts_pkey PRIMARY KEY (id),
  CONSTRAINT alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.analytics_events (
  id bigint NOT NULL DEFAULT nextval('analytics_events_id_seq'::regclass),
  user_id uuid,
  session_id text,
  event_type text NOT NULL,
  page_url text,
  referrer text,
  job_id bigint,
  test_id bigint,
  user_agent text,
  ip_address inet,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT analytics_events_pkey PRIMARY KEY (id),
  CONSTRAINT analytics_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT analytics_events_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.api_keys (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_id uuid,
  institution_name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  scopes jsonb DEFAULT '["jobs.read", "exams.read"]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  last_used_at timestamp with time zone,
  CONSTRAINT api_keys_pkey PRIMARY KEY (id),
  CONSTRAINT api_keys_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.applications (
  id bigint NOT NULL DEFAULT nextval('applications_id_seq'::regclass),
  user_id uuid,
  job_id bigint,
  status text DEFAULT 'saved'::text CHECK (status = ANY (ARRAY['saved'::text, 'applied'::text, 'admit_card'::text, 'exam_given'::text, 'result'::text, 'selected'::text])),
  application_number text,
  applied_at timestamp with time zone,
  payment_status text,
  resume_url text,
  documents jsonb,
  admit_card_downloaded_at timestamp with time zone,
  exam_given_at timestamp with time zone,
  result_checked_at timestamp with time zone,
  notes text,
  match_score numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT applications_pkey PRIMARY KEY (id),
  CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  published_at timestamp with time zone,
  is_published boolean DEFAULT false,
  author_id uuid,
  category_id uuid,
  featured_image text,
  meta_title text,
  meta_description text,
  keywords ARRAY,
  canonical_url text,
  og_image text,
  og_title text,
  og_description text,
  twitter_card text DEFAULT 'summary_large_image'::text,
  diff_level text,
  reading_time_minutes integer,
  geo_location jsonb DEFAULT '{}'::jsonb,
  structured_data jsonb DEFAULT '{}'::jsonb,
  custom_meta_tags jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT blogs_pkey PRIMARY KEY (id),
  CONSTRAINT blogs_author_id_fkey FOREIGN KEY (author_id) REFERENCES auth.users(id),
  CONSTRAINT blogs_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.job_categories(id)
);
CREATE TABLE public.broad_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  icon_url text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT broad_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.career_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  target_type text CHECK (target_type = ANY (ARRAY['coaching'::text, 'bank'::text])),
  target_id uuid,
  intent text NOT NULL,
  status text DEFAULT 'pending'::text,
  bid_amount integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT career_leads_pkey PRIMARY KEY (id),
  CONSTRAINT career_leads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  icon character varying,
  is_active boolean DEFAULT true,
  parent_id uuid,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id)
);
CREATE TABLE public.chat_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT chat_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT chat_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.chatbot_user_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  question text NOT NULL,
  matched_faq_id uuid,
  similarity double precision,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chatbot_user_questions_pkey PRIMARY KEY (id),
  CONSTRAINT chatbot_user_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT chatbot_user_questions_matched_faq_id_fkey FOREIGN KEY (matched_faq_id) REFERENCES public.faqs(id)
);
CREATE TABLE public.coaching_centers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  specialization ARRAY DEFAULT '{}'::text[],
  bid_price integer DEFAULT 100,
  contact_email text,
  is_partner boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT coaching_centers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.comments (
  id bigint NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
  user_id uuid,
  thread_id bigint,
  parent_comment_id bigint,
  content text NOT NULL,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  is_expert_answer boolean DEFAULT false,
  verified_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT comments_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.forum_threads(id),
  CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id),
  CONSTRAINT comments_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.daily_current_affairs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  date date DEFAULT CURRENT_DATE,
  exam_category text NOT NULL,
  news_json jsonb NOT NULL,
  quiz_json jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT daily_current_affairs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.education_levels (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  label text NOT NULL,
  code text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT education_levels_pkey PRIMARY KEY (id)
);
CREATE TABLE public.email_campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  template_id uuid,
  status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'scheduled'::text, 'sending'::text, 'sent'::text, 'cancelled'::text])),
  scheduled_at timestamp with time zone,
  sent_at timestamp with time zone,
  target_list_ids ARRAY DEFAULT '{}'::uuid[],
  total_recipients integer DEFAULT 0,
  sent_count integer DEFAULT 0,
  click_count integer DEFAULT 0,
  bounce_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_campaigns_pkey PRIMARY KEY (id),
  CONSTRAINT email_campaigns_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.email_templates(id)
);
CREATE TABLE public.email_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  campaign_id uuid,
  subscriber_id uuid,
  event_type text NOT NULL,
  message_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_events_pkey PRIMARY KEY (id),
  CONSTRAINT email_events_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.email_campaigns(id),
  CONSTRAINT email_events_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.newsletter_subscribers(id)
);
CREATE TABLE public.email_lists (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  type text NOT NULL DEFAULT 'general'::text CHECK (type = ANY (ARRAY['general'::text, 'qualification'::text, 'exam'::text, 'custom'::text])),
  reference_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_lists_pkey PRIMARY KEY (id)
);
CREATE TABLE public.email_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key_name text NOT NULL UNIQUE,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_settings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.email_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  body_text text NOT NULL,
  placeholders jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_templates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employer_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  logo_url text,
  website text,
  is_verified boolean DEFAULT false,
  api_key text UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT employer_profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.exam_cutoffs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  exam_id uuid,
  year integer NOT NULL,
  category text NOT NULL,
  cutoff_marks numeric NOT NULL,
  total_marks integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exam_cutoffs_pkey PRIMARY KEY (id),
  CONSTRAINT exam_cutoffs_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);
CREATE TABLE public.exams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  job_id bigint,
  icon_url text,
  is_active boolean DEFAULT true,
  created_at timestamp without time zone DEFAULT now(),
  job_family_id uuid,
  syllabus text,
  job_category_id uuid,
  syllabus_pdf_url text,
  strategy_guide text,
  strategy_guide_pdf_url text,
  CONSTRAINT exams_pkey PRIMARY KEY (id),
  CONSTRAINT exams_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id),
  CONSTRAINT exams_job_family_id_fkey FOREIGN KEY (job_family_id) REFERENCES public.job_families(id),
  CONSTRAINT exams_job_category_id_fkey FOREIGN KEY (job_category_id) REFERENCES public.job_categories(id)
);
CREATE TABLE public.faqs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'General'::text,
  tags ARRAY DEFAULT '{}'::text[],
  embedding USER-DEFINED,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT faqs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.forum_threads (
  id bigint NOT NULL DEFAULT nextval('forum_threads_id_seq'::regclass),
  user_id uuid,
  title text NOT NULL,
  content text NOT NULL,
  topic text,
  tags ARRAY,
  related_question_id bigint,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  view_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  status text DEFAULT 'published'::text,
  is_pinned boolean DEFAULT false,
  is_expert_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT forum_threads_pkey PRIMARY KEY (id),
  CONSTRAINT forum_threads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT forum_threads_related_question_id_fkey FOREIGN KEY (related_question_id) REFERENCES public.practice_questions(id)
);
CREATE TABLE public.indian_states (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  label text NOT NULL,
  code text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT indian_states_pkey PRIMARY KEY (id)
);
CREATE TABLE public.institutional_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  institution_id text NOT NULL UNIQUE,
  name text NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#2563eb'::text,
  secondary_color text DEFAULT '#1e40af'::text,
  slogan text,
  custom_domain text UNIQUE,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT institutional_settings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.job_alert_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email_enabled boolean DEFAULT true,
  sms_enabled boolean DEFAULT false,
  push_enabled boolean DEFAULT true,
  alert_frequency text DEFAULT 'instant'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT job_alert_settings_pkey PRIMARY KEY (id),
  CONSTRAINT job_alert_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.job_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  job_id bigint NOT NULL,
  status text DEFAULT 'Applied'::text,
  applied_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  notes text,
  CONSTRAINT job_applications_pkey PRIMARY KEY (id),
  CONSTRAINT job_applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT job_applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.job_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  icon_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT job_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.job_families (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  broad_category_id uuid,
  icon_url text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  job_category_id uuid,
  CONSTRAINT job_families_pkey PRIMARY KEY (id),
  CONSTRAINT job_families_broad_category_id_fkey FOREIGN KEY (broad_category_id) REFERENCES public.broad_categories(id),
  CONSTRAINT job_families_job_category_id_fkey FOREIGN KEY (job_category_id) REFERENCES public.job_categories(id)
);
CREATE TABLE public.job_tests (
  job_id bigint NOT NULL,
  test_id uuid NOT NULL,
  CONSTRAINT job_tests_pkey PRIMARY KEY (job_id, test_id),
  CONSTRAINT job_tests_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id),
  CONSTRAINT job_tests_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.practice_tests(id)
);
CREATE TABLE public.jobs (
  id bigint NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
  organization text NOT NULL,
  post_name text NOT NULL,
  department text,
  advertisement_no text,
  total_vacancies integer,
  vacancy_breakdown jsonb,
  eligibility jsonb NOT NULL,
  age_relaxation_rules jsonb,
  physical_standards jsonb,
  required_documents jsonb,
  application_start_date timestamp with time zone,
  application_end_date timestamp with time zone NOT NULL,
  exam_date timestamp with time zone,
  admit_card_date timestamp with time zone,
  result_date timestamp with time zone,
  application_fee jsonb,
  payment_modes ARRAY,
  apply_link text,
  official_link text,
  salary_details jsonb,
  perks ARRAY,
  selection_process jsonb,
  exam_pattern jsonb,
  pdf_url text,
  ai_summary text,
  ai_parsing_metadata jsonb,
  confidence_score numeric,
  is_verified boolean DEFAULT false,
  parsing_status text DEFAULT 'pending'::text,
  state text,
  category text,
  tags ARRAY,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  slug text UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  timeline jsonb DEFAULT '[]'::jsonb,
  exam_category text,
  qualification_needed text,
  governing_body text,
  linked_exam text,
  job_family_id uuid,
  description text,
  posts_count integer DEFAULT 1,
  salary_range character varying,
  location character varying DEFAULT 'India'::character varying,
  deadline timestamp without time zone,
  posted_at timestamp without time zone DEFAULT now(),
  status character varying DEFAULT 'active'::character varying,
  eligibility_criteria jsonb DEFAULT '{}'::jsonb,
  official_notification_url text,
  title character varying,
  admit_card_url text,
  result_url text,
  answer_key_url text,
  embedding USER-DEFINED,
  notification_text text,
  exam_id uuid,
  CONSTRAINT jobs_pkey PRIMARY KEY (id),
  CONSTRAINT jobs_job_family_id_fkey FOREIGN KEY (job_family_id) REFERENCES public.job_families(id),
  CONSTRAINT jobs_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);
CREATE TABLE public.list_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subscriber_id uuid,
  list_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT list_subscribers_pkey PRIMARY KEY (id),
  CONSTRAINT list_subscribers_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.newsletter_subscribers(id),
  CONSTRAINT list_subscribers_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.email_lists(id)
);
CREATE TABLE public.live_tests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  description text,
  category_id uuid,
  questions_count integer DEFAULT 0,
  duration_minutes integer DEFAULT 60,
  marks integer DEFAULT 100,
  start_time timestamp without time zone,
  end_time timestamp without time zone,
  is_free boolean DEFAULT true,
  languages ARRAY DEFAULT '{English}'::character varying[],
  status character varying DEFAULT 'upcoming'::character varying,
  registered_count integer DEFAULT 0,
  max_participants integer,
  tags ARRAY,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT live_tests_pkey PRIMARY KEY (id),
  CONSTRAINT live_tests_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.mains_evaluations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  question_text text,
  file_url text,
  ai_transcription text,
  ai_feedback jsonb,
  status character varying DEFAULT 'pending'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT mains_evaluations_pkey PRIMARY KEY (id),
  CONSTRAINT mains_evaluations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.mock_interviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  job_context text NOT NULL,
  conversation_json jsonb NOT NULL,
  avg_score numeric,
  feedback_summary text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  detailed_scores jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT mock_interviews_pkey PRIMARY KEY (id),
  CONSTRAINT mock_interviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.mocktests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  test_series_id uuid,
  title character varying NOT NULL,
  description text,
  questions_count integer DEFAULT 0,
  duration_minutes integer DEFAULT 60,
  marks integer DEFAULT 100,
  is_free boolean DEFAULT false,
  is_live boolean DEFAULT false,
  test_type character varying DEFAULT 'full_test'::character varying,
  instructions text,
  created_at timestamp without time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  rank_prediction_enabled boolean DEFAULT false,
  interface_style text DEFAULT 'standard'::text,
  items_generated_by_ai boolean DEFAULT false,
  scheduled_at timestamp with time zone,
  CONSTRAINT mocktests_pkey PRIMARY KEY (id),
  CONSTRAINT mocktests_test_series_id_fkey FOREIGN KEY (test_series_id) REFERENCES public.test_series(id)
);
CREATE TABLE public.news_ticker (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  text text NOT NULL,
  url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT news_ticker_pkey PRIMARY KEY (id)
);
CREATE TABLE public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'unsubscribed'::text, 'bounced'::text])),
  preferences jsonb DEFAULT '["all"]'::jsonb,
  communication_type text DEFAULT 'email'::text CHECK (communication_type = ANY (ARRAY['email'::text, 'whatsapp'::text, 'both'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.notifications (
  id bigint NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
  user_id uuid,
  type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  data jsonb,
  sent_email boolean DEFAULT false,
  sent_push boolean DEFAULT false,
  sent_sms boolean DEFAULT false,
  is_read boolean DEFAULT false,
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.practice_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT practice_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.practice_comment_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  comment_id uuid,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT practice_comment_likes_pkey PRIMARY KEY (id),
  CONSTRAINT practice_comment_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.practice_comments(id),
  CONSTRAINT practice_comment_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.practice_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question_id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  title text,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  parent_id uuid,
  is_pinned boolean DEFAULT false,
  likes integer DEFAULT 0,
  views integer DEFAULT 0,
  CONSTRAINT practice_comments_pkey PRIMARY KEY (id),
  CONSTRAINT practice_comments_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.practice_questions(id),
  CONSTRAINT practice_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT practice_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.practice_comments(id)
);
CREATE TABLE public.practice_questions (
  id bigint NOT NULL DEFAULT nextval('practice_questions_id_seq'::regclass),
  question_text text NOT NULL,
  explanation text,
  marks integer DEFAULT 1,
  negative_marks numeric DEFAULT 0.25,
  subject text NOT NULL,
  exam_tags ARRAY,
  difficulty text DEFAULT 'medium'::text,
  topics ARRAY,
  options jsonb NOT NULL,
  source text,
  year integer,
  is_verified boolean DEFAULT false,
  verified_by uuid,
  times_attempted integer DEFAULT 0,
  correct_percentage numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  subtopic_id uuid,
  key_question text,
  answer text,
  visibility text DEFAULT 'PUBLIC'::text CHECK (visibility = ANY (ARRAY['PUBLIC'::text, 'TEST_ONLY'::text])),
  CONSTRAINT practice_questions_pkey PRIMARY KEY (id),
  CONSTRAINT practice_questions_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id),
  CONSTRAINT practice_questions_subtopic_id_fkey FOREIGN KEY (subtopic_id) REFERENCES public.practice_subtopics(id)
);
CREATE TABLE public.practice_subtopics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  topic_id uuid,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT practice_subtopics_pkey PRIMARY KEY (id),
  CONSTRAINT practice_subtopics_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.practice_topics(id)
);
CREATE TABLE public.practice_test_answers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  attempt_id uuid,
  question_id bigint,
  selected_option text,
  status text DEFAULT 'NOT_VISITED'::text CHECK (status = ANY (ARRAY['ANSWERED'::text, 'NOT_ANSWERED'::text, 'MARKED_FOR_REVIEW'::text, 'ANSWERED_AND_MARKED_FOR_REVIEW'::text, 'NOT_VISITED'::text])),
  time_spent_seconds integer DEFAULT 0,
  CONSTRAINT practice_test_answers_pkey PRIMARY KEY (id),
  CONSTRAINT practice_test_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.practice_questions(id),
  CONSTRAINT practice_test_answers_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.practice_test_attempts(id)
);
CREATE TABLE public.practice_test_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  test_id uuid,
  start_time timestamp with time zone DEFAULT now(),
  end_time timestamp with time zone,
  status text DEFAULT 'IN_PROGRESS'::text CHECK (status = ANY (ARRAY['IN_PROGRESS'::text, 'COMPLETED'::text, 'ABANDONED'::text])),
  score numeric DEFAULT 0,
  accuracy numeric DEFAULT 0,
  time_taken_seconds integer DEFAULT 0,
  result_snapshot jsonb,
  CONSTRAINT practice_test_attempts_pkey PRIMARY KEY (id),
  CONSTRAINT practice_test_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT practice_test_attempts_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.practice_tests(id)
);
CREATE TABLE public.practice_test_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  test_id uuid,
  section_id uuid,
  question_id bigint,
  order_index integer NOT NULL,
  CONSTRAINT practice_test_questions_pkey PRIMARY KEY (id),
  CONSTRAINT practice_test_questions_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.practice_tests(id),
  CONSTRAINT practice_test_questions_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.practice_test_sections(id),
  CONSTRAINT practice_test_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.practice_questions(id)
);
CREATE TABLE public.practice_test_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  test_id uuid,
  name text NOT NULL,
  order_index integer NOT NULL,
  duration_minutes integer,
  positive_mark numeric DEFAULT 1.0,
  negative_mark numeric DEFAULT 0.0,
  total_questions integer NOT NULL,
  CONSTRAINT practice_test_sections_pkey PRIMARY KEY (id),
  CONSTRAINT practice_test_sections_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.practice_tests(id)
);
CREATE TABLE public.practice_tests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  type text NOT NULL CHECK (type = ANY (ARRAY['MOCK'::text, 'CHAPTER'::text, 'DAILY'::text, 'SECTIONAL'::text])),
  pattern_type text DEFAULT 'NONE'::text CHECK (pattern_type = ANY (ARRAY['SSC'::text, 'IBPS'::text, 'GENERAL'::text, 'NONE'::text])),
  duration_minutes integer NOT NULL,
  total_marks integer,
  passing_marks integer,
  is_published boolean DEFAULT false,
  topic_id uuid,
  subtopic_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  instructions text,
  CONSTRAINT practice_tests_pkey PRIMARY KEY (id),
  CONSTRAINT practice_tests_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.practice_topics(id),
  CONSTRAINT practice_tests_subtopic_id_fkey FOREIGN KEY (subtopic_id) REFERENCES public.practice_subtopics(id)
);
CREATE TABLE public.practice_topics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_id uuid,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT practice_topics_pkey PRIMARY KEY (id),
  CONSTRAINT practice_topics_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.practice_categories(id)
);
CREATE TABLE public.private_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  employer_id uuid,
  title text NOT NULL,
  description text,
  salary_range text,
  location text,
  skills_required ARRAY DEFAULT '{}'::text[],
  is_auto_apply_supported boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT private_jobs_pkey PRIMARY KEY (id),
  CONSTRAINT private_jobs_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.employer_profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  user_category text,
  domicile_state text,
  education jsonb,
  qualifications ARRAY,
  preferred_states ARRAY,
  date_of_birth date,
  gender text,
  disability_details jsonb,
  notification_preferences jsonb DEFAULT '{"sms": false, "push": true, "email": true}'::jsonb,
  stats_login_count integer DEFAULT 0,
  stats_application_count integer DEFAULT 0,
  last_login_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  mobile text,
  role text DEFAULT 'user'::text,
  target_exam_id uuid,
  target_job_id bigint,
  current_streak integer DEFAULT 0,
  last_activity_date date,
  is_verified boolean DEFAULT false,
  otp_code text,
  profile_score integer DEFAULT 0,
  tenth_marks numeric,
  twelfth_marks numeric,
  graduation_marks numeric,
  education_details jsonb DEFAULT '{}'::jsonb,
  experience_years integer DEFAULT 0,
  work_experience jsonb DEFAULT '[]'::jsonb,
  skills ARRAY,
  resume_url text,
  embedding USER-DEFINED,
  points integer DEFAULT 0,
  coins integer DEFAULT 0,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT profiles_target_exam_id_fkey FOREIGN KEY (target_exam_id) REFERENCES public.exams(id),
  CONSTRAINT profiles_target_job_id_fkey FOREIGN KEY (target_job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.question_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid,
  saved_at timestamp without time zone DEFAULT now(),
  CONSTRAINT question_bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT question_bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT question_bookmarks_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.test_questions(id)
);
CREATE TABLE public.resume_templates (
  id bigint NOT NULL DEFAULT nextval('resume_templates_id_seq'::regclass),
  name text NOT NULL,
  description text,
  category text,
  preview_url text,
  thumbnail_url text,
  sections jsonb,
  fields jsonb,
  is_free boolean DEFAULT true,
  price numeric,
  usage_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT resume_templates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.saved_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  job_id bigint NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT saved_jobs_pkey PRIMARY KEY (id),
  CONSTRAINT saved_jobs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT saved_jobs_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);
CREATE TABLE public.series_enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  series_id uuid NOT NULL,
  enrolled_at timestamp without time zone DEFAULT now(),
  amount_paid numeric DEFAULT 0,
  status character varying DEFAULT 'active'::character varying,
  CONSTRAINT series_enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT series_enrollments_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.test_series(id),
  CONSTRAINT series_enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.study_materials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  file_url text NOT NULL,
  file_type text DEFAULT 'pdf'::text CHECK (file_type = ANY (ARRAY['pdf'::text, 'video'::text, 'link'::text])),
  ai_summary text,
  is_premium boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT study_materials_pkey PRIMARY KEY (id)
);
CREATE TABLE public.test_attempts (
  id bigint NOT NULL DEFAULT nextval('test_attempts_id_seq'::regclass),
  user_id uuid,
  test_id bigint,
  score numeric,
  total_time_spent integer,
  status text DEFAULT 'completed'::text,
  answers jsonb,
  correct_count integer,
  incorrect_count integer,
  skipped_count integer,
  section_wise_performance jsonb,
  all_india_rank integer,
  percentile numeric,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT test_attempts_pkey PRIMARY KEY (id),
  CONSTRAINT test_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.test_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  mock_test_id uuid,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_option character varying NOT NULL,
  marks numeric DEFAULT 1,
  negative_marks numeric DEFAULT 0.25,
  explanation text,
  order_index integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  video_solution_url text,
  section character varying,
  topic text,
  sub_topic text,
  difficulty_score integer DEFAULT 5,
  CONSTRAINT test_questions_pkey PRIMARY KEY (id),
  CONSTRAINT test_questions_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mocktests(id)
);
CREATE TABLE public.test_series (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  category_id uuid,
  total_tests integer DEFAULT 0,
  free_tests integer DEFAULT 0,
  students_enrolled integer DEFAULT 0,
  image_url text,
  price numeric,
  discount_price numeric,
  languages ARRAY DEFAULT '{English}'::character varying[],
  rating numeric DEFAULT 0,
  total_questions integer DEFAULT 0,
  total_duration integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_popular boolean DEFAULT false,
  difficulty character varying DEFAULT 'medium'::character varying,
  created_at timestamp without time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  exam_id uuid,
  CONSTRAINT test_series_pkey PRIMARY KEY (id),
  CONSTRAINT test_series_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT test_series_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);
CREATE TABLE public.trust_api_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  employer_id uuid,
  target_user_id uuid,
  verified_fields ARRAY,
  cost_per_query double precision DEFAULT 5.0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT trust_api_logs_pkey PRIMARY KEY (id),
  CONSTRAINT trust_api_logs_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.employer_profiles(id),
  CONSTRAINT trust_api_logs_target_user_id_fkey FOREIGN KEY (target_user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.user_activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  activity_type text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_activity_logs_pkey PRIMARY KEY (id),
  CONSTRAINT user_activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_ai_quotas (
  user_id uuid NOT NULL,
  daily_used integer DEFAULT 0,
  daily_limit integer DEFAULT 50,
  last_reset_at date DEFAULT CURRENT_DATE,
  CONSTRAINT user_ai_quotas_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_ai_quotas_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_daily_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  date date DEFAULT CURRENT_DATE,
  read_news_at timestamp with time zone,
  quiz_score integer,
  quiz_completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_daily_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_daily_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_doubts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  question_id uuid,
  doubt_text text,
  ai_response text,
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_doubts_pkey PRIMARY KEY (id),
  CONSTRAINT user_doubts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_doubts_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.test_questions(id)
);
CREATE TABLE public.user_exam_interests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  exam_id uuid NOT NULL,
  priority integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_exam_interests_pkey PRIMARY KEY (id),
  CONSTRAINT user_exam_interests_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_exam_interests_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);
CREATE TABLE public.user_goals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  goal_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_goals_pkey PRIMARY KEY (id),
  CONSTRAINT user_goals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.user_practice_stats (
  user_id uuid NOT NULL,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date,
  total_questions_solved integer DEFAULT 0,
  total_tests_taken integer DEFAULT 0,
  total_xp bigint DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_practice_stats_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_practice_stats_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_resumes (
  id bigint NOT NULL DEFAULT nextval('user_resumes_id_seq'::regclass),
  user_id uuid,
  template_id bigint,
  resume_data jsonb NOT NULL,
  ats_score numeric,
  optimized_keywords ARRAY,
  version integer DEFAULT 1,
  is_current boolean DEFAULT true,
  pdf_url text,
  word_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_resumes_pkey PRIMARY KEY (id),
  CONSTRAINT user_resumes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT user_resumes_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.resume_templates(id)
);
CREATE TABLE public.user_study_roadmaps (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  title text NOT NULL,
  target_exam_id uuid,
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  milestones jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_study_roadmaps_pkey PRIMARY KEY (id),
  CONSTRAINT user_study_roadmaps_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_test_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  test_series_id uuid,
  test_id uuid,
  attempted_tests integer DEFAULT 0,
  completed_tests integer DEFAULT 0,
  total_score double precision DEFAULT 0,
  average_score numeric DEFAULT 0,
  last_attempted timestamp without time zone,
  progress_percentage numeric DEFAULT 0,
  time_spent jsonb DEFAULT '{}'::jsonb,
  user_answers jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT user_test_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_test_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_test_progress_test_series_id_fkey FOREIGN KEY (test_series_id) REFERENCES public.test_series(id),
  CONSTRAINT user_test_progress_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.mocktests(id)
);
CREATE TABLE public.user_wrong_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  test_question_id uuid,
  practice_question_id bigint,
  user_answer text,
  correct_answer text,
  srs_level integer DEFAULT 0,
  wrong_count integer DEFAULT 1,
  next_review_at timestamp with time zone DEFAULT timezone('utc'::text, (now() + '1 day'::interval)),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_wrong_questions_pkey PRIMARY KEY (id),
  CONSTRAINT user_wrong_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_wrong_questions_test_question_id_fkey FOREIGN KEY (test_question_id) REFERENCES public.test_questions(id),
  CONSTRAINT user_wrong_questions_practice_question_id_fkey FOREIGN KEY (practice_question_id) REFERENCES public.practice_questions(id)
);
CREATE TABLE public.verified_credentials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  credential_type text CHECK (credential_type = ANY (ARRAY['DEGREE'::text, 'RANK'::text, 'EXPERIENCE'::text, 'SKILL'::text])),
  issuance_date timestamp with time zone DEFAULT now(),
  signature text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  CONSTRAINT verified_credentials_pkey PRIMARY KEY (id),
  CONSTRAINT verified_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);