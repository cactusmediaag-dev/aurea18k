import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useBundleEligibleProducts() {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['bundle-eligible-products'],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, {
        first: 100,
        query: "tag:'bundle-eligible'",
      });
      return data?.data?.products?.edges || [];
    },
  });
}
