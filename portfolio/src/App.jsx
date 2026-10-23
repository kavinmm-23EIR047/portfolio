import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
const CompanyChatbot = lazy(() => import("./components/CompanyChatbot"));

// Load each page only when requested so the initial visit does not download
// every page (especially the admin dashboard) up front.
const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const DeferredChatbot = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId;
    let idleCallbackId;
    const loadChatbot = () => setIsReady(true);

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(loadChatbot, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(loadChatbot, 1200);
    }

    return () => {
      if (idleCallbackId !== undefined) window.cancelIdleCallback?.(idleCallbackId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isReady) return null;
  return (
    <Suspense fallback={null}>
      <CompanyChatbot />
    </Suspense>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans flex flex-col bg-[#F1F5F9]">
      <div className="relative z-10 flex-1 flex flex-col">
        {!isAdminRoute && <Header />}

        <main className="flex-1">
          <Suspense fallback={<div role="status" className="px-6 py-16 text-center text-sm font-semibold text-slate-600">Loading page…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>

        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <DeferredChatbot />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
