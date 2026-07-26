import PageLayout from '@/components/PageLayout';
import Seo from '@/components/Seo';
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

const Index = () => (
  <PageLayout>
    <Seo
      title="Aurea Jewels | Official Website"
      description="Premium 18K gold plated jewelry designed for modern women. Hypoallergenic, durable and crafted for everyday elegance."
      path="/"
    />
    <HeroSection />
    <CategoriesSection />
    <BundleSection />
    <BestSellersSection />
    <BrandStorySection />
    <TrustStrip />
    <PromiseSection />
    <ReviewsSection />
    <InstagramSection />
    <EmailCaptureSection />
  </PageLayout>
);

export default Index;
