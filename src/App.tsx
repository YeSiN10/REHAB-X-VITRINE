import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/rehabx/Header";
import { Footer } from "@/components/rehabx/Footer";
import { Home } from "./pages/Home";
import { SolutionPage } from "./pages/SolutionPage";
import { IndicationsPage } from "./pages/IndicationsPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ClientsPage } from "./pages/ClientsPage";
import { DemoRequestPage } from "./pages/DemoRequestPage";
import { RehabXMobileAppPage } from "./pages/RehabXMobileAppPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./i18n/LanguageContext";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="size-full bg-background overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/solutions/:solutionId" element={<SolutionPage />} />
            <Route path="/solutions/mobile" element={<RehabXMobileAppPage />} />
            <Route path="/indications" element={<IndicationsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/demo" element={<DemoRequestPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
