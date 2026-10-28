import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  CheckCircle2,
  Download as DownloadIcon,
  MonitorDown,
  PackageOpen,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteNav } from "@/components/nav";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download the App - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Find official Mustafa Coffee House application downloads for Android, Windows, Linux, and Ubuntu.",
      },
    ],
  }),
  component: DownloadPage,
});

type Platform = {
  name: string;
  description: string;
  icon: LucideIcon;
  fileLabel: string;
  href: string | null;
};

const PLATFORMS: Platform[] = [
  {
    name: "Android APK",
    description:
      "Install the Mustafa Coffee House mobile application on a compatible Android device.",
    icon: Smartphone,
    fileLabel: "APK file not provided",
    href: null,
  },
  {
    name: "Windows",
    description: "A native desktop installer for supported Windows computers.",
    icon: MonitorDown,
    fileLabel: "Windows installer not provided",
    href: null,
  },
  {
    name: "Linux",
    description:
      "A general Linux desktop package for compatible distributions.",
    icon: Terminal,
    fileLabel: "Linux package not provided",
    href: null,
  },
  {
    name: "Ubuntu",
    description: "A dedicated package prepared for supported Ubuntu releases.",
    icon: Boxes,
    fileLabel: "Ubuntu package not provided",
    href: null,
  },
];

function DownloadPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />

      <main>
        <section className="border-b border-border bg-hero px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink shadow-sm">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  Official applications
                </div>
                <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.3rem,8vw,7rem)] leading-[0.94] tracking-tight text-foreground">
                  Mustafa Coffee House,
                  <em className="block italic text-gold-gradient">
                    wherever you are.
                  </em>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  This page will provide verified application installers as they
                  become available. Choose a platform below to check its current
                  status.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/80 p-5 shadow-luxury backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft/35 text-gold-ink">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Verified downloads only
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Download buttons are enabled only when a real installer
                      exists in the project.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="px-5 py-16 sm:px-8 sm:py-20"
          aria-labelledby="platforms-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
                Choose your platform
              </p>
              <h2
                id="platforms-heading"
                className="mt-3 font-display text-4xl text-foreground sm:text-5xl"
              >
                Application downloads
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                Installers have not yet been added to this repository. Each
                option will become available when its official file is
                published.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {PLATFORMS.map((platform) => (
                <PlatformCard key={platform.name} platform={platform} />
              ))}
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-muted/45 p-5 text-sm text-muted-foreground">
              <PackageOpen className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
              <p className="leading-6">
                Android APK files install only on Android devices. Separate
                native packages are required for Windows, Linux, and Ubuntu.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function PlatformCard({ platform }: { platform: Platform }) {
  const Icon = platform.icon;
  const available = Boolean(platform.href);

  return (
    <article className="flex min-h-80 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-luxury">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-background text-gold-ink shadow-sm">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Coming soon
        </span>
      </div>
      <h3 className="mt-6 font-display text-3xl text-foreground">
        {platform.name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {platform.description}
      </p>
      <p className="mt-4 text-xs text-muted-foreground">{platform.fileLabel}</p>

      <div className="mt-auto pt-7">
        {available && platform.href ? (
          <a
            href={platform.href}
            download
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-espresso transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-muted text-sm font-semibold text-muted-foreground opacity-75"
          >
            <DownloadIcon className="h-4 w-4" />
            Not available yet
          </button>
        )}
      </div>
    </article>
  );
}
