import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Phone, ShieldCheck, Building2, Clock, Award, Globe, FileText, MapPin } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';
import { MediaPlaceholder } from '../components/MediaPlaceholder';

interface DoctorProfilePageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string) => void;
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = () => {
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
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[120%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center gap-8 lg:gap-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1 space-y-4 max-w-2xl text-center sm:text-left">
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link>
              <span>/</span>
              <span className="text-white">{DOCTOR_NAME}</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {DOCTOR_PROFILE.name}
            </motion.h1>
            
            <motion.div variants={fadeIn} className="text-lg text-teal-400 font-medium pt-2">
              <PlaceholderSlot text={DOCTOR_PROFILE.primaryProfessionalIdentity} variant="inline" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative -mt-10 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative overflow-hidden">
            
            {/* Left Column: Portrait and Quick Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="w-full lg:w-[400px] space-y-6 shrink-0 relative z-10">
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 aspect-[3/4]">
                <MediaPlaceholder
                  placeholderText={DOCTOR_PROFILE.profileImagePlaceholder}
                  type="doctor"
                  className="w-full h-full object-cover"
                  aspectRatio="portrait"
                  subtitle={`Official Portrait · ${DOCTOR_NAME}`}
                />
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 space-y-4 shadow-sm text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 font-bold"><Building2 className="w-4 h-4 text-teal-600" /> Hospital</div>
                  <span className="font-bold text-[#0B1B3D] text-right">{HOSPITAL_PROFILE.name}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 font-bold"><MapPin className="w-4 h-4 text-teal-600" /> Location</div>
                  <span className="font-bold text-[#0B1B3D] text-right">{HOSPITAL_SHORT_ADDRESS}, Bihar</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500 font-bold">Relationship</span>
                  <div className="text-right text-[#0B1B3D] font-semibold"><PlaceholderSlot text={DOCTOR_PROFILE.hospitalRelationship} variant="inline" /></div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio and Credentials */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1 space-y-10 relative z-10">
              
              <motion.div variants={fadeIn} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading flex items-center gap-3">
                  <span className="w-8 h-1 bg-teal-500 rounded-full inline-block"></span> Clinical Focus & Introduction
                </h2>
                <div className="space-y-4 text-base text-slate-600 leading-relaxed font-medium">
                  <p>
                    {DOCTOR_NAME} is dedicated to providing thorough, patient-first urology consultation and medical management in {HOSPITAL_CITY}, Bihar. His clinical approach emphasizes accurate diagnostic evaluation, transparent patient counselling, and individualized care plans.
                  </p>
                  <PlaceholderSlot text={DOCTOR_PROFILE.doctorIntroduction} variant="block" />
                  <PlaceholderSlot text={DOCTOR_PROFILE.biography} variant="block" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-6 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-4 py-2 inline-block rounded-full">
                  Verified Clinical Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { icon: ShieldCheck, label: "Qualifications", val: DOCTOR_PROFILE.qualifications, color: "text-teal-600", bg: "bg-teal-50" },
                    { icon: FileText, label: "Medical Registration", val: DOCTOR_PROFILE.medicalRegistration, color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Clock, label: "Clinical Experience", val: DOCTOR_PROFILE.yearsOfExperience, color: "text-amber-600", bg: "bg-amber-50" },
                    { icon: Award, label: "Memberships & Fellowships", val: DOCTOR_PROFILE.memberships, color: "text-indigo-600", bg: "bg-indigo-50" }
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex items-start gap-4 hover:bg-white hover:shadow-lg transition-all group">
                      <div className={`${item.bg} p-2 rounded-xl group-hover:scale-110 transition-transform`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block mb-1">{item.label}</span>
                        <div className="text-slate-500 text-sm"><PlaceholderSlot text={item.val} variant="inline" /></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 flex items-start gap-4 hover:bg-white hover:shadow-lg transition-all group sm:col-span-2">
                    <div className="bg-emerald-50 p-2 rounded-xl group-hover:scale-110 transition-transform">
                      <Globe className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Consultation Languages</span>
                      <div className="text-slate-500 text-sm"><PlaceholderSlot text={DOCTOR_PROFILE.languages} variant="inline" /></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="rounded-3xl border border-teal-500/20 bg-[#0B1B3D] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl mt-6">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                 <div className="space-y-2 relative z-10 text-center sm:text-left">
                   <div className="flex items-center justify-center sm:justify-start gap-2 text-teal-300 font-bold text-sm mb-2">
                     <Clock className="h-4 w-4" />
                     <span>OPD Consultation Schedule</span>
                   </div>
                   <div className="font-semibold text-white"><PlaceholderSlot text={HOSPITAL_PROFILE.consultationTimings} variant="inline" /></div>
                 </div>
                 
                 <div className="flex flex-col gap-3 w-full sm:w-auto relative z-10">
                   <Link to="/book-appointment" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 px-6 py-3.5 text-sm font-bold text-[#0B1B3D] transition-all shadow-[0_0_15px_rgba(13,148,136,0.3)] hover:scale-105">
                     <Calendar className="h-4 w-4" />
                     Request Consultation
                   </Link>
                   <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-all text-white">
                     <Phone className="h-4 w-4 text-teal-400" />
                     {HOSPITAL_PROFILE.phone}
                   </a>
                 </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
