import { NextResponse } from 'next/server';
import { getSupabaseOrNull } from '@/lib/supabase';
import { siteUrl } from '@/lib/env';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabaseOrNull();
  if (!supabase) return NextResponse.redirect(new URL('/tools', siteUrl), 302);

  const { data: product } = await supabase
    .from('products')
    .select('id, affiliate_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!product?.affiliate_url) return NextResponse.redirect(new URL('/tools', siteUrl), 302);

  await supabase.from('affiliate_clicks').insert({
    product_id: product.id,
    referrer: request.headers.get('referer'),
    user_agent: request.headers.get('user-agent')
  });

  return NextResponse.redirect(product.affiliate_url, 302);
}
