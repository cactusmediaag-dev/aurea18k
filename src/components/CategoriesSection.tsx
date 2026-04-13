import { Link } from 'react-router-dom';

const categories = [
  { name: "Women's Collection", count: '48 pieces', gradient: 'linear-gradient(145deg, #C8B89A 0%, #A8936A 100%)', slug: 'womens' },
  { name: "Men's Collection", count: '18 pieces', gradient: 'linear-gradient(145deg, #7A8A6A 0%, #4A5E38 100%)', slug: 'mens' },
  { name: "Kids Collection", count: '24 pieces', gradient: 'linear-gradient(145deg, #B8A888 0%, #8A7850 100%)', slug: 'kids' },
  { name: 'Best Sellers', count: '32 pieces', gradient: 'linear-gradient(145deg, #9EB08C 0%, #6A8A5A 100%)', slug: 'best-sellers' },
];

const CategoriesSection = () => (
  <section id="categories" className="aurea-section bg-cream-light">
    <div className="aurea-section-label">Explore</div>
    <h2 className="aurea-section-title">Shop by <em>Category</em></h2>
    <div className="grid grid-cols-4 gap-5 mt-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {categories.map((cat) => (
        <Link key={cat.name} to={`/collections/${cat.slug}`} className="relative aspect-[3/4] overflow-hidden cursor-pointer group block no-underline" style={{ background: 'hsl(var(--cream))' }}>
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: cat.gradient }} />
          <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-white/40 opacity-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/25" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-6 py-7" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
            <div className="font-serif text-[22px] font-light text-cream-light tracking-[0.05em] mb-1">{cat.name}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold-light font-normal">{cat.count}</div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
