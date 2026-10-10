import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, MapPin, Building2, ExternalLink, Activity, ShieldCheck, Mail, MessageCircle, Clock } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const ContactPage: React.FC = () => {
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
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[120%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Contact & Location</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Touch</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Book an appointment, inquire about hospital facilities, or find directions to {HOSPITAL_NAME} in {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl space-y-8">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-bold text-xl text-[#0B1B3D]">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl"><Building2 className="h-6 w-6" /></div>
                    <span>Hospital Location</span>
                  </div>
                  <div className="pl-14 space-y-2">
                    <p className="font-bold text-slate-900">{HOSPITAL_PROFILE.name}</p>
                    <address className="not-italic text-slate-600 text-sm leading-relaxed">
                      {HOSPITAL_PROFILE.address.line1}<br />
                      {HOSPITAL_PROFILE.address.line2 && <>{HOSPITAL_PROFILE.address.line2}<br /></>}
                      {HOSPITAL_PROFILE.address.area}<br />
                      {HOSPITAL_PROFILE.address.city}, {HOSPITAL_PROFILE.address.stateAndPin}
                    </address>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-bold text-xl text-[#0B1B3D]">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl"><Phone className="h-6 w-6" /></div>
                    <span>Contact Directory</span>
                  </div>
                  <div className="pl-14 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-500">Reception:</span>
                      <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="font-bold text-teal-700 hover:underline">{HOSPITAL_PROFILE.phone}</a>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-500">WhatsApp:</span>
                      <span className="font-semibold text-slate-800"><PlaceholderSlot text={HOSPITAL_PROFILE.whatsappNumber} variant="inline" /></span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-500">Email:</span>
                      <span className="font-semibold text-slate-800"><PlaceholderSlot text={HOSPITAL_PROFILE.email} variant="inline" /></span>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-bold text-xl text-[#0B1B3D]">
                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><Clock className="h-6 w-6" /></div>
                    <span>Consultation Hours</span>
                  </div>
                  <div className="pl-14">
                    <p className="text-sm font-semibold text-slate-700"><PlaceholderSlot text={HOSPITAL_PROFILE.consultationTimings} variant="inline" /></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Area */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-100 bg-white p-2 shadow-sm overflow-hidden h-[600px] flex flex-col items-center justify-center bg-slate-100">
                  <MapPin className="w-16 h-16 text-slate-300 mb-4" />
                  <p className="text-slate-500 font-semibold">Interactive Map Placeholder</p>
                  <p className="text-slate-400 text-sm mt-2 text-center max-w-md">Integrate Google Maps embed iframe here pointing to {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
