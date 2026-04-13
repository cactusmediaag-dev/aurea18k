import PageLayout from '@/components/PageLayout';

const reviews = [
  { text: "I have sensitive skin and usually can't wear earrings for more than an hour. These? Zero irritation.", name: 'Verified Customer' },
  { text: "Looks way more expensive than it is.", name: 'Verified Customer' },
  { text: "Lightweight, doesn't tarnish, and I've worn it almost every day.", name: 'Verified Customer' },
  { text: "Finally found jewelry my daughter can wear without breaking out.", name: 'Verified Customer' },
];

const ReviewsPage = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="aurea-section-label">What They Say</div>
        <h1 className="aurea-section-title">Customer <em>Reviews</em></h1>
        <p className="mt-6 text-[15px] text-warm-gray font-light leading-[1.85] max-w-xl mx-auto">
          Real customers. Real feedback. No filters. We're proud of the community that's growing around Aurea.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {reviews.map((r, i) => (
          <div key={i} className="p-8 border border-gold/25" style={{ background: '#FAF7F0' }}>
            <div className="text-gold text-xs tracking-[1px] mb-3.5">★★★★★</div>
            <p className="font-serif text-[17px] italic text-warm-black leading-[1.65] mb-5 font-light">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cream border border-gold/25 flex items-center justify-center text-sm text-gold font-serif">
                ✓
              </div>
              <div className="text-[13px] font-medium text-warm-black">{r.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-[15px] text-warm-gray font-light leading-[1.85]">
        <p>We don't chase trends. We build trust. And our reviews reflect that.</p>
        <p className="mt-4">If you've shopped with us, we'd love to hear from you. Your feedback helps us grow and helps other customers shop with confidence.</p>
        <a href="mailto:contact@aurea18k.com" className="btn-aurea-primary mt-8 inline-block">Share Your Experience</a>
      </div>
    </div>
  </PageLayout>
);

export default ReviewsPage;
