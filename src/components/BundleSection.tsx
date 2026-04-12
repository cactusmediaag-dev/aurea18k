const bundles = [
  {
    name: 'The Duo',
    items: 'Any 2 earrings\nof your choice',
    price: '$68',
    original: '$80',
    save: 'Save 15%',
    cta: 'Build My Duo',
    icons: ['◎', '◇'],
    featured: false,
  },
  {
    name: 'The Stack',
    items: 'Earrings + Necklace\n+ Bracelet',
    price: '$99',
    original: '$126',
    save: 'Save 21%',
    cta: 'Build My Stack',
    icons: ['◎', '◇', '○'],
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'The Full Set',
    items: '4 pieces of\nyour choice',
    price: '$129',
    original: '$168',
    save: 'Save 23%',
    cta: 'Build My Set',
    icons: ['◎', '◇', '○', '◈'],
    featured: false,
  },
];

const BundleSection = () => (
  <section className="aurea-section" style={{ background: '#FAF7F0' }}>
    <div className="text-center">
      <div className="aurea-section-label">Save More, Shine More</div>
      <h2 className="aurea-section-title">Bundle <em>&amp; Save</em></h2>
      <p className="text-warm-gray text-sm mt-3 font-light">Curate your collection and unlock exclusive savings.</p>
    </div>

    <div className="grid grid-cols-3 gap-6 mt-14 max-lg:grid-cols-1">
      {bundles.map((b) => (
        <div
          key={b.name}
          className={`border p-9 px-7 relative cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
            b.featured
              ? 'border-gold bg-gradient-to-br from-[#FAF5E8] to-cream-light'
              : 'border-gold/25 bg-cream-light hover:border-gold'
          }`}
        >
          {b.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark-green text-gold-light text-[9px] tracking-[0.2em] uppercase font-medium px-5 py-1.5 whitespace-nowrap">
              {b.badge}
            </div>
          )}
          <div className="flex gap-2 mb-5">
            {b.icons.map((icon, i) => (
              <div key={i} className="flex-1 aspect-square bg-cream border border-gold/25 flex items-center justify-center text-xl">
                {icon}
              </div>
            ))}
          </div>
          <div className="font-serif text-2xl font-normal text-dark-green mb-2">{b.name}</div>
          <div className="text-xs text-warm-gray tracking-[0.08em] mb-5 leading-[1.8] whitespace-pre-line">{b.items}</div>
          <div className="flex items-baseline gap-3 mb-5">
            <div className="font-serif text-[34px] font-normal text-warm-black">{b.price}</div>
            <div className="text-base text-warm-gray line-through">{b.original}</div>
            <div className="bg-gold-pale text-dark-green text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">{b.save}</div>
          </div>
          <button className="btn-aurea-dark">{b.cta}</button>
        </div>
      ))}
    </div>
  </section>
);

export default BundleSection;
