import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { tools, Category, PricingModel } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

const CATEGORIES: Category[] = ["Writing", "Image Generation", "Video", "SEO", "Coding", "Productivity"];
const PRICING_MODELS: PricingModel[] = ["Free", "Freemium", "Paid"];

export function ToolsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [activePricing, setActivePricing] = useState<PricingModel | "All">("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchSearch =
        !search ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchPricing = activePricing === "All" || tool.pricing.model === activePricing;
      return matchSearch && matchCategory && matchPricing;
    });
  }, [search, activeCategory, activePricing]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">All AI Tools</h1>
        <p className="text-muted-foreground text-sm">
          {tools.length} tools reviewed. Filter by category, pricing, or search by name.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-muted border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            data-testid="input-search"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${activeCategory === "All" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-border"}`}
            data-testid="filter-category-all"
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-border"}`}
              data-testid={`filter-category-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing filter */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {(["All", ...PRICING_MODELS] as const).map((model) => (
            <button
              key={model}
              onClick={() => setActivePricing(model as PricingModel | "All")}
              className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${activePricing === model ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-border"}`}
              data-testid={`filter-pricing-${model.toLowerCase()}`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* View mode + count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "tool" : "tools"} found
        </p>
        <div className="flex items-center gap-1 border border-border rounded p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-2 py-1 rounded text-xs transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            data-testid="button-view-grid"
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-2 py-1 rounded text-xs transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            data-testid="button-view-list"
          >
            List
          </button>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-base mb-2">No tools match your filters.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); setActivePricing("All"); }}
            className="text-sm text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
        >
          {filtered.map((tool) => (
            <motion.div
              key={tool.id}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-card border border-card-border rounded-sm overflow-hidden">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} compact />
          ))}
        </div>
      )}
    </div>
  );
}
