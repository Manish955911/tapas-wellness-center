'use client';

import { useState } from 'react';
import { Sparkles, X, Send, CheckCircle, MessageCircle, PhoneCall } from 'lucide-react';
import styles from './LeadCaptureWidget.module.css';

export default function LeadCaptureWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'General Fitness & Vitality',
    preferredBatch: 'Morning: 7:15 AM — 8:15 AM'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setErrorMsg('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(true);
        // Clear form
        setFormData({
          name: '',
          phone: '',
          email: '',
          goal: 'General Fitness & Vitality',
          preferredBatch: 'Morning: 7:15 AM — 8:15 AM'
        });
      } else {
        setErrorMsg(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button className={styles.floatingBtn} onClick={handleOpen} aria-label="Book Free Trial Class">
        <Sparkles size={16} className={styles.sparkleIcon} />
        <span>Book Free Trial</span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={`${styles.modalCard} glass-card`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close form">
              <X size={18} />
            </button>

            {!success ? (
              <form onSubmit={handleSubmit} className={styles.leadForm}>
                <div className={styles.modalHeader}>
                  <span className={styles.badge}><Sparkles size={12} /> Limited Slots</span>
                  <h3>Claim Your Free Trial Class</h3>
                  <p>Experience Varanasi's premier traditional Vedic & Clinical Yoga session. No payment required.</p>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="widget-name">Full Name *</label>
                  <input
                    id="widget-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="widget-phone">WhatsApp Number *</label>
                  <input
                    id="widget-phone"
                    type="tel"
                    name="phone"
                    required
                    pattern="^\+?[0-9\s-]{10,14}$"
                    minLength={10}
                    maxLength={15}
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <small className={styles.helpText}>We will text you the live class link on this number.</small>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="widget-batch">Preferred Batch</label>
                    <select
                      id="widget-batch"
                      name="preferredBatch"
                      value={formData.preferredBatch}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="Morning: 6:00 AM — 7:00 AM">Morning: 6:00 AM — 7:00 AM</option>
                      <option value="Morning: 7:15 AM — 8:15 AM">Morning: 7:15 AM — 8:15 AM</option>
                      <option value="Morning: 8:30 AM — 9:30 AM">Morning (Therapy): 8:30 AM — 9:30 AM</option>
                      <option value="Morning: 9:30 AM — 10:30 AM">Morning: 9:30 AM — 10:30 AM</option>
                      <option value="Morning: 10:30 AM — 11:30 AM">Morning: 10:30 AM — 11:30 AM</option>
                      <option value="Evening: 4:00 PM — 5:00 PM">Evening: 4:00 PM — 5:00 PM</option>
                      <option value="Evening: 5:00 PM — 6:00 PM">Evening: 5:00 PM — 6:00 PM</option>
                      <option value="Evening: 6:15 PM — 7:15 PM">Evening: 6:15 PM — 7:15 PM</option>
                      <option value="1-on-1 Consultation">Private 1-on-1 Consultation</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="widget-goal">Primary Health Focus</label>
                    <select
                      id="widget-goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="General Fitness & Vitality">General Fitness & Vitality</option>
                      <option value="Clinical Yoga Therapy (Thyroid/Diabetes)">Thyroid / Diabetes Control</option>
                      <option value="Spine, Joints & Back Pain">Back Pain / Joints Recovery</option>
                      <option value="Stress, Anxiety & Insomnia">Stress & Anxiety Relief</option>
                      <option value="Weight Loss & Metabolic Boost">Weight Loss Yoga</option>
                      <option value="Other / Chronic Concerns">Other Chronic Conditions</option>
                    </select>
                  </div>
                </div>

                {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={loading}>
                  <Send size={14} /> {loading ? 'Securing Slot...' : 'Reserve My Free Trial'}
                </button>
              </form>
            ) : (
              <div className={styles.successScreen}>
                <div className={styles.successIconBox}>
                  <CheckCircle size={40} />
                </div>
                <h3>Trial Class Booked!</h3>
                <p>
                  Pranam! Your free trial request has been logged successfully. 
                  Our wellness team is reviewing your preferred slot and will get back to you shortly.
                </p>
                
                <div className={styles.successActions}>
                  <a 
                    href={`https://wa.me/916394554685?text=Pranam%20TAPAS%20Center!%20I%20have%20registered%20for%20a%20free%20trial%20class.%20My%20name%20is%20${encodeURIComponent(formData.name || 'Student')}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} /> Instant WhatsApp Confirmation
                  </a>
                  
                  <button onClick={handleClose} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
