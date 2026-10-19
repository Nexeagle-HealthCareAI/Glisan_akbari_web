import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, MEDICAL_DISCLAIMER } from '../data/config';
import { HOSPITAL_CITY } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface TermsPageProps {
  onNavigate?: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = () => {
  return (
    <div className="site-legal mm-wrap">
      <div className="site-legal-inner space-y-6 sm:space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2 sm:space-y-3 min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link
              to="/"
              className="hover:text-slate-900"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Terms & Conditions</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: March 2026 · Website & Consultation Request Terms
          </p>
        </div>

        <div className="site-legal-paper space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900">
            <p className="font-semibold mb-1">Legal Review Notice:</p>
            <p>
              These website terms govern appointment booking requests and informational browsing. Official hospital legal clauses must be finalized and inserted below:
            </p>
            <div className="pt-1.5">
              <PlaceholderSlot text="[PLACEHOLDER: INSERT CLIENT-APPROVED TERMS AND CONDITIONS CLAUSES]" variant="inline" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. No Medical Advice or Online Diagnosis</h2>
            <p>
              All materials, condition summaries, and service descriptions published on this website are provided strictly for educational and scheduling purposes. They do not constitute a medical diagnosis, clinical opinion, or personalized treatment plan. A direct in-person clinical consultation with {DOCTOR_PROFILE.name} or an attending physician is required before initiating or altering any medical care.
            </p>
            <div className="pt-1">
              <PlaceholderSlot text={MEDICAL_DISCLAIMER} variant="inline" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Appointment Scheduling & Token Confirmation</h2>
            <p>
              Submitting an online appointment form constitutes a consultation request. It does not guarantee an immediate or confirmed time slot until our hospital desk team contacts you by telephone and officially registers your OPD token at {HOSPITAL_PROFILE.name}.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Emergency Situations</h2>
            <p>
              This website and its booking forms are not intended for emergency situations. If you are experiencing acute severe abdominal/flank pain, urinary retention, high fever with chills, or heavy bleeding, visit the emergency ward of {HOSPITAL_PROFILE.name} immediately or contact local emergency services.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Hospital Policies & Applicable Law</h2>
            <p>
              Consultations conducted at {HOSPITAL_PROFILE.name} are subject to hospital rules, standard clinical consent procedures, and Indian healthcare regulations applicable in {HOSPITAL_CITY}, Bihar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
