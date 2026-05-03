import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (open) setAddedIds(new Set());
  }, [open]);

  const cartProducts = items.map(i => i.product);
  const suggestions: ShopifyProduct[] = getRecommendations(cartProducts, pool, 2);

  if (suggestions.length === 0 && open) {
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
      <DialogContent className="w-[calc(100%-2rem)] max-w-[420px] sm:max-w-[420px] bg-cream-light border border-gold/30 p-0 overflow-hidden gap-0 rounded-none [&>button]:text-gold-light/80 [&>button]:hover:text-gold-light [&>button]:opacity-100 [&>button]:top-3 [&>button]:right-3 [&>button]:z-20">
        <div className="bg-dark-green px-5 py-5 text-center">
          <DialogTitle className="font-serif text-lg sm:text-xl text-gold-light font-light leading-tight px-6">
            Wait! Complete your set 🎁
          </DialogTitle>
          <DialogDescription className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-gold-light/80 mt-2 font-sans">
            Add now and get <strong className="text-gold-light">10% OFF</strong>
          </DialogDescription>
        </div>

        <div className="p-4 sm:p-5 space-y-2.5 max-h-[50vh] overflow-y-auto">
          {suggestions.map(product => {
            const variantNode = product.node.variants.edges[0]?.node;
            const image = product.node.images.edges[0]?.node;
            const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
            const isAdded = addedIds.has(product.node.id);
            const isAdding = adding === product.node.id;
            return (
              <div key={product.node.id} className="flex items-center gap-3 bg-cream border border-gold/25 p-2.5">
                <div className="w-14 h-14 bg-cream-light flex-shrink-0 border border-gold/20 overflow-hidden">
                  {image && <img src={image.url} alt={product.node.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-[13px] leading-tight text-warm-black line-clamp-2">{product.node.title}</div>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-[10px] text-warm-gray line-through">${price.toFixed(2)}</span>
                    <span className="text-[12px] text-dark-green font-medium">${(price * 0.9).toFixed(2)}</span>
                    <span className="text-[9px] tracking-[0.08em] uppercase text-gold-dark bg-gold-pale px-1.5 py-0.5">
                      -10%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={isAdding || isAdded || !variantNode?.availableForSale}
                  className={`px-2.5 py-2 text-[10px] tracking-[0.12em] uppercase font-sans flex-shrink-0 transition-colors min-w-[60px] flex items-center justify-center ${
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

        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 space-y-1.5 border-t border-gold/15 mt-1">
          <button
            onClick={() => onContinueToCheckout(acceptedAny ? PRECHECKOUT_DISCOUNT_CODE : undefined)}
            className="btn-aurea-dark w-full text-[11px] sm:text-[12px] py-3"
          >
            {acceptedAny ? 'Checkout (10% OFF applied)' : 'Continue to Checkout →'}
          </button>
          <button
            onClick={() => onContinueToCheckout()}
            className="w-full text-[10px] tracking-[0.1em] uppercase text-warm-gray hover:text-warm-black py-1.5 bg-transparent border-none cursor-pointer"
          >
            No thanks, take me to checkout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreCheckoutModal;
