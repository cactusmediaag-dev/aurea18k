const AnnouncementBar = () => {
  const messages = [
    '✦ Free shipping on orders over $120',
    '✦ 18K Gold Plated · Hypoallergenic & Nickel-Free',
    '✦ Ships Worldwide · 3–5 Business Days',
  ];

  const doubled = [...messages, ...messages];

  return (
    <div className="bg-dark-green overflow-hidden py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((msg, i) => (
          <span key={i} className="text-gold-light text-xs tracking-[0.12em] uppercase font-normal mx-12 shrink-0">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
