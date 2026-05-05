import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, X, Check } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useBundleEligibleProducts } from '@/hooks/useBundleEligibleProducts';
import { getBundleConfig } from '@/lib/bundles';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import type { ShopifyProduct } from '@/lib/shopify';

interface SelectedSlot {
  uid: string; // unique id per selection (allows same product twice)
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
}

const BundleBuilder = () => {
  const { type } = useParams<{ type: string }>();
  const config = getBundleConfig(type);
  const navigate = useNavigate();
  const { data: products, isLoading } = useBundleEligibleProducts();
  const addBundle = useCartStore(s => s.addBundle);
  const isCartLoading = useCartStore(s => s.isLoading);
  const openCart = useUIStore(s => s.setCartOpen);
  const [selected, setSelected] = useState<SelectedSlot[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (!config) {
    return (
      <PageLayout>
        <section className="aurea-section text-center">
          <h1 className="aurea-section-title">Bundle not found</h1>
          <Link to="/" className="btn-aurea-dark inline-block mt-6">Back to home</Link>
        </section>
      </PageLayout>
    );
  }

  const subtotal = useMemo(
    () => selected.reduce((sum, s) => sum + parseFloat(s.price.amount), 0),
    [selected],
  );
  const discountAmount = (subtotal * config.discountPct) / 100;
  const total = subtotal - discountAmount;
  const remaining = config.itemCount - selected.length;
  const isComplete = selected.length === config.itemCount;
  const isOverFilled = selected.length > config.itemCount;

  const addPiece = (product: ShopifyProduct) => {
    if (selected.length >= config.itemCount) {
      toast.error(`You've already picked ${config.itemCount} pieces`);
      return;
    }
    const variant = product.node.variants.edges.find(v => v.node.availableForSale)?.node;
    if (!variant) {
      toast.error('Out of stock');
      return;
    }
    setSelected(prev => [
      ...prev,
      {
        uid: `${variant.id}-${Date.now()}-${Math.random()}`,
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        selectedOptions: variant.selectedOptions,
      },
    ]);
  };

  const removePiece = (uid: string) => {
    setSelected(prev => prev.filter(s => s.uid !== uid));
  };

  const handleAddBundle = async () => {
    if (!isComplete) return;
    setSubmitting(true);
    try {
      const result = await addBundle({
        items: selected.map(s => ({
          product: s.product,
          variantId: s.variantId,
          variantTitle: s.variantTitle,
          price: s.price,
          quantity: 1,
          selectedOptions: s.selectedOptions,
        })),
        discountCode: config.discountCode,
      });
      if (result.success) {
        if (result.codeApplicable === false) {
          toast.warning(`Bundle added — but ${config.discountCode} couldn't be applied. Contact us for help.`);
        } else {
          toast.success(`${config.name} added — ${config.discountPct}% off applied!`);
        }
        setSelected([]);
        openCart(true);
      } else {
        toast.error('Something went wrong adding your bundle');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const eligibleProducts = (products || []).filter(p =>
    p.node.variants.edges.some(v => v.node.availableForSale),
  );

  return (
    <PageLayout>
      {/* Hero */}
      <section className="aurea-section text-center pb-6">
        <div className="aurea-section-label">Bundle &amp; Save</div>
        <h1 className="aurea-section-title">{config.name}</h1>
        <p className="text-warm-gray text-sm mt-3 font-light max-w-xl mx-auto">{config.tagline}</p>
        <div className="inline-block bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-4 py-2 mt-5">
          Save {config.discountPct}% — code {config.discountCode}
        </div>
      </section>

      <section className="aurea-section pt-0">
        <div className="grid grid-cols-[1fr_360px] gap-10 max-lg:grid-cols-1">
          {/* Product grid */}
          <div>
            <h2 className="font-serif text-2xl text-dark-green mb-6">Choose your pieces</h2>

            {isLoading ? (
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-warm-gray/10 animate-pulse" />
                ))}
              </div>
            ) : eligibleProducts.length === 0 ? (
              <div className="border border-gold/25 bg-cream-light p-10 text-center">
                <p className="text-warm-gray text-sm">
                  No bundle-eligible products yet. Add the tag <code className="bg-cream px-2 py-0.5">bundle-eligible</code> to products in Shopify to make them appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2">
                {eligibleProducts.map(p => {
                  const variant = p.node.variants.edges.find(v => v.node.availableForSale)?.node;
                  if (!variant) return null;
                  const image = p.node.images.edges[0]?.node;
                  const price = parseFloat(variant.price.amount);
                  const currency = variant.price.currencyCode === 'USD' ? '$' : variant.price.currencyCode + ' ';
                  const isSelected = selected.some(s => s.variantId === variant.id);
                  return (
                    <button
                      key={p.node.id}
                      onClick={() => addPiece(p)}
                      disabled={selected.length >= config.itemCount}
                      className={`group text-left bg-cream-light border transition-all ${
                        isSelected ? 'border-dark-green ring-1 ring-dark-green' : 'border-gold/25 hover:border-gold'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="aspect-square overflow-hidden bg-cream relative">
                        {image && (
                          <img
                            src={image.url}
                            alt={image.altText || p.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-dark-green text-gold-light w-7 h-7 flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="font-serif text-base text-dark-green leading-tight mb-1 line-clamp-2">{p.node.title}</div>
                        <div className="text-sm text-warm-black">{currency}{price.toFixed(0)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sticky panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-cream-light border border-gold/25 p-6">
              <div className="font-serif text-xl text-dark-green mb-4">Your {config.name}</div>

              {/* Slots */}
              <div className="space-y-2 mb-5">
                {Array.from({ length: config.itemCount }).map((_, i) => {
                  const slot = selected[i];
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2 border ${
                        slot ? 'border-dark-green bg-cream' : 'border-dashed border-gold/30 bg-cream/50'
                      }`}
                    >
                      <div className="w-12 h-12 bg-cream flex-shrink-0 overflow-hidden border border-gold/20">
                        {slot ? (
                          slot.product.node.images.edges[0]?.node && (
                            <img
                              src={slot.product.node.images.edges[0].node.url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gold/40 text-xs">
                            {i + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {slot ? (
                          <>
                            <div className="text-xs font-medium text-dark-green truncate">{slot.product.node.title}</div>
                            <div className="text-[11px] text-warm-gray">${parseFloat(slot.price.amount).toFixed(0)}</div>
                          </>
                        ) : (
                          <div className="text-xs text-warm-gray italic">Pick piece {i + 1}</div>
                        )}
                      </div>
                      {slot && (
                        <button
                          onClick={() => removePiece(slot.uid)}
                          className="text-warm-gray hover:text-dark-green p-1"
                          aria-label="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress */}
              {!isComplete && !isOverFilled && (
                <div className="text-xs text-warm-gray text-center mb-4">
                  Pick {remaining} more to unlock <strong className="text-dark-green">{config.discountPct}% off</strong>
                </div>
              )}

              {/* Pricing */}
              <div className="border-t border-gold/20 pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-warm-gray">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {isComplete && (
                  <div className="flex justify-between text-dark-green">
                    <span>Bundle discount ({config.discountPct}%)</span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-xl text-warm-black pt-2 border-t border-gold/20">
                  <span>Total</span>
                  <span>${(isComplete ? total : subtotal).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                disabled={!isComplete || submitting || isCartLoading}
                className="btn-aurea-dark w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting || isCartLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Adding...
                  </>
                ) : isComplete ? (
                  `Add Bundle to Cart`
                ) : (
                  `Pick ${remaining} more`
                )}
              </button>

              <button
                onClick={() => navigate('/')}
                className="text-xs text-warm-gray hover:text-dark-green underline w-full text-center mt-3"
              >
                Back to home
              </button>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
};

export default BundleBuilder;
