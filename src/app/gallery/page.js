'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Image as ImageIcon, MapPin, Eye, Sparkles, Filter, ZoomIn } from 'lucide-react';
import styles from './page.module.css';

const galleryData = [
  {
    id: 1,
    title: 'Pranayama Workshop',
    desc: 'Bhramari breathing techniques for nervous system cooling.',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    tag: 'varanasi',
    tagLabel: 'Varanasi Center'
  },
  {
    id: 2,
    title: 'Dhyana & Meditation',
    desc: 'Achieving internal quietness through guided Sukhasana alignment.',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    tag: 'varanasi',
    tagLabel: 'Varanasi Center'
  },
  {
    id: 3,
    title: 'Group Alignment Class',
    desc: 'Breath-movement synchronization under professional yogic supervision.',
    img: 'https://images.unsplash.com/photo-1506629905607-c1f40f4c57c1?w=600&h=400&fit=crop',
    tag: 'varanasi',
    tagLabel: 'Varanasi Center'
  },
  {
    id: 4,
    title: 'Alternate Nostril Breathing',
    desc: 'Nadi Shodhana breathing to regulate metabolism and clear energy channels.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    tag: 'varanasi',
    tagLabel: 'Varanasi Center'
  },
  {
    id: 5,
    title: 'Shavasana Relaxation',
    desc: 'Deep physical integration and nerve cooling to seal clinical benefits.',
    img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop',
    tag: 'varanasi',
    tagLabel: 'Varanasi Center'
  },
  {
    id: 6,
    title: 'Hatha Yoga Alignment',
    desc: 'Precision posturing focusing on base muscular structures.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    tag: 'global',
    tagLabel: 'Global Practice'
  },
  {
    id: 7,
    title: 'Vinyasa Flow State',
    desc: 'Continuous motion syncing breathing patterns with spine flexibility.',
    img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&fit=crop',
    tag: 'global',
    tagLabel: 'Global Practice'
  },
  {
    id: 8,
    title: 'Ashtanga Primary Series',
    desc: 'High stamina traditional flows focused on detoxification.',
    img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=400&fit=crop',
    tag: 'global',
    tagLabel: 'Global Practice'
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [zoomImg, setZoomImg] = useState(null);
  const [gallery, setGallery] = useState(galleryData);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const result = await res.json();
        if (res.ok && result.success && result.data && result.data.length > 0) {
          setGallery([...result.data, ...galleryData]);
        }
      } catch (err) {
        console.error('Error fetching gallery items:', err);
      }
    };
    fetchGallery();
  }, []);

  const filteredGallery = gallery.filter((item) => {
    return activeFilter === 'all' || item.tag === activeFilter;
  });

  return (
    <div className={styles.galleryPage}>
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        <div className={styles.orbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="section-badge"><ImageIcon size={14} /> Media Archive</span>
          <h1 className={styles.title}>Our Sanctuary Gallery</h1>
          <p className={styles.subtitle}>Moments from our physical Varanasi yoga classes, events, and global retreats.</p>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filters}>
            {[
              { label: 'All Media', value: 'all' },
              { label: 'Varanasi Studio', value: 'varanasi' },
              { label: 'Global Practices', value: 'global' }
            ].map((f) => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                <Filter size={12} /> {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Grid ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.galleryGrid}>
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className={`${styles.galleryCard} glass-card`}
                onClick={() => setZoomImg(item)}
              >
                <div className={styles.imgWrapper}>
                  <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className={styles.img} />
                  <span className={styles.locationBadge}>
                    <MapPin size={12} /> {item.tagLabel}
                  </span>
                  <div className={styles.overlay}>
                    <ZoomIn size={36} className={styles.zoomIcon} />
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Zoom Lightbox Modal ─── */}
      {zoomImg && (
        <div className={styles.lightbox} onClick={() => setZoomImg(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setZoomImg(null)} aria-label="Close image viewer">
              &times;
            </button>
            <div style={{ position: 'relative', width: '100%', height: '480px' }}>
              <Image src={zoomImg.img} alt={zoomImg.title} fill style={{ objectFit: 'cover' }} className={styles.lightboxImg} />
            </div>
            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxBadge}>{zoomImg.tagLabel}</span>
              <h3>{zoomImg.title}</h3>
              <p>{zoomImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── CTA ─── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container text-center">
          <h2 className="section-title">Join Our Live Yoga Community</h2>
          <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
            Book your direct physical or online consultation call and start building healthy practices.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Book Free Assessment</Link>
            <Link href="/classes" className="btn-secondary">Explore Our Classes</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
