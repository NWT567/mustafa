import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Database, type LucideIcon } from "lucide-react";
import { useId } from "react";

export function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  loading = false,
}: {
  title: string;
  value: string | number | null;
  icon: LucideIcon;
  trend?: { label: string; positive?: boolean };
  loading?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : (
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {value ?? "—"}
            </p>
          )}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft/35 text-gold-ink">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4 min-h-5 text-xs">
        {loading ? (
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        ) : trend ? (
          <span
            className={
              trend.positive === false ? "text-destructive" : "text-gold-ink"
            }
          >
            {trend.label}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            Awaiting data source
          </span>
        )}
      </div>
    </article>
  );
}

export type AnalyticsPoint = {
  label: string;
  orders: number;
  revenue: number;
};

export function AnalyticsPanel({
  data,
  loading = false,
}: {
  data: AnalyticsPoint[];
  loading?: boolean;
}) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <section className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Revenue and order volume
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Performance over the selected reporting period
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Orders
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-caramel" /> Revenue
          </span>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 h-72 animate-pulse rounded-xl bg-muted" />
      ) : data.length > 0 ? (
        <div
          className="mt-6 h-72 min-w-0"
          aria-label="Revenue and order volume chart"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`${gradientId}-orders`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--gold)"
                    stopOpacity={0.34}
                  />
                  <stop offset="95%" stopColor="var(--gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "var(--border)",
                  background: "var(--background)",
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="var(--gold-ink)"
                fill={`url(#${gradientId}-orders)`}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--caramel)"
                fill="transparent"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mt-6 grid min-h-72 place-items-center rounded-xl border border-dashed border-border bg-muted/25 px-6 text-center">
          <div className="max-w-sm">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-background text-gold-ink shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-foreground">
              No analytics data yet
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Connect an order and revenue data source to populate this chart.
              No sample figures are being presented as live business data.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
