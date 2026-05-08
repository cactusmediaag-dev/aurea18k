import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useBundleEligibleProducts } from '@/hooks/useBundleEligibleProducts';
import { getBundleConfig, getNextTier, BundleType } from '@/lib/bundles';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import type { ShopifyProduct } from '@/lib/shopify';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface SelectedSlot {
  uid: string;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Rings: ['ring'],
  Necklaces: ['necklace', 'choker', 'pendant'],
  Earrings: ['earring', 'hoop', 'stud'],
  Bracelets: ['bracelet', 'bangle'],
  Chains: ['chain'],
};

function detectCategory(p: ShopifyProduct): string {
  const haystack = [
    p.node.productType || '',
    ...(p.node.tags || []),
    p.node.title || '',
  ]
    .join(' ')
    .toLowerCase();
  for (const [cat, keys] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keys.some(k => haystack.includes(k))) return cat;
  }
  return 'Other';
}

const BundleBuilder = () => {
  const { type } = useParams<{ type: string }>();
  const config = getBundleConfig(type);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: products, isLoading } = useBundleEligibleProducts();
  const addBundle = useCartStore(s => s.addBundle);
  const isCartLoading = useCartStore(s => s.isLoading);
  const openCart = useUIStore(s => s.setCartOpen);
  const [selected, setSelected] = useState<SelectedSlot[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewOpen, setPreviewOpen] = useState(false);

  // Receive pre-selected items from tier upgrade
  useEffect(() => {
    const preselected = (location.state as { preselected?: SelectedSlot[] } | null)?.preselected;
    if (preselected && preselected.length > 0 && config) {
      setSelected(preselected.slice(0, config.itemCount));
      // Clear state so refresh doesn't re-apply
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const nextTier = getNextTier(config.type as BundleType);

  const eligibleProducts = useMemo(
    () => (products || []).filter(p => p.node.variants.edges.some(v => v.node.availableForSale)),
    [products],
  );

  // Categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: eligibleProducts.length };
    eligibleProducts.forEach(p => {
      const cat = detectCategory(p);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const order = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Chains', 'Other'];
    return order.filter(c => counts[c]).map(c => ({ name: c, count: counts[c] }));
  }, [eligibleProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return eligibleProducts;
    return eligibleProducts.filter(p => detectCategory(p) === activeCategory);
  }, [eligibleProducts, activeCategory]);

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

  const handleUpgrade = () => {
    if (!nextTier) return;
    navigate(`/bundle/${nextTier.type}`, { state: { preselected: selected } });
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
          toast.warning(`Bundle added — but ${config.discountCode} couldn't be applied.`);
        } else {
          toast.success(`${config.name} added — ${config.discountPct}% off applied!`);
        }
        setSelected([]);
        setPreviewOpen(false);
        openCart(true);
      } else {
        toast.error('Something went wrong adding your bundle');
      }
    } finally {
      setSubmitting(false);
    }
  };

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

      <section className="aurea-section pt-0 pb-32 lg:pb-12">
        <div className="grid grid-cols-[1fr_360px] gap-10 max-lg:grid-cols-1">
          {/* Product grid */}
          <div>
            <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
              <h2 className="font-serif text-2xl text-dark-green">Choose your pieces</h2>
            </div>

            {/* Category filters */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setActiveCategory(c.name)}
                    className={`text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-colors ${
                      activeCategory === c.name
                        ? 'bg-dark-green text-gold-light border-dark-green'
                        : 'bg-cream-light text-warm-gray border-gold/25 hover:border-gold hover:text-dark-green'
                    }`}
                  >
                    {c.name} <span className="opacity-70">· {c.count}</span>
                  </button>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-warm-gray/10 animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="border border-gold/25 bg-cream-light p-10 text-center">
                <p className="text-warm-gray text-sm font-light">
                  No pieces in this category. Try another filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2">
                {filteredProducts.map(p => {
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
              {!isComplete && (
                <div className="text-xs text-warm-gray text-center mb-4">
                  Pick {remaining} more to unlock <strong className="text-dark-green">{config.discountPct}% off</strong>
                </div>
              )}

              {/* Pricing — economia em tempo real */}
              <div className="border-t border-gold/20 pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-warm-gray">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {selected.length > 0 && (
                  <div className="flex justify-between text-dark-green font-medium">
                    <span>
                      You save ({config.discountPct}%)
                      {!isComplete && <span className="text-[10px] text-warm-gray ml-1">estimated</span>}
                    </span>
                    <span>−${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-xl text-warm-black pt-2 border-t border-gold/20">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Upgrade tier suggestion */}
              {isComplete && nextTier && (
                <button
                  onClick={handleUpgrade}
                  className="w-full mt-4 bg-gold-pale border border-gold/40 hover:border-gold text-dark-green p-3 text-left flex items-center gap-3 transition-colors group"
                >
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 text-xs">
                    <div className="font-medium">Add +1 piece and get {nextTier.discountPct}% off</div>
                    <div className="text-warm-gray text-[11px]">Upgrade to {nextTier.name}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <button
                onClick={() => setPreviewOpen(true)}
                disabled={!isComplete || submitting || isCartLoading}
                className="btn-aurea-dark w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isComplete ? `Review Bundle` : `Pick ${remaining} more`}
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

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg bg-cream-light border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-dark-green">
              Review your {config.name}
            </DialogTitle>
            <DialogDescription className="text-warm-gray">
              Confirm your pieces before adding to cart.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {selected.map(s => {
              const img = s.product.node.images.edges[0]?.node;
              return (
                <div key={s.uid} className="flex gap-3 p-2 bg-cream border border-gold/20">
                  <div className="w-16 h-16 bg-cream flex-shrink-0 overflow-hidden">
                    {img && <img src={img.url} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-sm text-dark-green leading-tight">
                      {s.product.node.title}
                    </div>
                    {s.variantTitle && s.variantTitle !== 'Default Title' && (
                      <div className="text-[11px] text-warm-gray mt-0.5">{s.variantTitle}</div>
                    )}
                    <div className="text-sm text-warm-black mt-1">
                      ${parseFloat(s.price.amount).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gold/20 pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-warm-gray">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-dark-green font-medium">
              <span>Desconto ({config.discountCode})</span>
              <span>−${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-serif text-xl text-warm-black pt-2 border-t border-gold/20">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setPreviewOpen(false)}
              disabled={submitting}
              className="flex-1 border border-dark-green text-dark-green hover:bg-dark-green hover:text-gold-light transition-colors py-3 text-xs tracking-[0.15em] uppercase disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleAddBundle}
              disabled={submitting || isCartLoading}
              className="btn-aurea-dark flex-1 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting || isCartLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Adding...
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default BundleBuilder;
