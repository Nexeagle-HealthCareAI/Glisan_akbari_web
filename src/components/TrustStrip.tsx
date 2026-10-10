import React from 'react';
import { Star, ShieldCheck, Award, Clock } from 'lucide-react';
import { TRUST_STRIP_DATA } from '../data/config';
import { PlaceholderSlot } from './PlaceholderSlot';

export const TrustStrip: React.FC = () => {
  return (
    <section
      aria-label="Clinical Credentials and Patient Feedback"
      className="border-y border-slate-200/80 bg-white py-3.5 sm:py-5 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {/* Item 1: Google Reviews & Rating */}
          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 rounded-xl bg-slate-50/70 p-2.5 sm:p-3.5 border border-slate-100 min-w-0 overflow-hidden">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <span className="text-xs sm:text-base font-bold text-slate-900 font-mono">
                  {TRUST_STRIP_DATA.googleRating}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500">/ 5.0</span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700">
                  {TRUST_STRIP_DATA.googleReviewCount}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Google Reviews & Rating
              </p>
              <div className="pt-0.5 min-w-0">
                <PlaceholderSlot
                  text={TRUST_STRIP_DATA.googleReviewCountPlaceholder}
                  className="text-[9px] sm:text-[10px]"
                />
              </div>
            </div>
          </div>

          {/* Item 2: Verified Credential */}
          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 rounded-xl bg-slate-50/70 p-2.5 sm:p-3.5 border border-slate-100 min-w-0 overflow-hidden">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-800 block truncate">
                Qualifications
              </span>
              <div className="text-[11px] sm:text-xs text-slate-800 font-medium min-w-0">
                <PlaceholderSlot
                  text={TRUST_STRIP_DATA.verifiedCredential}
                  variant="inline"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Verified Medical Degree
              </p>
            </div>
          </div>

          {/* Item 3: Verified Experience */}
          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 rounded-xl bg-slate-50/70 p-2.5 sm:p-3.5 border border-slate-100 min-w-0 overflow-hidden">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-800">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-800 block truncate">
                Experience
              </span>
              <div className="text-[11px] sm:text-xs text-slate-800 font-medium min-w-0">
                <PlaceholderSlot
                  text={TRUST_STRIP_DATA.verifiedExperience}
                  variant="inline"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Clinical Urological Care
              </p>
            </div>
          </div>

          {/* Item 4: Verified Memberships */}
          <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 rounded-xl bg-slate-50/70 p-2.5 sm:p-3.5 border border-slate-100 min-w-0 overflow-hidden">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-800">
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-800 block truncate">
                Council & Societies
              </span>
              <div className="text-[11px] sm:text-xs text-slate-800 font-medium min-w-0">
                <PlaceholderSlot
                  text={TRUST_STRIP_DATA.verifiedMembership}
                  variant="inline"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Medical Registrations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
