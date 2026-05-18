import { Link } from "wouter";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { Tool } from "@/data/tools";

const CATEGORY_COLORS: Record<string, string> = {
  "Writing": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Image Generation": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Video": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "SEO": "bg-green-500/10 text-green-400 border-green-500/20",
  "Coding": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Productivity": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  "Writing": "bg-blue-50 text-blue-700 border-blue-200",
  "Image Generation": "bg-purple-50 text-purple-700 border-purple-200",
  "Video": "bg-rose-50 text-rose-700 border-rose-200",
  "SEO": "bg-green-50 text-green-700 border-green-200",
  "Coding": "bg-amber-50 text-amber-700 border-amber-200",
  "Productivity": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function getCategoryClass(category: string) {
  return CATEGORY_COLORS[category] || "bg-muted text-muted-foreground border-border";
}

function getPricingLabel(tool: Tool) {
  if (tool.pricing.model === "Free") return "Try Free";
  if (tool.pricing.model === "Freemium") return "Try Free";
  return "Get Deal";
}

export function ToolCard({ tool, compact = false }: { tool: Tool; compact?: boolean }) {
  const Icon = tool.logo;

  if (compact) {
    return (
      <div
        className="group flex items-center gap-4 px-4 py-3 border-b border-border hover:bg-muted/40 transition-colors cursor-pointer"
        data-testid={`card-tool-${tool.id}`}
      >
        {/* Logo */}
        <div className="w-8 h-8 flex-shrink-0 rounded bg-muted flex items-center justify-center text-muted-foreground">
          {Icon ? <Icon className="w-4 h-4" /> : (
            <span className="text-xs font-bold">{tool.name.charAt(0)}</span>
          )}
        </div>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {tool.name}
          </Link>
          <p className="text-xs text-muted-foreground truncate">{tool.tagline}</p>
        </div>

        {/* Category */}
        <span className={`hidden sm:inline-flex text-xs px-2 py-0.5 rounded border ${getCategoryClass(tool.category)}`}>
          {tool.category}
        </span>

        {/* Rating */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span>{tool.rating}</span>
        </div>

        {/* Pricing */}
        <span className="text-xs text-muted-foreground whitespace-nowrap hidden lg:block">{tool.pricing.priceString}</span>

        {/* CTA */}
        <a
          href={tool.affiliateUrl}
          className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:opacity-90 transition-opacity"
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
          data-testid={`link-try-${tool.id}`}
        >
          {getPricingLabel(tool)}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-card border border-card-border rounded-sm hover:border-primary/30 transition-all duration-200 flex flex-col"
      data-testid={`card-tool-${tool.id}`}
    >
      <div className="p-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-9 h-9 flex-shrink-0 rounded bg-muted/60 border border-border flex items-center justify-center text-muted-foreground">
            {Icon ? <Icon className="w-4.5 h-4.5" /> : (
              <span className="text-sm font-bold">{tool.name.charAt(0)}</span>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryClass(tool.category)}`}>
            {tool.category}
          </span>
        </div>

        {/* Name */}
        <Link href={`/tools/${tool.slug}`} className="block mb-1 hover:text-primary transition-colors">
          <h3 className="font-sans font-semibold text-base text-foreground">{tool.name}</h3>
        </Link>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{tool.tagline}</p>

        {/* Rating + Pricing */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="font-medium text-foreground">{tool.rating}</span>
          </div>
          <span className="text-border">|</span>
          <span>{tool.pricing.priceString}</span>
          <span className="text-border">|</span>
          <span
            className={`px-1.5 py-0.5 rounded text-xs ${
              tool.pricing.model === "Free" ? "text-green-400 bg-green-500/10" :
              tool.pricing.model === "Freemium" ? "text-amber-400 bg-amber-500/10" :
              "text-blue-400 bg-blue-500/10"
            }`}
          >
            {tool.pricing.model}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-4 flex items-center justify-between gap-2 border-t border-card-border pt-3 mt-1">
        <Link
          href={`/tools/${tool.slug}`}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          data-testid={`link-detail-${tool.id}`}
        >
          View details
          <ArrowUpRight className="w-3 h-3" />
        </Link>
        <a
          href={tool.affiliateUrl}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3.5 py-1.5 rounded hover:opacity-90 transition-opacity"
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
          data-testid={`link-try-${tool.id}`}
        >
          {getPricingLabel(tool)}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export { getCategoryClass, CATEGORY_COLORS };
