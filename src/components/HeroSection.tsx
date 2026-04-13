import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerDesktop from '@/assets/banner1-desktop.png';
import bannerMobile from '@/assets/banner1-mobile.png';

const slides = [
  {
    tag: 'New Collection · Spring 2026',
    title: <>Wear the<br /><em className="italic text-gold-light">Golden</em><br />Standard</>,
    subtitle: '18K Gold Plated · Hypoallergenic · Made to Last',
    image: { desktop: bannerDesktop, mobile: bannerMobile },
  },
  {
    tag: 'Best Sellers · 2026',
    title: <>Timeless<br /><em className="italic text-gold-light">Elegance</em><br />Redefined</>,
    subtitle: 'Hypoallergenic · Ships Worldwide · Free over $120',
    image: null,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden flex items-center justify-center" style={{ padding: 0 }}>
      {/* Background */}
      {slide.image ? (
        <>
          <img src={slide.image.desktop} alt="Aurea Jewels" className="absolute inset-0 w-full h-full object-cover hidden md:block" />
          <img src={slide.image.mobile} alt="Aurea Jewels" className="absolute inset-0 w-full h-full object-cover md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #1A2E1A 0%, #2A3E22 30%, #1C3320 60%, #0E1F10 100%)',
          }}>
            <div className="absolute inset-0 animate-pulse" style={{
              background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(196,151,58,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 75% 60%, rgba(196,151,58,0.08) 0%, transparent 70%)',
              animation: 'goldShimmer 8s ease-in-out infinite alternate',
            }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/10" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[680px] px-12 text-left mr-auto ml-[8%] max-md:ml-[5%] max-md:flex max-md:flex-col max-md:justify-end max-md:pb-28 max-md:h-full" style={{ animation: 'heroFadeIn 1.2s ease-out forwards' }}>
        <div className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold-light font-normal mb-6 border-l-2 border-gold pl-3.5">
          {slide.tag}
        </div>
        <h1 className="font-serif text-[clamp(52px,7vw,88px)] font-light leading-none text-cream-light tracking-[0.02em] mb-2">
          {slide.title}
        </h1>
        <p className="text-[13px] tracking-[0.12em] uppercase text-cream-light/65 mb-9 font-light">
          {slide.subtitle}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <Link to="/collections/all" className="btn-aurea-primary">Shop the Collection</Link>
          <Link to="/about" className="btn-aurea-ghost">Our Story</Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${idx === currentSlide ? 'bg-gold w-6' : 'bg-cream-light/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
