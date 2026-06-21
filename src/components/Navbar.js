'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ style }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { href: '/', label: 'Home' },
    { href: '/classes', label: 'Classes' },
    { href: '/yoga-therapy', label: 'Therapy' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  const exploreLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/wellness-tools', label: 'Wellness Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/testimonials', label: 'Reviews' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} style={style}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <Image 
            src="/images/logo.jpg" 
            alt="Tapas Yoga Logo" 
            width={200} 
            height={60} 
            className={styles.logoImage} 
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Explore Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownBtn}>
              Explore
            </button>
            <div className={styles.dropdownMenu}>
              {exploreLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.dropdownLink} ${isActive ? styles.dropdownActiveLink : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileSectionTitle}>Main Menu</div>
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className={styles.mobileSectionTitle} style={{ marginTop: '1rem' }}>Explore</div>
            <div className={styles.mobileGridLinks}>
              {exploreLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
