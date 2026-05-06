import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerDesktop from '@/assets/banner1-desktop.jpg';
import bannerMobile from '@/assets/banner1-mobile.jpg';
import banner2Desktop from '@/assets/banner2-desktop.jpg';
import banner2Mobile from '@/assets/banner2-mobile.jpg';

const slides = [
  {
    tag: 'New Collection · Spring 2026',
    title: <>Wear the<br /><em className="italic text-gold-light">Golden</em><br />Standard</>,
    subtitle: '18K Gold Plated · Hypoallergenic · Made to Last',
    image: { desktop: bannerDesktop, mobile: bannerMobile },
    align: 'left' as const,
  },
  {
    tag: 'Best Sellers · 2026',
    title: <>Timeless<br /><em className="italic text-gold-light">Elegance</em><br />Redefined</>,
    subtitle: 'Hypoallergenic · Ships Worldwide · Free over $120',
    image: { desktop: banner2Desktop, mobile: banner2Mobile },
    align: 'right' as const,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload all hero images on mount so transitions are instant
  useEffect(() => {
    slides.forEach((s) => {
      if (!s.image) return;
      const a = new Image();
      a.src = s.image.desktop;
      const b = new Image();
      b.src = s.image.mobile;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden flex items-center justify-center" style={{ padding: 0 }}>
      {/* Background layers — all stacked, fade between them */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: idx === currentSlide ? 1 : 0 }}
        >
          {slide.image && (
            <>
              <img
                src={slide.image.desktop}
                alt="Aurea Jewels"
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
              />
              <img
                src={slide.image.mobile}
                alt="Aurea Jewels"
                className="absolute inset-0 w-full h-full object-cover md:hidden"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
              />
              <div
                className={`absolute inset-0 ${
                  slide.align === 'right'
                    ? 'bg-gradient-to-l from-black/65 via-black/30 to-transparent'
                    : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
                }`}
              />
            </>
          )}
        </div>
      ))}

      {/* Content — one block per slide, fades with the image */}
      {slides.map((slide, idx) => {
        const isRight = slide.align === 'right';
        return (
          <div
            key={idx}
            className={`absolute inset-0 z-10 flex transition-opacity duration-700 ease-in-out ${
              isRight
                ? 'justify-end items-center max-md:items-end max-md:justify-end'
                : 'justify-start items-center max-md:items-end max-md:justify-start'
            }`}
            style={{ opacity: idx === currentSlide ? 1 : 0, pointerEvents: idx === currentSlide ? 'auto' : 'none' }}
          >
            <div
              className={`max-w-[680px] px-12 max-md:px-6 max-md:pb-16 max-md:max-w-full ${
                isRight
                  ? 'text-left mr-[8%] max-md:mr-0 max-md:text-left'
                  : 'text-left ml-[8%] max-md:ml-0'
              }`}
            >
              <div className="inline-block text-[10px] max-md:text-[9px] tracking-[0.35em] uppercase text-gold-light font-normal mb-4 max-md:mb-3 border-l-2 border-gold pl-3.5">
                {slide.tag}
              </div>
              <h1 className="font-serif text-[clamp(40px,7vw,88px)] max-md:text-[44px] font-light leading-[0.95] text-cream-light tracking-[0.02em] mb-2 max-md:mb-1.5">
                {slide.title}
              </h1>
              <p className="text-[13px] max-md:text-[11px] tracking-[0.12em] uppercase text-cream-light/70 mb-6 max-md:mb-5 font-light">
                {slide.subtitle}
              </p>
              <div className={`flex gap-3 items-center flex-wrap ${isRight ? '' : ''}`}>
                <Link to="/collections/all" className="btn-aurea-primary max-md:!px-6 max-md:!py-3 max-md:!text-[10px]">Shop the Collection</Link>
                <Link to="/about" className="btn-aurea-ghost max-md:!px-5 max-md:!py-3 max-md:!text-[10px]">Our Story</Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${idx === currentSlide ? 'bg-gold w-6' : 'bg-cream-light/40 w-2'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
