import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="frame flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)]">
      <p className="meta text-oxide">Error 404</p>
      <h1 className="display mt-4 text-h1 uppercase">This page isn&apos;t in the process map.</h1>
      <Link href="/" className="slab mt-10 self-start">Back to the start</Link>
    </main>
  );
}
