import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerDesktop from '@/assets/banner1-desktop.jpg';
import bannerMobile from '@/assets/banner1-mobile.jpg';
import banner2Desktop from '@/assets/banner2-desktop.jpg';
import banner2Mobile from '@/assets/banner2-mobile.jpg';

const heroImages = [
  { desktop: bannerDesktop, mobile: bannerMobile },
  { desktop: banner2Desktop, mobile: banner2Mobile },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    heroImages.forEach((s) => {
      const a = new Image(); a.src = s.desktop;
      const b = new Image(); b.src = s.mobile;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-112px)]">
        {/* LEFT — content */}
        <div
          className="lg:col-span-5 flex items-center bg-cream order-2 lg:order-1 px-6 py-12 lg:pl-12 lg:pr-16"
          style={{ animation: 'heroFadeIn 0.8s ease-out both' }}
        >
          <div className="w-full max-w-[520px] mx-auto lg:mx-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-px bg-gold" />
              <span className="text-[12px] tracking-[0.35em] uppercase text-gold font-sans">
                The Art of Everyday Luxury
              </span>
            </div>

            <h1 className="font-serif font-light text-warm-black leading-[1.05] tracking-[0.01em]" style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>
              Timeless<br />
              <em className="italic text-gold">Elegance</em><br />
              Redefined
            </h1>

            <p className="mt-6 font-sans text-[15px] leading-relaxed text-warm-gray max-w-[380px]">
              Exquisite 18K gold-plated pieces, hypoallergenic and crafted to be worn every day — from morning coffee to unforgettable nights.
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
                className="inline-flex items-center justify-center border border-warm-black/30 text-warm-black hover:border-gold hover:text-gold transition-colors duration-200 font-sans text-[12px] uppercase tracking-[0.2em] font-medium px-8 py-4 no-underline"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="lg:col-span-7 relative overflow-hidden order-1 lg:order-2 aspect-[4/5] lg:aspect-auto lg:min-h-[560px]">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: idx === currentSlide ? 1 : 0 }}
            >
              <img
                src={img.desktop}
                alt="Aurea Jewels"
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
              />
              <img
                src={img.mobile}
                alt="Aurea Jewels"
                className="absolute inset-0 w-full h-full object-cover md:hidden"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
              />
            </div>
          ))}
          {/* Seamless split gradient */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-cream to-transparent pointer-events-none" />

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 border-none cursor-pointer transition-all duration-300 ${idx === currentSlide ? 'bg-gold w-6' : 'bg-cream-light/60 w-2'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
