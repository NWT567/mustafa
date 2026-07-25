import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, CheckCircle2, HandHeart, Leaf, Lightbulb, ShieldCheck, Sparkles, Sprout, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteNav } from "@/components/nav";
import valuesHeroImg from "../../MUSTAFA PICTURES/1ST/_MG_0030.jpg";

export const Route = createFileRoute("/core-values")({
  head: () => ({ meta: [{ title: "Core Values - Mustafa Coffee House" }] }),
  component: CoreValuesPage,
});

const values: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Award,
    title: "Excellence in Quality",
    body: "Premium coffee, authentic teas, handcrafted beverages, and fresh food made with high-quality ingredients. We never compromise on quality.",
  },
  {
    icon: HandHeart,
    title: "Exceptional Customer Experience",
    body: "Every guest is welcomed with warmth, respect, and genuine hospitality, an inviting atmosphere on every visit.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity and Trust",
    body: "We conduct our business with honesty, transparency, and accountability, earning the trust of everyone we work with.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Continuous Improvement",
    body: "We invest in modern technology and new ideas that improve the guest experience while keeping our personal touch.",
  },
  {
    icon: Sparkles,
    title: "Passion for Service",
    body: "Serving others is at the heart of everything we do. Every interaction, handled with passion and care.",
  },
  {
    icon: Users,
    title: "Teamwork and Respect",
    body: "A positive workplace built on mutual respect, collaboration, diversity, and continuous learning. When our team succeeds, our guests benefit.",
  },
  {
    icon: CheckCircle2,
    title: "Consistency",
    body: "The same exceptional quality, friendly service, and welcoming environment. Every visit, every location.",
  },
  {
    icon: HandHeart,
    title: "Community Commitment",
    body: "Creating jobs, building partnerships, and providing a gathering place where everyone feels at home.",
  },
  {
    icon: ShieldCheck,
    title: "Cleanliness and Safety",
    body: "The highest standards of cleanliness, food safety, and operational excellence for guests and employees alike.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Responsibility",
    body: "Responsible business practices that reduce waste, improve efficiency, and support a healthier future.",
  },
  {
    icon: Sprout,
    title: "Growth with Purpose",
    body: "As we expand to new communities, every new location represents our promise to deliver excellence and make a positive impact.",
  },
  {
    icon: Users,
    title: "Creating Lasting Connections",
    body: "We believe coffee brings people together: spaces where friendships begin and communities connect, one cup at a time.",
  },
];

function CoreValuesPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-background via-cream to-latte/25 text-foreground">
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,oklch(0.86_0.08_85/0.38),transparent_38%),radial-gradient(ellipse_at_86%_26%,oklch(0.62_0.11_55/0.18),transparent_42%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-card/85 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink shadow-glow">
                <Sparkles className="h-3 w-3" /> About Mustafa Coffee House
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.9] text-foreground">
                Our Core Values
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                These twelve principles define who we are, how we serve our guests, and how we grow as a company. They guide every decision we make and every experience we create.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Pill label="12 Principles" />
                <Pill label="Every Guest" />
                <Pill label="Every Visit" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto aspect-[5/4] max-w-xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-luxury">
                <img src={valuesHeroImg} alt="Mustafa Coffee House interior seating and service area" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cream/25 bg-background/88 p-5 backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">Values in action</div>
                  <p className="mt-2 font-display text-2xl leading-tight text-foreground sm:text-3xl">Quality, hospitality, trust, and community in every cup.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-latte/25 via-background to-cream/70 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold/25 bg-gradient-to-br from-gold-soft/40 via-background to-caramel/20 p-8 text-center shadow-luxury sm:p-12">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
              <HandHeart className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">One cup at a time.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              These values keep Mustafa Coffee House grounded as we serve guests, support our team, and grow into new communities with purpose.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow">
                Back to About <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ValueCard({ value, index }: { value: { icon: LucideIcon; title: string; body: string }; index: number }) {
  const Icon = value.icon;
  return (
    <article className="group relative min-h-[17rem] overflow-hidden rounded-3xl border border-border bg-background/88 p-7 shadow-luxury transition hover:-translate-y-1 hover:shadow-glow">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 transition group-hover:scale-125" />
      <div className="relative flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-display text-5xl leading-none text-gold/20">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h2 className="relative mt-7 font-display text-3xl leading-tight text-foreground">{value.title}</h2>
      <p className="relative mt-3 text-sm leading-6 text-muted-foreground">{value.body}</p>
    </article>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground shadow-glow">
      {label}
    </span>
  );
}