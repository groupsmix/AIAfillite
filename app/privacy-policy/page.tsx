import { makeMetadata } from '@/lib/seo';

export const metadata = makeMetadata({ title: 'Privacy Policy', description: 'CompareAI privacy policy.', path: '/privacy-policy' });

export default function PrivacyPolicyPage() {
  return <section className="container section"><div className="grid-12"><article className="prose-lite col-span-4 md:col-span-8 lg:col-span-7"><p className="eyebrow">Legal</p><h1 className="h1 mt-6">Privacy Policy</h1><p>CompareAI collects only the information needed to operate this website, such as contact form submissions and basic affiliate click analytics.</p><h2>Information we collect</h2><p>If you contact us, we may collect your name, email address, and message. Affiliate click tracking may store timestamp, referrer, and browser user-agent for analytics and fraud prevention.</p><h2>Cookies and analytics</h2><p>We may use privacy-friendly analytics or standard web analytics in the future. Affiliate partners may use cookies after you leave CompareAI.</p><h2>Contact</h2><p>For privacy questions, use the contact page.</p></article></div></section>;
}
