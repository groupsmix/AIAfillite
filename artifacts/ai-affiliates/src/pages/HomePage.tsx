import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { tools, getFeaturedTools, getNewAndNotable, getCategories, Category } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

const CATEGORY_META: Record<Category, { emoji: string; desc: string }> = {
  "Writing": { emoji: "✍", desc: "LLMs, copywriters, and long-form assistants" },
  "Image Generation": { emoji: "🖼", desc: "Text-to-image and generative art tools" },
  "Video": { emoji: "🎬", desc: "AI video generation and editing platforms" },
  "SEO": { emoji: "📈", desc: "Content optimization and keyword intelligence" },
  "Coding": { emoji: "💻", desc: "AI pair programmers and IDE assistants" },
  "Productivity": { emoji: "⚡", desc: "Automation, notes, and workflow tools" },
};

const CATEGORY_GRADIENT: Record<Category, string> = {
  "Writing": "from-blue-600/20 to-blue-600/5",
  "Image Generation": "from-purple-600/20 to-purple-600/5",
  "Video": "from-rose-600/20 to-rose-600/5",
  "SEO": "from-green-600/20 to-green-600/5",
  "Coding": "from-amber-600/20 to-amber-600/5",
  "Productivity": "from-cyan-600/20 to-cyan-600/5",
};

const CATEGORY_TEXT: Record<Category, string> = {
  "Writing": "text-blue-400",
  "Image Generation": "text-purple-400",
  "Video": "text-rose-400",
  "SEO": "text-green-400",
  "Coding": "text-amber-400",
  "Productivity": "text-cyan-400",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

export function HomePage() {
  const featured = getFeaturedTools();
  const newNotable = getNewAndNotable();
  const categories = getCategories() as Category[];

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-widest border border-primary/30 bg-primary/5 px-3 py-1 rounded mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              {tools.length} curated AI tools
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-5">
              The right AI tool<br />
              <span className="text-primary">for every job.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              A no-nonsense directory of the AI tools that actually work. Curated, categorized, and honest — so you stop wasting time and start shipping.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded text-sm hover:opacity-90 transition-opacity"
                data-testid="button-browse-all"
              >
                Browse all tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/category/coding"
                className="inline-flex items-center gap-2 bg-muted text-foreground font-medium px-5 py-2.5 rounded text-sm hover:bg-muted/80 transition-colors border border-border"
                data-testid="button-explore-coding"
              >
                Top coding tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category grid */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans font-semibold text-sm uppercase tracking-widest text-muted-foreground">
              Browse by category
            </h2>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const slug = cat.toLowerCase().replace(/\s+/g, "-");
              return (
                <motion.div key={cat} variants={item}>
                  <Link
                    href={`/category/${slug}`}
                    className={`group flex flex-col gap-2 p-4 rounded border border-border bg-gradient-to-b ${CATEGORY_GRADIENT[cat]} hover:border-primary/30 transition-all duration-200`}
                    data-testid={`card-category-${slug}`}
                  >
                    <span className="text-xl">{meta.emoji}</span>
                    <div>
                      <p className={`text-sm font-semibold ${CATEGORY_TEXT[cat]}`}>{cat}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed hidden sm:block">{meta.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>Explore</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-foreground">Editor's picks</h2>
              <p className="text-sm text-muted-foreground mt-1">The tools we'd actually pay for.</p>
            </div>
            <Link
              href="/tools"
              className="text-sm text-primary hover:underline flex items-center gap-1"
              data-testid="link-all-tools"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featured.map((tool) => (
              <motion.div key={tool.id} variants={item}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New & Notable */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-foreground">New & notable</h2>
              <p className="text-sm text-muted-foreground mt-1">What's worth your attention right now.</p>
            </div>
          </div>
          <div className="bg-card border border-card-border rounded-sm overflow-hidden">
            {newNotable.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ToolCard tool={tool} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: `${tools.length}+`, label: "Curated tools" },
              { value: "6", label: "Categories" },
              { value: "100%", label: "Independently reviewed" },
              { value: "0", label: "Paid placements" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
