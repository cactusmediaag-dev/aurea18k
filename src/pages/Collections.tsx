import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const categories = [
  { name: "Women's Collection", description: 'Earrings, necklaces, bracelets & chokers', gradient: 'linear-gradient(145deg, #C8B89A 0%, #A8936A 100%)', slug: 'womens' },
  { name: "Men's Collection", description: 'Chains, bracelets & stud earrings', gradient: 'linear-gradient(145deg, #7A8A6A 0%, #4A5E38 100%)', slug: 'mens' },
  { name: "Kids Collection", description: 'Hypoallergenic pieces for little ones', gradient: 'linear-gradient(145deg, #B8A888 0%, #8A7850 100%)', slug: 'kids' },
  { name: 'Best Sellers', description: 'Our most loved pieces', gradient: 'linear-gradient(145deg, #9EB08C 0%, #6A8A5A 100%)', slug: 'best-sellers' },
  { name: 'New Arrivals', description: 'Fresh drops & latest designs', gradient: 'linear-gradient(145deg, #A89878 0%, #7A6A4A 100%)', slug: 'new-arrivals' },
  { name: 'Bundles & Sets', description: 'Save more when you bundle', gradient: 'linear-gradient(145deg, #8A9A7A 0%, #5A7A4A 100%)', slug: 'bundles-sets' },
  { name: 'Gift Ideas', description: 'Perfect presents for every occasion', gradient: 'linear-gradient(145deg, #C0A878 0%, #9A8058 100%)', slug: 'gift-ideas' },
  { name: 'Shop All', description: 'Browse our entire collection', gradient: 'linear-gradient(145deg, #8A8A7A 0%, #5A5A4A 100%)', slug: 'all' },
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
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group block no-underline"
              style={{ background: 'hsl(var(--cream))' }}
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: cat.gradient }} />
              <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-white/40 opacity-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/25" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-7" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
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
