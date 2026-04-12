const promises = [
  { icon: '✦', title: '18K Gold Plated', text: 'Up to 10 microns of gold. Durable, brilliant, and built to last through your everyday life.' },
  { icon: '◈', title: 'Hypoallergenic', text: 'Stainless steel base — nickel-free and safe for even the most sensitive skin.' },
  { icon: '◇', title: 'Fast Shipping', text: '3–5 business days. Free on all orders over $120. Real speed, real service.' },
  { icon: '○', title: 'Exchange Policy', text: '7-day exchange on manufacturing defects. We stand behind every piece we sell.' },
];

const PromiseSection = () => (
  <section className="aurea-section bg-cream-light text-center">
    <div className="aurea-section-label">Why Aurea</div>
    <h2 className="aurea-section-title">Our <em>Promise</em></h2>
    <div className="grid grid-cols-4 gap-10 mt-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {promises.map((p) => (
        <div key={p.title}>
          <div className="w-14 h-14 border border-gold/25 rounded-full mx-auto mb-5 flex items-center justify-center text-[22px]" style={{ background: 'hsl(var(--cream))' }}>
            {p.icon}
          </div>
          <div className="font-serif text-[19px] font-normal text-dark-green mb-2.5">{p.title}</div>
          <p className="text-[13px] text-warm-gray leading-[1.75] font-light">{p.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PromiseSection;
