import { describe, it, expect } from 'vitest';
import { getVariantSalePricing } from '@/lib/pricing';

const v = (price: string, compareAt?: string | null) => ({
  price: { amount: price },
  compareAtPrice: compareAt === undefined ? undefined : compareAt === null ? null : { amount: compareAt },
});

describe('getVariantSalePricing', () => {
  it('marks on sale when compare-at is higher than price', () => {
    const s = getVariantSalePricing(v('35.00', '39.00'));
    expect(s.onSale).toBe(true);
    expect(s.price).toBe(35);
    expect(s.compareAt).toBe(39);
    expect(s.pctOff).toBe(10);
  });

  it('is not on sale without compare-at', () => {
    const s = getVariantSalePricing(v('35.00'));
    expect(s.onSale).toBe(false);
    expect(s.compareAt).toBeNull();
    expect(s.pctOff).toBeNull();
  });

  it('is not on sale when compare-at is null', () => {
    expect(getVariantSalePricing(v('35.00', null)).onSale).toBe(false);
  });

  it('never shows an inverted or zero discount', () => {
    expect(getVariantSalePricing(v('39.00', '35.00')).onSale).toBe(false);
    expect(getVariantSalePricing(v('39.00', '39.00')).onSale).toBe(false);
  });

  it('falls back to the product min price when variant is missing', () => {
    const s = getVariantSalePricing(undefined, '29.90');
    expect(s.price).toBe(29.9);
    expect(s.onSale).toBe(false);
  });

  it('rounds the percentage sensibly', () => {
    expect(getVariantSalePricing(v('50.00', '64.90')).pctOff).toBe(23);
  });
});
