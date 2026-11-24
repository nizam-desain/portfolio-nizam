"use client";

import { useState } from "react";
import { profile } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { ArrowOut, Download, Arrow } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
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

  // Unchanged behaviour: stores the message in Supabase `messages` when the
  // public env vars are set; otherwise opens the visitor's mail app.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return; // honeypot
    const { getSupabase } = await import("@/lib/supabase");
    const supabase = getSupabase();

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
    "peer w-full border-0 border-b border-line/30 bg-transparent px-0 pb-3 pt-6 text-body text-ink outline-none transition-colors duration-base placeholder:text-transparent focus:border-ink focus-visible:outline-none";
  const label =
    "meta pointer-events-none absolute left-0 top-6 text-stone transition-all duration-base peer-focus:top-0 peer-focus:text-oxide peer-[:not(:placeholder-shown)]:top-0";

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section">
      <div className="frame">
        <SectionMark ref_="08" label="Contact" note="Cikarang · WIB, UTC+7" />

        <div className="mt-14 md:mt-20" data-reveal>
          <p className="meta fade text-stone">Open to internship and graduate roles in business analysis, functional analysis, strategy &amp; operations, and consulting.</p>
          <h2 id="contact-title" className="display mt-6 text-h1 uppercase">
            <span className="mask"><span>If your team is untangling</span></span>
            <span className="mask" style={{ ["--i" as string]: 1 }}>
              <span>
                a process, <span className="accent-serif normal-case text-sage-ink">I&apos;d like to hear about it.</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="grid-12 mt-16 gap-y-16 md:mt-24">
          <div className="col-span-4 md:col-span-6" data-reveal>
            <p className="meta text-stone">Email — the quickest way</p>
            <a href={`mailto:${profile.email}`} className="display fade mt-3 block break-all text-[clamp(1.6rem,0.9rem+2.8vw,3.4rem)] lowercase leading-none transition-colors duration-base hover:text-sage-ink">
              {profile.email}
            </a>
            <button type="button" onClick={copyEmail} className="meta mt-4 inline-flex min-h-11 items-center gap-2 text-stone hover:text-ink">
              <span aria-hidden className={cn("block h-2 w-2 transition-colors", copied ? "bg-sage-ink" : "border border-current")} />
              {copied ? "Copied to clipboard" : "Copy address"}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span>

            <ul className="mt-12 border-t border-line/90">
              {[
                { label: "LinkedIn", sub: profile.linkedinHandle, href: profile.linkedin, ext: true },
                { label: "GitHub", sub: profile.githubHandle, href: profile.github, ext: true },
                { label: "Résumé", sub: "PDF · updated 2026", href: profile.resumeUrl, ext: false },
              ].map((l) => (
                <li key={l.label} className="border-b border-line/15">
                  <a
                    href={l.href}
                    {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="display text-h3 uppercase transition-transform duration-slow ease-out group-hover:translate-x-2">{l.label}</span>
                      <span className="meta text-stone">{l.sub}</span>
                    </span>
                    {l.ext ? (
                      <ArrowOut className="transition-transform duration-slow ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                    ) : (
                      <Download className="transition-transform duration-slow ease-out group-hover:translate-y-0.5" />
                    )}
                    {l.ext ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="col-span-4 md:col-span-5 md:col-start-8" aria-labelledby="form-title" data-reveal>
            <p id="form-title" className="meta text-stone">Or write here</p>
            <div className="mt-4 space-y-6">
              <div className="relative">
                <input id="cf-name" required autoComplete="name" maxLength={120} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                <label htmlFor="cf-name" className={label}>Name</label>
              </div>
              <div className="relative">
                <input id="cf-email" type="email" required autoComplete="email" maxLength={200} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
                <label htmlFor="cf-email" className={label}>Email</label>
              </div>
              <div className="relative">
                <textarea id="cf-message" required rows={5} maxLength={4000} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={cn(field, "resize-y")} />
                <label htmlFor="cf-message" className={label}>Message</label>
              </div>
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={status === "sending"} className="slab mt-10 w-full justify-between disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"} <Arrow size={16} />
            </button>
            <p className="mt-4 min-h-[1.5rem] text-small" role="status" aria-live="polite">
              {status === "sent" ? <span className="text-sage-ink">Thank you — your message has been sent.</span> : null}
              {status === "mailto" ? <span className="text-stone">Your email app should open with the message ready to send.</span> : null}
              {status === "error" ? <span className="text-oxide">Something went wrong. Please email me directly at {profile.email}.</span> : null}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
