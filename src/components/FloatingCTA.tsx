import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/hooks";
import { TEL_LINK, WA_DEFAULT } from "@/data/site";

/** Mobile sticky contact bar — appears after the hero, respects safe areas. */
export default function FloatingCTA() {
  const past = useScrolled(720);
  return (
    <>
      {/* Mobile bar */}
      <AnimatePresence>
        {past && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[60] flex gap-2 border-t border-espresso/10 bg-cream/95 p-2.5 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden"
            role="complementary"
            aria-label="Quick contact"
          >
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-[2px] bg-espresso py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={TEL_LINK}
              className="flex flex-1 items-center justify-center gap-2 rounded-[2px] border border-espresso/30 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-espresso"
            >
              <Phone size={15} aria-hidden="true" />
              Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop floating WhatsApp */}
      <AnimatePresence>
        {past && (
          <motion.a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-6 right-6 z-[60] hidden h-14 w-14 place-items-center rounded-full bg-[#1f3d2b] text-cream shadow-[0_14px_30px_-8px_rgba(23,18,12,0.5)] transition-transform hover:scale-105 sm:grid"
          >
            <span className="animate-soft-pulse absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#4ade80] ring-2 ring-cream" aria-hidden="true" />
            <MessageCircle size={22} strokeWidth={1.8} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
