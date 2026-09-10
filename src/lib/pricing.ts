import type { ShopifyProduct } from '@/lib/shopify';
import { SALE } from '@/lib/promo';

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

interface PricingOptions {
  // Override for tests; defaults to the active sitewide SALE percentage.
  sitewidePct?: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

// Applies the sitewide sale to a base amount (used for cart line display too).
export function applySitewide(amount: number, opts?: PricingOptions): number {
  const pct = opts?.sitewidePct ?? (SALE.active ? SALE.pct : 0);
  return pct > 0 ? round2(amount * (1 - pct / 100)) : round2(amount);
}

// Display pricing rules, in order:
// 1. The sitewide sale (when active) discounts the selling price for every
//    product — it must be mirrored by a Shopify AUTOMATIC discount of the same
//    percentage so checkout charges exactly what is displayed.
// 2. A Shopify compare-at price higher than the selling price becomes the
//    struck-through reference; otherwise the original selling price is struck.
// 3. Never render a fake, zero or inverted discount.
export function getVariantSalePricing(
  variant: VariantLike | undefined,
  fallbackAmount?: string,
  opts?: PricingOptions,
): SalePricing {
  const base = parseFloat(variant?.price.amount ?? fallbackAmount ?? '0');
  const compareRaw = variant?.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : null;
  const hasCompare = compareRaw !== null && Number.isFinite(compareRaw) && compareRaw > base;

  const price = applySitewide(base, opts);
  const struck = hasCompare ? (compareRaw as number) : base;
  const onSale = struck > price;

  return {
    price,
    compareAt: onSale ? struck : null,
    onSale,
    pctOff: onSale ? Math.round((1 - price / struck) * 100) : null,
  };
}

export function getSalePricing(product: ShopifyProduct, opts?: PricingOptions): SalePricing {
  return getVariantSalePricing(
    product.node.variants.edges[0]?.node,
    product.node.priceRange.minVariantPrice.amount,
    opts,
  );
}
