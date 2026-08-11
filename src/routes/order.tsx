import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Minus,
  Plus,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
  Volume2,
  VolumeX,
  X,
  Flame,
  Leaf,
  Snowflake,
  Coffee as CoffeeIcon,
  Croissant,
  CupSoda,
  Play,
  Pause,
} from "lucide-react";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { playClink, playPour, playSteam, playTap } from "@/lib/coffee-sounds";
import orderHeroVideo from "../assets/MUSTAFA VIDEOS/UBE LATTE + PERSONA.mp4";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Ahead - Mustafa Coffee House" },
      {
        name: "description",
        content:
          "Order signature espresso, pour-overs, boba, and pastries ahead. Skip the line - your table, your time.",
      },
      { property: "og:title", content: "Order Ahead - Mustafa Coffee House" },
      {
        property: "og:description",
        content:
          "Browse the menu, hear the pour, and place your order at Mustafa Coffee House.",
      },
    ],
  }),
  component: OrderPage,
});

type SectionId =
  | "hot-coffees-lattes"
  | "iced-coffees-lattes"
  | "refreshers"
  | "frappes"
  | "italian-milkshakes"
  | "energy-oasis"
  | "tea"
  | "gelato"
  | "fresh-baked"
  | "pastries"
  | "premium-nitro-brew"
  | "drinks"
  | "mch-merchandise";
type Item = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: SectionId;
  image: string;
};

type CustomizationChoice = {
  id: string;
  label: string;
  priceDelta?: number;
};

type CustomizationGroup = {
  id: string;
  label: string;
  hint: string;
  choices: CustomizationChoice[];
};

type CustomizationConfig = {
  groups: CustomizationGroup[];
  requestLabel: string;
};

type CartLine = {
  key: string;
  item: Item;
  qty: number;
  selections: {
    groupLabel: string;
    choiceLabel: string;
    priceDelta?: number;
  }[];
  request: string;
  unitPrice: number;
  summary: string;
};

type MenuSectionData = {
  id: SectionId;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: Item[];
};

type StoreLocation = {
  id: string;
  locationName: string;
  cityState: string;
  addressLines: string[];
  distance: string;
  open24Hours: boolean;
  pickupAvailable: boolean;
  prepTime: string;
  amenities: string[];
  directionsUrl: string;
  phone: string;
  hours: string[];
  openMinutes: number;
  closeMinutes: number;
  popularItems: string[];
  notes: string;
  pickupOptions: string[];
  latitude: number;
  longitude: number;
};

const FALLBACK_MENU_IMAGE = new URL(
  "../../MUSTAFA PICTURES/3RD/25.jpg",
  import.meta.url,
).href;

const BEVERAGE_MENU_IMAGE = new URL(
  "../../MUSTAFA PICTURES/Image.jpeg",
  import.meta.url,
).href;

const commonsImage = (_file: string, _width = 1400) => FALLBACK_MENU_IMAGE;

const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "hoffman-estates",
    locationName: "Mustafa Coffee House",
    cityState: "Hoffman Estates, Illinois",
    addressLines: ["2509 W Golf Rd", "Hoffman Estates, IL 60169"],
    distance: "0.0 mi",
    open24Hours: true,
    pickupAvailable: true,
    prepTime: "6 min",
    amenities: [
      "Open 24 Hours",
      "Wi-Fi",
      "Study Friendly",
      "Group Seating",
      "Accessible Entrance",
      "Parking",
      "Pickup",
      "Family Friendly",
    ],
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=2509%20W%20Golf%20Rd%2C%20Hoffman%20Estates%2C%20IL%2060169",
    phone: "8476415915",
    hours: ["Every day", "12:00 am - 11:59 pm"],
    openMinutes: 0,
    closeMinutes: 24 * 60 - 1,
    popularItems: ["Nitro Cold Brew", "Ube Latte", "Pistachio Croissant"],
    notes:
      "Primary location for quick pickup, late-night coffee, and dessert orders.",
    pickupOptions: ["Curbside pickup", "Counter pickup", "Late-night pickup"],
    latitude: 42.04561,
    longitude: -88.14029,
  },
  {
    id: "schaumburg",
    locationName: "Mustafa Coffee House Pickup",
    cityState: "Schaumburg, Illinois",
    addressLines: ["2720 Golf Rd", "Schaumburg, IL 60173"],
    distance: "4.6 mi",
    open24Hours: false,
    pickupAvailable: true,
    prepTime: "8 min",
    amenities: [
      "Wi-Fi",
      "Study Friendly",
      "Group Seating",
      "Accessible Entrance",
      "Parking",
      "Pickup",
      "Outdoor Seating",
    ],
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mustafa%20Coffee%20House%20Schaumburg%20IL",
    phone: "8475550184",
    hours: ["Every day", "6:00 am - 10:00 pm"],
    openMinutes: 6 * 60,
    closeMinutes: 22 * 60,
    popularItems: ["Cold Brew", "Matcha Boba", "Cardamom Bun"],
    notes:
      "Ideal for daytime orders, laptop work, and quick grab-and-go pickups.",
    pickupOptions: ["Lobby pickup", "Express pickup"],
    latitude: 42.0572,
    longitude: -88.1364,
  },
  {
    id: "rolling-meadows",
    locationName: "Mustafa Coffee House Lab",
    cityState: "Rolling Meadows, Illinois",
    addressLines: ["1111 Meadow Rd", "Rolling Meadows, IL 60008"],
    distance: "6.9 mi",
    open24Hours: false,
    pickupAvailable: true,
    prepTime: "10 min",
    amenities: [
      "Wi-Fi",
      "Study Friendly",
      "Group Seating",
      "Accessible Entrance",
      "Parking",
      "Pickup",
      "Prayer-Friendly Area",
    ],
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mustafa%20Coffee%20House%20Rolling%20Meadows%20IL",
    phone: "8475550140",
    hours: ["Every day", "7:00 am - 9:00 pm"],
    openMinutes: 7 * 60,
    closeMinutes: 21 * 60,
    popularItems: ["Espresso", "Lemon Refresher", "Chocolate Croissant"],
    notes:
      "A calm pickup stop for guests who want a quieter dining room or earlier daytime service.",
    pickupOptions: ["Pickup counter", "Phone-ahead pickup"],
    latitude: 42.0842,
    longitude: -88.0131,
  },
];

function isStoreOpen(store: StoreLocation, now: Date) {
  if (store.open24Hours) return true;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= store.openMinutes && minutes < store.closeMinutes;
}

type StoreViewLocation = StoreLocation & {
  isOpen: boolean;
};

function StoreSelectorSection({
  stores,
  selectedStoreId,
  onSelectStore,
}: {
  stores: StoreViewLocation[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const selectedStore =
    stores.find((store) => store.id === selectedStoreId) ?? stores[0];

  return (
    <section className="mt-12">
      <div className="rounded-[2.2rem] border border-border bg-card/95 px-5 py-6 shadow-luxury backdrop-blur sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-gold-ink">
              <MapPin className="h-3.5 w-3.5" />
              Store selection
            </div>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Choose your pickup location.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Compare nearby stores, check pickup timing, and choose the stop
              that fits your route.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div
              className="relative z-10 inline-flex rounded-full border border-border bg-background p-1"
              role="tablist"
              aria-label="Location display"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "list"}
                aria-controls="store-list-panel"
                data-no-magnetic
                onPointerDown={() => setViewMode("list")}
                onClick={() => setViewMode("list")}
                className={`touch-manipulation rounded-[1.25rem] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  viewMode === "list"
                    ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                    : "text-muted-foreground hover:bg-gold-soft/30 hover:text-gold-ink"
                }`}
              >
                List view
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "map"}
                aria-controls="store-map-panel"
                data-no-magnetic
                onPointerDown={() => setViewMode("map")}
                onClick={() => setViewMode("map")}
                className={`touch-manipulation rounded-[1.25rem] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  viewMode === "map"
                    ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                    : "text-muted-foreground hover:bg-gold-soft/30 hover:text-gold-ink"
                }`}
              >
                Map view
              </button>
            </div>
            <div className="text-right text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Current pickup
              <div className="mt-1 font-semibold text-foreground">
                {selectedStore.locationName}
              </div>
              <div className="mt-0.5 text-gold-ink">
                {selectedStore.cityState}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {viewMode === "list" ? (
            <Carousel
              id="store-list-panel"
              role="tabpanel"
              opts={{ align: "start", dragFree: true }}
              className="w-full"
              aria-label="Pickup locations"
            >
              <CarouselContent className="-ml-3 sm:-ml-4">
                {stores.map((store) => (
                  <CarouselItem
                    key={store.id}
                    className="pl-3 sm:basis-1/2 sm:pl-4 xl:basis-1/3"
                  >
                    <StoreCard
                      store={store}
                      selected={store.id === selectedStoreId}
                      onSelect={() => onSelectStore(store.id)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Swipe or use arrows to explore locations
                </span>
                <div className="flex items-center gap-2">
                  <CarouselPrevious className="static h-9 w-9 translate-x-0 translate-y-0 border-border bg-background text-foreground hover:border-gold hover:text-gold-ink" />
                  <CarouselNext className="static h-9 w-9 translate-x-0 translate-y-0 border-border bg-background text-foreground hover:border-gold hover:text-gold-ink" />
                </div>
              </div>
            </Carousel>
          ) : (
            <StoreMapView
              stores={stores}
              selectedStoreId={selectedStoreId}
              onSelectStore={onSelectStore}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function StoreCard({
  store,
  selected,
  onSelect,
}: {
  store: StoreViewLocation;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={`flex h-full min-h-[20rem] flex-col rounded-[1.75rem] border p-5 transition ${
        selected
          ? "border-gold/70 bg-gold-soft/10 shadow-glow"
          : "border-border bg-background/90 hover:border-gold/40 hover:shadow-luxury"
      }`}
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">
            {store.locationName}
          </div>
          <h3 className="mt-1 font-display text-2xl text-foreground">
            {store.cityState}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-background px-3 py-1">
              {store.distance}
            </span>
            <span
              className={`rounded-full px-3 py-1 ${
                store.isOpen
                  ? "border border-emerald-300/55 bg-emerald-100/80 text-emerald-900"
                  : "border border-rose-300/55 bg-rose-100/80 text-rose-900"
              }`}
            >
              {store.isOpen ? "Open now" : "Closed now"}
            </span>
            {store.open24Hours && (
              <span className="rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-gold-ink">
                24-hour
              </span>
            )}
            <span className="rounded-full border border-border bg-background px-3 py-1">
              {store.pickupAvailable ? "Pickup available" : "Pickup unavailable"}
            </span>
            <span className="rounded-full border border-border bg-background px-3 py-1">
              {store.prepTime} prep
            </span>
          </div>
        </div>

        <div className="mt-auto flex shrink-0 flex-wrap items-center gap-2 border-t border-border pt-4">
          <a
            href={store.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-gold hover:text-gold-ink"
          >
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </a>
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso shadow-glow transition hover:brightness-110"
          >
            {selected ? "Selected" : "Select store"}
            {!selected && <ArrowUpRight className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {store.amenities.slice(0, 6).map((amenity) => (
          <span
            key={amenity}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            <Check className="h-3 w-3 text-gold-ink" />
            {amenity}
          </span>
        ))}
      </div>
    </article>
  );
}

function StoreMapView({
  stores,
  selectedStoreId,
  onSelectStore,
}: {
  stores: StoreViewLocation[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
}) {
  const selectedStore =
    stores.find((store) => store.id === selectedStoreId) ?? stores[0];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-luxury">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">
            Interactive pickup map
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a pin to update your pickup location.
          </p>
        </div>
        <a
          href={selectedStore.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-gold hover:text-gold-ink"
        >
          <Navigation className="h-3.5 w-3.5" />
          Open directions
        </a>
      </div>
      <div
        id="store-map-panel"
        className="relative min-h-[28rem] scroll-mt-32 overflow-hidden bg-muted sm:min-h-[32rem]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.95_0.02_85),oklch(0.9_0.035_82))]" />
        <LeafletStoreMap
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={onSelectStore}
        />
        <div className="pointer-events-none absolute left-4 top-4 z-[500] max-w-[calc(100%-2rem)] rounded-2xl border border-border bg-background/92 px-4 py-3 shadow-luxury backdrop-blur sm:left-5 sm:top-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-ink">
            Selected pickup
          </div>
          <div className="mt-1 font-display text-xl text-foreground">
            {selectedStore.cityState}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {selectedStore.addressLines.join(" · ")} · {selectedStore.prepTime} prep
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-card/80 p-4 sm:p-5">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">
          Show another location
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {stores.map((store) => {
            const selected = store.id === selectedStoreId;
            return (
              <button
                key={store.id}
                type="button"
                data-no-magnetic
                onPointerDown={() => onSelectStore(store.id)}
                onClick={() => onSelectStore(store.id)}
                aria-pressed={selected}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  selected
                    ? "border-gold bg-gold-soft/20 text-foreground shadow-glow"
                    : "border-border bg-background text-muted-foreground hover:border-gold/50"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    selected
                      ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso"
                      : "bg-muted text-gold-ink"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-medium">
                    {store.cityState}
                  </strong>
                  <span className="text-xs">{store.prepTime} prep</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LeafletStoreMap({
  stores,
  selectedStoreId,
  onSelectStore,
}: {
  stores: StoreViewLocation[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let removeMap: (() => void) | undefined;

    void import("leaflet").then((leaflet) => {
      const container = containerRef.current;
      if (disposed || !container) return;

      const selectedStore =
        stores.find((store) => store.id === selectedStoreId) ?? stores[0];
      const map = leaflet.map(container, {
        center: [selectedStore.latitude, selectedStore.longitude],
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        })
        .addTo(map);

      const bounds = leaflet.latLngBounds(
        stores.map((store) => [store.latitude, store.longitude]),
      );

      stores.forEach((store) => {
        const selected = store.id === selectedStoreId;
        const icon = leaflet.divIcon({
          className: "",
          iconSize: [42, 42],
          iconAnchor: [21, 38],
          html: `<span aria-hidden="true" style="display:grid;width:42px;height:42px;place-items:center;border:4px solid #fff;border-radius:999px;background:${selected ? "#d7a05e" : "#39261f"};color:${selected ? "#39261f" : "#fffaf0"};box-shadow:0 10px 24px rgba(57,38,31,.28);font-size:18px;line-height:1">●</span>`,
        });
        const marker = leaflet
          .marker([store.latitude, store.longitude], { icon })
          .addTo(map)
          .on("click", () => onSelectStore(store.id));

        marker.bindTooltip(store.cityState, {
          direction: "top",
          offset: [0, -34],
          permanent: selected,
          opacity: 0.95,
        });
      });

      if (stores.length > 1) {
        map.fitBounds(bounds.pad(0.25), { maxZoom: 13, animate: false });
      }

      window.requestAnimationFrame(() => map.invalidateSize());
      removeMap = () => map.remove();
    });

    return () => {
      disposed = true;
      removeMap?.();
    };
  }, [onSelectStore, selectedStoreId, stores]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      role="application"
      aria-label="Interactive pickup location map"
    />
  );
}

function FloatingMenuButton({
  open,
  active,
  onToggle,
  onSelect,
}: {
  open: boolean;
  active: SectionId | "all";
  onToggle: () => void;
  onSelect: (id: SectionId | "all") => void;
}) {
  const quickLinks: { id: SectionId | "all"; label: string }[] = [
    { id: "all", label: "All items" },
    ...MENU_SECTIONS_WITH_IMAGES.map((section) => ({
      id: section.id,
      label: section.label,
    })),
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <div className={`mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-[1.5rem] border border-border bg-background/96 p-3 shadow-luxury backdrop-blur transition-all duration-300 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.24em] text-gold-ink">
            Quick menu
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition hover:border-gold hover:text-gold-ink"
          >
            Close
          </button>
        </div>
        <div className="quick-menu-scrollbar max-h-[min(78vh,42rem)] space-y-2 overflow-y-scroll pr-2 overscroll-contain">
          {quickLinks.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? "border-gold bg-gold-soft/15 text-gold-ink shadow-glow"
                    : "border-border bg-background text-foreground hover:border-gold/40 hover:bg-gold-soft/10"
                }`}
              >
                <span className="truncate">{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-espresso shadow-glow transition hover:brightness-110"
      >
        <CoffeeIcon className="h-4 w-4" />
        Menu
      </button>
    </div>
  );
}

function DetailBlock({
  label,
  value,
  icon,
  link,
  linkLabel,
}: {
  label: string;
  value: string[];
  icon: ReactNode;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-ink">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-soft/35 text-gold-ink">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 space-y-1 text-sm leading-6 text-foreground">
        {value.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      {link && (
        <a
          href={link}
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noreferrer" : undefined}
          className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink transition hover:text-espresso"
        >
          {linkLabel ?? "Open"}
        </a>
      )}
    </div>
  );
}

const MENU_SECTIONS: MenuSectionData[] = [
  {
    id: "hot-coffees-lattes",
    label: "Hot Coffees | Lattes",
    description:
      "Warm lattes, mochas, and house coffee served with rich espresso texture.",
    icon: Flame,
    items: [
      {
        id: "velvet-latte",
        name: "Velvet Latte",
        tagline: "Steamed milk - espresso silk",
        price: 5.95,
        category: "hot-coffees-lattes",
        image: commonsImage("Hot Latte.jpg"),
      },
      {
        id: "cafe-latte",
        name: "Cafe Latte",
        tagline: "Classic cup - creamy finish",
        price: 5.95,
        category: "hot-coffees-lattes",
        image: commonsImage("Hot Caffe Latte.jpg"),
      },
      {
        id: "classic-latte",
        name: "Classic Latte",
        tagline: "Smooth milk - soft crema",
        price: 5.75,
        category: "hot-coffees-lattes",
        image: commonsImage("Coffee Latte.JPG"),
      },
      {
        id: "signature-mocha",
        name: "Signature Mocha",
        tagline: "Cocoa swirl - espresso depth",
        price: 6.25,
        category: "hot-coffees-lattes",
        image: commonsImage("Mocha coffee.jpg"),
      },
    ],
  },
  {
    id: "iced-coffees-lattes",
    label: "Iced Coffees | Lattes",
    description:
      "Chilled espresso drinks, iced lattes, and cafe pours over ice.",
    icon: Snowflake,
    items: [
      {
        id: "iced-latte",
        name: "Iced Latte",
        tagline: "Ice-cold espresso - milk",
        price: 5.95,
        category: "iced-coffees-lattes",
        image: commonsImage("Iced Latte.jpg"),
      },
      {
        id: "bror-iced-latte",
        name: "BROR Iced Latte",
        tagline: "Tall pour - creamy finish",
        price: 6.25,
        category: "iced-coffees-lattes",
        image: commonsImage("Iced latte - BROR 2025-04-26.jpg"),
      },
      {
        id: "victrola-iced-latte",
        name: "Victrola Iced Latte",
        tagline: "Bright espresso - cold milk",
        price: 6.25,
        category: "iced-coffees-lattes",
        image: commonsImage(
          "Iced latte and a crossword, Victrola Roastery and Cafe, Capitol Hill, Seattle, Washington, USA - 20150813.jpg",
        ),
      },
      {
        id: "earl-grey-iced-latte",
        name: "Earl Grey Iced Latte",
        tagline: "Tea-kissed milk - espresso",
        price: 6.5,
        category: "iced-coffees-lattes",
        image: commonsImage(
          "Iced latte and Earl Grey tea cake at Rise and Grind Coffee Co, Bukit Timah Plaza, Singapore - 20160507.jpg",
        ),
      },
    ],
  },
  {
    id: "refreshers",
    label: "Refreshers",
    description:
      "Fruit-forward drinks with a bright, clean finish and a cooling lift.",
    icon: Leaf,
    items: [
      {
        id: "mango-refresher",
        name: "Mango Refresher",
        tagline: "Juicy mango - chilled sparkle",
        price: 5.5,
        category: "refreshers",
        image: commonsImage("Mango juice.JPG"),
      },
      {
        id: "raw-mango-refresher",
        name: "Raw Mango Refresher",
        tagline: "Tart mango - citrus edge",
        price: 5.5,
        category: "refreshers",
        image: commonsImage("Raw mango juice.jpg"),
      },
      {
        id: "lemon-refresher",
        name: "Lemon Refresher",
        tagline: "Fresh lemon - sweet snap",
        price: 5.25,
        category: "refreshers",
        image: commonsImage("Glass of lemonade.jpg"),
      },
      {
        id: "homemade-citrus-refresher",
        name: "Homemade Citrus Refresher",
        tagline: "Hand-squeezed - bright finish",
        price: 5.5,
        category: "refreshers",
        image: commonsImage("Homemade Lemonade.jpg"),
      },
    ],
  },
  {
    id: "frappes",
    label: "Frappes",
    description:
      "Blended iced treats with coffee, matcha, strawberry, and spice.",
    icon: CupSoda,
    items: [
      {
        id: "mocha-frappe",
        name: "Mocha Frappe",
        tagline: "Chocolate base - espresso chill",
        price: 6.75,
        category: "frappes",
        image: commonsImage(
          "A bottle of Starbucks Frappuccino (Mocha flavored).jpg",
        ),
      },
      {
        id: "matcha-frappe",
        name: "Matcha Frappe",
        tagline: "Green tea cream - blended ice",
        price: 6.75,
        category: "frappes",
        image: commonsImage("Starbucks Matcha Frappuccino.jpg"),
      },
      {
        id: "strawberry-frappe",
        name: "Strawberry Frappe",
        tagline: "Berry swirl - whipped finish",
        price: 6.5,
        category: "frappes",
        image: commonsImage("Strawberry Delight Frappuccino.JPG"),
      },
      {
        id: "pumpkin-frappe",
        name: "Pumpkin Spice Frappe",
        tagline: "Seasonal spice - frozen velvet",
        price: 6.75,
        category: "frappes",
        image: commonsImage("Starbucks Pumpkin Spice Latte Frappuccino.jpg"),
      },
    ],
  },
  {
    id: "italian-milkshakes",
    label: "Italian-Milkshakes",
    description:
      "Thick, creamy shakes with dessert-style flavors and a retro finish.",
    icon: CoffeeIcon,
    items: [
      {
        id: "chocolate-milkshake",
        name: "Chocolate Milkshake",
        tagline: "Cocoa blend - vanilla ice cream",
        price: 6.5,
        category: "italian-milkshakes",
        image: commonsImage("Chocolate milkshake.JPG"),
      },
      {
        id: "classic-chocolate-shake",
        name: "Classic Chocolate Shake",
        tagline: "Old-school diner style",
        price: 6.5,
        category: "italian-milkshakes",
        image: commonsImage("Chocolate Milkshake.jpg"),
      },
      {
        id: "double-chocolate-shake",
        name: "Double Chocolate Shake",
        tagline: "Rich cocoa - thick pour",
        price: 6.75,
        category: "italian-milkshakes",
        image: commonsImage("Chocolate milk shakes.jpg"),
      },
      {
        id: "celebration-shake",
        name: "Celebration Shake",
        tagline: "Dessert shake - glossy finish",
        price: 6.95,
        category: "italian-milkshakes",
        image: commonsImage("Chocolate Milkshake (52354323549).jpg"),
      },
    ],
  },
  {
    id: "energy-oasis",
    label: "Energy Oasis",
    description: "Bold energy drinks with a bright, high-voltage presentation.",
    icon: Flame,
    items: [
      {
        id: "energy-can-art",
        name: "Energy Can Art",
        tagline: "Citrus charge - crisp lift",
        price: 5.75,
        category: "energy-oasis",
        image: commonsImage("Energy drink can art.jpg"),
      },
      {
        id: "battery-cans",
        name: "Battery Cans",
        tagline: "Classic energy stack",
        price: 5.5,
        category: "energy-oasis",
        image: commonsImage("Energy Drink Battery Cans.jpg"),
      },
      {
        id: "neon-energy",
        name: "Neon Energy",
        tagline: "Sparkling power - ice cold",
        price: 5.95,
        category: "energy-oasis",
        image: commonsImage("Energy drinks (45597924825).jpg"),
      },
      {
        id: "mega-can",
        name: "Mega Can",
        tagline: "Tall pour - maximum boost",
        price: 6.25,
        category: "energy-oasis",
        image: commonsImage("Monster Energy Mega can.jpg"),
      },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    description:
      "Tea service with porcelain cups, floral notes, and calm finishes.",
    icon: Leaf,
    items: [
      {
        id: "tea-cup-one",
        name: "Heritage Tea Cup",
        tagline: "Classic serve - quiet pour",
        price: 4.5,
        category: "tea",
        image: commonsImage("Tea cup.jpg"),
      },
      {
        id: "tea-cup-two",
        name: "English Tea Cup",
        tagline: "Fine porcelain - warm steam",
        price: 4.5,
        category: "tea",
        image: commonsImage("Tea_Cup.jpg"),
      },
      {
        id: "traditional-tea",
        name: "Traditional Tea",
        tagline: "Slow steep - gentle aroma",
        price: 4.75,
        category: "tea",
        image: commonsImage("Traditional Tea Cup.jpg"),
      },
      {
        id: "tea-cup-saucer",
        name: "Tea Cup & Saucer",
        tagline: "Rounded cup - silky lift",
        price: 4.75,
        category: "tea",
        image: commonsImage("Tea Cup.jpg"),
      },
    ],
  },
  {
    id: "gelato",
    label: "Gelato",
    description:
      "Italian gelato cups with rich texture and dessert-house styling.",
    icon: Snowflake,
    items: [
      {
        id: "sicilian-gelato",
        name: "Sicilian Gelato",
        tagline: "Creamy scoop - cold velvet",
        price: 6.25,
        category: "gelato",
        image: commonsImage("Gelato ice cream.jpg"),
      },
      {
        id: "milano-gelato",
        name: "Milano Gelato",
        tagline: "Cup serve - elegant finish",
        price: 6.25,
        category: "gelato",
        image: commonsImage("Cup of gelato, Milano.jpg"),
      },
      {
        id: "artisan-gelato",
        name: "Artisan Gelato",
        tagline: "Small batch - soft melt",
        price: 6.5,
        category: "gelato",
        image: commonsImage("Gelato Ice Cream (42356096320).jpg"),
      },
      {
        id: "minimal-gelato",
        name: "Minimal Gelato",
        tagline: "Clean plate - pure dairy",
        price: 6.25,
        category: "gelato",
        image: commonsImage("Ice Cream (52240273543).jpg"),
      },
    ],
  },
  {
    id: "fresh-baked",
    label: "Fresh Baked",
    description:
      "Bread, rolls, and daily oven-baked items served warm from the tray.",
    icon: Croissant,
    items: [
      {
        id: "massachusetts-bread",
        name: "Massachusetts Bread",
        tagline: "Rustic loaf - fresh crust",
        price: 4.75,
        category: "fresh-baked",
        image: commonsImage("Bread at a Massachusetts bakery.jpg"),
      },
      {
        id: "bakery-rolls",
        name: "Bakery Rolls",
        tagline: "Soft center - golden top",
        price: 4.5,
        category: "fresh-baked",
        image: commonsImage("Bread rolls at a bakery.jpg"),
      },
      {
        id: "oven-bread",
        name: "Oven Bread",
        tagline: "Hot bake - airy crumb",
        price: 4.95,
        category: "fresh-baked",
        image: commonsImage("Bakery oven bread, 2013.jpg"),
      },
      {
        id: "bread-loaf",
        name: "Bread Loaf",
        tagline: "Country style - simple and warm",
        price: 4.5,
        category: "fresh-baked",
        image: commonsImage("Bread001.jpg"),
      },
    ],
  },
  {
    id: "pastries",
    label: "Pastries",
    description:
      "Flaky, buttery pastries and elegant baked treats from the morning case.",
    icon: Croissant,
    items: [
      {
        id: "whole-croissant",
        name: "Whole Croissant",
        tagline: "Butter layers - crisp shell",
        price: 4.75,
        category: "pastries",
        image: commonsImage("Croissant, whole.jpg"),
      },
      {
        id: "classic-croissant",
        name: "Classic Croissant",
        tagline: "French-style - warm crumb",
        price: 4.5,
        category: "pastries",
        image: commonsImage("Croissant.jpg"),
      },
      {
        id: "boutique-croissant",
        name: "Boutique Croissant",
        tagline: "Fine pastry - golden bake",
        price: 4.95,
        category: "pastries",
        image: commonsImage("Croissant (238010371).jpeg"),
      },
      {
        id: "pastry-plate",
        name: "Pastry Plate",
        tagline: "Assorted pastry - bakery share",
        price: 5.25,
        category: "pastries",
        image: commonsImage("Pastry,.jpg"),
      },
    ],
  },
  {
    id: "premium-nitro-brew",
    label: "Premium Nitro Brew",
    description:
      "Nitro taps and cold-brew pours with a creamy, cascading head.",
    icon: Snowflake,
    items: [
      {
        id: "nitro-brew",
        name: "Nitro Cold Brew",
        tagline: "Velvet foam - cool intensity",
        price: 6.95,
        category: "premium-nitro-brew",
        image: commonsImage("Nitro Cold Brew.jpg"),
      },
      {
        id: "nitro-taps",
        name: "Nitro Taps",
        tagline: "On-tap pour - chilled finish",
        price: 6.95,
        category: "premium-nitro-brew",
        image: commonsImage("Nitro cold brew taps.jpg"),
      },
      {
        id: "cold-brew-coffee",
        name: "Cold Brew Coffee",
        tagline: "Slow steep - bold sip",
        price: 6.75,
        category: "premium-nitro-brew",
        image: commonsImage("Cold brew coffee.jpg"),
      },
      {
        id: "canned-cold-brew",
        name: "Canned Cold Brew",
        tagline: "Portable nitro - crisp finish",
        price: 6.5,
        category: "premium-nitro-brew",
        image: commonsImage("ColdBrewCoffeein Cans.png"),
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    description:
      "A wider drinks shelf with soda, smoothies, and cafe classics.",
    icon: CupSoda,
    items: [
      {
        id: "fountain-soda",
        name: "Fountain Soda",
        tagline: "Chilled pour - bright bubbles",
        price: 3.5,
        category: "drinks",
        image: commonsImage("Soda.jpg"),
      },
      {
        id: "fruit-smoothie",
        name: "Fruit Smoothie",
        tagline: "Strawberry blend - frosty finish",
        price: 5.75,
        category: "drinks",
        image: commonsImage("Smoothie.JPG"),
      },
      {
        id: "garden-smoothie",
        name: "Garden Smoothie",
        tagline: "Fresh blend - bright fruit",
        price: 5.95,
        category: "drinks",
        image: commonsImage("Smoothie (8346764152).jpg"),
      },
      {
        id: "coffee-mug-drink",
        name: "House Mug Drink",
        tagline: "Coffee served simple and hot",
        price: 4.5,
        category: "drinks",
        image: commonsImage("Coffee mug on table.jpg"),
      },
    ],
  },
  {
    id: "mch-merchandise",
    label: "MCH Merchandise",
    description:
      "Brand pieces and cafe keepsakes for the counter and the checkout line.",
    icon: ShoppingBag,
    items: [
      {
        id: "coffee-mugs",
        name: "MCH Coffee Mugs",
        tagline: "Ceramic mug set - cafe logo",
        price: 16.0,
        category: "mch-merchandise",
        image: commonsImage("Coffee mugs.jpg"),
      },
      {
        id: "canvas-tote",
        name: "Canvas Tote",
        tagline: "Carry cups - carry beans",
        price: 14.0,
        category: "mch-merchandise",
        image: commonsImage("Totebag.jpg"),
      },
      {
        id: "artist-tote",
        name: "Artist Tote",
        tagline: "Soft canvas - everyday carry",
        price: 15.0,
        category: "mch-merchandise",
        image: commonsImage("Tote Bag.jpeg"),
      },
      {
        id: "mch-shirt",
        name: "MCH T-Shirt",
        tagline: "Minimal mark - heavyweight cotton",
        price: 22.0,
        category: "mch-merchandise",
        image: commonsImage("T-shirt.jpg"),
      },
    ],
  },
];

const CATEGORY_IMAGES: Record<SectionId, string> = {
  "hot-coffees-lattes": BEVERAGE_MENU_IMAGE,
  "iced-coffees-lattes": BEVERAGE_MENU_IMAGE,
  refreshers: BEVERAGE_MENU_IMAGE,
  frappes: BEVERAGE_MENU_IMAGE,
  "italian-milkshakes": BEVERAGE_MENU_IMAGE,
  "energy-oasis": BEVERAGE_MENU_IMAGE,
  tea: BEVERAGE_MENU_IMAGE,
  gelato: FALLBACK_MENU_IMAGE,
  "fresh-baked": FALLBACK_MENU_IMAGE,
  pastries: FALLBACK_MENU_IMAGE,
  "premium-nitro-brew": BEVERAGE_MENU_IMAGE,
  drinks: BEVERAGE_MENU_IMAGE,
  "mch-merchandise": FALLBACK_MENU_IMAGE,
};

const MENU_SECTIONS_WITH_IMAGES: MenuSectionData[] = MENU_SECTIONS.map(
  (section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      image: CATEGORY_IMAGES[section.id],
    })),
  }),
);

const MENU: Item[] = MENU_SECTIONS_WITH_IMAGES.flatMap(
  (section) => section.items,
);

const ZERO_PRICE = 0;

const SECTION_CUSTOMIZATION: Partial<Record<SectionId, CustomizationConfig>> = {
  "hot-coffees-lattes": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "milk",
        label: "Milk Finish",
        hint: "Select only 1",
        choices: [
          { id: "whole-milk", label: "Whole Milk (regular milk)" },
          { id: "oat", label: "Oat", priceDelta: 0.75 },
          { id: "almond", label: "Almond", priceDelta: 0.75 },
          { id: "skim", label: "Skim", priceDelta: 0.75 },
          { id: "2-percent", label: "2 Percent Milk" },
          { id: "coconut", label: "Coconut Milk", priceDelta: 0.5 },
        ],
      },
      {
        id: "sweetness",
        label: "Sweetness Level",
        hint: "Select up to 1",
        choices: [
          { id: "less", label: "Less Sweet" },
          { id: "regular", label: "Regular Sweet" },
          { id: "extra", label: "Extra Sweet" },
        ],
      },
      {
        id: "shot",
        label: "Espresso Shot",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "No Extra Shot" },
          { id: "one", label: "1 Extra Shot", priceDelta: 0.75 },
          { id: "two", label: "2 Extra Shots", priceDelta: 1.25 },
        ],
      },
    ],
  },
  "iced-coffees-lattes": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "milk",
        label: "Milk Finish",
        hint: "Select only 1",
        choices: [
          { id: "whole-milk", label: "Whole Milk" },
          { id: "oat", label: "Oat", priceDelta: 0.75 },
          { id: "almond", label: "Almond", priceDelta: 0.75 },
          { id: "skim", label: "Skim", priceDelta: 0.75 },
        ],
      },
      {
        id: "ice",
        label: "Ice Level",
        hint: "Select only 1",
        choices: [
          { id: "light", label: "Light Ice" },
          { id: "regular", label: "Regular Ice" },
          { id: "extra", label: "Extra Ice" },
        ],
      },
      {
        id: "sweetener",
        label: "Sweetness",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "No Sweetener" },
          { id: "vanilla", label: "Vanilla" },
          { id: "caramel", label: "Caramel" },
          { id: "hazelnut", label: "Hazelnut" },
        ],
      },
    ],
  },
  refreshers: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "chill",
        label: "Chill Level",
        hint: "Select only 1",
        choices: [
          { id: "light", label: "Light Ice" },
          { id: "regular", label: "Regular Ice" },
          { id: "extra", label: "Extra Ice" },
        ],
      },
      {
        id: "fruit",
        label: "Fruit Boost",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "No Add-on" },
          { id: "boba", label: "Boba Pearls", priceDelta: 0.5 },
          { id: "fruit", label: "Fresh Fruit", priceDelta: 0.5 },
        ],
      },
    ],
  },
  frappes: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "whip",
        label: "Whipped Finish",
        hint: "Select only 1",
        choices: [
          { id: "classic", label: "Classic Whip" },
          { id: "extra", label: "Extra Whip", priceDelta: 0.5 },
          { id: "none", label: "No Whip" },
        ],
      },
      {
        id: "texture",
        label: "Texture",
        hint: "Select only 1",
        choices: [
          { id: "thick", label: "Thick Blend" },
          { id: "regular", label: "Regular Blend" },
          { id: "light", label: "Light Ice" },
        ],
      },
      {
        id: "drizzle",
        label: "Drizzle",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "No Drizzle" },
          { id: "chocolate", label: "Chocolate" },
          { id: "caramel", label: "Caramel" },
        ],
      },
    ],
  },
  "italian-milkshakes": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "finish",
        label: "Serving Style",
        hint: "Select only 1",
        choices: [
          { id: "classic", label: "Classic Glass" },
          { id: "dessert", label: "Dessert Cup" },
          { id: "tall", label: "Tall Glass" },
        ],
      },
      {
        id: "topper",
        label: "Topping",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "No Topping" },
          { id: "shavings", label: "Chocolate Shavings", priceDelta: 0.5 },
          { id: "crumbles", label: "Cookie Crumbles", priceDelta: 0.75 },
        ],
      },
    ],
  },
  "energy-oasis": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Can Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "chill",
        label: "Chill Level",
        hint: "Select only 1",
        choices: [
          { id: "ice-cold", label: "Ice Cold" },
          { id: "extra", label: "Extra Chill" },
          { id: "light", label: "Light Ice" },
        ],
      },
    ],
  },
  tea: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.5 },
        ],
      },
      {
        id: "strength",
        label: "Tea Strength",
        hint: "Select only 1",
        choices: [
          { id: "light", label: "Light Steep" },
          { id: "classic", label: "Classic Steep" },
          { id: "bold", label: "Bold Steep" },
        ],
      },
      {
        id: "accent",
        label: "Tea Accent",
        hint: "Select up to 1",
        choices: [
          { id: "none", label: "Plain" },
          { id: "honey", label: "Honey" },
          { id: "lemon", label: "Lemon" },
        ],
      },
    ],
  },
  gelato: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "scoop",
        label: "Scoop Style",
        hint: "Select only 1",
        choices: [
          { id: "single", label: "Single Scoop" },
          { id: "double", label: "Double Scoop", priceDelta: 2 },
        ],
      },
      {
        id: "finish",
        label: "Finish",
        hint: "Select only 1",
        choices: [
          { id: "cup", label: "Cup" },
          { id: "cone", label: "Cone", priceDelta: 0.5 },
          { id: "brulee", label: "Brulee Top", priceDelta: 1 },
        ],
      },
    ],
  },
  "fresh-baked": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "warmth",
        label: "Warmth",
        hint: "Select only 1",
        choices: [
          { id: "warm", label: "Warm" },
          { id: "toasted", label: "Toasted" },
          { id: "room", label: "Room Temperature" },
        ],
      },
      {
        id: "spread",
        label: "Served With",
        hint: "Select up to 1",
        choices: [
          { id: "plain", label: "Plain" },
          { id: "butter", label: "Butter" },
          { id: "jam", label: "Jam" },
        ],
      },
    ],
  },
  pastries: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "heat",
        label: "Heating",
        hint: "Select only 1",
        choices: [
          { id: "warm", label: "Warm" },
          { id: "room", label: "Room Temperature" },
        ],
      },
      {
        id: "pairing",
        label: "Pairing",
        hint: "Select up to 1",
        choices: [
          { id: "plain", label: "Plain" },
          { id: "cream", label: "Cream", priceDelta: 0.5 },
          { id: "espresso-dust", label: "Espresso Dust", priceDelta: 0.5 },
        ],
      },
    ],
  },
  "premium-nitro-brew": {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Pour Size",
        hint: "Select only 1",
        choices: [
          { id: "single", label: "Single" },
          { id: "tall", label: "Tall", priceDelta: 0.75 },
        ],
      },
      {
        id: "foam",
        label: "Nitro Finish",
        hint: "Select only 1",
        choices: [
          { id: "plain", label: "Plain" },
          { id: "extra", label: "Extra Foam" },
          { id: "vanilla", label: "Vanilla Cream", priceDelta: 0.5 },
        ],
      },
    ],
  },
  drinks: {
    requestLabel: "Optional special request",
    groups: [
      {
        id: "size",
        label: "Cup Size",
        hint: "Select only 1",
        choices: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 0.75 },
        ],
      },
      {
        id: "serve",
        label: "Serving Style",
        hint: "Select only 1",
        choices: [
          { id: "cold", label: "Cold" },
          { id: "ice", label: "Over Ice" },
          { id: "no-ice", label: "No Ice" },
        ],
      },
      {
        id: "sweetness",
        label: "Sweetness",
        hint: "Select only 1",
        choices: [
          { id: "less", label: "Less Sweet" },
          { id: "regular", label: "Regular Sweet" },
          { id: "extra", label: "Extra Sweet" },
        ],
      },
    ],
  },
  "mch-merchandise": {
    requestLabel: "Optional request or note",
    groups: [],
  },
};

const ITEM_CUSTOMIZATION: Partial<Record<string, CustomizationConfig>> = {
  "mch-shirt": {
    requestLabel: "Optional request or note",
    groups: [
      {
        id: "size",
        label: "Shirt Size",
        hint: "Select only 1",
        choices: [
          { id: "s", label: "Small" },
          { id: "m", label: "Medium" },
          { id: "l", label: "Large" },
          { id: "xl", label: "XL" },
        ],
      },
    ],
  },
};

function getCustomizationConfig(item: Item): CustomizationConfig {
  return (
    ITEM_CUSTOMIZATION[item.id] ??
    SECTION_CUSTOMIZATION[item.category] ?? {
      requestLabel: "Optional special request",
      groups: [],
    }
  );
}

function formatOptionPrice(delta?: number) {
  if (!delta || delta === ZERO_PRICE) return "";
  return `+$${delta.toFixed(2)}`;
}

function getSelectionSummary(
  selections: {
    groupLabel: string;
    choiceLabel: string;
    priceDelta?: number;
  }[],
) {
  return selections
    .map((selection) => `${selection.groupLabel}: ${selection.choiceLabel}`)
    .join(" - ");
}

function cleanCartText(value: string) {
  return value
    .replace(/\s+\?\s+/g, " - ")
    .replace(/\s+[^\s]*[^\x00-\x7F][^\s]*\s+/g, " - ")
    .replace(/\s+-\s+/g, " - ")
    .trim();
}
const CATEGORIES: {
  id: SectionId | "all";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "all", label: "All", icon: CoffeeIcon },
  ...MENU_SECTIONS_WITH_IMAGES.map((section) => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
  })),
];

export function OrderPage() {
  const [active, setActive] = useState<SectionId | "all">("all");
  const [cart, setCart] = useState<Record<string, CartLine>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("mchCart") || "{}");
    } catch {
      return {};
    }
  });
  const [userName, setUserName] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(() => {
    if (typeof window === "undefined") return STORE_LOCATIONS[0].id;
    try {
      return localStorage.getItem("mchSelectedStore") || STORE_LOCATIONS[0].id;
    } catch {
      return STORE_LOCATIONS[0].id;
    }
  });
  const [timeTick, setTimeTick] = useState(() => Date.now());
  const [customizerItem, setCustomizerItem] = useState<Item | null>(null);
  const [customRequest, setCustomRequest] = useState("");
  const [customSelections, setCustomSelections] = useState<
    Record<string, string>
  >({});

  const sfx = useMemo(
    () => ({
      clink: () => !muted && playClink(),
      pour: () => !muted && playPour(),
      steam: () => !muted && playSteam(),
      tap: () => !muted && playTap(),
    }),
    [muted],
  );

  const cartItems = Object.values(cart);
  const total = cartItems.reduce((s, line) => s + line.unitPrice * line.qty, 0);
  const count = cartItems.reduce((s, line) => s + line.qty, 0);
  const isSignedIn = userName.trim().length > 0;

  useEffect(() => {
    setUserName(localStorage.getItem("mchUserName") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("mchCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("mchSelectedStore", selectedStoreId);
    } catch {
      // Ignore storage failures and keep the selection in memory.
    }
  }, [selectedStoreId]);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeTick(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleSections =
    active === "all"
      ? MENU_SECTIONS_WITH_IMAGES
      : MENU_SECTIONS_WITH_IMAGES.filter((s) => s.id === active);
  const currentTime = useMemo(() => new Date(timeTick), [timeTick]);
  const storeLocations = useMemo(
    () =>
      STORE_LOCATIONS.map((store) => ({
        ...store,
        isOpen: isStoreOpen(store, currentTime),
      })),
    [currentTime],
  );
  const selectedStore =
    storeLocations.find((store) => store.id === selectedStoreId) ??
    storeLocations[0];

  const openCustomizer = (item: Item) => {
    sfx.tap();
    const config = getCustomizationConfig(item);
    setCustomizerItem(item);
    setCustomRequest("");
    setCustomSelections(
      Object.fromEntries(
        config.groups.map((group) => [group.id, group.choices[0]?.id ?? ""]),
      ),
    );
  };

  const closeCustomizer = () => {
    setCustomizerItem(null);
    setCustomRequest("");
    setCustomSelections({});
  };

  const incrementLine = (line: CartLine) => {
    sfx.clink();
    setCart((current) => ({
      ...current,
      [line.key]: { ...line, qty: line.qty + 1 },
    }));
  };

  const removeLine = (line: CartLine) => {
    sfx.tap();
    setCart((current) => {
      const n = { ...current };
      if ((n[line.key]?.qty ?? 0) <= 1) delete n[line.key];
      else n[line.key] = { ...n[line.key], qty: n[line.key].qty - 1 };
      return n;
    });
  };

  const currentCustomizerConfig = customizerItem
    ? getCustomizationConfig(customizerItem)
    : null;
  const currentSelections = currentCustomizerConfig
    ? currentCustomizerConfig.groups.map((group) => ({
        group,
        choice:
          group.choices.find(
            (choice) => choice.id === customSelections[group.id],
          ) ?? group.choices[0],
      }))
    : [];
  const currentSelectionSummary = currentSelections
    .filter((entry) => entry.choice)
    .map((entry) => ({
      groupLabel: entry.group.label,
      choiceLabel: entry.choice?.label ?? "",
      priceDelta: entry.choice?.priceDelta,
    }));
  const currentUnitPrice =
    (customizerItem?.price ?? 0) +
    currentSelectionSummary.reduce(
      (sum, choice) => sum + (choice.priceDelta ?? 0),
      0,
    );
  const canAddCurrent =
    !!customizerItem &&
    currentCustomizerConfig !== null &&
    currentCustomizerConfig.groups.every((group) => customSelections[group.id]);

  const handleAddCurrent = (qty: number = 1) => {
    if (!customizerItem || !currentCustomizerConfig || !canAddCurrent) return;
    const request = customRequest.trim();
    const summary = getSelectionSummary(currentSelectionSummary);
    const key = [
      customizerItem.id,
      ...currentCustomizerConfig.groups.map(
        (group) => customSelections[group.id] ?? "",
      ),
      request.toLowerCase(),
    ].join("|");
    const addQty = Math.max(1, qty);

    sfx.clink();
    setCart((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: {
          key,
          item: customizerItem,
          qty: (existing?.qty ?? 0) + addQty,
          selections: currentSelectionSummary,
          request,
          unitPrice: currentUnitPrice,
          summary,
        },
      };
    });
    closeCustomizer();
  };
  const placeOrder = () => {
    if (!selectedStore?.isOpen) return;
    sfx.pour();
    setPlaced(true);
    window.setTimeout(() => {
      setCart({});
      setPlaced(false);
      setCartOpen(false);
    }, 2200);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-hero text-foreground">
      <SiteNav
        showSignIn={!isSignedIn}
        extras={
          <>
            <span className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink xl:inline-flex">
              {selectedStore.cityState}
            </span>
            <button
              type="button"
              onClick={() => {
                setMuted((m) => !m);
                if (!muted) playTap();
              }}
              aria-label={muted ? "Unmute sounds" : "Mute sounds"}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition hover:border-gold hover:text-gold-ink"
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            {isSignedIn && (
              <span className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold-ink sm:inline-flex">
                {userName}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                sfx.tap();
                setCartOpen(true);
              }}
              className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-espresso shadow-glow transition hover:brightness-110 sm:px-4"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-espresso px-1.5 text-[10px] text-gold">
                  {count}
                </span>
              )}
            </button>
          </>
        }
      />

      <main className="mx-auto flex-1 max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pt-44">
        <VideoHero onPour={sfx.pour} onListen={sfx.steam} />
        <StoreSelectorSection
          stores={storeLocations}
          selectedStoreId={selectedStore.id}
          onSelectStore={setSelectedStoreId}
        />

        <div
          id="menu-start"
          className="mt-16 rounded-[2rem] border border-border bg-card px-4 py-4 shadow-luxury backdrop-blur sm:px-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
                Browse menu
              </div>
              <h2 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                All categories, all in one place.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Use the chips to jump to each section. Product details,
                customization options, price, and pickup time are organized in
                easy-to-scan rows.
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {MENU.length} items available
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    sfx.tap();
                    setActive(c.id);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow"
                      : "border border-border text-muted-foreground hover:border-gold hover:text-gold-ink"
                  }`}
                >
                  <c.icon className="h-3.5 w-3.5" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-16">
          {visibleSections.map((section) => (
            <MenuSectionBlock
              key={section.id}
              section={section}
              cart={cart}
              onCustomize={openCustomizer}
              onHover={sfx.steam}
            />
          ))}
        </div>
      </main>
      <SiteFooter />

      <CartDrawer
        open={cartOpen}
        onClose={() => {
          sfx.tap();
          setCartOpen(false);
        }}
        items={cartItems}
        total={total}
        onAdd={incrementLine}
        onRemove={removeLine}
        onPlace={placeOrder}
        placed={placed}
        isSignedIn={isSignedIn}
        selectedStore={selectedStore}
      />
      <ProductCustomizerDialog
        item={customizerItem}
        config={currentCustomizerConfig}
        selections={customSelections}
        onSelectionChange={(groupId, choiceId) =>
          setCustomSelections((current) => ({
            ...current,
            [groupId]: choiceId,
          }))
        }
        request={customRequest}
        onRequestChange={setCustomRequest}
        onClose={closeCustomizer}
        onAdd={handleAddCurrent}
        unitPrice={currentUnitPrice}
        canAdd={canAddCurrent}
      />

      <FloatingMenuButton
        open={floatingMenuOpen}
        active={active}
        onToggle={() => setFloatingMenuOpen((current) => !current)}
        onSelect={(id) => {
          setActive(id);
          setFloatingMenuOpen(false);
          const target = document.getElementById(id === "all" ? "menu-start" : `menu-${id}`);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    </div>
  );
}

function MenuSectionBlock({
  section,
  cart,
  onCustomize,
  onHover,
}: {
  section: MenuSectionData;
  cart: Record<string, CartLine>;
  onCustomize: (item: Item) => void;
  onHover: () => void;
}) {
  return (
    <section id={`menu-${section.id}`} className="scroll-mt-28">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold-ink">
            {section.label}
          </div>
          <h3 className="mt-2 font-display text-4xl text-foreground">
            {section.label} menu
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {section.description}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <section.icon className="h-4 w-4 text-gold-ink" />
          {section.items.length} selections
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {section.items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            qty={Object.values(cart).reduce(
              (sum, line) => sum + (line.item.id === item.id ? line.qty : 0),
              0,
            )}
            onCustomize={() => onCustomize(item)}
            onHover={onHover}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Video hero: coffee pour ---------- */
function VideoHero({
  onPour,
  onListen,
}: {
  onPour: () => void;
  onListen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      onPour();
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-6" data-parallax data-parallax-speed="0.12">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-gold-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />{" "}
          Order Ahead
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-foreground">
          Hear the <em className="italic text-gold-gradient">pour.</em>
          <br /> Skip the line.
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Tap a drink to add it to your table. Every interaction plays a small
          coffee sound - sip on the ambience while you build your order.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onPour}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110"
          >
            Listen to the pour
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={onListen}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-gold hover:bg-gold/10"
          >
            Steam wand
          </button>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div
          className="relative mx-auto aspect-square w-full max-w-md"
          data-parallax
          data-parallax-speed="0.18"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/20 via-transparent to-caramel/20 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] ring-1 ring-gold/30 shadow-luxury">
            <video
              ref={videoRef}
              src={orderHeroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              data-parallax
              data-parallax-speed="0.08"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/30" />
            {/* Falling beans over the video */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-3 w-2 rounded-full bg-gradient-to-br from-caramel to-espresso opacity-80 animate-bean-fall"
                  style={{
                    left: `${(i * 17 + 5) % 95}%`,
                    top: `-${(i % 4) * 10 + 10}%`,
                    animationDelay: `${(i % 6) * 0.4}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                    transform: `rotate(${i * 27}deg)`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso shadow-glow transition hover:brightness-110"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold-ink backdrop-blur">
              Live pour
            </div>
          </div>
          <div className="absolute -bottom-3 -left-3 rounded-2xl glass-panel px-4 py-3 shadow-luxury">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-ink">
              Signature
            </div>
            <div className="font-display text-lg text-foreground">
              Slow drip craft
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Compact, information-first product row ---------- */
function MenuCard({
  item,
  qty,
  onCustomize,
  onHover,
}: {
  item: Item;
  qty: number;
  onCustomize: () => void;
  onHover: () => void;
}) {
  const customizationGroups = getCustomizationConfig(item).groups;

  return (
    <article
      onMouseEnter={onHover}
      className="group grid min-h-[11rem] grid-cols-[7.5rem_minmax(0,1fr)] overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-luxury transition duration-300 hover:-translate-y-0.5 hover:border-gold/55 sm:grid-cols-[11rem_minmax(0,1fr)_12rem]"
    >
      <div className="relative min-h-[8.5rem] overflow-hidden sm:min-h-[11rem]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={352}
          height={352}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-espresso/15" />
        {qty > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-espresso px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream shadow-luxury">
            {qty} in cart
          </span>
        )}
      </div>

      <div className="min-w-0 p-4 sm:p-5 lg:px-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-gold-ink">
          {item.category.replaceAll("-", " ")}
        </div>
        <h4 className="mt-1 font-display text-xl leading-tight text-foreground sm:text-2xl">
          {item.name}
        </h4>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {item.tagline}
        </p>
        <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
          {customizationGroups.slice(0, 3).map((group) => (
            <span
              key={group.id}
              className="rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
            >
              {group.label}
            </span>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 border-t border-border bg-background/65 p-4 sm:col-span-1 sm:flex-col sm:items-stretch sm:justify-center sm:border-l sm:border-t-0 sm:p-5">
        <div className="sm:text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gold-ink">
            From
          </div>
          <div className="font-display text-2xl text-gold-gradient sm:text-3xl">
            ${item.price.toFixed(2)}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Ready in about 6 min
          </div>
        </div>
        <button
          type="button"
          onClick={onCustomize}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-espresso shadow-glow transition hover:brightness-110"
        >
          <Plus className="h-3.5 w-3.5" /> Customize
        </button>
      </div>
    </article>
  );
}

function ProductCustomizerDialog({
  item,
  config,
  selections,
  onSelectionChange,
  request,
  onRequestChange,
  onClose,
  onAdd,
  unitPrice,
  canAdd,
}: {
  item: Item | null;
  config: CustomizationConfig | null;
  selections: Record<string, string>;
  onSelectionChange: (groupId: string, choiceId: string) => void;
  request: string;
  onRequestChange: (value: string) => void;
  onClose: () => void;
  onAdd: (qty: number) => void;
  unitPrice: number;
  canAdd: boolean;
}) {
  const groups = config?.groups ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const handleWheel = (event: WheelEvent) => {
      const scroller = scrollRef.current;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (!scroller) return;

      scroller.scrollTop += event.deltaY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    document.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });
    document.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [item]);

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "overflow-hidden border border-border bg-card p-0 text-foreground shadow-luxury",
          "flex max-h-[92vh] w-[min(720px,94vw)] flex-col gap-0",
        )}
      >
        {item && config && (
          <>
            <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
              <DialogHeader className="border-b border-border bg-gradient-to-br from-background via-card to-muted px-5 py-5 text-left sm:px-7 sm:py-6">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  Product options
                </div>
                <DialogTitle className="mt-3 break-words font-display text-[clamp(1.6rem,6vw,2.5rem)] leading-[0.98] text-foreground">
                  {item.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-6 text-muted-foreground">
                  {item.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="px-5 py-6 sm:px-7">
                <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-luxury">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                  <span className="rounded-full border border-border bg-background px-3 py-1 uppercase tracking-[0.18em] text-gold-ink">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-border bg-background px-3 py-1">
                    Base ${item.price.toFixed(2)}
                  </span>
                  <span className="rounded-full border border-border bg-background px-3 py-1">
                    Current ${unitPrice.toFixed(2)}
                  </span>
                </div>

                {groups.length > 0 ? (
                  <div className="mt-8 space-y-8">
                    {groups.map((group) => (
                      <section key={group.id} className="space-y-3">
                        <h4 className="font-display text-lg leading-tight text-foreground sm:text-xl">
                          {group.label}{" "}
                          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                            ({group.hint})
                          </span>
                        </h4>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {group.choices.map((choice) => {
                            const selected = selections[group.id] === choice.id;
                            return (
                              <button
                                key={choice.id}
                                type="button"
                                onClick={() =>
                                  onSelectionChange(group.id, choice.id)
                                }
                                className={cn(
                                  "group flex w-full items-center justify-between gap-3 rounded-[1.25rem] border px-4 py-3.5 text-left transition",
                                  selected
                                    ? "border-gold/70 bg-gold/10 shadow-glow"
                                    : "border-border bg-background hover:border-gold/40 hover:bg-muted",
                                )}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="break-words text-sm leading-5 text-foreground sm:text-base sm:leading-6">
                                    {choice.label}
                                  </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                  <div className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-gold-ink">
                                    {choice.priceDelta
                                      ? formatOptionPrice(choice.priceDelta)
                                      : "Included"}
                                  </div>
                                  <span
                                    className={cn(
                                      "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition",
                                      selected
                                        ? "border-gold bg-gold text-espresso"
                                        : "border-border bg-background text-foreground group-hover:border-gold/60",
                                    )}
                                  >
                                    {selected ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Plus className="h-4 w-4" />
                                    )}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 rounded-[1.5rem] border border-border bg-background p-5">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-gold-ink">
                      No preset options
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This item only needs a message. Leave any request below
                      and we'll treat it as a custom note for the kitchen.
                    </p>
                  </div>
                )}

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-display text-lg text-foreground sm:text-xl">
                      {config.requestLabel}
                    </h4>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Optional
                    </span>
                  </div>
                  <Textarea
                    value={request}
                    onChange={(event) => onRequestChange(event.target.value)}
                    placeholder="Tell us how you'd like it prepared..."
                    className="min-h-24 rounded-[1.25rem] border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-gold/70"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-card px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setQty((current) => Math.max(1, current - 1))
                    }
                    aria-label="Decrease quantity"
                    className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-gold/15 hover:text-gold"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-6 text-center text-sm text-foreground">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((current) => current + 1)}
                    aria-label="Increase quantity"
                    className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onAdd(qty)}
                  disabled={!canAdd}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ${(unitPrice * qty).toFixed(2)} - Add to order
                </button>
              </div>
              {!canAdd && groups.length > 0 && (
                <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Please choose one option in each section before adding.
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Cart drawer ---------- */
function CartDrawer({
  open,
  onClose,
  items,
  total,
  onAdd,
  onRemove,
  onPlace,
  placed,
  isSignedIn,
  selectedStore,
}: {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  total: number;
  onAdd: (line: CartLine) => void;
  onRemove: (line: CartLine) => void;
  onPlace: () => void;
  placed: boolean;
  isSignedIn: boolean;
  selectedStore: StoreViewLocation;
}) {
  const visibleItems = items.slice(0, 3);
  const hiddenItemCount = Math.max(0, items.length - visibleItems.length);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-popover backdrop-blur-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold-ink">
              Your orders
            </div>
            <div className="font-display text-2xl text-foreground">The Cup</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Pickup at {selectedStore.cityState}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="mt-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border text-gold-ink">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Your cup is empty. Tap a drink to hear the clink.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {visibleItems.map((line) => (
                <li
                  key={line.key}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3"
                >
                  <img
                    src={line.item.image}
                    alt={line.item.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg leading-tight text-foreground">
                      {line.item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${line.unitPrice.toFixed(2)} - {cleanCartText(line.item.category)}
                    </div>
                    {line.summary ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {cleanCartText(line.summary)}
                      </div>
                    ) : null}
                    {line.request ? (
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gold-ink">
                        {cleanCartText(line.request)}
                      </div>
                    ) : null}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border px-1.5 py-1">
                    <button
                      onClick={() => onRemove(line)}
                      aria-label="Remove one"
                      className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-gold/15 hover:text-gold-ink"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="min-w-5 text-center text-sm text-foreground">
                      {line.qty}
                    </span>
                    <button
                      onClick={() => onAdd(line)}
                      aria-label="Add one"
                      className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-caramel text-espresso"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="mb-4 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
            <div className="text-[10px] uppercase tracking-[0.24em] text-gold-ink">
              Active store
            </div>
            <div className="mt-1 font-semibold text-foreground">
              {selectedStore.locationName}
            </div>
            <div className="text-xs">{selectedStore.cityState}</div>
            {!selectedStore.isOpen && (
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-rose-700">
                Store is currently closed
              </div>
            )}
          </div>
          {hiddenItemCount > 0 && (
            <Link to="/cart" onClick={onClose} className="mb-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-gold/55 bg-gradient-to-r from-gold-soft/75 via-cream to-gold-soft/75 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso shadow-glow transition hover:border-gold hover:brightness-105 sm:text-xs">
              Open the cart page to view {hiddenItemCount} more {hiddenItemCount === 1 ? "item" : "items"}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          )}
          <Link to="/cart" onClick={onClose} className="mb-4 inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-gold hover:text-gold-ink">
            Open full cart
          </Link>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span className="uppercase tracking-[0.2em] text-[11px] text-muted-foreground">
              Total
            </span>
            <span className="font-display text-3xl text-gold-gradient">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            disabled={items.length === 0 || placed || !isSignedIn || !selectedStore.isOpen}
            onClick={onPlace}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!isSignedIn
              ? "Please sign in to place order"
              : !selectedStore.isOpen
                ? "Store currently closed"
                : placed
                  ? "Order placed - Brewing..."
                  : "Place order"}
            {!placed && (
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>
          <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {selectedStore.prepTime} at {selectedStore.cityState}
          </p>
        </div>
      </aside>
    </>
  );
}
