'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Check, Sparkles, Filter, Search, Shield, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const classesData = [
  {
    id: 1,
    name: 'Ashtanga Yoga Masterclass',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    duration: '60 mins',
    level: 'Intermediate-Advanced',
    levelKey: 'intermediate',
    desc: 'Immerse yourself in the traditional, dynamic practice of Ashtanga Yoga, focusing on a rigorously structured sequence of progressive postures. This class is meticulously designed to build tremendous physical strength, unwavering mental discipline, and profound inner stamina. Through the synchronization of breath with a progressive series of postures—a process producing intense internal heat—you will experience deep systemic detoxification. Expect to dramatically improve your cardiovascular fitness, tone muscle comprehensively, and master the art of moving meditation under the expert guidance of our certified senior instructors.',
    points: ['Set Vinyasa Sequences for Deep Focus', 'Builds Tremendous Core Strength & Stamina', 'Authentic Traditional Sanskrit Roots', 'Intense Systemic Detoxification']
  },
  {
    id: 2,
    name: 'Vinyasa Flow Dynamics',
    img: '/images/vinyasa.png',
    duration: '60 mins',
    level: 'All Levels',
    levelKey: 'beginner',
    desc: 'Experience dynamic, highly creative flows linking conscious breathwork with fluid, continuous physical movements. Vinyasa Flow promotes unparalleled cardiovascular stamina, precise muscle toning, and enhanced joint flexibility. Each session is unique, allowing the instructor to tailor the sequence to the energy of the room, ensuring a full-body workout that challenges both the mind and the physical form. Perfect for practitioners looking to cultivate grace, agility, and a deeply mindful connection to their physical movements while elevating their heart rate safely.',
    points: ['Seamless Breath-to-Movement Synchronization', 'Highly Creative & Varied Flow Sequences', 'Significantly Improved Joint Mobility', 'Elevates Heart Rate & Burns Calories']
  },
  {
    id: 3,
    name: 'Athletic Power Yoga',
    img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
    duration: '60 mins',
    level: 'Intermediate-Advanced',
    levelKey: 'advanced',
    desc: 'Step into a high-intensity, athletic fitness-focused practice combining advanced core strength exercises with rapid, dynamic transitions. Power Yoga is engineered for those who want to push their physical boundaries, shaping and defining muscle tone effectively while building incredible cardiovascular endurance. This vigorous practice demands focus and determination, utilizing the body\'s own resistance to sculpt lean muscle and optimize physical conditioning. Prepare to sweat, challenge your limits, and leave feeling exceptionally empowered.',
    points: ['High Energy, Fast-Paced Routine', 'Intense Core Strength & Muscle Endurance', 'Superior Athletic Conditioning', 'Maximizes Calorie Burn & Fat Loss']
  },
  {
    id: 4,
    name: 'Metabolic Dynamic Yoga',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
    duration: '60 mins',
    level: 'Intermediate',
    levelKey: 'intermediate',
    desc: 'Engage in highly active physical sequences that integrate fluid movement, rapid balance postures, and sustained heat-generating cycles. Specifically designed to revitalize slow metabolism levels, this class acts as a catalyst for cellular energy production. By focusing on rapid shifts in center of gravity and sustained isometric holds, practitioners develop profound functional strength and heightened proprioception. This is an excellent choice for individuals seeking to optimize their metabolic rate and improve overall bodily agility.',
    points: ['Advanced Heat-Building Postural Cycles', 'Enhanced Stamina & Proprioceptive Balance', 'Targeted Metabolic Optimization', 'Develops Functional Real-World Strength']
  },
  {
    id: 5,
    name: 'Clinical Therapeutic Yoga',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    duration: '60 mins',
    level: 'All Levels',
    levelKey: 'beginner',
    desc: 'A gentle, highly specific alignment-oriented restorative yoga practice utilizing a variety of supportive props. This class is tailored explicitly for structural bone recovery, joint health rehabilitation, and deep tissue structural healing. Guided by clinical yoga therapists, participants move through postures designed to alleviate chronic pain, correct postural imbalances, and safely restore mobility after injury. It is a deeply healing environment focusing on precise biomechanics rather than intense physical exertion.',
    points: ['Precise Spinal & Joint Alignment Focus', 'Extensive Use of Props for Support', 'Ideal for Injury Recovery & Rehabilitation', 'Guided by Certified Clinical Therapists']
  },
  {
    id: 6,
    name: 'Targeted Weight Loss Yoga',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    duration: '60 mins',
    level: 'All Levels',
    levelKey: 'beginner',
    desc: 'Combines highly active fat-burning poses with heat-inducing pranayamas and continuous metabolic flows to support healthy, sustained body weight reduction. This class focuses on stimulating the endocrine system, particularly the thyroid gland, to enhance the body\'s natural fat-burning capabilities. Accompanied by detoxifying twists and deep core compressions, practitioners will experience a comprehensive workout that not only aids in weight management but also deeply cleanses the internal organs for radiant overall health.',
    points: ['Dedicated Calorie Burning Postures', 'Deeply Detoxifying Core Twists', 'Stimulates Thyroid for Weight Management', 'Builds Lean Muscle Definition']
  },
  {
    id: 7,
    name: 'Clinical Stress & Anxiety Relief',
    img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400',
    duration: '60 mins',
    level: 'Beginner Friendly',
    levelKey: 'beginner',
    desc: 'Utilizes restorative cooling breathing techniques, gentle supportive postures, and profound guided Shavasana relaxation meticulously designed to reset hyper-anxious nervous systems. In today’s high-stress environment, this class offers an essential sanctuary to lower elevated cortisol levels, slow down racing thoughts, and relieve physical tension stored in the deep fascia. Highly recommended for individuals suffering from insomnia, chronic fatigue, or acute anxiety, promoting deep, restorative sleep and emotional equilibrium.',
    points: ['Resets the Parasympathetic Nervous System', 'Significantly Reduces Stress Cortisol', 'Restores Deep, Restful Sleep Patterns', 'Releases Deep-Seated Emotional Tension']
  },
  {
    id: 8,
    name: 'Chronic Disease Management',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    duration: '60 mins',
    level: 'Special Intake',
    levelKey: 'intermediate',
    desc: 'Engage in specialized therapeutic cycles specifically aimed at managing and reversing chronic disorders such as Diabetes, Hypertension, Thyroid anomalies, and PCOD under expert yogic clinical care. This is a highly targeted class that acts as an adjunct to medical treatment, employing precise asanas that massage internal organs, stimulate glandular secretions, and regulate blood pressure. Our clinical experts monitor progress to ensure safe, effective practice tailored to specific physiological needs.',
    points: ['Specific Pancreatic Stimulation Poses', 'Hormonal & Endocrine Balancing Cycles', 'Clinical Yogic Support for Chronic Illness', 'Regulates Blood Pressure Naturally']
  },
  {
    id: 9,
    name: 'Advanced Meditation & Pranayama',
    img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
    duration: '60 mins',
    level: 'All Levels',
    levelKey: 'beginner',
    desc: 'Dive into deep mindfulness practice focusing exclusively on advanced breath expansion (Pranayama) and profound mental control techniques. This session cultivates internal harmony, deep unwavering peace, and heightened self-awareness. By mastering the life force (Prana), practitioners can achieve states of extreme mental clarity, drastically reduce baseline stress, and unlock higher states of consciousness. It is the perfect complement to any physical Asana practice, completing the holistic yoga experience.',
    points: ['Advanced Pranayama Breathing Techniques', 'Guided Deep Mindfulness Exercises', 'Cultivates Profound Mental Peace & Quiet', 'Enhances Concentration & Cognitive Clarity']
  }
];

const levelCards = [
  { badge: 'Beginner', title: 'Level 1: The Foundation', desc: 'Perfect for those completely new to yoga or returning after a long hiatus. In this level, we meticulously focus on basic physical postures (Asanas), vital alignment fundamentals to prevent injury, and introductory breathing techniques (Pranayama). Our compassionate instructors ensure you build a rock-solid, safe foundation before progressing. Absolutely no prior experience or flexibility is required.', border: 'var(--emerald)' },
  { badge: 'Intermediate', title: 'Level 2: The Deepening', desc: 'Designed for practitioners who have established a consistent foundational practice. Level 2 builds upon the basics by introducing more challenging and complex poses, significantly longer postural holds to build muscular endurance, and advanced breathing techniques that stimulate internal energy flow. You will begin to seamlessly link breath with movement in more demanding Vinyasa sequences.', border: 'var(--amber)' },
  { badge: 'Advanced', title: 'Level 3: The Mastery', desc: 'Tailored specifically for highly experienced and dedicated practitioners. This rigorous level encompasses highly advanced physical postures, complex arm balances, sustained inversions, and an intensely deep exploration of traditional yogic philosophy and energetic anatomy. Expect to be pushed to your physical and mental limits in a safe, expertly guided environment that demands absolute focus and control.', border: 'var(--violet)' }
];

export default function ClassesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classesData.filter((cls) => {
    const matchesFilter = activeFilter === 'all' || cls.levelKey === activeFilter;
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cls.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.classesPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Sparkles size={14} /> Our Offerings</span>
          <h1 className={styles.title}>Our Yoga Classes</h1>
          <p className={styles.subtitle}>Explore various styles of yoga to find the perfect practice for you</p>
        </div>
      </section>

      {/* ─── Search & Filters ─── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterWrapper}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search classes (e.g. Ashtanga, Stress)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filters}>
              {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button
                  key={lvl}
                  className={`${styles.filterBtn} ${activeFilter === lvl ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(lvl)}
                >
                  <Filter size={14} /> {lvl.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Classes Grid ─── */}
      <section className="section">
        <div className="container">
          {filteredClasses.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No classes found matching your criteria. Try resetting filters.</p>
              <button className="btn-secondary" style={{ marginTop: '1.5rem' }} onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.classesGrid}>
              {filteredClasses.map((cls) => (
                <div key={cls.id} className={`${styles.classCard} glass-card`}>
                  <div className={styles.cardImgContainer}>
                    <Image src={cls.img} alt={cls.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.cardImg} />
                    <span className={styles.levelBadge}>{cls.level}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{cls.name}</h3>
                    <div className={styles.duration}>
                      <Clock size={16} /> <span>{cls.duration}</span>
                    </div>
                    <p className={styles.cardDesc}>{cls.desc}</p>
                    <ul className={styles.pointsList}>
                      {cls.points.map((pt, i) => (
                        <li key={i}>
                          <Check size={14} className={styles.checkIcon} /> <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Link href="/schedule" className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                        Class Schedule
                      </Link>
                      <Link href="/pricing" className="btn-secondary" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                        View Pricing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Class Levels Info ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Shield size={14} /> Path Progression</span>
            <h2 className="section-title">Yoga Class Levels</h2>
            <p className="section-subtitle">Choose the level that suits your experience and clinical needs</p>
          </div>
          <div className={styles.levelsGrid}>
            {levelCards.map((level, i) => (
              <div key={i} className="glass-card" style={{ borderTop: `4px solid ${level.border}`, textAlign: 'center' }}>
                <span className={styles.levelCardBadge} style={{ background: `${level.border}15`, color: level.border }}>
                  {level.badge}
                </span>
                <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 800, margin: '1rem 0 0.75rem' }}>
                  {level.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call to action ─── */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Need Help Choosing a Class?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Book a complimentary 15-minute diagnostic call with one of our certified clinical yoga therapists.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Book Consultation</Link>
            <Link href="/wellness-tools" className="btn-secondary">Take Health Assessment <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
