import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useUIStore } from '@/stores/uiStore';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const cartOpen = useUIStore(s => s.cartOpen);
  const setCartOpen = useUIStore(s => s.setCartOpen);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
