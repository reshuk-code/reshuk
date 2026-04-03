import { Resend } from 'resend';
import { createHmac, randomBytes } from 'crypto';
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const AUTH_SECRET = process.env.AUTH_SECRET;

function generateToken(email) {
  const token = randomBytes(32).toString('hex');
  const expires = Date.now() + 15 * 60 * 1000;
  const signature = createHmac('sha256', AUTH_SECRET)
    .update(`${email}:${token}:${expires}`)
    .digest('hex');
  return { token, expires, signature };
}

function verifyToken(email, token, expires, signature) {
  if (Date.now() > parseInt(expires)) return false;
  const expected = createHmac('sha256', AUTH_SECRET)
    .update(`${email}:${token}:${expires}`)
    .digest('hex');
  return signature === expected;
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { token, expires, signature } = generateToken(email);
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const loginUrl = `${baseUrl}/api/auth/verify-magic-link?email=${encodeURIComponent(email)}&token=${token}&expires=${expires}&sig=${signature}`;

    console.log('Sending email to:', email);
    console.log('Login URL:', loginUrl);

    const { data, error } = await resend.emails.send({
      from: 'Reshuk Blog <onboarding@resend.dev>',
      to: email,
      subject: 'Your login link for Reshuk Blog',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; margin-bottom: 24px;">Login to Reshuk Blog</h1>
          <p style="color: #666; margin-bottom: 24px;">Click the button below to sign in to your admin dashboard:</p>
          <a href="${loginUrl}" style="display: inline-block; padding: 14px 28px; background: #e8ff47; color: #060608; text-decoration: none; border-radius: 4px; font-weight: 600;">Sign In</a>
          <p style="color: #999; font-size: 14px; margin-top: 24px;">This link expires in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    console.log('Email sent:', data);
    return Response.json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Magic link error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
