import { ShopifyProduct } from '@/lib/shopify';

const IDEAL_MIN = 25;
const IDEAL_MAX = 40;

export function getProductPrice(p: ShopifyProduct): number {
  return parseFloat(p.node.priceRange.minVariantPrice.amount);
}

export function getProductCategory(p: ShopifyProduct): 'rings' | 'earrings' | 'necklaces' | 'bracelets' | 'other' {
  const type = (p.node.productType || '').toLowerCase();
  const title = p.node.title.toLowerCase();
  const haystack = `${type} ${title}`;
  if (/ring/.test(haystack)) return 'rings';
  if (/earring|stud/.test(haystack)) return 'earrings';
  if (/necklace|chain|choker|scapular/.test(haystack)) return 'necklaces';
  if (/bracelet/.test(haystack)) return 'bracelets';
  return 'other';
}

const COMPLEMENTARY: Record<string, string> = {
  rings: 'rings',       // stackable rings
  earrings: 'necklaces',
  necklaces: 'earrings',
  bracelets: 'rings',
  other: 'rings',
};

function getTagsByPrefix(p: ShopifyProduct, prefix: string): string[] {
  return (p.node.tags || []).filter(t => t.toLowerCase().startsWith(prefix));
}

function shareTag(a: ShopifyProduct, b: ShopifyProduct, prefix: string): boolean {
  const aTags = getTagsByPrefix(a, prefix).map(t => t.toLowerCase());
  if (aTags.length === 0) return false;
  const bTags = (b.node.tags || []).map(t => t.toLowerCase());
  return aTags.some(t => bTags.includes(t));
}

function inIdealPrice(p: ShopifyProduct): boolean {
  const price = getProductPrice(p);
  return price >= IDEAL_MIN && price <= IDEAL_MAX;
}

function dedupe(items: ShopifyProduct[], excludeIds: Set<string>): ShopifyProduct[] {
  const seen = new Set<string>(excludeIds);
  return items.filter(p => {
    if (seen.has(p.node.id)) return false;
    seen.add(p.node.id);
    return true;
  });
}

/**
 * Tag-priority recommendation:
 * 1. Same `match-*` tag (exact pairing)
 * 2. Same `set-*` tag (style pairing)
 * 3. Complementary category + ideal price range
 * 4. Same category fallback
 */
export function getRecommendations(
  anchor: ShopifyProduct | ShopifyProduct[],
  pool: ShopifyProduct[],
  count: number,
): ShopifyProduct[] {
  const anchors = Array.isArray(anchor) ? anchor : [anchor];
  if (anchors.length === 0 || pool.length === 0) return [];

  const excludeIds = new Set(anchors.map(a => a.node.id));
  const candidates = pool.filter(p => !excludeIds.has(p.node.id));

  const result: ShopifyProduct[] = [];

  // Tier 1: match-* tag
  for (const a of anchors) {
    const matches = candidates.filter(c => shareTag(a, c, 'match-'));
    for (const m of matches) {
      if (result.length >= count) break;
      if (!result.find(r => r.node.id === m.node.id)) result.push(m);
    }
    if (result.length >= count) break;
  }
  if (result.length >= count) return result.slice(0, count);

  // Tier 2: set-* tag
  for (const a of anchors) {
    const matches = candidates.filter(c => shareTag(a, c, 'set-'));
    for (const m of matches) {
      if (result.length >= count) break;
      if (!result.find(r => r.node.id === m.node.id)) result.push(m);
    }
    if (result.length >= count) break;
  }
  if (result.length >= count) return result.slice(0, count);

  // Tier 3: complementary category + ideal price
  const anchorCats = new Set(anchors.map(getProductCategory));
  const complementaryCats = new Set(
    Array.from(anchorCats).map(c => COMPLEMENTARY[c] || 'rings'),
  );

  const tier3 = candidates
    .filter(c => complementaryCats.has(getProductCategory(c)) && inIdealPrice(c))
    .filter(c => !result.find(r => r.node.id === c.node.id));
  for (const m of tier3) {
    if (result.length >= count) break;
    result.push(m);
  }
  if (result.length >= count) return result.slice(0, count);

  // Tier 4: any complementary category
  const tier4 = candidates
    .filter(c => complementaryCats.has(getProductCategory(c)))
    .filter(c => !result.find(r => r.node.id === c.node.id));
  for (const m of tier4) {
    if (result.length >= count) break;
    result.push(m);
  }
  if (result.length >= count) return result.slice(0, count);

  // Tier 5: anything in ideal price
  const tier5 = candidates
    .filter(c => inIdealPrice(c))
    .filter(c => !result.find(r => r.node.id === c.node.id));
  for (const m of tier5) {
    if (result.length >= count) break;
    result.push(m);
  }

  // Tier 6: anything left
  const tier6 = dedupe(candidates, new Set(result.map(r => r.node.id).concat([...excludeIds])));
  for (const m of tier6) {
    if (result.length >= count) break;
    result.push(m);
  }

  return result.slice(0, count);
}

/**
 * Order bump: cheapest qualifying complementary product.
 * Priority match-* > set-* > complementary category. Cheapest first.
 */
export function getOrderBump(
  anchors: ShopifyProduct[],
  pool: ShopifyProduct[],
): ShopifyProduct | null {
  const recs = getRecommendations(anchors, pool, 8);
  if (recs.length === 0) return null;
  const sorted = [...recs].sort((a, b) => getProductPrice(a) - getProductPrice(b));
  return sorted[0];
}

export function getFreeShippingMessage(totalPrice: number, threshold = 120): {
  message: string;
  remaining: number;
  unlocked: boolean;
} {
  const remaining = Math.max(0, threshold - totalPrice);
  if (totalPrice >= threshold) {
    return { message: "You've unlocked FREE shipping 🎁", remaining: 0, unlocked: true };
  }
  if (totalPrice < 80) {
    return {
      message: `Start building your set — unlock <strong>FREE shipping</strong> at <strong>$${threshold}</strong> 🎁`,
      remaining,
      unlocked: false,
    };
  }
  if (totalPrice < 110) {
    return {
      message: `You're getting close — add <strong>$${remaining.toFixed(2)}</strong> more to unlock <strong>FREE shipping</strong> 🎁`,
      remaining,
      unlocked: false,
    };
  }
  return {
    message: `Almost there — add <strong>$${remaining.toFixed(2)}</strong> more to unlock <strong>FREE shipping</strong> 🎁`,
    remaining,
    unlocked: false,
  };
}

export function getCartSuggestionConfig(totalPrice: number): { count: number; label: string } {
  if (totalPrice < 80) return { count: 3, label: 'Complete your set' };
  if (totalPrice < 110) return { count: 2, label: "You're almost there" };
  return { count: 1, label: 'Finish your order' };
}
