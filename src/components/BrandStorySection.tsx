import brazilImg from '@/assets/made-in-brazil.jpg';

const BrandStorySection = () => (
  <div id="story" className="bg-dark-green py-28 px-12 grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-16">
    <div>
      <div className="aurea-section-label">Our Story</div>
      <h2 className="aurea-section-title" style={{ color: 'hsl(var(--cream-light))' }}>
        Jewelry that moves<br />with <em>your life</em>
      </h2>
      <div className="mt-7 text-cream-light/70 text-[15px] leading-[1.85] font-light">
        <p>Born in Brazil. Made for the world. Aurea was created with one belief: that beautiful, high-quality jewelry shouldn't be a privilege.</p>
        <p className="mt-4">Every piece is crafted with 18K gold plating on hypoallergenic stainless steel — so you can wear it every day, from morning coffee to weekend plans, without irritation or compromise.</p>
      </div>
      <div className="mt-10">
        <a href="/about" className="btn-aurea-primary">Meet Aurea Jewels</a>
      </div>
    </div>
    <div className="flex items-center justify-center max-lg:hidden">
      <div className="w-[340px] h-[440px] border border-gold/30 relative flex items-center justify-center overflow-hidden" style={{ background: 'rgba(196,151,58,0.04)' }}>
        <div className="absolute -top-5 -left-5 right-5 bottom-5 border border-gold/15 pointer-events-none" />
        <img src={brazilImg} alt="Born in Brazil, Made for the World" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <p className="font-serif text-[28px] italic text-gold-light text-center px-8 leading-[1.5] font-light relative z-10">
          "Born in Brazil<br />Made for the World!"
        </p>
      </div>
    </div>
  </div>
);

export default BrandStorySection;
