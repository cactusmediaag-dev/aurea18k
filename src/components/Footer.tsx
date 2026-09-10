import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import logoHorizontal from '@/assets/logo-horizontal.png';
import { useT } from '@/i18n';

const Footer = () => {
  const t = useT();
  return (
  <footer className="text-cream-light/60 py-[72px] px-12 max-sm:px-6" style={{ background: '#422C19' }}>
    <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-14 pb-14 border-b border-cream-light/10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <div>
        <img src={logoHorizontal} alt="Aurea Jewels" className="h-14 w-auto mb-5 brightness-0 invert opacity-90" />
        <p className="text-[13px] leading-[1.8] text-cream-light/50 font-light mb-6">
          {t.footer.description}
        </p>
        <div className="flex gap-3.5">
          <a href="https://www.instagram.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a href="https://www.facebook.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            <Facebook size={16} strokeWidth={1.5} />
          </a>
          <a href="mailto:contact@aurea18k.com" aria-label="Email" className="w-9 h-9 border border-cream-light/10 flex items-center justify-center cursor-pointer transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light no-underline text-cream-light/60">
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">{t.footer.shop}</h4>
        <ul className="list-none space-y-3">
          {[
            { label: t.footer.links.newArrivals, href: '/collections/new-arrivals' },
            { label: t.footer.links.bestSellers, href: '/collections/best-sellers' },
            { label: t.footer.links.womens, href: '/collections/womens' },
            { label: t.footer.links.mens, href: '/collections/mens' },
            { label: t.footer.links.kids, href: '/collections/kids' },
            { label: t.footer.links.bundles, href: '/collections/bundles-sets' },
            { label: t.footer.links.giftIdeas, href: '/collections/gift-ideas' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">{t.footer.customerCare}</h4>
        <ul className="list-none space-y-3">
          {[
            { label: t.footer.links.faq, href: '/faq' },
            { label: t.footer.links.shippingReturns, href: '/shipping-returns' },
            { label: t.footer.links.reviews, href: '/reviews' },
            { label: t.footer.links.contact, href: '/contact' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
          <li><a href="https://hd5ps3-wc.myshopify.com/account" target="_blank" rel="noopener noreferrer" className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{t.footer.links.myAccount}</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] tracking-[0.25em] uppercase text-cream-light/90 font-medium mb-5">{t.footer.company}</h4>
        <ul className="list-none space-y-3">
          {[
            { label: t.footer.links.aboutUs, href: '/about' },
            { label: t.footer.links.privacy, href: '/privacy-policy' },
            { label: t.footer.links.terms, href: '/terms' },
            { label: t.footer.links.accessibility, href: '/accessibility' },
            { label: t.footer.links.cookies, href: '/cookie-policy' },
          ].map((l) => (
            <li key={l.label}><Link to={l.href} className="no-underline text-[13px] text-cream-light/45 font-light hover:text-gold-light transition-colors tracking-[0.03em]">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="text-[11px] tracking-[0.05em] text-cream-light/25">{t.footer.copyright}</div>
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
};

export default Footer;
