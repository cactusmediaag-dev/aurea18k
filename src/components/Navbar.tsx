import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import SearchModal from '@/components/SearchModal';
import logoHorizontal from '@/assets/logo-horizontal.png';

interface NavbarProps {
  onCartOpen: () => void;
}

const shopMenus = {
  Women: [
    { label: "Women's Rings", href: '/collections/womens-rings' },
    { label: "Women's Earrings", href: '/collections/womens-earrings' },
    { label: "Women's Necklaces", href: '/collections/womens-necklaces' },
    { label: "Women's Bracelets", href: '/collections/womens-bracelets' },
    { label: "Women's Chokers", href: '/collections/womens-chokers' },
    { label: 'Everyday Essentials', href: '/collections/everyday-essentials' },
    { label: 'Statement Pieces', href: '/collections/statement-pieces' },
    { label: 'Minimal Collection', href: '/collections/minimal-collection' },
    { label: 'Layering Pieces', href: '/collections/layering-pieces' },
  ],
  Men: [
    { label: "Men's Rings", href: '/collections/mens-rings' },
    { label: "Men's Chains", href: '/collections/mens-chains' },
    { label: "Men's Bracelets", href: '/collections/mens-bracelets' },
    { label: "Men's Stud Earrings", href: '/collections/mens-stud-earrings' },
    { label: "Men's Scapular Necklaces", href: '/collections/mens-scapular-necklaces' },
    { label: 'Minimal Men', href: '/collections/minimal-men' },
    { label: 'Classic Collection', href: '/collections/classic-collection' },
  ],
  Kids: [
    { label: 'Kids Earrings', href: '/collections/kids-earrings' },
    { label: 'Kids Necklaces', href: '/collections/kids-necklaces' },
    { label: 'Kids Bracelets', href: '/collections/kids-bracelets' },
    { label: 'Kids Chokers', href: '/collections/kids-chokers' },
    { label: 'Hypoallergenic Kids', href: '/collections/hypoallergenic-kids' },
  ],
  Collections: [
    { label: 'Best Sellers', href: '/collections/best-sellers' },
    { label: 'Trending Now', href: '/collections/trending-now' },
    { label: 'Under $50', href: '/collections/under-50' },
    { label: 'Limited Drop', href: '/collections/limited-drop' },
    { label: 'Gift Ready Jewelry', href: '/collections/gift-ready' },
    { label: 'His & Hers Sets', href: '/collections/his-hers-sets' },
  ],
};

const customerCare = [
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Contact', href: '/contact' },
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
          <Link to="/collections/new-arrivals" className={topLinkClass}>New In</Link>
          <button
            className={`${topLinkClass} bg-transparent border-none cursor-pointer flex items-center gap-1 p-0`}
            onClick={() => setShopOpen(!shopOpen)}
            onMouseEnter={() => setShopOpen(true)}
          >
            Shop <ChevronDown className={`w-3 h-3 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
          </button>
          <Link to="/collections/best-sellers" className={topLinkClass}>Best Sellers</Link>
          <Link to="/collections/gift-ideas" className={topLinkClass}>Gifts</Link>
          <Link to="/about" className={topLinkClass}>About Us</Link>
        </div>

        {/* Right icons — desktop */}
        <div className="hidden md:flex gap-5 items-center flex-shrink-0">
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
            Bundle &amp; Save
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
              {Object.entries(shopMenus).map(([title, items]) => (
                <div key={title}>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">{title}</div>
                  <ul className="list-none space-y-2.5 p-0 m-0">
                    {items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          className="text-[13px] text-warm-black/70 font-light hover:text-gold transition-colors no-underline block"
                          onClick={() => setShopOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <div className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold mb-4">Customer Care</div>
                <ul className="list-none space-y-2.5 p-0 m-0">
                  {customerCare.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-[13px] text-warm-black/70 font-light hover:text-gold transition-colors no-underline block"
                        onClick={() => setShopOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gold/15 py-4 flex items-center justify-center gap-8">
            <Link to="/collections/all" className="text-xs tracking-[0.2em] uppercase text-warm-black font-medium hover:text-gold transition-colors no-underline" onClick={() => setShopOpen(false)}>Shop All</Link>
            <Link to="/collections" className="text-xs tracking-[0.2em] uppercase text-warm-black font-medium hover:text-gold transition-colors no-underline" onClick={() => setShopOpen(false)}>View Categories</Link>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bg-cream-light border-b border-gold/25 flex flex-col items-stretch gap-1 py-6 px-5 md:hidden z-50 h-[calc(100vh-4rem)] overflow-y-auto">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">Home</Link>
          <Link to="/collections/new-arrivals" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">New In</Link>

          {Object.entries(shopMenus).map(([title, items]) => (
            <div key={title} className="w-full">
              <button
                className="w-full text-xs tracking-[0.15em] uppercase text-warm-black bg-transparent border-none cursor-pointer py-2 flex items-center gap-1 text-left"
                onClick={() => setMobileSubmenu(mobileSubmenu === title ? null : title)}
              >
                {title} <ChevronDown className={`w-3 h-3 transition-transform ${mobileSubmenu === title ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === title && (
                <div className="flex flex-col gap-2 py-2 pl-3 bg-cream/50">
                  {items.map((item) => (
                    <Link key={item.label} to={item.href} className="text-[11px] text-warm-black/70 no-underline py-1 text-left" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/collections/best-sellers" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">Best Sellers</Link>
          <Link to="/collections/gift-ideas" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">Gifts</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">About Us</Link>

          <div className="pt-4 mt-2 border-t border-gold/20">
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-2">Customer Care</div>
            {customerCare.map((item) => (
              <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="text-[11px] text-warm-black/70 no-underline py-1.5 text-left block">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-gold/20 flex flex-col gap-1">
            <Link to="/account" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">My Account</Link>
            <Link to="/account/wishlist" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.15em] uppercase text-warm-black no-underline py-2 text-left">My Wishlist</Link>
          </div>

          <Link
            to="/collections/bundles-sets"
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full text-center bg-gold text-primary-foreground hover:bg-gold-light transition-colors font-sans text-[12px] uppercase tracking-[0.2em] font-medium py-4 no-underline"
          >
            Bundle &amp; Save
          </Link>
        </div>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
