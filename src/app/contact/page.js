'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail, Phone, Clock, Share2, HelpCircle, ChevronLeft, ChevronRight,
  CheckCircle2, Sparkles, MessageCircle, MapPin, ShieldAlert, Award,
  Bone, Flame, Droplet, Brain, Sprout, Waves, Mountain,
  Facebook, Instagram, Youtube
} from 'lucide-react';
import styles from './page.module.css';

const iconMap = {
  'fa-bone': Bone,
  'fa-fire': Flame,
  'fa-droplet': Droplet,
  'fa-brain': Brain,
  'fa-seedling': Sprout,
  'fa-water': Waves,
  'fa-mountain': Mountain,
};

const faqs = [
  { q: 'How do I join a class?', a: 'You can register by selecting a plan on our Pricing page. Once registered, active links for live Zoom sessions will be generated and emailed.' },
  { q: 'Do I need prior yoga experience?', a: 'No prior experience is necessary. We cater to all levels. For newcomers, we recommend our Level 1 Beginner series to master fundamentals.' },
  { q: 'What equipment do I need?', a: 'You will need a yoga mat. For therapeutic sessions, props like blocks, straps, or bolsters are helpful but not required initially.' },
  { q: 'Can I try a class before subscribing?', a: 'Yes! We offer single drop-in classes for ₹299, or a 5-class trial voucher pack to try out different styles.' },
  { q: 'How does yoga therapy differ from regular classes?', a: 'Yoga therapy targets specific clinical ailments under expert therapist observation. It includes medical reviews, posture modifications, and custom diets. Regular classes are general group flows.' }
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: '916394554685',
    facebook: 'https://facebook.com/tapasyogavaranasi',
    instagram: 'https://instagram.com/tapasyogavaranasi',
    youtube: 'https://youtube.com/@tapasyogavaranasi',
    email: 'contact@tapasyoga.in'
  });

  useEffect(() => {
    fetch('/api/offers')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setSocialLinks({
            whatsapp: res.data.whatsapp_phone || '916394554685',
            facebook: res.data.facebook_link || 'https://facebook.com/tapasyogavaranasi',
            instagram: res.data.instagram_link || 'https://instagram.com/tapasyogavaranasi',
            youtube: res.data.youtube_link || 'https://youtube.com/@tapasyogavaranasi',
            email: res.data.contact_email || 'contact@tapasyoga.in'
          });
        }
      })
      .catch(err => console.error('Error fetching contact settings:', err));
  }, []);

  // Recommendations generator
  const getRecommendation = () => {
    if (selectedIssue === 'Back Pain & Spine') {
      return {
        badge: 'Spine Restorative Therapy',
        text: `Dear ${name}, for back and neck relief, our certified therapist recommends a specialized clinical program including mild extension postures (Bhujangasana, Shalabhasana) and posture alignment cycles.`
      };
    } else if (selectedIssue === 'Thyroid & PCOD') {
      return {
        badge: 'Endocrine Balance Therapy',
        text: `Dear ${name}, to balance your thyroid hormones, we recommend targeted chin-lock postures (Sarvangasana, Halasana) combined with deep Ujjayi Pranayama breathing techniques.`
      };
    } else if (selectedIssue === 'Diabetes & BP Control') {
      return {
        badge: 'Pancreatic Metabolic Therapy',
        text: `Dear ${name}, for managing diabetes and BP levels, we recommend core twist postures (Ardha Matsyendrasana, Mandukasana) paired with cooling pranayamas to restore system homeostasis.`
      };
    } else {
      return {
        badge: 'Cortisol Relief Therapy',
        text: `Dear ${name}, to lower high cortisol stress levels and resolve sleep issues, we recommend custom meditative cycles, restorative pranayama, and guided Shavasana relaxation.`
      };
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedIssue) {
      setStep(2);
    } else if (step === 2 && selectedExp) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setValidated(true);
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    // Split name into first and last name components
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Yoga';
    const lastName = nameParts.slice(1).join(' ') || 'Client';

    const subject = `Wellness Assessment: ${selectedIssue}`;
    const message = `Experience Level: ${selectedExp}\nPrimary Issue: ${selectedIssue}\nRecommended Program: ${rec.badge}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit assessment');
      }

      setStep(4);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedIssue('');
    setSelectedExp('');
    setName('');
    setPhone('');
    setEmail('');
    setValidated(false);
    setSubmitError('');
    setSubmitting(false);
  };

  const rec = getRecommendation();
  const formatPhoneNumber = (phone) => {
    if (!phone) return '+91 63945 54685';
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 12) {
      return `+${clean.slice(0, 2)} ${clean.slice(2, 7)} ${clean.slice(7)}`;
    }
    return `+${clean}`;
  };

  // WhatsApp compiler
  const whatsappUrl = () => {
    const text = `Pranam TAPAS Yoga! 🧘\u200d♂️\n\nI just finished the Interactive Wellness Assessment:\n\n*Name:* ${name}\n*Focus Issue:* ${selectedIssue}\n*Yoga Level:* ${selectedExp}\n*Phone:* ${phone}\n*Email:* ${email}\n\n*Recommended Program:* ${rec.badge}\n\nPlease book my clinical consultation slot.`;
    return `https://wa.me/${socialLinks.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className={styles.contactPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Mail size={14} /> Connect</span>
          <h1 className={styles.title}>Contact & Wellness Assessment</h1>
          <p className={styles.subtitle}>
            Reach out to our Varanasi center or complete our 60-second assessment for an instant therapeutic protocol recommendation.
          </p>
        </div>
            </section>

      {/* ─── Inquiry Form Section ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Mail size={14} /> Inquiry</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Send us your query and we’ll respond via email or WhatsApp.</p>
          </div>
          {inquirySuccess ? (
            <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <CheckCircle2 size={48} style={{ color: 'var(--emerald)', marginBottom: '1.25rem', display: 'inline-block' }} />
              <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.5rem', fontWeight: 800 }}>Inquiry Received!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                Pranam! Thank you for reaching out to Tapas Yoga. Our team has received your message and will respond via WhatsApp or Email within 24 hours.
              </p>
              <button onClick={() => setInquirySuccess(false)} className="btn-secondary" style={{ marginTop: '1.5rem' }}>Send Another Message</button>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setInquirySubmitting(true);
                setInquiryError('');
                
                const form = e.target;
                const nameVal = form.name.value;
                const emailVal = form.email.value;
                const phoneVal = form.phone.value;
                const messageVal = form.message.value;

                // Split name
                const nameParts = nameVal.trim().split(/\s+/);
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || 'Client';

                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      firstName,
                      lastName,
                      email: emailVal,
                      phone: phoneVal,
                      subject: 'General Inquiry',
                      message: messageVal
                    })
                  });
                  const result = await res.json();
                  if (res.ok && result.success) {
                    setInquirySuccess(true);
                  } else {
                    setInquiryError(result.error || 'Failed to send inquiry.');
                  }
                } catch (err) {
                  setInquiryError('Network error. Please try again.');
                } finally {
                  setInquirySubmitting(false);
                }
              }}
              className={styles.inquiryForm}
            >
              <div className={styles.formGrid}>
                <input name="name" type="text" placeholder="Your Name *" required className={styles.textInput} disabled={inquirySubmitting} />
                <input name="email" type="email" placeholder="Email *" required className={styles.textInput} disabled={inquirySubmitting} />
                <input name="phone" type="tel" placeholder="Phone *" required pattern="^\+?[0-9\s-]{10,14}$" minLength={10} maxLength={15} className={styles.textInput} disabled={inquirySubmitting} />
              </div>
              <textarea name="message" placeholder="Your Message" rows={4} className={styles.textArea} disabled={inquirySubmitting} />
              {inquiryError && <p style={{ color: 'var(--rose)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>{inquiryError}</p>}
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={inquirySubmitting}>
                {inquirySubmitting ? 'Sending Inquire...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── Main Grid: Quiz & Information ─── */}

      {/* ─── Main Grid: Quiz & Information ─── */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.mainGrid}>
            {/* Left Col: Interactive Quiz */}
            <div className={styles.leftCol}>
              <div className={`${styles.quizContainer} glass-card`}>
                <div className={styles.quizHeader}>
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 800 }}>
                    Interactive Wellness Assessment
                  </h3>
                  <span className={styles.quizSub}>Free Health Assessment</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                    Receive your personalized yoga therapy recommendation in under 60 seconds.
                  </p>
                </div>

                {/* Progress bar */}
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  {/* Step 1: Issue */}
                  {step === 1 && (
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>
                        Step 1: Choose Your Primary Focus Area
                      </h4>
                      <div className={styles.optionGrid}>
                        {[
                          { title: 'Back Pain & Spine', sub: 'Spinal decompression & posture', val: 'Back Pain & Spine', icon: 'fa-bone' },
                          { title: 'Thyroid & PCOD', sub: 'Hormonal & endocrine balance', val: 'Thyroid & PCOD', icon: 'fa-fire' },
                          { title: 'Diabetes & BP Control', sub: 'Blood sugar & pressure mgmt', val: 'Diabetes & BP Control', icon: 'fa-droplet' },
                          { title: 'Stress & Anxiety Relief', sub: 'Cortisol & nervous system', val: 'Stress & Anxiety Relief', icon: 'fa-brain' }
                        ].map((opt) => (
                          <div
                            key={opt.val}
                            className={`${styles.optionCard} ${selectedIssue === opt.val ? styles.optionSelected : ''}`}
                            onClick={() => setSelectedIssue(opt.val)}
                          >
                            {(() => {
                              const IconComponent = iconMap[opt.icon];
                              return IconComponent ? <IconComponent className={styles.optIcon} size={28} /> : null;
                            })()}
                            <h5>{opt.title}</h5>
                            <p>{opt.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Experience */}
                  {step === 2 && (
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>
                        Step 2: What is Your Yoga Experience?
                      </h4>
                      <div className={styles.optionGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {[
                          { title: 'Beginner', sub: 'New to yoga practice', val: 'Beginner', icon: 'fa-seedling' },
                          { title: 'Intermediate', sub: '1-3 years experience', val: 'Intermediate', icon: 'fa-water' },
                          { title: 'Advanced', sub: '3+ years experience', val: 'Advanced', icon: 'fa-mountain' }
                        ].map((opt) => (
                          <div
                            key={opt.val}
                            className={`${styles.optionCard} ${selectedExp === opt.val ? styles.optionSelected : ''}`}
                            onClick={() => setSelectedExp(opt.val)}
                          >
                            {(() => {
                              const IconComponent = iconMap[opt.icon];
                              return IconComponent ? <IconComponent className={styles.optIcon} size={28} /> : null;
                            })()}
                            <h5>{opt.title}</h5>
                            <p>{opt.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>
                        Step 3: Tell Us About Yourself
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '450px', margin: '0 auto' }}>
                        <div>
                          <label className={styles.inputLabel}>Full Name *</label>
                          <input
                            type="text"
                            required
                            disabled={submitting}
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.textInput}
                          />
                        </div>
                        <div>
                          <label className={styles.inputLabel}>WhatsApp Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            disabled={submitting}
                            pattern="^\+?[0-9\s-]{10,14}$"
                            minLength={10}
                            maxLength={15}
                            placeholder="e.g. +91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.textInput}
                          />
                        </div>
                        <div>
                          <label className={styles.inputLabel}>Email Address *</label>
                          <input
                            type="email"
                            required
                            disabled={submitting}
                            placeholder="yourname@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.textInput}
                          />
                        </div>
                        {validated && (!name || !phone || !email) && (
                          <p style={{ color: 'var(--rose)', fontSize: '0.85rem', textAlign: 'center' }}>
                            Please fill in all required fields.
                          </p>
                        )}
                        {submitError && (
                          <p style={{ color: 'var(--rose)', fontSize: '0.85rem', textAlign: 'center' }}>
                            {submitError}
                          </p>
                        )}
                        <button type="submit" disabled={submitting} className="btn-primary" style={{ justifyContent: 'center' }}>
                          {submitting ? 'Generating...' : 'Generate Assessment'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 4: Results */}
                  {step === 4 && (
                    <div className={styles.resultBox}>
                      <CheckCircle2 size={56} style={{ color: 'var(--emerald)', marginBottom: '1rem' }} />
                      <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.5rem', fontWeight: 800 }}>
                        Assessment Complete!
                      </h3>
                      <span className={styles.recBadge}>{rec.badge}</span>
                      <p className={styles.recText}>{rec.text}</p>
                      
                      <div className={styles.resultActions}>
                        <a
                          href={whatsappUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp"
                          style={{ justifyContent: 'center' }}
                        >
                          <MessageCircle size={18} /> Send Result via WhatsApp
                        </a>
                        <button onClick={handleReset} className="btn-secondary" style={{ justifyContent: 'center' }}>
                          Retake Assessment
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Navigation */}
                {step < 3 && (
                  <div className={styles.quizNav}>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-secondary"
                      style={{ visibility: step > 1 ? 'visible' : 'hidden' }}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={(step === 1 && !selectedIssue) || (step === 2 && !selectedExp)}
                      className="btn-primary"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Info Cards */}
            <div className={styles.rightCol}>
              <div className="glass-card">
                <h4 style={{ color: 'var(--cyan)', fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} /> Contact Details
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  <strong>Varanasi Sanctuary:</strong><br />
                  Arji No. 154/1, VRF GYM<br />
                  Near Happy Model School, Artha Patnaya<br />
                  Varanasi, Uttar Pradesh, India
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Mail size={16} style={{ color: 'var(--violet)' }} />
                    <a href={`mailto:${socialLinks.email}`} style={{ color: 'var(--text-secondary)' }}>{socialLinks.email}</a>
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Phone size={16} style={{ color: 'var(--violet)' }} />
                    <a href={`https://wa.me/${socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', fontWeight: 700 }}>
                      {formatPhoneNumber(socialLinks.whatsapp)}
                    </a>
                  </p>
                </div>
              </div>

              <div className="glass-card" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={20} style={{ color: 'var(--cyan)' }} /> Sanctuary Hours
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monday — Saturday:</span>
                    <strong>6:00 AM — 11:30 AM IST</strong>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sunday:</span>
                    <strong style={{ color: 'var(--rose)' }}>Closed (Inquiries Welcome)</strong>
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Share2 size={20} style={{ color: 'var(--violet)' }} /> Follow Sanctuary
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {socialLinks.facebook ? (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Facebook size={16} /> Facebook</a>
                  ) : (
                    <span className={styles.socialLink} style={{ opacity: 0.5, cursor: 'not-allowed' }}><Facebook size={16} /> Facebook</span>
                  )}
                  {socialLinks.instagram ? (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Instagram size={16} /> Instagram</a>
                  ) : (
                    <span className={styles.socialLink} style={{ opacity: 0.5, cursor: 'not-allowed' }}><Instagram size={16} /> Instagram</span>
                  )}
                  {socialLinks.youtube ? (
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Youtube size={16} /> YouTube</a>
                  ) : (
                    <span className={styles.socialLink} style={{ opacity: 0.5, cursor: 'not-allowed' }}><Youtube size={16} /> YouTube</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Section ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><MapPin size={14} /> Coordinates</span>
            <h2 className="section-title">Sanctuary Map</h2>
            <p className="section-subtitle">Physical directions to our Varanasi center.</p>
          </div>
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '400px' }}>
            <iframe
              src="https://maps.google.com/maps?q=25.366078,83.003516&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TAPAS Yoga Varanasi Location"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="https://maps.google.com/maps?q=25.366078,83.003516&z=17" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><HelpCircle size={14} /> Clear Doubts</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Common queries regarding registration, props, levels, and therapy.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card">
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <HelpCircle size={16} style={{ color: 'var(--cyan)' }} /> {faq.q}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, paddingLeft: '1.45rem' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
