import { useCartStore, ShopifyProduct } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import WishlistButton from '@/components/WishlistButton';
import { PROMO } from '@/lib/promo';
import { getSalePricing } from '@/lib/pricing';
import { useT } from '@/i18n';

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const navigate = useNavigate();
  const t = useT();
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images?.edges?.[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const soldOut = !variant?.availableForSale;
  const sale = getSalePricing(product);

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
    toast.success(t.product.addedToCart, {
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
        {(sale.onSale || PROMO.active) && !soldOut && (
          <span className="absolute top-3 left-3 z-10 bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1">
            {sale.onSale ? t.product.save(sale.pctOff!) : t.product.promoBadge}
          </span>
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
          title={soldOut ? t.product.soldOut : t.product.quickAdd}
          aria-label={soldOut ? t.product.soldOut : t.product.quickAdd}
          className={`absolute bottom-0 left-0 right-0 py-3.5 text-center text-[10px] tracking-[0.2em] uppercase font-medium transition-transform duration-300 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 ${soldOut ? 'bg-warm-gray/50 text-cream-light cursor-not-allowed' : 'bg-dark-green text-gold-light'}`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : soldOut ? (
            t.product.soldOut
          ) : (
            t.product.quickAdd
          )}
        </button>
      </div>
      <div className="px-0.5 text-center">
        <div className="font-serif text-[15px] md:text-[16px] font-normal text-warm-black truncate">{product.node.title}</div>
        <div className="font-sans text-[12px] md:text-[13px] text-warm-black mt-1">
          {sale.onSale && (
            <span className="line-through text-warm-gray/70 mr-2">${sale.compareAt!.toFixed(2)}</span>
          )}
          ${sale.price.toFixed(2)}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
