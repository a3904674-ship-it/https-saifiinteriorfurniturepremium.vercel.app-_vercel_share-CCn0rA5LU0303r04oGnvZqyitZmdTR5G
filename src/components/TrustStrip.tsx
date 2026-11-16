const ITEMS = [
  "Custom-made to your space",
  "Premium finishing",
  "On-site execution",
  "Exact site measurement",
  "Transparent enquiry",
  "Muzaffarnagar & nearby cities",
];

export default function TrustStrip() {
  return (
    <section
      className="overflow-hidden border-b border-espresso/10 bg-linen py-5"
      aria-label="Service highlights"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex items-center"
            aria-hidden={copy === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 pr-8 text-[12px] font-semibold uppercase tracking-[0.24em] text-espresso/60"
              >
                {item}
                <span
                  className="h-[5px] w-[5px] rotate-45 border border-wood/60"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
