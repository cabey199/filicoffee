import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/#home" },
  { label: "About Us", to: "/#about" },
  { label: "Coffee", to: "/#coffee" },
  { label: "Events", to: "/#events" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Shop", to: "/shop" },
] as const;

export default function NavBar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        solid
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 shadow"
          : "bg-transparent",
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link
          to="/#home"
          className={cn(
            "flex items-center gap-3",
            solid ? "text-foreground" : "text-cream",
          )}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fbc479adbfa694305a6c9aa9305a359ed?format=webp&width=200"
            alt="Fili Coffee logo"
            className="h-8 w-auto"
          />
          <span className="font-display text-xl tracking-wide">
            <span className="text-gold">Fili</span> Coffee
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "text-sm font-medium transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full",
                  solid
                    ? "text-foreground/90 hover:text-foreground after:bg-gold"
                    : "text-cream/90 hover:text-cream after:bg-gold",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/shop"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-gold text-coffee px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-transform active:scale-95"
        >
          Shop Now
        </Link>
      </nav>
    </header>
  );
}
