import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Uniform container for certificate artwork. Every card shares the same
 * aspect ratio; the certificate inside is fitted without cropping or
 * distortion (portrait certificates stay portrait), and the paper shadow
 * hugs the certificate itself rather than the container.
 */
export function CertFrame({
  src,
  width,
  height,
  alt,
  ratio = 4 / 3,
  sizes,
  className,
  priority,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  ratio?: number;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const wide = width / height >= ratio;
  return (
    <div
      className={cn("relative flex w-full items-center justify-center overflow-hidden bg-surface p-[7%]", className)}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="relative max-h-full max-w-full overflow-hidden rounded-[3px] bg-white shadow-soft ring-1 ring-black/5 transition-transform duration-700 ease-editorial group-hover:scale-[1.035]"
        style={{ aspectRatio: `${width} / ${height}`, width: wide ? "100%" : "auto", height: wide ? "auto" : "100%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={85}
          priority={priority}
          className="object-contain"
        />
      </div>
    </div>
  );
}
