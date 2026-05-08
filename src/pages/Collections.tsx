import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import catWomens from '@/assets/cat-womens-collection.jpg';
import catMens from '@/assets/cat-mens-collection.jpg';
import catKids from '@/assets/cat-kids-collection.jpg';
import catBestSellers from '@/assets/cat-best-sellers.jpg';
import catNewArrivals from '@/assets/cat-new-arrivals.jpg';
import catBundlesSets from '@/assets/cat-bundles-sets.jpg';
import catGiftIdeas from '@/assets/cat-gift-ideas.jpg';
import catShopAll from '@/assets/cat-shop-all.jpg';

const categories = [
  { name: "Women's Collection", description: 'Earrings, necklaces, bracelets & chokers', image: catWomens, slug: 'womens' },
  { name: "Men's Collection", description: 'Chains, bracelets & stud earrings', image: catMens, slug: 'mens' },
  { name: 'Kids Collection', description: 'Hypoallergenic pieces for little ones', image: catKids, slug: 'kids' },
  { name: 'Best Sellers', description: 'Our most loved pieces', image: catBestSellers, slug: 'best-sellers' },
  { name: 'New Arrivals', description: 'Fresh drops & latest designs', image: catNewArrivals, slug: 'new-arrivals' },
  { name: 'Bundles & Sets', description: 'Save more when you bundle', image: catBundlesSets, slug: 'bundles-sets' },
  { name: 'Gift Ideas', description: 'Perfect presents for every occasion', image: catGiftIdeas, slug: 'gift-ideas' },
  { name: 'Shop All', description: 'Browse our entire collection', image: catShopAll, slug: 'all' },
];

const Collections = () => (
  <PageLayout>
    <div className="bg-cream-light min-h-[60vh]">
      <div className="text-center py-14 border-b border-gold/15">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium mb-2">Aurea Jewels</div>
        <h1 className="font-serif text-4xl font-light text-dark-green tracking-wide">Shop by Category</h1>
      </div>

      <div className="max-w-7xl mx-auto px-12 py-14 max-sm:px-5">
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/collections/${cat.slug}`}
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group block no-underline bg-cream"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.14) 55%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-6 py-7">
                <div className="font-serif text-[22px] font-light text-cream-light tracking-[0.05em] mb-1">{cat.name}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-gold-light font-normal">{cat.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

export default Collections;
