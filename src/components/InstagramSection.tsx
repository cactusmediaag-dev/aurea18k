import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const gradients = [
  'linear-gradient(135deg, #C8A86A 30%, #A88840 100%)',
  'linear-gradient(135deg, #B89878 20%, #987858 100%)',
  'linear-gradient(135deg, #8A9878 30%, #6A7858 100%)',
  'linear-gradient(135deg, #D4B870 30%, #B49850 100%)',
  'linear-gradient(135deg, #9A8868 20%, #7A6848 100%)',
  'linear-gradient(135deg, #A8B880 30%, #88985E 100%)',
];

type IGPost = {
  id: string;
  permalink: string;
  caption: string;
  mediaType: string;
  imageUrl: string;
  timestamp: string;
};

const PROFILE_URL = 'https://www.instagram.com/aureajewels.18k/';

const InstagramSection = () => {
  const { data } = useQuery<{ posts: IGPost[] }>({
    queryKey: ['instagram-posts'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-instagram-posts');
      if (error) return { posts: [] };
      return data || { posts: [] };
    },
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  const posts = data?.posts ?? [];
  const items = Array.from({ length: 6 }, (_, i) => posts[i] ?? null);

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
        {items.map((post, i) => (
          <a
            key={post?.id ?? i}
            href={post?.permalink ?? PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden cursor-pointer relative group block"
          >
            {post ? (
              <img
                src={post.imageUrl}
                alt={post.caption?.slice(0, 100) || 'Aurea Jewels Instagram post'}
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
