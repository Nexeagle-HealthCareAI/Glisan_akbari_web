import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Stethoscope,
  Building2,
  Clock,
  MapPin,
  Activity,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  UROLOGY_SERVICES,
  DOCTOR_PROFILE,
  HOSPITAL_PROFILE,
  DR_NOORI_BOOKING_URL,
  BOOKING_URL
} from '../data/config';
import { HOSPITAL_NAME, DOCTOR_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';

interface ServiceDetailPageProps {
  onOpenBooking?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = UROLOGY_SERVICES.find((s) => s.slug === slug);

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  } as any;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  } as any;

  if (!service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B1B3D]">Procedure Not Found</h1>
          <p className="text-slate-600 leading-relaxed text-sm">
            The requested urological service page could not be located. Browse all available clinical services or contact our hospital desk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white hover:bg-teal-700 transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Other related services for the sidebar & bottom bar
  const otherServices = UROLOGY_SERVICES.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen text-left font-sans">
      
      {/* 1. Header / Hero Section (Dark Blue Navy Aesthetic) */}
      <section className="relative py-16 sm:py-24 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-40%] left-[-10%] w-[55%] h-[120%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
          <div className="absolute bottom-[-40%] right-[-10%] w-[45%] h-[100%] bg-blue-600 blur-[150px] opacity-15 rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6 max-w-3xl">
            
            {/* Breadcrumb Navigation */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white line-clamp-1">{service.title}</span>
            </motion.div>

            {/* Category Tag */}
            <motion.div variants={fadeIn}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-bold text-teal-300 backdrop-blur-sm border border-teal-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                {service.category}
              </span>
            </motion.div>

            {/* Main Procedure H1 */}
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {service.title}
            </motion.h1>

            {/* Tagline / Subtitle */}
            <motion.p variants={fadeIn} className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {service.tagline}
            </motion.p>

            {/* Trust Pill & Location */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>{HOSPITAL_NAME}, {HOSPITAL_CITY}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Consultations by {DOCTOR_NAME}</span>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DR_NOORI_BOOKING_URL}
                className="inline-flex items-center gap-2 rounded-2xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment with Dr. Noori</span>
              </a>

              <a
                href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call Hospital Desk</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Body Grid */}
      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Clinical Overview */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm space-y-5"
              >
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                  <Activity className="w-4 h-4" />
                  <span>Clinical Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                  About this Urological Procedure
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                  {service.overview?.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="rounded-2xl bg-teal-50/70 border border-teal-100 p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0B1B3D] block mb-1">Senior Urologist Guidance</span>
                      <p className="leading-relaxed">{service.patientNotes}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Procedures & Surgical Techniques */}
              {service.procedures && service.procedures.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                    <Stethoscope className="w-4 h-4" />
                    <span>Surgical & Interventional Procedures</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                    Advanced Surgical Techniques Performed
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    At {HOSPITAL_NAME}, Dr. Md Taquedis Noori utilizes precision endourological, laser, and laparoscopic modalities tailored to each individual patient's anatomical findings.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                    {service.procedures.map((proc, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6 space-y-3 hover:border-teal-200 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center font-mono">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Specialized
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0B1B3D] group-hover:text-teal-700 transition-colors">
                          {proc.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {proc.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Symptoms: When to Consult */}
              {service.symptoms && service.symptoms.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Clinical Indications</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                    When to Consult a Urologist
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    You should schedule a prompt clinical evaluation with Dr. Md Taquedis Noori if you experience any of the following symptoms:
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {service.symptoms.map((symptom, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Clinical Benefits & Advantages */}
              {service.benefits && service.benefits.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50/50 to-white p-6 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-700">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Treatment Advantages</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                    Patient Benefits & Clinical Outcomes
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white border border-teal-100 p-4 sm:p-5 flex items-start gap-3 shadow-xs"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Pre-Procedure Preparation Checklist */}
              {service.preparation && service.preparation.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                    <FileText className="w-4 h-4" />
                    <span>Preparation Checklist</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                    What to Bring & How to Prepare
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    To make your consultation as effective and smooth as possible, please bring the following documents:
                  </p>

                  <div className="space-y-3 pt-2">
                    {service.preparation.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Frequently Asked Questions Accordion */}
              {service.faqs && service.faqs.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D] font-heading">
                    Common Questions About this Treatment
                  </h2>

                  <div className="space-y-3 pt-2">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                            aria-expanded={isOpen}
                          >
                            <span className="font-bold text-[#0B1B3D] text-sm sm:text-base leading-snug">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Sticky Sidebar Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Doctor Quick Profile & Booking Card */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0B1B3D] text-lg leading-tight font-heading">
                      {DOCTOR_PROFILE.name}
                    </h3>
                    <p className="text-xs text-teal-600 font-semibold mt-0.5">
                      Senior Consultant Urologist
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Endourology, Laser & Laparoscopic Specialist
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{HOSPITAL_NAME}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{HOSPITAL_SHORT_ADDRESS}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Mon - Sat: Prior Appointment via DoctorDekho</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={DR_NOORI_BOOKING_URL}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book on DoctorDekho</span>
                  </a>

                  <a
                    href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: {HOSPITAL_PROFILE.phone}</span>
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/doctors/dr-md-taquedis-noori"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Dr. Noori's Full Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Related Services Card */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <h4 className="font-bold text-[#0B1B3D] text-sm uppercase tracking-wider">
                  Related Urological Procedures
                </h4>
                <div className="space-y-2 pt-1">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      to={`/services/${other.slug}`}
                      className="group flex items-start justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1">
                          {other.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {other.category}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to="/services"
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center justify-between"
                  >
                    <span>Browse All 13 Procedures</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Hospital Callout Banner */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0B1B3D] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 relative z-10 text-center md:text-left max-w-2xl">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Direct Appointment Booking
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Need consultation for {service.title}?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Consult with {DOCTOR_NAME} at {HOSPITAL_NAME}, Line Bazar, Purnia. Instant digital booking available through DoctorDekho.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 w-full sm:w-auto">
              <a
                href={DR_NOORI_BOOKING_URL}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-white hover:bg-teal-400 shadow-lg shadow-teal-500/30 transition-all text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all text-center"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
