import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { getCategories } from "@/data/tools";

const categories = getCategories();

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Affiliate disclosure bar */}
      <div className="bg-muted border-b border-border py-1.5 text-center text-xs text-muted-foreground tracking-wide">
        This site contains affiliate links. We may earn a commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-foreground transition-colors">
          Learn more
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-700 text-base tracking-tight text-foreground">
                AIStack
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
              <Link
                href="/tools"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${location === "/tools" ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                data-testid="nav-link-tools"
              >
                All Tools
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${location.startsWith(`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`) ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                  data-testid={`nav-link-${cat.toLowerCase()}`}
                >
                  {cat}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                className="md:hidden p-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background" data-testid="nav-mobile">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              <Link
                href="/tools"
                className="px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                All Tools
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-sans font-700 text-sm tracking-tight">AIStack</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Curated AI tools for people who take it seriously. No bloat, no bias — just honest picks.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Categories</p>
              <ul className="space-y-1.5">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Site</p>
              <ul className="space-y-1.5">
                <li><Link href="/tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">All Tools</Link></li>
                <li><Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Legal</p>
              <ul className="space-y-1.5">
                <li><Link href="/affiliate-disclosure" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Affiliate Disclosure</Link></li>
                <li><Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} AIStack. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Affiliate disclosure: Links marked with "Try" may earn us a commission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
