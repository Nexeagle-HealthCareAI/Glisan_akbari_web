import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, ChevronRight, Activity, MapPin } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_NAME, HOSPITAL_CITY, HOSPITAL_SHORT_ADDRESS } from '../data/identity';

interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Our Doctors' },
    { path: '/services', label: 'Services' },
    { path: '/conditions', label: 'Conditions' },
    { path: '/treatments', label: 'Treatments' },
    { path: '/hospital', label: 'Hospital' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/faqs', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-100' : 'bg-white border-b border-slate-100'}`}>
        
        {/* Top Notification Bar */}
        <div className="bg-[#0B1B3D] px-4 py-2 text-xs sm:text-sm text-slate-300 relative overflow-hidden">
          <div className="absolute top-0 right-[-10%] w-[30%] h-[150%] bg-teal-500 blur-[50px] opacity-20 rounded-full" />
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 truncate">
              <span className="flex items-center gap-1.5 font-bold text-white tracking-wide uppercase text-[10px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="truncate">{HOSPITAL_NAME}</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="truncate text-[10px] sm:text-xs hidden sm:flex items-center gap-1">
                <MapPin className="w-3 h-3 text-teal-400" /> {HOSPITAL_SHORT_ADDRESS}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 font-bold text-white hover:text-teal-300 transition-colors text-[10px] sm:text-xs tracking-wider"
              >
                <Phone className="h-3 w-3 text-teal-400" />
                <span>{HOSPITAL_PROFILE.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4 w-full">
          
          {/* Logo / Identity */}
          <Link to="/" className="group flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-[#0B1B3D] text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-[#0B1B3D] font-heading group-hover:text-teal-600 transition-colors truncate">
                {HOSPITAL_NAME}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold tracking-wider uppercase truncate">
                {HOSPITAL_CITY}, Bihar
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-1.5 xl:px-1.5 py-1.5 rounded-lg transition-all whitespace-nowrap text-[10px] xl:text-xs font-bold relative group shrink-0 ${
                    isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-teal-500 transition-all duration-300 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <Link
              to="/book-appointment"
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#0B1B3D] px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-teal-600 hover:-translate-y-0.5 transition-all duration-300 shrink-0 whitespace-nowrap"
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-400 shrink-0" />
              <span>Book Appointment</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden rounded-xl p-2 sm:p-2.5 bg-slate-50 text-[#0B1B3D] hover:bg-teal-50 hover:text-teal-600 transition-colors shrink-0"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`xl:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[85vh] border-b' : 'max-h-0 border-b-0'}`}>
          <div className="p-4 overflow-y-auto">
            <div className="rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-slate-800 p-5 mb-4 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl" />
               <div className="relative z-10 space-y-3">
                 <span className="text-sm font-bold block">{HOSPITAL_NAME}</span>
                 <p className="text-xs text-slate-300">{HOSPITAL_SHORT_ADDRESS}, Bihar</p>
                 <div className="flex gap-2 pt-2">
                    <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-xl bg-teal-500 py-2.5 px-3 text-xs font-bold text-[#0B1B3D] text-center shadow-md">
                      Book Visit
                    </Link>
                    <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="flex-1 rounded-xl border border-white/20 bg-white/10 py-2.5 px-3 text-xs font-bold text-center">
                      Call Desk
                    </a>
                 </div>
               </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                      isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B1B3D]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`h-4 w-4 ${isActive ? 'text-teal-600' : 'text-slate-300'}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer */}
      <div className="h-[96px] sm:h-[116px] w-full shrink-0 pointer-events-none" />
    </>
  );
};
