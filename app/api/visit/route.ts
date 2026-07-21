import { NextRequest, NextResponse } from 'next/server';

let inMemoryCount = 1420;

async function getKV(): Promise<any | null> {
  try {
    const { env } = (globalThis as any).__cloudflare_context__ || {};
    if (env?.VISIT_COUNTER) return env.VISIT_COUNTER;
  } catch {}

  try {
    const cf = await import('@opennextjs/cloudflare');
    if (cf?.getCloudflareContext) {
      const ctx = await cf.getCloudflareContext();
      if ((ctx?.env as any)?.VISIT_COUNTER) return (ctx.env as any).VISIT_COUNTER;
    }
  } catch {}

  if ((process.env as any).VISIT_COUNTER) {
    return (process.env as any).VISIT_COUNTER;
  }

  return null;
}

export async function GET() {
  try {
    const kv = await getKV();
    if (kv) {
      const val = await kv.get('total_visits');
      const count = val ? parseInt(val, 10) : 1420;
      return NextResponse.json({ count }, { status: 200 });
    }
    return NextResponse.json({ count: inMemoryCount }, { status: 200 });
  } catch {
    return NextResponse.json({ count: inMemoryCount }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body as { action?: string };
    const kv = await getKV();

    if (kv) {
      const val = await kv.get('total_visits');
      let count = val ? parseInt(val, 10) : 1420;

      if (action === 'increment') {
        count += 1;
        await kv.put('total_visits', count.toString());
      }
      return NextResponse.json({ count }, { status: 200 });
    }

    if (action === 'increment') {
      inMemoryCount += 1;
    }
    return NextResponse.json({ count: inMemoryCount }, { status: 200 });
  } catch {
    return NextResponse.json({ count: inMemoryCount }, { status: 200 });
  }
}
