import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  HandHeart,
  Leaf,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import aboutShopImg from "../../MUSTAFA PICTURES/1ST/_MG_0063.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Meet the roasters, the ritual, and the room behind Mustafa Coffee House.",
      },
      { property: "og:title", content: "About - Mustafa Coffee House" },
      {
        property: "og:description",
        content:
          "The people, the pour, and the philosophy behind Mustafa Coffee House.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <SiteNav />
      <main className="mx-auto flex-1 max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <AboutHero />
        <StorySection />
        <VisionMissionSection />
        <GuidesSection />
        <ValuesSection />
        <PromiseSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: x * 20, y: y * -20 });
  };

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
    >
      <div className="lg:col-span-7">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
          <Sparkles className="h-3 w-3" /> Open 24 / 7 ? Locally owned
        </div>
        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-foreground">
          Coffee, tea, <br />
          and <em className="italic text-gold-gradient">genuine</em> <br />
          hospitality.
        </h1>
        <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          Mustafa Coffee House was founded on a simple purpose: to create a
          place where exceptional coffee, authentic tea, fresh food, and genuine
          hospitality come together to build lasting connections within the
          community.
        </p>
        <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-6">
          <Stat kpi="24/7" label="Open daily" />
          <Stat kpi="100%" label="In-store baked" />
          <Stat kpi="IL+" label="Growing footprint" />
        </div>
      </div>

      <div
        ref={ref}
        className="relative lg:col-span-5"
        style={{ perspective: "1200px" }}
        data-parallax
        data-parallax-speed="0.14"
      >
        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] ring-1 ring-border shadow-luxury transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${t.x}deg) rotateX(${t.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={aboutShopImg}
            alt="Mustafa Coffee House storefront with warm stone facade and branded sign"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />
          <div className="absolute inset-5 rounded-[1.5rem] border border-border" />
          <div className="absolute right-5 top-5 rounded-full border border-border bg-background/90 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-gold-ink backdrop-blur-sm">
            Our home
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-gold-gradient sm:text-3xl">
        {kpi}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function StorySection() {
  return (
    <section className="mt-32">
      <div className="mb-10 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
          - Our Story
        </div>
        <h2 className="mt-3 font-display text-5xl text-foreground sm:text-6xl">
          How it started
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <p className="glass-panel rounded-3xl p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          Mustafa Coffee House was founded on a simple purpose: to create a
          place where exceptional coffee, authentic tea, fresh food, and genuine
          hospitality come together to build lasting connections within the
          community. What began as a dream became a passion-driven journey -
          fueled by hard work, perseverance, and an uncompromising commitment to
          quality.
        </p>
        <p className="glass-panel rounded-3xl p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          Every detail has been considered with care, from premium coffee beans
          and authentic teas to high-quality equipment, fresh ingredients, and
          thoughtfully designed spaces. We combine traditional hospitality with
          modern innovation - advanced technology, online ordering, and
          continuous improvement - without losing the warmth and personal
          service that define our brand.
        </p>
        <p className="glass-panel rounded-3xl p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          As a locally owned business, we're deeply committed to the communities
          we serve, and our journey is only beginning. With new locations,
          drive-thru cafes, and expanded services on the horizon, we're growing
          with clear purpose - while holding onto the standards that earned your
          trust. And because good gatherings don't keep business hours, we're
          open 24 hours a day, every day.
        </p>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  return (
    <section className="mt-32">
      <div className="mb-12 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
          - Vision &amp; Mission
        </div>
        <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
          Where we're going, and why
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
          <div className="absolute -right-8 -top-8 text-[9rem] font-display leading-none text-gold/10">
            01
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="mt-5 font-display text-3xl text-foreground">
            Our Vision
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            To become one of the most recognized premium coffee house brands in
            the United States - a trusted national name built on quality,
            consistency, and community. Every Mustafa Coffee House is more than
            a place to enjoy coffee: it's a destination where students study,
            professionals work, families gather, and travelers find comfort at
            any hour, as we expand across Illinois and beyond.
          </p>
        </div>
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
          <div className="absolute -right-8 -top-8 text-[9rem] font-display leading-none text-gold/10">
            02
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
            <HandHeart className="h-5 w-5" />
          </span>
          <div className="mt-5 font-display text-3xl text-foreground">
            Our Mission
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            To give every guest an unforgettable cafe experience - premium
            coffee, handcrafted beverages, authentic teas, Nitro Cold Brew, and
            fresh bakery items, served in a warm and welcoming environment. We
            hold ourselves to the highest standards of quality and cleanliness,
            and we're built around our people - the team members who bring our
            hospitality to life and the communities we're proud to serve.
          </p>
        </div>
      </div>
    </section>
  );
}

function GuidesSection() {
  const guides = [
    {
      icon: Award,
      title: "Quality",
      body: "Handcrafted drinks made with precision, from single-origin beans.",
    },
    {
      icon: Leaf,
      title: "Authenticity",
      body: "Yemeni-inspired teas and recipes served the way tradition intended.",
    },
    {
      icon: HandHeart,
      title: "Hospitality",
      body: "A welcome first, a coffee second. Everyone has a seat here.",
    },
  ];
  return (
    <section className="mt-32">
      <div className="mb-10 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
          What guides us
        </div>
        <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
          Quality, authenticity,{" "}
          <em className="italic text-gold-gradient">hospitality.</em>
        </h2>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Every decision is guided by three principles. Every detail is
          carefully curated for a premium experience - handcrafted drinks made
          with precision, exclusive MCH Signature Teas, premium gelato, and
          fresh desserts and pastries produced in-store every day. What sets us
          apart is our commitment to creating moments - from your first morning
          cappuccino to late-night study sessions with friends.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {guides.map((s, i) => (
          <div
            key={s.title}
            className="group glass-panel relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -right-6 -top-6 text-[8rem] font-display leading-none text-gold/10 transition group-hover:text-gold/15">
              0{i + 1}
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
              <s.icon className="h-5 w-5" />
            </span>
            <div className="mt-6 font-display text-2xl text-foreground">
              {s.title}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValuesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const values = [
    {
      title: "Our Core Values",
      body: "From excellence in quality to community commitment, twelve principles define how we serve our guests, treat our team, and grow as a company.",
      to: "/core-values",
    },
    {
      title: "Brand Promise",
      body: "The standards behind every greeting, drink, and visit: exceptional quality, genuine hospitality, and consistent excellence.",
      to: "/brand-promise",
    },
  ] as const;
  return (
    <section className="mt-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
            Our Core Values
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            What guides every <em className="italic text-gold-gradient">decision</em> we make.
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">
            The principles and promises behind every guest interaction.
          </p>
          <Link to="/core-values" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110">
            Our Core Values <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
          {values.map((v, i) => (
            <Link
              key={v.title}
              to={v.to}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`glass-panel rounded-3xl border border-border p-6 transition-all duration-500 sm:p-8 ${
                hoveredIdx === i ? "scale-[1.02] border-gold/40 shadow-glow" : ""
              }`}
            >
              <span className="font-display text-4xl text-gold-gradient">0{i + 1}</span>
              <div className="mt-8 font-display text-3xl text-foreground">{v.title}</div>
              <p className="mt-3 text-sm text-muted-foreground">{v.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
                Open page <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function PromiseSection() {
  return (
    <section className="mt-32">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
              Our Brand Promise
            </div>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              What you can always{" "}
              <em className="italic text-gold-gradient">expect</em> from us.
            </h2>
            <p className="mt-5 max-w-lg text-sm text-muted-foreground sm:text-base">
              A commitment to exceptional quality, genuine hospitality, and
              consistent excellence in every cup we serve and every interaction
              we have.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110"
              >
                Become a franchise <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/brand-promise"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-gold hover:text-gold-ink"
              >
                Brand Promise <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {[
              {
                icon: ShieldCheck,
                title: "Exceptional quality",
                body: "In every cup, every day.",
              },
              {
                icon: HandHeart,
                title: "Genuine hospitality",
                body: "A welcome first, always.",
              },
              {
                icon: Award,
                title: "Consistent excellence",
                body: "The same standards, everywhere.",
              },
              {
                icon: Clock,
                title: "Always open",
                body: "24 hours a day, every day.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
                  <p.icon className="h-4 w-4" />
                </span>
                <div className="mt-4 font-display text-xl text-foreground">
                  {p.title}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




