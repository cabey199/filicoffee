import { useEffect, useMemo, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import BackgroundVideo from "@/components/BackgroundVideo";

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
        img: "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fc39698b6b5864c0c9bae50c566a2e59d?format=webp&width=1200",
      },
    ],
    [],
  );

  const gallery = useMemo(
    () => [
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F5bee3cbdc0154ae7b996c5c6b5421136?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F99d4bd00ffee4e319c401f96ba995829?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fc39698b6b5864c0c9bae50c566a2e59d?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F08be3a5f32a24ba691b4709c0f040752?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F4bc22dca9bcd46f28b0ceee4fb8ce76e?format=webp&width=1600",
      "https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fc2e505a0d62b42fd97393ac14d682192?format=webp&width=1600",
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

  const { ref: aboutLeftRef, inView: aboutLeftIn } =
    useInView<HTMLDivElement>();
  const { ref: aboutRightRef, inView: aboutRightIn } =
    useInView<HTMLDivElement>();
  const { ref: coffeeRef, inView: coffeeIn } = useInView<HTMLHeadingElement>();

  const aboutVideoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = aboutVideoRef.current;
    if (!el) return;
    const apply = () => {
      try {
        el.playbackRate = 0.85;
        (el as any).defaultPlaybackRate = 0.85;
      } catch {}
    };
    apply();
    el.addEventListener("loadedmetadata", apply, { once: true });
    return () => el.removeEventListener("loadedmetadata", apply);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Home */}
      <section id="home" className="relative h-screen w-full">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fadbbad204a764387a7626ba5f317afcb?alt=media&token=fb0f550d-511a-4304-96a0-0cd5fe31d549&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-gradient-to-b from-black/55 via-black/30 to-black/60"
          playbackRate={0.85}
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div
            className={cn(
              "max-w-3xl text-cream transition-all duration-700",
              heroReady
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Start your day with a{" "}
              <span className="text-gold">good coffee</span>.
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
      <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 overflow-hidden">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F6ddb2ef00e9e42df90091b99198440b1?alt=media&token=ac6ddb7b-9acb-430c-a68d-dca611d425e2&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-gradient-to-r from-coffee/90 to-beige/60"
          playbackRate={0.85}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fbc479adbfa694305a6c9aa9305a359ed?format=webp&width=800"
          alt="Fili Coffee watermark logo"
          className="pointer-events-none select-none absolute inset-0 mx-auto my-auto opacity-10 mix-blend-screen w-[320px] md:w-[420px]"
        />
        <div className="container py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 xl:gap-24 items-start">
            <div
              ref={aboutLeftRef}
              className={cn(
                "text-cream/95 md:pr-8 lg:pr-12 xl:pr-16 max-w-prose transition-all duration-700",
                aboutLeftIn
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8",
              )}
            >
              <h2 id="about-heading" className="font-display text-3xl md:text-4xl text-cream uppercase inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1.5 after:w-24 after:bg-gold">
                ABOUT US
              </h2>
              <div className="mt-3 flex items-center gap-3 text-lg md:text-xl text-cream/95">
                <span className="h-1.5 w-8 rounded-full bg-gold" aria-hidden />
                <span className="font-semibold text-gold">
                  We are here to deliver quality Ethiopian Coffee
                </span>
              </div>
              <p className="mt-6 leading-relaxed text-cream/90">
                Fili Coffee Roasting is established as one of the leading
                speciality coffee roasters based in Addis Ababa. Fili Coffee
                Roasting is made up of seasoned professionals who have reach
                experience in the coffee industry. Our philosophy is driven by a
                passion for coffee and commitment to source and roast some of
                the highest quality Ethiopian coffee package the very pure
                Arabica coffee from different regions of Ethiopia. We produce in
                our rostery plant with different packaging size and speciality
                grades. We deliver quality roasted coffee for coffee shops,
                bistros, restaurants and cafes. Now you can explore the best
                Ethiopian coffee through the experience of a professional
                roastmaster.
              </p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="font-display text-2xl text-cream inline-block relative after:absolute after:left-0 after:-bottom-1.5 after:h-1 after:w-16 after:bg-gold">
                  What we serve you
                </h3>
                <p className="mt-2 text-cream/90">
                  The main products we serve at our cafes.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        ☕
                      </span>
                      <span>Coffee</span>
                    </h4>
                    <p className="text-cream/90">
                      Brewed in ethiopian traditional method "Yejebena Buna"
                    </p>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        🥛
                      </span>
                      <span>Macchiato</span>
                    </h4>
                    <p className="text-cream/90">
                      An espresso with a small amount of foamed milk on top
                    </p>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 sm:col-span-2 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        ⚡
                      </span>
                      <span>Espresso</span>
                    </h4>
                    <p className="text-cream/90">
                      Syrupy mouthfeel; chocolate-toned finish with pleasing
                      floral &amp; nut tones
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <h3 className="font-display text-2xl text-cream inline-block relative after:absolute after:left-0 after:-bottom-1.5 after:h-1 after:w-16 after:bg-gold">
                  Our signature coffee roasts
                </h3>
                <p className="mt-2 text-cream/90">
                  We have three roasting levels
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="text-cream font-semibold flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">🌼</span>
                          <span>Light Roasted</span>
                        </h4>
                        <p className="text-cream/90">You'll be able to taste full body, some floral notes, bright wine acidity, earthy and mossy.</p>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F1d8113e0c1664f36aaf13f7866b218c8?format=webp&width=800"
                        alt="Light roast pack" loading="lazy" decoding="async"
                        className="h-24 w-20 md:h-28 md:w-24 object-contain rounded-md ring-1 ring-white/10 group-hover:ring-gold/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="text-cream font-semibold flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">🍊</span>
                          <span>Medium Roasted</span>
                        </h4>
                        <p className="text-cream/90">This roast level often brings out lots of possible flavors: citrus, fruit, berry, acidity.</p>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F8aa582b382db43f09baabde71490667a?format=webp&width=800"
                        alt="Medium roast pack" loading="lazy" decoding="async"
                        className="h-24 w-20 md:h-28 md:w-24 object-contain rounded-md ring-1 ring-white/10 group-hover:ring-gold/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 sm:col-span-2 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="text-cream font-semibold flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">🍫</span>
                          <span>Medium Dark Roasted</span>
                        </h4>
                        <p className="text-cream/90">This tastes chocolatey darkness, and a bit of floral, berry, fruit, citrus.</p>
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F044fb3dd7c434883ac98b1e6865b42ea?format=webp&width=800"
                        alt="Medium dark roast pack" loading="lazy" decoding="async"
                        className="h-24 w-20 md:h-28 md:w-24 object-contain rounded-md ring-1 ring-white/10 group-hover:ring-gold/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <h3 className="font-display text-2xl text-cream inline-block relative after:absolute after:left-0 after:-bottom-1.5 after:h-1 after:w-16 after:bg-gold">
                  What Ethiopia serves you
                </h3>
                <p className="mt-2 text-cream/90">
                  World’s best reviewed single origin premium coffee beans
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        🗺️
                      </span>
                      <span>Sidamo</span>
                    </h4>
                    <p className="text-cream/90">
                      best known for its rich, mouthfeel, sweet and complex
                      flavor, low acidity, floral aroma, and a finish that is
                      bright and soft.
                    </p>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        🍋
                      </span>
                      <span>Yirgacheffee</span>
                    </h4>
                    <p className="text-cream/90">
                      shimmer with citrus tones combined with a wonderful
                      sweetness in the taste and floral notes in the aroma.
                    </p>
                  </div>
                  <div className="group rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-5 sm:col-span-2 hover:ring-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-zoomIn">
                    <h4 className="text-cream font-semibold flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">
                        🍇
                      </span>
                      <span>Harar</span>
                    </h4>
                    <p className="text-cream/90">
                      winey and fruity, floral-toned acidity with a rich &amp;
                      pungent taste, heady aroma that is reminiscent of
                      blackberries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={aboutRightRef}
              className={cn(
                "transition-all duration-700 lg:sticky lg:top-24 lg:self-start",
                aboutRightIn
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8",
              )}
            >
              <div className="relative w-full h-[380px] md:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 transition-shadow hover:ring-gold/30 hover:shadow-2xl">
                <video
                  ref={aboutVideoRef}
                  src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F6ddb2ef00e9e42df90091b99198440b1?alt=media&token=ac6ddb7b-9acb-430c-a68d-dca611d425e2&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
                  className="absolute inset-0 h-full w-full object-cover" title="Fili Coffee roastery video"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee */}
      <section id="coffee" className="relative scroll-mt-24 overflow-hidden">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2Fc35129a95db8461694ede0f115c94321?alt=media&token=b98aad85-07a5-46d6-9474-b0e64fa89a6a&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),transparent_65%)]"
          playbackRate={0.85}
        />
        <div className="container py-24">
          <h2
            ref={coffeeRef}
            className={cn(
              "font-display text-3xl md:text-4xl text-coffee inline-block",
              "relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold",
              "transition-all duration-700",
              coffeeIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative scroll-mt-24 overflow-hidden">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F360a8da40802430683a50a5098a5b877?alt=media&token=86bdc659-127d-494a-877e-f5431f943e1e&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-coffee/75"
          playbackRate={0.85}
        />
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
                  <img
                    src={e.img}
                    alt={e.title}
                    className="h-56 w-full object-cover"
                  />
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
      <section id="gallery" className="relative scroll-mt-24 overflow-hidden">
        <BackgroundVideo
          src="https://cdn.builder.io/o/assets%2F7295d6a03e5244e6951bcbaefaa83fce%2F680ccddc16464f87922867c366689d79?alt=media&token=65d3b60c-72e5-4cb4-b7f8-bdd6e087d887&apiKey=7295d6a03e5244e6951bcbaefaa83fce"
          overlayClassName="bg-black/30"
          playbackRate={0.85}
        />
        <div className="container py-24">
          <h2 className="font-display text-3xl md:text-4xl text-coffee inline-block relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-24 after:bg-gold">
            Gallery
          </h2>
          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            <div className="hidden" />
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
