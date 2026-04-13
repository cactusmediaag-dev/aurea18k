import PageLayout from '@/components/PageLayout';

const ShippingReturns = () => (
  <PageLayout>
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="font-serif text-4xl text-dark-green mb-8">Shipping & Returns</h1>

      <section className="mb-10">
        <h2 className="font-serif text-2xl text-dark-green mb-4">Shipping</h2>
        <ul className="space-y-3 text-warm-black/70 font-light leading-relaxed list-disc pl-5">
          <li>We ship worldwide via tracked shipping.</li>
          <li>Orders are processed within 1–3 business days.</li>
          <li>Delivery takes 3–5 business days (domestic) or 7–14 business days (international).</li>
          <li>Free shipping on orders over $120.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-2xl text-dark-green mb-4">Returns & Exchanges</h2>
        <ul className="space-y-3 text-warm-black/70 font-light leading-relaxed list-disc pl-5">
          <li>We accept returns within 30 days of delivery.</li>
          <li>Items must be unworn, in original packaging, and with all tags attached.</li>
          <li>To initiate a return or exchange, please contact us at <a href="mailto:contact@aurea18k.com" className="text-gold hover:underline">contact@aurea18k.com</a>.</li>
          <li>Refunds are processed within 5–7 business days after we receive the returned item.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-dark-green mb-4">Questions?</h2>
        <p className="text-warm-black/70 font-light leading-relaxed">
          If you have any questions about shipping or returns, feel free to <a href="/contact" className="text-gold hover:underline">contact us</a> or visit our <a href="/faq" className="text-gold hover:underline">FAQ page</a>.
        </p>
      </section>
    </div>
  </PageLayout>
);

export default ShippingReturns;
