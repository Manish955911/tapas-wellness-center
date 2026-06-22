-- TAPAS Yoga Classes - Supabase Database Schema Script
-- Copy this script and paste it into the Supabase "SQL Editor" to create all required tables.

-- 1. Table: contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT
);

-- 2. Table: class_registrations
CREATE TABLE IF NOT EXISTS class_registrations (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    class_type TEXT,
    preferred_time TEXT,
    experience_level TEXT,
    message TEXT
);

-- 3. Table: blog_subscriptions
CREATE TABLE IF NOT EXISTS blog_subscriptions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. Table: trial_bookings
CREATE TABLE IF NOT EXISTS trial_bookings (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    goal TEXT,
    "preferredBatch" TEXT
);

-- 5. Table: gallery
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    "desc" TEXT DEFAULT '',
    img TEXT NOT NULL,
    tag TEXT DEFAULT 'varanasi',
    "tagLabel" TEXT DEFAULT 'Varanasi Center'
);

-- 6. Table: testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    tag TEXT DEFAULT 'general',
    program TEXT NOT NULL,
    since TEXT DEFAULT '2026',
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5
);

-- 7. Table: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    "desc" TEXT DEFAULT '',
    excerpt TEXT DEFAULT '',
    content TEXT NOT NULL,
    img TEXT,
    author TEXT NOT NULL,
    category TEXT DEFAULT 'General Yoga',
    date TEXT
);

-- 8. Table: site_offers
CREATE TABLE IF NOT EXISTS site_offers (
    id INTEGER PRIMARY KEY,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    banner_text TEXT NOT NULL,
    button_text TEXT DEFAULT '',
    button_link TEXT DEFAULT '',
    is_active BOOLEAN DEFAULT TRUE,
    whatsapp_phone TEXT DEFAULT '916394554685',
    facebook_link TEXT DEFAULT '',
    instagram_link TEXT DEFAULT '',
    youtube_link TEXT DEFAULT '',
    contact_email TEXT DEFAULT 'contact@tapasyoga.in',
    seo_title TEXT DEFAULT '',
    seo_description TEXT DEFAULT '',
    seo_keywords TEXT DEFAULT '',
    seo_google_verification TEXT DEFAULT ''
);

-- Seed Initial site offer configuration
INSERT INTO site_offers (id, banner_text, button_text, button_link, is_active, whatsapp_phone, contact_email)
VALUES (
    1, 
    '🕉️ Grand Opening Special: Get 20% off all Varanasi Studio Programs this week!', 
    'Claim Offer', 
    '/pricing', 
    TRUE, 
    '916394554685', 
    'contact@tapasyoga.in'
)
ON CONFLICT (id) DO NOTHING;
