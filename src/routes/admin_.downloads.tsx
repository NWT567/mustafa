import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  Boxes,
  Download,
  MonitorDown,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import {
  AdminConnectionNotice,
  AdminPageHeading,
} from "@/components/admin/admin-management-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin_/downloads")({
  head: () => ({
    meta: [
      { title: "Download Management - Mustafa Coffee House" },
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
  component: AdminDownloadsPage,
});

type ReleasePlatform = {
  name: string;
  format: string;
  icon: LucideIcon;
};

const RELEASE_PLATFORMS: ReleasePlatform[] = [
  { name: "Android", format: "APK", icon: Smartphone },
  { name: "Windows", format: "EXE or MSI", icon: MonitorDown },
  { name: "Linux", format: "AppImage, RPM, or archive", icon: Terminal },
  { name: "Ubuntu", format: "DEB", icon: Boxes },
];

function AdminDownloadsPage() {
  const { adminSession } = Route.useRouteContext();

  return (
    <AdminShell
      adminIdentifier={adminSession.identifier ?? "Administrator"}
      pageTitle="Download management"
      pageDescription="Protected application releases"
    >
      <AdminPageHeading
        eyebrow="Application releases"
        title="Downloads"
        description="Review the availability of application packages shown on the public download page."
        icon={Download}
        publicHref="/download"
        publicLabel="View public downloads"
      />
      <AdminConnectionNotice>
        No installer files or release publishing service exists in the project.
        Add verified packages and a secure upload workflow before enabling
        public downloads.
      </AdminConnectionNotice>

      <section className="mt-7 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-foreground">
            Release catalog
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Current repository package availability by platform.
          </p>
        </div>
        <div className="divide-y divide-border">
          {RELEASE_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-gold-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {platform.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Expected format: {platform.format}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit rounded-full border border-border bg-muted/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Not published
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}
