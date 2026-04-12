import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useProducts(first = 20) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-products', first],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first });
      return data?.data?.products?.edges || [];
    },
  });
}
