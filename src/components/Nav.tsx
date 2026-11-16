import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrolled, useLockBody } from "@/hooks/hooks";
import { BUSINESS, TEL_LINK, WA_DEFAULT } from "@/data/site";
import { Magnetic } from "./ui";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "3D Showcase", href: "#showcase" },
  { label: "Service Areas", href: "#areas" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-espresso/10 bg-cream/90 shadow-[0_1px_24px_rgba(23,18,12,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 transition-colors duration-500 sm:px-8 lg:px-12",
            scrolled ? "text-espresso" : "text-cream"
          )}
        >
          {/* Brand */}
          <a
            href="#home"
            aria-label="Saifi Interior & Furniture — home"
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "grid h-10 w-10 place-items-center border font-display text-lg font-semibold transition-colors duration-500",
                scrolled
                  ? "border-espresso/70 text-espresso"
                  : "border-cream/70 text-cream"
              )}
            >
              S
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[17px] font-semibold tracking-wide">
                Saifi
              </span>
              <span
                className={cn(
                  "block text-[9.5px] font-semibold uppercase tracking-[0.24em] transition-colors duration-500",
                  scrolled ? "text-stone-warm" : "text-cream/70"
                )}
              >
                Interior &amp; Furniture
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "link-line text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300",
                  scrolled ? "text-espresso/80 hover:text-espresso" : "text-cream/85 hover:text-cream"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={TEL_LINK}
              aria-label={`Call ${BUSINESS.callDisplay}`}
              className={cn(
                "grid h-10 w-10 place-items-center border transition-colors duration-300",
                scrolled
                  ? "border-espresso/25 hover:bg-espresso hover:text-cream"
                  : "border-cream/35 hover:bg-cream hover:text-espresso"
              )}
            >
              <Phone size={15} strokeWidth={1.8} />
            </a>
            <Magnetic>
              <a
                href="#quote"
                className={cn(
                  "inline-flex items-center gap-2 rounded-[2px] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                  scrolled
                    ? "bg-espresso text-cream hover:bg-wood"
                    : "bg-cream text-espresso hover:bg-brass-light"
                )}
              >
                Get a Quote
                <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </Magnetic>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open navigation menu"
            className={cn(
              "grid h-11 w-11 place-items-center border transition-colors duration-300 xl:hidden",
              scrolled ? "border-espresso/25" : "border-cream/35"
            )}
          >
            <Menu size={20} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-char text-cream xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
              <span className="font-display text-lg font-semibold tracking-wide">
                Saifi <span className="text-cream/50">&mdash; Menu</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="grid h-11 w-11 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-char"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 sm:px-10"
            >
              {[...LINKS, { label: "Get a Quote", href: "#quote" }].map(
                (l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-b border-cream/10 py-4"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.5 }}
                  >
                    <span className="font-mono text-[11px] text-brass-light/80">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[clamp(26px,6.5vw,40px)] font-medium leading-none transition-transform duration-300 group-hover:translate-x-2">
                      {l.label}
                    </span>
                  </motion.a>
                )
              )}
            </nav>

            <motion.div
              className="flex gap-3 px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 sm:px-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-[2px] bg-cream py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-espresso"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={TEL_LINK}
                className="flex flex-1 items-center justify-center gap-2 rounded-[2px] border border-cream/35 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream"
              >
                <Phone size={15} /> {BUSINESS.callDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
