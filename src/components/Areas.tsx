import { useState } from "react";
import { MapPin } from "lucide-react";
import { AREAS } from "@/data/site";
import { Reveal, SectionHead } from "./ui";
import { cn } from "@/utils/cn";

/**
 * Decorative node positions (abstract arrangement — NOT geographic).
 * viewBox 800x520. Center: Muzaffarnagar.
 */
const NODES: Record<string, { x: number; y: number }> = {
  Muzaffarnagar: { x: 400, y: 260 },
  Shamli: { x: 175, y: 175 },
  Meerut: { x: 610, y: 120 },
  Saharanpur: { x: 545, y: 410 },
  Bijnor: { x: 640, y: 265 },
  "Delhi / NCR": { x: 220, y: 405 },
};

export default function Areas() {
  const [active, setActive] = useState<string | null>(null);
  const center = NODES["Muzaffarnagar"];

  return (
    <section
      id="areas"
      className="scroll-mt-20 border-t border-espresso/10 bg-ivory py-24 sm:py-32"
      aria-labelledby="areas-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Where we work"
          title={
            <span id="areas-heading">
              {`Muzaffarnagar first. `}
              <span className="font-light italic text-wood">
                Nearby by request.
              </span>
            </span>
          }
          text="We work at the customer's site — there is no showroom requirement. The team visits your location, understands the requirement and executes the work on site."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Abstract network visual */}
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[3px] border border-espresso/12 bg-espresso p-2"
              role="img"
              aria-label="Decorative diagram connecting Muzaffarnagar with Shamli, Meerut, Saharanpur, Bijnor and Delhi / NCR. Not to scale."
            >
              <svg viewBox="0 0 800 520" className="h-auto w-full">
                {/* faint grid */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 57}
                    y1="0"
                    x2={i * 57}
                    y2="520"
                    stroke="rgba(250,247,241,0.045)"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={i * 57}
                    x2="800"
                    y2={i * 57}
                    stroke="rgba(250,247,241,0.045)"
                    strokeWidth="1"
                  />
                ))}

                {/* connection lines */}
                {AREAS.filter((a) => !a.primary).map((a) => {
                  const n = NODES[a.name];
                  const isActive = active === a.name || active === null;
                  return (
                    <line
                      key={a.name}
                      x1={center.x}
                      y1={center.y}
                      x2={n.x}
                      y2={n.y}
                      stroke={
                        active === a.name ? "#cfa96f" : "rgba(207,169,111,0.4)"
                      }
                      strokeWidth={active === a.name ? 1.8 : 1}
                      strokeDasharray="5 7"
                      opacity={isActive ? 1 : 0.3}
                      className="transition-all duration-500"
                    />
                  );
                })}

                {/* satellite nodes */}
                {AREAS.filter((a) => !a.primary).map((a) => {
                  const n = NODES[a.name];
                  return (
                    <g
                      key={a.name}
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(a.name)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={active === a.name ? 10 : 7}
                        fill={active === a.name ? "#cfa96f" : "#3a2d1f"}
                        stroke="#cfa96f"
                        strokeWidth="1.4"
                        className="transition-all duration-300"
                      />
                      <text
                        x={n.x}
                        y={n.y - 20}
                        textAnchor="middle"
                        fill={active === a.name ? "#faf7f1" : "rgba(250,247,241,0.75)"}
                        fontSize="15"
                        fontWeight="600"
                        letterSpacing="1.5"
                        className="uppercase transition-all duration-300"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {a.name}
                      </text>
                      <text
                        x={n.x}
                        y={n.y + 28}
                        textAnchor="middle"
                        fill="rgba(250,247,241,0.4)"
                        fontSize="10"
                        letterSpacing="2"
                        className="uppercase"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {a.note}
                      </text>
                    </g>
                  );
                })}

                {/* center node */}
                <g
                  onMouseEnter={() => setActive("Muzaffarnagar")}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r="44"
                    fill="none"
                    stroke="rgba(207,169,111,0.35)"
                    strokeWidth="1"
                    className="animate-spin-slow origin-center"
                    strokeDasharray="4 10"
                    style={{
                      transformOrigin: `${center.x}px ${center.y}px`,
                    }}
                  />
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r="26"
                    fill="none"
                    stroke="rgba(207,169,111,0.5)"
                    strokeWidth="1"
                  />
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r="13"
                    fill="#cfa96f"
                    stroke="#17120c"
                    strokeWidth="2"
                  />
                  <text
                    x={center.x}
                    y={center.y - 58}
                    textAnchor="middle"
                    fill="#faf7f1"
                    fontSize="18"
                    fontWeight="700"
                    letterSpacing="2"
                    className="uppercase"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Muzaffarnagar
                  </text>
                  <text
                    x={center.x}
                    y={center.y + 72}
                    textAnchor="middle"
                    fill="rgba(207,169,111,0.9)"
                    fontSize="10.5"
                    letterSpacing="3"
                    className="uppercase"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Primary service city
                  </text>
                </g>
              </svg>
              <p className="absolute bottom-4 right-4 rounded-full bg-char/70 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/50">
                Decorative diagram &middot; not to scale
              </p>
            </div>
          </Reveal>

          {/* City list */}
          <Reveal delay={0.12} className="flex">
            <ul className="flex w-full flex-col justify-center divide-y divide-espresso/10 rounded-[3px] border border-espresso/12 bg-cream">
              {AREAS.map((a) => (
                <li key={a.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(a.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(a.name)}
                    onBlur={() => setActive(null)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-6 py-[22px] text-left transition-colors duration-300",
                      active === a.name && "bg-linen"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <MapPin
                        size={17}
                        strokeWidth={1.7}
                        className={cn(
                          "shrink-0 transition-colors",
                          a.primary ? "text-wood" : "text-taupe"
                        )}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-display text-[19px] font-medium text-espresso">
                          {a.name}
                        </span>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-stone-warm">
                          {a.note}
                        </span>
                      </span>
                    </span>
                    {a.primary && (
                      <span className="rounded-full border border-wood/40 px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-wood">
                        Base
                      </span>
                    )}
                  </button>
                </li>
              ))}
              <li className="px-6 py-5 text-[12.5px] leading-relaxed text-stone-warm">
                Outside these cities? Ask anyway — outstation work is taken up on
                request depending on project scope.
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
