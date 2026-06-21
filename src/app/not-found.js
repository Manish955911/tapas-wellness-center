'use client';

import Link from 'next/link';
import { Compass, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      background: 'var(--bg-deep, #060a12)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8rem 2rem 4rem',
      fontFamily: 'var(--font-header), sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--violet-glow, rgba(139, 92, 246, 0.12)) 0%, transparent 70%)',
        filter: 'blur(50px)',
        top: '15%',
        right: '10%',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, var(--cyan-glow, rgba(6, 182, 212, 0.12)) 0%, transparent 70%)',
        filter: 'blur(45px)',
        bottom: '15%',
        left: '10%',
        pointerEvents: 'none'
      }}></div>

      <div className="glass-card" style={{
        maxWidth: '550px',
        width: '100%',
        padding: '3.5rem 3rem',
        textAlign: 'center',
        background: 'rgba(11, 19, 34, 0.45)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Glowing Compass Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(6, 182, 212, 0.05)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: 'var(--cyan, #06b6d4)',
          filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.35))',
          animation: 'floatCompass 4s ease-in-out infinite'
        }}>
          <Compass size={36} />
        </div>

        <h1 style={{
          color: '#ffffff',
          fontSize: '4.5rem',
          fontWeight: 900,
          lineHeight: '1',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-header), sans-serif',
          background: 'linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.5) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          404
        </h1>
        
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.5rem',
          fontWeight: 800,
          marginBottom: '0.5rem'
        }}>
          Path Faded Into Akasha
        </h2>
        
        <span style={{
          color: 'var(--cyan, #06b6d4)',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2.5px',
          marginBottom: '1.5rem',
          display: 'block'
        }}>
          Page Not Found
        </span>
        
        <p style={{
          color: 'var(--text-secondary, #94a3b8)',
          fontSize: '0.98rem',
          lineHeight: '1.7',
          marginBottom: '2.5rem'
        }}>
          The coordinates you entered do not match any known physical location or spiritual dimension in our directory. Let us guide you back to stable ground.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <Home size={16} /> Return Home
          </Link>
          
          <Link
            href="/classes"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <BookOpen size={16} /> View Classes
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatCompass {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
