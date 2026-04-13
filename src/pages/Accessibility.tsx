import PageLayout from '@/components/PageLayout';

const Accessibility = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto">
      <div className="aurea-section-label">Company</div>
      <h1 className="aurea-section-title mb-10">Accessibility <em>Statement</em></h1>
      <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
        <p>Aurea is committed to making our website accessible and user-friendly for everyone.</p>
        <p>We strive to ensure that aurea18k.com meets accessibility standards and works across a wide range of devices and assistive technologies.</p>
        <p>If you experience difficulty accessing any part of our website, please contact us. We take feedback seriously and will make reasonable efforts to accommodate your needs.</p>
        <p>You can reach us at:<br />
          <a href="mailto:contact@aurea18k.com" className="text-gold hover:text-gold-light transition-colors">contact@aurea18k.com</a>
        </p>
      </div>
    </div>
  </PageLayout>
);

export default Accessibility;
