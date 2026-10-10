import React, { useState } from 'react';
import { X, Copy, Check, FileCheck, ExternalLink } from 'lucide-react';
import { DOCTOR_PROFILE, HOSPITAL_PROFILE, TRUST_STRIP_DATA } from '../data/config';

interface PlaceholderInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceholderInspector: React.FC<PlaceholderInspectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const checklistItems = [
    { section: 'Doctor Profile', field: 'Professional Title', tag: DOCTOR_PROFILE.professionalTitle },
    { section: 'Doctor Profile', field: 'Qualifications', tag: DOCTOR_PROFILE.qualifications },
    { section: 'Doctor Profile', field: 'Medical Registration', tag: DOCTOR_PROFILE.medicalRegistration },
    { section: 'Doctor Profile', field: 'Years of Experience', tag: DOCTOR_PROFILE.yearsOfExperience },
    { section: 'Doctor Profile', field: 'Memberships & Fellowships', tag: DOCTOR_PROFILE.memberships },
    { section: 'Doctor Profile', field: 'Hospital Relationship', tag: DOCTOR_PROFILE.hospitalRelationship },
    { section: 'Doctor Profile', field: 'Languages Spoken', tag: DOCTOR_PROFILE.languages },
    { section: 'Doctor Profile', field: 'Approved Biography', tag: DOCTOR_PROFILE.biography },
    { section: 'Doctor Profile', field: 'Doctor Photograph', tag: DOCTOR_PROFILE.profileImagePlaceholder },
    { section: 'Hospital', field: 'Official Appointment Phone', tag: HOSPITAL_PROFILE.officialAppointmentPhone },
    { section: 'Hospital', field: 'WhatsApp Number', tag: HOSPITAL_PROFILE.whatsappNumber },
    { section: 'Hospital', field: 'Official Email', tag: HOSPITAL_PROFILE.email },
    { section: 'Hospital', field: 'Official Hospital Website', tag: HOSPITAL_PROFILE.website },
    { section: 'Hospital', field: 'Google Business Profile URL', tag: HOSPITAL_PROFILE.googleBusinessProfileUrl },
    { section: 'Hospital', field: 'Google Maps Link', tag: HOSPITAL_PROFILE.googleMapsUrl },
    { section: 'Hospital', field: 'Verified Consultation Timings', tag: HOSPITAL_PROFILE.consultationTimings },
    { section: 'Hospital', field: 'Emergency Information', tag: HOSPITAL_PROFILE.emergencyInfo },
    { section: 'Hospital', field: 'Exterior & Interior Photos', tag: HOSPITAL_PROFILE.approvedHospitalImagesPlaceholder },
    { section: 'Hospital', field: 'Hospital Facilities List', tag: HOSPITAL_PROFILE.facilities[0] },
    { section: 'Hospital', field: 'Hospital Departments List', tag: HOSPITAL_PROFILE.departments[0] },
    { section: 'Reviews', field: 'Google Rating & Count', tag: TRUST_STRIP_DATA.googleReviewCountPlaceholder },
    { section: 'Reviews', field: 'Patient Testimonials (1-3)', tag: '[PLACEHOLDER: INSERT VERIFIED PATIENT TESTIMONIAL 1]' },
    { section: 'Services & Conditions', field: 'Confirmed Conditions', tag: '[PLACEHOLDER: CONDITION 1-6]' },
    { section: 'Services & Conditions', field: 'Verified Services & Procedures', tag: '[PLACEHOLDER: VERIFIED SERVICE 1-6]' },
    { section: 'Legal', field: 'Client Medical Disclaimer', tag: '[PLACEHOLDER: INSERT CLIENT-APPROVED MEDICAL DISCLAIMER]' },
  ];

  const handleCopyAll = () => {
    const textContent = checklistItems
      .map((item) => `[${item.section}] ${item.field}: ${item.tag}`)
      .join('\n');

    navigator.clipboard.writeText(textContent);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">
              Client Information Checklist
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <div className="border-b border-slate-100 bg-amber-50/70 px-6 py-3 text-xs text-amber-900">
          <p className="font-medium">
            Strict Compliance Guarantee: In accordance with medical ethics and your instructions, no medical qualifications, testimonials, or statistics have been fabricated. Every missing detail is marked with a clear placeholder ready for your official information.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">
              {checklistItems.length} Key Input Fields to Finalize
            </span>
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 rounded-md bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-teal-900 cursor-pointer"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAll ? 'Checklist Copied!' : 'Copy Full Checklist'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 p-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-800">{item.field}</span>
                  <p className="text-[11px] text-slate-500">{item.section}</p>
                </div>
                <code className="rounded bg-amber-50 px-2 py-1 font-mono text-[11px] text-amber-900 border border-amber-200 text-right">
                  {item.tag}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3">
          <p className="text-[11px] text-slate-500">
            Edit directly inside <code className="font-semibold text-slate-700">src/data/config.ts</code>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
