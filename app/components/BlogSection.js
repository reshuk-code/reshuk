import Link from 'next/link';

export default function BlogSection({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" style={{
      padding: '80px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div className="section-num">
        <span>04</span> Latest Posts
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <span className="text-gradient">From the</span> Blog
        </h2>
        <Link href="/blog" className="btn-outline">
          View all →
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="project-card"
            style={{
              display: 'block',
              background: 'var(--card)',
              borderRadius: '6px',
              overflow: 'hidden',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {post.cover && (
              <div style={{ height: '180px', overflow: 'hidden' }}>
                <img
                  src={post.cover}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <div style={{ padding: '20px' }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                marginBottom: '10px',
                letterSpacing: '0.1em'
              }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '8px'
              }}>
                {post.title}
              </h3>
              <p style={{
                color: 'var(--muted)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
