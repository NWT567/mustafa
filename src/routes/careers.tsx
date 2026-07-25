import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Coffee,
  Croissant,
  HandHeart,
  Users,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Join the Mustafa Coffee House team. We hire for warmth first and train the rest - baristas, bakers, and front-of-house.",
      },
      { property: "og:title", content: "Careers - Mustafa Coffee House" },
      {
        property: "og:description",
        content: "Warmth first. Craft second. Apply to join the MCH team.",
      },
    ],
  }),
  component: CareersPage,
});

const POSITIONS = [
  "Barista",
  "Baker",
  "Front-of-House",
  "Shift Lead",
  "Roaster Assistant",
  "General Manager",
] as const;

const schema = z.object({
  firstName: z.string().trim().min(2, "Required").max(60),
  lastName: z.string().trim().min(2, "Required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  position: z.enum(POSITIONS, { message: "Select a position" }),
  why: z.string().trim().max(1000).optional().or(z.literal("")),
});

type Errors = Partial<Record<string, string>>;

function CareersPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [ageEligibility, setAgeEligibility] = useState<
    "" | "above18" | "below18"
  >("");
  const isEligible = ageEligibility === "above18";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEligible) return;

    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      position: String(fd.get("position") || ""),
      why: String(fd.get("why") || ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues)
        errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const perks = [
    { icon: Coffee, title: "Free craft coffee", body: "On the clock and off." },
    {
      icon: Croissant,
      title: "House bakery",
      body: "Daily staff pick from the case.",
    },
    {
      icon: HandHeart,
      title: "Warmth first",
      body: "We train the craft. You bring the care.",
    },
    {
      icon: Users,
      title: "Real team",
      body: "Small crews, big respect, honest hours.",
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <SiteNav />
      <main className="mx-auto flex-1 max-w-6xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <header
          className="mb-14 max-w-3xl"
          data-parallax
          data-parallax-speed="0.08"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
            <HandHeart className="h-3 w-3" /> Now hiring
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-foreground">
            Warmth first. <br />
            <em className="italic text-gold-gradient">Craft second.</em>
          </h1>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            We hire for warmth first and train the rest. Baristas, bakers, and
            front-of-house - no experience required for entry roles.
          </p>
        </header>

        <div
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          data-parallax
          data-parallax-speed="0.1"
        >
          {perks.map((p) => (
            <div key={p.title} className="glass-panel rounded-3xl p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
                <p.icon className="h-4 w-4" />
              </span>
              <div className="mt-4 font-display text-lg text-foreground">
                {p.title}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="glass-panel rounded-3xl p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-display text-4xl text-foreground">
              Application received
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
              Thank you for applying. Our team will reach out within a few days
              if there's a fit.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass-panel rounded-3xl p-6 sm:p-10"
            data-parallax
            data-parallax-speed="0.12"
          >
            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
                About You
              </div>
              <h2 className="mt-2 font-display text-3xl text-foreground">
                Tell us about yourself
              </h2>
            </div>
            <Field label="Age" required>
              <select
                name="ageEligibility"
                value={ageEligibility}
                onChange={(event) => {
                  setAgeEligibility(
                    event.target.value as "" | "above18" | "below18",
                  );
                  setErrors({});
                }}
                className={inputCx}
                aria-describedby="age-eligibility-message"
              >
                <option value="" disabled>
                  Select your age group
                </option>
                <option value="above18">I am above 18 years</option>
                <option value="below18">I am below 18 years</option>
              </select>
            </Field>
            <div
              id="age-eligibility-message"
              className={`mt-3 flex items-start gap-2 rounded-2xl border px-4 py-3 text-xs ${
                isEligible
                  ? "border-gold/30 bg-gold/10 text-foreground"
                  : "border-border bg-background/60 text-muted-foreground"
              }`}
              role="status"
              aria-live="polite"
            >
              {isEligible ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
              )}
              <span>
                {isEligible
                  ? "You can now complete and submit the application."
                  : ageEligibility === "below18"
                    ? "You must be above 18 years to complete this application."
                    : "Select your age group to unlock the application form."}
              </span>
            </div>
            <fieldset
              disabled={!isEligible}
              className="mt-8 min-w-0 transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
              aria-describedby="age-eligibility-message"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First Name" required error={errors.firstName}>
                  <input
                    name="firstName"
                    className={inputCx}
                    placeholder="First name"
                  />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <input
                    name="lastName"
                    className={inputCx}
                    placeholder="Last name"
                  />
                </Field>
                <Field label="Email Address" required error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    className={inputCx}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    name="phone"
                    className={inputCx}
                    placeholder="(555) 555-5555"
                  />
                </Field>
              </div>

              <div className="mb-6 mt-10">
                <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
                  The Role
                </div>
                <h2 className="mt-2 font-display text-3xl text-foreground">
                  Where you fit
                </h2>
              </div>
              <div className="space-y-5">
                <Field
                  label="Position you're interested in"
                  required
                  error={errors.position}
                >
                  <select name="position" defaultValue="" className={inputCx}>
                    <option value="" disabled>
                      Select a position
                    </option>
                    {POSITIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Why do you want to work with us?"
                  error={errors.why}
                >
                  <textarea
                    name="why"
                    rows={5}
                    maxLength={1000}
                    className={`${inputCx} resize-none`}
                    placeholder="Tell us why you'd be a great fit for our team..."
                  />
                </Field>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-espresso shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed"
                >
                  Submit Application <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </fieldset>{" "}
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCx =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:shadow-glow";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-[11px] text-red-400">{error}</span>
      )}
    </label>
  );
}
