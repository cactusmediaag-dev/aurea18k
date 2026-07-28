import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const BestSellersSection = () => {
  const { data: products, isLoading } = useProducts();
  const items = products?.slice(0, 6);

  return (
    <section id="bestsellers" className="aurea-section bg-cream">
      <div className="flex justify-between items-end mb-14 gap-6">
        <div>
          <div className="aurea-section-label">Our Signature Selection</div>
          <h2 className="aurea-section-title">Loved <em>Most</em></h2>
        </div>
        <Link to="/collections/best-sellers" className="shrink-0 font-sans text-[11px] tracking-[0.18em] uppercase text-dark-green no-underline border-b border-gold pb-0.5 hover:text-gold transition-colors">
          View All Best Sellers →
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : items && items.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {items.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-warm-gray text-lg">No products found</p>
        </div>
      )}
    </section>
  );
};

export default BestSellersSection;
