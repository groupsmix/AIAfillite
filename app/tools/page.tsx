import Link from "next/link";

const TOOLS = [
  { slug: "chatgpt", name: "ChatGPT", category: "Chat / LLM", price: "$20/mo", vendor: "OpenAI" },
  { slug: "claude", name: "Claude", category: "Chat / LLM", price: "$20/mo", vendor: "Anthropic" },
  { slug: "gemini", name: "Gemini", category: "Chat / LLM", price: "$20/mo", vendor: "Google" },
  { slug: "perplexity", name: "Perplexity", category: "Research", price: "$20/mo", vendor: "Perplexity" },
  { slug: "midjourney", name: "Midjourney", category: "Image", price: "$10/mo", vendor: "Midjourney Inc." },
  { slug: "stable-diffusion", name: "Stable Diffusion", category: "Image", price: "Free / Self-host", vendor: "Stability AI" },
  { slug: "runway", name: "Runway", category: "Video", price: "$15/mo", vendor: "Runway" },
  { slug: "elevenlabs", name: "ElevenLabs", category: "Audio", price: "$5/mo", vendor: "ElevenLabs" },
  { slug: "github-copilot", name: "GitHub Copilot", category: "Code", price: "$10/mo", vendor: "GitHub" },
  { slug: "cursor", name: "Cursor", category: "Code", price: "$20/mo", vendor: "Anysphere" },
  { slug: "notion-ai", name: "Notion AI", category: "Productivity", price: "$10/mo", vendor: "Notion" },
  { slug: "browser-use", name: "Browser Use", category: "Agents", price: "Usage-based", vendor: "Browser Use" },
];

export default function ToolsPage() {
  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "40px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// /tools</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", margin: "8px 0 0" }}>All tools</h1>
          <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 680, marginTop: 10 }}>
            Flat list of every tool in the directory. Sort by name, vendor, or category. Nothing hidden behind tabs.
          </p>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="grid-12">
          {["Name", "Vendor", "Category", "Price", "Action"].map((h, i) => (
            <div key={i} className="cell mono" style={{ gridColumn: i === 0 ? "span 3" : "span 2", padding: "12px 24px", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", borderRight: i === 4 ? "0" : "1px solid var(--line)" }}>
              {h}
            </div>
          ))}
        </div>
        {TOOLS.map((t) => (
          <div key={t.slug} className="grid-12" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="cell" style={{ gridColumn: "span 3", padding: "14px 24px", fontWeight: 600 }}>
              <Link href={`/tools/${t.slug}`}>{t.name}</Link>
            </div>
            <div className="cell" style={{ gridColumn: "span 2", padding: "14px 24px", color: "var(--muted)" }}>{t.vendor}</div>
            <div className="cell" style={{ gridColumn: "span 2", padding: "14px 24px" }}>{t.category}</div>
            <div className="cell mono" style={{ gridColumn: "span 2", padding: "14px 24px" }}>{t.price}</div>
            <div className="cell" style={{ gridColumn: "span 3", padding: "10px 24px", borderRight: 0 }}>
              <Link href={`/tools/${t.slug}`} className="btn" style={{ fontSize: 12, padding: "6px 12px", marginRight: 8 }}>Review</Link>
              <Link href={`/go/${t.slug}`} className="btn btn-accent" rel="nofollow sponsored noopener noreferrer" target="_blank" style={{ fontSize: 12, padding: "6px 12px" }}>
                Visit →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
