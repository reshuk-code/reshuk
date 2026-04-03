'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({
    title: '',
    cover: '',
    content: ''
  });
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (res.ok) {
          const post = await res.json();
          setForm({
            title: post.title,
            cover: post.cover || '',
            content: post.content
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--muted)' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/admin/posts" className="btn-outline" style={{ marginBottom: '24px', display: 'inline-flex' }}>
            ← Back
          </Link>
          <h1 className="display" style={{ fontSize: '2rem' }}>Edit Post</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Cover Image URL
            </label>
            <input
              type="url"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="https://example.com/image.jpg"
              style={inputStyle}
            />
          </div>

          {form.cover && (
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              maxHeight: '300px'
            }}>
              <img
                src={form.cover}
                alt="Cover preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Content (HTML supported)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={16}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '12px' }}>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
            >
              {status === 'loading' ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/posts" className="btn-outline">
              Cancel
            </Link>
          </div>

          {status === 'error' && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
              Failed to save changes. Please try again.
            </p>
          )}
        </form>
      </div>

      <style>{`
        input, textarea {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg2);
          border: 1px solid var(--border2);
          border-radius: 4px;
          color: var(--fg);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--bg2)',
  border: '1px solid var(--border2)',
  borderRadius: '4px',
  color: 'var(--fg)',
  fontSize: '1rem',
  outline: 'none'
};
