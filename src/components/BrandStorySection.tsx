import { Gem, ShieldCheck, MapPin } from 'lucide-react';
import { useT } from '@/i18n';
import brandStoryImg from '@/assets/brand-story.jpg';

const badgeIcons = [Gem, ShieldCheck, MapPin];

const BrandStorySection = () => {
  const t = useT();
  return (
  <div id="story" className="bg-dark-green py-28 px-12 grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-16">
    <div>
      <div className="aurea-section-label">{t.brandStory.label}</div>
      <h2 className="aurea-section-title" style={{ color: 'hsl(var(--cream-light))' }}>
        {t.brandStory.title.pre}<br /><em>{t.brandStory.title.em}</em>
      </h2>
      <div className="mt-7 text-cream-light/70 text-[15px] leading-[1.85] font-light">
        <p>{t.brandStory.p1}</p>
        <p className="mt-4">{t.brandStory.p2}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-8">
        {t.brandStory.badges.map(([line1, line2], i) => {
          const Icon = badgeIcons[i];
          return (
            <div key={line1} className="flex flex-col items-center text-center">
              <Icon size={20} strokeWidth={1.5} className="text-gold" />
              <div className="mt-2 font-sans text-[11px] tracking-[0.15em] uppercase text-cream-light/80 leading-[1.5]">
                {line1}<br />{line2}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <a href="/about" className="btn-aurea-primary">{t.brandStory.cta}</a>
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
};

export default BrandStorySection;
