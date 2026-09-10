import { PROMO } from '@/lib/promo';
import { useT } from '@/i18n';

const AnnouncementBar = () => {
  const t = useT();
  const messages = [
    ...(PROMO.active ? [t.announcement.promo] : []),
    t.announcement.shipping,
    t.announcement.plated,
    t.announcement.worldwide,
  ];
  const doubled = [...messages, ...messages];

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
