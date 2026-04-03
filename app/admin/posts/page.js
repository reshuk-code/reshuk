import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;
  
  const [email, token, expires] = session.value.split(':');
  
  if (Date.now() > parseInt(expires)) return null;
  
  return { email, token };
}

async function getPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPostsPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  const posts = await getPosts();

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 className="display" style={{ fontSize: '2rem', marginBottom: '8px' }}>
              Manage Posts
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} total
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/admin" className="btn-outline">← Dashboard</a>
            <a href="/admin/new" className="btn-primary">+ New Post</a>
          </div>
        </div>

        {posts.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>No posts yet</p>
            <a href="/admin/new" className="btn-primary">Create your first post</a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {posts.map((post) => (
              <div key={post.id} style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                padding: '16px 20px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '6px'
              }}>
                {post.cover && (
                  <div style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img
                      src={post.cover}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
                    {new Date(post.date).toLocaleDateString()} • {post.published ? 'Published' : 'Draft'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <a href={`/blog/${post.slug}`} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                    View
                  </a>
                  <a href={`/admin/edit/${post.id}`} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                    Edit
                  </a>
                  <DeleteButton postId={post.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

async function DeleteButton({ postId }) {
  async function deletePost() {
    'use server';
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/blog/${postId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      redirect('/admin/posts');
    }
  }

  return (
    <form action={deletePost}>
      <button type="submit" className="btn-outline" style={{ 
        padding: '8px 16px', 
        fontSize: '0.75rem',
        borderColor: '#ff6b6b',
        color: '#ff6b6b'
      }}>
        Delete
      </button>
    </form>
  );
}
