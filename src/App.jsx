import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/common/Loading.jsx";

// Pages frontend utama
import HomePage from "@/pages/home/HomePage.jsx";
import AboutPage from "@/pages/about/AboutPage.jsx";
import ServicePage from "@/pages/services/ServicePage.jsx";
import PortfolioPage from "@/pages/portfolio/PortfolioPage.jsx";
import ContactPage from "@/pages/contact/ContactPage.jsx";
import NotFoundPage from "@/pages/notfound/NotFoundPage.jsx";
import BlogPage from "@/pages/blog/BlogPage.jsx";
import StudioRedirect from "@/Studio.jsx";
import BlogDetail from "@/pages/blog/BlogDetail.jsx";

// Services subpages
import FotografiPage from "@/pages/services/FotografiPage.jsx";
import VideoProductionPage from "@/pages/services/VideoProductionPage.jsx";
import FilmProduction from "@/pages/services/FilmProduction.jsx";

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
        <Route path="/" element={<PageWrapper></PageWrapper>} />
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

        {/* Services */}
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
