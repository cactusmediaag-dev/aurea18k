import { useEffect } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LanguageSuggestionBanner from '@/components/LanguageSuggestionBanner';
import { useUIStore } from '@/stores/uiStore';
import { useLang } from '@/i18n';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const cartOpen = useUIStore(s => s.cartOpen);
  const setCartOpen = useUIStore(s => s.setCartOpen);
  const lang = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      {children}
      <Footer />
      <LanguageSuggestionBanner />
    </div>
  );
};

export default PageLayout;
