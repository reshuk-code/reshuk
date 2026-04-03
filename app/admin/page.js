import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function verifySession() {
  return true;
}

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;
  
  const [email, token, expires] = session.value.split(':');
  
  if (Date.now() > parseInt(expires)) return null;
  
  return { email, token };
}

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div>
            <h1 className="display" style={{ fontSize: '2rem', marginBottom: '8px' }}>
              Blog Admin
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Logged in as {session.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/" className="btn-outline">← Back to Site</Link>
            <Link href="/api/auth/logout" className="btn-outline" style={{ borderColor: '#ff6b6b', color: '#ff6b6b' }}>
              Logout
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <AdminCard
            title="Create New Post"
            description="Write a new blog post"
            href="/admin/new"
            icon="+"
          />
          <AdminCard
            title="Manage Posts"
            description="Edit or delete existing posts"
            href="/admin/posts"
            icon="☰"
          />
          <AdminCard
            title="View Blog"
            description="See all published posts"
            href="/blog"
            icon="→"
          />
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, description, href, icon }) {
  return (
    <Link href={href} style={{
      display: 'block',
      padding: '32px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'border-color 0.2s, transform 0.2s'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: 'rgba(232,255,71,0.1)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: 'var(--accent)',
        marginBottom: '16px'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{description}</p>
    </Link>
  );
}
