import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/content";
import { Portrait } from "@/components/sections/portrait";
import { threadLg, threadMd, threadSm, type ThreadPath } from "@/components/sections/thread-paths";
import { cn } from "@/lib/utils";

function Tangle({ path, className }: { path: ThreadPath; className?: string }) {
  return (
    <svg
      aria-hidden
      width={path.w}
      height={path.h}
      viewBox={`0 0 ${path.w} ${path.h}`}
      fill="none"
      className={cn("shrink-0 overflow-visible text-accent", className)}
    >
      <path
        className="thread-path"
        d={path.d}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatementLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span className="block animate-mask-up" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

/**
 * The opening statement is underlined by the thread: a line that starts as
 * a tangle and leaves straight. It passes behind the portrait, turns down
 * the right gutter and becomes the line the rest of the page hangs from.
 *
 * `short:` styles tighten the composition on wide but shallow screens
 * (common laptops), so the actions stay above the fold.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative pb-20 pt-[calc(var(--header-h)+2rem)] sm:pb-24 sm:pt-[calc(var(--header-h)+3rem)] lg:pb-28 lg:pt-[calc(var(--header-h)+2.25rem)] short:!pt-[calc(var(--header-h)+1rem)]"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-12 lg:grid-rows-[auto_auto_1fr]">
          {/* Name, positioning, statement */}
          <div className="md:col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <h1 id="hero-name" className="animate-rise text-[1.375rem] font-[650] leading-tight text-ink sm:text-2xl">
              {profile.name}
            </h1>
            {/* Dividers sit on each item's left edge, one pixel outside the list for the first item
                of a row, where the list clips them. So a wrapped row never starts with a divider. */}
            <ul
              className="mt-2.5 flex animate-rise flex-col gap-y-0.5 text-[0.9375rem] text-muted sm:-ml-3.5 sm:flex-row sm:flex-wrap sm:gap-y-1 sm:overflow-hidden sm:text-base"
              style={{ animationDelay: "0.06s" }}
            >
              {profile.positioning.map((p) => (
                <li key={p} className="sm:-ml-px sm:border-l sm:border-line sm:px-3.5">
                  {p}
                </li>
              ))}
            </ul>

            <p className="display mt-9 text-[clamp(2.9rem,15vw,4.4rem)] leading-[0.94] tracking-[-0.022em] text-ink sm:mt-11 sm:text-[clamp(4rem,10vw,5.6rem)] lg:mt-9 lg:text-[clamp(3.5rem,6vw,5.5rem)] short:!mt-6 short:!text-[clamp(3.25rem,5.3vw,4.75rem)]">
              <StatementLine delay={0.12}>Making sense</StatementLine>
              <StatementLine delay={0.2}>of complex</StatementLine>
              <StatementLine delay={0.28}>
                business <br className="sm:hidden" />
                problems.
              </StatementLine>
            </p>
          </div>

          {/* The thread: tangle, straight run, and the turn into the gutter */}
          <div
            aria-hidden
            className="mr-[calc(var(--spine-r)-var(--pad-r))] mt-5 flex items-center sm:mt-7 md:col-span-12 lg:col-start-1 lg:row-start-2 lg:mt-5 short:!mt-3"
          >
            <Tangle path={threadSm} className="-ml-1 sm:hidden" />
            <Tangle path={threadMd} className="-ml-1 hidden sm:block xl:hidden short:!block" />
            <Tangle path={threadLg} className="-ml-1 hidden xl:block short:!hidden" />
            <span
              className="h-[1.5px] flex-1 origin-left animate-draw-x bg-accent"
              style={{ animationDelay: "2.05s", animationDuration: "0.3s" }}
            />
            <span className="relative h-[1.5px] w-[14px] shrink-0">
              <span
                data-thread-start=""
                className="absolute -right-[0.75px] left-0 top-0 h-[14px] animate-fade-in rounded-tr-[14px] border-r-[1.5px] border-t-[1.5px] border-accent"
                style={{ animationDelay: "2.3s", animationDuration: "0.2s" }}
              />
            </span>
          </div>

          {/* Portrait: sits over the straight run of the thread on wide screens */}
          <div className="relative z-10 mt-9 w-[min(100%,26rem)] sm:mt-12 md:col-span-6 md:row-start-3 md:w-full lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:mt-1 lg:justify-self-end short:!w-[min(100%,calc((100svh-var(--header-h)-7rem)*0.8))]">
            <Portrait />
          </div>

          {/* Supporting copy and actions */}
          <div className="mt-10 md:col-span-6 md:col-start-7 md:row-start-3 md:mt-12 md:self-center lg:col-span-7 lg:col-start-1 lg:row-start-3 lg:mt-6 lg:self-auto short:!mt-4">
            <p className="max-w-[34rem] animate-rise text-lead text-muted short:!max-w-[37rem] short:!text-[1.125rem]" style={{ animationDelay: "0.5s" }}>
              {profile.intro}
            </p>
            <p
              className="mt-5 flex max-w-[36rem] animate-rise items-start gap-3 text-[0.9375rem] leading-relaxed text-muted short:!mt-4"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="relative mt-[0.45rem] flex h-[11px] w-[11px] shrink-0" aria-hidden>
                <span className="absolute inset-0 animate-ping rounded-full border border-accent motion-reduce:hidden" />
                <span className="pt" />
              </span>
              <span>{profile.status}</span>
            </p>
            <div className="mt-8 flex animate-rise flex-wrap items-center gap-x-3 gap-y-3 short:!mt-5" style={{ animationDelay: "0.7s" }}>
              <a href="#work" className="btn-solid">
                Explore my work
              </a>
              <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-line">
                <Download size={16} aria-hidden />
                Download CV
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex min-h-[2.75rem] items-center gap-1.5 px-2 text-[0.9375rem] font-semibold text-ink"
              >
                Connect on LinkedIn
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
