import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteNav } from "@/components/nav";

type CartLine = {
  key: string;
  item: { name: string; image: string; category: string };
  qty: number;
  unitPrice: number;
  summary?: string;
  request?: string;
};

function cleanCartText(value: string) {
  return value
    .replace(/\s+\?\s+/g, " - ")
    .replace(/\s+[^\s]*[^\x00-\x7F][^\s]*\s+/g, " - ")
    .replace(/\s+-\s+/g, " - ")
    .trim();
}
export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart - Mustafa Coffee House" }] }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState<CartLine[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("mchUserName") || "");
    try {
      const stored = JSON.parse(localStorage.getItem("mchCart") || "{}");
      setItems(Object.values(stored));
    } catch {
      setItems([]);
    }
  }, []);

  const total = useMemo(() => items.reduce((sum, line) => sum + line.unitPrice * line.qty, 0), [items]);
  const signedIn = userName.trim().length > 0;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-background via-cream to-latte/25 text-foreground">
      <SiteNav showSignIn={!signedIn} extras={signedIn ? <span className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink sm:inline-flex">{userName}</span> : undefined} />
      <main className="mx-auto flex-1 max-w-5xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">Your orders</div>
          <h1 className="mt-3 font-display text-5xl text-foreground">Full cart</h1>
        </div>
        <div className="rounded-3xl border border-border bg-background/80 p-5 shadow-luxury sm:p-8">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-gold-ink" />
              <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p>
              <Link to="/order" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso">Browse menu <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((line) => (
                <div key={line.key} className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[88px_1fr_auto] sm:items-center">
                  <img src={line.item.image} alt={line.item.name} className="h-22 w-22 aspect-square rounded-xl object-cover" />
                  <div>
                    <div className="font-display text-2xl">{line.item.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-ink">{cleanCartText(line.item.category)}</div>
                    {line.summary && <p className="mt-2 text-sm text-muted-foreground">{cleanCartText(line.summary)}</p>}
                    {line.request && <p className="mt-1 text-sm text-muted-foreground">Note: {cleanCartText(line.request)}</p>}
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-sm text-muted-foreground">Qty {line.qty}</div>
                    <div className="font-display text-3xl text-gold-gradient">${(line.unitPrice * line.qty).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-display text-4xl text-gold-gradient">${total.toFixed(2)}</div>
                {signedIn ? <button className="rounded-full bg-gradient-to-br from-gold-soft to-caramel px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow">Place order</button> : <Link to="/login" className="rounded-full border border-border px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Please sign in to place order</Link>}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
