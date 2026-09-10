import { describe, it, expect } from 'vitest';
import { getVariantSalePricing, applySitewide } from '@/lib/pricing';

const v = (price: string, compareAt?: string | null) => ({
  price: { amount: price },
  compareAtPrice: compareAt === undefined ? undefined : compareAt === null ? null : { amount: compareAt },
});

// sitewidePct: 0 → behavior without any sitewide sale
describe('getVariantSalePricing (no sitewide sale)', () => {
  it('marks on sale when compare-at is higher than price', () => {
    const s = getVariantSalePricing(v('35.00', '39.00'), undefined, { sitewidePct: 0 });
    expect(s.onSale).toBe(true);
    expect(s.price).toBe(35);
    expect(s.compareAt).toBe(39);
    expect(s.pctOff).toBe(10);
  });

  it('is not on sale without compare-at', () => {
    const s = getVariantSalePricing(v('35.00'), undefined, { sitewidePct: 0 });
    expect(s.onSale).toBe(false);
    expect(s.compareAt).toBeNull();
    expect(s.pctOff).toBeNull();
  });

  it('never shows an inverted or zero discount', () => {
    expect(getVariantSalePricing(v('39.00', '35.00'), undefined, { sitewidePct: 0 }).onSale).toBe(false);
    expect(getVariantSalePricing(v('39.00', '39.00'), undefined, { sitewidePct: 0 }).onSale).toBe(false);
  });

  it('falls back to the product min price when variant is missing', () => {
    const s = getVariantSalePricing(undefined, '29.90', { sitewidePct: 0 });
    expect(s.price).toBe(29.9);
    expect(s.onSale).toBe(false);
  });
});

describe('getVariantSalePricing (sitewide 15%)', () => {
  it('discounts every product and strikes the original price', () => {
    const s = getVariantSalePricing(v('40.00'), undefined, { sitewidePct: 15 });
    expect(s.onSale).toBe(true);
    expect(s.price).toBe(34);
    expect(s.compareAt).toBe(40);
    expect(s.pctOff).toBe(15);
  });

  it('rounds to cents', () => {
    const s = getVariantSalePricing(v('29.90'), undefined, { sitewidePct: 15 });
    expect(s.price).toBe(25.42); // 29.90 * 0.85 = 25.415 → 25.42
  });

  it('keeps compare-at as the struck reference when present', () => {
    const s = getVariantSalePricing(v('35.00', '49.00'), undefined, { sitewidePct: 15 });
    expect(s.price).toBe(29.75);
    expect(s.compareAt).toBe(49);
    expect(s.pctOff).toBe(39); // 1 - 29.75/49
  });
});

describe('applySitewide', () => {
  it('applies the percentage', () => {
    expect(applySitewide(100, { sitewidePct: 15 })).toBe(85);
  });
  it('is identity at 0%', () => {
    expect(applySitewide(19.9, { sitewidePct: 0 })).toBe(19.9);
  });
});
