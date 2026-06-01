// Generates public/sitemap.xml at predev/prebuild.
// Pulls live product + collection handles from Shopify Storefront API.
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://aurea18k.com';
const SHOP_DOMAIN = 'hd5ps3-wc.myshopify.com';
const STOREFRONT_TOKEN = '9489803f917460e70c1b7208082219f4';
const API_VERSION = '2024-10';

interface Entry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  lastmod?: string;
}

const staticRoutes: Entry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/collections', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/about-aurea-jewels', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.6' },
  { path: '/shipping-returns', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookie-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/accessibility', changefreq: 'yearly', priority: '0.3' },
];

const knownCollections = [
  'all', 'best-sellers', 'new-arrivals', 'bundles-sets', 'gift-ideas',
  'womens', 'mens', 'kids',
  'womens-rings', 'womens-earrings', 'womens-necklaces', 'womens-bracelets', 'womens-chokers',
  'everyday-essentials', 'statement-pieces', 'minimal-collection', 'layering-pieces',
  'mens-rings', 'mens-chains', 'mens-bracelets', 'mens-stud-earrings', 'mens-scapular-necklaces',
  'minimal-men', 'classic-collection',
  'kids-earrings', 'kids-necklaces', 'kids-bracelets', 'kids-chokers', 'hypoallergenic-kids',
];

const bundleTypes = ['duo', 'stack', 'full'];

async function fetchProductHandles(): Promise<string[]> {
  const handles: string[] = [];
  let cursor: string | null = null;
  try {
    for (let i = 0; i < 10; i++) {
      const query = `
        query($cursor: String) {
          products(first: 250, after: $cursor) {
            edges { cursor node { handle updatedAt } }
            pageInfo { hasNextPage }
          }
        }`;
      const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables: { cursor } }),
      });
      const json: any = await res.json();
      const edges = json?.data?.products?.edges || [];
      for (const e of edges) handles.push(e.node.handle);
      if (!json?.data?.products?.pageInfo?.hasNextPage) break;
      cursor = edges[edges.length - 1]?.cursor || null;
    }
  } catch (err) {
    console.warn('[sitemap] Failed to fetch products from Shopify, continuing with static routes:', err);
  }
  return handles;
}

function xmlEntry(e: Entry) {
  return [
    '  <url>',
    `    <loc>${BASE_URL}${e.path}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    '  </url>',
  ].filter(Boolean).join('\n');
}

(async () => {
  const productHandles = await fetchProductHandles();
  const entries: Entry[] = [
    ...staticRoutes,
    ...knownCollections.map<Entry>(h => ({ path: `/collections/${h}`, changefreq: 'weekly', priority: '0.8' })),
    ...bundleTypes.map<Entry>(t => ({ path: `/bundle/${t}`, changefreq: 'weekly', priority: '0.7' })),
    ...productHandles.map<Entry>(h => ({ path: `/product/${h}`, changefreq: 'weekly', priority: '0.7' })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(xmlEntry),
    '</urlset>',
  ].join('\n');

  writeFileSync(resolve('public/sitemap.xml'), xml);
  console.log(`[sitemap] Wrote ${entries.length} entries to public/sitemap.xml`);
})();
