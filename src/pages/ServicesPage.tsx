import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, Info, Activity, ArrowRight, Stethoscope } from 'lucide-react';
import { UROLOGY_SERVICES, DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface ServicesPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string) => void;
  selectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  selectedServiceId,
}) => {
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
      
      {/* Page Header (Premium Dark) */}
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[100%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Urology Services</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Urology Services <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">& Treatments</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Clinical consultations, diagnostic workups, and medical management conducted by {DOCTOR_PROFILE.name} at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 sm:p-6 text-sm text-slate-700 flex items-start gap-4 shadow-sm backdrop-blur-sm">
            <div className="bg-teal-100 p-2 rounded-full text-teal-700 mt-0.5">
               <Info className="h-5 w-5 shrink-0" />
            </div>
            <div className="space-y-2">
              <span className="font-bold text-[#0B1B3D] text-base block">Verified Service Taxonomy</span>
              <p className="leading-relaxed">In strict accordance with medical accuracy guidelines, only confirmed clinical services approved by {DOCTOR_PROFILE.name} are represented below.</p>
              <div className="inline-block mt-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium">
                <PlaceholderSlot text="[PLACEHOLDER: INSERT VERIFIED SERVICE CATEGORY]" variant="inline" />
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {UROLOGY_SERVICES.map((srv, idx) => (
              <motion.div
                variants={fadeIn}
                key={srv.id}
                className={`group relative flex flex-col justify-between rounded-3xl bg-white p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden border ${
                  selectedServiceId === srv.id
                    ? 'border-teal-500 shadow-xl ring-4 ring-teal-50'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-xl'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-500">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <span className="text-slate-300 font-mono text-[10px] sm:text-[11px] bg-slate-50 px-2 py-1 rounded-md font-bold">
                      SRV {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-600">
                      <PlaceholderSlot text={srv.category} variant="inline" />
                    </div>
                    <h2 className="text-xl font-bold text-[#0B1B3D]">
                      <PlaceholderSlot text={srv.title} variant="inline" />
                    </h2>
                    <div className="text-sm text-slate-500 leading-relaxed">
                      <PlaceholderSlot text={srv.description} variant="inline" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                    <p className="font-bold text-[#0B1B3D] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-teal-500" /> Patient Guidance
                    </p>
                    <p className="leading-relaxed"><PlaceholderSlot text={srv.patientNotes} variant="inline" /></p>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-500 hover:text-white transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book for this</span>
                  </Link>

                  <a
                    href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#0B1B3D] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Reception</span>
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
