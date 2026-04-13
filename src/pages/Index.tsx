import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustStrip from '@/components/TrustStrip';
import CategoriesSection from '@/components/CategoriesSection';
import BestSellersSection from '@/components/BestSellersSection';
import BrandStorySection from '@/components/BrandStorySection';
import PromiseSection from '@/components/PromiseSection';
import BundleSection from '@/components/BundleSection';
import ReviewsSection from '@/components/ReviewsSection';
import InstagramSection from '@/components/InstagramSection';
import EmailCaptureSection from '@/components/EmailCaptureSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useState } from 'react';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <BestSellersSection />
      <BrandStorySection />
      <PromiseSection />
      <BundleSection />
      <ReviewsSection />
      <InstagramSection />
      <EmailCaptureSection />
      <Footer />
    </div>
  );
};

export default Index;
