'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '40px'
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--muted)',
          textDecoration: 'none',
          fontSize: '0.8rem',
          marginBottom: '32px'
        }}>
          <span>←</span> Back to site
        </Link>

        <h1 className="display" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Admin Login
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Enter your email to receive a login link
        </p>

        {status === 'success' ? (
          <div style={{
            padding: '20px',
            background: 'rgba(232,255,71,0.08)',
            border: '1px solid rgba(232,255,71,0.2)',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--accent)', marginBottom: '8px' }}>✓ Check your inbox</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              We sent a login link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border2)',
                  borderRadius: '4px',
                  color: 'var(--fg)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: status === 'loading' ? 0.7 : 1
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Login Link'}
            </button>

            {status === 'error' && (
              <p style={{
                color: '#ff6b6b',
                fontSize: '0.85rem',
                marginTop: '16px',
                textAlign: 'center'
              }}>
                Only authorized users can access this site
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
