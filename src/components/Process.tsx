import { motion, useReducedMotion } from "framer-motion";
import { PROCESS, CRAFT_IMG, px } from "@/data/site";
import { Reveal, SectionHead } from "./ui";
import { useInView } from "@/hooks/hooks";

function Step({
  no,
  title,
  text,
  i,
}: {
  no: string;
  title: string;
  text: string;
  i: number;
}) {
  return (
    <Reveal delay={Math.min(i * 0.05, 0.25)}>
      <li className="group relative flex gap-6 border-t border-cream/12 py-7 sm:gap-10">
        <span className="font-mono text-sm text-brass-light/90">{no}</span>
        <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h3 className="min-w-[180px] font-display text-xl font-medium text-cream transition-colors duration-300 group-hover:text-brass-light sm:text-2xl">
            {title}
          </h3>
          <p className="max-w-md flex-1 text-[13.5px] leading-relaxed text-cream/60">
            {text}
          </p>
        </div>
      </li>
    </Reveal>
  );
}

export default function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const reduced = useReducedMotion();

  return (
    <section className="bg-espresso py-24 text-cream sm:py-32" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              light
              eyebrow="How we work"
              title={
                <span id="process-heading">
                  Seven steps,{" "}
                  <span className="font-light italic text-brass-light">
                    zero guesswork.
                  </span>
                </span>
              }
              text="A transparent, site-first process from the first call to the final finishing check. You always know what stage your work is at — and what it costs."
            />
            <Reveal delay={0.2}>
              <figure className="mt-10 hidden overflow-hidden rounded-[3px] border border-cream/12 lg:block">
                <img
                  src={px(CRAFT_IMG.id, 900, 620)}
                  alt={CRAFT_IMG.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
                />
                <figcaption className="border-t border-cream/12 px-4 py-3 text-[11px] tracking-wide text-cream/45">
                  Precision cutting for a custom build &middot; workshop photograph
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            {/* progress spine */}
            <div
              className="absolute bottom-6 left-0 top-2 hidden w-px bg-cream/10 md:block"
              aria-hidden="true"
            >
              <motion.div
                className="w-px origin-top bg-brass-light"
                initial={{ height: "0%" }}
                animate={inView ? { height: "100%" } : {}}
                transition={{
                  duration: reduced ? 0 : 2.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            <ol className="grid gap-0 md:pl-10">
              {PROCESS.map((s, i) => (
                <Step key={s.no} {...s} i={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
