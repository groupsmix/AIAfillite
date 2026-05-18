import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      <h1 className="font-serif text-3xl text-foreground mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>AIStack is committed to protecting your privacy. This page explains what data we collect and how we use it.</p>
        <h2 className="font-semibold text-foreground text-base pt-2">Data we collect</h2>
        <p>
          We use localStorage in your browser to track which affiliate links you have clicked. This data never leaves your device and is used only to improve our site analytics.
        </p>
        <h2 className="font-semibold text-foreground text-base pt-2">Third-party links</h2>
        <p>
          This site links to third-party products and services. We are not responsible for their privacy practices. Please review the privacy policies of any sites you visit through our links.
        </p>
        <h2 className="font-semibold text-foreground text-base pt-2">Contact</h2>
        <p>If you have privacy concerns, please contact us.</p>
        <p className="text-xs pt-4 border-t border-border">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
