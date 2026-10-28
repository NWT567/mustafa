import { createFileRoute, redirect } from "@tanstack/react-router";
import { Users } from "lucide-react";
import {
  AdminConnectionNotice,
  AdminEmptyRecords,
  AdminPageHeading,
} from "@/components/admin/admin-management-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin_/loyalty")({
  head: () => ({
    meta: [
      { title: "Loyalty Management - Mustafa Coffee House" },
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
  component: AdminLoyaltyPage,
});

function AdminLoyaltyPage() {
  const { adminSession } = Route.useRouteContext();

  return (
    <AdminShell
      adminIdentifier={adminSession.identifier ?? "Administrator"}
      pageTitle="Loyalty management"
      pageDescription="Protected member operations"
    >
      <AdminPageHeading
        eyebrow="Member operations"
        title="Loyalty"
        description="Review members, balances, tiers, and rewards activity from a protected administrative view."
        icon={Users}
        publicHref="/loyalty"
        publicLabel="View loyalty experience"
      />
      <AdminConnectionNotice>
        Loyalty profiles and balances currently live only in each member&apos;s
        browser storage. Connect a member database before using this area for
        real account management.
      </AdminConnectionNotice>
      <AdminEmptyRecords
        title="Member directory"
        description="Registered loyalty members will be listed here."
        columns={["Member", "Contact", "Tier", "Balance", "Last activity"]}
      />
    </AdminShell>
  );
}
