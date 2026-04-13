import PageLayout from '@/components/PageLayout';

const TermsConditions = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto">
      <div className="aurea-section-label">Legal</div>
      <h1 className="aurea-section-title mb-10">Terms & <em>Conditions</em></h1>
      <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
        <p>By accessing and using aurea18k.com, you agree to comply with the following terms.</p>
        <p>All products are subject to availability. We reserve the right to limit quantities or discontinue items at any time.</p>
        <p>Prices are listed in U.S. dollars and may change without notice.</p>
        <p>Orders may be canceled if fraudulent activity is suspected.</p>
        <p>Aurea is not responsible for shipping delays caused by carriers, weather conditions, or circumstances beyond our control.</p>
        <p>Product descriptions and images are provided as accurately as possible. Slight variations in color may occur due to screen settings.</p>
        <p>By placing an order, you agree to our shipping, return, and refund policies.</p>
        <p>If you have questions regarding these terms, please contact us directly.</p>
      </div>
    </div>
  </PageLayout>
);

export default TermsConditions;
