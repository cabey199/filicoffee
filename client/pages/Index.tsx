import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

export default function Index() {
  const [heroReady, setHeroReady] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const products = useMemo(
    () => [
      {
        name: "Single-Origin Yirgacheffe",
        desc: "Bright, floral, citrus notes",
        img: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        name: "Sidamo Reserve",
        desc: "Sweet, tea-like, jasmine aroma",
        img: "https://images.pexels.com/photos/879730/pexels-photo-879730.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        name: "Guji Forest",
        desc: "Chocolate, berry, smooth finish",
        img: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        name: "Harrar Gold",
        desc: "Winey, blueberry, bold body",
        img: "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        name: "Limu Estate",
        desc: "Caramel, balanced, nutty",
        img: "https://images.pexels.com/photos/4051388/pexels-photo-4051388.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        name: "Aroma Blend",
        desc: "House blend, smooth & rich",
        img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    [],
  );

  const gallery = useMemo(
    () => [
      "https://images.pexels.com/photos/9754/coffee-beans-coffee-cup-cup.jpg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3670/coffee-red-mug-desk.jpg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1346132/pexels-photo-1346132.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/34083/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    [],
  );

  const { ref: aboutLeftRef, inView: aboutLeftIn } = useInView<HTMLDivElement>();
  const { ref: aboutRightRef, inView: aboutRightIn } = useInView<HTMLDivElement>();
  const { ref: coffeeRef, inView: coffeeIn } = useInView<HTMLHeadingElement>();

  return (
    <main className="min-h-screen">
      {/* Home */}
      <section id="home" className="relative h-screen w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1600"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div
            className={cn(
              "max-w-3xl text-cream transition-all duration-700",
              heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Start your day with a <span className="text-gold">good coffee</span>.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-cream/90">
              Experience the heart of Ethiopian specialty coffee.
            </p>
            <div className="mt-8">
              <a
                href="#coffee"
                className="inline-flex items-center justify-center rounded-full bg-gold text-coffee px-6 py-3 font-semibold shadow-sm hover:shadow-md transition-transform active:scale-95"
              >
                Explore Our Coffee
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative scroll-mt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coffee to-beige" />
        <div className="container py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div
              ref={aboutLeftRef}
              className={cn(
                "text-cream/95 md:pr-8 transition-all duration-700",
                aboutLeftIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              )}
            >
              <h2 className="font-display text-3xl md:text-4xl text-cream">About Us</h2>
              <p className="mt-6 leading-relaxed text-cream/90">
                Fili Coffee Roasting is one of Ethiopia’s leading specialty coffee roasters. With years of expertise, we roast the purest Arabica beans from regions across Ethiopia. Driven by passion, we bring the homely essence of Ethiopian coffee culture into every cup.
              </p>
            </div>
            <div
              ref={aboutRightRef}
              className={cn(
                "transition-all duration-700",
                aboutRightIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
              )}
            >
              <img
                src="https://images.pexels.com/photos/628902/pexels-photo-628902.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Roastery and Ethiopian coffee ceremony"
                className="w-full h-[360px] md:h-[460px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coffee */}
      <section id="coffee" className="relative scroll-mt-24 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_60%)]">
        <div className="container py-24">
          <h2
            ref={coffeeRef}
            className={cn(
              "font-display text-3xl md:text-4xl text-coffee inline-block",
              "relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold",
              "transition-all duration-700",
              coffeeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Our Coffee
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg ring-1 ring-black/5 hover:ring-2 hover:ring-gold/30 transition-transform duration-300 will-change-transform hover:-translate-y-1"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 p-5 text-cream">
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="text-cream/90">{p.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section
        id="events"
        className="relative scroll-mt-24 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-coffee/80" />
        <div className="relative container py-24">
          <h2 className="font-display text-3xl md:text-4xl text-cream inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold">
            Events
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Coffee Tasting Night",
                date: "Every Friday, 6:00 PM",
                desc: "Discover flavors of Ethiopia.",
                img: "https://images.pexels.com/photos/696407/pexels-photo-696407.jpeg?auto=compress&cs=tinysrgb&w=1200",
              },
              {
                title: "Roastery Tour",
                date: "Every Saturday, 10:00 AM",
                desc: "Learn the craft of coffee roasting.",
                img: "https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?auto=compress&cs=tinysrgb&w=1200",
              },
            ].map((e) => (
              <article
                key={e.title}
                className="group overflow-hidden rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 hover:ring-white/20 transition-all"
              >
                <div className="relative">
                  <img src={e.img} alt={e.title} className="h-56 w-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-6 text-cream">
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <p className="mt-1 text-cream/90">{e.date}</p>
                  <p className="mt-2 text-cream/90">{e.desc}</p>
                  <a
                    href="#events"
                    className="mt-4 inline-flex rounded-full bg-gold text-coffee px-4 py-2 font-semibold shadow-sm hover:shadow-md transition-transform active:scale-95"
                  >
                    Join Us
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative scroll-mt-24">
        <div className="container py-24">
          <h2 className="font-display text-3xl md:text-4xl text-coffee inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold">
            Gallery
          </h2>
          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"><div className="hidden" />
            {gallery.map((src, i) => (
              <button
                key={i}
                className="group mb-4 w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
                onClick={() => setLightbox(src)}
              >
                <img
                  src={src}
                  alt="Fili Coffee gallery image"
                  className="w-full h-auto transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <img
              src={lightbox}
              alt="Full size"
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl animate-zoomIn"
            />
          </div>
        )}
      </section>
    </main>
  );
}
