import PageLayout from '@/components/PageLayout';
import Seo, { breadcrumbLd } from '@/components/Seo';
import heroImg from '@/assets/about-hero.jpg';
import brazilImg from '@/assets/about-brazil.jpg';
import craftImg from '@/assets/about-craft.jpg';

const About = () => (
  <PageLayout>
    <Seo
      title="Our Story | Aurea Jewels"
      description="Discover the story behind Aurea Jewels — premium 18K gold plated jewelry, born in Brazil and crafted for the world."
      path="/about"
      jsonLd={breadcrumbLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ])}
    />
    <div className="bg-cream-light">
      {/* Hero banner */}
      <div className="w-full overflow-hidden border-b border-gold/15">
        <img src={heroImg} alt="Aurea Jewels — Jewelry with Brazilian Essence" className="w-full h-auto object-cover" />
      </div>

      <div className="aurea-section max-w-5xl mx-auto">
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

        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 mt-24">
          <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6 max-md:order-2">
            <div className="aurea-section-label">Craftsmanship</div>
            <h2 className="font-serif text-3xl font-light text-dark-green">Handcrafted with <em className="italic text-gold">care</em></h2>
            <p>Each piece passes through skilled artisan hands before reaching you — finished, polished, and inspected with the attention every detail deserves.</p>
            <p>From the first sketch to the final gold bath, our process honors the heritage of Brazilian jewelry-making.</p>
          </div>
          <div className="max-md:order-1">
            <div className="aspect-[4/3] overflow-hidden border border-gold/25">
              <img src={craftImg} alt="Handcrafted Aurea jewelry" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default About;
