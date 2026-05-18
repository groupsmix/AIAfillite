import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Zap, ExternalLink, ArrowLeft } from "lucide-react";
import { getToolBySlug } from "@/data/tools";

export function GoRedirectPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug ?? "");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!tool) return;

    // Track click in localStorage
    try {
      const key = "aistack_clicks";
      const existing = JSON.parse(localStorage.getItem(key) || "{}");
      existing[tool.slug] = (existing[tool.slug] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (_) {}

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = tool.website;
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Tool not found.</p>
          <Link href="/tools" className="text-primary hover:underline text-sm">Back to tools</Link>
        </div>
      </div>
    );
  }

  const Icon = tool.logo;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        {/* Logo */}
        <div className="w-16 h-16 rounded-xl bg-card border border-card-border flex items-center justify-center text-muted-foreground mx-auto mb-6">
          {Icon ? <Icon className="w-8 h-8" /> : (
            <Zap className="w-8 h-8 text-primary" />
          )}
        </div>

        <h1 className="font-serif text-2xl text-foreground mb-2">
          Redirecting to {tool.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Taking you to{" "}
          <span className="text-foreground font-medium">{tool.website.replace("https://", "")}</span>{" "}
          in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          />
        </div>

        <a
          href={tool.website}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded text-sm hover:opacity-90 transition-opacity mb-4"
          rel="nofollow sponsored noopener noreferrer"
          data-testid="button-continue"
        >
          Continue to {tool.name}
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="mt-4">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-tool"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to {tool.name} review
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-8 leading-relaxed border-t border-border pt-4">
          This is an affiliate link. AIStack may earn a commission if you sign up for {tool.name}
          , at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
