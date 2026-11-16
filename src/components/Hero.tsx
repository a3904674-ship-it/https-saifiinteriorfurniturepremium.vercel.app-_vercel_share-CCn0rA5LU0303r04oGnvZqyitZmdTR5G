import { Suspense, lazy, Component, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowDown, MapPin } from "lucide-react";
import { useEnable3D } from "@/hooks/hooks";
import { WA_DEFAULT, BUSINESS, HERO_IMG, px } from "@/data/site";
import { Magnetic } from "./ui";

const HeroScene = lazy(() => import("@/three/HeroScene"));

/** If WebGL/three fails, quietly fall back to the still image. */
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

function WordReveal({
  text,
  delay = 0,
  italic = false,
}: {
  text: string;
  delay?: number;
  italic?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={italic ? "font-display italic font-light" : undefined}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: reduced ? 0 : "112%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const TRUST = [
  "Custom-made",
  "Premium finishing",
  "On-site execution",
  "Muzaffarnagar & nearby",
];

export default function Hero() {
  const enable3D = useEnable3D();
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-char text-cream"
      aria-label="Introduction"
    >
      {/* Still image — always present: acts as loader, mobile view & 3D fallback */}
      <div className="absolute inset-0" aria-hidden={enable3D}>
        <img
          src={px(HERO_IMG.id, 1920, 1150, HERO_IMG.ext)}
          alt={HERO_IMG.alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* 3D scene layers over the still when the device can handle it */}
      {enable3D && (
        <div className="absolute inset-0" aria-hidden="true">
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </SceneBoundary>
        </div>
      )}

      {/* Cinematic scrims */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(100deg, rgba(18,13,8,0.88) 0%, rgba(18,13,8,0.55) 42%, rgba(18,13,8,0.12) 72%, rgba(18,13,8,0.25) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(18,13,8,0.85), rgba(18,13,8,0))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,13,8,0.55), rgba(18,13,8,0))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-28 pt-32 sm:px-8 sm:pb-32 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brass-light"
        >
          <span className="h-px w-10 bg-brass-light/70" aria-hidden="true" />
          Custom Interior &middot; Furniture &middot; Woodwork
        </motion.div>

        <h1 className="max-w-5xl font-display text-[clamp(2.6rem,7.2vw,5.9rem)] font-medium leading-[1.02] tracking-[-0.015em] text-balance">
          <WordReveal text="Spaces made with" delay={0.25} />
          <br className="hidden sm:block" />
          <span className="text-brass-light">
            <WordReveal text="craft, detail" delay={0.55} italic />
          </span>{" "}
          <WordReveal text="&" delay={0.75} />{" "}
          <span className="text-brass-light">
            <WordReveal text="character." delay={0.85} italic />
          </span>
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-cream/75 sm:text-base"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
        >
          {BUSINESS.name}, led by <strong className="font-semibold text-cream">{BUSINESS.founder}</strong>,
          creates {BUSINESS.shortIntro}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <Magnetic>
            <a
              href="#quote"
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-cream px-8 py-[17px] text-[13px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors duration-300 hover:bg-brass-light"
            >
              Get a Free Quote
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[2px] border border-cream/40 px-8 py-[16px] text-[13px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-espresso"
            >
              <MessageCircle size={16} strokeWidth={1.9} />
              WhatsApp Us
            </a>
          </Magnetic>
        </motion.div>

        {/* Trust row */}
        <motion.ul
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.45 }}
          aria-label="Highlights"
        >
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/65"
            >
              <span className="h-1 w-1 rounded-full bg-brass-light" aria-hidden="true" />
              {t}
            </li>
          ))}
          <li className="ml-auto hidden items-center gap-2 text-[12px] font-medium tracking-wide text-cream/55 sm:flex">
            <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
            {BUSINESS.city}, {BUSINESS.state}
          </li>
        </motion.ul>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-0 right-6 z-10 hidden flex-col items-center gap-3 sm:right-10 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cream/55 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-cream/20" aria-hidden="true">
          <span className="animate-cue absolute left-0 top-0 h-1/2 w-px bg-brass-light" />
        </span>
        <ArrowDown size={13} className="text-cream/55" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
