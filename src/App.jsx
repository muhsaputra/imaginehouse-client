import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/common/Loading";

// Pages frontend utama
import HomePage from "@/pages/home/HomePage";
import AboutPage from "@/pages/about/AboutPage";
import ServicePage from "@/pages/services/ServicePage";
import PortfolioPage from "@/pages/portfolio/PortfolioPage";
import ContactPage from "@/pages/contact/ContactPage";
import NotFoundPage from "@/pages/contact/ContactPage";
import BlogPage from "@/pages/blog/BlogPage";
import StudioRedirect from "@/Studio";
import BlogDetail from "@/pages/blog/BlogDetail";

// Services subpages
import FotografiPage from "@/pages/Services/FotografiPage";
import VideoProductionPage from "@/pages/Services/VideoProductionPage";
import FilmProduction from "@/pages/Services/FilmProduction";

// Dashboard / Login Page
import LoginPage from "@/dashboard/pages/Login";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Halaman frontend utama */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          }
        />
        <Route
          path="/service"
          element={
            <PageWrapper>
              <ServicePage />
            </PageWrapper>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageWrapper>
              <PortfolioPage />
            </PageWrapper>
          }
        />
        <Route
          path="/blog"
          element={
            <PageWrapper>
              <BlogPage />
            </PageWrapper>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageWrapper>
              <BlogDetail />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <ContactPage />
            </PageWrapper>
          }
        />
        <Route path="/studio" element={<StudioRedirect />} />
        <Route
          path="/fotografi"
          element={
            <PageWrapper>
              <FotografiPage />
            </PageWrapper>
          }
        />
        <Route
          path="/videoproduction"
          element={
            <PageWrapper>
              <VideoProductionPage />
            </PageWrapper>
          }
        />
        <Route
          path="/filmproduction"
          element={
            <PageWrapper>
              <FilmProduction />
            </PageWrapper>
          }
        />

        {/* Tambahan: Login Dashboard */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFoundPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return sessionStorage.getItem("hasLoaded") ? false : true;
  });

  useEffect(() => {
    if (isLoading) {
      const handleLoad = () => {
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("hasLoaded", "true");
        }, 500);
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="flex-grow mt-0">
          <AnimatedRoutes />
        </main>
      )}
    </div>
  );
}

export default App;
