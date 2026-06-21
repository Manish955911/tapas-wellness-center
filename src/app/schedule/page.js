'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MessageCircle, Phone, Mail, Sun, Moon, Sparkles, ArrowRight, AlertCircle, MapPin, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

const classSlots = [
  {
    slot: 'Slot 1',
    time: '6:00 AM — 7:00 AM',
    label: 'Early Morning Session',
    desc: 'Start your day with energy-boosting asanas and pranayama. This early morning session is designed to awaken your body, align your spine, and set a positive tone for the day ahead. Perfect for practitioners who want to build consistent discipline.',
    icon: <Sun size={20} />,
    color: 'var(--cyan)',
    tagline: 'Rise & Restore',
    styles: ['Hatha Yoga Foundations', 'Pranayama & Kriya', 'Surya Namaskar', 'Vedic Chanting'],
  },
  {
    slot: 'Slot 2',
    time: '7:15 AM — 8:15 AM',
    label: 'Morning Flow Session',
    desc: 'A balanced combination of Hatha yoga fundamentals and therapeutic stretching. Ideal for those looking to improve flexibility, correct posture, and build core strength through carefully structured sequences under expert guidance.',
    icon: <Sparkles size={20} />,
    color: 'var(--violet)',
    tagline: 'Flow & Strengthen',
    styles: ['Vinyasa Flow Dynamics', 'Ashtanga Primary (Modified)', 'Dynamic Posture Alignment', 'Core Conditioning'],
  },
  {
    slot: 'Slot 3',
    time: '8:30 AM — 9:30 AM',
    label: 'Clinical Therapy Session',
    desc: 'Our specialized clinical yoga therapy class focusing on targeted recovery for back pain, thyroid imbalance, diabetes management, and joint mobility. Each session includes personalized attention and posture corrections for maximum therapeutic benefit.',
    icon: <Sparkles size={20} />,
    color: 'var(--emerald)',
    tagline: 'Heal & Recover',
    styles: ['Clinical Yoga Therapy', 'Spine & Joint Rehabilitation', 'Endocrine & Metabolic Balancing', 'Therapeutic Breathwork'],
  },
  {
    slot: 'Slot 4',
    time: '9:30 AM — 10:30 AM',
    label: 'General Yoga Practice',
    desc: 'A comprehensive all-levels class combining Vinyasa flows, standing postures, balance work, and breathing techniques. Suitable for beginners and intermediate practitioners alike. Focus on building endurance, mental calm, and physical vitality.',
    icon: <Sun size={20} />,
    color: '#f59e0b',
    tagline: 'Practice & Grow',
    styles: ['Traditional Hatha Yoga', 'Balance & Proprioception', 'Asana Fundamentals', 'Gentle Dynamic Flow'],
  },
  {
    slot: 'Slot 5',
    time: '10:30 AM — 11:30 AM',
    label: 'Restorative & Meditation',
    desc: 'End your morning practice with deep restorative poses, guided Yoga Nidra relaxation, and structured meditation. This session targets cortisol reduction, nervous system healing, and cultivates a profound sense of inner peace and clarity.',
    icon: <Moon size={20} />,
    color: 'var(--rose)',
    tagline: 'Relax & Rejuvenate',
    styles: ['Restorative Yoga (Props)', 'Guided Yoga Nidra', 'Pranayama & Dharana', 'Stress & Anxiety Relief'],
  },
  {
    slot: 'Slot 6',
    time: '4:00 PM — 5:00 PM',
    label: 'Evening Rejuvenation',
    desc: 'Re-energize your mind and body after a demanding work day. This early evening session integrates active stretching, gentle Hatha sequences, and relaxing breathwork to release physical tension, clear mental fatigue, and reset your posture.',
    icon: <Sun size={20} />,
    color: 'var(--emerald)',
    tagline: 'Unwind & Rebalance',
    styles: ['Gentle Hatha Flow', 'Post-Work Neck & Back Care', 'Gentle Stretching', 'Stress-Relief Pranayama'],
  },
  {
    slot: 'Slot 7',
    time: '5:00 PM — 6:00 PM',
    label: 'Sunset Flow & Core',
    desc: 'A dynamic vinyasa flow session focused on enhancing functional strength, core stability, and cardiovascular stamina. Designed to build healthy metabolic heat while aligning movement with deep conscious breathing to quiet a busy mind.',
    icon: <Sparkles size={20} />,
    color: 'var(--rose)',
    tagline: 'Refresh & Restore',
    styles: ['Dynamic Vinyasa Flow', 'Core & Stability Strengthening', 'Posture Correction & Alignment', 'Mindful Breathing'],
  },
  {
    slot: 'Slot 8',
    time: '6:15 PM — 7:15 PM',
    label: 'Yin & Sleep Therapy',
    desc: 'Prepare your body for profound physiological rest and deep sleep. This class focuses on slow-paced Yin poses, long holds to target deep connective tissues, breathing techniques (Pranayama), and guided meditation to calm the nervous system.',
    icon: <Moon size={20} />,
    color: 'var(--violet)',
    tagline: 'Calm & Sleep',
    styles: ['Yin Yoga (Deep Tissue)', 'Guided Mindfulness Meditation', 'Nidra & Sleep Prep', 'Parasympathetic Reset'],
  },
];

const activeDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const highlights = [
  { title: '8 Daily Sessions', desc: 'Eight structured morning and evening slots covering multiple levels, giving you complete flexibility to practice at your preferred hour.' },
  { title: 'Monday to Saturday', desc: 'Consistent six-day weekly classes. Build discipline (Tapas) through regular practice and watch your body and mind transform over weeks.' },
  { title: 'All Levels Welcome', desc: 'Whether you are a complete beginner or an advanced practitioner, our sessions are structured to accommodate and challenge every level of experience.' },
  { title: 'Expert Supervision', desc: 'Every class is conducted under the direct supervision of experienced Yogacharyas who ensure correct alignment, breathing, and therapeutic safety.' },
];

export default function SchedulePage() {
  const [activeSlot, setActiveSlot] = useState(0);

  return (
    <div className={styles.schedulePage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Calendar size={14} /> Timetable</span>
          <h1 className={styles.title}>Daily Class Schedule</h1>
          <p className={styles.subtitle}>
            Eight structured morning and evening sessions every day, Monday through Saturday.
            Choose the slot that fits your lifestyle and start your transformation.
          </p>
          <div className={styles.heroMeta}>
            <span><Clock size={14} /> 6:00 AM — 11:30 AM & 4:00 PM — 7:15 PM</span>
            <span><Calendar size={14} /> Mon — Sat</span>
            <span><MapPin size={14} /> Varanasi Center</span>
          </div>
        </div>
      </section>

      {/* ─── Weekly Overview Cards ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Calendar size={14} /> Weekly Overview</span>
            <h2 className="section-title">Operating Days</h2>
            <p className="section-subtitle">Classes run six days a week. Sunday is reserved for rest and personal inquiry.</p>
          </div>
          <div className={styles.daysGrid}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const isOpen = activeDays.includes(day);
              return (
                <div key={day} className={`${styles.dayCard} ${isOpen ? styles.dayOpen : styles.dayClosed}`}>
                  <h4 className={styles.dayName}>{day}</h4>
                  {isOpen ? (
                    <>
                      <span className={styles.dayStatus}>Open</span>
                      <p className={styles.dayTime}>Morning: 6:00 AM — 11:30 AM<br />Evening: 4:00 PM — 7:15 PM</p>
                      <p className={styles.daySlots}>8 Sessions Available</p>
                    </>
                  ) : (
                    <>
                      <span className={`${styles.dayStatus} ${styles.closedStatus}`}>Closed</span>
                      <p className={styles.dayTime}>Rest Day</p>
                      <p className={styles.daySlots}>Inquiries Welcome</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Class Slots — Interactive Cards ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Clock size={14} /> Daily Sessions</span>
            <h2 className="section-title">Daily Class Slots</h2>
            <p className="section-subtitle">Eight progressive morning and evening sessions designed to suit your schedule.</p>
          </div>

          <div className={styles.slotsLayout}>
            {/* Slot Selector */}
            <div className={styles.slotSelector}>
              {classSlots.map((slot, i) => (
                <button
                  key={i}
                  className={`${styles.slotBtn} ${activeSlot === i ? styles.slotBtnActive : ''}`}
                  onClick={() => setActiveSlot(i)}
                  style={{ '--slot-color': slot.color }}
                >
                  <div className={styles.slotBtnIcon}>{slot.icon}</div>
                  <div className={styles.slotBtnInfo}>
                    <strong>{slot.time}</strong>
                    <span className={styles.slotLabel}>{slot.label}</span>
                    <span className={styles.slotStylesBrief}>
                      {slot.styles.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                  <ChevronRight size={16} className={styles.slotArrow} />
                </button>
              ))}
            </div>

            {/* Slot Detail Card */}
            <div className={styles.slotDetail}>
              <div className="glass-card" style={{ height: '100%' }}>
                <div className={styles.detailHeader} style={{ '--slot-color': classSlots[activeSlot].color }}>
                  <div className={styles.detailIcon}>{classSlots[activeSlot].icon}</div>
                  <div>
                    <span className={styles.detailTagline}>{classSlots[activeSlot].tagline}</span>
                    <h3 className={styles.detailTitle}>{classSlots[activeSlot].label}</h3>
                  </div>
                </div>
                <div className={styles.detailTime}>
                  <Clock size={16} /> {classSlots[activeSlot].time}
                </div>
                <p className={styles.detailDesc}>{classSlots[activeSlot].desc}</p>
                
                <div className={styles.detailStylesSection}>
                  <h4 className={styles.detailStylesTitle}>Yoga Styles & Practices Covered</h4>
                  <div className={styles.stylesList}>
                    {classSlots[activeSlot].styles.map((style, idx) => (
                      <span key={idx} className={styles.styleBadge} style={{ '--slot-color': classSlots[activeSlot].color }}>
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.detailMeta}>
                  <div className={styles.metaItem}>
                    <strong>Duration</strong>
                    <span>60 Minutes</span>
                  </div>
                  <div className={styles.metaItem}>
                    <strong>Level</strong>
                    <span>All Levels</span>
                  </div>
                  <div className={styles.metaItem}>
                    <strong>Days</strong>
                    <span>Mon — Sat</span>
                  </div>
                </div>
                <div className={styles.detailActions}>
                  <a
                    href={`https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20am%20interested%20in%20the%20${encodeURIComponent(classSlots[activeSlot].time)}%20${encodeURIComponent(classSlots[activeSlot].label)}%20session.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} /> Inquire on WhatsApp
                  </a>
                  <a href="tel:+916394554685" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    <Phone size={16} /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Schedule Table ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Clock size={14} /> At a Glance</span>
            <h2 className="section-title">Complete Timetable</h2>
            <p className="section-subtitle">A quick reference of all eight daily sessions and their timings.</p>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.scheduleTable}>
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Time</th>
                  <th>Session</th>
                  <th>Yoga Styles Taught</th>
                  <th>Duration</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                {classSlots.map((slot, i) => (
                  <tr key={i}>
                    <td><span className={styles.slotBadge} style={{ background: `${slot.color}22`, color: slot.color }}>{slot.slot}</span></td>
                    <td className={styles.timeCell}><Clock size={14} /> {slot.time}</td>
                    <td><strong>{slot.label}</strong></td>
                    <td>
                      <div className={styles.tableStyles}>
                        {slot.styles.map((style, idx) => (
                          <span key={idx} className={styles.tableStyleBadge}>{style}</span>
                        ))}
                      </div>
                    </td>
                    <td>60 min</td>
                    <td>Mon — Sat</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Sunday Notice ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className={`${styles.sundayNotice} glass-card`}>
            <div className={styles.sundayIcon}>
              <AlertCircle size={32} />
            </div>
            <div className={styles.sundayContent}>
              <h3>Sunday — Center Closed</h3>
              <p>
                Our center observes Sunday as a rest day. However, you can still reach out to us 
                for any inquiries, bookings, or consultations. We are always available to help you 
                on your wellness journey.
              </p>
              <div className={styles.sundayActions}>
                <a
                  href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20have%20a%20query%20regarding%20classes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} /> WhatsApp Chat
                </a>
                <a href="tel:+916394554685" className="btn-secondary">
                  <Phone size={16} /> Call Us
                </a>
                <a href="mailto:info@tapasyoga.com" className="btn-secondary">
                  <Mail size={16} /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Join Highlights ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Sparkles size={14} /> Benefits</span>
            <h2 className="section-title">Why Practice With Us?</h2>
            <p className="section-subtitle">Structured, supervised, and transformative yoga sessions designed for real results.</p>
          </div>
          <div className={styles.highlightsGrid}>
            {highlights.map((h, i) => (
              <div key={i} className="glass-card">
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{h.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className="section-title">Ready to Begin Your Daily Practice?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Pick any morning or evening slot that suits you and commit to your transformation. Walk-ins welcome at our Varanasi center.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" className="btn-primary"><Sparkles size={16} /> View Membership Pricing</Link>
            <Link href="/contact" className="btn-secondary">Free Consultation <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
