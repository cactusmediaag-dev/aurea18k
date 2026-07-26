import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero1Desktop from '@/assets/hero1-desktop.jpg';
import hero2Desktop from '@/assets/hero2-desktop.jpg';
import hero3Desktop from '@/assets/hero3-desktop.jpg';
import banner1Mobile from '@/assets/banner1-mobile.jpg';
import banner2Mobile from '@/assets/banner2-mobile.jpg';

type Theme = 'light' | 'dark';

interface Slide {
  desktop: string;
  mobile: string | null;
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  theme: Theme;
}

const slides: Slide[] = [
  {
    desktop: hero1Desktop,
    mobile: banner1Mobile,
    tag: 'THE ART OF EVERYDAY LUXURY',
    title: (
      <>
        Timeless<br />
        <em className="italic text-gold">Elegance</em><br />
        Redefined
      </>
    ),
    subtitle: 'Exquisite 18K gold-plated pieces, hypoallergenic and crafted to be worn every day.',
    theme: 'light',
  },
  {
    desktop: hero2Desktop,
    mobile: banner2Mobile,
    tag: 'NEW COLLECTION · 2026',
    title: (
      <>
        Wear the <em className="italic text-gold">Golden</em><br />
        Standard
      </>
    ),
    subtitle: '18K Gold Plated · Hypoallergenic · Made to Last',
    theme: 'light',
  },
  {
    desktop: hero3Desktop,
    mobile: null,
    tag: 'BEST SELLERS',
    title: (
      <>
        Your Light.<br />
        <em className="italic text-gold">Your Aura.</em>
      </>
    ),
    subtitle: "The pieces our customers can't stop wearing.",
    theme: 'dark',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const activeSlides = isMobile ? slides.filter((s) => s.mobile) : slides;

  useEffect(() => {
    slides.forEach((s) => {
      const a = new Image(); a.src = s.desktop;
      if (s.mobile) { const b = new Image(); b.src = s.mobile; }
    });
  }, []);

  useEffect(() => {
    if (currentSlide >= activeSlides.length) setCurrentSlide(0);
  }, [activeSlides.length, currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const safeIndex = Math.min(currentSlide, activeSlides.length - 1);
  const active = activeSlides[safeIndex] ?? activeSlides[0];

  return (
    <section className="relative bg-cream">
      {/* MOBILE — stacked (image top, text below) */}
      <div className="md:hidden">
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          {activeSlides.map((slide, idx) => (
            <img
              key={idx}
              src={slide.mobile ?? slide.desktop}
              alt="Aurea Jewels"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: idx === safeIndex ? 1 : 0 }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'low'}
              decoding="async"
            />
          ))}
        </div>
        <div className="px-6 py-12 bg-cream">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-10 h-px bg-gold" />
            <span className="text-[12px] tracking-[0.35em] uppercase text-gold font-sans">
              {active.tag}
            </span>
          </div>
          <h1 className="font-serif font-light text-warm-black leading-[1.05] tracking-[0.01em]" style={{ fontSize: 'clamp(40px, 9vw, 56px)' }}>
            {active.title}
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-warm-gray max-w-[380px]">
            {active.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              to="/collections/all"
              className="inline-flex items-center justify-center bg-gold text-primary-foreground hover:bg-gold-light transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-8 py-4 no-underline"
            >
              Shop the Collection →
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-warm-black/30 text-warm-black hover:border-gold hover:text-gold transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-8 py-4 no-underline"
            >
              Our Story
            </Link>
          </div>
        </div>
        {/* Mobile indicators */}
        <div className="absolute z-20 flex gap-3 left-1/2 -translate-x-1/2" style={{ top: 'calc(100vw * 5 / 4 - 24px)' }}>
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 border-none cursor-pointer transition-all duration-300 ${idx === safeIndex ? 'bg-gold w-6' : 'bg-cream-light/60 w-2'}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP — full-bleed image with text overlay on baked-in fade zone */}
      <div className="hidden md:block relative h-[min(750px,92vh)] min-h-[560px] overflow-hidden">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.desktop}
            alt="Aurea Jewels"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: idx === safeIndex ? 1 : 0 }}
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : 'low'}
            decoding="async"
          />
        ))}

        <div className="relative h-full max-w-[1400px] mx-auto flex items-center pl-12">
          <div
            key={safeIndex}
            className="max-w-[480px]"
            style={{ animation: 'heroFadeIn 0.8s ease-out both' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={`block w-10 h-px ${active.theme === 'dark' ? 'bg-gold-light' : 'bg-gold'}`} />
              <span className={`text-[12px] tracking-[0.35em] uppercase font-sans ${active.theme === 'dark' ? 'text-gold-light' : 'text-gold'}`}>
                {active.tag}
              </span>
            </div>

            <h1
              className={`font-serif font-light leading-[1.05] tracking-[0.01em] ${active.theme === 'dark' ? 'text-cream-light' : 'text-warm-black'}`}
              style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}
            >
              {active.title}
            </h1>

            <p className={`mt-6 font-sans text-[15px] leading-relaxed max-w-[380px] ${active.theme === 'dark' ? 'text-cream-light/75' : 'text-warm-gray'}`}>
              {active.subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/collections/all"
                className="inline-flex items-center justify-center bg-gold text-primary-foreground hover:bg-gold-light transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-8 py-4 no-underline"
              >
                Shop the Collection →
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center justify-center border transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-8 py-4 no-underline ${
                  active.theme === 'dark'
                    ? 'border-cream-light/40 text-cream-light hover:border-gold'
                    : 'border-warm-black/30 text-warm-black hover:border-gold hover:text-gold'
                }`}
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 border-none cursor-pointer transition-all duration-300 ${idx === safeIndex ? 'bg-gold w-6' : 'bg-cream-light/60 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
