import Link from "next/link";
import { notFound } from "next/navigation";

const DATA: Record<string, any> = {
  chatgpt: {
    name: "ChatGPT", vendor: "OpenAI", category: "Chat / LLM", price: "$20/mo (Plus)",
    summary: "General-purpose conversational LLM. Strong default choice for writing, coding, and reasoning across most domains.",
    pros: ["Largest ecosystem and plugin coverage", "Strong coding + tool use", "Voice and image input"],
    cons: ["Output quality varies by model tier", "Heavy throttling at peak hours"],
    specs: { Models: "GPT-5, GPT-4.1", Context: "200K tokens", API: "Yes", "Free tier": "Yes (limited)" },
  },
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = DATA[params.slug];
  if (!t) {
    return (
      <div className="grid-12">
        <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "64px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// 404</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "8px 0 0" }}>Tool not found.</h1>
          <p style={{ color: "var(--muted)" }}>The slug <span className="mono">{params.slug}</span> is not in the directory.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 8", padding: "48px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{t.category} / {t.vendor}</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em", margin: "6px 0 0" }}>{t.name}</h1>
          <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 680, marginTop: 14, lineHeight: 1.55 }}>{t.summary}</p>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Link href={`/go/${params.slug}`} className="btn btn-accent" rel="nofollow sponsored noopener noreferrer" target="_blank" style={{ fontSize: 14 }}>
              Visit {t.name} →
            </Link>
            <Link href="/tools" className="btn" style={{ fontSize: 14 }}>Back to all tools</Link>
          </div>
        </div>
        <aside className="cell" style={{ gridColumn: "span 4", padding: 0, borderRight: 0 }}>
          <div className="mono" style={{ padding: "16px 24px", fontSize: 11, color: "var(--muted)", borderBottom: "1px solid var(--line)" }}>SPECS</div>
          {Object.entries(t.specs).map(([k, v]) => (
            <div key={k} className="grid-12" style={{ borderBottom: "1px solid var(--line)" }}>
              <div className="cell mono" style={{ gridColumn: "span 6", padding: "10px 24px", fontSize: 12, color: "var(--muted)", borderRight: "1px solid var(--line)" }}>{k}</div>
              <div className="cell" style={{ gridColumn: "span 6", padding: "10px 24px", fontSize: 13, borderRight: 0 }}>{String(v)}</div>
            </div>
          ))}
        </aside>
      </section>

      <section style={{ borderTop: "1px solid var(--line)" }} className="grid-12">
        <div className="cell" style={{ gridColumn: "span 6", padding: "28px 32px" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>PROS</div>
          <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7 }}>
            {t.pros.map((p: string) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="cell" style={{ gridColumn: "span 6", padding: "28px 32px", borderRight: 0 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>CONS</div>
          <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7 }}>
            {t.cons.map((p: string) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
