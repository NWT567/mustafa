import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  ClipboardList,
  DollarSign,
  Package,
  Sparkles,
  Store,
  Users,
  BadgeCheck,
  Truck,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Monitor orders, revenue, stores, inventory, and loyalty activity from one polished admin dashboard.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

const KPI_CARDS = [
  { label: "Orders today", value: "148", delta: "+12%", icon: ClipboardList },
  { label: "Revenue today", value: "$4.2k", delta: "+8.4%", icon: DollarSign },
  { label: "Average prep", value: "6.2m", delta: "-0.8m", icon: Sparkles },
  { label: "Active stores", value: "3", delta: "All online", icon: Store },
  { label: "Loyalty members", value: "8.4k", delta: "+214", icon: Users },
  { label: "Low inventory flags", value: "4", delta: "Needs review", icon: Package },
];

const ADMIN_TOOLS = [
  {
    title: "Order queue",
    body: "Prioritize walk-ins, pickups, refunds, and order edits in one live feed.",
    icon: ClipboardList,
  },
  {
    title: "Menu management",
    body: "Update product availability, pricing, photos, and category ordering.",
    icon: Package,
  },
  {
    title: "Store ops",
    body: "Adjust hours, pickup rules, prep targets, and location-specific notes.",
    icon: Store,
  },
  {
    title: "Promotions",
    body: "Launch home page banners, offers, and loyalty boosts with one toggle.",
    icon: Sparkles,
  },
  {
    title: "Staff coverage",
    body: "See who is on shift, assign stations, and review task completion.",
    icon: Users,
  },
  {
    title: "Alerts",
    body: "Watch service issues, stockouts, and guest feedback without leaving the page.",
    icon: Bell,
  },
];

function AdminDashboardPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-hero text-foreground">
      <SiteNav adminMode showSignIn={false} />
      <main className="mx-auto flex-1 max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
              <BadgeCheck className="h-3.5 w-3.5" />
              Admin console
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-tight text-foreground">
              One place to run the{" "}
              <em className="italic text-gold-gradient">whole house.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              A polished operations dashboard for Mustafa Coffee House. Keep an
              eye on orders, staff, stores, menu changes, and revenue without
              jumping between screens.
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 shadow-luxury">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">
                  Live pulse
                </div>
                <div className="mt-1 font-display text-2xl text-foreground">
                  Today at a glance
                </div>
              </div>
              <div className="rounded-full border border-gold/40 bg-gold-soft/30 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold-ink">
                Updating now
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {KPI_CARDS.slice(0, 6).map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="rounded-[1.5rem] border border-border bg-background p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-gold-ink">
                          {card.label}
                        </div>
                        <div className="mt-2 font-display text-3xl text-foreground">
                          {card.value}
                        </div>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-soft/35 text-gold-ink">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {card.delta}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {ADMIN_TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <article
                key={tool.title}
                className="rounded-[2rem] border border-border bg-card p-6 shadow-luxury"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl text-foreground">
                  {tool.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {tool.body}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.18em] text-gold-ink">
                  <span>Open module</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-border bg-card p-6 shadow-luxury">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
              Admin actions
            </div>
            <h2 className="mt-3 font-display text-4xl text-foreground">
              Everything an admin can do.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Manage menu items and prices",
                "Turn products on or off",
                "Update store hours and pickup rules",
                "Track inventory warnings",
                "Review new orders and refunds",
                "Send promotions to guests",
                "Monitor loyalty and VIP activity",
                "Export sales and daily summaries",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3"
                >
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold-soft/40 text-gold-ink">
                    <Truck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] border border-border bg-gradient-to-br from-background via-card to-muted p-6 shadow-luxury">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
              Quick links
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Open order page", to: "/order" },
                { label: "Check live menu", to: "/menu" },
                { label: "Review loyalty", to: "/loyalty" },
                { label: "View reservations", to: "/reserve" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground transition hover:border-gold hover:text-gold-ink"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-border bg-background/85 p-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-gold-ink">
                Notes
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This dashboard is set up to look polished at a glance, with KPI
                tiles up top and the main operational actions grouped below.
              </p>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
