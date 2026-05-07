import { Link } from 'react-router-dom';
import catWomens from '@/assets/cat-womens.jpg';
import catMens from '@/assets/cat-mens.jpg';
import catKids from '@/assets/cat-kids.jpg';
import catBestsellers from '@/assets/cat-bestsellers.jpg';

const categories = [
  { name: "Women's Collection", count: '48 pieces', image: catWomens, slug: 'womens' },
  { name: "Men's Collection", count: '18 pieces', image: catMens, slug: 'mens' },
  { name: "Kids Collection", count: '24 pieces', image: catKids, slug: 'kids' },
  { name: 'Best Sellers', count: '32 pieces', image: catBestsellers, slug: 'best-sellers' },
];

const CategoriesSection = () => (
  <section id="categories" className="aurea-section bg-cream-light">
    <div className="aurea-section-label">Explore</div>
    <h2 className="aurea-section-title">Shop by <em>Category</em></h2>
    <div className="grid grid-cols-4 gap-5 mt-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {categories.map((cat) => (
        <Link key={cat.name} to={`/collections/${cat.slug}`} className="relative aspect-[3/4] overflow-hidden cursor-pointer group block no-underline bg-cream">
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-7" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)' }}>
            <div className="font-serif text-[22px] font-light text-cream-light tracking-[0.05em] mb-1">{cat.name}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold-light font-normal">{cat.count}</div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
