import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";

const LINKS: { to: string; label: string }[] = [
  { to: "/order", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/loyalty", label: "Loyalty" },
  { to: "/franchise", label: "Franchise" },
  { to: "/contact", label: "Contact Us" },
];

export function SiteNav({
  extras,
  showSignIn = true,
  adminMode = false,
}: {
  extras?: ReactNode;
  showSignIn?: boolean;
  adminMode?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isOrderRoute = location.pathname === "/order";
  const links = LINKS;
  const isAdminRoute = adminMode || location.pathname === "/admin";
  const handleLogout = () => {
    localStorage.removeItem("mchIsAdmin");
    localStorage.removeItem("mchUserName");
    window.location.href = "/login";
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto mt-4 grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full border border-border bg-card px-4 py-3 shadow-luxury sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <Logo showWordmark className="h-11 w-auto max-w-[13rem] sm:h-12 lg:h-14" />
          </Link>
          {!isAdminRoute && (
            <nav className="hidden items-center justify-center gap-7 text-sm text-muted-foreground lg:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="transition hover:text-gold-ink"
                  activeProps={{ className: "text-gold-ink" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          )}
          <div className="flex items-center justify-end gap-2">
            {isAdminRoute ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition hover:border-gold hover:text-gold-ink"
              >
                Logout
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                {extras}
                {showSignIn && (
                  <Link
                    to="/login"
                    className="hidden rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition hover:border-gold hover:text-gold-ink sm:inline-flex"
                  >
                    Sign in
                  </Link>
                )}
                {!isOrderRoute && (
                  <Link
                    to="/order"
                    className="hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-espresso shadow-glow transition hover:brightness-110 lg:inline-flex"
                  >
                    Order <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition hover:border-gold hover:text-gold-ink lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      {!isAdminRoute && (
        <div
          className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-8 border-l border-border bg-gradient-to-b from-background via-card to-muted p-6 shadow-luxury transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Logo showWordmark className="h-11 w-auto max-w-[13rem] sm:h-12" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition hover:border-gold hover:text-gold-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col divide-y divide-border">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-5 font-display text-3xl text-foreground transition hover:text-gold-ink"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(20px)",
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "400ms",
                }}
              >
                {l.label}
                <ArrowUpRight className="h-5 w-5 text-gold/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            {!isOrderRoute && (
              <Link
                to="/order"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow"
              >
                Order Now <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            {showSignIn && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Sign in
              </Link>
            )}
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Mustafa Coffee House ï¿½ Open 24 Hrs
            </p>
          </div>
        </aside>
        </div>
      )}
    </>
  );
}
