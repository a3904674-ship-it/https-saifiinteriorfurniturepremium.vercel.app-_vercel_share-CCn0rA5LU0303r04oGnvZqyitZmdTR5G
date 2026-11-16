import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MessageCircle,
  Maximize2,
} from "lucide-react";
import {
  GALLERY,
  GALLERY_FILTERS,
  px,
  waLink,
  type GalleryCategory,
} from "@/data/site";
import { Reveal, SectionHead } from "./ui";
import { useLockBody } from "@/hooks/hooks";
import { cn } from "@/utils/cn";

type Filter = "All" | GalleryCategory;

/* ---------------------------------------------------------------- */
/* Lightbox                                                          */
/* ---------------------------------------------------------------- */

function Lightbox({
  index,
  items,
  onClose,
  onNav,
}: {
  index: number;
  items: typeof GALLERY;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useLockBody(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col bg-char/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer — ${item.alt}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-4 text-cream sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs tracking-widest text-cream/60">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="hidden rounded-full border border-cream/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/70 sm:inline">
          Design inspiration &middot; Reference photo
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="grid h-11 w-11 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-char"
        >
          <X size={18} strokeWidth={1.7} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-2 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id + item.category}
            src={px(item.id, 1600, 1100)}
            srcSet={`${px(item.id, 800, 550)} 800w, ${px(item.id, 1600, 1100)} 1600w`}
            sizes="(max-width: 800px) 90vw, 80vw"
            alt={item.alt}
            className="max-h-full max-w-full rounded-[2px] object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            decoding="async"
          />
        </AnimatePresence>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => onNav(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-char sm:left-6"
        >
          <ChevronLeft size={20} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          onClick={() => onNav(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-char sm:right-6"
        >
          <ChevronRight size={20} strokeWidth={1.7} />
        </button>
      </div>

      {/* Caption */}
      <div
        className="px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-2 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mx-auto max-w-xl text-[13px] leading-relaxed text-cream/70">
          {item.alt}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
          {item.category} &middot; Photo: {item.credit} / Pexels
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Our Work — honest state (no fake projects)                        */
/* ---------------------------------------------------------------- */

function ElevationSketch({ variant }: { variant: "wardrobe" | "kitchen" | "panel" }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className="h-full w-full text-cream/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {variant === "wardrobe" && (
        <>
          <rect x="45" y="14" width="110" height="112" />
          <line x1="100" y1="14" x2="100" y2="126" />
          <line x1="72" y1="26" x2="72" y2="70" />
          <line x1="128" y1="26" x2="128" y2="70" />
          <rect x="55" y="26" width="34" height="44" strokeDasharray="3 3" />
          <rect x="111" y="26" width="34" height="44" strokeDasharray="3 3" />
          <rect x="55" y="78" width="90" height="14" strokeDasharray="3 3" />
          <rect x="55" y="96" width="90" height="14" strokeDasharray="3 3" />
          <line x1="30" y1="134" x2="170" y2="134" strokeDasharray="4 4" />
        </>
      )}
      {variant === "kitchen" && (
        <>
          <rect x="25" y="44" width="150" height="66" />
          <rect x="25" y="20" width="44" height="20" />
          <rect x="77" y="20" width="44" height="20" />
          <line x1="69" y1="44" x2="69" y2="110" />
          <line x1="118" y1="44" x2="118" y2="110" />
          <rect x="126" y="52" width="36" height="18" strokeDasharray="3 3" />
          <circle cx="47" cy="60" r="8" strokeDasharray="3 3" />
          <line x1="15" y1="118" x2="185" y2="118" strokeDasharray="4 4" />
        </>
      )}
      {variant === "panel" && (
        <>
          <rect x="30" y="16" width="140" height="92" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={46 + i * 14} y1="16" x2={46 + i * 14} y2="108" strokeDasharray="2 3" />
          ))}
          <rect x="78" y="40" width="46" height="28" />
          <rect x="62" y="112" width="78" height="12" />
          <line x1="20" y1="132" x2="182" y2="132" strokeDasharray="4 4" />
        </>
      )}
    </svg>
  );
}

function OurWorkNote() {
  return (
    <Reveal>
      <div className="mt-14 overflow-hidden border border-espresso/12 bg-espresso text-cream">
        <div className="grid lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
              <Camera size={14} strokeWidth={1.8} aria-hidden="true" />
              Genuine project portfolio
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium leading-snug sm:text-3xl">
              Real Saifi project photos are being collected&nbsp;&mdash; nothing fake here.
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-cream/65">
              Every completed kitchen, wardrobe and panel goes here once its project
              photography is ready — clearly labelled, never mixed with reference
              images. Until then, ask on WhatsApp and we will share recent work
              photos directly from site.
            </p>
            <a
              href={waLink(
                "Hello, I would like to see photos of recent completed work by Saifi Interior & Furniture."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-2.5 rounded-[2px] bg-cream px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-brass-light"
            >
              <MessageCircle size={15} strokeWidth={1.9} />
              See recent work on WhatsApp
            </a>
          </div>
          <div className="grid grid-cols-3 border-t border-cream/10 lg:border-l lg:border-t-0">
            {(["wardrobe", "kitchen", "panel"] as const).map((v) => (
              <div
                key={v}
                className="group relative aspect-square border-r border-cream/10 p-5 last:border-r-0 sm:p-8"
              >
                <ElevationSketch variant={v} />
                <span className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-cream/35">
                  Awaiting photo
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */
/* Gallery section                                                   */
/* ---------------------------------------------------------------- */

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  const nav = (dir: 1 | -1) =>
    setLightbox((i) =>
      i === null ? null : (i + dir + items.length) % items.length
    );

  return (
    <section id="work" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Our work"
          title={
            <>
              Honest portfolio.{" "}
              <span className="font-light italic text-wood">Real craft.</span>
            </>
          }
          text="We show exactly what is real. Completed Saifi projects will live below this note the moment their site photography is ready — and reference imagery stays clearly labelled, always."
        />

        <OurWorkNote />

        {/* Divider */}
        <div className="mt-20 border-t border-espresso/12 pt-14">
          <SectionHead
            eyebrow="Design inspiration"
            title={
              <>
                Direction for{" "}
                <span className="font-light italic text-wood">your brief.</span>
              </>
            }
            text="A curated mood-board of design-reference photography (Pexels) for the styles we build. These are inspiration images — not Saifi completed work — shared so you can point at a look and say: like this."
          />

          {/* Filters */}
          <Reveal delay={0.15}>
            <div
              className="mt-9 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter inspiration gallery by category"
            >
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => {
                    setFilter(f);
                    setLightbox(null);
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                    filter === f
                      ? "border-espresso bg-espresso text-cream"
                      : "border-espresso/20 text-espresso/70 hover:border-espresso/50 hover:text-espresso"
                  )}
                >
                  {f}
                  <span className="ml-1.5 font-mono text-[9px] opacity-60">
                    {f === "All"
                      ? GALLERY.length
                      : GALLERY.filter((g) => g.category === f).length}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Masonry grid */}
          <motion.div
            layout
            className="masonry mt-10 columns-2 md:columns-3 xl:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.figure
                  layout
                  key={item.id}
                  className="group relative mb-5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.04, 0.4),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="relative block w-full overflow-hidden border border-espresso/10 text-left"
                    aria-label={`View larger: ${item.alt}`}
                  >
                    <img
                      src={px(item.id, 640, 640 + (i % 4) * 160)}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-char/70 via-char/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream">
                        {item.category}
                      </span>
                      <Maximize2 size={14} className="text-cream" aria-hidden="true" />
                    </span>
                  </button>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="mt-8 text-center text-[11.5px] leading-relaxed tracking-wide text-stone-warm/80">
            All photographs above are design-reference / inspiration imagery sourced from
            free-to-use Pexels photography by their respective creators. They are not
            presented as completed work by {`Saifi Interior & Furniture`}.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            index={lightbox}
            items={items}
            onClose={() => setLightbox(null)}
            onNav={nav}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
