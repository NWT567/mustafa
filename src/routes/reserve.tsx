import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Users,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  MapPin,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { playClink, playPour, playSteam, playTap } from "@/lib/coffee-sounds";
import reserveDiningImg from "../../MUSTAFA PICTURES/1ST/_MG_0030.jpg";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve a Table - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Reserve your quiet corner at Mustafa Coffee House. Pick your table on a live 3D floor plan, choose the hour, and confirm your visit.",
      },
      {
        property: "og:title",
        content: "Reserve a Table - Mustafa Coffee House",
      },
      {
        property: "og:description",
        content:
          "Book a table on our interactive 3D floor plan. Your visit, your corner.",
      },
    ],
  }),
  component: ReservePage,
});

type TableSpec = {
  id: string;
  name: string;
  seats: number;
  vibe: string;
  x: number; // %
  y: number; // %
  size: number; // px
  premium?: boolean;
  taken?: boolean;
};

const TABLES: TableSpec[] = [
  {
    id: "t1",
    name: "Window Nook",
    seats: 2,
    vibe: "Street-side view ? morning light",
    x: 15,
    y: 25,
    size: 70,
  },
  {
    id: "t2",
    name: "Brass Booth",
    seats: 4,
    vibe: "Velvet booth ? brass lamp",
    x: 38,
    y: 22,
    size: 90,
    premium: true,
  },
  {
    id: "t3",
    name: "Marble Round",
    seats: 2,
    vibe: "Marble bar-side ? barista view",
    x: 63,
    y: 28,
    size: 70,
  },
  {
    id: "t4",
    name: "Gold Alcove",
    seats: 6,
    vibe: "Private curtain ? gold ceiling",
    x: 84,
    y: 24,
    size: 100,
    premium: true,
  },
  {
    id: "t5",
    name: "Reading Corner",
    seats: 2,
    vibe: "Bookshelf wall ? warm lamp",
    x: 20,
    y: 62,
    size: 70,
  },
  {
    id: "t6",
    name: "Fireside Table",
    seats: 4,
    vibe: "Beside the ember hearth",
    x: 45,
    y: 66,
    size: 90,
    taken: true,
  },
  {
    id: "t7",
    name: "Chef's Bar",
    seats: 3,
    vibe: "Watch every extraction",
    x: 70,
    y: 62,
    size: 80,
  },
  {
    id: "t8",
    name: "Rooftop Suite",
    seats: 8,
    vibe: "Private terrace ? skyline",
    x: 88,
    y: 70,
    size: 110,
    premium: true,
  },
];

const TIMES = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
  "19:30",
  "21:00",
];
const OCCASIONS = [
  "Date night",
  "Business",
  "Birthday",
  "Friends",
  "Solo visit",
];

function ReservePage() {
  const [muted, setMuted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>("t2");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState<string>("Date night");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const sfx = useMemo(
    () => ({
      tap: () => !muted && playTap(),
      clink: () => !muted && playClink(),
      pour: () => !muted && playPour(),
      steam: () => !muted && playSteam(),
    }),
    [muted],
  );

  const selected = TABLES.find((t) => t.id === selectedId) ?? null;
  const canConfirm =
    selected &&
    !selected.taken &&
    name.trim().length > 1 &&
    phone.trim().length > 5;

  const confirm = () => {
    if (!canConfirm) return;
    sfx.pour();
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 3500);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-hero text-foreground">
      <SiteNav
        extras={
          <button
            type="button"
            onClick={() => {
              setMuted((m) => !m);
              if (!muted) playTap();
            }}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition hover:border-gold hover:text-gold-ink"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        }
      />

      <main className="mx-auto flex-1 max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        {/* Editorial header */}
        <section className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
              <Sparkles className="h-3 w-3" /> Reserve ? Live floor plan
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-tight text-foreground">
              Pick your <em className="italic text-gold-gradient">corner.</em>
              <br /> Book the hour.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Tilt the room. Tap a table. Every table plays a small ceramic
              clink as you claim it - like tapping a saucer with a spoon.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-ink">
                <MapPin className="h-3.5 w-3.5" /> The room tonight
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <Kpi label="Tables" value={String(TABLES.length)} />
                <Kpi
                  label="Free"
                  value={String(TABLES.filter((t) => !t.taken).length)}
                />
                <Kpi
                  label="Premium"
                  value={String(TABLES.filter((t) => t.premium).length)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3D Floor plan + form */}
        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Floor plan */}
          <div
            className="lg:col-span-7"
            data-parallax
            data-parallax-speed="0.12"
          >
            <FloorPlan
              tables={TABLES}
              selectedId={selectedId}
              onSelect={(id) => {
                sfx.clink();
                setSelectedId(id);
              }}
              onHover={sfx.steam}
            />
            <Legend />
          </div>

          {/* Booking form */}
          <aside className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Reservation
              </div>
              <div className="mt-1 font-display text-3xl text-foreground">
                {selected ? selected.name : "Select a table"}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected
                  ? selected.vibe
                  : "Tap a glowing table on the floor plan."}
              </p>

              {/* Date & time */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <label className="col-span-1 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                    <Calendar className="h-3 w-3" /> Date
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      sfx.tap();
                      setDate(e.target.value);
                    }}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </label>
                <label className="col-span-1 block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                    <Users className="h-3 w-3" /> Guests
                  </span>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                    <button
                      onClick={() => {
                        sfx.tap();
                        setGuests((g) => Math.max(1, g - 1));
                      }}
                      className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-gold/15 hover:text-gold-ink"
                      aria-label="Fewer guests"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-display text-lg text-foreground">
                      {guests}
                    </span>
                    <button
                      onClick={() => {
                        sfx.tap();
                        setGuests((g) => Math.min(12, g + 1));
                      }}
                      className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso"
                      aria-label="More guests"
                    >
                      +
                    </button>
                  </div>
                </label>
              </div>

              <div className="mt-4">
                <span className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                  <Clock className="h-3 w-3" /> Time
                </span>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => {
                    const active = time === t;
                    return (
                      <button
                        key={t}
                        onClick={() => {
                          sfx.tap();
                          setTime(t);
                        }}
                        className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
                          active
                            ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                            : "border border-border text-muted-foreground hover:border-gold hover:text-gold-ink"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                  Occasion
                </span>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => {
                    const active = occasion === o;
                    return (
                      <button
                        key={o}
                        onClick={() => {
                          sfx.tap();
                          setOccasion(o);
                        }}
                        className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
                          active
                            ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                            : "border border-border text-muted-foreground hover:border-gold hover:text-gold-ink"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                    Phone
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                  />
                </label>
              </div>

              <button
                disabled={!canConfirm || confirmed}
                onClick={confirm}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {confirmed ? (
                  <>
                    <Check className="h-4 w-4" /> Table reserved
                  </>
                ) : (
                  <>
                    Confirm reservation
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                We'll hold your table for 15 minutes past the hour
              </p>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card py-3">
      <div className="font-display text-2xl text-gold-gradient">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border border-gold/50 bg-gold/20" />{" "}
        Available
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-gradient-to-br from-gold to-caramel shadow-glow" />{" "}
        Premium
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-muted" /> Taken
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-full ring-2 ring-gold" /> Selected
      </span>
    </div>
  );
}

/* ---------- 3D floor plan ---------- */
function FloorPlan({
  tables,
  selectedId,
  onSelect,
  onHover,
}: {
  tables: TableSpec[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 18, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: 18 - y * 10, ry: x * 20 });
  };
  const reset = () => setTilt({ rx: 18, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative aspect-[4/3] w-full [perspective:1400px]"
      data-parallax
      data-parallax-speed="0.16"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-gold/25 shadow-luxury transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* Background interior */}
        <img
          src={reserveDiningImg}
          alt="Mustafa Coffee House dining area with tables and seating"
          className="absolute inset-0 h-full w-full object-cover"
          data-parallax
          data-parallax-speed="0.1"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/20 to-espresso/80" />

        {/* Floor grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(214,167,79,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(214,167,79,0.18) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Tables */}
        {tables.map((t) => {
          const active = t.id === selectedId;
          return (
            <button
              key={t.id}
              onMouseEnter={onHover}
              onClick={() => !t.taken && onSelect(t.id)}
              disabled={t.taken}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.size,
                height: t.size,
                transform: `translate(-50%, -50%) translateZ(${t.premium ? 40 : 20}px)`,
              }}
            >
              <div
                className={`relative grid h-full w-full place-items-center rounded-full transition ${
                  t.taken
                    ? "cursor-not-allowed bg-cream/10 ring-1 ring-cream/20"
                    : t.premium
                      ? "bg-gradient-to-br from-gold to-caramel shadow-glow"
                      : "bg-gold/20 ring-1 ring-gold/50 hover:bg-gold/40"
                } ${active ? "ring-4 ring-gold" : ""}`}
              >
                <div
                  className={`font-display ${t.taken ? "text-cream/50" : "text-espresso"} text-center leading-tight`}
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">
                    T{t.id.slice(1)}
                  </div>
                  <div className="text-sm">{t.seats}p</div>
                </div>
                {t.premium && !t.taken && (
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-espresso text-gold">
                    <Sparkles className="h-3 w-3" />
                  </span>
                )}
              </div>
              {/* Tooltip */}
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground opacity-0 backdrop-blur transition group-hover:opacity-100">
                {t.name} ? {t.taken ? "Taken" : `${t.seats} seats`}
              </div>
            </button>
          );
        })}

        {/* Bar counter */}
        <div
          className="pointer-events-none absolute inset-x-8 bottom-6 h-3 rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          style={{ transform: "translateZ(60px)" }}
        />

        {/* Hint chip */}
        <div
          className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold-ink backdrop-blur"
          style={{ transform: "translateZ(80px)" }}
        >
          Tilt ? Tap a table
        </div>
      </div>
    </div>
  );
}
