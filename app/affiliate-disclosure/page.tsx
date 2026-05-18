import { makeMetadata } from '@/lib/seo';

export const metadata = makeMetadata({ title: 'Affiliate Disclosure', description: 'CompareAI affiliate disclosure.', path: '/affiliate-disclosure' });

export default function AffiliateDisclosurePage() {
  return <section className="container section"><div className="grid-12"><article className="prose-lite col-span-4 md:col-span-8 lg:col-span-7"><p className="eyebrow">Transparency</p><h1 className="h1 mt-6">Affiliate Disclosure</h1><p>Some links on CompareAI are affiliate links. This means we may earn a commission if you click a link and make a purchase, at no extra cost to you.</p><p>Affiliate commissions help support the site and allow us to publish comparisons, reviews, and guides. We aim to keep content useful and transparent, but you should always verify pricing, terms, and product details on the official provider website before purchasing.</p></article></div></section>;
}
