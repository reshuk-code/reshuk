import db from './db';

/**
 * Reads the session_id cookie and validates it against the DB.
 * For use in Server Components and Server Actions only (uses next/headers).
 * Returns { email } if valid, or null if not authenticated.
 */
export async function getSession() {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (!sessionId) return null;

    const session = await db.session.findUnique({
      where: { token: sessionId },
    });

    if (!session) return null;

    if (new Date() > session.expiresAt) {
      await db.session.delete({ where: { token: sessionId } }).catch(() => {});
      return null;
    }

    return { email: session.email };
  } catch {
    return null;
  }
}
