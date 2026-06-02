import { useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { storefrontApiRequest, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Loader2, ShoppingBag } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import Seo, { breadcrumbLd } from '@/components/Seo';
import OptimizedImage from '@/components/OptimizedImage';
import WishlistButton from '@/components/WishlistButton';
import bannerWomens from '@/assets/banner-womens.jpg';
import bannerMens from '@/assets/banner-mens.jpg';
import bannerKids from '@/assets/banner-kids.jpg';
import bannerBestsellers from '@/assets/banner-bestsellers.jpg';
import bannerNewArrivals from '@/assets/banner-newarrivals.jpg';
import bannerBundles from '@/assets/banner-bundles.jpg';
import bannerGifts from '@/assets/banner-gifts.jpg';

function getCollectionBanner(handle: string): string | null {
  if (handle === 'best-sellers') return bannerBestsellers;
  if (handle === 'new-arrivals') return bannerNewArrivals;
  if (handle === 'bundles-sets') return bannerBundles;
  if (handle === 'gift-ideas') return bannerGifts;
  if (handle.startsWith('womens') || handle === 'everyday-essentials' || handle === 'statement-pieces' || handle === 'minimal-collection' || handle === 'layering-pieces') return bannerWomens;
  if (handle.startsWith('mens') || handle === 'minimal-men' || handle === 'classic-collection') return bannerMens;
  if (handle.startsWith('kids') || handle === 'hypoallergenic-kids') return bannerKids;
  return null;
}

const COLLECTION_TITLES: Record<string, string> = {
  'all': 'All Jewelry',
  'womens-earrings': "Women's Earrings",
  'womens-necklaces': "Women's Necklaces",
  'womens-bracelets': "Women's Bracelets",
  'womens-chokers': "Women's Chokers",
  'everyday-essentials': 'Everyday Essentials',
  'statement-pieces': 'Statement Pieces',
  'minimal-collection': 'Minimal Collection',
  'layering-pieces': 'Layering Pieces',
  'mens-chains': "Men's Chains",
  'mens-bracelets': "Men's Bracelets",
  'mens-stud-earrings': "Men's Stud Earrings",
  'mens-scapular-necklaces': "Men's Scapular Necklaces",
  'minimal-men': 'Minimal Men',
  'classic-collection': 'Classic Collection',
  'kids-earrings': 'Kids Earrings',
  'kids-necklaces': 'Kids Necklaces',
  'kids-bracelets': 'Kids Bracelets',
  'kids-chokers': 'Kids Chokers',
  'hypoallergenic-kids': 'Hypoallergenic Kids',
  'best-sellers': 'Best Sellers',
  'trending-now': 'Trending Now',
  'under-50': 'Under $50',
  'limited-drop': 'Limited Drop',
  'gift-ready': 'Gift Ready Jewelry',
  'his-hers-sets': 'His & Hers Sets',
  'new-arrivals': 'New Arrivals',
  'bundles-sets': 'Bundles & Sets',
  'gift-ideas': 'Gift Ideas',
  'womens': "Women's Collection",
  'mens': "Men's Collection",
  'kids': "Kids Collection",
};

// Grouped queries for top-level categories
const GROUPED_QUERIES: Record<string, string> = {
  'womens': 'tag:womens-earrings OR tag:womens-necklaces OR tag:womens-bracelets OR tag:womens-chokers OR tag:everyday-essentials OR tag:statement-pieces OR tag:minimal-collection OR tag:layering-pieces',
  'mens': 'tag:mens-chains OR tag:mens-bracelets OR tag:mens-stud-earrings OR tag:mens-scapular-necklaces OR tag:minimal-men OR tag:classic-collection',
  'kids': 'tag:kids-earrings OR tag:kids-necklaces OR tag:kids-bracelets OR tag:kids-chokers OR tag:hypoallergenic-kids',
};

function getCollectionQuery(handle: string): string | undefined {
  if (handle === 'all') return undefined;
  if (GROUPED_QUERIES[handle]) return GROUPED_QUERIES[handle];
  return `tag:${handle}`;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 2) { edges { node { url altText } } }
          variants(first: 5) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

const Collection = () => {
  const { handle = 'all' } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  const query = getCollectionQuery(handle);
  const title = COLLECTION_TITLES[handle] || handle.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const banner = getCollectionBanner(handle);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['collection', handle],
    queryFn: async ({ pageParam }) => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: 40,
        query,
        after: pageParam ?? null,
      });
      return res?.data?.products ?? { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage?.pageInfo?.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
  });

  const products = useMemo<ShopifyProduct[]>(
    () => (data?.pages ?? []).flatMap((p) => p?.edges ?? []),
    [data]
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
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
  };

  return (
    <PageLayout>
      <Seo
        title={`${title} | Aurea Jewels`}
        description={`Shop ${title} from Aurea Jewels — premium 18K gold plated, hypoallergenic jewelry crafted for everyday wear.`}
        path={`/collections/${handle}`}
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Collections', path: '/collections' },
          { name: title, path: `/collections/${handle}` },
        ])}
      />
      <div className="bg-cream-light min-h-[60vh]">
        {/* Banner / Header */}
        {banner ? (
          <div className="w-full overflow-hidden">
            <img
              src={banner}
              alt={title}
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
        ) : (
          <div className="text-center py-14 border-b border-gold/15">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium mb-2">Aurea Jewels</div>
            <h1 className="font-serif text-4xl font-light text-dark-green tracking-wide">{title}</h1>
          </div>
        )}

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-12 py-14 max-sm:px-5">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg font-light mb-2">No products found</p>
              <p className="text-warm-gray/60 text-sm">This collection is empty. Check back soon for new pieces.</p>
              <Link to="/collections" className="inline-block mt-6 text-xs tracking-[0.15em] uppercase text-gold hover:text-dark-green transition-colors font-medium">
                ← Browse Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-4">
              {products.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2);
                const variant = product.node.variants.edges[0]?.node;

                return (
                  <div key={product.node.id} className="group">
                    <Link to={`/product/${product.node.handle}`} className="block no-underline">
                      <div className="aspect-square bg-cream overflow-hidden mb-3 relative">
                        <WishlistButton
                          product={{
                            productId: product.node.id,
                            handle: product.node.handle,
                            title: product.node.title,
                            image: image?.url || null,
                            price: product.node.priceRange.minVariantPrice.amount,
                          }}
                        />
                        {image ? (
                          <OptimizedImage
                            src={image.url}
                            alt={image.altText || product.node.title}
                            preset="card"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-gold/30 rounded-full" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-light text-warm-black tracking-wide mb-1 group-hover:text-gold transition-colors">
                        {product.node.title}
                      </h3>
                      <div className="text-sm text-warm-black font-medium">${price}</div>
                    </Link>
                    {variant?.availableForSale && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isCartLoading}
                        className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-[10px] tracking-[0.15em] uppercase border border-gold/30 bg-transparent text-warm-black hover:bg-dark-green hover:text-gold-light hover:border-dark-green transition-all cursor-pointer font-sans"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Collection;
