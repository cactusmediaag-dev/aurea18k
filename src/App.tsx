import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import Accessibility from "./pages/Accessibility.tsx";
import CookiePolicy from "./pages/CookiePolicy.tsx";
import ReviewsPage from "./pages/Reviews.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import ShippingReturns from "./pages/ShippingReturns.tsx";
import NotFound from "./pages/NotFound.tsx";
import Collections from "./pages/Collections.tsx";
import Collection from "./pages/Collection.tsx";
import BundleBuilder from "./pages/BundleBuilder.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:handle" element={<Collection />} />
      <Route path="/bundle/:type" element={<BundleBuilder />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/shipping-returns" element={<ShippingReturns />} />
      <Route path="/cart/*" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
