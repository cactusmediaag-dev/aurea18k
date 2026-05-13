export type BundleType = 'duo' | 'stack' | 'full';

export interface BundleConfig {
  type: BundleType;
  name: string;
  itemCount: number;
  discountPct: number;
  discountCode: string;
  tagline: string;
  cta: string;
}

export const BUNDLE_CONFIGS: Record<BundleType, BundleConfig> = {
  duo: {
    type: 'duo',
    name: 'The Duo',
    itemCount: 2,
    discountPct: 10,
    discountCode: 'BUNDLEDUO10',
    tagline: 'Pick any 2 pieces and save 10%',
    cta: 'Shop The Duo',
  },
  stack: {
    type: 'stack',
    name: 'The Stack',
    itemCount: 3,
    discountPct: 15,
    discountCode: 'BUNDLESTACK15',
    tagline: 'Pick 3 pieces and save 15%',
    cta: 'Shop The Stack',
  },
  full: {
    type: 'full',
    name: 'The Full Set',
    itemCount: 4,
    discountPct: 20,
    discountCode: 'BUNDLEFULL20',
    tagline: 'Pick 4 pieces and save 20%',
    cta: 'Shop The Full Set',
  },
};

export function getBundleConfig(type: string | undefined): BundleConfig | null {
  if (!type) return null;
  return BUNDLE_CONFIGS[type as BundleType] ?? null;
}

export function getNextTier(current: BundleType): BundleConfig | null {
  if (current === 'duo') return BUNDLE_CONFIGS.stack;
  if (current === 'stack') return BUNDLE_CONFIGS.full;
  return null;
}
