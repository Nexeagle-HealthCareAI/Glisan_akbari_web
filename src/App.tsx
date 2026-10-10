import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BookingModal } from './components/BookingModal';
import { WhatsAppNoticeModal } from './components/WhatsAppNoticeModal';
import { PageMeta } from './components/PageMeta';

// Pages
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { ServicesPage } from './pages/ServicesPage';
import { ConditionsPage } from './pages/ConditionsPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { HospitalPage } from './pages/HospitalPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const navigate = useNavigate();

  // Backward compatibility: seamlessly redirect legacy hash links (#about -> /doctors)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const hashMap: Record<string, string> = {
        home: '/',
        about: '/doctors',
        doctors: '/doctors',
        services: '/services',
        conditions: '/conditions',
        treatments: '/treatments',
        hospital: '/hospital',
        reviews: '/reviews',
        faqs: '/faqs',
        book: '/book-appointment',
        'book-appointment': '/book-appointment',
        contact: '/contact',
        privacy: '/privacy-policy',
        'privacy-policy': '/privacy-policy',
        terms: '/terms',
      };
      if (hashMap[hash]) {
        navigate(hashMap[hash], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 pb-20 lg:pb-0 w-full max-w-full">
      {/* Dynamic SEO Title, Description, and Canonical URL synchronizer */}
      <PageMeta />

      {/* Top Header */}
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Page View with Real Routes */}
      <main className="flex-1 w-full max-w-full">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={() => setIsBookingOpen(true)}
                onOpenWhatsAppNotice={() => setIsWhatsAppOpen(true)}
              />
            }
          />
          <Route
            path="/doctors"
            element={<DoctorsPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/doctors/dr-md-taquedis-noori"
            element={<DoctorProfilePage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/conditions"
            element={<ConditionsPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/treatments"
            element={<TreatmentsPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/hospital"
            element={<HospitalPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/reviews"
            element={<ReviewsPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/faqs"
            element={<FaqPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route
            path="/contact"
            element={<ContactPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Comprehensive Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Mobile Sticky Action Bar */}
      <StickyMobileBar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenWhatsAppNotice={() => setIsWhatsAppOpen(true)}
      />

      {/* Quick Booking Overlay Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* WhatsApp Action Notice Modal */}
      <WhatsAppNoticeModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </div>
  );
}
