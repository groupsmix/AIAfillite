export default function ContactPage() {
  return (
    <div>
      <section className="grid-12">
        <div className="cell" style={{ gridColumn: "span 7", padding: "48px 32px" }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>// /contact</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", margin: "8px 0 0" }}>Contact</h1>
          <p style={{ color: "var(--muted)", marginTop: 14, lineHeight: 1.6, maxWidth: 600 }}>
            Submission, correction, or partnership request. Form posts to /api/contact with honeypot validation.
          </p>

          <form action="/api/contact" method="post" style={{ marginTop: 24, maxWidth: 560 }}>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <div style={{ marginBottom: 16 }}>
              <label className="mono" style={{ fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6 }}>MESSAGE</label>
              <textarea name="message" rows={6} style={{ width: "100%", border: "1px solid var(--line)", borderRadius: 2, padding: 12, background: "transparent", color: "var(--fg)", fontFamily: "inherit", fontSize: 14 }} />
            </div>
            <button type="submit" className="btn btn-accent" style={{ fontSize: 14 }}>Send message →</button>
          </form>
        </div>
        <aside className="cell" style={{ gridColumn: "span 5", padding: 0, borderRight: 0 }}>
          <div className="mono" style={{ padding: "16px 24px", fontSize: 11, color: "var(--muted)", borderBottom: "1px solid var(--line)" }}>DIRECT</div>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--line)" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>EMAIL</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>hello@compareai.site</div>
          </div>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--line)" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>RESPONSE TIME</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>Within 2 business days</div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="mono" style={{ fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 6 }}>
        {label.toUpperCase()}
      </label>
      <input type={type} name={name} required
        style={{ width: "100%", border: "1px solid var(--line)", borderRadius: 2, padding: "10px 12px", background: "transparent", color: "var(--fg)", fontSize: 14, fontFamily: "inherit" }} />
    </div>
  );
}
