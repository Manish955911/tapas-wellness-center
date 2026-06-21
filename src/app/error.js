'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error('Next.js Layout Boundary Error:', error);
  }, [error]);

  return (
    <div style={{
      background: 'var(--bg-deep, #060a12)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8rem 2rem 4rem',
      fontFamily: 'var(--font-header), sans-serif'
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        top: '20%',
        left: '15%',
        pointerEvents: 'none'
      }}></div>

      <div className="glass-card" style={{
        maxWidth: '550px',
        width: '100%',
        padding: '3rem',
        textAlign: 'center',
        background: 'rgba(11, 19, 34, 0.45)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--rose, #f43f5e)',
          filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))'
        }}>
          <ShieldAlert size={32} />
        </div>

        <h1 style={{
          color: '#ffffff',
          fontSize: '1.8rem',
          fontWeight: 800,
          marginBottom: '0.5rem'
        }}>
          Practice Disrupted
        </h1>
        <span style={{
          color: 'var(--rose, #f43f5e)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1rem',
          display: 'block'
        }}>
          System Error Encountered
        </span>
        <p style={{
          color: 'var(--text-secondary, #94a3b8)',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          A metabolic error occurred while rendering this page block. Don't worry, your spinal alignment is safe. Let's try to restore the flow.
        </p>

        {/* Error message card */}
        <div style={{
          background: 'rgba(6, 10, 18, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'left',
          marginBottom: '2rem',
          wordBreak: 'break-all',
          maxHeight: '120px',
          overflowY: 'auto'
        }}>
          <strong>Details: </strong> {error.message || 'Unknown render breakdown'}
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={16} /> Try Again
          </button>
          
          <Link
            href="/"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <Home size={16} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
