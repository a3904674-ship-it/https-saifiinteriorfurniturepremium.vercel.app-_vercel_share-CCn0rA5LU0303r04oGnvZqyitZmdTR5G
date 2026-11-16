import { Check, Ruler, Hammer, MapPin, Truck } from "lucide-react";
import { ABOUT_IMG, BUSINESS, px } from "@/data/site";
import { Reveal, SectionHead } from "./ui";

const VALUES = [
  {
    icon: Ruler,
    title: "Custom measurement",
    text: "Every piece starts from exact site dimensions — not catalogue sizes.",
  },
  {
    icon: Hammer,
    title: "Site-based execution",
    text: "The team works at your location; no showroom visit is ever required.",
  },
  {
    icon: Check,
    title: "Furniture & interior expertise",
    text: "Kitchens, bedrooms, storage, panels, ceilings and one-off furniture.",
  },
  {
    icon: Truck,
    title: "Outstation on request",
    text: "Work outside Muzaffarnagar is taken up on request, based on scope.",
  },
];

const CHECKLIST = [
  "Custom measurement & requirement discussion",
  "Kitchen, bedroom & storage work",
  "TV panels, wall paneling & furniture",
  "Repairing / modification work",
  "Outstation work available on request",
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-espresso/10 bg-linen py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <div className="relative order-2 lg:order-1">
            <Reveal className="relative">
              <figure className="relative overflow-hidden rounded-[3px]">
                <img
                  src={px(ABOUT_IMG.id, 1000, 1240)}
                  alt={ABOUT_IMG.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-char/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </figure>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="absolute -bottom-8 -right-3 w-[62%] border border-espresso/15 bg-cream p-6 shadow-[0_24px_50px_-24px_rgba(23,18,12,0.35)] sm:-right-8 sm:w-[54%]">
                <p className="font-display text-[19px] font-medium leading-snug text-espresso">
                  &ldquo;Furniture made around the room&rsquo;s dimensions and the
                  customer&rsquo;s vision.&rdquo;
                </p>
                <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-warm">
                  <span className="h-px w-6 bg-wood/60" aria-hidden="true" />
                  Practical design, clean finishing
                </p>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHead
              eyebrow="About the business"
              title={
                <span id="about-heading">
                  Led by{" "}
                  <span className="font-light italic text-wood">
                    {BUSINESS.founder}.
                  </span>
                </span>
              }
              text={`${BUSINESS.name} is a site-based custom interior and furniture service in ${BUSINESS.city}. The focus is practical design, clean finishing, and furniture made around the customer's room dimensions and requirements.`}
            />

            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-3">
                {CHECKLIST.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3.5 border-b border-espresso/10 pb-3 text-[14.5px] font-medium text-espresso/85"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-wood/40 text-wood">
                      <Check size={13} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={0.1 + i * 0.06}>
                  <div className="group h-full border border-espresso/12 bg-cream p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(23,18,12,0.3)]">
                    <v.icon
                      size={20}
                      strokeWidth={1.6}
                      className="text-wood"
                      aria-hidden="true"
                    />
                    <h3 className="mt-3 font-display text-[17px] font-medium text-espresso">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-stone-warm">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 flex items-start gap-2.5 text-[13px] leading-relaxed text-stone-warm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-wood" aria-hidden="true" />
                Based in {BUSINESS.city}, {BUSINESS.state}. Working across{" "}
                Shamli, Meerut, Saharanpur, Bijnor and Delhi / NCR on request.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
