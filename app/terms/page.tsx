import { makeMetadata } from '@/lib/seo';

export const metadata = makeMetadata({ title: 'Terms of Use', description: 'CompareAI terms of use.', path: '/terms' });

export default function TermsPage() {
  return <section className="container section"><div className="grid-12"><article className="prose-lite col-span-4 md:col-span-8 lg:col-span-7"><p className="eyebrow">Legal</p><h1 className="h1 mt-6">Terms of Use</h1><p>By using CompareAI, you agree to use the site for lawful purposes and understand that content is provided for informational purposes only.</p><h2>No professional advice</h2><p>Product information, pricing, and features can change. Always verify details on the official website before buying.</p><h2>Affiliate links</h2><p>Some outbound links may be affiliate links. We may earn a commission at no extra cost to you.</p><h2>Limitation of liability</h2><p>CompareAI is not responsible for third-party products, websites, or services linked from this website.</p></article></div></section>;
}
