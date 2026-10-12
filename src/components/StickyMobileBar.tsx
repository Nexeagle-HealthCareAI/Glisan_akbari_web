import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { HOSPITAL_PROFILE, BOOKING_URL } from '../data/config';

interface StickyMobileBarProps {
  onOpenBooking?: () => void;
  onOpenWhatsAppNotice: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenWhatsAppNotice,
}) => {
  const cleanPhone = HOSPITAL_PROFILE.phone.replace(/\s+/g, '');

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/95 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur-md lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      role="navigation"
      aria-label="Mobile quick actions"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        {/* Call Action */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-1 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-1.5 text-slate-800 transition-colors active:bg-slate-100 min-h-[44px]"
          aria-label={`Call hospital desk at ${HOSPITAL_PROFILE.phone}`}
        >
          <Phone className="h-4 w-4 text-teal-700" />
          <span className="text-[11px] font-semibold whitespace-nowrap">Call</span>
        </a>

        {/* WhatsApp Action */}
        <button
          type="button"
          onClick={onOpenWhatsAppNotice}
          className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50/80 py-1.5 text-emerald-900 transition-colors active:bg-emerald-100 cursor-pointer min-h-[44px]"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span className="text-[11px] font-semibold whitespace-nowrap">WhatsApp</span>
        </button>

        {/* Primary Conversion: Book Appointment (Redirect to external booking portal) */}
        <a
          href={BOOKING_URL}
          className="flex flex-[1.6] items-center justify-center gap-1.5 rounded-xl bg-teal-800 py-2.5 px-2 text-white shadow-xs transition-colors active:bg-teal-900 min-h-[44px]"
          aria-label="Book an appointment"
        >
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold tracking-tight whitespace-nowrap">
            <span className="inline min-[360px]:hidden">Book</span>
            <span className="hidden min-[360px]:inline">Book Appointment</span>
          </span>
        </a>
      </div>
    </nav>
  );
};
