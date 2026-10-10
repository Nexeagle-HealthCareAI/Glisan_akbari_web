import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, MessageCircle, MapPin, Clock, Building2, FileCheck } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { AppointmentForm } from '../components/AppointmentForm';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface BookAppointmentPageProps {
  onNavigate?: (page: string) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as any;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  } as any;

  return (
    <div className="bg-slate-50 min-h-screen text-left font-sans">
      
      {/* Premium Header */}
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-teal-400 blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Book an Appointment</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Consultation</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Schedule your consultation with <strong className="text-white font-medium">{DOCTOR_PROFILE.name}</strong> at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
                <AppointmentForm />
              </div>
            </motion.div>

            {/* Right Column: Contact & Checklist */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-5 space-y-6">
              
              <div className="rounded-3xl border border-teal-100 bg-teal-50/50 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#0B1B3D]">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <h3 className="text-xl font-bold font-heading">Direct Telephone Booking</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If you prefer to book immediately over the telephone or have an urgent query, you can reach the reception directly:
                </p>

                <div className="space-y-3">
                  <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="flex items-center justify-between rounded-2xl bg-white border border-teal-100 p-4 hover:border-teal-300 hover:shadow-md transition-all group">
                    <span className="font-semibold text-slate-600 group-hover:text-teal-700">Hospital Desk</span>
                    <span className="font-bold text-teal-700">{HOSPITAL_PROFILE.phone}</span>
                  </a>
                  <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-100 p-4">
                    <span className="font-semibold text-slate-600 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /> Appt Line</span>
                    <span className="text-sm text-slate-800 font-medium"><PlaceholderSlot text={HOSPITAL_PROFILE.officialAppointmentPhone} variant="inline" /></span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-100 p-4">
                    <span className="font-semibold text-slate-600 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-emerald-500" /> WhatsApp</span>
                    <span className="text-sm text-slate-800 font-medium"><PlaceholderSlot text={HOSPITAL_PROFILE.whatsappNumber} variant="inline" /></span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center gap-3 font-bold text-[#0B1B3D] text-lg">
                  <Building2 className="h-5 w-5 text-teal-600" />
                  <span>Consultation Location</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="font-bold text-slate-900">{HOSPITAL_PROFILE.name}</p>
                  <address className="not-italic text-slate-600 text-sm mt-1">
                    {HOSPITAL_PROFILE.address.line2}<br />
                    {HOSPITAL_PROFILE.address.area}<br />
                    {HOSPITAL_PROFILE.address.city}, {HOSPITAL_PROFILE.address.stateAndPin}
                  </address>
                </div>
                
                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">OPD Timings</p>
                    <p className="text-xs text-slate-600 mt-1"><PlaceholderSlot text={HOSPITAL_PROFILE.consultationTimings} variant="inline" /></p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-3 font-bold text-[#0B1B3D] text-lg">
                  <FileCheck className="h-5 w-5 text-teal-600" />
                  <span>What to Bring</span>
                </div>
                <ul className="space-y-3">
                  {["Previous imaging reports (Ultrasound, CT, X-ray)", "Recent urine & blood test reports", "List of current medications", "Valid government ID"].map((item, idx) => (
                     <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                       <div className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></div>
                       {item}
                     </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
