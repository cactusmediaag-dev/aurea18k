import { Link } from 'react-router-dom';
import { useBundles } from '@/hooks/useBundles';
import type { ShopifyProduct } from '@/lib/shopify';

type BundleSlotConfig = {
  key: 'duo' | 'stack' | 'full';
  defaultName: string;
  defaultItems: string;
  defaultCta: string;
  expectedSave: number; // fallback display when no compareAtPrice
  icons: string[];
  featured: boolean;
  badge?: string;
};

const SLOTS: BundleSlotConfig[] = [
  {
    key: 'duo',
    defaultName: 'The Duo',
    defaultItems: 'Any 2 pieces\nof your choice',
    defaultCta: 'Shop The Duo',
    expectedSave: 15,
    icons: ['◎', '◇'],
    featured: false,
  },
  {
    key: 'stack',
    defaultName: 'The Stack',
    defaultItems: 'Earrings + Necklace\n+ Bracelet',
    defaultCta: 'Shop The Stack',
    expectedSave: 20,
    icons: ['◎', '◇', '○'],
    featured: true,
    badge: 'Most Popular',
  },
  {
    key: 'full',
    defaultName: 'The Full Set',
    defaultItems: '4 pieces\nof your choice',
    defaultCta: 'Shop The Full Set',
    expectedSave: 25,
    icons: ['◎', '◇', '○', '◈'],
    featured: false,
  },
];

function getBundleData(product: ShopifyProduct | null) {
  if (!product) return null;
  const variant = product.node.variants.edges[0]?.node;
  if (!variant) return null;
  const price = parseFloat(variant.price.amount);
  const compareAt = variant.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : null;
  const currency = variant.price.currencyCode === 'USD' ? '$' : variant.price.currencyCode + ' ';
  const savePct = compareAt && compareAt > price
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : null;
  const image = product.node.images.edges[0]?.node;
  return {
    title: product.node.title,
    handle: product.node.handle,
    description: product.node.description,
    price: `${currency}${price.toFixed(0)}`,
    original: compareAt ? `${currency}${compareAt.toFixed(0)}` : null,
    savePct,
    image,
  };
}

const BundleSection = () => {
  const { data: bundles, isLoading } = useBundles();

  return (
    <section className="aurea-section" style={{ background: '#FAF7F0' }}>
      <div className="text-center">
        <div className="aurea-section-label">Save More, Shine More</div>
        <h2 className="aurea-section-title">Bundle <em>&amp; Save</em></h2>
        <p className="text-warm-gray text-sm mt-3 font-light">Curate your collection and unlock exclusive savings.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-14 max-lg:grid-cols-1">
        {SLOTS.map((slot) => {
          const product = bundles?.[slot.key] ?? null;
          const data = getBundleData(product);
          const isEmpty = !data && !isLoading;

          return (
            <div
              key={slot.key}
              className={`border p-9 px-7 relative transition-all duration-300 ${
                slot.featured
                  ? 'border-gold bg-gradient-to-br from-[#FAF5E8] to-cream-light'
                  : 'border-gold/25 bg-cream-light hover:border-gold'
              } ${data ? 'cursor-pointer hover:-translate-y-1' : 'opacity-80'}`}
            >
              {slot.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark-green text-gold-light text-[9px] tracking-[0.2em] uppercase font-medium px-5 py-1.5 whitespace-nowrap">
                  {slot.badge}
                </div>
              )}

              {/* Imagem do produto bundle, ou ícones placeholder */}
              {data?.image ? (
                <div className="aspect-[4/3] mb-5 overflow-hidden bg-cream border border-gold/25">
                  <img
                    src={data.image.url}
                    alt={data.image.altText || data.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex gap-2 mb-5">
                  {slot.icons.map((icon, i) => (
                    <div key={i} className="flex-1 aspect-square bg-cream border border-gold/25 flex items-center justify-center text-xl">
                      {icon}
                    </div>
                  ))}
                </div>
              )}

              <div className="font-serif text-2xl font-normal text-dark-green mb-2">
                {data?.title || slot.defaultName}
              </div>
              <div className="text-xs text-warm-gray tracking-[0.08em] mb-5 leading-[1.8] whitespace-pre-line">
                {slot.defaultItems}
              </div>

              {isLoading ? (
                <div className="h-[34px] bg-warm-gray/10 animate-pulse mb-5" />
              ) : data ? (
                <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                  <div className="font-serif text-[34px] font-normal text-warm-black">{data.price}</div>
                  {data.original && (
                    <div className="text-base text-warm-gray line-through">{data.original}</div>
                  )}
                  {data.savePct !== null && (
                    <div className="bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">
                      Save {data.savePct}%
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-5 text-xs text-warm-gray italic">
                  Coming soon — tag a product with <code>bundle-{slot.key}</code> in Shopify.
                </div>
              )}

              {data ? (
                <Link to={`/product/${data.handle}`} className="btn-aurea-dark block text-center no-underline">
                  {slot.defaultCta}
                </Link>
              ) : (
                <button
                  disabled
                  className="btn-aurea-dark block text-center w-full opacity-50 cursor-not-allowed"
                >
                  {slot.defaultCta}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BundleSection;
