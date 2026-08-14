import { PROMO, promoBarMessage } from '@/lib/promo';

const MESSAGES = [
  ...(PROMO.active ? [promoBarMessage] : []),
  'Free shipping on orders over $120',
  '18K Gold Plated · Hypoallergenic & Nickel-Free',
  'Ships Worldwide · 3–5 Business Days',
];

const AnnouncementBar = () => {
  const doubled = [...MESSAGES, ...MESSAGES];

  return (
    <div className="bg-dark-green py-2.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((text, i) => (
          <span key={i} className="text-gold-light text-xs tracking-[0.12em] uppercase mx-12 shrink-0">
            ✦ {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
