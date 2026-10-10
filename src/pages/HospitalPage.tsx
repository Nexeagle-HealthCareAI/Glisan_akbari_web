import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, MapPin, Phone, Clock, Calendar, MessageCircle, Mail, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_PROFILE, DOCTOR_PROFILE } from '../data/config';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';
import { MediaPlaceholder } from '../components/MediaPlaceholder';

interface HospitalPageProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: string) => void;
}

export const HospitalPage: React.FC<HospitalPageProps> = () => {
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
          <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[100%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Hospital</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {HOSPITAL_PROFILE.name}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              The hospital infrastructure and healthcare environment where {DOCTOR_NAME} consults and provides clinical urological treatment in {HOSPITAL_CITY}, Bihar.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Hospital Visual Showcase */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { text: HOSPITAL_PROFILE.hospitalExteriorPlaceholder, subtitle: "Hospital Exterior & Front Entrance" },
              { text: HOSPITAL_PROFILE.hospitalInteriorPlaceholder, subtitle: "OPD Clinical Consultation Chambers" },
              { text: HOSPITAL_PROFILE.approvedHospitalImagesPlaceholder, subtitle: "Patient Recovery & Diagnostic Infrastructure" }
            ].map((img, idx) => (
              <motion.div variants={fadeIn} key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 group relative bg-white">
                <div className="aspect-video overflow-hidden">
                  <MediaPlaceholder placeholderText={img.text} type="hospital" aspectRatio="video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{img.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Overview & Clinical Facilities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                  Overview & Infrastructure
                </h2>
                <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                  <p>
                    {HOSPITAL_NAME} serves as a prominent healthcare facility located in {HOSPITAL_SHORT_ADDRESS}. It provides dedicated outpatient and inpatient medical services, supported by nursing staff and diagnostic coordination.
                  </p>
                  <PlaceholderSlot text={HOSPITAL_PROFILE.description} variant="block" />
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600">
                    Facilities & Departments
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Verified Facilities", val: HOSPITAL_PROFILE.facilities[0] },
                      { label: "Verified Departments", val: HOSPITAL_PROFILE.departments[0] },
                      { label: "Patient Services", val: HOSPITAL_PROFILE.patientServices[0] }
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:bg-teal-50 hover:border-teal-100 transition-colors">
                        <span className="font-bold text-[#0B1B3D] block mb-1 text-sm">{item.label}</span>
                        <div className="text-xs text-slate-600"><PlaceholderSlot text={item.val} variant="inline" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hospital NAP & Contact */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-[#0B1B3D] p-8 shadow-xl text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-3 font-bold text-lg">
                  <div className="p-2 bg-teal-500/20 rounded-xl"><Building2 className="h-6 w-6 text-teal-400" /></div>
                  <span>Location & Contact</span>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
                  <p className="font-bold text-teal-300">{HOSPITAL_PROFILE.name}</p>
                  <address className="not-italic text-slate-300 text-sm leading-relaxed">
                    {HOSPITAL_PROFILE.address.line1}<br />
                    {HOSPITAL_PROFILE.address.line2 && <>{HOSPITAL_PROFILE.address.line2}<br /></>}
                    {HOSPITAL_PROFILE.address.area}<br />
                    {HOSPITAL_PROFILE.address.city}, {HOSPITAL_PROFILE.address.stateAndPin}
                  </address>
                </div>

                <div className="space-y-3">
                  <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 text-slate-300 font-medium">
                      <Phone className="h-5 w-5 text-teal-400" />
                      <span>Phone:</span>
                    </div>
                    <span className="font-bold text-white">{HOSPITAL_PROFILE.phone}</span>
                  </a>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center gap-3 text-slate-300 font-medium">
                      <MessageCircle className="h-5 w-5 text-emerald-400" />
                      <span>WhatsApp:</span>
                    </div>
                    <span className="text-white font-medium text-sm"><PlaceholderSlot text={HOSPITAL_PROFILE.whatsappNumber} variant="inline" /></span>
                  </div>
                </div>

                <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-teal-300">
                    <Clock className="h-5 w-5" />
                    <span>OPD Timings</span>
                  </div>
                  <div className="text-slate-200 text-sm"><PlaceholderSlot text={HOSPITAL_PROFILE.consultationTimings} variant="inline" /></div>
                </div>

                <Link to="/book-appointment" className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 py-4 text-sm font-bold text-[#0B1B3D] transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointment with {DOCTOR_NAME}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
