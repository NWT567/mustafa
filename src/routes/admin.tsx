import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  CircleAlert,
  ClipboardList,
  DollarSign,
  PackageSearch,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AnalyticsPanel, KpiCard } from "@/components/admin/dashboard-widgets";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Protected operations dashboard for Mustafa Coffee House administrators.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session.authenticated) {
      throw redirect({ to: "/admin/login" });
    }
    return { adminSession: session };
  },
  component: AdminDashboardPage,
});

const DASHBOARD_METRICS = [
  { title: "Orders today", icon: ClipboardList },
  { title: "Revenue today", icon: DollarSign },
  { title: "Average preparation", icon: Timer },
  { title: "Loyalty activity", icon: Users },
];

const OPERATION_LINKS = [
  {
    title: "Order management",
    description:
      "Review and manage incoming orders from the protected workspace.",
    to: "/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Reservation management",
    description:
      "Review booking activity and prepare for reservation operations.",
    to: "/admin/reservations",
    icon: Activity,
  },
  {
    title: "Loyalty management",
    description:
      "Review the protected member and rewards management workspace.",
    to: "/admin/loyalty",
    icon: Users,
  },
];

function AdminDashboardPage() {
  const { adminSession } = Route.useRouteContext();

  return (
    <AdminShell adminIdentifier={adminSession.identifier ?? "Administrator"}>
      <section className="flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold-soft/20 px-3 py-1.5 text-xs font-semibold text-gold-ink">
            <ShieldCheck className="h-4 w-4" />
            Protected workspace
          </div>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Operations overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Monitor connected business activity and move quickly into the
            protected administrative management areas.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-sm">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Secure session active
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Business data source not connected
          </p>
        </div>
      </section>

      <section className="mt-7" aria-labelledby="summary-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="summary-heading"
              className="text-base font-semibold text-foreground"
            >
              Performance summary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Live metrics appear once a data source is connected.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_METRICS.map((metric) => (
            <KpiCard
              key={metric.title}
              title={metric.title}
              value={null}
              icon={metric.icon}
            />
          ))}
        </div>
      </section>

      <section className="mt-7 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.7fr)]">
        <AnalyticsPanel data={[]} />

        <aside className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Operational alerts
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Issues requiring attention
              </p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-muted-foreground">
              <CircleAlert className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-6 grid min-h-56 place-items-center rounded-xl border border-dashed border-border bg-muted/25 px-5 text-center">
            <div>
              <PackageSearch className="mx-auto h-6 w-6 text-muted-foreground" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                No alert feed connected
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Inventory and service alerts will appear here when an operations
                backend is available.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-7" aria-labelledby="operations-heading">
        <div>
          <h2
            id="operations-heading"
            className="text-base font-semibold text-foreground"
          >
            Management areas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open protected tools without leaving the admin workspace.
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {OPERATION_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft/30 text-gold-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                </div>
                <h3 className="mt-5 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}
