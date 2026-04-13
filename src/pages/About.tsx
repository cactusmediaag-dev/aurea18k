import PageLayout from '@/components/PageLayout';
import brazilImg from '@/assets/made-in-brazil.jpg';

const About = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="aurea-section-label">Our Story</div>
        <h1 className="aurea-section-title">About <em>Aurea</em></h1>
      </div>

      <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1">
        <div>
          <div className="aspect-[3/4] overflow-hidden border border-gold/25">
            <img src={brazilImg} alt="Born in Brazil" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
          <p>Born in Brazil. Made for the world.</p>
          <p>Aurea was created with one belief: that beautiful, high-quality jewelry shouldn't be a privilege.</p>
          <p>Every piece is crafted with 18K gold plating on hypoallergenic stainless steel — so you can wear it every day, from morning coffee to weekend plans, without irritation or compromise.</p>
          <p>Our customers come to us for pieces that don't irritate their skin and stay looking good beyond the first wear.</p>
          <p className="font-serif text-[22px] italic text-gold text-center py-4">"Born in Brazil, Made for the World!"</p>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default About;
