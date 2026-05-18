import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, Check, X, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      <span className="text-xs font-medium text-foreground w-6">{value}</span>
    </div>
  );
}

export function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug ?? "");

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Tool not found.</p>
        <Link href="/tools" className="text-primary hover:underline text-sm">Browse all tools</Link>
      </div>
    );
  }

  const Icon = tool.logo;
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href={`/category/${tool.category.toLowerCase().replace(/\s+/g, "-")}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        data-testid="link-back-category"
      >
        <ArrowLeft className="w-4 h-4" />
        {tool.category}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 flex-shrink-0 rounded bg-muted border border-border flex items-center justify-center text-muted-foreground">
                {Icon ? <Icon className="w-6 h-6" /> : (
                  <span className="text-lg font-bold">{tool.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h1 className="font-serif text-3xl text-foreground">{tool.name}</h1>
                <p className="text-muted-foreground text-sm mt-0.5">{tool.tagline}</p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{tool.rating}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
              <span className="text-border">|</span>
              <span className="text-muted-foreground">{tool.pricing.priceString}</span>
              <span className="text-border">|</span>
              <span className={`text-xs px-2 py-0.5 rounded border ${
                tool.pricing.model === "Free" ? "text-green-400 bg-green-500/10 border-green-500/20" :
                tool.pricing.model === "Freemium" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
                "text-blue-400 bg-blue-500/10 border-blue-500/20"
              }`}>
                {tool.pricing.model}
              </span>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                {tool.website.replace("https://", "")}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-3">Overview</h2>
            <p className="text-foreground/90 leading-relaxed text-base">{tool.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-3">Key features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <Zap className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-3">What we like</h2>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-3">Worth knowing</h2>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                    <X className="w-3.5 h-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rating breakdown */}
          <div>
            <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">Rating breakdown</h2>
            <div className="space-y-3 max-w-sm">
              <RatingBar label="Ease of use" value={Math.min(5, tool.rating - 0.1)} />
              <RatingBar label="Value for money" value={Math.min(5, tool.rating - 0.2)} />
              <RatingBar label="Feature depth" value={Math.min(5, tool.rating + 0.1 > 5 ? 4.8 : tool.rating + 0.1)} />
              <RatingBar label="Overall" value={tool.rating} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CTA card */}
          <div className="bg-card border border-card-border rounded-sm p-6 sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-muted border border-border flex items-center justify-center text-muted-foreground flex-shrink-0">
                {Icon ? <Icon className="w-5 h-5" /> : (
                  <span className="font-bold">{tool.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{tool.name}</p>
                <p className="text-xs text-muted-foreground">{tool.pricing.priceString}</p>
              </div>
            </div>

            <a
              href={tool.affiliateUrl}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-3 rounded text-sm hover:opacity-90 transition-opacity mb-3"
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
              data-testid="button-cta-main"
            >
              {tool.pricing.model === "Free" ? "Try for Free" :
               tool.pricing.model === "Freemium" ? "Start for Free" :
               "Get Deal"}
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 border border-border text-muted-foreground font-medium px-4 py-2.5 rounded text-sm hover:text-foreground hover:border-foreground/30 transition-colors"
              data-testid="button-visit-site"
            >
              Visit website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              Affiliate link — we may earn a commission at no extra cost to you.
            </p>
          </div>

          {/* Quick facts */}
          <div className="bg-card border border-card-border rounded-sm p-5">
            <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-4">Quick facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="text-foreground font-medium">{tool.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pricing model</span>
                <span className="text-foreground font-medium">{tool.pricing.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Starting price</span>
                <span className="text-foreground font-medium">{tool.pricing.priceString}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Our rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="text-foreground font-medium">{tool.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related tools */}
      {related.length > 0 && (
        <div className="mt-14 border-t border-border pt-10">
          <h2 className="font-serif text-xl text-foreground mb-5">
            More {tool.category} tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
