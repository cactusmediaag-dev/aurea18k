const gradients = [
  'linear-gradient(135deg, #C8A86A 30%, #A88840 100%)',
  'linear-gradient(135deg, #B89878 20%, #987858 100%)',
  'linear-gradient(135deg, #8A9878 30%, #6A7858 100%)',
  'linear-gradient(135deg, #D4B870 30%, #B49850 100%)',
  'linear-gradient(135deg, #9A8868 20%, #7A6848 100%)',
  'linear-gradient(135deg, #A8B880 30%, #88985E 100%)',
];

const InstagramSection = () => (
  <div className="py-20 text-center" style={{ background: '#FAF7F0' }}>
    <div className="px-12 pb-12">
      <div className="aurea-section-label">Follow Along</div>
      <h2 className="aurea-section-title" style={{ color: 'hsl(var(--dark-green))' }}>
        @aurea18k on <em>Instagram</em>
      </h2>
      <div className="font-serif text-xl font-light text-dark-green tracking-[0.15em] mt-2">
        Tag us for a chance to be featured
      </div>
    </div>
    <div className="grid grid-cols-6 max-lg:grid-cols-3">
      {gradients.map((bg, i) => (
        <div key={i} className="aspect-square overflow-hidden cursor-pointer relative group">
          <div className="w-full h-full transition-transform duration-400 group-hover:scale-110" style={{ background: bg }} />
          <div className="absolute inset-0 bg-dark-green/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-cream-light text-[22px]">
            ♡
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default InstagramSection;
