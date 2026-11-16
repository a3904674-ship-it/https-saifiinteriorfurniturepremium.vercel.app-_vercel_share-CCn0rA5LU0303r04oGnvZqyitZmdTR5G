import { useRef, useState, useCallback } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { BEFORE_AFTER, px } from "@/data/site";
import { Reveal, SectionHead } from "./ui";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  return (
    <section className="bg-cream py-24 sm:py-32" aria-labelledby="ba-heading">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead
            eyebrow="Before / After"
            title={
              <>
                <span id="ba-heading">Plain room,</span>{" "}
                <span className="font-light italic text-wood">
                  planned space.
                </span>
              </>
            }
            text="Drag the handle to compare. This is a representative visualisation using reference photography — it shows the kind of transformation a measured, panelled and furnished interior brings. Genuine Saifi before/after photos will be published here as projects complete."
          />

          <Reveal delay={0.1}>
            <div
              ref={trackRef}
              className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-[3px] border border-espresso/15"
              onPointerDown={onPointerDown}
              onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              {/* After (bottom layer) */}
              <img
                src={px(BEFORE_AFTER.afterId, 1600, 1000)}
                alt={BEFORE_AFTER.afterAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              {/* Before (clipped top layer) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  src={px(BEFORE_AFTER.beforeId, 1600, 1000)}
                  alt={BEFORE_AFTER.beforeAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>

              {/* Labels */}
              <span className="absolute left-4 top-4 rounded-full bg-char/65 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                Before
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-char/65 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                After
              </span>

              {/* Divider + handle */}
              <div
                className="absolute inset-y-0 z-10"
                style={{ left: `${pos}%` }}
                aria-hidden="true"
              >
                <div className="absolute inset-y-0 -left-px w-0.5 bg-cream shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
              </div>
              <button
                type="button"
                role="slider"
                aria-label="Before and after comparison position"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                aria-orientation="horizontal"
                className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/60 bg-char/70 text-cream backdrop-blur-sm transition-transform hover:scale-105"
                style={{ left: `${pos}%` }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
                }}
              >
                <ChevronsLeftRight size={18} strokeWidth={1.8} />
              </button>
            </div>
            <p className="mt-3 text-[11px] tracking-wide text-stone-warm/80">
              Representative visual only &middot; reference photography by{" "}
              {BEFORE_AFTER.credit} / Pexels &middot; not a Saifi project.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
