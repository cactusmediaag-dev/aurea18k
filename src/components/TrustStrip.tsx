const TrustStrip = () => {
  const items = [
    '18K Gold Plated',
    'Hypoallergenic',
    'Free Shipping $120+',
    'Worldwide Shipping',
    'Secure Checkout',
  ];

  return (
    <div className="bg-dark-green py-4.5 px-12 flex justify-center gap-16 items-center flex-wrap max-md:gap-6 max-md:px-6">
      {items.map((text) => (
        <div key={text} className="flex items-center gap-3 text-gold-light">
          <span className="text-[15px]">✦</span>
          <span className="text-[11px] tracking-[0.15em] uppercase font-normal text-gold-light/90">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustStrip;
