'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: '916394554685',
    facebook: '',
    instagram: '',
    youtube: '',
    email: 'contact@tapasyoga.in'
  });

  useEffect(() => {
    fetch('/api/offers')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setSocialLinks({
            whatsapp: res.data.whatsapp_phone || '916394554685',
            facebook: res.data.facebook_link || '',
            instagram: res.data.instagram_link || '',
            youtube: res.data.youtube_link || '',
            email: res.data.contact_email || 'contact@tapasyoga.in'
          });
        }
      })
      .catch(err => console.error('Error fetching footer settings:', err));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        alert(result.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        alert(result.error || 'Failed to subscribe.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '+91 63945 54685';
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 12) {
      return `+${clean.slice(0, 2)} ${clean.slice(2, 7)} ${clean.slice(7)}`;
    }
    return `+${clean}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topPattern}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo & Philosophy Column */}
          <div className={styles.column}>
            <div className={styles.logo}>
              <Image 
                src="/images/logo.jpg" 
                alt="Tapas Yoga Logo" 
                width={200} 
                height={60} 
                className={styles.logoImage} 
              />
            </div>
            <p className={styles.description}>
              Integrating traditional Patanjali yogic science with modern clinical therapy. 
              Join our sanctuary to heal your body, calm your mind, and awaken your spirit.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Sanctuary</h4>
            <ul className={styles.links}>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/classes">Yoga Classes</Link></li>
              <li><Link href="/yoga-therapy">Clinical Therapy</Link></li>
              <li><Link href="/teachers">Yogacharyas</Link></li>
              <li><Link href="/schedule">Daily Schedule</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Connect</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Paharia Wellness Center, Near Happy Model School, Varanasi</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <a href={`https://wa.me/${socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  {formatPhoneNumber(socialLinks.whatsapp)}
                </a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <a href={`mailto:${socialLinks.email}`}>{socialLinks.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Awaken</h4>
            <p className={styles.newsletterText}>
              Subscribe to receive weekly wellness tips, spiritual insights, and clinical yoga guides.
            </p>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <input 
                type="email" 
                placeholder="Your sacred email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.subscribeInput}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.container} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%', gap: '1.5rem' }}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} TAPAS Yoga Therapy & Wellness Center. All rights reserved.
          </p>
          <div className={styles.links}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/admin/leads" style={{ opacity: 0.4 }}>Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
