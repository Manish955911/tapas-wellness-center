'use client';

import { useState } from 'react';
import BMICalculator from '@/components/BMICalculator';
import { Activity, Heart, ShieldAlert, Sparkles, MessageCircle, Info, Check, Apple, HelpCircle } from 'lucide-react';
import styles from './page.module.css';

const remediesDb = {
  backpain: {
    title: 'Back Pain & Spinal Stiffness (Spine recovery)',
    asanas: [
      'Bhujangasana (Cobra Pose) - Decompresses back discs',
      'Marjariasana (Cat-Cow) - Restores spine elasticity',
      'Adho Mukha Svanasana - Realigns shoulder blades',
      'Setu Bandhasana (Bridge) - Strengthens lumbar glute muscles'
    ],
    herbs: 'Boil 1/2 teaspoon of dry Ginger and 1 pinch of Turmeric in fresh water twice daily. Apply warm sesame oil (Til oil) on the lumbar spine.',
    diet: [
      { meal: 'Morning', food: 'Warm Ginger water + overnight soaked Almonds & Walnuts.' },
      { meal: 'Breakfast', food: 'Steel-cut Oats with seeds or warm Ragi porridge.' },
      { meal: 'Lunch', food: 'Fresh Steamed Green vegetables + Moong Dal + Jowar/Bajra Chapati.' },
      { meal: 'Snack', food: 'Herbal Kadha or spiced butter-milk.' },
      { meal: 'Dinner', food: 'Light vegetable soup + baked paneer or boiled green vegetables.' }
    ]
  },
  thyroid: {
    title: 'Thyroid / PCOD (Hormonal alignment)',
    asanas: [
      'Sarvangasana (Shoulderstand) - Deep thyroid blood compression',
      'Matsyasana (Fish Pose) - Stretches neck thyroid glands',
      'Halasana (Plow Pose) - Promotes pituitary endocrine alignment',
      'Ustrasana (Camel Pose) - Restores hormonal equilibrium'
    ],
    herbs: 'Consume 1 teaspoon of fresh Coriander seed water (prepared overnight) on an empty stomach in the morning. Utilize Dashmoola formulations.',
    diet: [
      { meal: 'Morning', food: 'Coriander seed water + warm water.' },
      { meal: 'Breakfast', food: 'Sprouted moong salad with lemon & rock salt.' },
      { meal: 'Lunch', food: 'Brown rice / Jowar Chapati + boiled spinach + curd.' },
      { meal: 'Snack', food: 'Roasted Makhana (Fox nuts) + coconut water.' },
      { meal: 'Dinner', food: 'Stir-fry seasonal vegetables + light vegetable soup.' }
    ]
  },
  diabetes: {
    title: 'Diabetes & High Blood Pressure (Metabolic speed)',
    asanas: [
      'Mandukasana (Frog Pose) - Deep physical compression of pancreatic cells',
      'Ardha Matsyendrasana - Enhances insulin sensitivity via lateral compression',
      'Paschimottanasana - Massages liver, spleen, and kidney channels',
      'Kapalbhati Pranayama - Stimulates glucose metabolic speeds'
    ],
    herbs: 'Mix 1/2 teaspoon of organic Methi (Fenugreek) seed powder with warm water daily at morning startup. Consume bitter gourd (Karela) juice.',
    diet: [
      { meal: 'Morning', food: 'Soaked Fenugreek seeds + Amla juice.' },
      { meal: 'Breakfast', food: 'Vegetable Besan Chilla or whole green gram pancakes.' },
      { meal: 'Lunch', food: 'Multigrain chapati + leafy greens + sprouted salad.' },
      { meal: 'Snack', food: 'Spiced Roasted Bengal gram + green herbal tea.' },
      { meal: 'Dinner', food: 'Boiled vegetables + tofu or green lentil soup.' }
    ]
  },
  stress: {
    title: 'Mental Stress, Anxiety & Insomnia (Nerve cooling)',
    asanas: [
      'Viparita Karani (Legs Up Wall) - Triggers rapid blood flow reversal',
      'Balasana (Child\'s Pose) - Calms sympathetic high heart rates',
      'Nadi Shodhana Pranayama - Eradicates stress cortisol levels instantly',
      'Savasana (Corpse Pose) - Calms cerebral cortex arousal'
    ],
    herbs: 'Take 1/2 teaspoon of pure Ashwagandha root powder mixed with warm milk (or water) at bedtime to induce deep restful sleep.',
    diet: [
      { meal: 'Morning', food: 'Soaked raisins + green mint infusion.' },
      { meal: 'Breakfast', food: 'Sweet dry fruit porridge or warm suji upma.' },
      { meal: 'Lunch', food: 'Traditional dal rice + fresh ghee + cucumber salad.' },
      { meal: 'Snack', food: 'Warm Chamomile tea + roasted pumpkin seeds.' },
      { meal: 'Dinner', food: 'Warm milk with nutmeg + vegetable soup + light khichdi.' }
    ]
  }
};

export default function WellnessToolsPage() {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [bookingService, setBookingService] = useState('One-on-One Yoga Therapy Session');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingHistory, setBookingHistory] = useState('');

  const currentRemedy = remediesDb[selectedDisease];

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    let whatsappText = `*Pranam TAPAS Center!* 🙏\n`;
    whatsappText += `I would like to book a *Private Session / Custom Diet Consultation*.\n\n`;
    whatsappText += `*Client Name:* ${bookingName}\n`;
    whatsappText += `*Service Requested:* ${bookingService}\n`;
    whatsappText += `*Target Date:* ${bookingDate}\n\n`;

    if (selectedDisease) {
      whatsappText += `*Focus Health Issue:* ${remediesDb[selectedDisease].title}\n`;
    }
    if (bookingHistory.trim()) {
      whatsappText += `*Medical History:* ${bookingHistory}\n`;
    }

    whatsappText += `\n_Please confirm my private therapeutic session block and custom diet chart maps._`;

    const encodedText = encodeURIComponent(whatsappText);
    window.open(`https://wa.me/916394554685?text=${encodedText}`, '_blank');
  };

  return (
    <div className={styles.wellnessPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><Sparkles size={14} /> Interactive Suite</span>
          <h1 className={styles.title}>TAPAS Wellness Sanctuary</h1>
          <p className={styles.subtitle}>
            Use our interactive wellness diagnostic suite to calculate your health metrics, retrieve tailored Ayurvedic remedies, map custom diet plans, and secure your direct consultation slot.
          </p>
        </div>
      </section>

      {/* ─── Main Content Grid ─── */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.mainGrid}>
            <div className={styles.leftCol}>
              {/* BMI Widget */}
              <div className={styles.widgetWrapper}>
                <BMICalculator />
              </div>

              {/* Disease Remedy Finder Widget */}
              <div className={`${styles.remedyFinderCard} glass-card`}>
                <div className={styles.widgetHeader}>
                  <div className="feature-icon cyan"><Heart size={24} /></div>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.35rem', fontWeight: 800 }}>
                      2. Disease, Remedy & Custom Diet Finder
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Select a health condition to view yogic asanas, Ayurvedic herbs, and recommended meal blueprints.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <label className={styles.inputLabel}>Choose Specific Health Condition</label>
                  <select
                    value={selectedDisease}
                    onChange={(e) => setSelectedDisease(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="" disabled>-- Select a condition to view remedies --</option>
                    <option value="backpain">Back Pain & Spinal Stiffness (Spine recovery)</option>
                    <option value="thyroid">Thyroid / PCOD (Hormonal alignment)</option>
                    <option value="diabetes">Diabetes & High Blood Pressure (Metabolic speed)</option>
                    <option value="stress">Mental Stress, Anxiety & Insomnia (Nerve cooling)</option>
                  </select>
                </div>

                {currentRemedy ? (
                  <div className={`${styles.remedyResult} ${styles.fadeIn}`}>
                    <div className={styles.remedyGrid}>
                      <div>
                        <h4 className={styles.sectionHeading}><Sparkles size={16} /> Prescribed Yogic Asanas</h4>
                        <ul className={styles.asanasList}>
                          {currentRemedy.asanas.map((asana, index) => (
                            <li key={index}>
                              <Check size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                              <span>{asana}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className={styles.sectionHeading} style={{ marginTop: '2rem' }}><Activity size={16} /> Ayurvedic Home Remedies</h4>
                        <div className={styles.herbsBox}>
                          <Info size={16} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '0.15rem' }} />
                          <p>{currentRemedy.herbs}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className={styles.sectionHeading}><Apple size={16} /> Standard Diet Blueprint</h4>
                        <div className={styles.tableWrapper}>
                          <table className={styles.dietTable}>
                            <thead>
                              <tr>
                                <th>Meal</th>
                                <th>Prescribed Food Selection</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentRemedy.diet.map((item, index) => (
                                <tr key={index}>
                                  <td><strong>{item.meal}</strong></td>
                                  <td>{item.food}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
                          * Custom diet maps are tailored specifically during one-on-one consultation sessions.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyRemedyState}>
                    <HelpCircle size={40} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                    <p>No condition selected yet. Please pick one from the dropdown above to view recommended protocols.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Booking Engine */}
            <div className={styles.rightCol}>
              <div className={`${styles.bookingCard} glass-card`}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span className="section-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--violet)' }}>Varanasi Center Priority</span>
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.45rem', fontWeight: 800, margin: '0.75rem 0 0.5rem' }}>
                    Private Session Booking
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Schedule an exclusive 1-on-1 diagnostic check, customized diet prescription, or private clinical session with our certified yoga therapist.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label className={styles.inputLabel}>Select Custom Service</label>
                    
                    <label className={`${styles.radioLabel} ${bookingService === 'One-on-One Yoga Therapy Session' ? styles.radioSelected : ''}`}>
                      <input
                        type="radio"
                        name="bookingService"
                        value="One-on-One Yoga Therapy Session"
                        checked={bookingService === 'One-on-One Yoga Therapy Session'}
                        onChange={(e) => setBookingService(e.target.value)}
                        className={styles.radioInput}
                      />
                      <div>
                        <strong>One-on-One Yoga Therapy</strong>
                        <small>Intense structural spine or disease management.</small>
                      </div>
                    </label>

                    <label className={`${styles.radioLabel} ${bookingService === 'Ayurvedic Diet & Lifestyle Mapping' ? styles.radioSelected : ''}`}>
                      <input
                        type="radio"
                        name="bookingService"
                        value="Ayurvedic Diet & Lifestyle Mapping"
                        checked={bookingService === 'Ayurvedic Diet & Lifestyle Mapping'}
                        onChange={(e) => setBookingService(e.target.value)}
                        className={styles.radioInput}
                      />
                      <div>
                        <strong>Diet & Lifestyle Mapping</strong>
                        <small>Complete custom diet charts mapped to your bio-metrics.</small>
                      </div>
                    </label>

                    <label className={`${styles.radioLabel} ${bookingService === 'Private Clinical Healing Assessment' ? styles.radioSelected : ''}`}>
                      <input
                        type="radio"
                        name="bookingService"
                        value="Private Clinical Healing Assessment"
                        checked={bookingService === 'Private Clinical Healing Assessment'}
                        onChange={(e) => setBookingService(e.target.value)}
                        className={styles.radioInput}
                      />
                      <div>
                        <strong>Private Assessment Session</strong>
                        <small>Comprehensive posture, breathing, and medical scan review.</small>
                      </div>
                    </label>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label className={styles.inputLabel}>Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className={styles.textInput}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label className={styles.inputLabel}>Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className={styles.textInput}
                    />
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <label className={styles.inputLabel}>Primary Issue / Medical History</label>
                    <textarea
                      rows="3"
                      placeholder="Describe your back pain, thyroid level, blood sugar, or stress details..."
                      value={bookingHistory}
                      onChange={(e) => setBookingHistory(e.target.value)}
                      className={styles.textareaInput}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <MessageCircle size={18} /> Schedule on WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Medical Disclaimer ─── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`${styles.disclaimer} glass-card`}>
            <ShieldAlert size={36} style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--amber)', fontWeight: 700, marginBottom: '0.25rem' }}>Important Medical Notice</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                These diagnostic tools and standard diet blueprints serve as complementary guides. They are not intended as direct replacements for official clinical advice, medical diagnosis, or prescription medicines. Always consult your family physician before implementing heavy anatomical twists or herbal extractions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
