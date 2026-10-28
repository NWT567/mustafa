import { createFileRoute, redirect } from "@tanstack/react-router";
import { ReceiptText } from "lucide-react";
import {
  AdminConnectionNotice,
  AdminEmptyRecords,
  AdminPageHeading,
} from "@/components/admin/admin-management-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin_/orders")({
  head: () => ({
    meta: [
      { title: "Order Management - Mustafa Coffee House" },
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
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const { adminSession } = Route.useRouteContext();

  return (
    <AdminShell
      adminIdentifier={adminSession.identifier ?? "Administrator"}
      pageTitle="Order management"
      pageDescription="Protected order operations"
    >
      <AdminPageHeading
        eyebrow="Order operations"
        title="Orders"
        description="Review incoming orders, preparation progress, and fulfillment from this protected admin area."
        icon={ReceiptText}
        publicHref="/order"
        publicLabel="View customer ordering"
      />
      <AdminConnectionNotice>
        No order API or database is connected. Customer cart data currently
        stays in each visitor&apos;s browser, so it cannot be displayed here as
        a shared order queue.
      </AdminConnectionNotice>
      <AdminEmptyRecords
        title="Order queue"
        description="Incoming and active orders will be listed here."
        columns={["Order", "Customer", "Location", "Status", "Total"]}
      />
    </AdminShell>
  );
}
