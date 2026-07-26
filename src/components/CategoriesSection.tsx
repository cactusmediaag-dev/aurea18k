import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest } from '@/lib/shopify';
import OptimizedImage from '@/components/OptimizedImage';
import catWomens from '@/assets/cat-womens.jpg';
import catMens from '@/assets/cat-mens.jpg';
import catKids from '@/assets/cat-kids.jpg';
import catBestsellers from '@/assets/cat-bestsellers.jpg';
import fbRing from '@/assets/bundle-ring.jpg';
import fbNecklace from '@/assets/bundle-necklace.jpg';
import fbEarring from '@/assets/bundle-earring.jpg';
import fbBracelet from '@/assets/bundle-bracelet.jpg';

type Tile = { name: string; handle: string; fallback: string; extraHandle?: string };

const tiles: Tile[] = [
  { name: 'Rings', handle: 'rings', fallback: fbRing },
  { name: 'Necklaces', handle: 'necklaces', fallback: fbNecklace },
  { name: 'Earrings', handle: 'earrings', fallback: fbEarring },
  { name: 'Bracelets', handle: 'bracelets', fallback: fbBracelet },
  { name: 'Chains', handle: 'chains', fallback: fbNecklace, extraHandle: 'mens-chains' },
];

const TILE_QUERY = `
  query TileImage($handle: String!) {
    collectionByHandle(handle: $handle) {
      image { url }
      products(first: 1) {
        edges { node { featuredImage { url } } }
      }
    }
  }
`;

async function resolveHandleImage(handle: string): Promise<string | null> {
  try {
    const data = await storefrontApiRequest(TILE_QUERY, { handle });
    const coll = data?.data?.collectionByHandle;
    if (!coll) return null;
    return coll.image?.url || coll.products?.edges?.[0]?.node?.featuredImage?.url || null;
  } catch {
    return null;
  }
}

const useCategoryTileImages = () =>
  useQuery({
    queryKey: ['category-tile-images-v2', tiles.map((t) => t.handle).join(',')],
    queryFn: async () => {
      const result: Record<string, string | null> = {};
      await Promise.all(
        tiles.map(async (t) => {
          let img = await resolveHandleImage(t.handle);
          if (!img && t.extraHandle) img = await resolveHandleImage(t.extraHandle);
          result[t.handle] = img;
        }),
      );
      return result;
    },
    staleTime: 10 * 60 * 1000,
  });

const banners = [
  {
    image: catWomens,
    titleLead: 'For',
    titleEm: 'Her',
    sub: 'Pieces that celebrate her every day.',
    href: '/collections/womens',
  },
  {
    image: catMens,
    titleLead: 'For',
    titleEm: 'Him',
    sub: 'Bold, refined, built to last.',
    href: '/collections/mens',
  },
  {
    image: catKids,
    titleLead: 'Little',
    titleEm: 'Treasures',
    sub: 'Gentle & hypoallergenic for little ones.',
    href: '/collections/kids',
  },
  {
    image: catBestsellers,
    titleLead: 'Most',
    titleEm: 'Loved',
    sub: "The pieces they can't stop wearing.",
    href: '/collections/best-sellers',
  },
];

const CategoriesSection = () => {
  const { data: tileImages } = useCategoryTileImages();

  return (
    <section id="categories" className="bg-cream-light py-16 px-12 max-md:px-5">
      <div className="max-w-[1400px] mx-auto">
        {/* BLOCK A — category tiles */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-5 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 lg:mx-0 lg:px-0 lg:overflow-visible">
          {tiles.map((tile) => {
            const remote = tileImages?.[tile.handle];
            return (
              <Link
                key={tile.handle}
                to={`/collections/${tile.handle}`}
                className="group block no-underline bg-cream border border-gold/15 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 shrink-0 w-[40vw] lg:w-auto snap-start"
              >
                <div className="aspect-square p-6 flex items-center justify-center overflow-hidden">
                  {remote ? (
                    <OptimizedImage
                      src={remote}
                      alt={tile.name}
                      preset="card"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={tile.fallback}
                      alt={tile.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="pb-5 flex flex-col items-center gap-2">
                  <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-warm-black">
                    {tile.name}
                  </span>
                  <span className="block w-5 h-px bg-gold" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* BLOCK B — editorial banners */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {banners.map((b) => (
            <Link
              key={b.href}
              to={b.href}
              className="group relative block no-underline overflow-hidden aspect-[4/3]"
            >
              <img
                src={b.image}
                alt={`${b.titleLead} ${b.titleEm}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-warm-black/60 via-warm-black/25 to-transparent" />
              <div className="absolute top-0 left-0 p-6">
                <h3 className="font-serif text-[26px] font-light text-cream-light leading-tight">
                  {b.titleLead}<br />
                  <em className="italic text-gold-light">{b.titleEm}</em>
                </h3>
                <p className="font-sans text-[12px] font-light text-cream-light/80 mt-2 max-w-[180px]">
                  {b.sub}
                </p>
              </div>
              <span className="absolute bottom-6 left-6 font-sans text-[11px] uppercase tracking-[0.2em] text-cream-light border-b border-cream-light group-hover:text-gold-light group-hover:border-gold-light transition-colors duration-300">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
