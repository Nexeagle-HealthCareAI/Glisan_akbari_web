import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, MessageCircle, Building2, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';
import { HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const BookAppointmentPage: React.FC = () => {
  useEffect(() => {
    // Automatically redirect to the dedicated Doctor Dekho booking system
    if (typeof window !== 'undefined') {
      window.location.href = BOOKING_URL;
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-left font-sans">
      {/* Header Banner */}
      <section className="relative py-14 sm:py-20 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-teal-400 blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Book an Appointment</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Redirecting to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Appointment Portal</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Appointment scheduling for <strong className="text-white font-medium">{DOCTOR_PROFILE.name}</strong> is managed online via Doctor Dekho.
            </p>
          </div>
        </div>
      </section>

      {/* Main Redirection Box */}
      <section className="py-12 sm:py-16 relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl text-center space-y-6"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-inner">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#0B1B3D] font-heading">
                Opening Appointment Booking
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                You are being redirected to our official booking portal at{' '}
                <span className="font-semibold text-teal-700">doctordekho.nexeagle.com</span>.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={BOOKING_URL}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-400 px-8 py-4 text-base font-bold text-[#0B1B3D] transition-all shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:scale-105"
              >
                <span>Continue to Booking Portal</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Need Immediate Help?
                </span>
                <a
                  href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 font-bold text-teal-700 hover:text-teal-800 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {HOSPITAL_PROFILE.phone}</span>
                </a>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Location
                </span>
                <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
