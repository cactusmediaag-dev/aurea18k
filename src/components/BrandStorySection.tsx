import { Gem, ShieldCheck, MapPin } from 'lucide-react';
import brandStoryImg from '@/assets/brand-story.jpg';

const badges = [
  { icon: Gem, line1: '18K Gold', line2: 'Plating' },
  { icon: ShieldCheck, line1: 'Hypoallergenic', line2: 'Steel' },
  { icon: MapPin, line1: 'Made in Brazil', line2: 'With Pride' },
];

const BrandStorySection = () => (
  <div id="story" className="bg-dark-green py-28 px-12 grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-16">
    <div>
      <div className="aurea-section-label">Crafted to be Cherished</div>
      <h2 className="aurea-section-title" style={{ color: 'hsl(var(--cream-light))' }}>
        The Beauty Behind<br /><em>Every Detail</em>
      </h2>
      <div className="mt-7 text-cream-light/70 text-[15px] leading-[1.85] font-light">
        <p>Born in Brazil. Made for the world. Aurea was created with one belief: that beautiful, high-quality jewelry shouldn't be a privilege.</p>
        <p className="mt-4">Every piece is crafted with 18K gold plating on hypoallergenic stainless steel — finished, polished and inspected by hand so you can wear it every day without irritation or compromise.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-8">
        {badges.map(({ icon: Icon, line1, line2 }) => (
          <div key={line1} className="flex flex-col items-center text-center">
            <Icon size={20} strokeWidth={1.5} className="text-gold" />
            <div className="mt-2 font-sans text-[11px] tracking-[0.15em] uppercase text-cream-light/80 leading-[1.5]">
              {line1}<br />{line2}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a href="/about" className="btn-aurea-primary">Meet Aurea Jewels</a>
      </div>
    </div>
    <div className="flex items-center justify-center max-lg:hidden">
      <div className="relative w-full max-w-[460px]">
        <div className="absolute -top-4 -left-4 w-full h-full border border-gold/25 pointer-events-none" />
        <img
          src={brandStoryImg}
          alt="Aurea Jewels — crafted in Brazil"
          className="relative w-full aspect-[4/5] max-h-[560px] object-cover"
        />
      </div>
    </div>
  </div>
);

export default BrandStorySection;
