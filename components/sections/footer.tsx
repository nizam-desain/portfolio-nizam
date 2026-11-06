import { profile } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.legalName}
        </p>
        <p className="max-w-md text-xs leading-relaxed sm:text-right">
          Personal portfolio. Not affiliated with or endorsed by any employer mentioned. Case-study diagrams are
          illustrative.
        </p>
      </div>
    </footer>
  );
}
