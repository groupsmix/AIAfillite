import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function AffiliateDisclosurePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      <h1 className="font-serif text-3xl text-foreground mb-6">Affiliate Disclosure</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
        <p>
          AIStack participates in various affiliate programs, which means we may earn a commission when you click on links to products and services on this website and make a purchase or sign up.
        </p>
        <p>
          These commissions help us maintain and grow AIStack — allowing us to continue researching, reviewing, and curating AI tools for our readers at no cost to you.
        </p>
        <p>
          <strong className="text-foreground">Our editorial independence is non-negotiable.</strong> We are never paid to recommend a tool, and commissions do not influence our ratings, rankings, or reviews. Tools are evaluated on their actual merit.
        </p>
        <p>
          Affiliate links are marked with a disclosure notice where possible. When you click a "Try Free", "Get Deal", or "Start Free Trial" button, you may be redirected through our tracking system before arriving at the vendor's website.
        </p>
        <p>
          If you have any questions about our affiliate relationships, please contact us.
        </p>
        <p className="text-xs pt-4 border-t border-border">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
