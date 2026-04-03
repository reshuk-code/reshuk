import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;
  
  const [email, token, expires] = session.value.split(':');
  
  if (Date.now() > parseInt(expires)) return null;
  
  return { email, token };
}

export default async function LoginPage() {
  const session = await getSession();
  
  if (session) {
    redirect('/admin');
  }

  return <LoginForm />;
}
