import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
  if (!res.ok) return null;
  
  const posts = await res.json();
  return posts.find(p => p.slug === slug && p.published);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + '...',
      type: 'article',
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', paddingTop: '80px' }}>
        <Link href="/blog" className="btn-outline" style={{ marginBottom: '40px', display: 'inline-flex' }}>
          ← All Posts
        </Link>

        <article>
          <header style={{ marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              marginBottom: '16px',
              letterSpacing: '0.1em'
            }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <h1 className="display" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', lineHeight: 1.1 }}>
              {post.title}
            </h1>
          </header>

          {post.cover && (
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '48px',
              border: '1px solid var(--border)'
            }}>
              <img
                src={post.cover}
                alt={post.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          <div
            className="blog-content"
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--fg)'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid var(--border)'
        }}>
          <Link href="/blog" className="btn-outline">
            ← Back to Blog
          </Link>
        </div>
      </div>

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          font-family: var(--font-display);
          margin: 2rem 0 1rem;
          line-height: 1.2;
        }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content a { color: var(--accent); }
        .blog-content code {
          font-family: var(--font-mono);
          background: var(--card);
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .blog-content pre {
          background: var(--card);
          padding: 20px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-content pre code {
          background: none;
          padding: 0;
        }
        .blog-content img {
          max-width: 100%;
          border-radius: 6px;
          margin: 2rem 0;
        }
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          color: var(--muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
