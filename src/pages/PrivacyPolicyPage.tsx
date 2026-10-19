import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from '../components/PlaceholderSlot';

interface PrivacyPolicyPageProps {
  onNavigate?: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
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
            <span className="text-slate-800 font-medium">Privacy Policy</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: March 2026 · Official Clinical Privacy Guidelines
          </p>
        </div>

        <div className="site-legal-paper space-y-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900">
            <p className="font-semibold mb-1">Legal Review Notice:</p>
            <p>
              This draft policy serves as a baseline for appointment request communications for {DOCTOR_PROFILE.name} and {HOSPITAL_PROFILE.name}. Official hospital legal disclosures must be reviewed and inserted below:
            </p>
            <div className="pt-1.5">
              <PlaceholderSlot text="[PLACEHOLDER: INSERT CLIENT-APPROVED LEGAL PRIVACY DISCLOSURE]" variant="inline" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit an appointment request through this website, we collect only the contact information necessary to coordinate your consultation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Patient full name</li>
              <li>Patient age</li>
              <li>Telephone / mobile number</li>
              <li>Requested date and preferred consultation time slot</li>
              <li>General category of medical concern</li>
              <li>Optional notes regarding past records or tests</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              The information you provide is used exclusively by our hospital reception and scheduling staff at {HOSPITAL_PROFILE.name} to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Confirm your appointment date and OPD token by telephone call or WhatsApp</li>
              <li>Prepare your registration file prior to hospital arrival</li>
              <li>Notify you of any emergency scheduling updates or doctor availability changes</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Non-Disclosure & Confidentiality</h2>
            <p>
              We do not sell, rent, or share patient personal information with third-party marketers. Patient records are treated with clinical confidentiality in accordance with Indian medical record ethics and applicable hospital confidentiality policies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Contact & Inquiries</h2>
            <p>
              For questions concerning your personal information or to update your scheduled appointment records, contact the desk directly at {HOSPITAL_PROFILE.phone} or visit {HOSPITAL_PROFILE.name}, Dharamshala Road, {HOSPITAL_SHORT_ADDRESS}, Bihar 854301.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
