import { useProducts } from '@/hooks/useProducts';
import { useCartStore, ShopifyProduct } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import WishlistButton from '@/components/WishlistButton';

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images?.edges?.[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const soldOut = !variant?.availableForSale;

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
      <div className="relative aspect-square mb-4 overflow-hidden bg-cream-light">
        {image ? (
          <OptimizedImage src={image.url} alt={image.altText || product.node.title} preset="card" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[60px] h-[60px] border-2 border-gold opacity-50" />
          </div>
        )}
        <WishlistButton
          product={{
            productId: product.node.id,
            handle: product.node.handle,
            title: product.node.title,
            image: image?.url || null,
            price: price.amount,
          }}
        />
        <button
          onClick={handleAddToCart}
          disabled={isLoading || soldOut}
          title={soldOut ? 'Sold Out' : 'Quick Add'}
          aria-label={soldOut ? 'Sold Out' : 'Quick Add'}
          className={`absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${soldOut ? 'bg-warm-gray/50 text-cream-light cursor-not-allowed' : 'bg-dark-green text-gold-light'}`}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      </div>
      <div className="px-0.5 text-center">
        <div className="font-serif text-[16px] font-normal text-warm-black truncate">{product.node.title}</div>
        <div className="font-sans text-[13px] text-warm-black mt-1">
          ${parseFloat(price.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

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
