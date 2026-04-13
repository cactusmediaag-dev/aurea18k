import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="text-cream-light/60 py-[72px] px-12 max-sm:px-6" style={{ background: 'hsl(var(--warm-black))' }}>
    <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-14 pb-14 border-b border-cream-light/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <div>
        <div className="font-serif text-[28px] font-light tracking-[0.2em] text-cream-light mb-1">AUREA</div>
        <div className="text-[8px] tracking-[0.3em] uppercase text-gold mb-5">Jewels · aurea18k.com</div>
        <p className="text-[13px] leading-[1.8] text-cream-light/50 font-light mb-6">
          18K Gold Plated jewelry crafted for real life. Hypoallergenic, durable, and beautifully affordable.
        </p>
        <div className="flex gap-3.5">
          <a href="https://www.instagram.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center text-[13px] cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            in
          </a>
          <a href="https://www.facebook.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center text-[13px] cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            fb
          </a>
          <a href="mailto:contact@aurea18k.com" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center text-[13px] cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            ✉
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">Shop</h4>
        <ul className="list-none space-y-3">
          {[
            { label: 'New Arrivals', href: '/collections/new-arrivals' },
            { label: 'Best Sellers', href: '/collections/best-sellers' },
            { label: "Women's", href: '/collections/womens' },
            { label: "Men's", href: '/collections/mens' },
            { label: 'Kids', href: '/collections/kids' },
            { label: 'Bundles & Sets', href: '/collections/bundles-sets' },
            { label: 'Gift Ideas', href: '/collections/gift-ideas' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">Customer Care</h4>
        <ul className="list-none space-y-3">
          {[
            { label: 'FAQ', href: '/faq' },
            { label: 'Shipping & Returns', href: '/shipping-returns' },
            { label: 'Reviews', href: '/reviews' },
            { label: 'Contact Us', href: '/contact' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
          <li><a href="https://hd5ps3-wc.myshopify.com/account" target="_blank" rel="noopener noreferrer" className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">My Account</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">Company</h4>
        <ul className="list-none space-y-3">
          {[
            { label: 'About Us', href: '/about' },
            { label: 'Reviews', href: '/reviews' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Accessibility Statement', href: '/accessibility' },
            { label: 'Cookie Policy', href: '/cookie-policy' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="text-[11px] tracking-[0.05em] text-cream-light/25">© 2025 Aurea Jewels · aurea18k.com · Ships Worldwide</div>
      <div className="flex gap-2.5 items-center">
        {['PayPal', 'Visa', 'Mastercard', 'Amex', 'Shop Pay'].map((p) => (
          <div key={p} className="bg-cream-light/10 border border-cream-light/10 px-2.5 py-1 text-[10px] tracking-[0.1em] text-cream-light/40 uppercase">
            {p}
          </div>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
