'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Check, X, ShieldCheck, Sparkles, MessageCircle, Info, HelpCircle } from 'lucide-react';
import styles from './page.module.css';

const pricingPlans = {
  general: [
    {
      name: 'Monthly Plan',
      price: '1,500',
      period: 'month',
      desc: 'Access to all general batch timings. Perfect for regular practice.',
      featured: false,
      badge: 'Regular Batch',
      points: [
        { text: 'Access to all general batches', included: true },
        { text: 'Registration Fee: ₹200 (One-time)', included: true },
        { text: 'Ashtanga, Vinyasa, Power & Dynamic Yoga', included: true },
        { text: 'Weight Loss & Stress Relief Yoga', included: true },
        { text: 'Experienced Yogacharyas guidance', included: true },
        { text: 'Personalized 1-on-1 private attention', included: false }
      ]
    },
    {
      name: '3-Month Plan',
      price: '4,200',
      period: '3 months',
      desc: 'Commit to your transformation journey and enjoy discount benefits.',
      featured: false,
      badge: 'Saver Pack',
      points: [
        { text: 'Access to all general batches', included: true },
        { text: 'Registration Fee: ₹200 (One-time)', included: true },
        { text: 'Effective Rate: ₹1,400 / month', included: true },
        { text: 'Ashtanga, Vinyasa, Power & Dynamic Yoga', included: true },
        { text: 'Weight Loss & Stress Relief Yoga', included: true },
        { text: 'Experienced Yogacharyas guidance', included: true }
      ]
    },
    {
      name: 'Half-Yearly Plan',
      price: '7,800',
      period: '6 months',
      desc: 'Deepen your physical and spiritual rejuvenation with a 6-month commitment.',
      featured: true,
      badge: 'Highly Popular',
      points: [
        { text: 'Access to all general batches', included: true },
        { text: 'Registration Fee: ₹200 (One-time)', included: true },
        { text: 'Effective Rate: ₹1,300 / month', included: true },
        { text: 'Ashtanga, Vinyasa, Power & Dynamic Yoga', included: true },
        { text: 'Weight Loss & Stress Relief Yoga', included: true },
        { text: 'Experienced Yogacharyas guidance', included: true }
      ]
    },
    {
      name: 'Annual Plan',
      price: '14,400',
      period: 'year',
      desc: 'Year-round absolute commitment to health, strength, and vitality.',
      featured: false,
      badge: 'Best Value',
      points: [
        { text: 'Access to all general batches', included: true },
        { text: 'Registration Fee: ₹200 (One-time)', included: true },
        { text: 'Effective Rate: ₹1,200 / month', included: true },
        { text: 'Ashtanga, Vinyasa, Power & Dynamic Yoga', included: true },
        { text: 'Weight Loss & Stress Relief Yoga', included: true },
        { text: 'Experienced Yogacharyas guidance', included: true }
      ]
    }
  ],
  therapy: [
    {
      name: 'Therapeutic 1-on-1',
      price: '4,000',
      period: 'month',
      desc: 'Dedicated private attention from our expert clinical yoga therapist.',
      featured: true,
      badge: 'Clinical Care',
      points: [
        { text: '1-on-1 personalized attention', included: true },
        { text: 'Registration Fee: ₹200 (One-time)', included: true },
        { text: 'Disease-wise yoga therapy (Diabetes, Sciatica, PCOD, etc.)', included: true },
        { text: 'Deep stress and anxiety relief cycles', included: true },
        { text: 'Customized postures & breathing exercises', included: true },
        { text: 'Personal diet & lifestyle advice', included: true }
      ]
    }
  ]
};

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('general');

  const currentPlans = pricingPlans[activeTab];

  return (
    <div className={styles.pricingPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><CreditCard size={14} /> Membership</span>
          <h1 className={styles.title}>Flexible Pricing Plans</h1>
          <p className={styles.subtitle}>Choose the plan that matches your schedule and physical recovery goals.</p>

          {/* Toggle Switch */}
          <div className={styles.toggleWrapper}>
            <button
              className={`${styles.toggleBtn} ${activeTab === 'general' ? styles.toggleActive : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General Yoga Membership
            </button>
            <button
              className={`${styles.toggleBtn} ${activeTab === 'therapy' ? styles.toggleActive : ''}`}
              onClick={() => setActiveTab('therapy')}
            >
              Therapeutic 1-on-1 Class
            </button>
          </div>
        </div>
      </section>

      {/* ─── Pricing Cards Grid ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.pricingGrid}>
            {currentPlans.map((plan, i) => (
              <div
                key={i}
                className={`${styles.pricingCard} ${plan.featured ? styles.pricingCardFeatured : ''} glass-card`}
              >
                {plan.badge && (
                  <span className={`${styles.planBadge} ${plan.featured ? styles.badgeFeatured : ''}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.desc}</p>
                <div className={styles.priceContainer}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>/{plan.period}</span>
                </div>
                <div className={styles.divider}></div>
                <ul className={styles.pointsList}>
                  {plan.points.map((pt, j) => (
                    <li key={j} className={pt.included ? '' : styles.pointExcluded}>
                      {pt.included ? (
                        <Check size={16} className={styles.checkIcon} />
                      ) : (
                        <X size={16} className={styles.xIcon} />
                      )}
                      <span>{pt.text}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardAction}>
                  <a
                    href={`https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20want%20to%20subscribe%20to%20the%20${encodeURIComponent(plan.name)}%20(General%20Yoga).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={plan.featured ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Select Plan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pack Bundles (Drop-in & Packs) ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Sparkles size={14} /> Add-ons</span>
            <h2 className="section-title">Additional Flexible Packs</h2>
            <p className="section-subtitle">Drop-in classes or personalized 1-on-1 private attention packages</p>
          </div>
          <div className={styles.additionalGrid}>
            <div className="glass-card">
              <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
                Flexible Class Packs
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Perfect for drop-in practitioners or erratic schedules.</p>
              <ul className={styles.addList}>
                <li>Single Drop-in Class: <strong style={{ color: 'var(--cyan)' }}>₹299</strong></li>
                <li>5-Class Voucher Pack: <strong style={{ color: 'var(--cyan)' }}>₹1,299</strong> (Save ₹196)</li>
                <li>10-Class Voucher Pack: <strong style={{ color: 'var(--cyan)' }}>₹2,399</strong> (Save ₹591)</li>
              </ul>
              <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20want%20to%20purchase%20a%20flexible%20class%20pack." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                Buy Voucher Pack
              </a>
            </div>

            <div className="glass-card">
              <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
                Private 1-on-1 Sessions
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Personalized therapeutic instruction tailored to your condition.</p>
              <ul className={styles.addList}>
                <li>Single 60-Minute Session: <strong style={{ color: 'var(--violet)' }}>₹1,999</strong></li>
                <li>Single 90-Minute Session: <strong style={{ color: 'var(--violet)' }}>₹2,799</strong></li>
                <li>5-Session Package: <strong style={{ color: 'var(--violet)' }}>₹9,499</strong> (Save ₹496)</li>
              </ul>
              <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20want%20to%20book%20a%20private%201-on-1%20yoga%20session." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                Book Private Session
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><HelpCircle size={14} /> Clear Doubts</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We have answers regarding bookings, refunds, and therapy details.</p>
          </div>
          <div className={styles.faqGrid}>
            <div className="glass-card">
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>What is the refund policy?</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>All membership subscriptions and therapy package payments are non-refundable. However, we offer a free trial class so you can experience our sessions before joining. We also allow session rescheduling under our flexible guidelines.</p>
            </div>
            <div className="glass-card">
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Can I cancel or pause my plan?</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>You can cancel your monthly membership anytime. For multi-month packages (3-month or 6-month plans), you can request to freeze or pause your membership for up to 14 days in case of medical emergencies.</p>
            </div>
            <div className="glass-card">
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Does the Therapy Plan include classes?</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Yes. The Therapy Plan grants you unlimited general classes as well as your 4 specialized therapeutic slots.</p>
            </div>
            <div className="glass-card">
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>How do I pay?</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>We accept UPI payments (GPay, PhonePe, Paytm), local bank transfers, and all major debit/credit cards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Payment notice ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className={`${styles.paymentNotice} glass-card`}>
            <ShieldCheck size={36} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Secure Transactions & Gurantee</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                All transaction gateways conform to 256-bit SSL encryption. Rest assured, your payment data is completely secure. For cash deposits or corporate invoices, please reach out to our Varanasi helpdesk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className={styles.finalCta}>
        <div className="container text-center">
          <h2 className="section-title">Start Your Path to Health & Vitality Today</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>Join our live global cohorts or visit our Varanasi sanctuary to begin your healing journey.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Book Assessment Call</Link>
            <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20have%20a%20pricing%20question." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={18} /> Chat with Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
