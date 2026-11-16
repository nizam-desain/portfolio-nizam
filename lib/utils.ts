import type { CSSProperties } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stagger for the CSS reveal classes (`.rv`, `.rv-line`, `.rv-bar` …): sets the `--d` delay in seconds. */
export const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;
