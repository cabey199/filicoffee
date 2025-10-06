import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type RoastLevel = "Light" | "Medium" | "Medium Dark";
type CoffeeType = "Beans" | "Powder";

type Size = 250 | 500 | 1000;

const ROAST_IMAGES: Record<RoastLevel, string> = {
  "Light": "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F1d8113e0c1664f36aaf13f7866b218c8?format=webp&width=800",
  "Medium": "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F8aa582b382db43f09baabde71490667a?format=webp&width=800",
  "Medium Dark": "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F044fb3dd7c434883ac98b1e6865b42ea?format=webp&width=800",
};

const SIZE_PRICES: Record<Size, { current: number; old?: number }> = {
  250: { current: 590, old: 700 },
  500: { current: 1100, old: 1300 },
  1000: { current: 2100, old: 2500 },
};

export default function Shop() {
  const [type, setType] = useState<CoffeeType>("Beans");
  const [roast, setRoast] = useState<RoastLevel>("Light");
  const [size, setSize] = useState<Size | null>(500);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.title = "Shop | Fili Coffee";
  }, []);

  const price = useMemo(() => (size ? SIZE_PRICES[size].current * qty : 0), [size, qty]);

  const canAdd = Boolean(size && qty > 0);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-28 pb-16 md:pb-24">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-border/60 shadow-xl bg-gradient-to-b from-beige/40 to-cream">
              <img
                src={ROAST_IMAGES[roast]}
                alt={`${roast} roast pack`}
                className="w-full h-[360px] md:h-[520px] object-contain p-8 md:p-10"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Image updates with roast selection. Prices are placeholders; you can update later.</p>
          </div>

          {/* Configurator */}
          <div className="order-1 lg:order-2">
            <h1 className="font-display text-3xl md:text-4xl text-foreground inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold">Single Origin Coffee</h1>
            <p className="mt-4 text-foreground/80 max-w-prose">Configure your coffee: choose type, roast level, size, and quantity. Enjoy freshly roasted Ethiopian Arabica.</p>

            {/* Type */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground/80">Type</h2>
              <div className="mt-3 inline-flex rounded-full bg-white/50 ring-1 ring-border shadow-sm overflow-hidden">
                {["Beans", "Powder"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t as CoffeeType)}
                    className={cn(
                      "px-4 py-2 text-sm transition-colors",
                      type === t ? "bg-gold text-coffee" : "text-foreground hover:bg-white"
                    )}
                    aria-pressed={type === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground/80">Roast</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["Light", "Medium", "Medium Dark"] as RoastLevel[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoast(r)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm ring-1 transition-all",
                      roast === r
                        ? "bg-gold text-coffee ring-gold/60 shadow"
                        : "bg-white/40 text-foreground ring-border hover:bg-white"
                    )}
                    aria-pressed={roast === r}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={(["Light", "Medium", "Medium Dark"] as RoastLevel[]).indexOf(roast)}
                onChange={(e) => setRoast((["Light", "Medium", "Medium Dark"] as RoastLevel[])[Number(e.target.value)])}
                className="mt-4 w-full accent-gold"
                aria-label="Roast level"
              />
            </div>

            {/* Size */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground/80">Size</h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {(Object.keys(SIZE_PRICES) as Array<unknown> as Size[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-left ring-1 transition-all bg-white/40",
                      size === s ? "ring-gold/60 shadow bg-gold/10" : "ring-border hover:bg-white"
                    )}
                    aria-pressed={size === s}
                  >
                    <div className="text-xs text-foreground/70">{s} g</div>
                    <div className="text-lg font-semibold text-gold">ETB {SIZE_PRICES[s].current.toLocaleString()}</div>
                    {SIZE_PRICES[s].old ? (
                      <div className="text-xs line-through text-foreground/50">ETB {SIZE_PRICES[s].old!.toLocaleString()}</div>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground/80">Quantity</h2>
              <div className="mt-3 inline-flex items-center rounded-full ring-1 ring-border overflow-hidden bg-white/60">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg hover:bg-white" aria-label="Decrease quantity">−</button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 text-center py-2 bg-transparent outline-none"
                  min={1}
                  aria-label="Quantity"
                />
                <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-lg hover:bg-white" aria-label="Increase quantity">+</button>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-10 flex items-center justify-between">
              <div>
                <div className="text-sm text-foreground/70">Total</div>
                <div className="text-2xl font-semibold text-gold">ETB {price.toLocaleString()}</div>
              </div>
              <a
                href="#order"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold shadow-sm transition-all",
                  canAdd ? "bg-gold text-coffee hover:shadow-md active:scale-95" : "bg-muted text-foreground/50 cursor-not-allowed pointer-events-none"
                )}
                aria-disabled={!canAdd}
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky cart bar */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="mx-auto max-w-[1400px] px-6 pb-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/65 ring-1 ring-border shadow-lg p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <img src={ROAST_IMAGES[roast]} alt={`${roast} pack`} className="h-12 w-10 object-contain rounded-md ring-1 ring-border/60" />
              <div className="min-w-0">
                <div className="font-semibold text-foreground truncate">{type} · {roast} · {size ? `${size}g` : "Select size"}</div>
                <div className="text-gold font-bold">ETB {price.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex items-center rounded-full ring-1 ring-border overflow-hidden bg-white/60">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg hover:bg-white" aria-label="Decrease quantity">−</button>
                <span className="px-4">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-lg hover:bg-white" aria-label="Increase quantity">+</button>
              </div>
              <a
                href="#order"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold shadow-sm transition-all",
                  canAdd ? "bg-gold text-coffee hover:shadow-md active:scale-95" : "bg-muted text-foreground/50 cursor-not-allowed pointer-events-none"
                )}
                aria-disabled={!canAdd}
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
