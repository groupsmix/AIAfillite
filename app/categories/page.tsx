import Link from "next/link";

const CATEGORIES = [
  { slug: "chat-llm", name: "Chat / LLM", count: 38, desc: "Conversational large language models for writing, coding, and reasoning." },
  { slug: "image", name: "Image", count: 27, desc: "Text-to-image and editing tools — Midjourney, SDXL, Flux, etc." },
  { slug: "video", name: "Video", count: 14, desc: "Text-to-video, editing, and motion tools." },
  { slug: "audio", name: "Audio", count: 19, desc: "TTS, voice cloning, music generation, and transcription." },
  { slug: "code", name: "Code", count: 22, desc: "IDE assistants, autocomplete, and code review automation." },
  { slug: "research", name: "Research", count: 11, desc: "Search-grounded answer engines and citation tools." },
  { slug: "productivity", name: "Productivity", count: 24, desc: "Document, meeting, and workflow assistants." },
  { slug: "agents", name: "Agents", count: 17, desc: "Browser, computer-use, and autonomous task agents." },
];

export default function CategoriesPage() {
  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 12", borderRight: 0, padding: "40px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// /categories</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", margin: "8px 0 0" }}>Categories</h1>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line)" }}>
        {CATEGORIES.map((c, i) => (
          <div key={c.slug} className="grid-12" style={{ borderTop: i === 0 ? "0" : "1px solid var(--line)" }}>
            <div className="cell mono" style={{ gridColumn: "span 1", padding: "20px 24px", fontSize: 12, color: "var(--muted)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="cell" style={{ gridColumn: "span 3", padding: "18px 24px", fontWeight: 700, fontSize: 18 }}>
              <Link href={`/categories/${c.slug}`}>{c.name}</Link>
            </div>
            <div className="cell" style={{ gridColumn: "span 6", padding: "20px 24px", color: "var(--muted)", fontSize: 14 }}>
              {c.desc}
            </div>
            <div className="cell mono" style={{ gridColumn: "span 1", padding: "20px 24px", fontSize: 13 }}>
              {c.count}
            </div>
            <div className="cell" style={{ gridColumn: "span 1", padding: "16px 24px", borderRight: 0 }}>
              <Link href={`/categories/${c.slug}`} className="btn btn-accent" style={{ fontSize: 12, padding: "6px 12px" }}>Open →</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
