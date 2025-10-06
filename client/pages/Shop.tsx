import { useEffect, useMemo, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import BackgroundVideo from "@/components/BackgroundVideo";

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

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  const composeSummary = () => {
    return `Order Summary\nType: ${type}\nRoast: ${roast}\nSize: ${size ? `${size} g` : "Not selected"}\nQty: ${qty}\nTotal: ETB ${price.toLocaleString()}\nName: ${nameRef.current?.value || ""}\nPhone: ${phoneRef.current?.value || ""}\nEmail: ${emailRef.current?.value || ""}\nNotes: ${notesRef.current?.value || ""}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      type,
      roast,
      size: size ? String(size) : "",
      qty: String(qty),
      total: String(price),
      name: nameRef.current?.value || "",
      phone: phoneRef.current?.value || "",
      email: emailRef.current?.value || "",
      notes: notesRef.current?.value || "",
    });
    const tally = new URLSearchParams(window.location.search).get("tally");
    if (tally) {
      const url = `${tally}${tally.includes("?") ? "&" : "?"}${params.toString()}`;
      window.open(url, "_blank");
    } else {
      const summary = composeSummary();
      navigator.clipboard?.writeText(summary).catch(() => {});
      alert("Order summary copied. Add ?tally=YOUR_TALLY_FORM_URL to prefill a Tally form.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-28 pb-16 md:pb-24">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fc35129a95db8461694ede0f115c94321?alt=media&token=b98aad85-07a5-46d6-9474-b0e64fa89a6a&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45),transparent_65%)]"
          playbackRate={0.85}
        />
        <div className="container">
          <nav className="mb-8 md:mb-10 flex flex-wrap gap-3 text-sm">
            {[
              { id: "type", label: "Type" },
              { id: "roast", label: "Roast" },
              { id: "size", label: "Size" },
              { id: "quantity", label: "Quantity" },
              { id: "order", label: "Order" },
            ].map((l) => (
              <a key={l.id} href={`#${l.id}`} className="rounded-full bg-white/20 ring-1 ring-white/30 px-3 py-1.5 text-cream hover:bg-white/30 transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
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
            <h1 className="font-display text-3xl md:text-4xl text-cream inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold">Single Origin Coffee</h1>
            <p className="mt-4 text-cream/90 max-w-prose">Configure your coffee: choose type, roast level, size, and quantity. Enjoy freshly roasted Ethiopian Arabica.</p>

            {/* Type */}
            <div id="type" className="mt-8 scroll-mt-28">
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
            <div id="roast" className="mt-8 scroll-mt-28">
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
            <div id="size" className="mt-8 scroll-mt-28">
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
            <div id="quantity" className="mt-8 scroll-mt-28">
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
        </div>
      </section>

      {/* Order form */}
      <section id="order" className="relative py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-foreground inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-20 after:bg-gold">Order</h2>
          <p className="mt-3 text-foreground/80">Fill your details below. Append ?tally=YOUR_TALLY_FORM_URL to this page URL to submit into Tally with selections prefilled.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 max-w-xl">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input ref={nameRef} type="text" required className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input ref={phoneRef} type="tel" required className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input ref={emailRef} type="email" className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea ref={notesRef} rows={4} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="hidden sm:block">
                <div className="text-sm text-foreground/70">Summary</div>
                <pre className="text-foreground/90 text-sm whitespace-pre-wrap max-w-md">{composeSummary()}</pre>
              </div>
              <button type="submit" className="rounded-full bg-gold text-coffee px-6 py-3 font-semibold shadow-sm hover:shadow-md active:scale-95">Submit</button>
            </div>
          </form>
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
