import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const freeShippingThreshold = 120;
  const remaining = Math.max(0, freeShippingThreshold - totalPrice);
  const progress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  useEffect(() => { if (open) syncCart(); }, [open, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-cream-light border-l border-gold/25 p-0">
        <div className="bg-dark-green px-5 py-4 flex justify-between items-center flex-shrink-0">
          <SheetHeader className="p-0">
            <SheetTitle className="text-[11px] tracking-[0.15em] uppercase text-gold-light font-medium font-sans">
              Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex flex-col flex-1 min-h-0 p-5">
          {items.length > 0 && remaining > 0 && (
            <div className="bg-gold-pale border border-gold/25 p-3 mb-4 text-xs text-dark-green font-normal">
              🚚 Add <strong>${remaining.toFixed(2)}</strong> more for <strong>free shipping!</strong>
              <div className="mt-2 h-[3px] bg-gold/20 rounded-sm overflow-hidden">
                <div className="h-full rounded-sm transition-all duration-700" style={{ width: `${progress}%`, background: 'linear-gradient(to right, hsl(var(--dark-green)), hsl(var(--gold)))' }} />
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="text-4xl mb-4">🛍</div>
                <p className="text-warm-gray">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3.5">
                    <div className="w-[60px] h-[60px] bg-cream border border-gold/25 flex-shrink-0 overflow-hidden">
                      {item.product.node.images?.edges?.[0]?.node ? (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">◎</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-serif text-[13px] font-normal text-warm-black">{item.product.node.title}</div>
                      <div className="text-[10px] text-warm-gray tracking-[0.08em] mt-0.5">
                        {item.selectedOptions.map(o => o.value).join(' · ')}
                      </div>
                      <div className="text-sm text-warm-black font-medium mt-1.5">${parseFloat(item.price.amount).toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button onClick={() => removeItem(item.variantId)} className="bg-transparent border-none cursor-pointer p-1 text-warm-gray hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-6 h-6 border border-gold/25 bg-transparent flex items-center justify-center cursor-pointer text-warm-black">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-6 h-6 border border-gold/25 bg-transparent flex items-center justify-center cursor-pointer text-warm-black">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 pt-4 border-t border-gold/25 space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-warm-gray uppercase tracking-[0.1em]">Subtotal</span>
                  <span className="font-serif text-base font-medium text-warm-black">${totalPrice.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} disabled={isLoading || isSyncing} className="btn-aurea-dark flex items-center justify-center gap-2">
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4" />Checkout Securely →</>}
                </button>
                <p className="text-[10px] text-center text-warm-gray tracking-[0.05em]">🔒 SSL Encrypted · Secure Checkout</p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
