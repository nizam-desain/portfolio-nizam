import { contact, profile } from "@/data/content";
import { ThemeChoice } from "@/components/ui/theme-toggle";

export function Footer() {
  return (
    <footer className="container-page pb-12">
      <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9375rem] text-muted">
          © {new Date().getFullYear()} {profile.legalName}
        </p>
        <ThemeChoice />
      </div>
      <p className="mt-6 max-w-measure text-[0.9375rem] leading-relaxed text-faint">{contact.footnote}</p>
    </footer>
  );
}
