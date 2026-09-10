import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useWishlistStore, WishlistItem } from '@/stores/wishlistStore';
import WishlistCaptureModal from '@/components/WishlistCaptureModal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { trackAddToWishlist } from '@/lib/metaPixel';
import { t as i18nT } from '@/i18n';

interface WishlistButtonProps {
  product: Omit<WishlistItem, 'addedAt'>;
  variant?: 'card' | 'inline';
  className?: string;
}

const WishlistButton = ({ product, variant = 'card', className }: WishlistButtonProps) => {
  const has = useWishlistStore(s => s.has(product.productId));
  const toggle = useWishlistStore(s => s.toggle);
  const customerEmail = useWishlistStore(s => s.customerEmail);
  const hasPrompted = useWishlistStore(s => s.hasPromptedCapture);
  const [captureOpen, setCaptureOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const added = toggle(product);
    if (added) {
      toast.success(i18nT().wishlist.saved, { description: product.title, position: 'top-center' });
      trackAddToWishlist(
        { id: product.productId, name: product.title, value: parseFloat(product.price) || undefined, currency: 'USD' },
        customerEmail ? { email: customerEmail } : undefined,
      );
      if (!customerEmail && !hasPrompted) {
        setCaptureOpen(true);
      }
    } else {
      toast(i18nT().wishlist.removed, { description: product.title, position: 'top-center' });
    }
  };

  if (variant === 'inline') {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          aria-label={has ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={has}
          className={cn(
            'inline-flex items-center justify-center gap-2 px-4 py-3 border text-xs tracking-[0.15em] uppercase font-sans transition-colors cursor-pointer',
            has
              ? 'border-gold bg-gold-pale text-dark-green'
              : 'border-gold/30 bg-transparent text-warm-black hover:border-gold hover:text-dark-green',
            className,
          )}
        >
          <Heart
            className={cn('w-4 h-4 transition-all', has && 'fill-wishlist-red text-wishlist-red')}
          />
          {has ? i18nT().pdp.savedWishlist : i18nT().pdp.saveWishlist}
        </button>
        <WishlistCaptureModal open={captureOpen} onClose={() => setCaptureOpen(false)} />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={has ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={has}
        className={cn(
          'absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center cursor-pointer transition-all border',
          has
            ? 'bg-cream-light border-gold opacity-100'
            : 'bg-cream-light/85 border-gold/25 hover:border-gold opacity-100 md:opacity-0 md:group-hover:opacity-100',
          className,
        )}
      >
        <Heart
          className={cn(
            'w-4 h-4 transition-all',
            has ? 'fill-wishlist-red text-wishlist-red scale-110' : 'text-warm-black',
          )}
        />
      </button>
      <WishlistCaptureModal open={captureOpen} onClose={() => setCaptureOpen(false)} />
    </>
  );
};

export default WishlistButton;
