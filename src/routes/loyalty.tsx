import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Coffee,
  Crown,
  Gift,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { playClink, playPour, playTap } from "@/lib/coffee-sounds";

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "Loyalty - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Every pour counts. Earn beans, unlock tiers, and claim reserve-only rewards at Mustafa Coffee House.",
      },
      { property: "og:title", content: "Loyalty - Mustafa Coffee House" },
      {
        property: "og:description",
        content: "A rewards ritual worthy of the cup.",
      },
    ],
  }),
  component: LoyaltyPage,
});

const TIERS = [
  { name: "Cream", min: 0, color: "from-cream/80 to-latte", icon: Star },
  { name: "Latte", min: 250, color: "from-latte to-caramel", icon: Coffee },
  { name: "Caramel", min: 750, color: "from-caramel to-gold", icon: Award },
  { name: "Gold", min: 2000, color: "from-gold to-gold-soft", icon: Crown },
] as const;

const REWARDS = [
  {
    cost: 550,
    title: "House Espresso",
    body: "A double shot, on us.",
    icon: Coffee,
  },
  {
    cost: 650,
    title: "Signature Latte",
    body: "Any milk, any origin.",
    icon: Coffee,
  },
  {
    cost: 750,
    title: "Pastry Pairing",
    body: "Croissant + cortado ritual.",
    icon: Gift,
  },
  {
    cost: 900,
    title: "Pour-Over Flight",
    body: "Three origins, one seat.",
    icon: Sparkles,
  },
  {
    cost: 1600,
    title: "Reserve Tasting",
    body: "Private hour in the walnut room.",
    icon: Crown,
  },
  {
    cost: 2400,
    title: "Beans for a Year",
    body: "12 monthly single-origin bags.",
    icon: Award,
  },
];

function LoyaltyPage() {
  const [beans, setBeans] = useState(500);
  const [claimed, setClaimed] = useState<string[]>([]);

  const currentTierIdx = useMemo(() => {
    return TIERS.reduce((acc, t, i) => (beans >= t.min ? i : acc), 0);
  }, [beans]);
  const currentTier = TIERS[currentTierIdx];
  const nextTier = TIERS[currentTierIdx + 1];
  const progress = Math.min(100, (beans / 500) * 100);

  const claim = (r: (typeof REWARDS)[number]) => {
    if (beans < r.cost || claimed.includes(r.title)) return;
    setBeans((b) => b - r.cost);
    setClaimed((c) => [...c, r.title]);
    playPour(0.8);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <SiteNav />
      <main className="mx-auto flex-1 max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <LoyaltyHero
          beans={beans}
          tier={currentTier}
          nextTier={nextTier}
          progress={progress}
          onEarn={() => {
            setBeans((b) => b + 25);
            playClink();
          }}
        />
        <PointsInfoSection />
        <RewardsSection beans={beans} claim={claim} claimed={claimed} />
        <RitualCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function LoyaltyHero({
  beans,
  tier,
  nextTier,
  progress,
  onEarn,
}: {
  beans: number;
  tier: (typeof TIERS)[number];
  nextTier?: (typeof TIERS)[number];
  progress: number;
  onEarn: () => void;
}) {
  return (
    <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink shadow-sm">
          <Sparkles className="h-3 w-3" /> The Bean Ledger
        </div>
        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-foreground">
          Every pour <br />
          becomes a <em className="italic text-gold-gradient">reward</em>.
        </h1>
        <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          Earn a bean for every cup. Climb four tiers. Unlock rewards from a
          house espresso to a private year of beans. No cards. No apps. Just the
          ritual, remembered.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onEarn}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110"
          >
            <Zap className="h-4 w-4" /> Simulate a pour (+25)
          </button>
          <a
            href="/order"
            onClick={() => playTap()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-gold hover:text-gold-ink"
          >
            Order to earn <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="lg:col-span-5" data-parallax data-parallax-speed="0.14">
        <BeanCard
          beans={beans}
          tier={tier}
          nextTier={nextTier}
          progress={progress}
        />
      </div>
    </section>
  );
}

function BeanCard({
  beans,
  tier,
  nextTier,
  progress,
}: {
  beans: number;
  tier: (typeof TIERS)[number];
  nextTier?: (typeof TIERS)[number];
  progress: number;
}) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setT({
      x: ((e.clientX - r.left) / r.width - 0.5) * 20,
      y: ((e.clientY - r.top) / r.height - 0.5) * -20,
    });
  };
  const Icon = tier.icon;
  return (
    <div style={{ perspective: "1200px" }}>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setT({ x: 0, y: 0 })}
        className="relative mx-auto aspect-[1.6/1] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background via-card to-muted p-7 shadow-luxury transition-transform duration-300"
        style={{
          transform: `rotateY(${t.x}deg) rotateX(${t.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-gold/8 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Member
              </div>
              <div className="mt-1 font-display text-lg text-foreground">
                Guest of the House
              </div>
            </div>
            <span
              className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${tier.color} text-espresso shadow-glow`}
            >
              <Icon className="h-5 w-5" />
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl text-gold-gradient">
                {beans}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                beans
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-soft via-gold to-caramel transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{tier.name}</span>
              {nextTier ? (
                <span>
                  {Math.max(0, 500 - beans)} to redeem
                </span>
              ) : (
                <span>Top tier</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PointsInfoSection() {
  const cards = [
    {
      value: "250",
      title: "Sign-up bonus",
      body: "New members receive 250 points when they create an account.",
      icon: Gift,
    },
    {
      value: "100",
      title: "Points means $1",
      body: "Every 100 points equals $1 in rewards value.",
      icon: Coffee,
    },
    {
      value: "500",
      title: "Redeem threshold",
      body: "Rewards can be redeemed once the bar reaches 500 beans.",
      icon: Award,
    },
  ] as const;

  return (
    <section className="mt-32">
      <div className="mb-12">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
          Points
        </div>
        <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
          How rewards work.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="glass-panel rounded-3xl border border-border p-7 shadow-luxury">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
              <card.icon className="h-5 w-5" />
            </span>
            <div className="mt-6 font-display text-5xl text-gold-gradient">
              {card.value}
            </div>
            <h3 className="mt-3 font-display text-3xl text-foreground">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
function RewardsSection({
  beans,
  claim,
  claimed,
}: {
  beans: number;
  claim: (r: (typeof REWARDS)[number]) => void;
  claimed: string[];
}) {
  return (
    <section className="mt-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
            Redeem
          </div>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            The rewards ledger.
          </h2>
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Balance{" "}
          <span className="ml-2 font-display text-lg text-gold-gradient">
            {beans} beans
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REWARDS.map((r) => {
          const affordable = false;
          const done = claimed.includes(r.title);
          const Icon = r.icon;
          return (
            <div
              key={r.title}
              className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 ${
                done
                  ? "border-gold/50 bg-gradient-to-br from-background to-card"
                  : "glass-panel border-border hover:-translate-y-1 hover:shadow-glow"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl text-gold-gradient">
                  {r.cost}
                </span>
              </div>
              <div className="mt-5 font-display text-2xl text-foreground">
                {r.title}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              <button
                type="button"
                disabled
                onClick={() => claim(r)}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  done
                    ? "bg-gold/20 text-gold"
                    : affordable
                      ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow hover:brightness-110"
                      : "cursor-not-allowed border border-border text-muted-foreground"
                }`}
              >
                {done
                  ? "Claimed"
                  : affordable
                    ? "Redeem disabled"
                    : `Need ${r.cost - beans}`}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RitualCTA() {
  const [beans, setBeans] = useState<{ id: number; x: number; d: number }[]>(
    [],
  );
  useEffect(() => {
    const arr = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      d: 3 + Math.random() * 4,
    }));
    setBeans(arr);
  }, []);
  return (
    <section
      className="relative mt-32 overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-background via-card to-muted p-10 shadow-luxury sm:p-16"
      data-parallax
      data-parallax-speed="0.08"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {beans.map((b) => (
          <span
            key={b.id}
            className="absolute -top-8 h-3 w-2 rounded-full bg-gradient-to-b from-caramel to-espresso animate-bean-fall"
            style={{
              left: `${b.x}%`,
              animationDuration: `${b.d}s`,
              animationDelay: `${b.id * 0.4}s`,
            }}
          />
        ))}
      </div>
      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
            Join the ritual
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Start earning with your{" "}
            <em className="italic text-gold-gradient">next pour</em>.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110"
          >
            Create account <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/order"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-gold hover:text-gold-ink"
          >
            Order now
          </a>
        </div>
      </div>
    </section>
  );
}




