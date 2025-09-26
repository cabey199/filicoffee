import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Coffee", href: "#coffee" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
];

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
        solid ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 shadow" : "bg-transparent",
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <a href="#home" className="font-display text-xl tracking-wide text-foreground">
          <span className="text-gold">Fili</span> Coffee Roasting
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#coffee"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-gold text-coffee px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-transform active:scale-95"
        >
          Explore Our Coffee
        </a>
      </nav>
    </header>
  );
}
