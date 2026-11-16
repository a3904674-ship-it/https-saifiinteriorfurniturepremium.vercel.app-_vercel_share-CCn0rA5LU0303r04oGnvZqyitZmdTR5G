import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  PencilLine,
  Send,
} from "lucide-react";
import { BUSINESS, SERVICES, TEL_LINK, waLink, WA_DEFAULT } from "@/data/site";
import { Reveal, SectionHead } from "./ui";
import { cn } from "@/utils/cn";

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "Above ₹3,00,000",
  "Not sure yet — need guidance",
];

interface FormState {
  name: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  city: "",
  service: "",
  budget: "",
  message: "",
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 3)
    e.name = "Please enter your full name (at least 3 characters).";
  const digits = f.phone.replace(/[\s\-+]/g, "");
  if (!/^(?:91)?[6-9]\d{9}$/.test(digits))
    e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (f.city.trim().length < 2) e.city = "Please tell us your city / location.";
  if (!f.service) e.service = "Please choose a service.";
  return e;
}

function buildMessage(f: FormState) {
  const lines = [
    "*New enquiry — Saifi Interior & Furniture*",
    "",
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `City / Location: ${f.city.trim()}`,
    `Service required: ${f.service}`,
  ];
  if (f.budget) lines.push(`Approximate budget: ${f.budget}`);
  if (f.message.trim()) lines.push(`Message: ${f.message.trim()}`);
  lines.push("", "— Sent from the website enquiry form");
  return lines.join("\n");
}

function Field({
  id,
  label,
  required,
  error,
  children,
  optional,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between text-[12px] font-semibold uppercase tracking-[0.16em] text-espresso/80"
      >
        <span>
          {label}
          {required && (
            <span className="ml-1 text-wood" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {optional && (
          <span className="text-[10px] font-medium normal-case tracking-wide text-stone-warm/70">
            optional
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#b3402e]"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Quote() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState<string>(WA_DEFAULT);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    const url = waLink(buildMessage(form));
    setWaUrl(url);
    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() =>
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  };

  const inputProps = (k: keyof FormState) => ({
    id: `q-${k}`,
    value: form[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `q-${k}-error` : undefined,
  });

  return (
    <section
      id="quote"
      className="scroll-mt-20 bg-cream py-24 sm:py-32"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[3px] border border-espresso/12">
          <div className="grid lg:grid-cols-[1fr_1.25fr]">
            {/* Contact panel */}
            <div className="flex flex-col justify-between gap-10 bg-espresso p-8 text-cream sm:p-12">
              <div>
                <SectionHead
                  light
                  eyebrow="Start your project"
                  title={
                    <span id="quote-heading">
                      Get a quick{" "}
                      <span className="font-light italic text-brass-light">quote.</span>
                    </span>
                  }
                  text="Fill the form and it opens WhatsApp with a ready-made message for Javed Saifi — no accounts, no spam, no obligation."
                />
              </div>

              <ul className="grid gap-5">
                <li>
                  <a
                    href={WA_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-cream/25 transition-colors group-hover:bg-cream group-hover:text-espresso">
                      <MessageCircle size={17} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                        WhatsApp
                      </span>
                      <span className="block text-[15.5px] font-semibold tracking-wide">
                        {BUSINESS.whatsappDisplay}
                      </span>
                    </span>
                    <span
                      className="animate-soft-pulse ml-1 h-1.5 w-1.5 rounded-full bg-[#4ade80]"
                      aria-label="Usually responsive"
                    />
                  </a>
                </li>
                <li>
                  <a href={TEL_LINK} className="group flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-cream/25 transition-colors group-hover:bg-cream group-hover:text-espresso">
                      <Phone size={17} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                        Call directly
                      </span>
                      <span className="block text-[15.5px] font-semibold tracking-wide">
                        {BUSINESS.callDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-cream/25">
                    <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                      Location
                    </span>
                    <span className="block text-[15.5px] font-semibold tracking-wide">
                      {BUSINESS.city}, {BUSINESS.state} — we visit your site
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-cream/25">
                    <Clock size={17} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                      Working style
                    </span>
                    <span className="block text-[15.5px] font-semibold tracking-wide">
                      Site visits &amp; measurements by appointment
                    </span>
                  </span>
                </li>
              </ul>

              <p className="border-t border-cream/12 pt-6 text-[12px] leading-relaxed text-cream/50">
                Prefer talking? Call or WhatsApp any time — if the line is busy,
                leave a message and you will get a call back.
              </p>
            </div>

            {/* Form panel */}
            <div className="bg-cream p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    ref={summaryRef}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="flex h-full flex-col justify-center"
                    aria-live="polite"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e9f6ec] text-[#2e7d4f]">
                      <CheckCircle2 size={26} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl font-medium text-espresso">
                      Your enquiry is ready in WhatsApp.
                    </h3>
                    <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-stone-warm">
                      A new WhatsApp window has opened with your message addressed to{" "}
                      <strong className="font-semibold text-espresso">
                        {BUSINESS.whatsappDisplay}
                      </strong>
                      . Just press send there — your details below (they are safe and
                      still editable here):
                    </p>
                    <dl className="mt-7 grid gap-2.5 border-y border-espresso/12 py-6 text-[14px]">
                      {(
                        [
                          ["Name", form.name, "text"],
                          ["Phone", form.phone, "tel"],
                          ["City / Location", form.city, "text"],
                          ["Service", form.service, "text"],
                          ["Budget", form.budget, "text"],
                          ["Message", form.message, "text"],
                        ] as const
                      ).map(
                        ([k, v]) =>
                          v && (
                            <div key={k} className="flex gap-3">
                              <dt className="w-32 shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-stone-warm">
                                {k}
                              </dt>
                              <dd className="font-medium text-espresso">{v}</dd>
                            </div>
                          )
                      )}
                    </dl>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-[2px] bg-espresso px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-wood"
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                        Open WhatsApp again
                      </a>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="inline-flex items-center gap-2.5 rounded-[2px] border border-espresso/30 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-espresso hover:text-cream"
                      >
                        <PencilLine size={15} aria-hidden="true" />
                        Edit details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm(EMPTY);
                          setSent(false);
                        }}
                        className="inline-flex items-center gap-2.5 rounded-[2px] border border-transparent px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-stone-warm transition-colors hover:text-espresso"
                      >
                        New enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="grid gap-5"
                    aria-label="Enquiry form"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="q-name" label="Name" required error={errors.name}>
                        <input
                          {...inputProps("name")}
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          className="field"
                        />
                      </Field>
                      <Field id="q-phone" label="Phone" required error={errors.phone}>
                        <input
                          {...inputProps("phone")}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="10-digit mobile number"
                          className="field"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="q-city" label="City / Location" required error={errors.city}>
                        <input
                          {...inputProps("city")}
                          type="text"
                          autoComplete="address-level2"
                          placeholder="e.g. Muzaffarnagar"
                          className="field"
                        />
                      </Field>
                      <Field id="q-service" label="Service required" required error={errors.service}>
                        <select {...inputProps("service")} className={cn("field", !form.service && "text-stone-warm/60")}>
                          <option value="" disabled>
                            Select a service
                          </option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Full home interior">Full home interior</option>
                          <option value="Repair / modification">Repair / modification</option>
                          <option value="Other">Other / not sure</option>
                        </select>
                      </Field>
                    </div>
                    <Field id="q-budget" label="Approximate budget" optional>
                      <select {...inputProps("budget")} className={cn("field", !form.budget && "text-stone-warm/60")}>
                        <option value="">Choose a range (optional)</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="q-message" label="Tell us about your space" optional>
                      <textarea
                        {...inputProps("message")}
                        rows={4}
                        placeholder="Room sizes, what you want built, any reference links…"
                        className="field resize-none"
                      />
                    </Field>

                    {Object.keys(errors).length > 0 && (
                      <p
                        role="alert"
                        className="flex items-center gap-2 border border-[#b3402e]/30 bg-[#b3402e]/5 px-4 py-3 text-[13px] font-medium text-[#b3402e]"
                      >
                        <AlertCircle size={15} aria-hidden="true" />
                        Please fix the highlighted fields — nothing has been lost.
                      </p>
                    )}

                    <Reveal y={12}>
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-3 rounded-[2px] bg-espresso py-[18px] text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-wood"
                      >
                        Get My Free Quote
                        <Send
                          size={15}
                          strokeWidth={1.9}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                      <p className="mt-3 text-center text-[11.5px] tracking-wide text-stone-warm/80">
                        Submitting opens WhatsApp with your message ready — your
                        details stay right here if anything goes wrong.
                      </p>
                    </Reveal>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
