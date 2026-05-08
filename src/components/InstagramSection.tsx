const gradients = [
  'linear-gradient(135deg, #C8A86A 30%, #A88840 100%)',
  'linear-gradient(135deg, #B89878 20%, #987858 100%)',
  'linear-gradient(135deg, #8A9878 30%, #6A7858 100%)',
  'linear-gradient(135deg, #D4B870 30%, #B49850 100%)',
  'linear-gradient(135deg, #9A8868 20%, #7A6848 100%)',
  'linear-gradient(135deg, #A8B880 30%, #88985E 100%)',
];

const PROFILE_URL = 'https://www.instagram.com/aureajewels.18k/';

// Adicione as imagens em public/instagram/ e referencie aqui (ex.: '/instagram/photo-1.jpg')
const STATIC_POSTS: (string | null)[] = [null, null, null, null, null, null];

const InstagramSection = () => {
  return (
    <div className="py-20 text-center" style={{ background: '#FAF7F0' }}>
      <div className="px-12 pb-12">
        <div className="aurea-section-label">Follow Along</div>
        <h2 className="aurea-section-title" style={{ color: 'hsl(var(--dark-green))' }}>
          @aureajewels.18k on <em>Instagram</em>
        </h2>
        <div className="font-serif text-xl font-light text-dark-green tracking-[0.15em] mt-2">
          Tag us for a chance to be featured
        </div>
      </div>
      <div className="grid grid-cols-6 max-lg:grid-cols-3">
        {STATIC_POSTS.map((src, i) => (
          <a
            key={i}
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden cursor-pointer relative group block"
          >
            {src ? (
              <img
                src={src}
                alt={`Aurea Jewels Instagram post ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
              />
            ) : (
              <div
                className="w-full h-full transition-transform duration-400 group-hover:scale-110"
                style={{ background: gradients[i] }}
              />
            )}
            <div className="absolute inset-0 bg-dark-green/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-cream-light text-[22px]">
              ♡
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramSection;
