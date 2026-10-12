import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Calendar, Quote } from 'lucide-react';
import { TRUST_STRIP_DATA, TESTIMONIALS, GOOGLE_REVIEWS_URL_PLACEHOLDER, DOCTOR_PROFILE, HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';
import { HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const ReviewsPage: React.FC = () => {
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
          <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[80%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex justify-center items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Patient Reviews</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Feedback</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Real feedback from patients consulting with {DOCTOR_PROFILE.name} at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl border border-teal-200 bg-teal-50/80 backdrop-blur-md p-6 sm:p-8 flex items-start sm:items-center gap-5 shadow-sm">
            <div className="bg-teal-100 p-3 rounded-2xl shrink-0"><ShieldCheck className="h-8 w-8 text-teal-700" /></div>
            <div className="space-y-1 text-teal-950">
              <span className="font-bold text-lg sm:text-xl font-heading block text-[#0B1B3D]">Ethical Healthcare Review Policy</span>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 max-w-4xl">
                We never fabricate or purchase patient testimonials. Medical decisions require genuine, unadulterated patient experiences. Official verified testimonials and live Google reviews can be verified on our official profile.
              </p>
            </div>
          </motion.div>

          {/* Google Rating Overview Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-8 text-center sm:text-left">
                <div className="text-[#0B1B3D] space-y-1 border-r border-slate-100 pr-8 hidden sm:block">
                   <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Google Rating</p>
                   <p className="text-xl font-bold font-heading">Business Profile</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <span className="text-5xl sm:text-6xl font-extrabold text-[#0B1B3D] font-heading">{TRUST_STRIP_DATA.googleRating}</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (<Star key={s} className="h-5 w-5 fill-amber-400" />))}
                      </div>
                      <p className="text-sm font-bold text-slate-500">{TRUST_STRIP_DATA.googleReviewCount} Reviews</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400"><PlaceholderSlot text={TRUST_STRIP_DATA.googleReviewCountPlaceholder} variant="inline" /></div>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-2 max-w-sm">
                  <span className="font-bold text-[#0B1B3D] text-sm block">Verified Google Review URL:</span>
                  <div className="text-xs text-slate-500 font-mono break-all bg-white p-2 rounded-lg border border-slate-200"><PlaceholderSlot text={GOOGLE_REVIEWS_URL_PLACEHOLDER} variant="inline" /></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Verified Reviews Grid */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div variants={fadeIn} key={t.id} className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                      {t.verifiedPatientBadge}
                    </span>
                    <Quote className="w-8 h-8 text-slate-100 group-hover:text-teal-100 transition-colors" />
                  </div>
                  
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium italic">
                    "<PlaceholderSlot text={t.placeholderText} variant="inline" />"
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                    0{idx + 1}
                  </div>
                  <p className="text-xs font-semibold text-slate-400">Attributable verified patient review</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-3xl border border-teal-500/20 bg-[#0B1B3D] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden text-center sm:text-left shadow-2xl">
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white font-heading mb-2">Schedule Your Urology Consultation</h3>
              <p className="text-sm text-teal-300 font-medium">Consult with {DOCTOR_PROFILE.name} at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.</p>
            </div>
            <a href={BOOKING_URL} className="relative z-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 px-8 py-4 text-sm font-bold text-[#0B1B3D] hover:bg-teal-400 transition-all shadow-[0_0_15px_rgba(13,148,136,0.3)] hover:scale-105">
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
