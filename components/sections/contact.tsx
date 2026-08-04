"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
      
    } catch (error: any) {
      console.error("Error sending message:", error.message);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <Reveal>
              <span className="eyebrow">Contact</span>
              <h2 className="section-heading mt-4">Let&apos;s build something together.</h2>
              <p className="mt-6 max-w-md text-lg text-ink-muted">
                I&apos;m currently open for new opportunities. Whether you have a question 
                or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </Reveal>

            <Reveal index={1} className="mt-12 flex flex-col gap-6">
              <a
                href="mailto:nizamzahrani7@gmail.com"
                className="group flex w-fit items-center gap-3 text-lg font-medium transition-colors hover:text-accent-blue"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas-muted transition-colors group-hover:bg-accent-blue/10">
                  <Mail size={20} className="transition-colors group-hover:text-accent-blue" />
                </div>
                nizamzahrani7@gmail.com
              </a>
              
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nizamuddin-zahrani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  LinkedIn
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                
                <a
                  href="https://github.com/nizam-desain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  GitHub
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://wa.me/6285706203608" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  WhatsApp
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal index={2} className="card-surface p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue"
                  placeholder="John Doe"
                  suppressHydrationWarning
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue"
                  placeholder="john@example.com"
                  suppressHydrationWarning
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="resize-none rounded-lg border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-accent-blue"
                  placeholder="How can I help you?"
                  suppressHydrationWarning
                />
              </div>
              
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-medium text-canvas transition-transform hover:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                suppressHydrationWarning
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={16} className="text-green-400" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}