import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseOrNull } from '@/lib/supabase';

export const runtime = 'edge';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(3000),
  website: z.string().optional()
});

function clean(value: string) {
  return value.replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true }); // honeypot

    const supabase = getSupabaseOrNull();
    if (supabase) {
      const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || null;
      const { error } = await supabase.from('contact_messages').insert({
        name: clean(parsed.data.name),
        email: clean(parsed.data.email),
        message: clean(parsed.data.message),
        ip_address: ip
      });
      if (error) return NextResponse.json({ error: 'Could not save message.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }
}
