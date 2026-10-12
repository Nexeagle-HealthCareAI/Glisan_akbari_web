import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Calendar, Phone } from 'lucide-react';
import { FAQS, HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
          <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[120%] bg-[#0d9488] blur-[150px] opacity-20 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4 max-w-3xl">
            <motion.div variants={fadeIn} className="flex justify-center items-center gap-2 text-sm text-teal-300 font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">FAQ</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Questions</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed font-light pt-2">
              Essential guidelines regarding booking, consultation preparation, previous diagnostic reports, and reaching {HOSPITAL_NAME} in {HOSPITAL_SHORT_ADDRESS}.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search common questions (e.g., stones, timings, ultrasound)..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-sm sm:text-base text-[#0B1B3D] placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 focus:bg-white transition-all outline-none font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'appointment', label: 'Booking & OPD' },
                { id: 'consultation', label: 'Consultation' },
                { id: 'hospital', label: 'Location' },
                { id: 'medical', label: 'Medical' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-xl px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-md scale-105'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
            <AnimatePresence>
              {filteredFaqs.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-3xl border border-slate-100 bg-white p-12 text-center text-slate-500 font-medium">
                  No matching questions found. Try searching for other medical terms or call the hospital directly.
                </motion.div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openIds.includes(faq.id);
                  return (
                    <motion.div
                      variants={fadeIn}
                      key={faq.id}
                      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white border-teal-200 shadow-lg' : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-6 sm:p-8 text-left text-base sm:text-lg font-bold text-[#0B1B3D] cursor-pointer gap-4"
                      >
                        <span className={isOpen ? 'text-teal-700' : ''}>{faq.question}</span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-teal-50' : 'bg-slate-50'}`}>
                          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="px-6 pb-8 sm:px-8 sm:pb-8 text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
                              <p>{faq.answer}</p>
                              {faq.id === 'faq-4' && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                                  <PlaceholderSlot text="[PLACEHOLDER: INSERT APPOINTMENT BOOKING PROCESS SUMMARY]" variant="inline" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>

          {/* Support Help Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-3xl border border-teal-100 bg-[#0B1B3D] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center sm:text-left">
              <h3 className="text-2xl font-bold font-heading mb-2">Still have a question?</h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-sm">The hospital desk at {HOSPITAL_NAME} will be pleased to help you with your query.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
              <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-4 text-sm font-semibold hover:bg-white/10 transition-all">
                <Phone className="h-5 w-5 text-teal-400" />
                <span>Call {HOSPITAL_PROFILE.phone}</span>
              </a>
              <a href={BOOKING_URL} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-400 px-6 py-4 text-sm font-bold text-[#0B1B3D] transition-all shadow-[0_0_15px_rgba(13,148,136,0.3)]">
                <Calendar className="h-5 w-5" />
                <span>Book Visit</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
