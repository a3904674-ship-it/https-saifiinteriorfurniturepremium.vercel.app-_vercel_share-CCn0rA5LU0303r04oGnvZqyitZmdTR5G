import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowUpRight,
  Layers,
  Paintbrush,
  SlidersHorizontal,
  Home,
  LayoutGrid,
  Ruler,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { SERVICES, type ServiceDetail, px, waLink } from "@/data/site";
import { Reveal, SectionHead } from "./ui";
import { useLockBody } from "@/hooks/hooks";
import { cn } from "@/utils/cn";

/* ---------------------------------------------------------------- */
/* Detail modal                                                      */
/* ---------------------------------------------------------------- */

function SpecBlock({
  icon: Icon,
  title,
  children,
  light = false,
}: {
  icon: typeof Layers;
  title: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="border-t border-cream/15 pt-5">
      <h4 className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brass-light">
        <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
        {title}
      </h4>
      <div className={cn("mt-3 text-[14px] leading-relaxed", light ? "text-cream/75" : "")}>
        {children}
      </div>
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceDetail | null;
  onClose: () => void;
}) {
  useLockBody(!!service);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (service) {
      lastFocus.current = document.activeElement;
      closeRef.current?.focus();
    } else if (lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
    }
  }, [service]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} — details`}
        >
          <motion.button
            type="button"
            aria-label="Close details"
            className="absolute inset-0 bg-char/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden bg-char text-cream shadow-2xl sm:rounded-[3px]"
            initial={{ opacity: 0, y: 60, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-y-auto overscroll-contain">
              {/* Header image */}
              <div className="relative h-52 sm:h-72">
                <img
                  src={px(service.imgId, 1400, 700)}
                  alt={service.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(23,18,12,0.95) 0%, rgba(23,18,12,0.25) 55%, rgba(23,18,12,0.15) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-8">
                  <div>
                    <span className="font-mono text-xs text-brass-light">
                      {service.index}
                    </span>
                    <h3 className="font-display text-3xl font-medium sm:text-5xl">
                      {service.title}
                    </h3>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close details"
                    className="grid h-11 w-11 shrink-0 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-char"
                  >
                    <X size={18} strokeWidth={1.7} />
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:p-10">
                <p className="max-w-3xl text-[15px] leading-relaxed text-cream/80 sm:text-base">
                  {service.description}
                </p>

                <div className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  <SpecBlock icon={Layers} title="Materials">
                    <ul className="grid list-none gap-2 p-0">
                      {service.materials.map((m) => (
                        <li key={m} className="flex gap-3">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </SpecBlock>
                  <SpecBlock icon={Paintbrush} title="Finishes available">
                    <div className="flex flex-wrap gap-2">
                      {service.finishes.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-cream/20 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream/80"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </SpecBlock>
                  <SpecBlock icon={SlidersHorizontal} title="Customisation">
                    <ul className="grid list-none gap-2 p-0">
                      {service.customOptions.map((c) => (
                        <li key={c} className="flex gap-3">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </SpecBlock>
                  <SpecBlock icon={Home} title="Typical use cases">
                    <ul className="grid list-none gap-2 p-0">
                      {service.useCases.map((u) => (
                        <li key={u} className="flex gap-3">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </SpecBlock>
                  <SpecBlock icon={LayoutGrid} title="Available styles">
                    <div className="flex flex-wrap gap-2">
                      {service.styles.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-cream/20 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-cream/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </SpecBlock>
                  <div className="grid gap-8">
                    <SpecBlock icon={Ruler} title="Dimensions & sizing">
                      <p className="text-cream/75">{service.dimensions}</p>
                    </SpecBlock>
                    <SpecBlock icon={Sparkles} title="Maintenance">
                      <p className="text-cream/75">{service.maintenance}</p>
                    </SpecBlock>
                  </div>
                </div>

                {/* CTA row */}
                <div className="mt-10 flex flex-col gap-3 border-t border-cream/15 pt-7 sm:flex-row">
                  <a
                    href={waLink(
                      `Hello Saifi Interior & Furniture, I want to enquire about: ${service.title}. Please share details and a rough estimate.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-[2px] bg-cream px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-brass-light"
                  >
                    <MessageCircle size={15} strokeWidth={1.9} />
                    Enquire about {service.title}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      requestAnimationFrame(() => {
                        document
                          .getElementById("quote")
                          ?.scrollIntoView({ behavior: "smooth" });
                      });
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-[2px] border border-cream/35 px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-espresso"
                  >
                    Request a quote
                    <ArrowUpRight size={15} strokeWidth={1.9} />
                  </button>
                </div>
                <p className="mt-4 text-center text-[11px] tracking-wide text-cream/40">
                  Reference photograph shown for style direction &middot; final work is built to your space
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Service cards                                                     */
/* ---------------------------------------------------------------- */

function ServiceCard({
  service,
  i,
  onExplore,
}: {
  service: ServiceDetail;
  i: number;
  onExplore: (s: ServiceDetail) => void;
}) {
  return (
    <Reveal delay={(i % 4) * 0.07} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden border border-espresso/12 bg-cream transition-all duration-500 hover:-translate-y-1.5 hover:border-espresso/25 hover:shadow-[0_30px_60px_-30px_rgba(23,18,12,0.35)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={px(service.imgId, 900, 620)}
            alt={service.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-char/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
            aria-hidden="true"
          />
          <span
            className="absolute left-4 top-4 font-mono text-[11px] tracking-widest text-cream/85"
            aria-hidden="true"
          >
            {service.index}
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Reference photo &middot; built to your space
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-[22px] font-medium text-espresso">
            {service.title}
          </h3>
          <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-stone-warm">
            {service.short}
          </p>
          <button
            type="button"
            onClick={() => onExplore(service)}
            aria-label={`Explore ${service.title} — materials, finishes and options`}
            className="mt-5 inline-flex items-center gap-2 self-start border-b border-espresso/40 pb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:border-wood hover:text-wood"
          >
            Explore
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */

export default function Services() {
  const [active, setActive] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Built around <span className="font-light italic text-wood">your space.</span>
              </>
            }
            text="Eight core services, every one customised to size, material, finish and budget. Tap Explore on any card for full specifications."
          />
          <Reveal delay={0.2} className="hidden lg:block">
            <p className="max-w-[220px] border-l border-espresso/15 pl-5 text-[13px] leading-relaxed text-stone-warm">
              Repair &amp; modification of existing furniture is also available — ask on WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} i={i} onExplore={setActive} />
          ))}
        </div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
