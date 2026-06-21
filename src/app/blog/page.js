'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight, Search, Sparkles, Send } from 'lucide-react';
import styles from './page.module.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Yoga Therapy for Diabetes',
    author: 'Dr. Priya Sharma',
    category: 'Yoga Therapy',
    date: 'March 15, 2024',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    excerpt: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values.',
    content: 'Research published in leading medical journals demonstrates that consistent yoga practice can improve insulin sensitivity, reduce fasting blood glucose levels, and decrease HbA1c values. Specific asanas like Paschimottanasana (Seated Forward Bend), Dhanurasana (Bow Pose), and Ardha Matsyendrasana (Half Spinal Twist) stimulate the pancreas and improve digestion. Pranayama techniques such as Kapalbhati and Bhastrika enhance metabolic function and support blood sugar regulation.'
  },
  {
    id: 2,
    title: 'New Weekend Ashtanga Series Starting Soon',
    author: 'Rajesh Kumar',
    category: 'Ashtanga Yoga',
    date: 'March 12, 2024',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
    excerpt: 'We\'re excited to announce a new weekend Ashtanga Yoga series for advanced practitioners. Join us every Saturday morning for traditional Primary Series practice.',
    content: 'The Ashtanga Primary Series is a set sequence of postures designed to purify and strengthen the body. Each Saturday, we\'ll guide you through the complete sequence, focusing on proper alignment, breath synchronization, and traditional vinyasa count.'
  },
  {
    id: 3,
    title: 'Free Meditation Workshop This Sunday',
    author: 'Amit Verma',
    category: 'Meditation',
    date: 'March 10, 2024',
    img: 'https://images.unsplash.com/photo-1506629905607-c1f40f4c57c1?w=800&h=400&fit=crop',
    excerpt: 'Join us for a free 90-minute meditation workshop this Sunday evening. Learn various meditation techniques from our experienced teacher, Amit Verma.',
    content: 'In this workshop, you\'ll learn mindfulness meditation, mantra meditation, and guided visualization techniques. Perfect for beginners and experienced practitioners alike. No prior experience required.'
  },
  {
    id: 4,
    title: '5 Morning Yoga Poses to Start Your Day Right',
    author: 'Swami Gyan Prakash',
    category: 'Health Tips',
    date: 'March 8, 2024',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
    excerpt: 'Discover simple yoga poses you can practice every morning to energize your body, calm your mind, and set a positive tone for the day ahead.',
    content: 'Starting your day with yoga doesn\'t have to be complicated. These five simple poses - Sun Salutation, Mountain Pose, Forward Fold, Warrior I, and Child\'s Pose - can transform your morning routine and set you up for a productive day.'
  },
  {
    id: 5,
    title: 'Student Spotlight: Overcoming Chronic Back Pain',
    author: 'Vikram Malhotra',
    category: 'Success Stories',
    date: 'March 5, 2024',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=400&fit=crop',
    excerpt: 'Read the inspiring story of one of our students who found relief from chronic back pain through our therapeutic yoga program.',
    content: 'After years of suffering from chronic lower back pain that limited her daily activities, Sarah discovered yoga therapy. Through a personalized program focusing on spinal alignment, core strengthening, and gentle stretches, she experienced remarkable improvement within just three months.'
  },
  {
    id: 6,
    title: 'Understanding Patanjali\'s Eight Limbs: Yamas',
    author: 'Swami Gyan Prakash',
    category: 'Yoga Philosophy',
    date: 'March 3, 2024',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    excerpt: 'Dive deep into the first limb of Patanjali\'s Ashtanga Yoga - Yamas. Learn how ethical principles guide our yoga practice and daily life.',
    content: 'The Yamas are the first of Patanjali\'s Eight Limbs of Yoga, representing ethical guidelines for how we interact with the world. This article explores the five Yamas: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), and Aparigraha (non-possessiveness).'
  }
];

const categories = ['All', 'Yoga Therapy', 'Health Tips', 'Yoga Philosophy', 'Success Stories', 'Ashtanga Yoga', 'Meditation'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const result = await res.json();
        if (res.ok && result.success && result.data && result.data.length > 0) {
          setPosts(result.data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    setMessage('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      setSubscribed(true);
      setMessage(data.message || 'Subscribed successfully!');
      setEmailInput('');
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.blogPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><BookOpen size={14} /> Knowledge Hub</span>
          <h1 className={styles.title}>Blog & News Feed</h1>
          <p className={styles.subtitle}>Explore standard yoga therapy guidelines, wellness tips, updates, and Vedic insights.</p>
        </div>
      </section>

      {/* ─── Blog Workspace ─── */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.workspaceGrid}>
            {/* Left Posts Feed */}
            <div className={styles.postsCol}>
              <div className={styles.searchBar}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {filteredPosts.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No articles found matching your query.</p>
                </div>
              ) : (
                <div className={styles.postsList}>
                  {filteredPosts.map((post) => (
                    <article key={post.id} className={`${styles.postCard} glass-card`}>
                      <div className={styles.imgContainer}>
                        <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 100vw, 800px" className={styles.img} style={{ objectFit: 'cover' }} />
                        <span className={styles.categoryBadge}>{post.category}</span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.meta}>
                          <span className={styles.metaItem}><User size={14} /> By {post.author}</span>
                          <span className={styles.metaItem}><Calendar size={14} /> {post.date}</span>
                        </div>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                        <div style={{ marginTop: '1.5rem' }}>
                          <Link href={`/blog/${post.id}`} className="btn-secondary" style={{ fontSize: '0.88rem', padding: '0.6rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            Read Full Article <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className={styles.sidebarCol}>
              {/* Category selector widget */}
              <div className="glass-card">
                <h4 className={styles.sidebarTitle}>Categories</h4>
                <div className={styles.categoriesList}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <ArrowRight size={12} className={styles.catBtnArrow} />
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h4 className={styles.sidebarTitle}>Popular Posts</h4>
                <div className={styles.popularList}>
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className={styles.popularItem}>
                      <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                        <h5 className={styles.popularItemTitle}>{post.title}</h5>
                      </Link>
                      <span className={styles.popularItemDate}>{post.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Subscribe */}
              <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h4 className={styles.sidebarTitle}>Newsletter</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Subscribe to receive specialized clinical postures, herbal recommendations, and updates directly in your inbox.
                </p>
                {subscribed ? (
                  <div style={{ color: 'var(--emerald)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} /> {message}
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className={styles.subForm}>
                    <input
                      type="email"
                      required
                      disabled={submitting}
                      placeholder="Your email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={styles.subInput}
                    />
                    <button type="submit" disabled={submitting} className={styles.subSubmitBtn}>
                      <Send size={14} />
                    </button>
                  </form>
                )}
                {submitError && (
                  <p style={{ color: 'var(--rose)', fontSize: '0.80rem', marginTop: '0.5rem' }}>
                    {submitError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
