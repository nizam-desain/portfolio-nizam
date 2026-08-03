import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none px-6 py-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas dark:bg-white dark:text-black hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "border border-line dark:border-line bg-transparent hover:bg-white/5 light:hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98]",
  ghost: "hover:bg-white/5 light:hover:bg-black/5",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a className={cn(base, variants[variant], className)} {...props} />
  );
}
