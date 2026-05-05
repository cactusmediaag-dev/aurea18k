import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { useProducts } from '@/hooks/useProducts';
import { getRecommendations } from '@/lib/recommendations';
import SuggestionCard from '@/components/SuggestionCard';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { getSwatchColor, isColorOption } from '@/lib/colorSwatch';

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id title description handle productType tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges {
          node {
            id title
            price { amount currencyCode }
            availableForSale
            image { url altText }
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const openCart = useUIStore(state => state.openCart);
  const { data: pool = [] } = useProducts(50);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading: productLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const p = res?.data?.productByHandle;
      if (!p) return null;
      return { node: p } as ShopifyProduct;
    },
    enabled: !!handle,
  });

  const product = data;
  const variant = product?.node.variants.edges[selectedVariantIdx]?.node;
  const images = product?.node.images.edges ?? [];

  // Sync displayed image with selected variant's anchored image (Shopify-side)
  useEffect(() => {
    const variantImageUrl = (variant as any)?.image?.url;
    if (!variantImageUrl) return;
    const matchIdx = images.findIndex(img => img.node.url === variantImageUrl);
    if (matchIdx >= 0 && matchIdx !== selectedImage) {
      setSelectedImage(matchIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariantIdx]);

  if (productLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light">
      <Loader2 className="w-8 h-8 animate-spin text-gold" />
    </div>
  );

  if (!data || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light">
      <p className="text-warm-gray">Product not found</p>
    </div>
  );
  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success('Added to cart', { description: product.node.title, position: 'top-center' });
    // Open cart drawer so user immediately sees suggestions
    setTimeout(() => openCart(), 250);
  };

  const recommendations = getRecommendations(product, pool, 4);

  return (
    <PageLayout>
      <div className="bg-cream-light">
        <div className="max-w-6xl mx-auto px-12 py-16 max-sm:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-warm-gray mb-8 bg-transparent border-none cursor-pointer hover:text-dark-green transition-colors font-sans">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
          <div>
            <div className="aspect-square bg-cream overflow-hidden mb-4">
              {images[selectedImage]?.node ? (
                <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.node.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-gold rounded-full opacity-50" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 border overflow-hidden cursor-pointer bg-cream ${i === selectedImage ? 'border-gold' : 'border-gold/25'}`}>
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="aurea-section-label">Aurea Jewels</div>
            <h1 className="font-serif text-4xl font-light text-dark-green mb-4">{product.node.title}</h1>
            <div className="text-2xl text-warm-black font-normal mb-6">
              ${variant ? parseFloat(variant.price.amount).toFixed(2) : parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
            </div>

            <p className="text-[15px] text-warm-gray leading-[1.85] font-light mb-8">{product.node.description}</p>

            {product.node.options.map((option) => (
              option.values.length > 1 && (
                <div key={option.name} className="mb-6">
                  <div className="text-xs tracking-[0.15em] uppercase text-warm-black font-medium mb-3">{option.name}</div>
                  <div className="flex gap-2.5 flex-wrap items-center">
                    {product.node.variants.edges.map((v, vIdx) => {
                      const optionValue = v.node.selectedOptions.find(o => o.name === option.name)?.value;
                      if (!optionValue) return null;
                      const isSelected = vIdx === selectedVariantIdx;

                      if (isColorOption(option.name)) {
                        const swatch = getSwatchColor(optionValue);
                        return (
                          <button
                            key={vIdx}
                            onClick={() => setSelectedVariantIdx(vIdx)}
                            title={optionValue}
                            aria-label={optionValue}
                            className={`relative w-9 h-9 rounded-full cursor-pointer transition-all border ${
                              isSelected
                                ? 'border-gold ring-2 ring-gold ring-offset-2 ring-offset-cream-light'
                                : 'border-gold/30 hover:border-gold'
                            }`}
                            style={{ backgroundColor: swatch }}
                          />
                        );
                      }

                      return (
                        <button
                          key={vIdx}
                          onClick={() => setSelectedVariantIdx(vIdx)}
                          className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border cursor-pointer font-sans transition-all ${
                            isSelected ? 'border-gold bg-dark-green text-gold-light' : 'border-gold/25 bg-transparent text-warm-black hover:border-gold'
                          }`}
                        >
                          {optionValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            <button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="btn-aurea-dark mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : variant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </button>

            <div className="mt-8 space-y-3">
              {['✦ 18K Gold Plated', '◈ Hypoallergenic & Nickel-Free', '◇ Free Shipping on $120+'].map((item) => (
                <div key={item} className="text-[13px] text-warm-gray font-light">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gold/20">
            <div className="aurea-section-label mb-2">Style it together</div>
            <h2 className="font-serif text-2xl font-light text-dark-green mb-8">
              Complete your look
            </h2>
            <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
              {recommendations.map(p => (
                <SuggestionCard key={p.node.id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
