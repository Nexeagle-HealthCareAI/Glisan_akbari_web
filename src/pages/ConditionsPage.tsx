import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, AlertTriangle, ChevronRight, Activity, Stethoscope, Clock } from 'lucide-react';
import { PATIENT_CONDITIONS, DOCTOR_PROFILE, HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface ConditionsPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string) => void;
  initialConditionId?: string;
}

export const ConditionsPage: React.FC<ConditionsPageProps> = ({
  initialConditionId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialConditionId || PATIENT_CONDITIONS[0].id
  );

  const currentCondition =
    PATIENT_CONDITIONS.find((c) => c.id === selectedId) || PATIENT_CONDITIONS[0];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as any;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  } as any;

  return (
    <div className="bg-slate-50 min-h-screen text-left font-sans">
      {/* Premium Header */}
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[120%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex justify-center items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Conditions</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Conditions We <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Help With</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Clear, non-sensational patient guides to common urological issues. Always consult a qualified physician for personalized clinical evaluation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Horizontal Pills */}
          <div className="block lg:hidden overflow-x-auto pb-6 -mx-4 px-4 scrollbar-none mb-4">
            <div className="flex gap-3 min-w-max">
              {PATIENT_CONDITIONS.map((cond, idx) => {
                const isActive = cond.id === currentCondition.id;
                return (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setSelectedId(cond.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shadow-sm ${
                      isActive
                        ? 'bg-teal-600 text-white border-transparent'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#0B1B3D]'
                    }`}
                  >
                    <span className="font-mono text-[10px] mr-2 opacity-70">0{idx + 1}</span>
                    <span>{cond.name.replace('[PLACEHOLDER: INSERT ', '').replace(']', '').slice(0, 24)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            
            {/* Desktop Left Nav */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block lg:col-span-4 sticky top-8 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 block mb-4">
                  Patient Conditions Directory
                </span>
                <div className="space-y-2">
                  {PATIENT_CONDITIONS.map((cond, idx) => {
                    const isActive = cond.id === currentCondition.id;
                    return (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setSelectedId(cond.id)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-all text-left cursor-pointer group ${
                          isActive
                            ? 'bg-teal-50 text-teal-700 shadow-inner'
                            : 'bg-transparent text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                            {idx + 1}
                          </span>
                          <span className="truncate max-w-[200px]">{cond.name}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'text-teal-600 translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-teal-500/20 bg-[#0B1B3D] p-6 text-white text-center relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                 <Stethoscope className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                 <span className="font-bold text-lg font-heading block mb-2">Personal Consultation</span>
                 <p className="text-slate-300 text-sm leading-relaxed mb-6">
                   Every individual case requires careful diagnostic review. Schedule an appointment at {HOSPITAL_NAME} for comprehensive care.
                 </p>
                 <a href={BOOKING_URL} className="w-full inline-block rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-[#0B1B3D] hover:bg-teal-400 transition-colors shadow-md text-center">
                   Book Consultation
                 </a>
              </div>
            </motion.div>

            {/* Right Column: Content Detail */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-8">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentCondition.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.4 }}
                   className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-xl space-y-10 relative overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                   
                   <div className="space-y-4 relative z-10 border-b border-slate-100 pb-8">
                     <div className="flex items-center gap-3">
                       <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 uppercase tracking-wider">
                         Patient Guide
                       </span>
                       <span className="text-slate-300">·</span>
                       <span className="text-xs font-bold text-slate-400">
                         Urology Care · {HOSPITAL_NAME}
                       </span>
                     </div>
                     <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] font-heading leading-tight">
                       <PlaceholderSlot text={currentCondition.name} variant="inline" />
                     </h2>
                   </div>

                   <div className="space-y-4 relative z-10">
                     <h3 className="text-lg font-bold text-[#0B1B3D] flex items-center gap-2"><Activity className="w-5 h-5 text-teal-500" /> What is this condition?</h3>
                     <p className="text-base text-slate-600 leading-relaxed font-medium">{currentCondition.description}</p>
                     <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-100">{currentCondition.evaluationNote}</p>
                   </div>

                   <div className="space-y-4 relative z-10">
                     <h3 className="text-lg font-bold text-[#0B1B3D]">Common Symptoms to Watch For:</h3>
                     <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                         {currentCondition.commonSymptoms.map((sym, i) => (
                           <li key={i} className="flex items-start gap-3">
                             <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></div>
                             <span>{sym}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                     <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                       <span className="font-bold text-[#0B1B3D] block mb-3 text-lg">Why Consult a Specialist:</span>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{currentCondition.whyConsult}</p>
                     </div>
                     <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                       <span className="font-bold text-[#0B1B3D] block mb-3 text-lg">Treatments Overview:</span>
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{currentCondition.treatmentsOverview}</p>
                     </div>
                   </div>

                   <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 relative z-10 flex items-start gap-4">
                     <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-0.5"><AlertTriangle className="h-5 w-5 text-amber-600" /></div>
                     <div className="space-y-2">
                       <span className="font-bold text-amber-900 text-lg block">When to Consult a Urologist:</span>
                       <p className="text-sm text-amber-800/80 leading-relaxed font-medium">
                         If you experience severe flank pain, burning during urination, visible blood in the urine, or persistent urinary hesitation, prompt medical evaluation is recommended.
                       </p>
                     </div>
                   </div>

                   <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 bg-slate-50 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 px-6 py-8 sm:px-10">
                     <div>
                       <p className="text-sm font-bold text-[#0B1B3D] mb-1">Ready to consult with {DOCTOR_PROFILE.name}?</p>
                       <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> OPD consultations at {HOSPITAL_PROFILE.name}</p>
                     </div>
                     <div className="flex items-center gap-3 w-full sm:w-auto">
                       <a href={BOOKING_URL} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-md">
                         <Calendar className="h-4 w-4" /> Book Appointment
                       </a>
                       <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                         <Phone className="h-4 w-4 text-teal-600" /> Call Desk
                       </a>
                     </div>
                   </div>
                 </motion.div>
               </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
