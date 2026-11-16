import {
  type ReactNode,
  type HTMLAttributes,
  useRef,
} from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

/* ---------------------------------------------------------------- */
/* Reveal — scroll-triggered entrance                                */
/* ---------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



/* ---------------------------------------------------------------- */
/* Eyebrow + Section heading                                         */
/* ---------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  light,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
        light ? "text-brass-light" : "text-wood",
        className
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-brass-light/60" : "bg-wood/50")} />
      <span>{children}</span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  light,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  light?: boolean;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <Eyebrow
          light={light}
          className={cn(align === "center" && "justify-center")}
        >
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-5 font-display text-4xl leading-[1.06] font-medium tracking-[-0.01em] text-balance sm:text-5xl",
            light ? "text-cream" : "text-espresso"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-[15px] leading-relaxed text-pretty sm:text-base",
              light ? "text-cream/65" : "text-stone-warm"
            )}
          >
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Buttons                                                           */
/* ---------------------------------------------------------------- */

type ButtonProps = HTMLAttributes<HTMLElement> & {
  href?: string;
  variant?: "solid" | "outline" | "dark" | "ghost-light";
  children: ReactNode;
  external?: boolean;
};

const btnBase =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[2px] px-7 py-[15px] text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 select-none";

function BtnInner({ children }: { children: ReactNode }) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </span>
  );
}

export function Button({
  href,
  variant = "solid",
  children,
  external,
  className,
  ...rest
}: ButtonProps) {
  const styles = {
    solid:
      "bg-espresso text-cream hover:bg-wood",
    dark: "bg-cream text-espresso hover:bg-brass-light hover:text-espresso",
    outline:
      "border border-espresso/35 text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
    "ghost-light":
      "border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-espresso",
  }[variant];

  const cls = cn(btnBase, styles, className);

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as HTMLAttributes<HTMLAnchorElement>)}
      >
        <BtnInner>{children}</BtnInner>
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as HTMLAttributes<HTMLButtonElement>)}>
      <BtnInner>{children}</BtnInner>
    </button>
  );
}

/** Magnetic hover wrapper (desktop fine-pointer only via CSS checks inside) */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
