import Link from "next/link";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="grid-12" style={{ alignItems: "stretch" }}>
        <div className="cell" style={{ gridColumn: "span 3", padding: "20px 24px" }}>
          <Link href="/" style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: 18 }}>
            compareai<span style={{ color: "var(--muted)" }}>.site</span>
          </Link>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            v0.1.0 / directory
          </div>
        </div>
        <nav className="cell" style={{ gridColumn: "span 7", padding: "20px 24px", display: "flex", gap: 28 }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{ fontSize: 14, fontWeight: 500 }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="cell" style={{ gridColumn: "span 2", padding: "16px 24px", borderRight: 0 }}>
          <Link href="/tools" className="btn btn-accent" style={{ display: "inline-block", fontSize: 13 }}>
            Browse tools →
          </Link>
        </div>
      </div>
    </header>
  );
}
