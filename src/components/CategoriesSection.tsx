import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest } from '@/lib/shopify';
import catWomens from '@/assets/cat-womens.jpg';
import catMens from '@/assets/cat-mens.jpg';
import catKids from '@/assets/cat-kids.jpg';
import catBestsellers from '@/assets/cat-bestsellers.jpg';

const categories = [
  {
    name: "Women's Collection",
    image: catWomens,
    slug: 'womens',
    query:
      'tag:womens-earrings OR tag:womens-necklaces OR tag:womens-bracelets OR tag:womens-chokers OR tag:everyday-essentials OR tag:statement-pieces OR tag:minimal-collection OR tag:layering-pieces',
  },
  {
    name: "Men's Collection",
    image: catMens,
    slug: 'mens',
    query:
      'tag:mens-chains OR tag:mens-bracelets OR tag:mens-stud-earrings OR tag:mens-scapular-necklaces OR tag:minimal-men OR tag:classic-collection',
  },
  {
    name: 'Kids Collection',
    image: catKids,
    slug: 'kids',
    query:
      'tag:kids-earrings OR tag:kids-necklaces OR tag:kids-bracelets OR tag:kids-chokers OR tag:hypoallergenic-kids',
  },
  {
    name: 'Best Sellers',
    image: catBestsellers,
    slug: 'best-sellers',
    query: 'tag:best-sellers',
  },
];

const COUNT_QUERY = `
  query CountProducts($query: String) {
    products(first: 250, query: $query) {
      edges { node { id } }
    }
  }
`;

const useCategoryCounts = () =>
  useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      const counts: Record<string, number> = {};
      await Promise.all(
        categories.map(async (cat) => {
          const data = await storefrontApiRequest(COUNT_QUERY, { query: cat.query });
          counts[cat.slug] = data?.data?.products?.edges?.length ?? 0;
        }),
      );
      return counts;
    },
    staleTime: 5 * 60 * 1000,
  });

const CategoriesSection = () => {
  const { data: counts } = useCategoryCounts();

  return (
    <section id="categories" className="aurea-section bg-cream-light">
      <div className="aurea-section-label">Explore</div>
      <h2 className="aurea-section-title">Shop by <em>Category</em></h2>
      <div className="grid grid-cols-4 gap-5 mt-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {categories.map((cat) => {
          const count = counts?.[cat.slug];
          const label =
            count === undefined
              ? '\u00A0'
              : `${count} ${count === 1 ? 'piece' : 'pieces'}`;
          return (
            <Link
              key={cat.name}
              to={`/collections/${cat.slug}`}
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group block no-underline bg-cream"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-7"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)',
                }}
              >
                <div className="font-serif text-[22px] font-light text-cream-light tracking-[0.05em] mb-1">
                  {cat.name}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-gold-light font-normal">
                  {label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
