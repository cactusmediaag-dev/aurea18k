import { Link } from 'react-router-dom';
import { BUNDLE_CONFIGS } from '@/lib/bundles';
import imgEarring from '@/assets/bundle-earring.jpg';
import imgNecklace from '@/assets/bundle-necklace.jpg';
import imgBracelet from '@/assets/bundle-bracelet.jpg';
import imgRing from '@/assets/bundle-ring.jpg';

const cards = [
  {
    cfg: BUNDLE_CONFIGS.duo,
    items: 'Pick any 2 pieces\nof your choice',
    images: [imgEarring, imgNecklace],
    featured: false,
  },
  {
    cfg: BUNDLE_CONFIGS.stack,
    items: 'Pick any 3 pieces\nof your choice',
    images: [imgEarring, imgNecklace, imgBracelet],
    featured: true,
    badge: 'Most Popular',
  },
  {
    cfg: BUNDLE_CONFIGS.full,
    items: 'Pick any 4 pieces\nof your choice',
    images: [imgEarring, imgNecklace, imgBracelet, imgRing],
    featured: false,
  },
];

const BundleSection = () => (
  <section className="aurea-section bg-cream-light">
    <div className="text-center">
      <div className="aurea-section-label">Save More, Shine More</div>
      <h2 className="aurea-section-title">Bundle <em>&amp; Save</em></h2>
      <p className="text-warm-gray text-sm mt-3 font-light">Build your own set and unlock exclusive savings.</p>
    </div>

    <div className="grid grid-cols-3 gap-6 mt-14 max-lg:grid-cols-1">
      {cards.map(({ cfg, items, images, featured, badge }) => (
        <Link
          key={cfg.type}
          to={`/bundle/${cfg.type}`}
          className={`block border p-9 px-7 relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold no-underline ${
            featured
              ? 'border-gold bg-gradient-to-br from-gold-pale/40 to-cream-light'
              : 'border-gold/25 bg-cream-light'
          }`}
        >
          {badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark-green text-gold-light text-[9px] tracking-[0.2em] uppercase font-medium px-5 py-1.5 whitespace-nowrap">
              {badge}
            </div>
          )}
          <div className="flex gap-2 mb-5">
            {images.map((src, i) => (
              <div key={i} className="flex-1 aspect-square bg-cream border border-gold/25 overflow-hidden">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="font-serif text-2xl font-normal text-dark-green mb-2">{cfg.name}</div>
          <div className="text-xs text-warm-gray tracking-[0.08em] mb-5 leading-[1.8] whitespace-pre-line">{items}</div>
          <div className="flex items-baseline gap-3 mb-5">
            <div className="font-serif text-[34px] font-normal text-warm-black">{cfg.itemCount} pieces</div>
            <div className="bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">
              Save {cfg.discountPct}%
            </div>
          </div>
          <span className="btn-aurea-dark block text-center no-underline">{cfg.cta}</span>
        </Link>
      ))}
    </div>
  </section>
);

export default BundleSection;
