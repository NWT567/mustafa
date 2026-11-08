import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Logo } from "@/components/logo";

const LINKS: { to: string; label: string }[] = [
  { to: "/order", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/loyalty", label: "Loyalty" },
  { to: "/franchise", label: "Franchise" },
  { to: "/download", label: "Download" },
  { to: "/contact", label: "Contact Us" },
];

export function SiteNav({
  extras,
  showSignIn = true,
}: {
  extras?: ReactNode;
  showSignIn?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [navTilt, setNavTilt] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const isOrderRoute = location.pathname === "/order";
  const links = LINKS;

  const handleNavMove = (event: MouseEvent<HTMLDivElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    const bounds = nav.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setNavTilt({ x: x * 6, y: y * -6 });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 px-3 sm:px-5"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={navRef}
          onMouseMove={handleNavMove}
          onMouseLeave={() => setNavTilt({ x: 0, y: 0 })}
          className="mx-auto mt-3 grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-full border border-border bg-card px-3 py-2.5 shadow-luxury transition-transform duration-300 ease-out sm:mt-4 sm:gap-3 sm:px-6 sm:py-3 lg:grid-cols-[auto_1fr_auto] lg:px-8"
          style={{
            transform: `rotateY(${navTilt.x}deg) rotateX(${navTilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <Link
            to="/"
            aria-label="Mustafa Coffee House home"
            className="group flex min-w-0 items-center gap-2"
          >
            <Logo
              showWordmark
              className="h-10 w-auto max-w-[9.5rem] origin-left transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02] motion-reduce:transform-none sm:h-12 sm:max-w-[13rem] lg:h-14"
            />
          </Link>
          <nav className="hidden items-center justify-center gap-7 text-sm text-muted-foreground lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative -my-2 px-1 py-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-gold-ink motion-reduce:transform-none"
                activeProps={{ className: "text-gold-ink" }}
              >
                <span>{l.label}</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-caramel via-gold to-caramel transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </Link>
            ))}
          </nav>
          <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
            {extras}
            {showSignIn && (
              <Link
                to="/login"
                className="hidden rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-ink hover:shadow-glow motion-reduce:transform-none sm:inline-flex"
              >
                Sign in
              </Link>
            )}
            {!isOrderRoute && (
              <Link
                to="/order"
                className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-espresso shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 motion-reduce:transform-none lg:inline-flex"
              >
                Order
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-ink hover:shadow-glow motion-reduce:transform-none lg:hidden"
            >
              <Menu className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transform-none" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-dvh w-[min(90vw,24rem)] flex-col gap-5 overflow-y-auto border-l border-border bg-gradient-to-b from-background via-card to-muted p-5 shadow-luxury transition-transform duration-300 ease-out sm:gap-8 sm:p-6 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Logo
              showWordmark
              className="h-10 w-auto max-w-[10rem] sm:h-12 sm:max-w-[13rem]"
            />
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
                className="group flex min-h-12 items-center justify-between py-3 font-display text-2xl text-foreground transition hover:text-gold-ink sm:py-5 sm:text-3xl"
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
    </>
  );
}
