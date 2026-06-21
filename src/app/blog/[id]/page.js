import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, BookOpen, Sparkles, Send } from 'lucide-react';
import styles from '../page.module.css';
import { getBlogPosts } from '@/lib/leadsStore';

// Duplicate local data representation to avoid database dependency in static compilation
const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Yoga Therapy for Diabetes',
    author: 'Dr. Priya Sharma',
    category: 'Yoga Therapy',
    date: 'March 15, 2024',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    excerpt: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values.',
    content: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values. Specific asanas like Paschimottanasana (Seated Forward Bend), Dhanurasana (Bow Pose), and Ardha Matsyendrasana (Half Spinal Twist) stimulate the pancreas and improve digestion. Pranayama techniques such as Kapalbhati and Bhastrika enhance metabolic function and support blood sugar regulation. Regular dynamic sequences paired with these twists facilitate abdominal organ massage, lowering stress cortisol levels and directly boosting autonomic system health.'
  },
  {
    id: 2,
    title: 'New Weekend Ashtanga Series Starting Soon',
    author: 'Rajesh Kumar',
    category: 'Ashtanga Yoga',
    date: 'March 12, 2024',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
    excerpt: 'We\'re excited to announce a new weekend Ashtanga Yoga series for advanced practitioners. Join us every Saturday morning for traditional Primary Series practice.',
    content: 'The Ashtanga Primary Series is a set sequence of postures designed to purify and strengthen the body. Each Saturday, we\'ll guide you through the complete sequence, focusing on proper alignment, breath synchronization, and traditional vinyasa count. Ashtanga is an intense physical discipline that builds deep internal heat (tapas), builds muscular stamina, decompresses spinal pressure points, and clears neural pathways. This program is ideal for individuals who want to establish a strict, self-transforming daily physical regimen.'
  },
  {
    id: 3,
    title: 'Free Meditation Workshop This Sunday',
    author: 'Amit Verma',
    category: 'Meditation',
    date: 'March 10, 2024',
    img: 'https://images.unsplash.com/photo-1506629905607-c1f40f4c57c1?w=800&h=400&fit=crop',
    excerpt: 'Join us for a free 90-minute meditation workshop this Sunday evening. Learn various meditation techniques from our experienced teacher, Amit Verma.',
    content: 'In this workshop, you\'ll learn mindfulness meditation, mantra meditation, and guided visualization techniques. Perfect for beginners and experienced practitioners alike. No prior experience required. You will discover practical ways to calm the sympathetic nervous system, reset elevated blood pressure levels, and manage clinical anxiety triggers. We recommend wearing comfortable clothes and bringing a notebook to record guidance on daily routines.'
  },
  {
    id: 4,
    title: '5 Morning Yoga Poses to Start Your Day Right',
    author: 'Swami Gyan Prakash',
    category: 'Health Tips',
    date: 'March 8, 2024',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
    excerpt: 'Discover simple yoga poses you can practice every morning to energize your body, calm your mind, and set a positive tone for the day ahead.',
    content: 'Starting your day with yoga doesn\'t have to be complicated. These five simple poses - Sun Salutation, Mountain Pose, Forward Fold, Warrior I, and Child\'s Pose - can transform your morning routine and set you up for a productive day. Each sequence increases core blood flow, stretches long muscle chains, and integrates oxygenation pathways. Practicing even 15 minutes right after waking up resets metabolic speed, regulates endocrine functions, and builds spinal flexibility for the rest of your day.'
  },
  {
    id: 5,
    title: 'Student Spotlight: Overcoming Chronic Back Pain',
    author: 'Vikram Malhotra',
    category: 'Success Stories',
    date: 'March 5, 2024',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=400&fit=crop',
    excerpt: 'Read the inspiring story of one of our students who found relief from chronic back pain through our therapeutic yoga program.',
    content: 'After years of suffering from chronic lower back pain that limited her daily activities, Sarah discovered yoga therapy. Through a personalized program focusing on spinal alignment, core strengthening, and gentle stretches, she experienced remarkable improvement within just three months. Our alignment routines focus on minor disc decompressions, muscle strengthening, and hamstring lengthening. Combined with specific Ayurvedic warm oils, this holistic therapy restores flexibility and relieves spasms without needing surgery.'
  },
  {
    id: 6,
    title: 'Understanding Patanjali\'s Eight Limbs: Yamas',
    author: 'Swami Gyan Prakash',
    category: 'Yoga Philosophy',
    date: 'March 3, 2024',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    excerpt: 'Dive deep into the first limb of Patanjali\'s Ashtanga Yoga - Yamas. Learn how ethical principles guide our yoga practice and daily life.',
    content: 'The Yamas are the first of Patanjali\'s Eight Limbs of Yoga, representing ethical guidelines for how we interact with the world. This article explores the five Yamas: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), and Aparigraha (non-possessiveness). By incorporating Yamas into daily life, practitioners establish a mental ecosystem of peace, clarity, and harmony. Ethical discipline creates the foundation for higher states of dhyana (meditation) and complete self-realization.'
  }
];

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id.toString() === id.toString());
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} — TAPAS Yoga Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.img,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id.toString() === id.toString());

  if (!post) {
    notFound();
  }

  // Sidebar popular posts links
  const popularPosts = posts.filter((p) => p.id.toString() !== post.id.toString()).slice(0, 3);

  return (
    <div className={styles.blogPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <Link href="/blog" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none', padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="section-badge" style={{ display: 'inline-block', marginBottom: '1rem' }}><BookOpen size={14} /> {post.category}</span>
          <h1 className={styles.title} style={{ fontSize: '2.5rem', lineHeight: '1.2', textAlign: 'left', maxWidth: '900px' }}>
            {post.title}
          </h1>
          <div className={styles.meta} style={{ marginTop: '1.5rem', marginBottom: 0 }}>
            <span className={styles.metaItem}><User size={14} /> By {post.author}</span>
            <span className={styles.metaItem}><Calendar size={14} /> {post.date}</span>
          </div>
        </div>
      </section>

      {/* ─── Main Content Layout ─── */}
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className={styles.workspaceGrid}>
            
            {/* Left Column: Post Details */}
            <div className={styles.postsCol}>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2.5rem' }}>
                  <p style={{ color: 'var(--cyan)', fontSize: '1.15rem', fontWeight: 500, lineHeight: '1.8', fontStyle: 'italic', marginBottom: '2rem', borderLeft: '3px solid var(--cyan)', paddingLeft: '1.25rem' }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '2.0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {post.content.split('. ').map((paragraph, index) => {
                      if (!paragraph.trim()) return null;
                      return (
                        <p key={index}>
                          {paragraph.trim()}{index < post.content.split('. ').length - 1 ? '.' : ''}
                        </p>
                      );
                    })}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', flexWrap: 'wrap' }}>
                    <span className="section-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--cyan)' }}>Clinical Yoga</span>
                    <span className="section-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--violet)' }}>Ayurvedic Wisdom</span>
                    <span className="section-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald)' }}>Holistic Health</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className={styles.sidebarCol}>
              {/* Popular articles */}
              <div className="glass-card">
                <h4 className={styles.sidebarTitle}>Other Readables</h4>
                <div className={styles.popularList}>
                  {popularPosts.map((popular) => (
                    <div key={popular.id} className={styles.popularItem}>
                      <Link href={`/blog/${popular.id}`} style={{ textDecoration: 'none' }}>
                        <h5 className={styles.popularItemTitle}>{popular.title}</h5>
                      </Link>
                      <span className={styles.popularItemDate}>{popular.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h4 className={styles.sidebarTitle}>Subscribe</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Get the latest wellness assessment guides and Varanasi live class schedules directly in your inbox.
                </p>
                <Link href="/blog" className="btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  Subscribe to Newsletter
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
