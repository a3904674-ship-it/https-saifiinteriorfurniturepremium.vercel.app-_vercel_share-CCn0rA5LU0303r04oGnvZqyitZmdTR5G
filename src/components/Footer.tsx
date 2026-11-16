import {
  MessageCircle,
  Phone,
  MapPin,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { BUSINESS, SERVICES, AREAS, TEL_LINK, WA_DEFAULT } from "@/data/site";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "3D Showcase", href: "#showcase" },
  { label: "Service Areas", href: "#areas" },
  { label: "About", href: "#about" },
  { label: "Get a Quote", href: "#quote" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-char text-cream" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* CTA band */}
      <div className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8 lg:px-12">
          <p className="max-w-xl font-display text-2xl font-medium leading-snug sm:text-3xl">
            Have a space in mind?{" "}
            <span className="font-light italic text-brass-light">
              Let&rsquo;s measure it.
            </span>
          </p>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-[2px] bg-cream px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-brass-light"
          >
            <MessageCircle size={16} strokeWidth={1.9} aria-hidden="true" />
            Chat on WhatsApp
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center border border-cream/40 font-display text-xl font-semibold">
              S
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold">
                Saifi
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/60">
                Interior &amp; Furniture
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-cream/60">
            Site-based custom interior and furniture service in {BUSINESS.city} —
            kitchens, bedrooms, wardrobes, TV panels, paneling, ceilings and
            furniture, built around your space and your budget.
          </p>
          <p className="mt-5 flex items-start gap-2.5 text-[13px] text-cream/55">
            <MapPin size={15} className="mt-0.5 shrink-0 text-brass-light" aria-hidden="true" />
            {BUSINESS.city}, {BUSINESS.state}, India
          </p>
        </div>

        <nav aria-label="Footer services">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Services
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a
                  href="#services"
                  className="link-line text-[13.5px] text-cream/65 transition-colors hover:text-cream"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer navigation">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Navigate
          </h3>
          <ul className="mt-5 grid gap-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="link-line text-[13.5px] text-cream/65 transition-colors hover:text-cream"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Contact
          </h3>
          <ul className="mt-5 grid gap-3">
            <li>
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-[13.5px] text-cream/65 transition-colors hover:text-cream"
              >
                <MessageCircle size={14} className="text-brass-light" aria-hidden="true" />
                WhatsApp {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={TEL_LINK}
                className="flex items-center gap-2.5 text-[13.5px] text-cream/65 transition-colors hover:text-cream"
              >
                <Phone size={14} className="text-brass-light" aria-hidden="true" />
                Call {BUSINESS.callDisplay}
              </a>
            </li>
          </ul>
          <h3 className="mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Service areas
          </h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-cream/65">
            {AREAS.map((a) => a.name).join(" · ")}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-12">
          <p className="text-[12px] tracking-wide text-cream/45">
            &copy; {year} {BUSINESS.name} &middot; {BUSINESS.city},{" "}
            {BUSINESS.state}. All rights reserved.
          </p>
          <p className="text-[11px] tracking-wide text-cream/35">
            Reference photography via Pexels &middot; 3D scenes rendered in-browser
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center border border-cream/25 transition-colors hover:bg-cream hover:text-char"
          >
            <ArrowUp size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}
