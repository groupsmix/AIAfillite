import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';
import type { Product } from '@/lib/types';

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  return (
    <article className="card flex h-full min-h-[520px] flex-col p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#e5e7eb] pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">{rank ? `Rank ${String(rank).padStart(2, '0')}` : 'Tool'}</p>
          <h2 className="mt-3 text-left text-2xl font-black tracking-[-0.035em] text-[#000000]">
            <Link href={`/tools/${product.slug}`} className="hover:text-[#2563eb]">{product.name}</Link>
          </h2>
        </div>
        {product.featured && <span className="badge">Top choice</span>}
      </div>

      <Link href={`/tools/${product.slug}`} className="mt-6 block">
        <div className="grid aspect-[16/9] place-items-center overflow-hidden border border-[#e5e7eb] bg-[#f3f4f6]">
          {product.image_url ? (
            <Image src={product.image_url} alt={`${product.name} logo`} width={640} height={360} className="h-full w-full object-cover grayscale" />
          ) : (
            <span className="text-5xl font-black tracking-[-0.06em] text-[#111827]">{product.name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="badge-muted">{product.category?.name || 'AI Tool'}</span>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#111827]">
          <Star className="h-4 w-4 text-[#111827]" strokeWidth={1.75} /> {product.rating || 'N/A'} / 5
        </span>
      </div>

      <p className="mt-5 flex-1 text-left text-sm leading-7 text-[#4b5563]">{product.short_description}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#e5e7eb] pt-5">
        <Link href={`/tools/${product.slug}`} className="btn-secondary !px-3 !py-3">Review</Link>
        <a href={`/go/${product.slug}`} target="_blank" rel="nofollow sponsored noopener noreferrer" className="btn-primary gap-2 !px-3 !py-3">
          Deal <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </a>
      </div>
    </article>
  );
}
