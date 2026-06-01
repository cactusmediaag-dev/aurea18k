import PageLayout from '@/components/PageLayout';
import Seo, { breadcrumbLd, SITE_URL } from '@/components/Seo';
import heroImg from '@/assets/about-hero.jpg';
import brazilImg from '@/assets/about-brazil.jpg';
import craftImg from '@/assets/about-craft.jpg';

const AboutAureaJewels = () => {
  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Aurea Jewels',
    url: `${SITE_URL}/about-aurea-jewels`,
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <PageLayout>
      <Seo
        title="About Aurea Jewels | The Official Brand Story"
        description="Aurea Jewels is the official brand of premium 18K gold plated jewelry — hypoallergenic, durable, and crafted in Brazil for the modern world. Learn about our story, materials, guarantee, and creative process."
        path="/about-aurea-jewels"
        image={`${SITE_URL}/logo.png`}
        jsonLd={[aboutLd, breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About Aurea Jewels', path: '/about-aurea-jewels' },
        ])]}
      />

      <div className="bg-cream-light">
        <div className="w-full overflow-hidden border-b border-gold/15">
          <img src={heroImg} alt="Aurea Jewels — Official Brand" className="w-full h-auto object-cover" />
        </div>

        <article className="aurea-section max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <div className="aurea-section-label">The Official Brand</div>
            <h1 className="aurea-section-title">About <em>Aurea Jewels</em></h1>
            <p className="text-warm-gray font-light text-[15px] leading-[1.85] max-w-2xl mx-auto mt-6">
              Aurea Jewels is the official premium 18K gold plated jewelry brand, born in Brazil and made for the world. Every piece blends timeless design with hypoallergenic, long-lasting materials so you can wear it every day.
            </p>
          </header>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Our Story</h2>
            <p className="text-[15px] leading-[1.85] font-light text-warm-black/80 mb-4">
              Aurea Jewels was founded with one belief: beautiful, high-quality jewelry shouldn't be a privilege. Inspired by Brazilian craftsmanship and global elegance, we created a brand that delivers the look and feel of fine gold at an honest price — pieces real women and men can wear every day without compromise.
            </p>
            <p className="text-[15px] leading-[1.85] font-light text-warm-black/80">
              From our first collection to today, Aurea has grown into a destination for customers who want jewelry that doesn't irritate their skin, doesn't tarnish quickly, and doesn't go out of style.
            </p>
          </section>

          <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 my-16">
            <div className="aspect-[4/3] overflow-hidden border border-gold/25">
              <img src={brazilImg} alt="Aurea Jewels — Born in Brazil" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Brand Positioning</h2>
              <p className="text-[15px] leading-[1.85] font-light text-warm-black/80">
                Aurea Jewels sits at the intersection of accessible luxury and everyday wearability. We design for the modern woman and man who appreciate craftsmanship, value quality over hype, and want jewelry that fits naturally into their life — from morning meetings to weekend plans.
              </p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Material Quality</h2>
            <p className="text-[15px] leading-[1.85] font-light text-warm-black/80 mb-4">
              Every Aurea piece is crafted with thick 18K gold plating over hypoallergenic stainless steel. This combination gives you the warmth and richness of gold with the strength and skin-safe properties of surgical-grade steel.
            </p>
            <ul className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-2 list-disc pl-6">
              <li>18K gold plating with extended wear durability</li>
              <li>Hypoallergenic, nickel-free stainless steel base</li>
              <li>Water-resistant — safe for daily life, showers and gym</li>
              <li>Tarnish-resistant finish</li>
            </ul>
          </section>

          <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 my-16">
            <div className="max-md:order-2">
              <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Our Guarantee</h2>
              <p className="text-[15px] leading-[1.85] font-light text-warm-black/80">
                We stand behind every Aurea piece. Our quality promise covers manufacturing defects, and our customer care team is available to help with sizing, styling, and any post-purchase question. If something isn't right, we'll make it right.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden border border-gold/25 max-md:order-1">
              <img src={craftImg} alt="Aurea Jewels — Handcrafted Quality" className="w-full h-full object-cover" />
            </div>
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-light text-dark-green mb-4">What Makes Aurea Different</h2>
            <ul className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-2 list-disc pl-6">
              <li>Premium 18K gold plating at a fair, transparent price</li>
              <li>Hypoallergenic, designed for sensitive skin</li>
              <li>Curated collections — timeless minimal, statement and layering pieces</li>
              <li>Free worldwide shipping on orders over $120</li>
              <li>Direct-to-consumer model — no middlemen, no markup</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Creative Process</h2>
            <p className="text-[15px] leading-[1.85] font-light text-warm-black/80">
              Every Aurea collection begins with a mood and a sketch. Our design team draws inspiration from Brazilian nature, architecture and the women and men who wear our pieces. Each design is prototyped, refined and tested for comfort and durability before it joins the collection.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-light text-dark-green mb-4">Our Values</h2>
            <ul className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-2 list-disc pl-6">
              <li><strong>Quality first</strong> — we never cut corners on materials or finishing.</li>
              <li><strong>Honest pricing</strong> — fair value, no inflated luxury markup.</li>
              <li><strong>Inclusivity</strong> — jewelry for every skin tone, age and style.</li>
              <li><strong>Care</strong> — for our customers, our artisans and the planet.</li>
            </ul>
          </section>

          <footer className="text-center border-t border-gold/15 pt-10 mt-10">
            <p className="text-[13px] tracking-[0.05em] text-warm-gray font-light">
              Aurea Jewels — Official Website · <a href="https://aurea18k.com" className="text-gold hover:underline">aurea18k.com</a>
            </p>
          </footer>
        </article>
      </div>
    </PageLayout>
  );
};

export default AboutAureaJewels;
