import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Star } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mb-0 overflow-hidden border-t border-gold/25 bg-gradient-to-br from-cream via-gold-soft/88 to-caramel text-espresso">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,255,255,0.55),transparent_30%),radial-gradient(circle_at_84%_100%,rgba(90,45,22,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-background/70 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_1fr_1fr] lg:py-16">
        <div>
          <Link
            to="/"
            className="inline-flex rounded-2xl border border-background/65 bg-background px-6 py-4 shadow-[0_18px_50px_rgba(64,34,20,0.14)]"
          >
            <img
              src="/mustafa-logo.webp"
              alt="Mustafa Coffee House"
              className="h-14 w-auto object-contain sm:h-16"
              loading="eager"
              decoding="async"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-espresso/78">
            A luxury coffee house crafted for the slow moments. Open every day,
            all day.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://www.facebook.com/" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 bg-background/55 text-espresso shadow-sm transition hover:bg-background/85">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 bg-background/55 text-espresso shadow-sm transition hover:bg-background/85">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.yelp.com/biz/mustafa-coffee-house-hoffman-estates" aria-label="Yelp" className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 bg-background/55 text-espresso shadow-sm transition hover:bg-background/85">
              <Star className="h-4 w-4 fill-current" />
            </a>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-espresso">
            <MapPin className="h-4 w-4" /> Visit Address
          </div>
          <address className="mt-4 space-y-1.5 text-sm not-italic leading-6 text-espresso/78">
            <div>2509 W Golf Rd</div>
            <div>Hoffman Estates, IL 60169</div>
            <a href="tel:8476415915" className="block transition hover:text-espresso">
              847 641-5915
            </a>
          </address>
          <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-espresso">
            Hours
          </div>
          <ul className="mt-3 space-y-1.5 text-sm leading-6 text-espresso/78">
            <li>Every Sun - Sat</li>
            <li>12:00 am - 11:59 pm</li>
          </ul>
        </div>

        <div className="">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-espresso">
            Quick Links
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm leading-6 text-espresso/78">
            <Link to="/about" className="transition hover:text-espresso">About Us</Link>
            <Link to="/careers" className="transition hover:text-espresso">Careers</Link>
            <Link to="/loyalty" className="transition hover:text-espresso">Loyalty</Link>
            <Link to="/franchise" className="transition hover:text-espresso">Franchise</Link>
            <Link to="/contact" className="transition hover:text-espresso">Contact Us</Link>
            <Link to="/order" className="transition hover:text-espresso">Menu</Link>
          </div>
        </div>
      </div>
      <div className="relative border-t border-espresso/12 bg-espresso/5 px-5 py-5 text-center text-xs leading-6 text-espresso/72">
        © 2026 Mustafa Coffee House. All rights reserved. · Privacy Policy · Terms of Service · Website by Nebula Webtech LLC
      </div>
    </footer>
  );
}
