import Image from "next/image";
import { cn } from "@/lib/utils";

const PAD = 0.07; // mat padding, as a fraction of the mat's width

/**
 * A uniform mat for certificate artwork. Every mat in a grid shares one
 * aspect ratio; the certificate inside is fitted whole, without cropping or
 * distortion (portrait certificates stay portrait), and its shadow hugs the
 * certificate itself. Built from spans so it can sit inside a button.
 */
export function CertFrame({
  src,
  width,
  height,
  alt,
  ratio = 4 / 3,
  sizes,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  ratio?: number;
  sizes: string;
  className?: string;
}) {
  // Compare against the mat's inner area, not the mat itself, so the paper edge is always exact.
  const inner = (1 - 2 * PAD) / (1 / ratio - 2 * PAD);
  const wide = width / height >= inner;
  return (
    <span
      className={cn("relative flex w-full items-center justify-center overflow-hidden bg-surface", className)}
      style={{ aspectRatio: ratio, padding: `${PAD * 100}%` }}
    >
      <span
        className="relative block max-h-full max-w-full bg-white shadow-lift transition-transform duration-500 ease-draft group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
        style={{ aspectRatio: `${width} / ${height}`, width: wide ? "100%" : "auto", height: wide ? "auto" : "100%" }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={85} className="object-contain" />
      </span>
    </span>
  );
}
