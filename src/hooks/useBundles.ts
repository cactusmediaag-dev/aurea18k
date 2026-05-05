import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

export type BundleType = 'duo' | 'stack' | 'full';

export const BUNDLE_TAGS: Record<BundleType, string> = {
  duo: 'bundle-duo',
  stack: 'bundle-stack',
  full: 'bundle-full',
};

export interface BundlesResult {
  duo: ShopifyProduct | null;
  stack: ShopifyProduct | null;
  full: ShopifyProduct | null;
}

function findByTag(products: ShopifyProduct[], tag: string): ShopifyProduct | null {
  const matches = products.filter(p =>
    (p.node.tags || []).some(t => t.toLowerCase() === tag),
  );
  if (matches.length === 0) return null;
  // Prioriza featured se houver
  const featured = matches.find(p =>
    (p.node.tags || []).some(t => t.toLowerCase() === 'bundle-featured'),
  );
  return featured || matches[0];
}

export function useBundles() {
  return useQuery<BundlesResult>({
    queryKey: ['shopify-bundles'],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, {
        first: 50,
        query: 'tag:bundle-duo OR tag:bundle-stack OR tag:bundle-full',
      });
      const products: ShopifyProduct[] = data?.data?.products?.edges || [];
      return {
        duo: findByTag(products, BUNDLE_TAGS.duo),
        stack: findByTag(products, BUNDLE_TAGS.stack),
        full: findByTag(products, BUNDLE_TAGS.full),
      };
    },
  });
}
