import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, timestamp, page } = body as {
      message?: string;
      timestamp?: string;
      page?: string;
    };

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ error: 'Message too short' }, { status: 400 });
    }

    // ─── Telegram notification (optional) ────────────────────────────────────
    // Set env vars TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Cloudflare dashboard
    // to receive every feedback message as a Telegram DM.
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text =
        `📬 *New Portfolio Feedback*\n\n` +
        `> ${message.trim().replace(/`/g, "'")}\n\n` +
        `🕐 ${timestamp ?? 'unknown'}\n` +
        `🔗 ${page ?? 'unknown'}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      });
    }

    // ─── Email via Resend (optional) ─────────────────────────────────────────
    // Set env vars RESEND_API_KEY and FEEDBACK_EMAIL_TO in Cloudflare dashboard.
    const resendKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.FEEDBACK_EMAIL_TO;

    if (resendKey && emailTo) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Feedback <onboarding@resend.dev>',
          to: emailTo,
          subject: '📬 New Portfolio Feedback',
          html: `<p><strong>Message:</strong><br>${message.trim()}</p>
                 <p><strong>Time:</strong> ${timestamp ?? 'unknown'}</p>
                 <p><strong>Page:</strong> ${page ?? 'unknown'}</p>`,
        }),
      });
    }

    // ─── Log to Cloudflare console (always works, free) ───────────────────────
    console.log('[feedback]', JSON.stringify({ message: message.trim(), timestamp, page }));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[feedback error]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
