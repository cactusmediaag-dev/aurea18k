import PageLayout from '@/components/PageLayout';
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
  </PageLayout>
);

export default Index;
