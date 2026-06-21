'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Award, Compass, MessageCircle, Star, Sparkles, Filter } from 'lucide-react';
import styles from './page.module.css';

const teachersData = [
  {
    name: 'Swami Gyan Prakash',
    title: 'Senior Yoga Master',
    desc: 'With over 30 years of experience in traditional yoga, Swami Gyan Prakash is a master of Patanjali\'s Yoga Sutras and therapeutic applications. Trained in India\'s most respected traditional Vedic ashrams.',
    specialties: ['Hatha Yoga', 'Meditation', 'Yoga Philosophy'],
    category: 'meditation'
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Yoga Therapist & Ayurvedic Doctor',
    desc: 'Dr. Priya combines her medical science qualifications with yoga therapy expertise. She specializes in clinical yoga routines for chronic disease recovery and hormonal reset.',
    specialties: ['Yoga Therapy', 'Ayurveda', 'Restorative Yoga'],
    category: 'therapy'
  },
  {
    name: 'Rajesh Kumar',
    title: 'Vinyasa & Power Yoga Expert',
    desc: 'Dynamic and energetic teacher specializing in athletic flow states and power conditioning. Known for creative sequences that build strength while retaining anatomical alignment.',
    specialties: ['Vinyasa', 'Power Yoga', 'Ashtanga'],
    category: 'vinyasa'
  },
  {
    name: 'Anita Patel',
    title: 'Iyengar & Alignment Specialist',
    desc: 'Certified Iyengar instructor with an intense focus on bone alignment and skeletal symmetry. Excellent for students with back pain, spinal spasicity, or postural faults.',
    specialties: ['Iyengar', 'Alignment', 'Therapeutic'],
    category: 'therapy'
  },
  {
    name: 'Sneha Reddy',
    title: 'Yin & Restorative Yoga',
    desc: 'Nurturing instructor specializing in passive deep connective tissue stretching (Yin) and nervous system reset. Highly effective for cortisol reduction and emotional calm.',
    specialties: ['Yin Yoga', 'Restorative', 'Meditation'],
    category: 'meditation'
  },
  {
    name: 'Amit Verma',
    title: 'Pranayama & Meditation Master',
    desc: 'Deep lineage knowledge of traditional breathing patterns and mental quietude. Specializes in helping students overcome clinical anxiety, insomnia, and high blood pressure.',
    specialties: ['Pranayama', 'Meditation', 'Mental Health'],
    category: 'meditation'
  },
  {
    name: 'Deepika Singh',
    title: 'Prenatal & Women\'s Yoga',
    desc: 'Specialized training in prenatal and postnatal anatomical sequences. Supports women through pregnancy stages and hormonal cycles with safe, nurturing techniques.',
    specialties: ['Prenatal', 'Women\'s Health', 'Gentle Yoga'],
    category: 'prenatal'
  },
  {
    name: 'Vikram Malhotra',
    title: 'Back Pain & Spine Specialist',
    desc: 'Clinical yoga therapist focusing on disc decompression, sciatica, and structural rehabilitation. Works closely with spinal injury recovery programs.',
    specialties: ['Therapy', 'Spine Health', 'Rehabilitation'],
    category: 'therapy'
  },
  {
    name: 'Meera Joshi',
    title: 'Diabetes & Metabolic Health',
    desc: 'Therapist specializing in metabolic rates and glucose stabilization cycles. Blends targeted abdominal twists with Ayurvedic nutrition guidelines.',
    specialties: ['Diabetes', 'Metabolic Health', 'Lifestyle Medicine'],
    category: 'therapy'
  }
];

export default function TeachersPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTeachers = teachersData.filter(t => {
    return activeCategory === 'all' || t.category === activeCategory;
  });

  return (
    <div className={styles.teachersPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Star size={14} /> Our Yogacharyas</span>
          <h1 className={styles.title}>Meet Our Teachers</h1>
          <p className={styles.subtitle}>Experienced, certified instructors and therapists dedicated to your physical restoration.</p>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filters}>
            {['all', 'therapy', 'vinyasa', 'meditation', 'prenatal'].map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <Filter size={12} /> {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Teachers Grid ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.teachersGrid}>
            {filteredTeachers.map((teacher, index) => (
              <div key={index} className={`${styles.teacherCard} glass-card`}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarRing}>
                    <User size={48} className={styles.avatarIcon} />
                  </div>
                </div>
                <h3 className={styles.teacherName}>{teacher.name}</h3>
                <span className={styles.teacherTitle}>{teacher.title}</span>
                <p className={styles.teacherDesc}>{teacher.desc}</p>
                <div className={styles.specialties}>
                  {teacher.specialties.map((spec, i) => (
                    <span key={i} className={styles.specBadge}>{spec}</span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                  <a
                    href={`https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(teacher.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    <MessageCircle size={14} /> Connect on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Qualifications ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Award size={14} /> Accreditation</span>
            <h2 className="section-title">Qualifications & Credentials</h2>
            <p className="section-subtitle">We hold our teaching credentials to the highest global standard of clinical safety.</p>
          </div>
          <div className={styles.accreditations}>
            <div className="glass-card">
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>Recognized Certifications</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every single therapist and instructor is accredited by leading boards, including the **Yoga Alliance International (YAI)**, the **International Association of Yoga Therapists (IAYT)**, or certified directly by premium traditional schools in India.
              </p>
            </div>
            <div className="glass-card">
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>Continuous Assessment</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our team undergoes continuous anatomical education, pulse assessment (Nadi Pariksha) courses, and physiological studies to merge pure Patanjali lineages with modern clinical protocols safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Experience Authentic Yogic Guidance</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Book a complimentary session with our senior teachers and start your healing journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/schedule" className="btn-primary">View Timetable</Link>
            <Link href="/contact" className="btn-secondary">Request Assessment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
