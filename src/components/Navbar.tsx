import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import SearchModal from '@/components/SearchModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useT } from '@/i18n';
import logoHorizontal from '@/assets/logo-horizontal.png';

interface NavbarProps {
  onCartOpen: () => void;
}

// Menu structure: slugs only — labels come from the i18n dictionary (t.nav.menu).
const shopMenuGroups: Array<{ key: 'women' | 'men' | 'kids' | 'collections'; slugs: string[] }> = [
  {
    key: 'women',
    slugs: ['womens-rings', 'womens-earrings', 'womens-necklaces', 'womens-bracelets', 'womens-chokers', 'everyday-essentials', 'statement-pieces', 'minimal-collection', 'layering-pieces'],
  },
  {
    key: 'men',
    slugs: ['mens-rings', 'mens-chains', 'mens-bracelets', 'mens-stud-earrings', 'mens-scapular-necklaces', 'minimal-men', 'classic-collection'],
  },
  {
    key: 'kids',
    slugs: ['kids-earrings', 'kids-necklaces', 'kids-bracelets', 'kids-chokers', 'hypoallergenic-kids'],
  },
  {
    key: 'collections',
    slugs: ['best-sellers', 'trending-now', 'under-50', 'limited-drop', 'gift-ready', 'his-hers-sets'],
  },
];

const customerCareLinks: Array<{ slug: string; href: string }> = [
  { slug: 'reviews', href: '/reviews' },
  { slug: 'faq', href: '/faq' },
  { slug: 'shipping-returns', href: '/shipping-returns' },
  { slug: 'contact', href: '/contact' },
];

const topLinkClass =
  "relative text-[13px] tracking-[0.15em] uppercase text-warm-black font-medium hover:text-gold transition-colors duration-200 no-underline after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-full";

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const totalItems = useCartStore(state => state.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistCount = useWishlistStore(state => state.items.length);
  const t = useT();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-cream-light border-b border-gold/15">
      {/* Main bar */}
      <div className="flex items-center justify-between h-[72px] px-12 max-md:px-5 max-md:h-16">
        {/* Logo — left */}
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <img src={logoHorizontal} alt="Aurea Jewels" className="h-10 md:h-12 w-auto" />
          </Link>
        </div>

        {/* Center nav — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/collections/new-arrivals" className={topLinkClass}>{t.nav.newIn}</Link>
          <button
            className={`${topLinkClass} bg-transparent border-none cursor-pointer flex items-center gap-1 p-0`}
            onClick={() => setShopOpen(!shopOpen)}
            onMouseEnter={() => setShopOpen(true)}
          >
            {t.nav.shop} <ChevronDown className={`w-3 h-3 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
          </button>
          <Link to="/collections/best-sellers" className={topLinkClass}>{t.nav.bestSellers}</Link>
          <Link to="/collections/gift-ideas" className={topLinkClass}>{t.nav.gifts}</Link>
          <Link to="/about" className={topLinkClass}>{t.nav.aboutUs}</Link>
        </div>

        {/* Right icons — desktop */}
        <div className="hidden md:flex gap-5 items-center flex-shrink-0">
          <LanguageSwitcher />
          <button onClick={() => setSearchOpen(true)} className="bg-transparent border-none cursor-pointer p-0" aria-label="Search">
            <Search className="w-5 h-5 text-warm-black hover:text-gold transition-colors duration-200" />
          </button>
          <Link to="/account" className="bg-transparent border-none cursor-pointer p-0" aria-label="My account">
            <User className="w-5 h-5 text-warm-black hover:text-gold transition-colors duration-200" />
          </Link>
          <Link to="/account/wishlist" className="relative bg-transparent border-none cursor-pointer p-0" aria-label="Wishlist">
            <Heart className={`w-5 h-5 transition-colors duration-200 ${wishlistCount > 0 ? 'fill-wishlist-red text-wishlist-red' : 'text-warm-black hover:text-gold'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button onClick={onCartOpen} className="relative bg-transparent border-none cursor-pointer p-0" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-warm-black hover:text-gold transition-colors duration-200" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            to="/collections/bundles-sets"
            className="hidden lg:inline-block bg-gold text-primary-foreground hover:bg-gold-light transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-6 py-3 no-underline ml-2"
          >
            {t.nav.bundleSave}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/account/wishlist" className="relative p-0" aria-label="Wishlist">
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-wishlist-red text-wishlist-red' : 'text-warm-black'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button onClick={onCartOpen} className="relative bg-transparent border-none cursor-pointer p-0" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 text-warm-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
                {totalItems}
              </span>
            )}
          </button>
          <button className="bg-transparent border-none p-0" onClick={() => { setMobileOpen(!mobileOpen); setMobileSubmenu(null); }} aria-label="Menu">
            {mobileOpen ? <X className="w-5 h-5 text-warm-black" /> : <Menu className="w-5 h-5 text-warm-black" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      {shopOpen && (
        <div
          className="hidden md:block absolute left-0 right-0 top-full bg-cream-light border-b border-gold/25 shadow-lg z-50"
          onMouseLeave={() => setShopOpen(false)}
        >
          <div className="max-w-6xl mx-auto px-12 py-10">
            <div className="grid grid-cols-5 gap-10">
              {shopMenuGroups.map(({ key, slugs }) => (
                <div key={key}>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">{t.nav.groups[key]}</div>
                  <ul className="list-none space-y-2.5 p-0 m-0">
                    {slugs.map((slug) => (
                      <li key={slug}>
                        <Link
                          to={`/collections/${slug}`}
                          className="text-[13px] text-warm-black/70 font-light hover:text-gold transition-colors no-underline block"
                          onClick={() => setShopOpen(false)}
                        >
                          {t.nav.menu[slug]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <div className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">{t.nav.customerCare}</div>
                <ul className="list-none space-y-2.5 p-0 m-0">
                  {customerCareLinks.map(({ slug, href }) => (
                    <li key={slug}>
                      <Link
                        to={href}
                        className="text-[13px] text-warm-black/70 font-light hover:text-gold transition-colors no-underline block"
                        onClick={() => setShopOpen(false)}
                      >
                        {t.nav.menu[slug]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gold/15 py-4 flex items-center justify-center gap-8">
            <Link to="/collections/all" className="text-xs tracking-[0.2em] uppercase text-warm-black font-medium hover:text-gold transition-colors no-underline" onClick={() => setShopOpen(false)}>{t.nav.shopAll}</Link>
            <Link to="/collections" className="text-xs tracking-[0.2em] uppercase text-warm-black font-medium hover:text-gold transition-colors no-underline" onClick={() => setShopOpen(false)}>{t.nav.viewCategories}</Link>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bg-cream-light border-b border-gold/25 flex flex-col items-stretch gap-1 py-6 px-5 md:hidden z-50 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-gold/15">
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">Language / Idioma</span>
            <LanguageSwitcher compact />
          </div>

          <Link to="/" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.home}</Link>
          <Link to="/collections/new-arrivals" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.newIn}</Link>

          {shopMenuGroups.map(({ key, slugs }) => (
            <div key={key} className="w-full">
              <button
                className="w-full text-xs tracking-[0.15em] uppercase text-warm-black bg-transparent border-none cursor-pointer py-2 flex items-center gap-1 text-left"
                onClick={() => setMobileSubmenu(mobileSubmenu === key ? null : key)}
              >
                {t.nav.groups[key]} <ChevronDown className={`w-3 h-3 transition-transform ${mobileSubmenu === key ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === key && (
                <div className="flex flex-col gap-2 py-2 pl-3 bg-cream/50">
                  {slugs.map((slug) => (
                    <Link key={slug} to={`/collections/${slug}`} className="text-[11px] text-warm-black/70 no-underline py-1 text-left" onClick={() => setMobileOpen(false)}>
                      {t.nav.menu[slug]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/collections/best-sellers" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.bestSellers}</Link>
          <Link to="/collections/gift-ideas" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.gifts}</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.aboutUs}</Link>

          <div className="pt-4 mt-2 border-t border-gold/20">
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-2">{t.nav.customerCare}</div>
            {customerCareLinks.map(({ slug, href }) => (
              <Link key={slug} to={href} onClick={() => setMobileOpen(false)} className="text-[11px] text-warm-black/70 no-underline py-1.5 text-left block">
                {t.nav.menu[slug]}
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-gold/20 flex flex-col gap-1">
            <Link to="/account" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.myAccount}</Link>
            <Link to="/account/wishlist" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">{t.nav.myWishlist}</Link>
          </div>

          <Link
            to="/collections/bundles-sets"
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full text-center bg-gold text-primary-foreground hover:bg-gold-light transition-colors font-sans text-[12px] uppercase tracking-[0.2em] font-medium py-4 no-underline"
          >
            {t.nav.bundleSave}
          </Link>
        </div>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
