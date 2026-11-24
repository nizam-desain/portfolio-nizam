"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/content";
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
    "peer w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 pb-3 pt-6 text-body text-ivory outline-none transition-colors duration-base placeholder:text-transparent focus:border-teal focus:bg-white/[0.09] focus-visible:outline-none";
  const label =
    "pointer-events-none absolute left-4 top-[1.15rem] text-small font-medium text-ivory/60 transition-all duration-base peer-focus:top-2 peer-focus:text-[0.72rem] peer-focus:text-teal peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.72rem]";

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section">
      <div className="frame">
        <div className="band-night relative overflow-hidden rounded-[36px] px-6 py-12 sm:px-10 md:px-14 md:py-16">
          {/* Atmosphere: original render of arches at night, softened into the band */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
            <Image src="/art/arches-night.jpg" alt="" fill sizes="50vw" className="object-cover opacity-55 [mask-image:linear-gradient(90deg,transparent,black_45%)]" />
          </div>
          <div aria-hidden className="glow pointer-events-none absolute -left-24 bottom-[-30%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(117_212_197/0.22),transparent)]" />

          <div className="relative grid-12 gap-y-12" data-reveal>
            <div className="col-span-4 md:col-span-12 lg:col-span-6">
              <p className="eyebrow fade !text-teal">Contact</p>
              <h2 id="contact-title" className="display mt-4 text-h1">
                <span className="mask"><span>Let&apos;s talk about</span></span>
                <span className="mask" style={{ ["--i" as string]: 1 }}>
                  <span>
                    the work <span className="accent-serif text-teal">behind the work.</span>
                  </span>
                </span>
              </h2>
              <p className="fade mt-6 max-w-[30rem] text-lead text-ivory/75" style={{ ["--i" as string]: 2 }}>
                Open to internship and graduate roles in business analysis, people &amp; culture, digital products and consulting — and to good conversations about any of them.
              </p>

              <div className="fade mt-10" style={{ ["--i" as string]: 3 }}>
                <a href={`mailto:${profile.email}`} className="display block break-all text-[clamp(1.6rem,1rem+2.4vw,3rem)] leading-tight text-ivory transition-colors duration-base hover:text-teal">
                  {profile.email}
                </a>
                <button type="button" onClick={copyEmail} className="mt-3 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-ivory/70 hover:text-ivory">
                  <span aria-hidden className={cn("h-2 w-2 rounded-full transition-colors", copied ? "bg-teal" : "border border-current")} />
                  {copied ? "Copied to clipboard" : "Copy address"}
                </button>
                <span className="sr-only" aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span>
              </div>

              <ul className="fade mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: 4 }}>
                {[
                  { label: "LinkedIn", href: profile.linkedin, ext: true },
                  { label: "GitHub", href: profile.github, ext: true },
                  { label: "Résumé (PDF)", href: profile.resumeUrl, ext: false },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 text-small font-semibold text-ivory transition-colors duration-base hover:border-teal hover:text-teal"
                    >
                      {l.label}
                      {l.ext ? <ArrowOut size={13} /> : <Download size={13} />}
                      {l.ext ? <span className="sr-only">(opens in a new tab)</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} className="fade col-span-4 rounded-[28px] border border-white/10 bg-[#0b1020]/55 p-5 backdrop-blur-xl sm:p-7 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8" style={{ ["--i" as string]: 3 }} aria-labelledby="form-title">
              <p id="form-title" className="text-small font-semibold text-ivory/80">Or write here</p>
              <div className="mt-4 space-y-3">
                <div className="relative">
                  <input id="cf-name" required autoComplete="name" maxLength={120} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                  <label htmlFor="cf-name" className={label}>Name</label>
                </div>
                <div className="relative">
                  <input id="cf-email" type="email" required autoComplete="email" maxLength={200} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
                  <label htmlFor="cf-email" className={label}>Email</label>
                </div>
                <div className="relative">
                  <textarea id="cf-message" required rows={4} maxLength={4000} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={cn(field, "resize-y")} />
                  <label htmlFor="cf-message" className={label}>Message</label>
                </div>
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <button type="submit" disabled={status === "sending"} className="mt-5 inline-flex min-h-12 w-full items-center justify-between rounded-2xl bg-ivory px-5 font-semibold text-[#111827] transition-[transform,background-color] duration-slow ease-out hover:-translate-y-0.5 hover:bg-teal disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"} <Arrow size={16} />
              </button>
              <p className="mt-3 min-h-[1.5rem] text-small" role="status" aria-live="polite">
                {status === "sent" ? <span className="text-teal">Thank you — your message has been sent.</span> : null}
                {status === "mailto" ? <span className="text-ivory/75">Your email app should open with the message ready to send.</span> : null}
                {status === "error" ? <span className="text-[#F4A98A]">Something went wrong. Please email me directly at {profile.email}.</span> : null}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
