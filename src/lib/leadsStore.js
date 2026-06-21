import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const localDbPath = path.join(process.cwd(), 'src/lib/local_db.json');

const defaultBlogPosts = [
  {
    id: '1',
    title: 'The Science Behind Yoga Therapy for Diabetes',
    author: 'Dr. Priya Sharma',
    category: 'Yoga Therapy',
    date: 'March 15, 2024',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    excerpt: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values.',
    content: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values. Specific asanas like Paschimottanasana (Seated Forward Bend), Dhanurasana (Bow Pose), and Ardha Matsyendrasana (Half Spinal Twist) stimulate the pancreas and improve digestion. Pranayama techniques such as Kapalbhati and Bhastrika enhance metabolic function and support blood sugar regulation. Regular dynamic sequences paired with these twists facilitate abdominal organ massage, lowering stress cortisol levels and directly boosting autonomic system health.',
    created_at: '2024-03-15T08:00:00.000Z'
  },
  {
    id: '2',
    title: 'New Weekend Ashtanga Series Starting Soon',
    author: 'Rajesh Kumar',
    category: 'Ashtanga Yoga',
    date: 'March 12, 2024',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
    excerpt: 'We\'re excited to announce a new weekend Ashtanga Yoga series for advanced practitioners. Join us every Saturday morning for traditional Primary Series practice.',
    content: 'The Ashtanga Primary Series is a set sequence of postures designed to purify and strengthen the body. Each Saturday, we\'ll guide you through the complete sequence, focusing on proper alignment, breath synchronization, and traditional vinyasa count. Ashtanga is an intense physical discipline that builds deep internal heat (tapas), builds muscular stamina, decompresses spinal pressure points, and clears neural pathways. This program is ideal for individuals who want to establish a strict, self-transforming daily physical regimen.',
    created_at: '2024-03-12T08:00:00.000Z'
  },
  {
    id: '3',
    title: 'Free Meditation Workshop This Sunday',
    author: 'Amit Verma',
    category: 'Meditation',
    date: 'March 10, 2024',
    img: 'https://images.unsplash.com/photo-1506629905607-c1f40f4c57c1?w=800&h=400&fit=crop',
    excerpt: 'Join us for a free 90-minute meditation workshop this Sunday evening. Learn various meditation techniques from our experienced teacher, Amit Verma.',
    content: 'In this workshop, you\'ll learn mindfulness meditation, mantra meditation, and guided visualization techniques. Perfect for beginners and experienced practitioners alike. No prior experience required. You will discover practical ways to calm the sympathetic nervous system, reset elevated blood pressure levels, and manage clinical anxiety triggers. We recommend wearing comfortable clothes and bringing a notebook to record guidance on daily routines.',
    created_at: '2024-03-10T08:00:00.000Z'
  },
  {
    id: '4',
    title: '5 Morning Yoga Poses to Start Your Day Right',
    author: 'Swami Gyan Prakash',
    category: 'Health Tips',
    date: 'March 8, 2024',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
    excerpt: 'Discover simple yoga poses you can practice every morning to energize your body, calm your mind, and set a positive tone for the day ahead.',
    content: 'Starting your day with yoga doesn\'t have to be complicated. These five simple poses - Sun Salutation, Mountain Pose, Forward Fold, Warrior I, and Child\'s Pose - can transform your morning routine and set you up for a productive day. Each sequence increases core blood flow, stretches long muscle chains, and integrates oxygenation pathways. Practicing even 15 minutes right after waking up resets metabolic speed, regulates endocrine functions, and builds spinal flexibility for the rest of your day.',
    created_at: '2024-03-08T08:00:00.000Z'
  },
  {
    id: '5',
    title: 'Student Spotlight: Overcoming Chronic Back Pain',
    author: 'Vikram Malhotra',
    category: 'Success Stories',
    date: 'March 5, 2024',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=400&fit=crop',
    excerpt: 'Read the inspiring story of one of our students who found relief from chronic back pain through our therapeutic yoga program.',
    content: 'After years of suffering from chronic lower back pain that limited her daily activities, Sarah discovered yoga therapy. Through a personalized program focusing on spinal alignment, core strengthening, and gentle stretches, she experienced remarkable improvement within just three months. Our alignment routines focus on minor disc decompressions, muscle strengthening, and hamstring lengthening. Combined with specific Ayurvedic warm oils, this holistic therapy restores flexibility and relieves spasms without needing surgery.',
    created_at: '2024-03-05T08:00:00.000Z'
  },
  {
    id: '6',
    title: 'Understanding Patanjali\'s Eight Limbs: Yamas',
    author: 'Swami Gyan Prakash',
    category: 'Yoga Philosophy',
    date: 'March 3, 2024',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    excerpt: 'Dive deep into the first limb of Patanjali\'s Ashtanga Yoga - Yamas. Learn how ethical principles guide our yoga practice and daily life.',
    content: 'The Yamas are the first of Patanjali\'s Eight Limbs of Yoga, representing ethical guidelines for how we interact with the world. This article explores the five Yamas: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), and Aparigraha (non-possessiveness). By incorporating Yamas into daily life, practitioners establish a mental ecosystem of peace, clarity, and harmony. Ethical discipline creates the foundation for higher states of dhyana (meditation) and complete self-realization.',
    created_at: '2024-03-03T08:00:00.000Z'
  }
];

// Helper to read local data
function readLocalDb() {
  try {
    if (!fs.existsSync(localDbPath)) {
      const initial = {
        contact_submissions: [],
        class_registrations: [],
        newsletter_subscribers: [],
        trial_bookings: [],
        gallery: [],
        testimonials: [],
        blog_posts: defaultBlogPosts,
        site_offers: [
          {
            id: '1',
            banner_text: '🕉️ Grand Opening Special: Get 20% off all Varanasi Studio Programs this week!',
            button_text: 'Claim Offer',
            button_link: '/pricing',
            is_active: true,
            whatsapp_phone: '916394554685',
            facebook_link: 'https://facebook.com/tapasyogavaranasi',
            instagram_link: 'https://instagram.com/tapasyogavaranasi',
            youtube_link: 'https://youtube.com/@tapasyogavaranasi',
            contact_email: 'contact@tapasyoga.in'
          }
        ]
      };
      fs.writeFileSync(localDbPath, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(localDbPath, 'utf-8');
    const parsed = JSON.parse(content || '{}');
    let modified = false;
    if (!parsed.gallery) { parsed.gallery = []; modified = true; }
    if (!parsed.testimonials) { parsed.testimonials = []; modified = true; }
    if (!parsed.blog_posts) { parsed.blog_posts = defaultBlogPosts; modified = true; }
    if (!parsed.site_offers) {
      parsed.site_offers = [
        {
          id: '1',
          banner_text: '🕉️ Grand Opening Special: Get 20% off all Varanasi Studio Programs this week!',
          button_text: 'Claim Offer',
          button_link: '/pricing',
          is_active: true,
          whatsapp_phone: '916394554685',
          facebook_link: 'https://facebook.com/tapasyogavaranasi',
          instagram_link: 'https://instagram.com/tapasyogavaranasi',
          youtube_link: 'https://youtube.com/@tapasyogavaranasi',
          contact_email: 'contact@tapasyoga.in'
        }
      ];
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(localDbPath, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (error) {
    console.error('Error reading local DB:', error);
    return {
      contact_submissions: [],
      class_registrations: [],
      newsletter_subscribers: [],
      trial_bookings: [],
      gallery: [],
      testimonials: [],
      site_offers: []
    };
  }
}

// Helper to write local data
function writeLocalDb(data) {
  try {
    fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to local DB:', error);
    return false;
  }
}

export async function saveLead(type, payload) {
  const record = {
    id: Math.floor(Math.random() * 1000000) + '',
    created_at: new Date().toISOString(),
    status: 'new',
    ...payload
  };

  // 1. If Supabase is configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const tableName = getSupabaseTable(type);
      const mappedRecord = mapToSupabaseFields(type, record);
      const { data, error } = await supabase
        .from(tableName)
        .insert([mappedRecord])
        .select();
      
      if (!error) {
        return { success: true, mode: 'supabase', data: data[0] };
      }
      console.warn('Supabase save failed, falling back to local storage:', error);
    } catch (err) {
      console.error('Supabase integration error, falling back:', err);
    }
  }

  // 2. Local File Fallback
  const db = readLocalDb();
  if (!db[type]) {
    db[type] = [];
  }
  db[type].push(record);
  writeLocalDb(db);

  return { success: true, mode: 'local', data: record };
}

export async function getLeads(type) {
  // 1. If Supabase is configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const tableName = getSupabaseTable(type);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) {
        return data.map(item => mapFromSupabaseFields(type, item));
      }
      console.warn('Supabase fetch failed, falling back to local:', error);
    } catch (err) {
      console.error('Supabase fetch error, falling back:', err);
    }
  }

  // 2. Local File Fallback
  const db = readLocalDb();
  const list = db[type] || [];
  return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export async function updateLeadStatus(type, id, status) {
  // 1. If Supabase is configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const tableName = getSupabaseTable(type);
      const { data, error } = await supabase
        .from(tableName)
        .update({ status })
        .eq('id', id)
        .select();
      
      if (!error) {
        return { success: true, mode: 'supabase', data: data[0] };
      }
      console.warn('Supabase update failed, falling back to local:', error);
    } catch (err) {
      console.error('Supabase update error, falling back:', err);
    }
  }

  // 2. Local File Fallback
  const db = readLocalDb();
  if (db[type]) {
    const idx = db[type].findIndex(item => item.id == id);
    if (idx !== -1) {
      db[type][idx].status = status;
      writeLocalDb(db);
      return { success: true, mode: 'local', data: db[type][idx] };
    }
  }
  return { success: false, error: 'Lead not found' };
}

export async function deleteLead(type, id) {
  // 1. If Supabase is configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const tableName = getSupabaseTable(type);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (!error) {
        return { success: true, mode: 'supabase' };
      }
      console.warn('Supabase delete failed, falling back to local:', error);
    } catch (err) {
      console.error('Supabase delete error, falling back:', err);
    }
  }

  // 2. Local File Fallback
  const db = readLocalDb();
  if (db[type]) {
    const initialLength = db[type].length;
    db[type] = db[type].filter(item => item.id != id);
    if (db[type].length < initialLength) {
      writeLocalDb(db);
      return { success: true, mode: 'local' };
    }
  }
  return { success: false, error: 'Lead not found' };
}

// Helpers mapping types to table names
function getSupabaseTable(type) {
  switch (type) {
    case 'contact_submissions': return 'contact_submissions';
    case 'class_registrations': return 'class_registrations';
    case 'newsletter_subscribers': return 'blog_subscriptions';
    case 'trial_bookings': return 'trial_bookings';
    default: return type;
  }
}

function mapToSupabaseFields(type, record) {
  if (type === 'contact_submissions') {
    return {
      first_name: record.firstName || record.first_name || '',
      last_name: record.lastName || record.last_name || '',
      email: record.email || '',
      phone: record.phone || '',
      subject: record.subject || '',
      message: record.message || '',
      status: record.status || 'new',
      created_at: record.created_at
    };
  }
  if (type === 'class_registrations') {
    return {
      first_name: record.firstName || record.first_name || '',
      last_name: record.lastName || record.last_name || '',
      email: record.email || '',
      phone: record.phone || '',
      class_type: record.classType || record.class_type || '',
      preferred_time: record.preferredTime || record.preferred_time || '',
      experience_level: record.experienceLevel || record.experience_level || '',
      message: record.message || '',
      status: record.status || 'new',
      created_at: record.created_at
    };
  }
  if (type === 'newsletter_subscribers') {
    return {
      email: record.email,
      is_active: record.is_active !== undefined ? record.is_active : true,
      created_at: record.created_at
    };
  }
  return record;
}

function mapFromSupabaseFields(type, record) {
  if (type === 'contact_submissions') {
    return {
      id: record.id,
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      phone: record.phone,
      subject: record.subject,
      message: record.message,
      status: record.status,
      created_at: record.created_at
    };
  }
  if (type === 'class_registrations') {
    return {
      id: record.id,
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      phone: record.phone,
      classType: record.class_type,
      preferredTime: record.preferred_time,
      experienceLevel: record.experience_level,
      message: record.message,
      status: record.status,
      created_at: record.created_at
    };
  }
  return record;
}

// --- GALLERY MANAGERS ---
export async function getGalleryItems() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) return data;
      console.warn('Supabase gallery fetch failed:', error);
    } catch (err) {
      console.error('Supabase gallery fetch error:', err);
    }
  }
  const db = readLocalDb();
  return db.gallery || [];
}

export async function saveGalleryItem(payload) {
  const record = {
    id: Math.floor(Math.random() * 1000000) + '',
    created_at: new Date().toISOString(),
    ...payload
  };
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([record])
        .select();
      if (!error) return { success: true, mode: 'supabase', data: data[0] };
      console.warn('Supabase gallery save failed, falling back:', error);
    } catch (err) {
      console.error('Supabase gallery save error:', err);
    }
  }
  const db = readLocalDb();
  db.gallery.push(record);
  writeLocalDb(db);
  return { success: true, mode: 'local', data: record };
}

export async function deleteGalleryItem(id) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (!error) return { success: true, mode: 'supabase' };
      console.warn('Supabase gallery delete failed, falling back:', error);
    } catch (err) {
      console.error('Supabase gallery delete error:', err);
    }
  }
  const db = readLocalDb();
  db.gallery = db.gallery.filter(item => item.id != id);
  writeLocalDb(db);
  return { success: true, mode: 'local' };
}

// --- TESTIMONIALS MANAGERS ---
export async function getTestimonialsItems() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) return data;
      console.warn('Supabase testimonials fetch failed:', error);
    } catch (err) {
      console.error('Supabase testimonials fetch error:', err);
    }
  }
  const db = readLocalDb();
  return db.testimonials || [];
}

export async function saveTestimonialItem(payload) {
  const record = {
    id: Math.floor(Math.random() * 1000000) + '',
    created_at: new Date().toISOString(),
    ...payload
  };
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([record])
        .select();
      if (!error) return { success: true, mode: 'supabase', data: data[0] };
      console.warn('Supabase testimonial save failed, falling back:', error);
    } catch (err) {
      console.error('Supabase testimonial save error:', err);
    }
  }
  const db = readLocalDb();
  db.testimonials.push(record);
  writeLocalDb(db);
  return { success: true, mode: 'local', data: record };
}

export async function deleteTestimonialItem(id) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (!error) return { success: true, mode: 'supabase' };
      console.warn('Supabase testimonial delete failed, falling back:', error);
    } catch (err) {
      console.error('Supabase testimonial delete error:', err);
    }
  }
  const db = readLocalDb();
  db.testimonials = db.testimonials.filter(item => item.id != id);
  writeLocalDb(db);
  return { success: true, mode: 'local' };
}

// --- ACTIVE OFFERS / ANNOUNCEMENTS ---
export async function getActiveOffer() {
  const defaultSettings = {
    id: '1',
    banner_text: '🕉️ Grand Opening Special: Get 20% off all Varanasi Studio Programs this week!',
    button_text: 'Claim Offer',
    button_link: '/pricing',
    is_active: true,
    whatsapp_phone: '916394554685',
    facebook_link: 'https://facebook.com/tapasyogavaranasi',
    instagram_link: 'https://instagram.com/tapasyogavaranasi',
    youtube_link: 'https://youtube.com/@tapasyogavaranasi',
    contact_email: 'contact@tapasyoga.in',
    seo_title: 'TAPAS Yoga — Clinical Yoga Therapy & Online Classes | Varanasi',
    seo_description: 'TAPAS Online Yoga Classes offers traditional Patanjali-based yoga therapy for diabetes, back pain, thyroid, PCOD, and stress. Join live classes from Varanasi\'s premier wellness center.',
    seo_keywords: 'yoga therapy, online yoga classes, Varanasi yoga, diabetes yoga, back pain yoga, PCOD yoga, clinical yoga, Patanjali yoga',
    seo_google_verification: ''
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_offers')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      if (!error && data) {
        return {
          ...defaultSettings,
          ...data,
          // Ensure empty strings also fallback to defaults
          whatsapp_phone: data.whatsapp_phone || defaultSettings.whatsapp_phone,
          facebook_link: data.facebook_link || defaultSettings.facebook_link,
          instagram_link: data.instagram_link || defaultSettings.instagram_link,
          youtube_link: data.youtube_link || defaultSettings.youtube_link,
          contact_email: data.contact_email || defaultSettings.contact_email,
          seo_title: data.seo_title || defaultSettings.seo_title,
          seo_description: data.seo_description || defaultSettings.seo_description,
          seo_keywords: data.seo_keywords || defaultSettings.seo_keywords,
          seo_google_verification: data.seo_google_verification || defaultSettings.seo_google_verification
        };
      }
      console.warn('Supabase site_offers fetch failed, falling back:', error);
    } catch (err) {
      console.error('Supabase site_offers fetch error:', err);
    }
  }
  const db = readLocalDb();
  const list = db.site_offers || [];
  const offer = list[0] || {};
  return {
    ...defaultSettings,
    ...offer,
    whatsapp_phone: offer.whatsapp_phone || defaultSettings.whatsapp_phone,
    facebook_link: offer.facebook_link || defaultSettings.facebook_link,
    instagram_link: offer.instagram_link || defaultSettings.instagram_link,
    youtube_link: offer.youtube_link || defaultSettings.youtube_link,
    contact_email: offer.contact_email || defaultSettings.contact_email,
    seo_title: offer.seo_title || defaultSettings.seo_title,
    seo_description: offer.seo_description || defaultSettings.seo_description,
    seo_keywords: offer.seo_keywords || defaultSettings.seo_keywords,
    seo_google_verification: offer.seo_google_verification || defaultSettings.seo_google_verification
  };
}

export async function updateActiveOffer(payload) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_offers')
        .upsert([{ id: 1, ...payload, updated_at: new Date().toISOString() }])
        .select();
      if (!error) return { success: true, mode: 'supabase', data: data[0] };
      console.warn('Supabase site_offers update failed, falling back:', error);
    } catch (err) {
      console.error('Supabase site_offers update error:', err);
    }
  }
  const db = readLocalDb();
  if (!db.site_offers || db.site_offers.length === 0) {
    db.site_offers = [{ id: '1', ...payload }];
  } else {
    db.site_offers[0] = { ...db.site_offers[0], ...payload };
  }
  writeLocalDb(db);
  return { success: true, mode: 'local', data: db.site_offers[0] };
}

// --- BLOG MANAGERS ---
export async function getBlogPosts() {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) return data;
      console.warn('Supabase blog_posts fetch failed:', error);
    } catch (err) {
      console.error('Supabase blog_posts fetch error:', err);
    }
  }
  const db = readLocalDb();
  return db.blog_posts || [];
}

export async function saveBlogPost(payload) {
  const record = {
    id: Math.floor(Math.random() * 1000000) + '',
    created_at: new Date().toISOString(),
    ...payload
  };
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([record])
        .select();
      if (!error) return { success: true, mode: 'supabase', data: data[0] };
      console.warn('Supabase blog_posts save failed, falling back:', error);
    } catch (err) {
      console.error('Supabase blog_posts save error:', err);
    }
  }
  const db = readLocalDb();
  if (!db.blog_posts) db.blog_posts = [];
  db.blog_posts.unshift(record); // Add to the top of list
  writeLocalDb(db);
  return { success: true, mode: 'local', data: record };
}

export async function deleteBlogPost(id) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (!error) return { success: true, mode: 'supabase' };
      console.warn('Supabase blog_posts delete failed, falling back:', error);
    } catch (err) {
      console.error('Supabase blog_posts delete error:', err);
    }
  }
  const db = readLocalDb();
  if (!db.blog_posts) db.blog_posts = [];
  db.blog_posts = db.blog_posts.filter(item => item.id != id);
  writeLocalDb(db);
  return { success: true, mode: 'local' };
}

