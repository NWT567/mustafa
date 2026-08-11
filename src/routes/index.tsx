import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Coffee,
  Briefcase,
  MessageSquareText,
  Gift,
  ArrowUpRight,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import heroCafeImg from "../../MUSTAFA PICTURES/1ST/_MG_0022.jpg";
import signatureVideo from "../assets/MUSTAFA VIDEOS/VIDEO VIRAL COLD BREW.mp4";
import galleryCounterImg from "@/assets/Gallery/22.jpg";
import galleryLatteImg from "@/assets/Gallery/_MG_0374.jpg";
import galleryDiningImg from "@/assets/Gallery/_MG_2039.jpg";
import gallerySignatureImg from "@/assets/Gallery/_MG_3063-Enhanced-NR.jpg";
import galleryTableImg from "@/assets/Gallery/_MG_3127.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="landing-page relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <AmbientBeans />
      <SiteNav />
      <Hero />
      <Marquee />
      <SignatureSection />
      <GuestReviewsSection />
      <GallerySection />
      <TeaserGrid />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-40 sm:px-8 lg:pt-48">
      <div className="grid grid-cols-12 items-center gap-8">
        {/* Left - editorial headline */}
        <div className="col-span-12 lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Single-Origin Roast
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-foreground">
            Where Heritage <br />
            Meets <em className="italic text-gold-gradient">Hospitality</em>
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
            Slow-roasted beans, hand-poured craft, and quiet corners built for
            the space between sips. A coffee house designed like a hotel lobby,
            served like a private tasting.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/order"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110"
            >
              Order Now
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
            <Stat kpi="120+" label="Signature drinks" />
            <Stat kpi="4.9" label="Guest rating" />
            <Stat kpi="24/7" label="Bean roasting" />
          </div>
        </div>

        {/* Right - real coffee mug photo */}
        <div className="col-span-12 lg:col-span-5">
          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
            data-parallax
            data-parallax-speed="0.14"
          >
            <Steam />
            <div className="absolute inset-6 rounded-full border border-gold/25" />
            <div className="absolute inset-16 rounded-full border border-gold/10" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-luxury ring-1 ring-gold/25">
              <img
                src={heroCafeImg}
                alt="Mustafa Coffee House interior with counter seating and warm lighting"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-3 -left-3 hidden min-w-[13rem] rounded-2xl border border-gold/35 bg-cream/95 px-5 py-4 text-espresso shadow-luxury backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 text-sm font-semibold text-coffee">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                Signature roast
              </div>
              <div className="mt-1 font-display text-2xl leading-none text-espresso drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
                Midnight Reserve
              </div>
            </div>
            <div className="absolute -right-3 top-8 hidden min-w-[9.5rem] rounded-2xl border border-gold/35 bg-cream/95 px-5 py-4 text-espresso shadow-luxury backdrop-blur-md sm:block">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coffee">
                Now brewing
              </div>
              <div className="mt-1 font-display text-4xl leading-none text-caramel drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">42</div>
              <div className="mt-1 text-xs font-medium text-coffee/80">
                cups today
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-coffee sm:text-3xl">
        {kpi}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Steam() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2"
      data-parallax
      data-parallax-speed="0.08"
    >
      {[0, 0.8, 1.6].map((delay, i) => (
        <span
          key={i}
          className="absolute block h-24 w-2 rounded-full bg-gradient-to-t from-transparent via-cream/40 to-transparent blur-[3px] animate-steam"
          style={{
            left: `${(i - 1) * 18}px`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function AmbientBeans() {
  const beans = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beans.map((_, i) => (
        <span
          key={i}
          className="absolute block animate-bean-float opacity-60 drop-shadow-[0_8px_16px_rgba(64,34,20,0.18)]"
          style={{
            top: `${(i * 47) % 90}%`,
            left: `${(i * 83) % 95}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
          data-parallax
          data-parallax-speed={String(0.04 + (i % 4) * 0.02)}
        >
          <CoffeeBean angle={i * 32} />
        </span>
      ))}
    </div>
  );
}

function CoffeeBean({ angle }: { angle: number }) {
  return (
    <svg
      viewBox="0 0 32 48"
      aria-hidden="true"
      className="h-7 w-5 sm:h-9 sm:w-6"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <path
        d="M16.2 2.7C7.7 4.7 2.8 13.5 4.2 24.1c1.6 12.2 10 21.8 18.1 20 7.3-1.7 10.3-12.8 6.5-24.7C25.5 9 20.9 1.6 16.2 2.7Z"
        fill="#7a4329"
      />
      <path
        d="M9.7 7.7c5.6-3.3 12.3.6 15.3 8.7 3.5 9.5 1.6 19.5-4.2 22.2C15 41.4 8.6 36.4 6.4 27.7 4.5 19.9 5.8 10.1 9.7 7.7Z"
        fill="#b77a49"
        opacity="0.42"
      />
      <path
        d="M17.1 7.9c-4.8 5.4-5.3 10.8-1.5 16.1 3.4 4.7 3.2 9.8-.7 15.4"
        fill="none"
        stroke="#f2d2a5"
        strokeWidth="2.35"
        strokeLinecap="round"
        opacity="0.78"
      />
    </svg>
  );
}
function Marquee() {
  const items = [
    "Single Origin",
    "Slow Roasted",
    "House Baked",
    "MCH Signature Tea",
    "Rewards Program",
    "Open 24 Hrs",
  ];
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-[linear-gradient(90deg,oklch(0.985_0.01_85),oklch(0.96_0.015_82)_45%,oklch(0.985_0.01_85))] py-4 sm:py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-28" />
      <div className="flex w-max animate-marquee-slide items-center gap-4 whitespace-nowrap px-4 font-display text-sm text-foreground/72 sm:gap-5 sm:px-8 sm:text-lg lg:text-xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 rounded-full border border-border/70 bg-background/80 px-4 py-2 shadow-sm backdrop-blur sm:gap-5 sm:px-5"
          >
            <span className="uppercase tracking-[0.2em] text-gold-ink">{t}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-slide { from { transform: translateX(0); } to { transform: translateX(-33.3333%); } }
        .animate-marquee-slide { animation: marquee-slide 30s linear infinite; }
        @media (max-width: 640px) { .animate-marquee-slide { animation-duration: 22s; } }
      `}</style>
    </div>
  );
}

function SignatureSection() {
  return (
    <section
      id="story"
      className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-luxury">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={signatureVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-espresso/78 via-espresso/45 to-background/25" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
              {/* <div className="inline-flex w-fit rounded-full border border-background/20 bg-background/88 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-espresso shadow-sm">
                The Craft
              </div> */}
              <h2 className="max-w-sm font-display text-5xl leading-[0.95] text-background drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)] sm:text-6xl">
                Twelve <em className="italic text-gold-soft">seconds</em> of
                silence before the pour.
              </h2>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            The Craft
          </div>
          <p className="text-lg text-muted-foreground">
            Our baristas train for two years before touching a customer's cup.
            Every extraction is timed to the second. Every steam wand angled to
            the millimeter. This is coffee as choreography - a quiet performance
            served across polished walnut and warm brass.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["Bean", "Grind", "Bloom", "Pour", "Rest", "Serve"].map(
              (step, i) => (
                <div key={step} className="glass-panel rounded-2xl px-4 py-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coffee">
                    Step 0{i + 1}
                  </div>
                  <div className="mt-1 font-display text-2xl text-foreground">
                    {step}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuestReviewsSection() {
  const reviewPages = [
    [
      {
        name: "Russells Coles",
        initial: "R",
        source: "Google",
        body: "We went to Mustafa on 4th. The service was great. The chai was incredible. We really love the decoration and everything. This place is a must.",
      },
      {
        name: "Erin B.",
        initial: "E",
        source: "Yelp",
        body: "Delicious coffee, food was OK but only tried the fruit ice cream. Looking forward to trying the pistachio coffee.",
      },
      {
        name: "Barbara Inzunza",
        initial: "B",
        source: "Google",
        body: "Ambience is very pleasing and they have amazing chai!",
      },
      {
        name: "barbara inzunza",
        initial: "b",
        source: "Facebook",
        body: "Ube latte is too good. Best coffee I have had!",
      },
    ],
    [
      {
        name: "Arons Bakus",
        initial: "A",
        source: "Google",
        body: "This place is a must. We spend night work over here because they are open 24h which is very convenient. Drinks are very consistent.",
      },
      {
        name: "Terrys Alvarado",
        initial: "T",
        source: "Google",
        body: "We visited this place and we loved it. The pastries were fresh and the drinks were awesome. We are definitely coming back.",
      },
      {
        name: "Asylai Uzenkulova",
        initial: "A",
        source: "Google",
        body: "Really nice place with a warm atmosphere, helpful team, and drinks that feel thoughtfully prepared.",
      },
      {
        name: "Nathans Austin",
        initial: "N",
        source: "Google",
        body: "The drinks were awesome. They have nitro cold brew, great tea, and a comfortable space to come back to.",
      },
    ],
  ];
  const [page, setPage] = useState(0);
  const activeReviews = reviewPages[page];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,oklch(0.99_0.012_85),oklch(0.94_0.035_78))] px-5 py-20 sm:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(45deg,transparent_47%,oklch(0.76_0.13_82/0.18)_48%,transparent_50%),linear-gradient(-45deg,transparent_47%,oklch(0.76_0.13_82/0.13)_48%,transparent_50%)] [background-size:70px_70px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mx-auto mb-6 h-px max-w-sm bg-gradient-to-r from-transparent via-gold to-transparent" />
          <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            What our guests say
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Straight from Google, Yelp, and Facebook.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          <button
            type="button"
            onClick={() => setPage((current) => (current === 0 ? reviewPages.length - 1 : current - 1))}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coffee/70 text-cream shadow-luxury transition hover:bg-coffee lg:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => (current + 1) % reviewPages.length)}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coffee/70 text-cream shadow-luxury transition hover:bg-coffee lg:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div key={page} className="review-page grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {activeReviews.map((review) => (
              <article key={review.name} className="flex min-h-[22rem] flex-col rounded-[0.75rem] border border-border bg-background/96 p-7 shadow-luxury transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coffee text-xl text-cream">
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-foreground">{review.name}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-ink">{review.source}</div>
                  </div>
                </div>
                <div className="mt-6 flex gap-1 text-gold" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 line-clamp-7 text-base leading-7 text-foreground/82">{review.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {reviewPages.map((_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setPage(dot)}
              aria-label={`Show review page ${dot + 1}`}
              className={`h-2 rounded-full transition-all ${dot === page ? "w-7 bg-coffee" : "w-2 bg-coffee/35 hover:bg-coffee/60"}`}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a href="https://www.yelp.com/biz/mustafa-coffee-house-hoffman-estates" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 text-sm font-semibold text-gold-ink transition hover:bg-gold-soft/35 hover:text-espresso">
            Read More Reviews
          </a>
        </div>
      </div>
      <style>{`
        @keyframes review-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .review-page { animation: review-fade-up 420ms ease-out both; }
      `}</style>
    </section>
  );
}
const BESTSELLERS = [
  {
    image: galleryCounterImg,
    name: "Caffè Latte",
    productId: "cafe-latte",
    category: "Hot coffee",
    description: "Silky espresso, steamed milk, and a clean layer of microfoam.",
    price: 5.95,
  },
  {
    image: galleryLatteImg,
    name: "Signature Latte Combo",
    productId: "signature-latte-combo",
    category: "House pairing",
    description: "Our signature latte pairing for an easy coffee-house favorite.",
    price: 9.95,
  },
  {
    image: galleryDiningImg,
    name: "Pistachio Mousse Cake",
    productId: "pistachio-mousse-cake",
    category: "Dessert",
    description: "Airy pistachio mousse with a rich, delicately layered finish.",
    price: 7.5,
  },
  {
    image: gallerySignatureImg,
    name: "House Coffee",
    productId: "coffee-mug-drink",
    category: "Freshly brewed",
    description: "A comforting house cup with a smooth roast and warm finish.",
    price: 4.5,
  },
  {
    image: galleryTableImg,
    name: "Chocolate Cupcake",
    productId: "chocolate-cupcake",
    category: "Fresh baked",
    description: "Deep cocoa cake finished with a generous chocolate swirl.",
    price: 4.95,
  },
] as const;

function GallerySection() {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-cream to-latte/20 px-5 py-24 sm:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_1px_1px,oklch(0.76_0.13_82/0.18)_1px,transparent_0)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
              - Most Selling Products
            </div>
            <h2 className="mt-3 max-w-4xl font-display text-4xl leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
              House favorites, hanging within reach.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Select a hanging portrait to reveal its details, then jump directly to the item to customize your order.
            </p>
          </div>
          <a
            href="/order"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-gold/45 bg-background/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink shadow-luxury transition hover:border-gold hover:bg-gold-soft/30"
          >
            Explore full menu
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8">
          <div className="mx-auto flex w-max min-w-full items-start gap-5 xl:justify-between">
            {BESTSELLERS.map((product, index) => (
              <GalleryCard
                key={product.productId}
                product={product}
                index={index}
                flipped={activeProductId === product.productId}
                onFlip={() =>
                  setActiveProductId((current) =>
                    current === product.productId ? null : product.productId,
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  product,
  index,
  flipped,
  onFlip,
}: {
  product: (typeof BESTSELLERS)[number];
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <article
      data-no-motion
      className="bestseller-hanger relative w-64 shrink-0 pt-24 xl:w-56 2xl:w-60"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-24 w-24 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-gold/55 bg-gradient-to-br from-gold-soft to-caramel shadow-glow" />
        <span className="absolute left-1/2 top-2 h-[5.8rem] w-px origin-top -rotate-[28deg] bg-gradient-to-b from-gold-ink/80 to-gold/45" />
        <span className="absolute left-1/2 top-2 h-[5.8rem] w-px origin-top rotate-[28deg] bg-gradient-to-b from-gold-ink/80 to-gold/45" />
      </div>

      <div className="bestseller-flip relative z-10 aspect-square w-full">
        <div
          className="bestseller-flip-inner relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.75,0.25,1)]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <button
            type="button"
            data-no-magnetic
            data-no-motion
            onClick={onFlip}
            aria-expanded={flipped}
            aria-label={`Show details for ${product.name}`}
            className={`bestseller-face absolute inset-0 overflow-hidden rounded-full border-4 border-background bg-background shadow-luxury ring-1 ring-gold/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              flipped ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <img
              data-no-motion
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-espresso/20 via-transparent to-white/10" />
          </button>

          <div
            role="button"
            tabIndex={flipped ? 0 : -1}
            aria-label={`Show image for ${product.name}`}
            onClick={onFlip}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onFlip();
              }
            }}
            className={`bestseller-face bestseller-back absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-full border-4 border-background bg-gradient-to-br from-cream via-background to-gold-soft/45 px-6 py-5 text-center shadow-luxury ring-1 ring-gold/50 xl:px-4 xl:py-4 2xl:px-5 ${
              flipped
                ? "pointer-events-auto cursor-pointer"
                : "pointer-events-none"
            }`}
          >
            <button
              type="button"
              data-no-magnetic
              data-no-motion
              onClick={(event) => {
                event.stopPropagation();
                onFlip();
              }}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/80 text-gold-ink xl:right-4 xl:top-4 xl:h-7 xl:w-7"
              aria-label={`Show image for ${product.name}`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
              {product.category} · #{index + 1}
            </div>
            <h3 className="mt-2 max-w-[11rem] font-display text-2xl leading-[0.95] text-foreground xl:text-xl 2xl:text-2xl">
              {product.name}
            </h3>
            <p className="mt-2 max-w-[11rem] text-[11px] leading-4 text-muted-foreground xl:mt-1.5 xl:text-[10px] xl:leading-[0.85rem] 2xl:text-[11px] 2xl:leading-4">
              {product.description}
            </p>
            <div className="mt-2 font-display text-xl text-gold-gradient xl:mt-1 xl:text-lg 2xl:text-xl">
              ${product.price.toFixed(2)}
            </div>
            <a
              data-no-magnetic
              data-no-motion
              href={`/order#product-${product.productId}`}
              onClick={(event) => event.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso shadow-glow xl:mt-2 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2"
              aria-label={`Order ${product.name}`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Order now
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
function TeaserGrid() {
  const cards = [
    {
      to: "/order",
      title: "The Menu",
      copy: "120+ signature drinks, pastries, and small plates.",
      icon: Coffee,
      tag: "Explore",
    },
    {
      to: "/franchise",
      title: "Franchise",
      copy: "Build a Mustafa Coffee House in your community.",
      icon: Briefcase,
      tag: "Partner",
    },
    {
      to: "/login",
      title: "Rewards",
      copy: "Earn beans on every visit. Bronze to Diamond.",
      icon: Gift,
      tag: "Sign in",
    },
    {
      to: "/careers",
      title: "Careers",
      copy: "Join a warm team built around hospitality.",
      icon: MessageSquareText,
      tag: "Apply",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-32 pt-20 sm:px-8 lg:pt-28">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group relative overflow-hidden rounded-3xl glass-panel p-6 transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso shadow-glow">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                {c.tag}
              </span>
            </div>
            <div className="font-display text-3xl text-foreground">
              {c.title}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
            <ArrowUpRight className="mt-6 h-5 w-5 text-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
