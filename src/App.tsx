import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ConditionsPage } from "./pages/ConditionsPage";
import { TreatmentsPage } from "./pages/TreatmentsPage";
import { HospitalPage } from "./pages/HospitalPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { FaqPage } from "./pages/FaqPage";
import { BookAppointmentPage } from "./pages/BookAppointmentPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const navigate = useNavigate();

  const handleOpenBooking = () => {
    navigate("/book-appointment");
  };

  // Backward compatibility: seamlessly redirect legacy hash links (#about -> /doctors)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash === "book" || hash === "book-appointment") {
        navigate("/book-appointment", { replace: true });
        return;
      }
      const hashMap: Record<string, string> = {
        home: "/",
        about: "/doctors",
        doctors: "/doctors",
        services: "/services",
        conditions: "/conditions",
        treatments: "/treatments",
        hospital: "/hospital",
        reviews: "/reviews",
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
            element={<ServicesPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/conditions"
            element={<ConditionsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/treatments"
            element={<TreatmentsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/hospital"
            element={<HospitalPage onOpenBooking={handleOpenBooking} />}
          />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
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
