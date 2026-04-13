import { useProducts } from '@/hooks/useProducts';
import { useCartStore, ShopifyProduct } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images?.edges?.[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Added to cart', {
      description: product.node.title,
      position: 'top-center',
    });
  };

  return (
    <div className="cursor-pointer transition-transform duration-300 hover:-translate-y-1 group" onClick={() => navigate(`/product/${product.node.handle}`)}>
      <div className="relative aspect-square mb-4 overflow-hidden" style={{ background: 'hsl(var(--cream))' }}>
        {image ? (
          <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[60px] h-[60px] border-2 border-gold rounded-full opacity-50" />
          </div>
        )}
        <div className="absolute top-3.5 right-3.5 w-8 h-8 border border-gold/25 bg-cream-light/85 flex items-center justify-center cursor-pointer text-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
          ♡
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-0 left-0 right-0 bg-dark-green text-gold-light text-[10px] tracking-[0.2em] uppercase font-medium py-3.5 text-center cursor-pointer translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-none disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : variant?.availableForSale ? 'Quick Add' : 'Sold Out'}
        </button>
      </div>
      <div className="px-0.5">
        <div className="font-serif text-lg font-normal text-warm-black mb-1 tracking-[0.03em]">{product.node.title}</div>
        <div className="text-[11px] tracking-[0.1em] uppercase text-warm-gray mb-2.5 font-light">
          {product.node.description ? product.node.description.slice(0, 40) : '18K Gold · Hypoallergenic'}
        </div>
        <div className="text-[15px] text-warm-black font-normal">
          ${parseFloat(price.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const BestSellersSection = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <section id="bestsellers" className="aurea-section" style={{ background: '#FAF7F0' }}>
      <div className="flex justify-between items-end mb-13">
        <div>
          <div className="aurea-section-label">Most Loved</div>
          <h2 className="aurea-section-title">Best <em>Sellers</em></h2>
        </div>
        <Link to="/collections/all" className="text-[11px] tracking-[0.18em] uppercase text-dark-green no-underline border-b border-gold pb-0.5 font-normal hover:text-gold transition-colors">
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-4 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-warm-gray text-lg">No products found</p>
          <p className="text-warm-gray text-sm mt-2">Add products to your Shopify store to display them here.</p>
        </div>
      )}
    </section>
  );
};

export default BestSellersSection;
