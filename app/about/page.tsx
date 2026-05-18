export default function AboutPage() {
  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 8", padding: "48px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// /about</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", margin: "8px 0 0" }}>About compareai.site</h1>
          <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 14, lineHeight: 1.6, maxWidth: 680 }}>
            compareai.site is a flat directory of AI tools. We list specs, prices, and short reviews. Some outbound
            links are affiliate links — clearly marked, and they never change ranking. Editorial ranking is based on
            published criteria.
          </p>
        </div>
        <aside className="cell" style={{ gridColumn: "span 4", padding: 0, borderRight: 0 }}>
          <div className="mono" style={{ padding: "16px 24px", fontSize: 11, color: "var(--muted)", borderBottom: "1px solid var(--line)" }}>STACK</div>
          {[["Framework", "Next.js App Router"], ["Styling", "Tailwind"], ["DB / Auth", "Supabase + RLS"], ["Hosting", "Cloudflare Workers"], ["Source", "github.com/groupsmix/AIAfillite"]].map(([k, v]) => (
            <div key={k} className="grid-12" style={{ borderBottom: "1px solid var(--line)" }}>
              <div className="cell mono" style={{ gridColumn: "span 5", padding: "10px 24px", fontSize: 12, color: "var(--muted)" }}>{k}</div>
              <div className="cell" style={{ gridColumn: "span 7", padding: "10px 24px", fontSize: 13, borderRight: 0 }}>{v}</div>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}
