import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const GITHUB = "https://github.com/reshuk-code";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Notify Reshuk
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "reshuksapkota@gmail.com",
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: monospace; background: #080808; color: #f0ede6; padding: 32px; border-radius: 8px; max-width: 560px;">
          <div style="color: #e8ff47; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px;">
            ◆ New Contact from Portfolio
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888070; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; width: 80px;">Name</td>
              <td style="padding: 10px 0; color: #f0ede6; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888070; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
              <td style="padding: 10px 0; color: #e8ff47; font-size: 14px;"><a href="mailto:${email}" style="color: #e8ff47; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888070; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #f0ede6; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #242420; color: #888070; font-size: 11px;">
            Sent from reshuksapkota.dev portfolio
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: "Reshuk Sapkota <onboarding@resend.dev>",
      to: email,
      subject: "Got your message — Reshuk Sapkota",
      html: `
        <div style="font-family: monospace; background: #080808; color: #f0ede6; padding: 32px; border-radius: 8px; max-width: 560px;">
          <div style="color: #e8ff47; font-size: 24px; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 16px;">
            Hey ${name} 👋
          </div>
          <p style="color: #f0ede6; font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
            Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within 24–48 hours.
          </p>
          <p style="color: #888070; font-size: 13px; line-height: 1.7; margin-bottom: 24px;">
            In the meantime, feel free to check out my projects on
            <a href="${GITHUB}" style="color: #e8ff47; text-decoration: none;">GitHub</a>.
          </p>
          <div style="padding: 16px 20px; background: #111110; border: 1px solid #242420; border-radius: 6px; border-left: 3px solid #e8ff47; margin-bottom: 24px;">
            <div style="color: #888070; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Your message</div>
            <div style="color: #f0ede6; font-size: 13px; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</div>
          </div>
          <div style="color: #888070; font-size: 12px;">
            — Reshuk Sapkota<br/>
            <a href="mailto:reshuksapkota@gmail.com" style="color: #e8ff47; text-decoration: none;">reshuksapkota@gmail.com</a>
            &nbsp;·&nbsp;
            <a href="${GITHUB}" style="color: #e8ff47; text-decoration: none;">GitHub</a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
