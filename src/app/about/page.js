'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Target, Eye, Heart, GraduationCap, Users, Book, Compass, Leaf, Sparkles, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const limbs = [
  {
    num: '01',
    name: 'Yamas',
    translate: 'Ethical Restraints',
    desc: 'The five ethical principles for social harmony: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), and Aparigraha (non-possessiveness).'
  },
  {
    num: '02',
    name: 'Niyamas',
    translate: 'Observances',
    desc: 'The five personal practices for self-discipline: Saucha (purity), Santosha (contentment), Tapas (discipline/fire), Svadhyaya (self-study), and Ishvara Pranidhana (surrender to the divine).'
  },
  {
    num: '03',
    name: 'Asana',
    translate: 'Physical Postures',
    desc: 'The physical practice of yoga postures. At TAPAS, we teach various traditional styles including Hatha, Vinyasa, Iyengar, and Yin Yoga, integrated into specialized clinical therapy.'
  },
  {
    num: '04',
    name: 'Pranayama',
    translate: 'Breath Control',
    desc: 'Breathing techniques designed to expand, control, and channel life force (prana) energy. Critical for mental calmness, thyroid alignment, and blood pressure recovery.'
  },
  {
    num: '05',
    name: 'Pratyahara',
    translate: 'Sense Withdrawal',
    desc: 'The conscious withdrawal of attention from external distractions to turn awareness inward. The transition from physical practices to deep mental stabilization.'
  },
  {
    num: '06',
    name: 'Dharana',
    translate: 'Concentration',
    desc: 'One-pointed focus and sustained concentration on a single object, mantra, or chakra. Develops mental stamina, memory, and cognitive stability.'
  },
  {
    num: '07',
    name: 'Dhyana',
    translate: 'Meditation',
    desc: 'Sustained, uninterrupted flow of meditation where the observer and the observed merge. Reduces high cortisol levels, cures anxiety, and builds emotional resilience.'
  },
  {
    num: '08',
    name: 'Samadhi',
    translate: 'Absorption / Unity',
    desc: 'The ultimate state of complete absorption and cosmic union, transcending the ego-self to discover pure consciousness, absolute peace, and liberation.'
  }
];

const values = [
  { icon: <Compass size={24} />, title: 'Compassion', desc: 'We approach each student with deep empathy, acknowledging that healing and restoration are deeply personal.' },
  { icon: <GraduationCap size={24} />, title: 'Excellence', desc: 'We hold our teaching methods to the highest clinical and spiritual standards, ensuring authentic transmission.' },
  { icon: <Heart size={24} />, title: 'Accessibility', desc: 'We believe life-saving yoga science should be accessible to anyone, regardless of physical or financial capacity.' },
  { icon: <Book size={24} />, title: 'Tradition', desc: 'We honor and preserve pure Patanjali Vedic principles, preventing dilution in contemporary fitness hypes.' },
  { icon: <Users size={24} />, title: 'Community', desc: 'We nurture a highly supportive global community that inspires growth, healing, and spiritual bonding.' },
  { icon: <Leaf size={24} />, title: 'Wellness', desc: 'We focus on absolute, holistic well-being, integrating endocrine, skeletal, mental, and energy frameworks.' }
];

export default function AboutPage() {
  const [activeLimb, setActiveLimb] = useState(0);

  return (
    <div className={styles.aboutPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className="section-badge"><Sparkles size={14} /> Varanasi Sanctuary</span>
              <h1 className={styles.title}>TAPAS YOGA THERAPY & WELLNESS CENTER</h1>
              <p className={styles.subtitle}>A Premium Sacred Wellness Hub & Clinical Restoration Center in Varanasi</p>
              <p className={styles.desc}>
                Founded on the ancient, spiritual banks of Varanasi, TAPAS Yoga was established with a singular vision: to bridge the gap between profound Vedic wisdom and modern clinical sciences. We do not view yoga as a generic fitness trend or a set of standard exercises. Following Patanjali's Yoga Sutras, we treat yoga as a precise, diagnostic science of biological auto-repair.
              </p>
              <p className={styles.desc}>
                In Sanskrit, <strong>"Tapas"</strong> translates to the inner fire of discipline—the purification process that burns away disease and physical blockages. Our Varanasi sanctuary near Happy Model School provides a high-vibrational space where students are guided by certified Yogacharyas through target-specific alignment and restorative breathing protocols. Whether you seek relief from chronic back pain or look to manage diabetes naturally, TAPAS Yoga provides a drug-free, transformative path to wellness.
              </p>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.imageContainer}>
                <Image src="/images/about_sanctuary.png" alt="TAPAS Yoga Therapy Sanctuary Varanasi" width={800} height={533} className={styles.image} />
                <div className={styles.imageGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className="glass-card">
              <div className="feature-icon violet"><Target size={28} /></div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardDesc}>
                To provide authentic, accessible, and scientifically validated yoga therapy that targets lifestyle diseases and promotes deep physical, mental, and energetic healing for practitioners globally.
              </p>
            </div>
            <div className="glass-card">
              <div className="feature-icon cyan"><Eye size={28} /></div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardDesc}>
                To establish a premium global standard in Clinical Yoga Therapy, preserving sacred Vedic knowledge while integrating it with modern clinical diagnostics to replace surgeries and pills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy (Limbs) Accordion ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Book size={14} /> Sacred Science</span>
            <h2 className="section-title">The Eight Limbs of Yoga</h2>
            <p className="section-subtitle">Based on Patanjali's Yoga Sutras, the systematic map to complete self-restoration and alignment.</p>
          </div>

          <div className={styles.limbsWrapper}>
            <div className={styles.limbsList}>
              {limbs.map((limb, index) => {
                const isActive = activeLimb === index;
                return (
                  <div
                    key={index}
                    className={`${styles.limbItem} ${isActive ? styles.limbActive : ''}`}
                    onClick={() => setActiveLimb(index)}
                  >
                    <div className={styles.limbHeader}>
                      <span className={styles.limbNum}>{limb.num}</span>
                      <div className={styles.limbTitleContainer}>
                        <h4 className={styles.limbName}>{limb.name}</h4>
                        <span className={styles.limbTranslate}>{limb.translate}</span>
                      </div>
                      <div className={styles.limbIcon}>
                        {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {isActive && (
                      <div className={styles.limbContent}>
                        <p>{limb.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={`${styles.limbDetailsCard} glass-card`}>
              <div className={styles.detailsHeader}>
                <span className={styles.largeNum}>{limbs[activeLimb].num}</span>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '2rem', fontWeight: 800 }}>
                    {limbs[activeLimb].name}
                  </h3>
                  <span style={{ color: 'var(--cyan)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
                    {limbs[activeLimb].translate}
                  </span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginTop: '1.5rem' }}>
                {limbs[activeLimb].desc}
              </p>
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                <Link href="/schedule" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Practice this Path <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Shield size={14} /> Integrity</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The foundational principles that guide every session, therapy, and student interaction.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="feature-icon cyan">{v.icon}</div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.15rem' }}>{v.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Learn from Our Instructors?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>Get personalized, live clinical attention online or visit our sacred Varanasi space.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/teachers" className="btn-primary">Meet Our Teachers</Link>
            <Link href="/contact" className="btn-secondary">Get Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
