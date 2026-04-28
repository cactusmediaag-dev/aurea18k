import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, X } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useProducts } from '@/hooks/useProducts';
import { getRecommendations } from '@/lib/recommendations';

const PRECHECKOUT_DISCOUNT_CODE = 'COMPLETESET10';

interface PreCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueToCheckout: (discountCode?: string) => void;
}

const PreCheckoutModal = ({ open, onOpenChange, onContinueToCheckout }: PreCheckoutModalProps) => {
  const { items } = useCartStore();
  const { data: pool = [] } = useProducts(50);
  const addItem = useCartStore(s => s.addItem);
  const [adding, setAdding] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Reset added state when reopening
  useEffect(() => {
    if (open) setAddedIds(new Set());
  }, [open]);

  const cartProducts = items.map(i => i.product);
  const suggestions: ShopifyProduct[] = getRecommendations(cartProducts, pool, 2);

  if (suggestions.length === 0 && open) {
    // Nothing to upsell — go straight to checkout
    onContinueToCheckout();
    return null;
  }

  const handleAdd = async (product: ShopifyProduct) => {
    const variantNode = product.node.variants.edges[0]?.node;
    if (!variantNode) return;
    setAdding(product.node.id);
    try {
      await addItem({
        product,
        variantId: variantNode.id,
        variantTitle: variantNode.title,
        price: variantNode.price,
        quantity: 1,
        selectedOptions: variantNode.selectedOptions || [],
      });
      setAddedIds(prev => new Set(prev).add(product.node.id));
    } finally {
      setAdding(null);
    }
  };

  const acceptedAny = addedIds.size > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-cream-light border border-gold/30 p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 text-warm-gray hover:text-warm-black p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-dark-green px-6 py-5 text-center">
          <DialogTitle className="font-serif text-xl text-gold-light font-light">
            Wait! Complete your set 🎁
          </DialogTitle>
          <DialogDescription className="text-[11px] tracking-[0.12em] uppercase text-gold-light/80 mt-2 font-sans">
            Add now and get <strong>10% OFF</strong> these pieces
          </DialogDescription>
        </div>

        <div className="p-5 space-y-3">
          {suggestions.map(product => {
            const variantNode = product.node.variants.edges[0]?.node;
            const image = product.node.images.edges[0]?.node;
            const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
            const isAdded = addedIds.has(product.node.id);
            const isAdding = adding === product.node.id;
            return (
              <div key={product.node.id} className="flex items-center gap-3 bg-cream border border-gold/25 p-3">
                <div className="w-16 h-16 bg-cream-light flex-shrink-0 border border-gold/20 overflow-hidden">
                  {image && <img src={image.url} alt={product.node.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-sm text-warm-black truncate">{product.node.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-warm-gray line-through">${price.toFixed(2)}</span>
                    <span className="text-[13px] text-dark-green font-medium">${(price * 0.9).toFixed(2)}</span>
                    <span className="text-[9px] tracking-[0.1em] uppercase text-gold-dark bg-gold-pale px-1.5 py-0.5">
                      -10%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={isAdding || isAdded || !variantNode?.availableForSale}
                  className={`px-3 py-2 text-[10px] tracking-[0.12em] uppercase font-sans flex-shrink-0 transition-colors ${
                    isAdded
                      ? 'bg-gold-pale text-dark-green border border-gold/40'
                      : 'bg-dark-green text-gold-light hover:bg-dark-green/90'
                  } disabled:opacity-50`}
                >
                  {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : isAdded ? '✓ Added' : '+ Add'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="px-5 pb-5 space-y-2">
          <button
            onClick={() => onContinueToCheckout(acceptedAny ? PRECHECKOUT_DISCOUNT_CODE : undefined)}
            className="btn-aurea-dark w-full"
          >
            {acceptedAny ? 'Continue to Checkout (10% OFF applied)' : 'Continue to Checkout →'}
          </button>
          <button
            onClick={() => onContinueToCheckout()}
            className="w-full text-[11px] tracking-[0.1em] uppercase text-warm-gray hover:text-warm-black py-2 bg-transparent border-none cursor-pointer"
          >
            No thanks, take me to checkout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreCheckoutModal;
