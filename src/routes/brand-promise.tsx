import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Coffee, HandHeart, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteNav } from "@/components/nav";
import promiseHeroImg from "../../MUSTAFA PICTURES/1ST/_MG_0039.jpg";
import cafeCounterImg from "../../MUSTAFA PICTURES/1ST/_MG_0022.jpg";

export const Route = createFileRoute("/brand-promise")({
  head: () => ({ meta: [{ title: "Brand Promise - Mustafa Coffee House" }] }),
  component: BrandPromisePage,
});

const promiseParagraphs = [
  "More than a commitment, it's the foundation of every decision we make and every experience we create.",
  "From the moment you enter Mustafa Coffee House, you become part of our family. We promise a welcoming environment where people from all backgrounds feel comfortable, respected, and appreciated, whether you're stopping in for your morning coffee, meeting friends, studying for an exam, or celebrating a special occasion.",
  "We promise to never compromise on quality. Every coffee bean, tea leaf, ingredient, and bakery item is selected with care, and our skilled team prepares every beverage and every meal with attention to detail, so every guest receives the same outstanding experience, every visit.",
  "We promise to continuously innovate while staying true to our values, investing in modern equipment, advanced brewing techniques, and customer-focused technology to make your experience faster and easier, without sacrificing the personal service that makes us who we are. And we promise to maintain the highest standards of cleanliness, food safety, and operational excellence at every location.",
  "We promise to respect your time with friendly, efficient, and reliable service in-store, online, for pickup, or through our drive-thru. And we promise to build lasting relationships based on honesty, integrity, and trust with every customer, employee, supplier, and business partner.",
  "We promise to invest in our people, because exceptional hospitality begins with an exceptional team, and to be an active, responsible member of every community we serve, supporting local initiatives and creating employment opportunities wherever we grow.",
  "Above all, we promise to treat every guest with kindness, serve every order with pride, and continuously improve every aspect of our business. We measure our success not only by the beverages we serve, but by the relationships we build, the trust we earn, and the positive experiences we create.",
];

const expectations = [
  "Premium coffee, authentic teas, and handcrafted beverages prepared with care.",
  "Fresh bakery items, quality food, and desserts made with high standards.",
  "A clean, welcoming, and comfortable environment.",
  "Friendly, knowledgeable, and professional team members.",
  "Fast, reliable, and consistent service.",
  "Honest value and exceptional quality.",
  "Continuous innovation that enhances your experience.",
  "Respect, integrity, and genuine hospitality in every interaction.",
];

const pillars = [
  { icon: Coffee, label: "Premium Coffee" },
  { icon: Sparkles, label: "Authentic Flavors" },
  { icon: HandHeart, label: "Genuine Hospitality" },
  { icon: Users, label: "Every Guest" },
];

function BrandPromisePage() {
  return (
    <div className="brand-promise-page relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-background via-cream to-latte/25 text-foreground">
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_20%,oklch(0.86_0.08_85/0.34),transparent_38%),radial-gradient(ellipse_at_90%_18%,oklch(0.62_0.11_55/0.18),transparent_36%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-card/85 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink shadow-glow">
                <ShieldCheck className="h-3 w-3" /> About Mustafa Coffee House
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.9] text-foreground">
                Our Brand Promise
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                More than a commitment, it's the foundation of every decision we make and every experience we create.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {pillars.map((item) => (
                  <Pillar key={item.label} icon={item.icon} label={item.label} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto aspect-[5/4] max-w-xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-luxury">
                <img src={promiseHeroImg} alt="Mustafa Coffee House seating with warm cafe lighting" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cream/25 bg-background/88 p-5 backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">Every Guest. Every Visit. Every Time.</div>
                  <p className="mt-2 font-display text-2xl leading-tight text-foreground sm:text-3xl">Premium Coffee. Authentic Flavors. Genuine Hospitality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-latte/25 via-background to-cream/70 px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-[2rem] border border-border bg-background/85 p-7 shadow-luxury lg:sticky lg:top-32 lg:h-fit">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">- Our Promise</div>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">Built into every detail.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Our promise connects the coffee, the service, the room, and the people behind every order.
              </p>
              <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-card">
                <img src={cafeCounterImg} alt="Mustafa Coffee House counter and dessert display" className="aspect-[4/3] w-full object-cover" />
              </div>
            </aside>

            <article className="rounded-[2rem] border border-border bg-background/90 p-6 shadow-luxury sm:p-9">
              <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
                {promiseParagraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "font-semibold text-foreground" : undefined}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">- Our Promise to Every Guest</div>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">When you choose Mustafa Coffee House, you can always expect:</h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {expectations.map((item) => (
                <div key={item} className="group relative min-h-[11rem] overflow-hidden rounded-3xl border border-border bg-background/88 p-5 shadow-luxury">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/10 transition group-hover:scale-125" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="relative mt-5 text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-gold/25 bg-gradient-to-br from-gold-soft/45 via-background to-caramel/25 p-7 text-center shadow-luxury sm:p-10">
              <p className="font-display text-3xl leading-tight text-foreground sm:text-5xl">Premium Coffee. Authentic Flavors. Genuine Hospitality.</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink sm:text-sm">Every Guest. Every Visit. Every Time.</p>
              <div className="mt-8 flex justify-center">
                <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow">
                  Back to About <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Pillar({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground shadow-glow">
      <Icon className="h-4 w-4 text-gold-ink" /> {label}
    </span>
  );
}