"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  /** IntersectionObserver rootMargin; the default waits until the element is a little way into view. */
  margin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Marks its element with `data-in` the first time it scrolls into view.
 * The reveal itself is plain CSS (see `.rv` in globals.css), so nothing
 * re-renders and nothing is hidden when scripting is unavailable.
 */
export function InView<T extends ElementType = "div">({ as, margin = "0px 0px -10% 0px", children, ...rest }: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <Tag ref={ref} data-inview="" {...rest}>
      {children}
    </Tag>
  );
}
