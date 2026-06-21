'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  const [offer, setOffer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch('/api/offers');
        const result = await res.json();
        if (res.ok && result.success && result.data && result.data.is_active) {
          // Check if user dismissed this specific offer ID in session storage
          const dismissedId = sessionStorage.getItem('tapas_dismissed_offer_id');
          if (dismissedId !== result.data.id?.toString()) {
            setOffer(result.data);
            setIsVisible(true);
          }
        }
      } catch (err) {
        console.error('Error fetching active offer banner:', err);
      }
    };
    fetchOffer();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (offer && offer.id) {
      sessionStorage.setItem('tapas_dismissed_offer_id', offer.id.toString());
    }
  };

  if (!isVisible || !offer) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Sparkles size={14} className={styles.sparkleIcon} />
          <span className={styles.text}>{offer.banner_text}</span>
          {offer.button_text && offer.button_link && (
            <Link href={offer.button_link} className={styles.ctaButton}>
              {offer.button_text}
            </Link>
          )}
        </div>
        <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Dismiss banner">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
