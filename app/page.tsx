import Link from "next/link";

const FEATURED = [
  { slug: "chatgpt", name: "ChatGPT", category: "Chat / LLM", price: "$20/mo", desc: "General-purpose conversational LLM by OpenAI. Strong at writing, coding, and reasoning." },
  { slug: "claude", name: "Claude", category: "Chat / LLM", price: "$20/mo", desc: "Anthropic assistant tuned for long-context, structured reasoning, and safe outputs." },
  { slug: "perplexity", name: "Perplexity", category: "Research", price: "$20/mo", desc: "Search-grounded answer engine with cited sources and real-time web access." },
  { slug: "midjourney", name: "Midjourney", category: "Image", price: "$10/mo", desc: "High-fidelity text-to-image generator known for stylistic, art-directed outputs." },
  { slug: "github-copilot", name: "GitHub Copilot", category: "Code", price: "$10/mo", desc: "Inline coding assistant integrated with VS Code, JetBrains, and Neovim." },
  { slug: "notion-ai", name: "Notion AI", category: "Productivity", price: "$10/mo", desc: "Document and database AI inside Notion. Strong for summarization and drafting." },
];

const CATEGORIES = ["Chat / LLM", "Image", "Code", "Research", "Audio", "Video", "Productivity", "Agents"];

export default function Home() {
  return (
    <div>
      {/* HERO ROW */}
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 8", padding: "64px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
            // index — directory of ai tools
          </div>
          <h1 style={{ fontSize: 56, lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
            Compare AI tools.<br />Without the marketing noise.
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 640, marginTop: 20, lineHeight: 1.55 }}>
            A flat, structured directory of {"\u00A0"}AI products. Specs, prices, and short reviews. No carousels.
            No glow effects. No “revolutionary AI-powered synergy.”
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
            <Link href="/tools" className="btn btn-accent" style={{ fontSize: 14 }}>Browse all tools</Link>
            <Link href="/categories" className="btn" style={{ fontSize: 14 }}>View categories</Link>
          </div>
        </div>
        <aside className="cell" style={{ gridColumn: "span 4", padding: 0, borderRight: 0 }}>
          <div style={{ borderBottom: "1px solid var(--line)", padding: "24px 24px 16px" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>STATUS</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Tracking <b>312</b> tools across <b>{CATEGORIES.length}</b> categories.</div>
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>CATEGORIES</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CATEGORIES.map((c) => (
                <li key={c} style={{ borderTop: "1px solid var(--line)", padding: "10px 0", fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                  <Link href={`/categories#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{c}</Link>
                  <span className="mono" style={{ color: "var(--muted)" }}>→</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* FEATURED */}
      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="grid-12">
          <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Featured tools</h2>
            <Link href="/tools" className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>see all →</Link>
          </div>
        </div>
        <div className="grid-12 row">
          {FEATURED.map((p, i) => (
            <article
              key={p.slug}
              className="cell"
              style={{
                gridColumn: "span 4",
                borderTop: i >= 3 ? "1px solid var(--line)" : "none",
                borderRight: (i % 3 === 2) ? "0" : "1px solid var(--line)",
                padding: "24px",
              }}
            >
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{p.category}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: "6px 0 8px", letterSpacing: "-0.02em" }}>{p.name}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>{p.desc}</p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 12 }}>{p.price}</span>
                <Link href={`/tools/${p.slug}`} className="btn btn-accent" style={{ fontSize: 12, padding: "6px 12px" }}>
                  Open →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARE TABLE */}
      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="grid-12">
          <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "20px 24px" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Quick comparison</h2>
          </div>
        </div>
        <div className="grid-12" style={{ borderTop: "1px solid var(--line)", fontSize: 14 }}>
          {["Tool", "Category", "Price", "Best for", ""].map((h, i) => (
            <div key={i} className="cell mono" style={{ gridColumn: i === 3 ? "span 4" : "span 2", padding: "12px 24px", fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>
              {h}
            </div>
          ))}
        </div>
        {FEATURED.slice(0, 4).map((p) => (
          <div key={p.slug} className="grid-12" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="cell" style={{ gridColumn: "span 2", padding: "14px 24px", fontWeight: 600 }}>{p.name}</div>
            <div className="cell" style={{ gridColumn: "span 2", padding: "14px 24px", color: "var(--muted)" }}>{p.category}</div>
            <div className="cell mono" style={{ gridColumn: "span 2", padding: "14px 24px" }}>{p.price}</div>
            <div className="cell" style={{ gridColumn: "span 4", padding: "14px 24px", color: "var(--muted)" }}>{p.desc}</div>
            <div className="cell" style={{ gridColumn: "span 2", padding: "10px 24px", borderRight: 0 }}>
              <Link href={`/go/${p.slug}`} className="btn btn-accent" rel="nofollow sponsored noopener noreferrer" target="_blank" style={{ fontSize: 12, padding: "6px 12px" }}>
                Visit site →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
