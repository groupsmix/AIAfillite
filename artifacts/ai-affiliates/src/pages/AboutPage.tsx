import { Link } from "wouter";
import { ArrowLeft, Zap } from "lucide-react";

export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <h1 className="font-serif text-3xl text-foreground">About AIStack</h1>
      </div>
      <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
        <p>
          AIStack is a curated directory of AI tools for people who take AI seriously. We exist because most AI directories are bloated, biased, or both.
        </p>
        <p>
          We don't list every tool that was ever built. We list the tools that are genuinely worth your time and money — evaluated for real-world use, not press releases.
        </p>
        <p>
          Every tool on this site has been evaluated for quality, value, and actual utility. Our ratings reflect honest assessments, not affiliate potential.
        </p>
        <p className="text-xs pt-4 border-t border-border">
          We earn commissions from some links on this site. See our{" "}
          <Link href="/affiliate-disclosure" className="text-primary hover:underline">affiliate disclosure</Link>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}
