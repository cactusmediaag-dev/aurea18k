const reviews = [
  {
    stars: 5,
    text: "I've had the Luna Hoops for 3 months and they still look brand new. I wear them every single day — shower, gym, everything. Best purchase.",
    name: 'Sarah M.',
    location: 'Boston, MA',
    initial: 'S',
  },
  {
    stars: 5,
    text: "Finally found jewelry that doesn't make my ears itch. I ordered the Stack Bundle and it exceeded every expectation. The quality is unreal for this price.",
    name: 'Jessica T.',
    location: 'Miami, FL',
    initial: 'J',
  },
  {
    stars: 5,
    text: "Ordered the Full Set as a birthday gift for my daughter. She absolutely loved it — the packaging, the quality, everything. Will be back for Mother's Day!",
    name: 'Linda R.',
    location: 'New York, NY',
    initial: 'L',
  },
];

const ReviewsSection = () => (
  <section id="reviews" className="aurea-section bg-cream-light">
    <div className="text-center mb-16">
      <div className="aurea-section-label">Real Customers</div>
      <h2 className="aurea-section-title">What They're <em>Saying</em></h2>
      <div className="flex items-center justify-center gap-5 mt-6">
        <div className="font-serif text-7xl font-light text-dark-green leading-none">4.9</div>
        <div className="text-left">
          <div className="text-gold text-xl tracking-[2px]">★★★★★</div>
          <div className="text-xs text-warm-gray mt-1 tracking-[0.05em]">Based on 471 reviews</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
      {reviews.map((r) => (
        <div key={r.name} className="p-8 border border-gold/25 relative" style={{ background: '#FAF7F0' }}>
          <div className="text-gold text-xs tracking-[1px] mb-3.5">
            {'★'.repeat(r.stars)}
          </div>
          <p className="font-serif text-[17px] italic text-warm-black leading-[1.65] mb-5 font-light">"{r.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cream border border-gold/25 flex items-center justify-center text-sm text-gold font-serif">
              {r.initial}
            </div>
            <div>
              <div className="text-[13px] font-medium text-warm-black">{r.name}</div>
              <div className="text-[11px] text-warm-gray mt-0.5">{r.location}</div>
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-dark-green font-normal ml-auto">✓ Verified</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ReviewsSection;
