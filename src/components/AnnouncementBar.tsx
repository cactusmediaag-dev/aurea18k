import { Link } from 'react-router-dom';
import { Truck, Package } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-cream-light border-b border-gold/20">
      <div className="max-w-[1400px] mx-auto px-12 max-md:px-5 h-10 flex items-center justify-between">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 text-warm-black font-sans text-[12px] tracking-wide">
          <div className="flex items-center gap-2">
            <Truck className="w-[14px] h-[14px] text-gold" strokeWidth={1.5} />
            <span>Complimentary shipping on orders over $120</span>
          </div>
          <span className="text-gold/40">|</span>
          <span>18K Gold Plated · Hypoallergenic &amp; Nickel-Free</span>
        </div>
        <Link
          to="/account/orders"
          className="hidden md:flex items-center gap-1.5 text-warm-black font-sans text-[12px] tracking-wide no-underline hover:text-gold transition-colors duration-200"
        >
          <Package className="w-[14px] h-[14px] text-gold" strokeWidth={1.5} />
          <span>Track Your Order</span>
        </Link>

        {/* Mobile */}
        <div className="flex md:hidden w-full items-center justify-center text-warm-black font-sans text-[11px] tracking-wide text-center">
          <span>Free shipping over $120 · 18K Gold · Hypoallergenic</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
