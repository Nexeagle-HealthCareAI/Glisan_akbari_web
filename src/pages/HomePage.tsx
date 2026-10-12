import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Calendar, Phone, MapPin, ChevronRight,
  Building2, Clock, ArrowRight, ExternalLink,
  ShieldCheck, Star, Activity, Stethoscope, CheckCircle2,
  Award, MessageCircle
} from 'lucide-react';
import {
  DOCTOR_PROFILE, HOSPITAL_PROFILE, TRUST_STRIP_DATA,
  DOCTORS, UROLOGY_SERVICES, WHY_CHOOSE_REASONS,
  APPOINTMENT_STEPS, APPOINTMENT_PROCESS_PLACEHOLDER,
  TESTIMONIALS, GOOGLE_REVIEWS_URL_PLACEHOLDER,
  FAQS, BOOKING_URL, DR_NOORI_BOOKING_URL
} from '../data/config';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { TrustStrip } from '../components/TrustStrip';
import { PlaceholderSlot } from '../components/PlaceholderSlot';
import { MediaPlaceholder } from '../components/MediaPlaceholder';

interface HomePageProps {
  onNavigate?: (page: string) => void;
  onOpenBooking?: () => void;
  onOpenWhatsAppNotice?: () => void;
  onSelectCondition?: (conditionId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWhatsAppNotice,
  onSelectCondition,
  onSelectService,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as any;
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  } as any;

  return (
    <div className="space-y-0 w-full overflow-x-hidden text-left bg-slate-50 font-sans">
      
      {/* PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1B3D] text-white py-16 sm:py-28 lg:py-36">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#1e3a5f] blur-[140px] opacity-40 rounded-full mix-blend-screen" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-teal-400/10 blur-[100px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2.5 rounded-full bg-white/5 backdrop-blur-md px-4 py-2 text-xs sm:text-sm font-semibold text-teal-300 border border-white/10 shadow-lg">
                <Building2 className="h-4 w-4" />
                <span>Super Speciality Hospital in {HOSPITAL_CITY}</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-heading">
                Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Urology Care</span>
                <br/>
                <span className="text-2xl sm:text-4xl font-medium text-slate-300 mt-2 block">by {DOCTOR_NAME}</span>
              </motion.h1>

              <motion.div variants={fadeIn} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
                <p>Comprehensive healthcare, advanced diagnostic infrastructure, and specialized surgical care serving patients across {HOSPITAL_CITY} and surrounding regions.</p>
                <div className="mt-3 text-teal-100/90 font-medium">
                  <PlaceholderSlot text={DOCTOR_PROFILE.heroValueProp} variant="inline" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href={BOOKING_URL} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-400 text-[#0B1B3D] px-8 py-4 text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(13,148,136,0.5)]">
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointment</span>
                </a>
                <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                  <Phone className="h-5 w-5 text-teal-400" />
                  <span>{HOSPITAL_PROFILE.phone}</span>
                </a>
              </motion.div>
              
              <motion.div variants={fadeIn} className="pt-8 border-t border-white/10 flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-yellow-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold text-white ml-1">{TRUST_STRIP_DATA.googleRating}</span>
                  <span className="text-xs text-slate-400 ml-1">({TRUST_STRIP_DATA.googleReviewCount} Reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>{HOSPITAL_SHORT_ADDRESS}</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden sm:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-3xl blur-2xl transform translate-x-4 translate-y-4" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B1B3D]/50 backdrop-blur-sm p-2">
                 <div className="rounded-2xl overflow-hidden h-[500px] lg:h-[600px] bg-slate-800">
                    <MediaPlaceholder 
                      placeholderText={DOCTOR_PROFILE.profileImagePlaceholder} 
                      type="doctor" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                      aspectRatio="portrait"
                    />
                 </div>
                 
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute bottom-8 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-4 border border-white/20"
                 >
                    <div className="bg-teal-50 p-3 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Certified Expert</p>
                      <p className="text-sm font-extrabold text-[#0B1B3D]">Urology Specialist</p>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST STRIP */}
      <TrustStrip />

      {/* SECTION 3 — FEATURED DOCTOR */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] transform -rotate-3 scale-105 z-0" />
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
                <MediaPlaceholder
                  placeholderText={DOCTOR_PROFILE.profileImagePlaceholder}
                  type="doctor"
                  aspectRatio="square"
                  subtitle={`${DOCTOR_NAME} · Clinical Profile`}
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4">
                <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 tracking-wide uppercase border border-teal-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Verified Profile
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Urology & Kidney Transplant
                  </span>
                </motion.div>
                
                <motion.h2 variants={fadeIn} className="text-3xl sm:text-5xl font-extrabold text-[#0B1B3D] font-heading">
                  {DOCTOR_PROFILE.name}
                </motion.h2>
                
                <motion.div variants={fadeIn} className="text-lg font-medium text-teal-700">
                  <PlaceholderSlot text={DOCTOR_PROFILE.primaryProfessionalIdentity} variant="inline" />
                </motion.div>

                {DOCTOR_PROFILE.rating && (
                  <motion.div variants={fadeIn} className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{DOCTOR_PROFILE.rating}</span>
                    <span className="text-xs text-slate-500">({DOCTOR_PROFILE.reviewCount} verified patient reviews on DoctorDekho)</span>
                  </motion.div>
                )}
              </div>

              <motion.div variants={fadeIn} className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p className="bg-teal-50/50 border border-teal-100/80 rounded-2xl p-4 text-slate-700 leading-relaxed">
                  {DOCTOR_PROFILE.biography}
                </p>
              </motion.div>

              {DOCTOR_PROFILE.focusAreas && DOCTOR_PROFILE.focusAreas.length > 0 && (
                <motion.div variants={fadeIn} className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinical Focus Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {DOCTOR_PROFILE.focusAreas.map((area, idx) => (
                      <span key={idx} className="bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Qualifications", val: DOCTOR_PROFILE.qualifications, icon: Award },
                  { label: "Experience", val: DOCTOR_PROFILE.yearsOfExperience, icon: Activity },
                  { label: "Registration", val: DOCTOR_PROFILE.medicalRegistration, icon: ShieldCheck },
                  { label: "Languages", val: DOCTOR_PROFILE.languages, icon: MessageCircle }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-100 hover:bg-teal-50/30 transition-colors">
                    <div className="mt-0.5 bg-white p-2 rounded-lg shadow-sm">
                      <item.icon className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-semibold text-[#0B1B3D] mt-0.5"><PlaceholderSlot text={item.val} variant="inline" /></p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeIn} className="pt-6 flex flex-col sm:flex-row gap-4">
                <a 
                  href={DR_NOORI_BOOKING_URL} 
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-teal-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book on DoctorDekho</span>
                </a>
                <Link to="/doctors/dr-md-taquedis-noori" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-[#0B1B3D] hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-sm">
                  <span>View Full Profile</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — UROLOGY SERVICES (Premium Grid) */}
      <section className="py-20 sm:py-28 bg-slate-50 relative border-t border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-100/50 px-4 py-1.5 rounded-full">Our Expertise</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1B3D] font-heading">Clinical Procedures</h2>
            <p className="text-slate-600 text-lg">World-class urological interventions leveraging modern technology and evidence-based medicine.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {UROLOGY_SERVICES.slice(0,6).map((service, idx) => (
              <motion.div
                variants={fadeIn}
                key={service.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 hover:bg-[#0B1B3D] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden border border-slate-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 group-hover:bg-white transition-transform duration-500">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-600 group-hover:text-teal-400 transition-colors">
                      {service.category}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors">
                      <Link to={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </h3>
                    <div className="text-sm text-slate-500 group-hover:text-slate-300 leading-relaxed transition-colors">
                      {service.description}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 group-hover:border-white/10 flex items-center justify-between transition-colors">
                  <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 group-hover:text-teal-300 transition-colors">
                    <span>Explore Procedure</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-12 text-center">
             <Link to="/services" className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-8 py-4 text-sm font-bold text-[#0B1B3D] hover:bg-slate-100 hover:shadow-md transition-all">
                <span>View All Services</span>
                <ChevronRight className="h-4 w-4" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — WHY CHOOSE US (Premium Redesign) */}
      <section className="py-20 sm:py-32 bg-[#0B1B3D] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-teal-900/20 blur-[150px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
               <div className="space-y-4">
                 <span className="text-sm font-bold uppercase tracking-widest text-teal-400">Verifiable Care Standards</span>
                 <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">Why Choose <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">{HOSPITAL_NAME}?</span></h2>
                 <p className="text-lg text-slate-400">Our hospital care is built on clinical transparency, modern infrastructure, and patient-first medical excellence.</p>
               </div>
               
               <div className="space-y-6">
                 {WHY_CHOOSE_REASONS.map((reason, idx) => (
                   <motion.div variants={fadeIn} key={reason.id} className="flex gap-5 items-start group">
                      <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-teal-500/20 group-hover:border-teal-500/30 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2"><PlaceholderSlot text={reason.title} variant="inline" /></h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{reason.detail}</p>
                      </div>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
             
             <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-slate-900">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-transparent to-transparent z-10 opacity-80"></div>
                   <MediaPlaceholder placeholderText={HOSPITAL_PROFILE.hospitalInteriorPlaceholder} type="hospital" aspectRatio="video" className="w-full h-full object-cover" />
                   
                   <div className="absolute bottom-6 left-6 right-6 z-20">
                     <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 sm:p-6 flex items-center justify-between">
                        <div>
                           <p className="text-white font-bold text-lg sm:text-xl">{HOSPITAL_NAME}</p>
                           <p className="text-teal-300 text-sm flex items-center gap-1 mt-1">
                             <MapPin className="w-3.5 h-3.5" /> {HOSPITAL_CITY}, Bihar
                           </p>
                        </div>
                        <a href={BOOKING_URL} aria-label="Book Appointment" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-500 text-[#0B1B3D] flex items-center justify-center hover:bg-teal-400 transition-all hover:scale-110 shadow-lg">
                           <ArrowRight className="w-6 h-6" />
                        </a>
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — APPOINTMENT PROCESS */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full">Patient Journey</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] font-heading">How Your Appointment Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-100 z-0"></div>
            
            {APPOINTMENT_STEPS.map((step, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                key={step.step} className="relative z-10 text-center space-y-6"
              >
                <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-2 border-teal-500 scale-[1.15] opacity-20"></div>
                   <span className="text-3xl font-extrabold text-teal-600 font-heading">{step.step}</span>
                </div>
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-[#0B1B3D] mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
           <div className="text-center mb-12 space-y-4">
            <span className="text-sm font-bold uppercase tracking-widest text-teal-600">Clear Answers</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] font-heading">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 5).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div 
                  initial={false}
                  animate={{ backgroundColor: isOpen ? 'rgb(255, 255, 255)' : 'rgb(248, 250, 252)' }}
                  key={faq.id} 
                  className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-teal-100' : 'hover:border-slate-300'}`}
                >
                  <button onClick={() => toggleFaq(faq.id)} className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer">
                    <span className={`text-base font-bold ${isOpen ? 'text-teal-700' : 'text-[#0B1B3D]'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
