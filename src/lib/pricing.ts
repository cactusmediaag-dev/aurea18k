import type { ShopifyProduct } from '@/lib/shopify';

export interface SalePricing {
  price: number;
  compareAt: number | null;
  onSale: boolean;
  pctOff: number | null;
}

interface VariantLike {
  price: { amount: string };
  compareAtPrice?: { amount: string } | null;
}

// A variant is "on sale" only when Shopify's compare-at price is set and
// strictly higher than the selling price — anything else renders as a
// regular price (never a fake or inverted discount).
export function getVariantSalePricing(variant: VariantLike | undefined, fallbackAmount?: string): SalePricing {
  const price = parseFloat(variant?.price.amount ?? fallbackAmount ?? '0');
  const compareRaw = variant?.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : null;
  const onSale = compareRaw !== null && Number.isFinite(compareRaw) && compareRaw > price;
  return {
    price,
    compareAt: onSale ? compareRaw : null,
    onSale,
    pctOff: onSale ? Math.round((1 - price / (compareRaw as number)) * 100) : null,
  };
}

export function getSalePricing(product: ShopifyProduct): SalePricing {
  return getVariantSalePricing(
    product.node.variants.edges[0]?.node,
    product.node.priceRange.minVariantPrice.amount,
  );
}
