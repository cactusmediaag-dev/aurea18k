import post1 from '@/assets/instagram/post-1.jpg';
import post2 from '@/assets/instagram/post-2.jpg';
import post3 from '@/assets/instagram/post-3.jpg';
import post4 from '@/assets/instagram/post-4.jpg';
import post5 from '@/assets/instagram/post-5.jpg';
import post6 from '@/assets/instagram/post-6.jpg';

const PROFILE_URL = 'https://www.instagram.com/aureajewels.18k/';

const STATIC_POSTS = [post1, post2, post3, post4, post5, post6];

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
            onClick={(e) => {
              e.preventDefault();
              window.open(PROFILE_URL, '_blank', 'noopener,noreferrer');
            }}
            className="aspect-square overflow-hidden cursor-pointer relative group block"
          >
            <img
              src={src}
              alt={`Aurea Jewels Instagram post ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
            />
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
