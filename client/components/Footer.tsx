export default function Footer() {
  return (
    <footer className="bg-coffee text-cream mt-24">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl">Fili Coffee Roasting</h3>
          <p className="mt-2 text-cream/80">Addis Ababa, Ethiopia</p>
          <p className="mt-1 text-cream/80">Email: hello@filicoffee.et</p>
          <p className="mt-1 text-cream/80">Phone: +251 900 000 000</p>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:text-gold" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a className="hover:text-gold" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a className="hover:text-gold" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Hours</h4>
          <p className="mt-2 text-cream/80">Mon–Sun: 7:00 – 21:00</p>
          <a href="#events" className="inline-block mt-4 rounded-full bg-gold text-coffee px-4 py-2 font-semibold shadow-sm hover:shadow-md transition-transform active:scale-95">Join Our Events</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-sm text-cream/80">
          © 2025 Fili Coffee Roasting. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
