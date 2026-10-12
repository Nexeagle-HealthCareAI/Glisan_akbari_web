import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Calendar, Mail, MessageCircle, ShieldCheck, ArrowRight, HeartPulse } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, MEDICAL_DISCLAIMER, BOOKING_URL } from '../data/config';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from './PlaceholderSlot';

interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1B3D] text-slate-300 text-left font-sans relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500" />
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-teal-500 blur-[150px] opacity-10 pointer-events-none rounded-full" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 blur-[150px] opacity-10 pointer-events-none rounded-full" />

      {/* Pre-footer Appointment Banner */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          <div className="text-center lg:text-left space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Ready to schedule your urology consultation?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Take the first step towards better urological health. Book an appointment with {DOCTOR_NAME} at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 text-teal-400" />
              <span>Call {HOSPITAL_PROFILE.phone}</span>
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-[#0B1B3D] hover:bg-teal-400 transition-colors w-full sm:w-auto shadow-[0_0_15px_rgba(13,148,136,0.3)]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl font-extrabold text-white font-heading tracking-tight">
                {HOSPITAL_PROFILE.name}
              </h4>
              <div className="text-sm text-teal-300 font-medium">
                <PlaceholderSlot text={HOSPITAL_PROFILE.description} variant="inline" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Super speciality healthcare hospital in <strong className="text-slate-200">{HOSPITAL_SHORT_ADDRESS}</strong>, serving patients across {HOSPITAL_CITY} and surrounding regions in Bihar.
              </p>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 space-y-2 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-2">
                <span className="text-slate-400 font-medium shrink-0">Lead Doctor</span>
                <span className="text-white font-bold text-right">{DOCTOR_NAME}</span>
              </div>
              <div className="flex items-start justify-between gap-4 pt-1">
                <span className="text-slate-400 font-medium shrink-0">Affiliation</span>
                <span className="text-right"><PlaceholderSlot text={DOCTOR_PROFILE.hospitalRelationship} variant="inline" /></span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6 lg:pl-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-teal-500" /> Navigation
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Doctors', path: '/doctors' },
                { name: 'Urology Services', path: '/services' },
                { name: 'Conditions We Treat', path: '/conditions' },
                { name: 'Treatments & Procedures', path: '/treatments' },
                { name: HOSPITAL_NAME, path: '/hospital' },
                { name: 'Patient Reviews', path: '/reviews' },
                { name: 'FAQ', path: '/faqs' },
                { name: 'Contact & Location', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-500" /> Location
            </h4>
            <div className="space-y-4">
              <div className="text-sm text-slate-300">
                <p className="font-bold text-white mb-2">{HOSPITAL_PROFILE.name}</p>
                <address className="not-italic leading-relaxed text-slate-400 block border-l-2 border-teal-500/30 pl-3">
                  {HOSPITAL_PROFILE.address.line1}<br />
                  {HOSPITAL_PROFILE.address.line2 && <>{HOSPITAL_PROFILE.address.line2}<br /></>}
                  {HOSPITAL_PROFILE.address.area}<br />
                  {HOSPITAL_PROFILE.address.city}, {HOSPITAL_PROFILE.address.stateAndPin}
                </address>
              </div>
              
              <div className="space-y-3 pt-2">
                <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors"><Phone className="h-3.5 w-3.5 text-teal-400" /></div>
                  <span className="font-semibold">{HOSPITAL_PROFILE.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><MessageCircle className="h-3.5 w-3.5 text-emerald-400" /></div>
                  <span><PlaceholderSlot text={HOSPITAL_PROFILE.whatsappNumber} variant="inline" /></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Mail className="h-3.5 w-3.5 text-blue-400" /></div>
                  <span><PlaceholderSlot text={HOSPITAL_PROFILE.email} variant="inline" /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Timings & Emergency */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-500" /> Timings
            </h4>
            
            <div className="rounded-2xl bg-teal-900/20 p-5 space-y-3 border border-teal-500/20">
              <p className="font-bold text-white text-sm">OPD Consultation Hours</p>
              <div className="text-teal-300 font-medium text-sm">
                <PlaceholderSlot text={HOSPITAL_PROFILE.consultationTimings} variant="inline" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-teal-500/10">
                Please call <strong className="text-slate-200">{HOSPITAL_PROFILE.phone}</strong> prior to visiting to confirm availability.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Emergency Care</p>
              <div className="text-sm text-slate-300 font-medium">
                <PlaceholderSlot text={HOSPITAL_PROFILE.emergencyInfo} variant="inline" />
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-16 rounded-2xl border border-white/5 bg-black/20 p-6 sm:p-8 text-sm text-slate-400 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-slate-800"></div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-slate-500" />
            <div className="space-y-3">
              <span className="font-bold text-white text-base block font-heading tracking-wide">Medical Disclaimer</span>
              <p className="leading-relaxed">
                The information provided on this website is for general educational and informational purposes only and does not constitute individual medical advice, clinical diagnosis, or a treatment plan. Always seek the advice of a qualified healthcare professional with any questions you may have regarding a medical condition.
              </p>
              <div className="pt-2 text-slate-500 font-medium">
                <PlaceholderSlot text={MEDICAL_DISCLAIMER} variant="inline" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 font-medium">
          <p>© {currentYear} {DOCTOR_PROFILE.name} & {HOSPITAL_PROFILE.name}. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
