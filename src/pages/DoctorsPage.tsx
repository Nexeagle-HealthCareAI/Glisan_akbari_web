import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, ArrowRight, Award, ShieldCheck, Activity, MapPin } from 'lucide-react';
import { DOCTORS, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { MediaPlaceholder } from '../components/MediaPlaceholder';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const DoctorsPage: React.FC = () => {
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
      
      {/* Premium Page Header */}
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-[#1e3a5f] blur-[150px] opacity-40 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Our Doctors</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Team</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Meet the highly qualified urologists and clinical specialists practicing at {HOSPITAL_NAME}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.map((doctor) => {
              const isClickable = doctor.isClickable && Boolean(doctor.slug);

              return (
                <motion.div
                  variants={fadeIn}
                  key={doctor.id}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-[4/3]">
                      <MediaPlaceholder
                        placeholderText={doctor.profileImagePlaceholder}
                        type="doctor"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                         <span className="bg-teal-500 text-[#0B1B3D] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                           <PlaceholderSlot text={doctor.department} variant="inline" />
                         </span>
                         {doctor.label && (
                           <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/20">
                             {doctor.label}
                           </span>
                         )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1 flex flex-col">
                    <div className="space-y-1 flex-1">
                      <h2 className="text-2xl font-bold text-[#0B1B3D] font-heading group-hover:text-teal-600 transition-colors">
                        {isClickable ? (
                          <Link to={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
                        ) : (
                          <PlaceholderSlot text={doctor.name} variant="inline" />
                        )}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500">
                        <PlaceholderSlot text={doctor.qualifications} variant="inline" />
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                      <div className="flex items-start gap-2 text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                        <span><span className="font-bold text-slate-800">Reg:</span> <PlaceholderSlot text={doctor.medicalRegistration} variant="inline" /></span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <Award className="w-4 h-4 text-teal-500 shrink-0" />
                        <span><span className="font-bold text-slate-800">Exp:</span> <PlaceholderSlot text={doctor.yearsOfExperience} variant="inline" /></span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <Activity className="w-4 h-4 text-teal-500 shrink-0" />
                        <span><span className="font-bold text-slate-800">Time:</span> <PlaceholderSlot text={doctor.consultationTimings} variant="inline" /></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                    <Link
                      to="/book-appointment"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1B3D] py-3 px-4 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Appointment</span>
                    </Link>
                    {isClickable && doctor.slug && (
                      <Link
                        to={`/doctors/${doctor.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm font-bold text-[#0B1B3D] hover:bg-slate-50 transition-all"
                      >
                        <span>View Full Profile</span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
