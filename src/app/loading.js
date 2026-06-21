'use client';

import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-deep, #060a12)',
      display: 'flex',
      alignItems: 'center',
      justifycontent: 'center',
      zIndex: 99999,
      fontFamily: 'var(--font-header), sans-serif'
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--violet-glow, rgba(139, 92, 246, 0.15)) 0%, transparent 70%)',
        filter: 'blur(50px)',
        top: '20%',
        left: '10%',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, var(--cyan-glow, rgba(6, 182, 212, 0.15)) 0%, transparent 70%)',
        filter: 'blur(40px)',
        bottom: '20%',
        right: '10%',
        pointerEvents: 'none'
      }}></div>

      {/* Glass Loading Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(11, 19, 34, 0.45)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '1.5rem',
        padding: '3rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        textAlign: 'center',
        maxWidth: '450px',
        width: '90%'
      }}>
        {/* Animated Spin Loop */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          marginBottom: '2rem'
        }}>
          {/* Outer Ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '2px solid rgba(6, 182, 212, 0.15)',
            borderTopColor: 'var(--cyan, #06b6d4)',
            borderRadius: '50%',
            animation: 'spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite'
          }}></div>
          {/* Inner Ring */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '2px solid rgba(139, 92, 246, 0.15)',
            borderBottomColor: 'var(--violet, #8b5cf6)',
            borderRadius: '50%',
            animation: 'spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse'
          }}></div>
          {/* Center Lotus/Glow point */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--cyan, #06b6d4)',
            filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
          }}>
            <Sparkles size={20} />
          </div>
        </div>

        <h3 style={{
          color: '#ffffff',
          fontSize: '1.4rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          letterSpacing: '0.5px'
        }}>
          Aligning Energies
        </h3>
        <span style={{
          color: 'var(--cyan, #06b6d4)',
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1rem',
          display: 'block'
        }}>
          Purifying Mind & Body
        </span>
        <p style={{
          color: 'var(--text-secondary, #94a3b8)',
          fontSize: '0.92rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          Preparing your sanctuary. Calming the mind, restoring the physical body...
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
