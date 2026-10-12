import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck, MapPin, Star, CheckCircle2, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { DOCTORS, HOSPITAL_PROFILE, BOOKING_URL, DR_NOORI_BOOKING_URL } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const DoctorsPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as any;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  } as any;

  return (
    <div className="bg-slate-50 min-h-screen text-left font-sans">
      
      {/* Premium Page Header */}
      <section className="relative py-14 sm:py-20 bg-[#0B1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-[#1e3a5f] blur-[150px] opacity-40 rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-teal-500/10 blur-[130px] rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-2 text-xs sm:text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Our Doctors</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Team</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Meet the qualified urology team and clinical specialists practicing at {HOSPITAL_NAME}, {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Verified DoctorDekho Profiles
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-4 h-4 text-teal-400" />
                Line Bazaar, Purnea
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <Calendar className="w-4 h-4 text-teal-400" />
                Direct Online Appointments
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Compact, Balanced Doctor Cards */}
      <section className="py-10 sm:py-16 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {DOCTORS.map((doctor) => {
              const isClickable = doctor.isClickable && Boolean(doctor.slug);

              return (
                <motion.div
                  variants={fadeIn}
                  key={doctor.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle hover gradient wash */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-teal-500/10 transition-colors" />

                  <div className="space-y-4">
                    {/* Header: Avatar + Identity */}
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Avatar Squircle */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${
                            doctor.avatarGradient || 'from-teal-500 to-emerald-600'
                          } text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-white`}
                        >
                          {doctor.initials || doctor.name.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                        </div>
                        {doctor.isVerified && (
                          <div
                            className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
                            title="Verified Doctor Profile"
                          >
                            <CheckCircle2 className="w-5 h-5 text-teal-600 fill-white" />
                          </div>
                        )}
                      </div>

                      {/* Info Header */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200/70">
                            <PlaceholderSlot text={doctor.department} variant="inline" />
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-slate-100 text-slate-700">
                            <PlaceholderSlot text={doctor.yearsOfExperience} variant="inline" />
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3D] font-heading group-hover:text-teal-600 transition-colors leading-snug">
                          {isClickable ? (
                            <Link to={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
                          ) : (
                            <PlaceholderSlot text={doctor.name} variant="inline" />
                          )}
                        </h2>

                        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                          <PlaceholderSlot text={doctor.qualifications} variant="inline" />
                        </p>

                        {/* Rating Strip or Verified Network Tag */}
                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                          {doctor.rating ? (
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="font-bold text-slate-800">{doctor.rating}</span>
                              <span className="text-slate-400">({doctor.reviewCount} reviews)</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                              <span className="font-medium text-slate-600">Verified Specialist · DoctorDekho</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Focus Areas Chips */}
                    {doctor.focusAreas && doctor.focusAreas.length > 0 && (
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-400 font-medium text-[11px] mr-0.5">Specialization:</span>
                          {doctor.focusAreas.map((focus, idx) => (
                            <span
                              key={idx}
                              className="bg-teal-50/90 text-teal-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-teal-100"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Metadata: Languages & Hospital */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {doctor.languages && (
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">
                            <span className="font-bold text-slate-700">Languages:</span> <PlaceholderSlot text={doctor.languages} variant="inline" />
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate" title={doctor.practicesAtAddress || `${HOSPITAL_NAME}, ${HOSPITAL_SHORT_ADDRESS}`}>
                          <span className="font-bold text-slate-700">Practices at:</span> Glisan Akbari Hospital
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                    <a
                      href={doctor.bookingUrl || DR_NOORI_BOOKING_URL || BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-2.5 px-4 text-xs sm:text-sm font-bold text-white transition-all shadow-sm hover:shadow"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book on DoctorDekho</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                    {isClickable && doctor.slug && (
                      <Link
                        to={`/doctors/${doctor.slug}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 px-4 text-xs sm:text-sm font-bold text-[#0B1B3D] transition-all"
                      >
                        <span>View Full Profile</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
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

