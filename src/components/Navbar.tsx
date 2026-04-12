import { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface NavbarProps {
  onCartOpen: () => void;
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore(state => state.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <nav className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-md border-b border-gold/25 px-12 flex items-center justify-between h-[72px] max-md:px-5 max-md:h-16">
      <div className="flex gap-9 items-center max-md:hidden">
        <a href="#bestsellers" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Shop</a>
        <a href="#categories" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Collections</a>
        <a href="#bestsellers" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">New Arrivals</a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <a href="/" className="font-serif text-[26px] font-light tracking-[0.25em] text-dark-green no-underline block leading-none">AUREA</a>
        <div className="text-[8px] tracking-[0.3em] uppercase text-gold mt-0.5 font-sans font-normal">Jewels · 18K Gold Plated</div>
      </div>

      <div className="flex gap-7 items-center max-md:hidden">
        <a href="#story" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">About</a>
        <a href="#reviews" className="text-xs tracking-[0.1em] uppercase text-warm-black font-normal hover:text-gold transition-colors no-underline">Reviews</a>
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
      <button className="md:hidden bg-transparent border-none" onClick={() => setMobileOpen(!mobileOpen)}>
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
        <div className="absolute top-full left-0 right-0 bg-cream-light border-b border-gold/25 flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <a href="#bestsellers" className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline">Shop</a>
          <a href="#categories" className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline">Collections</a>
          <a href="#story" className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline">About</a>
          <a href="#reviews" className="text-xs tracking-[0.1em] uppercase text-warm-black no-underline">Reviews</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
