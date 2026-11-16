import { useEffect, useRef, useState } from "react";

/** True when the user prefers reduced motion */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Reactive media query */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Scroll position past a threshold */
export function useScrolled(threshold = 32) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > threshold));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);
  return scrolled;
}

/** IntersectionObserver — once-only or continuous */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { once = false, ...init } = options ?? {};
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12, ...init }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

/** Lock body scroll (mobile menu / lightbox / modal) */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/** Detect serviceable WebGL */
export function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      (window.WebGL2RenderingContext && c.getContext("webgl2")) ||
      c.getContext("webgl")
    );
  } catch {
    return false;
  }
}

/** Should we mount heavy 3D? Respects motion, data-saver, device width. */
export function useEnable3D(minWidth = 1024) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery(`(min-width: ${minWidth}px)`);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveData = !!conn?.saveData;
    const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setOk(!reduced && wide && finePointer && !saveData && !slow && canWebGL());
  }, [reduced, wide]);
  return ok;
}
