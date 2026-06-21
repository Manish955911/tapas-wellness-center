'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Activity, ClipboardList, CheckCircle2, ShieldAlert, Sparkles, MessageCircle, Phone, ArrowRight, Check, Bone, Flame, Droplet, Brain, Apple, Leaf } from 'lucide-react';
import styles from './page.module.css';

const iconMap = {
  'fa-bone': Bone,
  'fa-fire': Flame,
  'fa-droplet': Droplet,
  'fa-brain': Brain,
  'fa-apple-whole': Apple,
  'fa-heart-pulse': Activity,
  'fa-leaf': Leaf,
  'fa-sparkles': Sparkles,
};

const therapyPrograms = [
  {
    id: 'back-pain',
    icon: 'fa-bone',
    title: 'Advanced Spine & Back Pain Therapy',
    category: 'Spine Focus',
    desc: 'Engage in highly specialized, non-invasive spinal traction postures and therapeutic alignment sequences specifically designed to resolve complex issues such as herniated discs, chronic sciatica, severe neck spasms, and long-term postural misalignments. By meticulously decompressing the intervertebral spaces, this program alleviates nerve impingement and deeply strengthens the intrinsic core musculature supporting the spine.',
    points: [
      'Targeted spinal alignment & mechanical traction',
      'Advanced core decompression techniques',
      'Immediate sciatica & acute disc spasm relief',
      'Long-term postural correction and stabilization cycles'
    ],
    remedy: 'Bhujangasana (Cobra), Marjariasana (Cat-Cow), Setu Bandhasana (Bridge Poses), Supta Padangusthasana'
  },
  {
    id: 'pcod',
    icon: 'fa-fire',
    title: 'Thyroid, PCOD & Hormonal Balance',
    category: 'Hormone Focus',
    desc: 'A comprehensive clinical endocrine stimulation program utilizing specific chin-lock postures (Jalandhara Bandha) and intense pelvic circulation flows. This therapy is explicitly structured to reset and balance a sluggish metabolism, drastically regulate thyroid and ovarian hormonal secretions, and provide a natural, sustainable approach to managing PCOD and related metabolic syndromes.',
    points: [
      'Comprehensive metabolism speed optimization',
      'Significant ovarian & pelvic blood flow enhancement',
      'Direct physical stimulation of the thyroid gland',
      'Natural weight management & menstrual cycle regulation'
    ],
    remedy: 'Sarvangasana (Shoulderstand), Matsyasana (Fish), Ustrasana (Camel Poses), Baddha Konasana'
  },
  {
    id: 'diabetes',
    icon: 'fa-droplet',
    title: 'Clinical Diabetes & Blood Pressure Control',
    category: 'Metabolic Focus',
    desc: 'Experience therapeutic deep abdominal twists (like Mandukasana and Ardha Matsyendrasana) that physically massage and stimulate pancreatic beta cells. Combined with rhythmic, cardiovascular-slowing respiration techniques, this program effectively lowers systemic hypertension, drastically improves cellular insulin sensitivity, and restores robust cardiovascular health without relying entirely on synthetic medications.',
    points: [
      'Direct physical stimulation of pancreatic beta-cells',
      'Organic reduction of systolic and diastolic pressure',
      'Significant enhancement of cellular insulin sensitivity',
      'Cardiac muscle conditioning & capillary bed health'
    ],
    remedy: 'Mandukasana (Frog), Paschimottanasana (Forward Fold), Ardha Matsyendrasana, Surya Bhedana'
  },
  {
    id: 'stress',
    icon: 'fa-brain',
    title: 'Profound Mental Stress & Anxiety Relief',
    category: 'Neurological Focus',
    desc: 'Utilizing advanced cortisol reduction cycles, this therapy combines deeply restorative poses with profound cooling Pranayamas (such as Nadi Shodhana and Bhramari). It is specifically engineered to instantly calm high nervous arousal, effectively cure chronic sleep disorders (insomnia), and provide a safe sanctuary for individuals suffering from acute anxiety, panic attacks, or severe adrenal fatigue.',
    points: [
      'Immediate trigger of the parasympathetic nervous system',
      'Rapid and sustained reduction of cortisol stress hormone',
      'Clinical cure for deep insomnia & chronic anxiety',
      'Advanced mindfulness and neural relaxation exercises'
    ],
    remedy: 'Savasana with Guided Yoga Nidra, Viparita Karani (Legs Up Wall), Nadi Shodhana Pranayama'
  },
  {
    id: 'digestive',
    icon: 'fa-apple-whole',
    title: 'Gastrointestinal & Digestive Rehabilitation',
    category: 'Gastrointestinal',
    desc: 'Implement specific yoga postures and deep abdominal practices that dramatically improve digestion, permanently reduce bloating, and effectively address chronic conditions like IBS, severe acid reflux, and persistent constipation. This program enhances natural digestive function, promotes healthy gut flora environment, and ensures optimal nutrient absorption through targeted organic detoxification.',
    points: [
      'Significantly improved peristaltic gut movement',
      'Optimal gastrointestinal blood flow alignment',
      'Immediate relief from constipation & acid reflux',
      'Deep cellular detoxification of visceral organs'
    ],
    remedy: 'Vajrasana (Thunderbolt), Pawanmuktasana (Wind-Relieving), Malasana (Yogic Squat), Agnisar Kriya'
  },
  {
    id: 'cardio',
    icon: 'fa-heart-pulse',
    title: 'Comprehensive Cardiovascular Health',
    category: 'Cardio Care',
    desc: 'This targeted yoga therapy supports profound heart health by dramatically improving systemic blood circulation, actively reducing high LDL cholesterol levels, managing chronic emotional stress, and promoting lasting cardiovascular endurance. It offers a gentle yet highly effective alternative to high-impact aerobics, ensuring the heart muscle remains strong, resilient, and deeply oxygenated.',
    points: [
      'Long-term preservation of arterial wall elasticity',
      'Effective regulation of resting heart rate',
      'Active support for natural cholesterol management',
      'Sustained cardiovascular endurance and muscle tone'
    ],
    remedy: 'Tadasana (Mountain), Vrikshasana (Tree), Anulom Vilom Pranayama, Gentle Surya Namaskar'
  },
  {
    id: 'panchakarma',
    icon: 'fa-leaf',
    title: 'Panchakarma & Ayurvedic Detoxification',
    category: 'Ayur Focus',
    desc: 'Experience traditional five-fold purification therapies (Panchakarma) tailored by certified Ayurvedic experts. Our programs feature Abhyanga (medicated oil massage), Swedana (steam detoxification), and customized Basti therapies. Designed to eliminate deep-seated cellular toxins (Ama), restore metabolic balance, and realign the bodily bio-elements (Vata, Pitta, Kapha) in a serene Varanasi sanctuary setting.',
    points: [
      'Authentic five-fold bodily detoxification cycles',
      'Elimination of deep tissue cellular waste (Ama)',
      'Balancing of Vata, Pitta, and Kapha bio-energies',
      'Skin rejuvenation, joint lubrication, and lymphatic drainage'
    ],
    remedy: 'Abhyanga (Oil Massage), Bashpa Swedana (Herbal Steam), Customized Ayurvedic Diet, Triphala cleansing'
  },
  {
    id: 'naturopathy',
    icon: 'fa-sparkles',
    title: 'Naturopathy & Natural Drugless Healing',
    category: 'Nature Cure',
    desc: 'Align your lifestyle with the five natural elements through drugless Naturopathy systems. We utilize therapeutic mud baths, hydrotherapy, sun therapy, and targeted fasting protocols. This holistic program stimulates the body\'s natural vital force (Prana) and innate self-healing mechanisms to address chronic digestion, skin conditions, and immune imbalances safely.',
    points: [
      'Drugless natural therapies aligned with element cycles',
      'Therapeutic mud applications & herbal compresses',
      'Hydrotherapy for metabolic and blood circulation boost',
      'Customized raw-food and juice fasting rejuvenation protocols'
    ],
    remedy: 'Mrid-Snan (Mud Therapy), Hydro-Massage, Element-aligned fasting, Pranayama & Prana-charging'
  }
];

const benefits = [
  { title: 'Comprehensive Holistic Approach', desc: 'Addresses the entirety of the human experience — physical body, mental clarity, prana (energy) flow, and spiritual well-being — rather than myopically treating isolated symptoms like traditional medicine.' },
  { title: 'Innate Natural Healing', desc: 'Expertly taps into the body\'s innate organic auto-repair mechanisms, promoting profound, lasting recovery without the debilitating, toxic side effects often associated with heavy pharmaceutical reliance.' },
  { title: 'Highly Personalized Treatment', desc: 'Every single clinical therapeutic program is custom-crafted down to the smallest detail, strictly based on your unique medical history, specific physical condition, and personal health goals.' },
  { title: 'Complete Personal Empowerment', desc: 'Equips you with active, lifelong tools, personalized alignment blueprints, and sustainable lifestyle regimes that you can run independently to maintain permanent, glowing health.' }
];

export default function YogaTherapyPage() {
  const [selectedProgram, setSelectedProgram] = useState(therapyPrograms[0].id);

  const activeProg = therapyPrograms.find(p => p.id === selectedProgram);

  return (
    <div className={styles.therapyPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <span className="section-badge"><Heart size={14} style={{ color: 'var(--rose)' }} /> Clinical Restoration</span>
              <h1 className={styles.title}>Clinical Yoga Therapy</h1>
              <p className={styles.subtitle}>Healing through the ancient science of traditional yoga and modern medical diagnostics</p>
              <p className={styles.desc}>
                Yoga therapy applies yoga techniques to resolve specific lifestyle disorders, chronic illnesses, and physical structural imbalances. Based on ancient Ayurvedic healing cycles and modern anatomical science, our clinical programs target root causes to heal, repair, and prevent.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20would%20like%20to%20book%20a%20clinical%20yoga%20therapy%20consultation." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle size={18} /> WhatsApp Consultation
                </a>
                <Link href="/wellness-tools" className="btn-secondary">Take Health Assessment</Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.imageContainer}>
                <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800" alt="Yoga Therapy Session" width={800} height={533} className={styles.image} />
                <div className={styles.imageGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><Activity size={14} /> The Process</span>
            <h2 className="section-title">How Yoga Therapy Works</h2>
            <p className="section-subtitle">Our clinical framework is structured to offer long-term recovery and vitality</p>
          </div>
          <div className={styles.processGrid}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="feature-icon cyan" style={{ margin: '0 auto 1.25rem' }}><Activity size={24} /></div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>1. Initial Assessment</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>We conduct a deep medical and lifestyle assessment of your back pain, metabolic rate, or stress triggers.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="feature-icon violet" style={{ margin: '0 auto 1.25rem' }}><ClipboardList size={24} /></div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>2. Personalized Routine</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>We create a custom prescription containing targeting asanas, precise bandhas, and therapeutic breathing cycles.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="feature-icon emerald" style={{ margin: '0 auto 1.25rem' }}><Heart size={24} /></div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem' }}>3. Monitored Healing</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Consistent daily 20-minute classes under certified therapists, adapting postures as your body heals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Programs Selector ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><ClipboardList size={14} /> Diagnostic Suites</span>
            <h2 className="section-title">Targeted Clinical Conditions</h2>
            <p className="section-subtitle">Select a health condition to explore clinical focus and yogic remedies.</p>
          </div>

          <div className={styles.programsWrapper}>
            <div className={styles.programsSidebar}>
              {therapyPrograms.map((p) => (
                <button
                  key={p.id}
                  className={`${styles.sidebarBtn} ${selectedProgram === p.id ? styles.sidebarBtnActive : ''}`}
                  onClick={() => setSelectedProgram(p.id)}
                >
                  {(() => {
                    const IconComponent = iconMap[p.icon];
                    return IconComponent ? <IconComponent className={styles.sidebarBtnIcon} size={18} /> : null;
                  })()}
                  <span className={styles.sidebarBtnText}>{p.title}</span>
                </button>
              ))}
            </div>

            <div className={`${styles.programDetails} glass-card`}>
              <div className={styles.detailsHeader}>
                <span className="section-badge" style={{ marginBottom: 0 }}>{activeProg.category}</span>
                <h3 className={styles.detailsTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {(() => {
                    const IconComponent = iconMap[activeProg.icon];
                    return IconComponent ? <IconComponent className={styles.titleIcon} size={24} /> : null;
                  })()}
                  <span>{activeProg.title}</span>
                </h3>
              </div>
              <p className={styles.detailsDesc}>{activeProg.desc}</p>
              
              <div className={styles.detailsContentGrid}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '1.05rem' }}>Clinical Targets:</h4>
                  <ul className={styles.detailsList}>
                    {activeProg.points.map((pt, i) => (
                      <li key={i}>
                        <Check size={14} style={{ color: 'var(--emerald)' }} /> <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.remedyBox}>
                  <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={16} /> Recommended Asanas:
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {activeProg.remedy}
                  </p>
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={`https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20want%20to%20consult%20for%20${encodeURIComponent(activeProg.title)}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
                      Consult For This
                    </a>
                    <Link href="/contact" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
                      Book Session
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><CheckCircle2 size={14} /> Efficacy</span>
            <h2 className="section-title">The Science of Yogic Recovery</h2>
            <p className="section-subtitle">Why clinical yoga therapy succeeds where standard chemical treatments fall short</p>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div key={i} className="glass-card" style={{ display: 'flex', gap: '1.25rem' }}>
                <CheckCircle2 size={32} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.15rem' }}>{b.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Warning / Disclaimer ─── */}
      <section className="section">
        <div className="container">
          <div className={`${styles.disclaimerBox} glass-card`}>
            <ShieldAlert size={36} className={styles.disclaimerIcon} />
            <div>
              <h4 style={{ color: 'var(--amber)', fontWeight: 700, marginBottom: '0.5rem' }}>Important Medical Notice</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Yoga therapy is a potent complementary medicine system. It is designed to stimulate your body's organic self-repair. However, it should not be treated as a direct substitute for emergency medical care. Always consult your primary physician before starting any intense posture routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className="section-title">Begin Your Path to Natural Healing & Restoration</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Experience specialized, expert-guided programs designed to bring your mind, body, and energy into absolute alignment.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20would%20like%20to%20book%20a%20clinical%20yoga%20therapy%20consultation." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={18} /> WhatsApp Booking
            </a>
            <a href="tel:+916394554685" className="btn-primary">
              <Phone size={16} /> Call Therapist
            </a>
            <Link href="/pricing" className="btn-secondary">View Therapy Plans</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
