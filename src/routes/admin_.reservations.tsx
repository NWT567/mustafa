import { createFileRoute, redirect } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import {
  AdminConnectionNotice,
  AdminEmptyRecords,
  AdminPageHeading,
} from "@/components/admin/admin-management-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin_/reservations")({
  head: () => ({
    meta: [
      { title: "Reservation Management - Mustafa Coffee House" },
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
  component: AdminReservationsPage,
});

function AdminReservationsPage() {
  const { adminSession } = Route.useRouteContext();

  return (
    <AdminShell
      adminIdentifier={adminSession.identifier ?? "Administrator"}
      pageTitle="Reservation management"
      pageDescription="Protected booking operations"
    >
      <AdminPageHeading
        eyebrow="Booking operations"
        title="Reservations"
        description="Review upcoming bookings, guest details, party sizes, and reservation status from the admin workspace."
        icon={CalendarDays}
        publicHref="/reserve"
        publicLabel="View reservation form"
      />
      <AdminConnectionNotice>
        The public reservation form is not connected to a shared database yet. A
        reservation endpoint is required before submitted bookings can appear
        here.
      </AdminConnectionNotice>
      <AdminEmptyRecords
        title="Reservation schedule"
        description="Confirmed and pending reservations will be listed here."
        columns={["Guest", "Date", "Time", "Party", "Status"]}
      />
    </AdminShell>
  );
}
