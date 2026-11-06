"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Loader2, Send } from "lucide-react";
import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const links = [
  { label: "LinkedIn", href: profile.linkedin, handle: "in/nizamuddin-zahrani" },
  { label: "GitHub", href: profile.github, handle: "nizam-desain" },
];

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return; // honeypot: silently ignore bots
    // Loaded on demand so the Supabase SDK isn't part of the initial page bundle.
    const { getSupabase } = await import("@/lib/supabase");
    const supabase = getSupabase();

    // Without a configured backend, hand the message to the visitor's mail app.
    if (!supabase) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    const { error } = await supabase
      .from("messages")
      .insert([{ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }]);
    if (error) {
      console.error("Contact form submission failed:", error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", message: "", company: "" });
  };

  const field =
    "w-full rounded-lg border border-line bg-paper px-4 py-3 text-[0.975rem] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/25";

  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="contact-title"
          index="09"
          label="Contact"
          title={
            <>
              Let&apos;s talk about the <span className="italic text-accent">problem</span> you&apos;re solving.
            </>
          }
          intro="Open to internship and graduate opportunities in business analysis, strategy & operations, and consulting. The quickest way to reach me is email or LinkedIn."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Email</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline break-all font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.4rem]"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-muted transition-colors hover:border-ink/40 hover:text-ink"
                aria-label="Copy email address"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sage">
                      <Check size={15} aria-hidden /> Copied
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Copy size={15} aria-hidden /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <ul className="mt-12 border-t border-line">
              {links.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5"
                  >
                    <span>
                      <span className="block text-lg font-medium text-ink">{l.label}</span>
                      <span className="text-sm text-muted">{l.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={profile.resumeUrl} download className="group flex items-center justify-between py-5">
                  <span>
                    <span className="block text-lg font-medium text-ink">Curriculum vitae</span>
                    <span className="text-sm text-muted">PDF · updated 2026</span>
                  </span>
                  <Download
                    size={20}
                    aria-hidden
                    className="text-muted transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted">Based in {profile.location}.</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-raised p-6 shadow-soft sm:p-8" noValidate={false}>
              <p className="font-serif text-2xl text-ink">Send a message</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cf-name" className="mb-1.5 block text-sm text-ink">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    required
                    autoComplete="name"
                    maxLength={120}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="mb-1.5 block text-sm text-ink">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="cf-message" className="mb-1.5 block text-sm text-ink">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={5}
                    maxLength={4000}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field} resize-y`}
                  />
                </div>
                {/* Honeypot — hidden from people and assistive tech */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="cf-company">Company</label>
                  <input
                    id="cf-company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full disabled:opacity-60">
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={15} aria-hidden />
                  </>
                )}
              </button>
              <p className="mt-3 min-h-[1.25rem] text-sm" role="status" aria-live="polite">
                {status === "sent" ? <span className="text-sage">Thank you — your message has been sent.</span> : null}
                {status === "mailto" ? (
                  <span className="text-muted">Your email app should open with the message ready to send.</span>
                ) : null}
                {status === "error" ? (
                  <span className="text-accent">
                    Something went wrong. Please email me directly at {profile.email}.
                  </span>
                ) : null}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
