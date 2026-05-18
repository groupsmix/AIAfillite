import Link from "next/link";

const POSTS = [
  { slug: "chatgpt-vs-claude-2026", title: "ChatGPT vs Claude — 2026 head-to-head", date: "2026-05-10", author: "G. Mix", read: "8 min" },
  { slug: "best-ai-image-tools", title: "Best AI image tools for production work", date: "2026-04-29", author: "G. Mix", read: "12 min" },
  { slug: "browser-agents-state", title: "State of browser agents — what actually ships", date: "2026-04-12", author: "G. Mix", read: "10 min" },
  { slug: "self-host-llms-2026", title: "Self-hosting open LLMs in 2026 — costs and tradeoffs", date: "2026-03-30", author: "G. Mix", read: "15 min" },
];

export default function ReviewsPage() {
  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "40px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// /reviews</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", margin: "8px 0 0" }}>Reviews & writeups</h1>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line)" }}>
        {POSTS.map((p, i) => (
          <article key={p.slug} className="grid-12" style={{ borderTop: i === 0 ? "0" : "1px solid var(--line)" }}>
            <div className="cell mono" style={{ gridColumn: "span 2", padding: "22px 24px", fontSize: 12, color: "var(--muted)" }}>{p.date}</div>
            <div className="cell" style={{ gridColumn: "span 7", padding: "18px 24px" }}>
              <Link href={`/reviews/${p.slug}`} style={{ fontWeight: 700, fontSize: 18 }}>{p.title}</Link>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>by {p.author} · {p.read}</div>
            </div>
            <div className="cell" style={{ gridColumn: "span 3", padding: "16px 24px", borderRight: 0 }}>
              <Link href={`/reviews/${p.slug}`} className="btn" style={{ fontSize: 12, padding: "6px 12px" }}>Read →</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
