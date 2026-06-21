'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Flame, Shield, ArrowRight, Heart, Monitor, GraduationCap, Star, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Sparkles, Bone, Droplet, Brain, MessageCircle, Leaf } from 'lucide-react';
import styles from './page.module.css';

const iconMap = {
  'fa-bone': Bone,
  'fa-fire': Flame,
  'fa-droplet': Droplet,
  'fa-brain': Brain,
  'fa-leaf': Leaf,
  'fa-sparkles': Sparkles,
};

const heroSlides = [
  {
    image: '/images/slide1.png',
    badge: '🕉️ Clinical Yoga Therapy',
    title: 'Scientific Yoga Therapy for Complete Natural Healing',
    subtitle: "Varanasi's Trusted Path to Recover from Spine Pain, Sciatica, and Lifestyle Disorders",
    description: "Reclaim your health through the diagnostic science of Clinical Yoga. Our certified Yogacharyas customize targeted postures and therapeutic breathing routines to activate your body's natural self-repair mechanisms. Get lasting relief from chronic ailments, improve structural alignment, and restore vitality under professional medical-yoga guidance.",
    cta1: { text: 'Free Wellness Suite', href: '/wellness-tools' },
    cta2: { text: 'Clinical Programs', href: '/yoga-therapy' },
  },
  {
    image: '/images/slide2.png',
    badge: '✨ Expert-Guided Wellness',
    title: 'Custom Programs for Sciatica, Diabetes, and Hormonal Health',
    subtitle: 'Holistic Clinical Restoration Integrating Traditional Patanjali Principles',
    description: 'Address lifestyle and chronic conditions at their root. By combining scientific anatomy with ancient breathing protocols, we help you manage blood sugar, regulate endocrine secretions, and decompress the spine safely. Each program is aligned with your medical history for optimal wellness outcomes.',
    cta1: { text: 'Book Free Assessment', href: '/contact' },
    cta2: { text: 'View Schedules', href: '/schedule' },
  },
  {
    image: '/images/slide3.png',
    badge: '🙏 Premium Healing Sanctuary',
    title: "Experience Varanasi's Premier Yoga Therapy Sanctuary",
    subtitle: 'Authentic Vedic Principles Blended with Modern Anatomical Diagnostics',
    description: 'Discover a sanctuary of peace and dynamic healing in Paharia, Varanasi. Our premium center blends traditional Patanjali disciplines with modern clinical diagnostics to guide you on a personalized path of recovery. Visit us locally at our state-of-the-art studio or join our interactive global online cohorts.',
    cta1: { text: 'Chat with Yogacharya', href: 'https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!' },
    cta2: { text: 'Our Philosophy', href: '/about' },
  },
];

const stats = [
  { value: 500, label: 'Happy Clients', suffix: '+' },
  { value: 5, label: 'Expert Therapists', suffix: '+' },
  { value: 25, label: 'Weekly Sessions', suffix: '+' },
  { value: 100, label: 'India & Global Reach', suffix: '%' },
];

const features = [
  { icon: <Monitor size={28} />, title: 'Online & Offline Classes', desc: 'Join live interactive virtual cohorts from anywhere in the world, or visit our premium Varanasi studio at Paharia for personalized, in-person classes under certified Yogacharyas.', cls: 'cyan' },
  { icon: <Heart size={28} />, title: 'Clinical Yoga Therapy', desc: 'Targeted physical programs backed by rigorous anatomical science to safely treat chronic health conditions like sciatica, back pain, thyroid, and metabolic disorders.', cls: 'violet' },
  { icon: <GraduationCap size={28} />, title: 'Ayurveda & Naturopathy', desc: 'Integrated natural healing featuring traditional Panchakarma detoxification, drugless Naturopathy therapies, and customized dietary guidance to restore cellular harmony.', cls: 'emerald' },
];

const therapyCards = [
  { icon: 'fa-bone', title: 'Back Pain & Spine Health', desc: 'Resolves herniated discs, chronic sciatica, and severe posture errors through highly specialized spinal decompression techniques and core strengthening asanas.' },
  { icon: 'fa-fire', title: 'Thyroid & Hormonal Balance', desc: 'Supports metabolic speed and balances endocrine secretions by stimulating the thyroid gland using specific neck-focused stretches and inverted postures.' },
  { icon: 'fa-droplet', title: 'Diabetes & Blood Pressure', desc: 'Assists clinical pancreatic recovery and lowers stress hormones through rhythmic breathing and targeted abdominal compressions that improve blood circulation and insulin response.' },
  { icon: 'fa-brain', title: 'Mental Stress & Anxiety', desc: 'Calms high cortisol rates, resolving acute anxiety, insomnia, and nervous system fatigue via guided Yoga Nidra, meditation, and restorative physiological relaxation.' },
  { icon: 'fa-leaf', title: 'Panchakarma & Ayurvedic Detox', desc: 'Purify body and mind with authentic therapies like Abhyanga, Snehan, and Swedan to flush out deep-seated cellular toxins and restore energetic balance.' },
  { icon: 'fa-sparkles', title: 'Naturopathy & Holistic Healing', desc: 'Drugless, nature-aligned treatments including mud therapies, hydrotherapy, and custom nutritional guidance to stimulate the body\'s natural self-healing intelligence.' }
];

const newsItems = [
  { badge: 'Featured', badgeColor: '#10b981', date: 'June 14, 2026', title: 'The Science Behind Yoga Therapy for Diabetes Management', text: 'Recent clinical studies have shown significant improvements in blood sugar control, cardiovascular health, and emotional stability through regular, guided yoga therapy. Read our in-depth analysis on how specific asanas target pancreatic function.' },
  { badge: 'New Class', badgeColor: '#8b5cf6', date: 'June 12, 2026', title: 'Intensive Weekend Ashtanga Series Starting Soon', text: 'We are excited to announce a new weekend Ashtanga Yoga series designed for advanced practitioners looking to deepen their physical strength, stamina, and mental discipline under the guidance of our senior Acharyas.' },
  { badge: 'Event', badgeColor: '#f59e0b', date: 'June 10, 2026', title: 'Free 90-Minute Mindfulness & Meditation Workshop', text: 'Join our community for a transformative free workshop this Sunday evening. Learn practical meditation techniques to combat daily stress, enhance your focus, and cultivate a lasting sense of inner peace.' },
];

const testimonials = [
  { name: 'Rajesh Mishra', since: 'Varanasi Center Student since 2023', text: '"TAPAS Yoga has transformed my life. The clinical therapeutic sessions for back pain helped me manage severe sciatica without surgery. Highly recommend their Paharia center!"' },
  { name: 'David Vance', since: 'Global Online Student (New York) since 2024', text: '"Practicing online with TAPAS feels just like being in their Varanasi studio. The teachers provide precise live corrections and pay complete attention to my spinal alignment and breathing posture."' },
  { name: 'Dr. Anjali Sharma', since: 'Clinical Wellness Student since 2022', text: '"The scientific approach to yoga therapy here is exceptional. I managed my thyroid imbalances and stress levels effectively through their personalized physiological and breathing protocols."' },
];

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return [count, setStarted];
}

function StatCounter({ value, label, suffix }) {
  const [count, setStarted] = useCounter(value);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setStarted]);

  return (
    <div ref={ref} className={styles.statItem}>
      <div className={styles.statValue}>{count.toLocaleString()}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <>
      {/* ─── Hero Slider ─── */}
      <section className={styles.hero}>
        {/* Dynamic Backgrounds with Ken Burns zoom effect */}
        {heroSlides.map((s, idx) => (
          <div
            key={idx}
            className={`${styles.heroBg} ${idx === currentSlide ? styles.heroBgActive : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        
        {/* Dark overlay */}
        <div className={styles.heroOverlay} />

        <div className={styles.heroOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          <div className={styles.orb3}></div>
        </div>

        <div className={styles.sacredFloats}>
          <span className={styles.floatSymbol} style={{ top: '15%', left: '8%' }}>ॐ</span>
          <span className={styles.floatSymbol} style={{ top: '60%', right: '10%' }}>☸</span>
          <span className={styles.floatSymbol} style={{ bottom: '20%', left: '15%' }}>✦</span>
        </div>

        <div className={`container ${styles.heroContent}`}>
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`${styles.slideContent} ${isActive ? styles.slideActive : ''}`}
              >
                <div className={styles.slideBadge}>{slide.badge}</div>
                <h1 className={styles.heroTitle}>{slide.title}</h1>

                <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                <p className={styles.heroDesc}>{slide.description}</p>
                <div className={styles.heroCtas}>
                  <Link href={slide.cta1.href} className="btn-primary">
                    <Sparkles size={18} /> {slide.cta1.text}
                  </Link>
                  <Link href={slide.cta2.href} className="btn-secondary">
                    {slide.cta2.text} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.slideIndicators}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`${styles.indicator} ${i === currentSlide ? styles.indicatorActive : ''}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <button className={styles.slideNav} style={{ left: '1rem' }} onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide"><ChevronLeft size={24} /></button>
        <button className={styles.slideNav} style={{ right: '1rem' }} onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)} aria-label="Next slide"><ChevronRight size={24} /></button>
      </section>

      {/* ─── Features ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Flame size={14} /> Why Choose TAPAS?</span>
            <h2 className="section-title">Why Choose TAPAS Yoga Therapy?</h2>

            <p className="section-subtitle">We blend ancient discipline with modern clinical therapy for maximum physical recovery</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} className="glass-card" style={{ textAlign: 'center' }}>
                <div className={`feature-icon ${f.cls}`} style={{ margin: '0 auto 1rem' }}>{f.icon}</div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{f.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Therapy Focus ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Heart size={14} /> Special Focus Areas</span>
            <h2 className="section-title">Specialized Clinical Restoration</h2>

            <p className="section-subtitle">Targeted clinical therapeutic yoga designed to address and heal chronic health issues</p>
          </div>
          <div className={styles.therapyGrid}>
            {therapyCards.map((card, i) => (
              <div key={i} className="glass-card">
                <div className={styles.therapyIcon}>
                  {(() => {
                    const IconComponent = iconMap[card.icon];
                    return IconComponent ? <IconComponent size={28} /> : null;
                  })()}
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>{card.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/yoga-therapy" className="btn-primary"><Heart size={16} /> Explore Therapy</Link>
            <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!" target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle size={18} /> WhatsApp Consult</a>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => <StatCounter key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ─── News ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Star size={14} /> Latest Updates</span>
            <h2 className="section-title">Latest News & Updates</h2>
            <p className="section-subtitle">Stay updated with the latest yoga news, tips, and insights</p>
          </div>
          <div className={styles.newsGrid}>
            {newsItems.map((item, i) => (
              <div key={i} className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ background: `${item.badgeColor}22`, color: item.badgeColor, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{item.badge}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.date}</span>
                </div>
                <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>{item.title}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.text}</p>
                <Link href="/blog" style={{ color: 'var(--cyan)', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '1rem' }}>Read More <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/blog" className="btn-secondary">View All News <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Star size={14} /> Student Reviews</span>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-subtitle">Real experiences from our yoga community</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card">
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{t.text}</p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{t.name}</strong>
                  <small style={{ color: 'var(--text-muted)' }}>{t.since}</small>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/testimonials" className="btn-secondary">Read More Reviews <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><MapPin size={14} /> Visit Us</span>
            <h2 className="section-title">Visit Our Varanasi Center</h2>
            <p className="section-subtitle">Discover complete physical restoration at our physical center</p>
          </div>
          <div className={styles.locationGrid}>
            <div className="glass-card">
              <h4 style={{ color: 'var(--cyan)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={20} /> Physical Address</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                <strong>Arji No. 154/1, VRF GYM</strong><br />
                Near Happy Model School, Artha Patnaya<br />
                Varanasi, Uttar Pradesh, India
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--violet)' }} />
                <a href="tel:+916394554685" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 700, fontSize: '1.15rem' }}>+91 63945 54685</a>
              </p>
              <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--violet)' }} />
                <a href="mailto:info@tapasyoga.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>info@tapasyoga.com</a>
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="https://maps.google.com/maps?q=25.366078,83.003516&z=17" target="_blank" rel="noopener noreferrer" className="btn-primary">Get Directions</a>
                <Link href="/contact" className="btn-secondary">Book Assessment</Link>
              </div>
            </div>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <iframe
                src="https://maps.google.com/maps?q=25.366078,83.003516&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TAPAS Yoga Varanasi Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Start Your Yoga Journey?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>Join thousands of students who have transformed their lives through TAPAS Yoga</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary"><Sparkles size={18} /> Get Started Today</Link>
            <Link href="/pricing" className="btn-secondary">View Pricing <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
