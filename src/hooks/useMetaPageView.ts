import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWishlistStore } from '@/stores/wishlistStore';
import { trackPageView, initMetaPixel } from '@/lib/metaPixel';

export function useMetaPageView() {
  const location = useLocation();
  const email = useWishlistStore(s => s.customerEmail);

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackPageView(email ? { email } : undefined);
  }, [location.pathname, location.search, email]);
}
