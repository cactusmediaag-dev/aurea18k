import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { useWishlistStore } from '@/stores/wishlistStore';
import { Heart, X, ArrowLeft } from 'lucide-react';

const AccountWishlist = () => {
  const items = useWishlistStore(s => s.items);
  const remove = useWishlistStore(s => s.remove);

  return (
    <PageLayout>
      <section className="aurea-section max-w-6xl mx-auto">
        <Link to="/account" className="text-xs tracking-[0.15em] uppercase text-warm-gray hover:text-dark-green inline-flex items-center gap-2 no-underline mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to account
        </Link>
        <div className="aurea-section-label">Saved Pieces</div>
        <h1 className="aurea-section-title">My <em>Wishlist</em></h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-gold/40 mx-auto mb-4" />
            <p className="text-warm-gray text-lg font-light mb-2">Your wishlist is empty</p>
            <p className="text-warm-gray/60 text-sm mb-6">Tap the heart on any piece to save it here.</p>
            <Link to="/collections/all" className="btn-aurea-dark inline-block">Browse the collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-7 mt-10 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:gap-4">
            {items.map(item => (
              <div key={item.productId} className="group relative">
                <Link to={`/product/${item.handle}`} className="block no-underline">
                  <div className="aspect-square bg-cream overflow-hidden mb-3 relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="w-10 h-10 text-gold/30" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-dark-green mb-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-sm text-warm-black">${parseFloat(item.price).toFixed(2)}</div>
                </Link>
                <button
                  onClick={() => remove(item.productId)}
                  aria-label="Remove"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cream-light/90 border border-gold/30 flex items-center justify-center cursor-pointer hover:border-gold"
                >
                  <X className="w-3.5 h-3.5 text-warm-black" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default AccountWishlist;
