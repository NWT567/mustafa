import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "Franchise - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Franchise pre-qualification with Mustafa Coffee House. Confidential internal evaluation for prospective MCH partners.",
      },
      { property: "og:title", content: "Franchise - Mustafa Coffee House" },
      {
        property: "og:description",
        content:
          "Begin your MCH franchise pre-qualification. Confidential, for internal evaluation only.",
      },
    ],
  }),
  component: FranchisePage,
});

const FUND_SOURCES = [
  "Personal savings",
  "Investments",
  "Bank loan",
  "Private loan",
  "Other",
] as const;

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full legal name").max(120),
  entityName: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  email: z.string().trim().email("Enter a valid email").max(255),
  netWorth: z.string().trim().min(1, "Required").max(20),
  liquidCapital: z.string().trim().min(1, "Required").max(20),
  sourceOfFunds: z.array(z.enum(FUND_SOURCES)).min(1, "Select at least one"),
  ownsBusiness: z.enum(["Yes", "No"], { message: "Select an option" }),
  yearsExperience: z.string().trim().max(10).optional().or(z.literal("")),
  operatedFood: z.enum(["Yes", "No"], { message: "Select an option" }),
  previousRole: z.string().trim().max(300).optional().or(z.literal("")),
  willingTraining: z.enum(["Yes", "No"], { message: "Select an option" }),
  city: z.string().trim().min(2, "Required").max(120),
  siteIdentified: z.enum(["Yes", "No"], { message: "Select an option" }),
  op1: z.enum(["Yes", "No"], { message: "Select an option" }),
  op2: z.enum(["Yes", "No"], { message: "Select an option" }),
  op3: z.enum(["Yes", "No"], { message: "Select an option" }),
  op4: z.enum(["Yes", "No"], { message: "Select an option" }),
  employedFT: z.enum(["Yes", "No"], { message: "Select an option" }),
  husbandWife: z.enum(["Yes", "No"], { message: "Select an option" }),
  cert1: z.literal(true, { message: "Required" }),
  cert2: z.literal(true, { message: "Required" }),
  cert3: z.literal(true, { message: "Required" }),
  cert4: z.literal(true, { message: "Required" }),
  signature: z.string().trim().min(2, "Type your full name").max(120),
  date: z.string().min(1, "Select a date"),
});

type Errors = Partial<Record<string, string>>;

function FranchisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [funds, setFunds] = useState<string[]>([]);

  const toggleFund = (v: string) =>
    setFunds((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: String(fd.get("fullName") || ""),
      entityName: String(fd.get("entityName") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      netWorth: String(fd.get("netWorth") || ""),
      liquidCapital: String(fd.get("liquidCapital") || ""),
      sourceOfFunds: funds,
      ownsBusiness: String(fd.get("ownsBusiness") || ""),
      yearsExperience: String(fd.get("yearsExperience") || ""),
      operatedFood: String(fd.get("operatedFood") || ""),
      previousRole: String(fd.get("previousRole") || ""),
      willingTraining: String(fd.get("willingTraining") || ""),
      city: String(fd.get("city") || ""),
      siteIdentified: String(fd.get("siteIdentified") || ""),
      op1: String(fd.get("op1") || ""),
      op2: String(fd.get("op2") || ""),
      op3: String(fd.get("op3") || ""),
      op4: String(fd.get("op4") || ""),
      employedFT: String(fd.get("employedFT") || ""),
      husbandWife: String(fd.get("husbandWife") || ""),
      cert1: fd.get("cert1") === "on",
      cert2: fd.get("cert2") === "on",
      cert3: fd.get("cert3") === "on",
      cert4: fd.get("cert4") === "on",
      signature: String(fd.get("signature") || ""),
      date: String(fd.get("date") || ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      const first = document.querySelector<HTMLElement>(
        `[data-field-error="true"]`,
      );
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <SiteNav />
      <main className="mx-auto flex-1 max-w-5xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <header className="mb-12" data-parallax data-parallax-speed="0.08">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink shadow-sm">
            <ShieldCheck className="h-3 w-3" /> Confidential
          </div>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] tracking-tight text-foreground">
            Franchise{" "}
            <em className="italic text-gold-gradient">Pre-Qualification</em>
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Confidential - for internal evaluation only. This pre-qualification
            form does not constitute a franchise offer. Approval requires full
            FDD review and execution of the official Franchise Agreement.
          </p>
        </header>

        {submitted ? (
          <SuccessCard
            title="Application received"
            body="Thank you. Our franchise team will review your pre-qualification and contact you within 5-7 business days."
          />
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-10"
            data-parallax
            data-parallax-speed="0.12"
          >
            <Section number="1" title="Applicant Information">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Legal Name" required error={errors.fullName}>
                  <input
                    name="fullName"
                    className={inputCx}
                    placeholder="Full legal name"
                  />
                </Field>
                <Field label="Business / Entity Name" error={errors.entityName}>
                  <input
                    name="entityName"
                    className={inputCx}
                    placeholder="If applicable"
                  />
                </Field>
                <Field label="Primary Phone" required error={errors.phone}>
                  <input
                    name="phone"
                    className={inputCx}
                    placeholder="(555) 555-5555"
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
              </div>
            </Section>

            <Section number="2" title="Financial Disclosure">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Approximate Net Worth ($)"
                  required
                  error={errors.netWorth}
                >
                  <input
                    name="netWorth"
                    inputMode="numeric"
                    className={inputCx}
                    placeholder="Net worth amount"
                  />
                </Field>
                <Field
                  label="Liquid Capital Available ($)"
                  required
                  error={errors.liquidCapital}
                >
                  <input
                    name="liquidCapital"
                    inputMode="numeric"
                    className={inputCx}
                    placeholder="Liquid capital amount"
                  />
                </Field>
              </div>
              <Field
                label="Source of Funds - select all that apply"
                required
                error={errors.sourceOfFunds}
              >
                <div className="flex flex-wrap gap-2">
                  {FUND_SOURCES.map((s) => {
                    const active = funds.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleFund(s)}
                        className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${
                          active
                            ? "border-gold bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                            : "border-border bg-background text-foreground hover:border-gold hover:text-gold-ink"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field
                label="Do you currently own or operate any business?"
                required
                error={errors.ownsBusiness}
              >
                <YesNo name="ownsBusiness" />
              </Field>
            </Section>

            <Section number="3" title="Industry Experience">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Years in Coffee / Restaurant Industry"
                  error={errors.yearsExperience}
                >
                  <input
                    name="yearsExperience"
                    inputMode="numeric"
                    className={inputCx}
                    placeholder="Years of experience"
                  />
                </Field>
                <Field
                  label="Previously operated a food or coffee business?"
                  required
                  error={errors.operatedFood}
                >
                  <YesNo name="operatedFood" />
                </Field>
              </div>
              <Field
                label="Previous Position / Role"
                error={errors.previousRole}
              >
                <input
                  name="previousRole"
                  className={inputCx}
                  placeholder="Describe your previous position or role"
                />
              </Field>
              <Field
                label="Willing to complete all mandatory MCH training programs?"
                required
                error={errors.willingTraining}
              >
                <YesNo name="willingTraining" />
              </Field>
            </Section>

            <Section number="4" title="Location Interest">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Preferred City / Area"
                  required
                  error={errors.city}
                >
                  <input
                    name="city"
                    className={inputCx}
                    placeholder="Preferred city or area"
                  />
                </Field>
                <Field
                  label="Potential site already identified?"
                  required
                  error={errors.siteIdentified}
                >
                  <YesNo name="siteIdentified" />
                </Field>
              </div>
            </Section>

            <Section
              number="5"
              title="Operating Commitments"
            >
              <Field
                label="1. All bakery products and designated beverages must be produced in-store."
                required
                error={errors.op1}
              >
                <YesNo name="op1" />
              </Field>
              <Field
                label="2. I agree to maintain MCH product quality, sanitation, and customer-service standards."
                required
                error={errors.op2}
              >
                <YesNo name="op2" />
              </Field>
              <Field
                label="3. I agree to operate under the approved MCH layout, POS system, menu, and branding."
                required
                error={errors.op3}
              >
                <YesNo name="op3" />
              </Field>
              <Field
                label="4. I agree to operate the franchise 24/7 as required by MCH Corporate."
                required
                error={errors.op4}
              >
                <YesNo name="op4" />
              </Field>
            </Section>

            <Section number="6" title="Eligibility">
              <Field
                label="6.1 Are you employed full-time elsewhere and planning to continue?"
                required
                error={errors.employedFT}
              >
                <YesNo name="employedFT" />
              </Field>
              <Field
                label="6.2 Does your application represent Husband & Wife ownership?"
                required
                error={errors.husbandWife}
              >
                <YesNo name="husbandWife" />
              </Field>
            </Section>

            <Section number="7" title="Acknowledgment & Certification">
              <Cert
                name="cert1"
                error={errors.cert1}
                label="I certify that all information provided is true, accurate, and complete."
              />
              <Cert
                name="cert2"
                error={errors.cert2}
                label="I understand this form does not constitute franchise approval."
              />
              <Cert
                name="cert3"
                error={errors.cert3}
                label="MCH reserves the right to verify all information and deny any applicant at its sole discretion."
              />
              <Cert
                name="cert4"
                error={errors.cert4}
                label="Franchise approval requires full FDD review and execution of the official Franchise Agreement."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Applicant Signature (type full name)"
                  required
                  error={errors.signature}
                >
                  <input
                    name="signature"
                    className={inputCx}
                    placeholder="Type your full name as signature"
                  />
                </Field>
                <Field label="Date" required error={errors.date}>
                  <input name="date" type="date" className={inputCx} />
                </Field>
              </div>
            </Section>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-espresso shadow-glow transition hover:brightness-110"
              >
                Submit Pre-Qualification Application{" "}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-gold" /> Encrypted &amp;
                confidential
              </p>
            </div>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCx =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:shadow-glow";

function Section({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-display text-3xl text-gold-gradient">
          {number}
        </span>
        <div>
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-ink">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-field-error={error ? "true" : undefined}>
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-2 block text-[11px] italic text-muted-foreground">
          {hint}
        </span>
      )}
      {error && (
        <span className="mt-2 block text-[11px] text-red-400">{error}</span>
      )}
    </label>
  );
}

function YesNo({ name }: { name: string }) {
  return (
    <select name={name} defaultValue="" className={inputCx}>
      <option value="" disabled>
        Select an option
      </option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

function Cert({
  name,
  label,
  error,
}: {
  name: string;
  label: string;
  error?: string;
}) {
  return (
    <label
      className="flex items-start gap-3"
      data-field-error={error ? "true" : undefined}
    >
      <input
        type="checkbox"
        name={name}
        className="mt-1 h-4 w-4 accent-[color:var(--color-gold,#D6A74F)]"
      />
      <span className="text-sm text-foreground">
        {label} <span className="text-gold">*</span>
        {error && (
          <span className="ml-2 text-[11px] text-red-400">{error}</span>
        )}
      </span>
    </label>
  );
}

function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-panel rounded-3xl p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-4xl text-foreground">{title}</h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
        {body}
      </p>
    </div>
  );
}



