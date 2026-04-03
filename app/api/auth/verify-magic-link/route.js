import { createHmac, randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const AUTH_SECRET = process.env.AUTH_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

function verifyToken(email, token, expires, signature) {
  if (Date.now() > parseInt(expires)) return false;
  const expected = createHmac('sha256', AUTH_SECRET)
    .update(`${email}:${token}:${expires}`)
    .digest('hex');
  return signature === expected;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const expires = searchParams.get('expires');
  const sig = searchParams.get('sig');

  const url = new URL(request.url);
  const origin = url.origin;

  if (!email || !token || !expires || !sig) {
    return NextResponse.redirect(new URL('/login?error=invalid', origin));
  }

  if (!verifyToken(email, token, expires, sig)) {
    return NextResponse.redirect(new URL('/login?error=invalid', origin));
  }

  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.redirect(new URL('/login?error=unauthorized', origin));
  }

  const sessionToken = randomBytes(32).toString('hex');
  const sessionExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;

  const cookieStore = await cookies();
  cookieStore.set('session', `${email}:${sessionToken}:${sessionExpiry}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return NextResponse.redirect(new URL('/admin', origin));
}
