import Link from 'next/link';

async function getPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
  if (!res.ok) return [];
  const posts = await res.json();
  return posts.filter(p => p.published);
}

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights from Reshuk Sapkota',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '80px' }}>
        <Link href="/" className="btn-outline" style={{ marginBottom: '40px', display: 'inline-flex' }}>
          ← Back
        </Link>

        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '16px' }}>
          Blog
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: '48px', fontSize: '1.1rem' }}>
          Thoughts, tutorials, and insights
        </p>

        {posts.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}>
            <p style={{ color: 'var(--muted)' }}>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.2s, transform 0.2s'
                }}
              >
                {post.cover && (
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={post.cover}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent)',
                    marginBottom: '12px',
                    letterSpacing: '0.1em'
                  }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                    {post.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
