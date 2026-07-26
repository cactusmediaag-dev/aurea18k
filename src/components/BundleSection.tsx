import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { BUNDLE_CONFIGS } from '@/lib/bundles';
import { useBundleEligibleProducts } from '@/hooks/useBundleEligibleProducts';
import { ShopifyProduct } from '@/stores/cartStore';
import OptimizedImage from '@/components/OptimizedImage';
import WishlistButton from '@/components/WishlistButton';

const tiers = [
  { cfg: BUNDLE_CONFIGS.duo, featured: false, badge: null as string | null },
  { cfg: BUNDLE_CONFIGS.stack, featured: true, badge: 'Most Popular' },
  { cfg: BUNDLE_CONFIGS.full, featured: false, badge: null },
];

const BundleProductCard = ({ product }: { product: ShopifyProduct }) => {
  const navigate = useNavigate();
  const image = product.node.images?.edges?.[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:-translate-y-1 group"
      onClick={() => navigate(`/product/${product.node.handle}`)}
    >
      <div className="relative aspect-square mb-4 overflow-hidden bg-cream-light">
        {image ? (
          <OptimizedImage
            src={image.url}
            alt={image.altText || product.node.title}
            preset="card"
            className="w-full h-full object-cover"
          />
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

const BundleSection = () => {
  const { data: products, isLoading } = useBundleEligibleProducts();
  const grid = (products || [])
    .filter((p) => p.node.variants.edges[0]?.node?.availableForSale)
    .slice(0, 8);

  return (
    <section className="aurea-section bg-cream-light">
      <div className="text-center">
        <div className="aurea-section-label">Save More, Shine More</div>
        <h2 className="aurea-section-title">Bundle <em>&amp; Save</em></h2>
        <p className="text-warm-gray text-sm mt-3 font-light">Build your own set and unlock exclusive savings.</p>
      </div>

      {/* Tier strip */}
      <div className="grid grid-cols-3 gap-5 mt-14 max-md:grid-cols-1">
        {tiers.map(({ cfg, featured, badge }) => (
          <Link
            key={cfg.type}
            to={`/bundle/${cfg.type}`}
            className={`block border px-6 py-5 relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold no-underline ${
              featured ? 'border-gold bg-gradient-to-br from-gold-pale/40 to-cream-light' : 'border-gold/25 bg-cream-light'
            }`}
          >
            {badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark-green text-gold-light text-[9px] tracking-[0.2em] uppercase font-medium px-5 py-1.5 whitespace-nowrap">
                {badge}
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-serif text-[20px] font-normal text-dark-green leading-tight">{cfg.name}</div>
                <div className="font-sans text-[12px] text-warm-gray mt-1">Pick any {cfg.itemCount} pieces</div>
              </div>
              <div className="shrink-0 bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">
                Save {cfg.discountPct}%
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Product grid */}
      {isLoading ? (
        <div className="flex justify-center py-16 mt-10">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : grid.length > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {grid.map((product) => (
              <BundleProductCard key={product.node.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/bundle/stack" className="btn-aurea-primary inline-block no-underline">
              Build Your Bundle →
            </Link>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default BundleSection;
