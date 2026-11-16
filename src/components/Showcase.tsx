import { Suspense, lazy, useState, Component, type ReactNode } from "react";
import { RotateCw, MousePointerClick, ZoomIn, Box } from "lucide-react";
import {
  WOOD_FINISHES,
  LAMINATES,
  WALL_COLORS,
  HANDLE_STYLES,
  px,
  type Finish,
} from "@/data/site";
import type { ConfigState } from "@/three/Configurator";
import { SectionHead, Reveal } from "./ui";
import { useEnable3D, useInView } from "@/hooks/hooks";
import { cn } from "@/utils/cn";

const Configurator = lazy(() => import("@/three/Configurator"));

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Swatch({
  item,
  active,
  onSelect,
  groupLabel,
}: {
  item: Finish;
  active: boolean;
  onSelect: () => void;
  groupLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${groupLabel}: ${item.label}`}
      title={item.label}
      className={cn(
        "group flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 transition-all duration-300",
        active
          ? "border-brass-light bg-cream/10"
          : "border-cream/20 hover:border-cream/50"
      )}
    >
      <span
        className={cn(
          "h-6 w-6 rounded-full border transition-transform duration-300",
          active ? "scale-110 border-brass-light" : "border-cream/25"
        )}
        style={{ background: item.hex }}
        aria-hidden="true"
      />
      <span className="text-[11px] font-semibold tracking-wide text-cream/85">
        {item.label}
      </span>
    </button>
  );
}

export default function Showcase() {
  const enable3D = useEnable3D(768);
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "320px",
  });
  const [wood, setWood] = useState(WOOD_FINISHES[1]);
  const [laminate, setLaminate] = useState(LAMINATES[0]);
  const [wall, setWall] = useState(WALL_COLORS[0]);
  const [handle, setHandle] = useState<ConfigState["handle"]>("brass");

  const config: ConfigState = { wood, laminate, wall, handle };
  const show3D = enable3D && inView;

  return (
    <section
      id="showcase"
      className="scroll-mt-20 bg-char py-24 text-cream sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            light
            eyebrow="3D Showcase"
            title={
              <>
                Experience{" "}
                <span className="font-light italic text-brass-light">the design.</span>
              </>
            }
            text="Rotate, zoom and inspect a concept media-wall — then change its wood finish, console laminate, wall colour and handle style. Exactly the kind of decisions we walk through together before your build."
          />
          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/70">
              <Box size={13} className="text-brass-light" aria-hidden="true" />
              Concept model &middot; TV panel wall unit
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          {/* Viewport */}
          <Reveal className="relative">
            <div
              ref={ref}
              className="relative aspect-[4/3.4] overflow-hidden rounded-[3px] border border-cream/12 bg-[#211a13] sm:aspect-[16/11]"
            >
              {/* Fallback / loading still */}
              <img
                src={px(6585766, 1280, 860)}
                alt="Television on a wooden panelled media wall — concept reference"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {show3D && (
                <SceneBoundary>
                  <Suspense fallback={null}>
                    <Configurator config={config} />
                  </Suspense>
                </SceneBoundary>
              )}

              {/* Hints */}
              {show3D ? (
                <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                  {[
                    { icon: RotateCw, label: "Drag to rotate" },
                    { icon: ZoomIn, label: "Pinch / scroll to zoom" },
                    { icon: MousePointerClick, label: "Auto-rotating" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 rounded-full bg-char/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/80 backdrop-blur-sm"
                    >
                      <Icon size={11} aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-char/80 to-transparent p-5">
                  <p className="text-[12px] font-medium tracking-wide text-cream/80">
                    The interactive 3D viewer appears here on supported devices —
                    rotate, zoom and switch finishes to taste.
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal delay={0.1} className="flex">
            <div className="flex w-full flex-col justify-center gap-7 rounded-[3px] border border-cream/12 bg-[#1d1712] p-6 sm:p-8">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
                  Wood finish — panel &amp; shelves
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WOOD_FINISHES.map((f) => (
                    <Swatch
                      key={f.id}
                      item={f}
                      groupLabel="Wood finish"
                      active={wood.id === f.id}
                      onSelect={() => setWood(f)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
                  Console laminate
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {LAMINATES.map((f) => (
                    <Swatch
                      key={f.id}
                      item={f}
                      groupLabel="Console laminate"
                      active={laminate.id === f.id}
                      onSelect={() => setLaminate(f)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
                  Wall colour
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WALL_COLORS.map((f) => (
                    <Swatch
                      key={f.id}
                      item={f}
                      groupLabel="Wall colour"
                      active={wall.id === f.id}
                      onSelect={() => setWall(f)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-light">
                  Handle style
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {HANDLE_STYLES.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      aria-pressed={handle === h.id}
                      onClick={() => setHandle(h.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300",
                        handle === h.id
                          ? "border-brass-light bg-cream/10 text-cream"
                          : "border-cream/20 text-cream/75 hover:border-cream/50"
                      )}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="border-t border-cream/10 pt-5 text-[11.5px] leading-relaxed text-cream/45">
                Indicative visualisation only — real plywood, laminate and polish
                samples are shown in person before any work begins.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
