import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 64 }}>
      <div className="grid-12">
        <div className="cell" style={{ gridColumn: "span 4" }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>compareai.site</div>
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
            Independent directory of AI tools. Some links are affiliate links — this does not affect ranking.
          </p>
        </div>
        <div className="cell" style={{ gridColumn: "span 2" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>SECTION</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9, fontSize: 14 }}>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
          </ul>
        </div>
        <div className="cell" style={{ gridColumn: "span 2" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>COMPANY</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9, fontSize: 14 }}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="cell" style={{ gridColumn: "span 4", borderRight: 0 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>LEGAL</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9, fontSize: 14 }}>
            <li><Link href="/legal/affiliate-disclosure">Affiliate Disclosure</Link></li>
            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="grid-12" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="cell mono" style={{ gridColumn: "span 12", borderRight: 0, fontSize: 11, color: "var(--muted)" }}>
          © 2026 compareai.site — built on Next.js / Supabase / Cloudflare Workers.
        </div>
      </div>
    </footer>
  );
}
