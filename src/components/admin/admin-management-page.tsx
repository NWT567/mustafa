import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  DatabaseZap,
  SearchX,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export function AdminPageHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  publicHref,
  publicLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  publicHref: string;
  publicLabel: string;
}) {
  return (
    <section className="flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
      <div className="min-w-0 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold-soft/20 px-3 py-1.5 text-xs font-semibold text-gold-ink">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </div>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      <Link
        to={publicHref}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-center text-sm font-medium text-foreground shadow-sm transition hover:border-gold hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-auto sm:shrink-0"
      >
        {publicLabel}
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function AdminConnectionNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 flex items-start gap-3 rounded-2xl border border-amber-300/45 bg-amber-50/70 p-5 text-amber-950">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100">
        <DatabaseZap className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold">Data connection required</h2>
        <p className="mt-1 text-sm leading-6 text-amber-900/75">{children}</p>
      </div>
    </div>
  );
}

export function AdminEmptyRecords({
  title,
  description,
  columns,
}: {
  title: string;
  description: string;
  columns: string[];
}) {
  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div
            className="grid border-b border-border bg-muted/45 px-6 py-3"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <span
                key={column}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                {column}
              </span>
            ))}
          </div>
          <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
            <div className="max-w-md">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
                <SearchX className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                No records available
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Records will appear here after the application is connected to
                its business data source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
