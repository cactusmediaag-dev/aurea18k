import { Link } from 'react-router-dom';
import { useT } from '@/i18n';

const reviews = [
  {
    stars: 5,
    text: "I've had the Luna Hoops for 3 months and they still look brand new. I wear them every single day — shower, gym, everything. Best purchase.",
    name: 'Sarah M.',
    location: 'Boston, MA',
  },
  {
    stars: 5,
    text: "Finally found jewelry that doesn't make my ears itch. I ordered the Stack Bundle and it exceeded every expectation. The quality is unreal for this price.",
    name: 'Jessica T.',
    location: 'Miami, FL',
  },
  {
    stars: 5,
    text: "Ordered the Full Set as a birthday gift for my daughter. She absolutely loved it — the packaging, the quality, everything. Will be back for Mother's Day!",
    name: 'Linda R.',
    location: 'New York, NY',
  },
];

const ReviewsSection = () => {
  const t = useT();
  return (
  <section id="reviews" className="aurea-section bg-cream-light">
    <div className="text-center mb-16">
      <div className="aurea-section-label">{t.reviews.label}</div>
      <h2 className="aurea-section-title">{t.reviews.title.pre} <em>{t.reviews.title.em}</em></h2>
      <div className="flex items-center justify-center gap-4 mt-5">
        <div className="font-serif text-5xl font-light text-dark-green leading-none">4.9</div>
        <div className="text-left">
          <div className="text-gold text-base tracking-[2px]">★★★★★</div>
          <div className="text-[11px] text-warm-gray mt-1 tracking-[0.05em]">{t.reviews.basedOn(471)}</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
      {reviews.map((r) => (
        <div key={r.name} className="p-8 border border-gold/25 relative bg-cream">
          <div className="font-serif text-[44px] leading-none text-gold mb-4">“</div>
          <p className="font-serif text-[17px] italic text-warm-black leading-[1.65] mb-6 font-light">"{r.text}"</p>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[13px] font-medium text-warm-black">{r.name}</div>
              <div className="text-gold text-[11px] tracking-[1px] mt-1">{'★'.repeat(r.stars)}</div>
              <div className="text-[11px] text-warm-gray mt-1">{r.location}</div>
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase text-dark-green font-normal">{t.reviews.verified}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link
        to="/reviews"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-dark-green border-b border-gold hover:text-gold transition-colors no-underline pb-1"
      >
        {t.reviews.readAll}
      </Link>
    </div>
  </section>
  );
};

export default ReviewsSection;
