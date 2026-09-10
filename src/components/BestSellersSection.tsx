import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { useT } from '@/i18n';

const BestSellersSection = () => {
  const { data: products, isLoading } = useProducts();
  const items = products?.slice(0, 6);
  const t = useT();

  return (
    <section id="bestsellers" className="aurea-section bg-cream">
      <div className="flex justify-between items-end mb-14 gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <div className="aurea-section-label">{t.bestSellers.label}</div>
          <h2 className="aurea-section-title text-balance">{t.bestSellers.title.pre} <em>{t.bestSellers.title.em}</em></h2>
        </div>
        <Link to="/collections/best-sellers" className="shrink-0 font-sans text-[11px] tracking-[0.18em] uppercase text-dark-green no-underline border-b border-gold pb-0.5 hover:text-gold transition-colors">
          {t.bestSellers.viewAll}
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
          <p className="text-warm-gray text-lg">{t.bestSellers.empty}</p>
        </div>
      )}
    </section>
  );
};

export default BestSellersSection;
