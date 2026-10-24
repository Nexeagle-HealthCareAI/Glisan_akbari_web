import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Header,
  Footer,
  MobileActions,
  SiteMotionProvider,
} from "./components/SiteDesign";
import "./pages/SiteDesign.css";

import { PageMeta } from "./components/PageMeta";

// Pages
import { HomePage } from "./pages/HomePage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { DoctorProfilePage } from "./pages/DoctorProfilePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ConditionsPage } from "./pages/ConditionsPage";
import { ExploreCarePage } from "./pages/ExploreCarePage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTE_REDIRECTS } from "./data/seo";

export default function App() {
  const navigate = useNavigate();

  const handleOpenBooking = () => {
    navigate("/doctors");
  };

  // Backward compatibility: seamlessly redirect legacy hash links (#about -> /doctors)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash === "book" || hash === "book-appointment") {
        navigate("/doctors", { replace: true });
        return;
      }
      const hashMap: Record<string, string> = {
        home: "/",
        about: "/doctors",
        doctor: "/doctors",
        doctors: "/doctors",
        how: "/doctors",
        services: "/services",
        conditions: "/services",
        treatments: "/services",
        hospital: "/contact",
        faqs: "/faqs",
        contact: "/contact",
        privacy: "/privacy-policy",
        "privacy-policy": "/privacy-policy",
        terms: "/terms",
      };
      if (hashMap[hash]) {
        navigate(hashMap[hash], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <SiteMotionProvider>
      {/* Dynamic SEO Title, Description, and Canonical URL synchronizer */}
      <PageMeta />

      {/* Top Header */}
      <Header />

      {/* Main Page View with Real Routes */}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenBooking={handleOpenBooking} />}
          />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route
            path="/doctors/dr-md-taquedis-noori"
            element={<DoctorProfilePage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/services"
            element={<ConditionsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage onOpenBooking={handleOpenBooking} />}
          />
          <Route path="/explore-care" element={<ExploreCarePage />} />
          <Route path="/faqs" element={<FaqPage />} />
          {Object.entries(ROUTE_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      <MobileActions />
    </SiteMotionProvider>
  );
}
