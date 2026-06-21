'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Sparkles, Quote, MessageSquare, Filter } from 'lucide-react';
import styles from './page.module.css';

const testimonialsData = [
  {
    name: 'Sarah Johnson',
    tag: 'diabetes',
    program: 'Diabetes Management',
    since: '2022',
    text: 'TAPAS Yoga has transformed my life completely. I came to them with severe diabetes and high stress levels. The therapeutic yoga sessions, especially the diabetes management program, helped me reduce my medication and improve my blood sugar control. The teachers are incredibly knowledgeable and supportive.'
  },
  {
    name: 'Michael Chen',
    tag: 'vinyasa',
    program: 'Vinyasa Flow',
    since: '2021',
    text: 'The online classes are absolutely excellent. I travel frequently for work, but I never have to miss a class. I can practice from anywhere in the world with world-class teachers. The video quality is great, and the teachers provide personalized attention even in group classes.'
  },
  {
    name: 'Emily Rodriguez',
    tag: 'backpain',
    program: 'Back Pain Therapy',
    since: '2023',
    text: 'After years of chronic back pain that prevented me from enjoying my daily activities, yoga therapy gave me relief I never thought possible. Vikram Malhotra designed a personalized program that addressed my specific issues. I\'m pain-free now and have my life back!'
  },
  {
    name: 'David Thompson',
    tag: 'hatha',
    program: 'Hatha Yoga',
    since: '2021',
    text: 'I\'ve tried many yoga studios, but TAPAS Yoga stands out for its authentic teaching based on Patanjali\'s Yoga Sutras. Swami Gyan Prakash\'s classes are profound and transformative. I\'ve learned so much about yoga philosophy along with the physical practice.'
  },
  {
    name: 'Priya Patel',
    tag: 'prenatal',
    program: 'Prenatal Yoga',
    since: '2023',
    text: 'The prenatal yoga classes with Deepika Singh were a blessing during my pregnancy. I felt strong, flexible, and calm throughout. The breathing techniques I learned were invaluable during labor. I highly recommend these classes to all expecting mothers.'
  },
  {
    name: 'Robert Wilson',
    tag: 'hypertension',
    program: 'Hypertension Therapy',
    since: '2022',
    text: 'Yoga therapy for hypertension has been life-changing. My blood pressure has normalized without increasing medication. The combination of gentle postures, breathing exercises, and meditation has not only improved my physical health but also my mental well-being.'
  },
  {
    name: 'Lisa Anderson',
    tag: 'all',
    program: 'All Levels',
    since: '2022',
    text: 'I started with the beginner Hatha classes and gradually progressed to Vinyasa Flow. The teachers are patient, encouraging, and always ensure proper alignment. The community here is welcoming, and I\'ve made wonderful friends through the classes.'
  },
  {
    name: 'James Martinez',
    tag: 'meditation',
    program: 'Meditation',
    since: '2021',
    text: 'The meditation classes with Amit Verma have transformed my mental health. I\'ve learned to manage stress and anxiety effectively. The techniques are practical and can be applied in daily life. Highly recommend for anyone struggling with stress or anxiety.'
  },
  {
    name: 'Maria Garcia',
    tag: 'yin',
    program: 'Yin Yoga',
    since: '2022',
    text: 'Yin Yoga with Sneha Reddy is exactly what I needed for my busy lifestyle. The classes help me unwind, release tension, and find inner peace. It\'s become an essential part of my self-care routine.'
  },
  {
    name: 'Tom Brown',
    tag: 'iyengar',
    program: 'Iyengar Yoga',
    since: '2023',
    text: 'The Iyengar classes with Anita Patel are exceptional. Her attention to alignment and use of props has helped me recover from a shoulder injury. I appreciate the therapeutic approach and individual attention even in group classes.'
  },
  {
    name: 'Patricia Lee',
    tag: 'arthritis',
    program: 'Arthritis Therapy',
    since: '2022',
    text: 'As someone with arthritis, I was skeptical about yoga. But the gentle, therapeutic approach here has been amazing. My joint pain has reduced significantly, and I\'ve regained flexibility I thought I had lost forever.'
  },
  {
    name: 'Chris Taylor',
    tag: 'ashtanga',
    program: 'Ashtanga Yoga',
    since: '2021',
    text: 'The Ashtanga classes with Rajesh Kumar are challenging but incredibly rewarding. I\'ve built strength, flexibility, and mental discipline I never knew I had. The traditional practice is authentic and transformative.'
  }
];

const filters = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Therapy & Healing', value: 'therapy' },
  { label: 'General Practice', value: 'general' },
  { label: 'Meditation', value: 'meditation' }
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [testimonials, setTestimonials] = useState(testimonialsData);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const result = await res.json();
        if (res.ok && result.success && result.data && result.data.length > 0) {
          setTestimonials([...result.data, ...testimonialsData]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  const filteredReviews = testimonials.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'therapy') {
      return ['diabetes', 'backpain', 'hypertension', 'arthritis', 'prenatal'].includes(item.tag);
    }
    if (activeFilter === 'general') {
      return ['vinyasa', 'hatha', 'ashtanga', 'yin', 'iyengar', 'all'].includes(item.tag);
    }
    if (activeFilter === 'meditation') {
      return item.tag === 'meditation';
    }
    return true;
  });

  return (
    <div className={styles.testimonialsPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Star size={14} /> Reviews</span>
          <h1 className={styles.title}>Student Success Stories</h1>
          <p className={styles.subtitle}>Read real-life physical transformations and experiences from our yoga community.</p>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filters}>
            {filters.map((f) => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                <Filter size={12} /> {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Grid ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.reviewsGrid}>
            {filteredReviews.map((item, index) => (
              <div key={index} className={`${styles.reviewCard} glass-card`}>
                <div className={styles.cardHeader}>
                  <div className={styles.quoteWrapper}>
                    <Quote size={28} className={styles.quoteIcon} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.1rem', color: 'var(--amber)' }}>
                    {[...Array(item.rating || 5)].map((_, i) => <Star key={i} size={14} fill="var(--amber)" stroke="var(--amber)" />)}
                  </div>
                </div>
                <p className={styles.reviewText}>"{item.text}"</p>
                <div className={styles.cardFooter}>
                  <strong className={styles.authorName}>{item.name}</strong>
                  <span className={styles.authorMeta}>
                    Student since {item.since} • {item.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container text-center">
          <h2 className="section-title">Start Your Own Healing Story</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Daily clinical yoga practices keep you away from clinical dependency and physical blocks.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Book Consultation Call</Link>
            <Link href="/schedule" className="btn-secondary">Explore Class Schedules</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
