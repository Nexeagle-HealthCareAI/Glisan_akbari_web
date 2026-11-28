import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Header,
  Footer,
  MobileActions,
  SiteMotionProvider,
} from "./components/SiteDesign";
import "./pages/SiteDesign.css";
import "./pages/CareUpdates.css";

import { PageMeta } from "./components/PageMeta";

// Pages
import { HomePage } from "./pages/HomePage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { DoctorProfilePage } from "./pages/DoctorProfilePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ConditionsPage } from "./pages/ConditionsPage";
import { ExploreCarePage } from "./pages/ExploreCarePage";
import { SitemapPage } from "./pages/SitemapPage";
import { NeurologyTopicPage } from './pages/NeurologyPages';
import { CareServiceRoute } from './pages/ServicePage';
import { BlogsPage, BlogPostPage } from "./pages/BlogsPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CampsPage } from "./pages/CampsPage";
import { AreasPage, AreaPage } from "./pages/AreasPage";
import { PreviewPage } from "./pages/PreviewPage";
import { NoticeBar } from "./components/SiteContentBlocks";
import { LOCATION_CONTENT, UPCOMING_CAMPS } from "./data/content";
import { ROUTE_REDIRECTS, getRouteRedirect } from "./data/routes";
import { CARE_DEPARTMENTS, careDepartmentPath } from "./data/careDepartments";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Static hosts without redirect rules still support existing shared links.
  useEffect(() => {
    const target = getRouteRedirect(location.pathname, location.search);
    if (target) navigate(target + location.hash, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  const handleOpenBooking = () => {
    navigate("/doctors");
  };

  // Backward compatibility: seamlessly redirect legacy hash links (#about -> /doctors)
  useEffect(() => {
    if (typeof window !== "undefined" && location.pathname === "/" && window.location.hash) {
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
        services: "/services/urologist-in-purnia",
        conditions: "/services/urologist-in-purnia",
        treatments: "/services/urologist-in-purnia",
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

  // The CRM's /preview page can show draft hospital details: draw everything again when it does.
  const [, redraw] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    window.addEventListener('site-preview', redraw);
    return () => window.removeEventListener('site-preview', redraw);
  }, []);

  return (
    <SiteMotionProvider>
      {/* Dynamic SEO Title, Description, and Canonical URL synchronizer */}
      <PageMeta />

      {/* Notices from the CRM (content/notices.json), only while current */}
      {!location.pathname.startsWith("/preview") && <NoticeBar />}

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
            path="/services/urologist-in-purnia"
            element={<ConditionsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage onOpenBooking={handleOpenBooking} />}
          />
          <Route path="/services/neurology/:slug" element={<NeurologyTopicPage />} />
          {['ent', 'general-medicine', 'anesthesiology'].map(department => <Route key={department} path={'/services/' + department + '/:slug'} element={<CareServiceRoute />} />)}
          {CARE_DEPARTMENTS.filter((department) => department.id !== 'urology').map((department) => (
            <Route key={department.id} path={careDepartmentPath(department.id)}
              element={<ConditionsPage onOpenBooking={handleOpenBooking} />} />
          ))}
          <Route path="/explore-care" element={<ExploreCarePage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          {UPCOMING_CAMPS.length > 0 && <Route path="/health-camps" element={<CampsPage />} />}
          <Route path="/preview" element={<PreviewPage />} />
          {LOCATION_CONTENT.length > 0 && <Route path="/areas" element={<AreasPage />} />}
          {LOCATION_CONTENT.length > 0 && <Route path="/areas/:slug" element={<AreaPage />} />}
          {Object.entries(ROUTE_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate
              to={(getRouteRedirect(location.pathname, location.search) || to) + location.hash} replace />} />
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
