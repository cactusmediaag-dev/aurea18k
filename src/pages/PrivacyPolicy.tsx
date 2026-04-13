import PageLayout from '@/components/PageLayout';

const PrivacyPolicy = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto">
      <div className="aurea-section-label">Legal</div>
      <h1 className="aurea-section-title mb-10">Privacy <em>Policy</em></h1>
      <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
        <p>At Aurea, your privacy matters. Period.</p>
        <p>We collect basic information such as your name, email, shipping address, and payment details solely to process orders and improve your shopping experience.</p>
        <p><strong className="font-medium">We do not sell your personal information.</strong></p>
        <p>We do not share your data with third parties for marketing without your consent.</p>
        <p>Payment information is processed securely through trusted payment providers. Aurea does not store full credit card details.</p>
        <p>We may use cookies and tracking tools to understand how customers use our website so we can improve performance, personalize content, and offer relevant promotions.</p>
        <p>By using our website, you agree to this policy.</p>
        <p>If you have any questions about how your information is handled, contact us at:<br />
          <a href="mailto:contact@aurea18k.com" className="text-gold hover:text-gold-light transition-colors">contact@aurea18k.com</a>
        </p>
      </div>
    </div>
  </PageLayout>
);

export default PrivacyPolicy;
