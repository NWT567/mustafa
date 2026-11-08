import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  ReceiptText,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { adminLogout } from "@/lib/admin-auth";

type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  exact?: boolean;
};

const ADMIN_NAVIGATION: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Orders", to: "/admin/orders", icon: ReceiptText },
  { label: "Reservations", to: "/admin/reservations", icon: CalendarDays },
  { label: "Loyalty", to: "/admin/loyalty", icon: Users },
  { label: "Downloads", to: "/admin/downloads", icon: Download },
];

export function AdminShell({
  children,
  adminIdentifier,
  pageTitle = "Admin dashboard",
  pageDescription = "Operations overview",
}: {
  children: ReactNode;
  adminIdentifier: string;
  pageTitle?: string;
  pageDescription?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();
  const logout = useServerFn(adminLogout);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await logout();
      await router.invalidate();
      await navigate({ to: "/admin/login", replace: true });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/35 text-foreground">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-espresso/45 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(88vw,16rem)] flex-col border-r border-white/10 bg-espresso text-cream transition-[width,transform] duration-200 lg:w-64 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
          <Link
            to="/"
            className="min-w-0"
            aria-label="Mustafa Coffee House home"
          >
            {collapsed ? (
              <Logo className="h-10 w-10 brightness-0 invert" />
            ) : (
              <Logo
                showWordmark
                className="h-11 w-auto max-w-[12rem] brightness-0 invert"
              />
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-lg text-cream/65 transition hover:bg-white/10 hover:text-cream lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <SidebarGroup
            title="Workspace"
            collapsed={collapsed}
            items={ADMIN_NAVIGATION}
          />
        </div>

        <div className="border-t border-white/10 p-3">
          {!collapsed && (
            <div className="mb-3 rounded-xl bg-white/[0.06] px-3 py-3">
              <p className="truncate text-sm font-medium text-cream">
                Administrator
              </p>
              <p className="mt-1 truncate text-xs text-cream/45">
                {adminIdentifier}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
            className={`flex h-11 w-full items-center rounded-xl text-sm text-cream/65 transition hover:bg-white/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 ${
              collapsed ? "justify-center" : "gap-3 px-3"
            }`}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && (isSigningOut ? "Signing out…" : "Sign out")}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className="absolute -right-3 top-24 hidden h-7 w-7 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-gold hover:text-gold-ink lg:grid"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>

      <div
        className={`transition-[padding] duration-200 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}
      >
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border text-foreground transition hover:border-gold hover:text-gold-ink lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-foreground">
                {pageTitle}
              </p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {pageDescription}
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-border px-3 text-sm text-muted-foreground transition hover:border-gold hover:text-gold-ink sm:px-3.5"
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">View website</span>
          </Link>
        </header>

        <main className="mx-auto w-full min-w-0 max-w-[1500px] px-4 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarGroup({
  title,
  items,
  collapsed,
}: {
  title: string;
  items: NavItem[];
  collapsed: boolean;
}) {
  return (
    <div>
      {!collapsed && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/35">
          {title}
        </p>
      )}
      <nav className="space-y-1" aria-label={title}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className={`flex h-11 items-center rounded-xl text-sm text-cream/60 transition hover:bg-white/[0.07] hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                collapsed ? "justify-center" : "gap-3 px-3"
              }`}
              activeProps={{
                className: `bg-gold/15 text-gold-soft ${collapsed ? "justify-center" : "gap-3 px-3"}`,
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
