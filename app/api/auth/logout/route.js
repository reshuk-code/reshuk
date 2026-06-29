import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (sessionId) {
      // Delete session from DB
      await db.session.deleteMany({
        where: { token: sessionId },
      });
    }
  } catch {
    // Always clear the cookie even if DB call fails
  }

  const response = NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_URL || 'http://localhost:3000')
  );
  response.cookies.set('session_id', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
