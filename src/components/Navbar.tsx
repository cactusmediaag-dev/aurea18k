import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface NavbarProps {
  onCartOpen: () => void;
}

const shopMenus = {
  Women: [
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
    { label: 'Gift-Ready Jewelry', href: '/collections/gift-ready' },
    { label: 'His & Hers Sets', href: '/collections/his-hers-sets' },
  ],
};

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalItems = useCartStore(state => state.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-md border-b border-gold/25 px-12 flex items-center justify-between h-[72px] max-md:px-5 max-md:h-16">
      {/* Desktop left nav */}
      <div className="flex gap-9 items-center max-md:hidden" ref={dropdownRef}>
        {/* Shop dropdown trigger */}
        <div className="relative">
          <button
            className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setActiveDropdown('shop')}
          >
            Shop <ChevronDown className="w-3 h-3" />
          </button>
          {activeDropdown === 'shop' && (
            <div
              className="absolute top-full left-0 mt-2 bg-cream-light border border-gold/25 shadow-lg p-8 min-w-[680px] z-50"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="grid grid-cols-4 gap-8">
                {Object.entries(shopMenus).map(([title, items]) => (
                  <div key={title}>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-4">{title}</div>
                    <ul className="list-none space-y-2.5">
                      {items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            className="text-[12px] text-warm-black/70 font-light hover:text-gold transition-colors no-underline block"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link to="/collections/new-arrivals" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">New Arrivals</Link>
        <Link to="/collections/best-sellers" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Best Sellers</Link>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <Link to="/" className="font-serif text-[26px] font-light tracking-[0.25em] text-dark-green no-underline block leading-none">AUREA</Link>
        <div className="text-[8px] tracking-[0.3em] uppercase text-gold mt-0.5 font-sans font-normal">Jewels · 18K Gold Plated</div>
      </div>

      {/* Desktop right nav */}
      <div className="flex gap-7 items-center max-md:hidden">
        <Link to="/about" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">About</Link>
        <Link to="/reviews" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Reviews</Link>
        <Link to="/contact" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Contact</Link>
        <Search className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
        <button onClick={onCartOpen} className="relative bg-transparent border-none cursor-pointer p-0">
          <ShoppingBag className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Mobile */}
      <button className="md:hidden bg-transparent border-none" onClick={() => { setMobileOpen(!mobileOpen); setMobileSubmenu(null); }}>
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      <button onClick={onCartOpen} className="md:hidden relative bg-transparent border-none cursor-pointer p-0">
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold rounded-full text-[10px] font-medium text-warm-black flex items-center justify-center font-sans">
            {totalItems}
          </span>
        )}
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream-light border-b border-gold/25 flex flex-col items-center gap-1 py-6 md:hidden z-50 max-h-[80vh] overflow-y-auto">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline py-2">Home</Link>

          {Object.entries(shopMenus).map(([title, items]) => (
            <div key={title} className="w-full text-center">
              <button
                className="text-xs tracking-[0.1em] uppercase text-warm-black bg-transparent border-none cursor-pointer py-2 flex items-center gap-1 mx-auto"
                onClick={() => setMobileSubmenu(mobileSubmenu === title ? null : title)}
              >
                {title} <ChevronDown className={`w-3 h-3 transition-transform ${mobileSubmenu === title ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === title && (
                <div className="flex flex-col gap-2 py-2 bg-cream/50">
                  {items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="text-[11px] text-warm-black/70 no-underline py-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline py-2">About</Link>
          <Link to="/reviews" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline py-2">Reviews</Link>
          <Link to="/faq" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline py-2">FAQ</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline py-2">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
