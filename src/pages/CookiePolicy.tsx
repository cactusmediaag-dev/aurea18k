import PageLayout from '@/components/PageLayout';

const CookiePolicy = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto">
      <div className="aurea-section-label">Legal</div>
      <h1 className="aurea-section-title mb-10">Cookie <em>Policy</em></h1>
      <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
        <p>We use cookies to improve your experience on our website.</p>
        <p>Cookies help us:</p>
        <ul className="list-none space-y-2 pl-4">
          <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span> Remember items in your cart</li>
          <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span> Understand browsing behavior</li>
          <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span> Improve website performance</li>
          <li className="flex items-start gap-2"><span className="text-gold mt-1">✦</span> Personalize marketing and promotions</li>
        </ul>
        <p>You can adjust your browser settings to disable cookies at any time. Please note that disabling cookies may affect certain website functionalities.</p>
        <p>By continuing to browse aurea18k.com, you consent to our use of cookies.</p>
      </div>
    </div>
  </PageLayout>
);

export default CookiePolicy;
