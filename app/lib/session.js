import db from './db';

/**
 * Validates the session from a Request object.
 * Safe to import in any API route — no next/headers dependency.
 * Returns { email } if the session is valid, or null.
 */
export async function getSessionFromRequest(request) {
  try {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const sessionId = cookieHeader
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('session_id='))
      ?.split('=')[1];

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
