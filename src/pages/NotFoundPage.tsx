import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Phone, ArrowLeft, ShieldAlert } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';
import { DOCTOR_NAME } from '../data/identity';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Error icon badge */}
        <div className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 shadow-xs">
          <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-teal-800" />
        </div>

        {/* Exactly One H1 tag */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-800">
            Error 404
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn’t exist or has moved. Return to the homepage or explore {DOCTOR_NAME}’s urology services below.
          </p>
        </div>

        {/* Real navigation links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-teal-900 active:scale-98 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>

          <a
            href={BOOKING_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-teal-800 bg-white px-5 py-3 text-sm font-semibold text-teal-900 hover:bg-teal-50 active:scale-98 transition-all"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Appointment</span>
          </a>
        </div>

        {/* Additional helpful links */}
        <div className="pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-3">Popular sections:</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-700">
            <Link to="/doctors" className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              Our Doctors
            </Link>
            <Link to="/services" className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              Urology Services
            </Link>
            <Link to="/conditions" className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              Conditions We Treat
            </Link>
            <Link to="/hospital" className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              Hospital Overview
            </Link>
            <Link to="/contact" className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors">
              Contact & Location
            </Link>
          </div>
        </div>

        {/* Direct desk phone */}
        <p className="text-xs text-slate-500 pt-2">
          Need immediate assistance? Call reception directly at{' '}
          <a
            href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
            className="font-bold text-teal-800 hover:underline"
          >
            {HOSPITAL_PROFILE.phone}
          </a>
        </p>
      </div>
    </div>
  );
};
