"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Loader2 } from "lucide-react";
import { contact, profile, sections } from "@/data/content";
import { Section } from "@/components/ui/section";
import { delay } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "mailto" | "fallback";

// Inlined at build time. With no backend configured the form hands the
// message to the visitor's own email app, and says so before they send.
const hasBackend = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const statusText: Record<Status, string> = {
  idle: "",
  sending: "",
  sent: "Message sent. Thank you, I will reply by email.",
  mailto: "Your email app should now be open with the message ready to send.",
  fallback: "The form could not send your message, so it has been handed to your email app instead.",
};

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Fallback for browsers without async clipboard permission.
      const t = document.createElement("textarea");
      t.value = profile.email;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const openMailApp = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return; // honeypot: quietly ignore bots
    if (!hasBackend) {
      openMailApp();
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      // Loaded on demand so the Supabase SDK is not part of the page's first load.
      const { getSupabase } = await import("@/lib/supabase");
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase is not configured");
      const { error } = await supabase
        .from("messages")
        .insert([{ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }]);
      if (error) throw new Error(error.message);
      setStatus("sent");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      // The message is never dropped: if the service fails, the visitor's email app takes over.
      console.warn("Contact form: falling back to email.", err instanceof Error ? err.message : err);
      openMailApp();
      setStatus("fallback");
    }
  };

  const links = [
    { label: "LinkedIn", detail: profile.linkedinHandle, href: profile.linkedin },
    { label: "GitHub", detail: profile.githubHandle, href: profile.github },
  ];

  return (
    <Section
      id="contact"
      end
      label={sections.contact.label}
      title={sections.contact.title}
      intro={sections.contact.intro}
      className="pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="mt-12 grid gap-x-10 gap-y-14 sm:mt-16 lg:grid-cols-12">
        <div className="rv lg:col-span-6" style={delay(0.2)}>
          <h3 className="text-muted">Email</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="display link break-all text-[clamp(1.45rem,6.4vw,2.6rem)] leading-tight text-ink"
            >
              {profile.email}
            </a>
            <button type="button" onClick={copyEmail} className="btn-line min-w-[6.75rem] px-4" aria-label="Copy email address">
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to the clipboard" : ""}
            </span>
          </div>

          <ul className="mt-10 border-b border-line">
            {links.map((l) => (
              <li key={l.label} className="border-t border-line">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[4.5rem] items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-[650] text-ink transition-colors duration-200 group-hover:text-accent">{l.label}</span>
                    <span className="block text-[0.9375rem] text-muted">{l.detail}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="shrink-0 text-muted transition-[transform,color] duration-300 ease-draft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li className="border-t border-line">
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="group flex min-h-[4.5rem] items-center justify-between gap-4 py-4"
              >
                <span>
                  <span className="block font-[650] text-ink transition-colors duration-200 group-hover:text-accent">Curriculum vitae</span>
                  <span className="block text-[0.9375rem] text-muted">PDF, 4 pages</span>
                </span>
                <Download
                  size={20}
                  aria-hidden
                  className="shrink-0 text-muted transition-[transform,color] duration-300 ease-draft group-hover:translate-y-0.5 group-hover:text-accent"
                />
              </a>
            </li>
          </ul>
          <p className="mt-6 text-muted">Based in {profile.location}.</p>
        </div>

        <form onSubmit={onSubmit} className="rv lg:col-span-5 lg:col-start-8" style={delay(0.3)} aria-labelledby="contact-form-title">
          <h3 id="contact-form-title" className="subhead">
            {contact.formTitle}
          </h3>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-[0.9375rem] text-ink">
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                required
                autoComplete="name"
                maxLength={120}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label htmlFor="cf-email" className="mb-1.5 block text-[0.9375rem] text-ink">
                Email
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={200}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="field"
              />
            </div>
            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-[0.9375rem] text-ink">
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                maxLength={4000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="field resize-y"
              />
            </div>
            {/* Honeypot: hidden from people and assistive technology */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="cf-company">Company</label>
              <input
                id="cf-company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="submit" disabled={status === "sending"} className="btn-solid disabled:opacity-60">
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden /> Sending
                </>
              ) : hasBackend ? (
                "Send message"
              ) : (
                "Open in email app"
              )}
            </button>
            {!hasBackend ? (
              <p className="max-w-[17rem] text-[0.9375rem] leading-snug text-muted">
                Opens your email app with this message filled in.
              </p>
            ) : null}
          </div>
          <p className="mt-3 min-h-[1.5rem] text-[0.9375rem] text-ink" role="status" aria-live="polite">
            {statusText[status]}
          </p>
        </form>
      </div>
    </Section>
  );
}
