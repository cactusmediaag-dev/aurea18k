const TrustStrip = () => {
  const items = [
    '18K Gold Plated',
    'Hypoallergenic',
    'Free Shipping $120+',
    'Worldwide Shipping',
    'Secure Checkout',
  ];

  // Double items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-dark-green py-4.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-gold-light mx-8 shrink-0">
            <span className="text-[15px]">✦</span>
            <span className="text-[11px] tracking-[0.15em] uppercase font-normal text-gold-light/90">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
