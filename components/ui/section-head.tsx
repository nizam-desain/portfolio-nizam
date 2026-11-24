import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section opener: small eyebrow + serif heading + optional intro, in a few layouts. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  id,
  align = "split",
  className,
  invert = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  align?: "split" | "stack" | "center";
  className?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        align === "split" ? "grid-12 items-end gap-y-6" : align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
      data-reveal
    >
      <div className={align === "split" ? "col-span-4 md:col-span-7" : ""}>
        <p className={cn("eyebrow fade", invert && "text-teal", align === "center" && "justify-center")}>{eyebrow}</p>
        <h2 id={id} className="display mt-4 text-h1">
          <span className="mask"><span>{title}</span></span>
        </h2>
      </div>
      {intro ? (
        <p
          className={cn(
            "fade text-lead",
            invert ? "text-ivory/75" : "text-stone",
            align === "split" ? "col-span-4 md:col-span-4 md:col-start-9" : "mt-6",
          )}
          style={{ ["--i" as string]: 2 }}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
