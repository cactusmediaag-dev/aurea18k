// Shopify CDN image optimization helpers.
// Shopify-hosted images accept `width`, `height`, `crop` query params.
// Reference: https://shopify.dev/docs/api/storefront/latest/objects/Image

const isShopifyCdn = (url: string) =>
  /cdn\.shopify\.com|myshopify\.com/.test(url);

export const shopifyImage = (url: string, width: number): string => {
  if (!url || !isShopifyCdn(url)) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('width', String(width));
    return u.toString();
  } catch {
    return url;
  }
};

export const shopifySrcSet = (url: string, widths: number[]): string => {
  if (!url || !isShopifyCdn(url)) return '';
  return widths
    .map(w => `${shopifyImage(url, w)} ${w}w`)
    .join(', ');
};

// Common preset sizes
export const PRESETS = {
  thumb: [80, 160, 240],
  card: [320, 480, 640, 960],
  hero: [800, 1200, 1600, 2000],
  detail: [600, 900, 1200, 1600],
};
