import { Loader2, Plus } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

interface SuggestionCardProps {
  product: ShopifyProduct;
  onAdded?: () => void;
  variant?: 'compact' | 'inline' | 'bump';
}

const SuggestionCard = ({ product, onAdded, variant = 'compact' }: SuggestionCardProps) => {
  const addItem = useCartStore(s => s.addItem);
  const [adding, setAdding] = useState(false);
  const variantNode = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

  const handleAdd = async () => {
    if (!variantNode || adding) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variantNode.id,
        variantTitle: variantNode.title,
        price: variantNode.price,
        quantity: 1,
        selectedOptions: variantNode.selectedOptions || [],
      });
      onAdded?.();
    } finally {
      setAdding(false);
    }
  };

  if (variant === 'bump') {
    return (
      <div className="flex items-center gap-3 bg-cream border border-gold/30 p-3">
        <div className="w-12 h-12 bg-cream-light flex-shrink-0 overflow-hidden border border-gold/20">
          {image && <OptimizedImage src={image.url} alt={product.node.title} preset="thumb" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] tracking-[0.12em] uppercase text-gold-dark font-medium">
            Complete your set ✨
          </div>
          <div className="font-serif text-[13px] text-warm-black truncate">{product.node.title}</div>
          <div className="text-[12px] text-warm-black font-medium">${price.toFixed(2)}</div>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding || !variantNode?.availableForSale}
          className="px-3 py-2 bg-dark-green text-gold-light text-[10px] tracking-[0.15em] uppercase font-sans flex-shrink-0 disabled:opacity-50 hover:bg-dark-green/90 transition-colors"
        >
          {adding ? <Loader2 className="w-3 h-3 animate-spin" /> : '+ Add'}
        </button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex gap-3 items-center py-2">
        <div className="w-14 h-14 bg-cream flex-shrink-0 border border-gold/25 overflow-hidden">
          {image && <OptimizedImage src={image.url} alt={product.node.title} preset="thumb" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-serif text-[13px] text-warm-black truncate">{product.node.title}</div>
          <div className="text-[12px] text-warm-black font-medium">${price.toFixed(2)}</div>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding || !variantNode?.availableForSale}
          className="w-8 h-8 border border-gold/40 bg-transparent flex items-center justify-center cursor-pointer text-dark-green hover:bg-gold-pale disabled:opacity-50 transition-colors"
          aria-label="Add to cart"
        >
          {adding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  // compact (PDP grid)
  return (
    <div className="group">
      <div className="aspect-square bg-cream border border-gold/25 overflow-hidden mb-2">
        {image && <OptimizedImage src={image.url} alt={product.node.title} preset="card" className="w-full h-full object-cover" />}
      </div>
      <div className="font-serif text-[13px] text-warm-black truncate">{product.node.title}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[12px] text-warm-black font-medium">${price.toFixed(2)}</span>
        <button
          onClick={handleAdd}
          disabled={adding || !variantNode?.availableForSale}
          className="text-[10px] tracking-[0.12em] uppercase text-dark-green border-b border-gold/40 pb-0.5 hover:text-gold-dark disabled:opacity-50 transition-colors"
        >
          {adding ? '...' : '+ Add'}
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
