import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getToolsByCategory, Category } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

const CATEGORY_MAP: Record<string, Category> = {
  "writing": "Writing",
  "image-generation": "Image Generation",
  "video": "Video",
  "seo": "SEO",
  "coding": "Coding",
  "productivity": "Productivity",
};

const CATEGORY_DESCRIPTION: Record<Category, string> = {
  "Writing": "From heavyweight LLMs to focused marketing copywriters — these are the tools top writers and content teams rely on.",
  "Image Generation": "Text-to-image tools that ship production-quality visuals. Reviewed for creative control, prompt adherence, and output quality.",
  "Video": "The platforms pushing AI video generation forward — generation quality, editing, and motion control.",
  "SEO": "AI-powered SEO tools that go beyond keyword stuffing. Data-driven optimization that actually moves rankings.",
  "Coding": "AI coding assistants that know your codebase, not just autocomplete. Ranked by real-world developer workflows.",
  "Productivity": "Automation and AI tools for people who build systems, not just use them.",
};

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = CATEGORY_MAP[slug ?? ""];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Category not found.</p>
        <Link href="/tools" className="text-primary hover:underline text-sm">Browse all tools</Link>
      </div>
    );
  }

  const categoryTools = getToolsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors" data-testid="link-back-tools">
        <ArrowLeft className="w-4 h-4" />
        All tools
      </Link>

      {/* Header */}
      <div className="mb-8 pb-8 border-b border-border">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">{category}</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          {CATEGORY_DESCRIPTION[category]}
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"} reviewed
        </p>
      </div>

      {/* Tools ranked list */}
      <div>
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 mb-2 text-xs text-muted-foreground uppercase tracking-widest">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Tool</div>
          <div className="col-span-2">Rating</div>
          <div className="col-span-2">Pricing</div>
          <div className="col-span-2"></div>
        </div>

        <div className="bg-card border border-card-border rounded-sm overflow-hidden">
          {categoryTools
            .sort((a, b) => b.rating - a.rating)
            .map((tool, index) => {
              const Icon = tool.logo;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="grid grid-cols-12 gap-4 items-center px-4 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  data-testid={`row-tool-${tool.id}`}
                >
                  {/* Rank */}
                  <div className="col-span-1 text-lg font-serif text-muted-foreground/40 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Name + Tagline */}
                  <div className="col-span-7 md:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 flex-shrink-0 rounded bg-muted flex items-center justify-center text-muted-foreground">
                      {Icon ? <Icon className="w-4 h-4" /> : (
                        <span className="text-xs font-bold">{tool.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        data-testid={`link-tool-${tool.id}`}
                      >
                        {tool.name}
                      </Link>
                      <p className="text-xs text-muted-foreground hidden sm:block">{tool.tagline}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="hidden md:flex col-span-2 items-center gap-1.5 text-sm">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="font-medium">{tool.rating}</span>
                  </div>

                  {/* Pricing */}
                  <div className="hidden md:block col-span-2 text-xs text-muted-foreground">
                    {tool.pricing.priceString}
                  </div>

                  {/* CTA */}
                  <div className="col-span-4 md:col-span-2 flex justify-end">
                    <a
                      href={tool.affiliateUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded hover:opacity-90 transition-opacity"
                      rel="nofollow sponsored noopener noreferrer"
                      target="_blank"
                      data-testid={`link-cta-${tool.id}`}
                    >
                      Try it
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center border border-border rounded-sm bg-muted/30 py-10 px-6">
        <h3 className="font-serif text-xl text-foreground mb-2">Missing a tool?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We're always expanding the directory. Browse all {" "}
          <Link href="/tools" className="text-primary hover:underline">AI tools</Link> or check another category.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {Object.values(CATEGORY_MAP)
            .filter((c) => c !== category)
            .map((c) => (
              <Link
                key={c}
                href={`/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded transition-colors"
              >
                {c}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
