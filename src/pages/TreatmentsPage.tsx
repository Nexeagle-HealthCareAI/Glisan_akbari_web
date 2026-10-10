import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, Activity, ShieldCheck, ArrowRight, Stethoscope } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, UROLOGY_SERVICES } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface TreatmentsPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = () => {
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
          <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[120%] bg-teal-400 blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex justify-center items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Treatments & Procedures</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Urological <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Treatments</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Evidence-based medical management and procedural care conducted at {HOSPITAL_NAME}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl border border-teal-200 bg-teal-50/50 backdrop-blur-md p-6 sm:p-8 flex items-start sm:items-center gap-5 shadow-sm">
            <div className="bg-teal-100 p-3 rounded-2xl shrink-0"><ShieldCheck className="h-8 w-8 text-teal-700" /></div>
            <div className="space-y-2 text-teal-950">
              <span className="font-bold text-lg sm:text-xl font-heading block text-[#0B1B3D]">Clinical Practice Standards</span>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 max-w-4xl">
                No surgical or interventional procedure is recommended without personal clinical examination and verified diagnostic confirmation (ultrasound, blood work, or imaging). All treatments are discussed transparently with patients and families.
              </p>
              <div className="inline-block mt-2 text-xs font-semibold bg-white px-3 py-1.5 rounded-lg border border-teal-100">
                <PlaceholderSlot text="[PLACEHOLDER: INSERT VERIFIED PROCEDURES AND TREATMENT PROTOCOLS]" variant="inline" />
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {UROLOGY_SERVICES.map((srv, idx) => (
              <motion.div variants={fadeIn} key={srv.id} className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-300">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-md">
                      PROCEDURE {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#0B1B3D] font-heading group-hover:text-teal-700 transition-colors">
                      <PlaceholderSlot text={srv.title} variant="inline" />
                    </h3>
                    <div className="text-sm text-slate-500 leading-relaxed font-medium">
                      <PlaceholderSlot text={srv.description} variant="inline" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 space-y-1">
                    <p className="font-bold text-[#0B1B3D] flex items-center gap-2">
                       <Activity className="w-4 h-4 text-teal-500" /> Pre-Consultation Checklist
                    </p>
                    <p className="text-xs leading-relaxed pl-6">Carry previous investigation reports, ultrasound, and current prescriptions.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <Link to="/book-appointment" className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-500 hover:text-white transition-colors">
                    Consult for This <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#0B1B3D] transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    Call Desk
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
