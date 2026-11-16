"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from "lucide-react";
import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils";

export type LightboxItem = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  subtitle?: string;
  note?: string;
  meta?: { label: string; value: string }[];
  verifyUrl?: string;
};

/**
 * Fullscreen viewer: keyboard (← → Esc, Z or +/− to zoom), swipe on touch,
 * click to zoom at the clicked point with panning by scroll or drag,
 * download of the original file, and an optional verification link.
 *
 * Size is tied to the source image, not the screen: a certificate is fitted
 * at no more than twice its own pixels and zoomed to about twice again, so
 * a small source is never passed off as a sharper one.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  label,
}: {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  label: string;
}) {
  const ref = useDialog<HTMLDivElement>(true, onClose);
  const stageRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [dir, setDir] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];
  const many = items.length > 1;

  const go = useCallback(
    (delta: number) => {
      if (!many) return;
      setDir(delta);
      setZoomed(false);
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, many, onIndex],
  );

  const toggleZoom = useCallback((point?: { x: number; y: number }) => {
    setZoomed((z) => {
      const next = !z;
      if (next) {
        requestAnimationFrame(() => {
          const stage = stageRef.current;
          if (!stage) return;
          const px = point?.x ?? 0.5;
          const py = point?.y ?? 0.5;
          stage.scrollLeft = px * stage.scrollWidth - stage.clientWidth / 2;
          stage.scrollTop = py * stage.scrollHeight - stage.clientHeight / 2;
        });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "z" || e.key === "+" || e.key === "=" || e.key === "-") toggleZoom();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleZoom]);

  // Fit the image inside the stage while preserving its aspect ratio.
  const [stage, setStage] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStage({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const ratio = item.width / item.height;
  const fitW = stage.w && stage.h ? Math.min(stage.w, stage.h * ratio, item.width * 2) : 0;
  const zoomW = Math.max(fitW * 1.4, Math.min(fitW * 2, item.width * 2));
  const dispW = Math.round(zoomed ? zoomW : fitW);
  const dispH = Math.round(dispW / ratio);

  // Drag to pan when zoomed (mouse); native scrolling handles touch.
  const drag = useRef<{ x: number; y: number; l: number; t: number; moved: boolean } | null>(null);

  return (
    <motion.div
      className="dark fixed inset-0 z-[70] bg-paper text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${label}: ${item.title}`}
        tabIndex={-1}
        className="relative flex h-full flex-col outline-none"
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex items-center">
            {many ? (
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="icon-btn sm:hidden">
                <ChevronLeft size={21} aria-hidden />
              </button>
            ) : null}
            <p className="tabular px-2 text-[0.9375rem] text-muted" aria-live="polite">
              {index + 1} of {items.length}
            </p>
            {many ? (
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="icon-btn sm:hidden">
                <ChevronRight size={21} aria-hidden />
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <IconBtn label={zoomed ? "Zoom out" : "Zoom in"} onClick={() => toggleZoom()}>
              {zoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
            </IconBtn>
            <a
              href={item.src}
              download
              className="icon-btn"
              aria-label={`Download the original image of ${item.title}`}
              title="Download original"
            >
              <Download size={19} aria-hidden />
            </a>
            <IconBtn label="Close viewer" onClick={onClose} autoFocus>
              <X size={21} />
            </IconBtn>
          </div>
        </div>

        {/* Stage */}
        <div className="relative min-h-0 flex-1 px-2 sm:px-20">
          <div
            ref={stageRef}
            className={cn(
              "h-full w-full overflow-auto overscroll-contain",
              zoomed ? "cursor-grab active:cursor-grabbing" : "flex items-center justify-center",
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget && !zoomed) onClose();
            }}
            onTouchStart={(e) => {
              if (zoomed) return;
              touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={(e) => {
              if (!touch.current || zoomed) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
            }}
            onMouseDown={(e) => {
              if (!zoomed || !stageRef.current) return;
              drag.current = {
                x: e.clientX,
                y: e.clientY,
                l: stageRef.current.scrollLeft,
                t: stageRef.current.scrollTop,
                moved: false,
              };
            }}
            onMouseMove={(e) => {
              const d = drag.current;
              if (!d || !stageRef.current) return;
              const dx = e.clientX - d.x;
              const dy = e.clientY - d.y;
              if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
              stageRef.current.scrollLeft = d.l - dx;
              stageRef.current.scrollTop = d.t - dy;
            }}
            onMouseUp={() => {
              setTimeout(() => (drag.current = null), 0);
            }}
            onMouseLeave={() => (drag.current = null)}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.button
                type="button"
                key={item.key}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40, scale: dir === 0 ? 0.97 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={(e) => {
                  if (drag.current?.moved) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  toggleZoom({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
                }}
                className={cn("relative block shrink-0 bg-white shadow-sheet", zoomed ? "m-auto cursor-zoom-out" : "cursor-zoom-in")}
                style={{ width: dispW || undefined, height: dispH || undefined }}
                aria-label={zoomed ? "Zoom out" : "Zoom in on the image"}
                tabIndex={-1}
              >
                {fitW ? (
                  <>
                    {/* The grid's small rendition is already cached, so it shows at once while the original loads over it. */}
                    <Image src={item.src} alt="" aria-hidden fill sizes="(min-width: 1024px) 19rem, 44vw" quality={85} className="object-contain" />
                    <Image src={item.src} alt={item.alt} fill unoptimized draggable={false} className="select-none object-contain" />
                  </>
                ) : null}
              </motion.button>
            </AnimatePresence>
          </div>

          {many ? (
            <>
              <NavBtn side="left" onClick={() => go(-1)} />
              <NavBtn side="right" onClick={() => go(1)} />
            </>
          ) : null}
        </div>

        {/* Caption */}
        <div className="shrink-0 border-t border-line px-4 py-4 sm:px-8 sm:py-5">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p className="display text-[1.375rem] leading-tight sm:text-display-sm">{item.title}</p>
              {item.subtitle ? <p className="mt-1.5 text-[0.9375rem] text-muted">{item.subtitle}</p> : null}
              {item.note ? <p className="mt-1.5 max-w-[44rem] text-[0.9375rem] text-muted">{item.note}</p> : null}
              {item.meta?.length ? (
                <dl className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
                  {item.meta.map((m) => (
                    <div key={m.label} className="flex gap-2">
                      <dt className="text-muted">{m.label}</dt>
                      <dd className="tabular">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
            {item.verifyUrl ? (
              <a href={item.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-line shrink-0 self-start sm:self-auto">
                Verify credential
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IconBtn({
  label,
  onClick,
  children,
  autoFocus,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} data-autofocus={autoFocus ? "" : undefined} className="icon-btn">
      <span aria-hidden>{children}</span>
    </button>
  );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-rule bg-paper/80 text-ink backdrop-blur transition-colors duration-200 hover:bg-ink hover:text-paper sm:grid",
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
    >
      {side === "left" ? <ChevronLeft size={20} aria-hidden /> : <ChevronRight size={20} aria-hidden />}
    </button>
  );
}
