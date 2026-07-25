import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteNav } from "@/components/nav";
import cafeCounterImg from "../../MUSTAFA PICTURES/1ST/_MG_0022.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us - Mustafa Coffee House" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="contact-page relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-background via-cream to-latte/25 text-foreground">
      <SiteNav />
      <main className="mx-auto flex-1 max-w-6xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
        <section className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">Contact Us</div>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">We are here all day, every day.</h1>
                        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">Questions about catering, private events, orders, or partnerships? Send a note and the Mustafa Coffee House team will follow up.</p>
            <div className="mt-8 max-w-xl overflow-hidden rounded-2xl border border-border bg-background/80 shadow-luxury">
              <iframe
                title="Mustafa Coffee House location map"
                src="https://www.google.com/maps?q=2509%20W%20Golf%20Rd%2C%20Hoffman%20Estates%2C%20IL%2060169&output=embed"
                className="h-[210px] w-full border-0 sm:h-[240px] lg:h-[260px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-col gap-3 border-t border-border bg-card/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">Find us</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">2509 W Golf Rd, Hoffman Estates, IL 60169</div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2509%20W%20Golf%20Rd%2C%20Hoffman%20Estates%2C%20IL%2060169"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso shadow-glow"
                >
                  Open Map <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid content-start gap-4 lg:col-span-5">
            {[
              { icon: MapPin, title: "Visit", body: "2509 W Golf Rd, Hoffman Estates, IL 60169" },
              { icon: Phone, title: "Call", body: "847 641-5915" },
              { icon: Mail, title: "Email", body: "hello@mustafacoffeehouse.com" },
            ].map((item) => (
              <div key={item.title} className="group relative min-h-[10.75rem] overflow-hidden rounded-3xl border border-border bg-background shadow-luxury">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cream" />
                <img
                  src={cafeCounterImg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 [clip-path:polygon(0_0,100%_0,100%_100%)] group-hover:scale-105 group-hover:opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-espresso/15 via-caramel/10 to-espresso/35 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="0" y1="0" x2="100" y2="100" stroke="oklch(0.76 0.13 82)" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_78%,oklch(0.86_0.08_85/0.22),transparent_42%)]" />
                <div className="relative z-10 flex min-h-[10.75rem] max-w-[68%] flex-col justify-end p-7 pt-12">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"><item.icon className="h-5 w-5" /></span>
                  <div className="mt-4 font-display text-2xl leading-none text-foreground">{item.title}</div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <form className="mt-14 grid gap-5 rounded-3xl border border-border bg-background/80 p-6 shadow-luxury sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <input className={inputCx} placeholder="Name" />
            <input className={inputCx} type="email" placeholder="Email" />
          </div>
          <input className={inputCx} placeholder="Subject" />
          <textarea className={`${inputCx} min-h-36 resize-none`} placeholder="Message" />
          <button type="button" className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow">Send Message <ArrowUpRight className="h-4 w-4" /></button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCx = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:shadow-glow";
