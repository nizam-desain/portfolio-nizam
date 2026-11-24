import Image from "next/image";
import { cn } from "@/lib/utils";

/** An image in a rounded frame with a cinematic reveal and an honest label. */
export function Art({
  src,
  w,
  h,
  alt,
  label,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority = false,
  reveal = true,
  fill = false,
}: {
  src: string;
  w?: number;
  h?: number;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: boolean;
  fill?: boolean;
}) {
  return (
    <div className={cn("img-frame group/art", reveal && "reveal-img", className)} data-reveal={reveal ? "" : undefined}>
      {fill ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover transition-transform duration-cine ease-out group-hover/art:scale-[1.03]", imgClassName)} />
      ) : (
        <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} className={cn("h-auto w-full transition-transform duration-cine ease-out group-hover/art:scale-[1.03]", imgClassName)} />
      )}
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-white/75 px-3 py-1 text-[0.7rem] font-semibold text-[#20242C] backdrop-blur-md">
          {label}
        </span>
      ) : null}
    </div>
  );
}
