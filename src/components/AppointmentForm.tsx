import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { HOSPITAL_PROFILE, DOCTOR_PROFILE, APPOINTMENT_AFTER_SUBMISSION_NOTE, DOCTORS, UROLOGY_SERVICES } from '../data/config';
import { DOCTOR_NAME, HOSPITAL_SHORT_ADDRESS } from '../data/identity';
import { PlaceholderSlot } from './PlaceholderSlot';
import { submitAppointmentToSupabase, generateReferenceId } from '../lib/supabase';

interface AppointmentFormProps {
  onSuccess?: (bookingDetails: BookingRecord) => void;
  defaultReason?: string;
  defaultDoctor?: string;
  isCompact?: boolean;
}

export interface BookingRecord {
  referenceId: string;
  fullName: string;
  phone: string;
  age: string;
  doctor: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  notes?: string;
  submittedAt: string;
}

declare global {
  interface Window {
    turnstile?: any;
    onloadTurnstileCallback?: () => void;
  }
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSuccess,
  defaultReason = '',
  defaultDoctor = '',
  isCompact = false,
}) => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', age: '', doctor: defaultDoctor || '',
    preferredDate: '', preferredTime: 'Morning (10:00 AM - 01:00 PM)', reason: defaultReason || '', notes: '',
  });

  const [hasConsent, setHasConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<BookingRecord | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const RATE_LIMIT_SECONDS = 60;
  const SUBMISSION_STORAGE_KEY = 'last_appointment_submission_ts';

  const doctorOptions = Array.from(new Set(['Any available doctor', 'Dr. Md Taquedis Noori', ...DOCTORS.filter((d) => !d.name.includes('[PLACEHOLDER')).map((d) => d.name)]));
  const timeOptions = ['Morning (10:00 AM - 01:00 PM)', 'Afternoon (02:00 PM - 05:00 PM)', 'Evening (05:00 PM - 08:00 PM)'];
  const reasonOptions = [...UROLOGY_SERVICES.map((s) => s.title), 'General Consultation', 'Other / Not sure'];

  useEffect(() => {
    if (!turnstileSiteKey || typeof window === 'undefined') return;
    let isMounted = true;
    const renderWidget = () => {
      if (!isMounted || !turnstileContainerRef.current || !window.turnstile || turnstileWidgetIdRef.current) return;
      try {
        const id = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => {
            if (isMounted) {
              setTurnstileToken(token);
              setErrors((prev) => { const next = { ...prev }; delete next.turnstile; return next; });
            }
          },
          'expired-callback': () => { if (isMounted) setTurnstileToken(''); },
          'error-callback': () => { if (isMounted) setTurnstileToken(''); },
          theme: 'light',
        });
        turnstileWidgetIdRef.current = id;
      } catch (e) { console.error('Turnstile render error:', e); }
    };
    if (window.turnstile) { renderWidget(); } else {
      const existingScript = document.getElementById('cf-turnstile-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'cf-turnstile-script';
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true; script.defer = true;
        script.onload = () => { if (window.turnstile) renderWidget(); };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => { if (window.turnstile) { clearInterval(interval); renderWidget(); } }, 100);
        return () => clearInterval(interval);
      }
    }
    return () => {
      isMounted = false;
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(turnstileWidgetIdRef.current); } catch {}
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter patient full name';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) errs.phone = 'Please enter mobile number';
    else if (!/^[6-9]\d{9}$/.test(cleanPhone)) errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    if (formData.age.trim() && (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120)) errs.age = 'Please enter a valid age (1-120)';
    if (!formData.preferredDate) errs.preferredDate = 'Please select a preferred consultation date';
    else {
      const selected = new Date(formData.preferredDate);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (selected < today) errs.preferredDate = 'Consultation date cannot be in the past';
    }
    if (!formData.doctor) errs.doctor = 'Please select a preferred doctor';
    if (!formData.preferredTime) errs.preferredTime = 'Please choose a preferred time slot';
    if (!formData.reason) errs.reason = 'Please select a reason for your visit';
    if (!hasConsent) errs.consent = 'Please agree to the Privacy Policy';
    if (turnstileSiteKey && !turnstileToken) errs.turnstile = 'Please complete the verification check';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (honeypot.trim()) return;
    try {
      const lastSubmittedTime = localStorage.getItem(SUBMISSION_STORAGE_KEY);
      if (lastSubmittedTime) {
        const elapsedSec = (Date.now() - parseInt(lastSubmittedTime, 10)) / 1000;
        if (elapsedSec < RATE_LIMIT_SECONDS) {
          setSubmitError(`An appointment request was recently submitted. Please wait ${Math.ceil(RATE_LIMIT_SECONDS - elapsedSec)} seconds.`);
          return;
        }
      }
    } catch {}
    if (!validate()) return;
    setIsSubmitting(true);
    const refId = generateReferenceId();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const result = await submitAppointmentToSupabase({
      reference_id: refId, full_name: formData.fullName.trim(), phone: cleanPhone, age: formData.age.trim() || undefined,
      doctor: formData.doctor, preferred_date: formData.preferredDate, preferred_time: formData.preferredTime, reason: formData.reason,
      message: formData.notes.trim() || undefined, notes: formData.notes.trim() || undefined,
    });
    setIsSubmitting(false);
    if (!result.success) {
      console.error('Database appointment submission error:', result.error);
      setSubmitError('We could not send your request right now. Please try again or call the hospital desk.');
      if (turnstileSiteKey && window.turnstile && turnstileWidgetIdRef.current) {
        try { window.turnstile.reset(turnstileWidgetIdRef.current); setTurnstileToken(''); } catch {}
      }
      return;
    }
    try { localStorage.setItem(SUBMISSION_STORAGE_KEY, Date.now().toString()); } catch {}
    const record: BookingRecord = {
      referenceId: refId, fullName: formData.fullName.trim(), phone: cleanPhone, age: formData.age.trim(),
      doctor: formData.doctor, preferredDate: formData.preferredDate, preferredTime: formData.preferredTime,
      reason: formData.reason, notes: formData.notes.trim(), submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSubmittedRecord(record);
    if (onSuccess) onSuccess(record);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (submittedRecord) {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-6 sm:p-10 shadow-lg text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 text-emerald-700 relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 shadow-sm shrink-0">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0B1B3D] font-heading">Request Sent Successfully!</h3>
            <p className="text-sm text-slate-500 font-medium">Ref ID: <span className="font-mono font-bold text-emerald-700">{submittedRecord.referenceId}</span></p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white border border-emerald-100 p-6 space-y-4 shadow-sm relative z-10">
          <p className="font-bold text-[#0B1B3D] text-lg">Thank you, {submittedRecord.fullName}.</p>
          <p className="text-slate-600 leading-relaxed text-sm">
            Our hospital reception team at <strong>{HOSPITAL_PROFILE.name}</strong> will call you at <strong className="text-slate-900">+91 {submittedRecord.phone}</strong> to confirm the exact consultation time.
          </p>
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50/50 rounded-xl p-4">
            <div><span className="text-slate-400 block mb-1">Doctor:</span><span className="font-bold text-[#0B1B3D]">{submittedRecord.doctor}</span></div>
            <div><span className="text-slate-400 block mb-1">Reason:</span><span className="font-bold text-[#0B1B3D]">{submittedRecord.reason}</span></div>
            <div><span className="text-slate-400 block mb-1">Date:</span><span className="font-bold text-[#0B1B3D]">{submittedRecord.preferredDate}</span></div>
            <div><span className="text-slate-400 block mb-1">Time:</span><span className="font-bold text-[#0B1B3D]">{submittedRecord.preferredTime}</span></div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
          <button onClick={() => {
            setSubmittedRecord(null); setFormData({ fullName: '', phone: '', age: '', doctor: defaultDoctor || '', preferredDate: '', preferredTime: 'Morning (10:00 AM - 01:00 PM)', reason: defaultReason || '', notes: '' }); setHasConsent(false); setTurnstileToken('');
          }} className="flex-1 rounded-xl border-2 border-slate-200 bg-transparent py-3.5 px-4 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors text-center">
            Submit Another
          </button>
          <a href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 px-4 text-sm font-bold text-[#0B1B3D] hover:bg-teal-400 transition-colors shadow-md">
            <Phone className="h-4 w-4" /> Call Reception
          </a>
        </div>
      </div>
    );
  }

  const inputClasses = (hasError: boolean) => `w-full rounded-2xl border ${hasError ? 'border-rose-300 bg-rose-50 focus:ring-rose-200' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50'} py-3.5 px-4 text-sm text-[#0B1B3D] placeholder:text-slate-400 font-medium transition-all outline-none`;
  const iconClasses = (hasError: boolean) => `absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${hasError ? 'text-rose-400' : 'text-slate-400'}`;
  const labelClasses = "block text-sm font-bold text-[#0B1B3D] mb-2";

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left relative">
      <div className="mb-8 space-y-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B3D] font-heading">
          Book an <span className="text-teal-600">Appointment</span>
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Consultation with <strong className="text-slate-800">{DOCTOR_PROFILE.name}</strong> at {HOSPITAL_PROFILE.name}, {HOSPITAL_SHORT_ADDRESS}.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 flex items-start gap-3 shadow-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <div>
            <p className="font-bold mb-1">Unable to Complete Request</p>
            <p className="leading-relaxed opacity-90">{submitError}</p>
          </div>
        </div>
      )}

      <div className="hidden" aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}>
        <input type="text" id="hp_validation_code" name="hp_validation_code" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="fullName">Full Name <span className="text-rose-500">*</span></label>
            <div className="relative group">
              <User className={`${iconClasses(!!errors.fullName)} group-focus-within:text-teal-600 transition-colors`} />
              <input id="fullName" type="text" required disabled={isSubmitting} value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Patient full name" className={`${inputClasses(!!errors.fullName)} pl-11`} />
            </div>
            {errors.fullName && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.fullName}</p>}
          </div>

          <div>
            <label className={labelClasses} htmlFor="age">Age <span className="text-slate-400 font-normal ml-1"></span></label>
            <input id="age" type="number" min="1" max="120" disabled={isSubmitting} value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="e.g. 42" className={inputClasses(!!errors.age)} />
            {errors.age && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.age}</p>}
          </div>
        </div>

        <div>
          <label className={labelClasses} htmlFor="phone">Mobile Number <span className="text-rose-500">*</span></label>
          <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 border-r pr-3 ${errors.phone ? 'border-rose-200' : 'border-slate-200'} group-focus-within:border-teal-200 transition-colors`}>
              <Phone className={`h-4 w-4 ${errors.phone ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-teal-600'} transition-colors`} />
              <span className="text-sm font-bold text-slate-700">+91</span>
            </div>
            <input id="phone" type="tel" required disabled={isSubmitting} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="10-digit mobile number" maxLength={10} className={`${inputClasses(!!errors.phone)} pl-24`} />
          </div>
          {errors.phone ? <p className="text-xs text-rose-500 mt-2 font-medium">{errors.phone}</p> : <p className="text-xs text-slate-400 mt-2 font-medium">We will call this number to confirm your time slot.</p>}
        </div>

        <div>
          <label className={labelClasses} htmlFor="doctor">Preferred Doctor <span className="text-rose-500">*</span></label>
          <div className="relative group">
            <User className={`${iconClasses(!!errors.doctor)} group-focus-within:text-teal-600 transition-colors`} />
            <select id="doctor" required disabled={isSubmitting} value={formData.doctor} onChange={(e) => { setFormData({ ...formData, doctor: e.target.value }); if (e.target.value && errors.doctor) { setErrors((prev) => { const next = { ...prev }; delete next.doctor; return next; }); } }} className={`${inputClasses(!!errors.doctor)} pl-11 appearance-none cursor-pointer`}>
              <option value="" disabled>Select a doctor</option>
              {doctorOptions.map((doc) => (<option key={doc} value={doc}>{doc}</option>))}
            </select>
          </div>
          {errors.doctor && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.doctor}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses} htmlFor="preferredDate">Date <span className="text-rose-500">*</span></label>
            <div className="relative group">
              <Calendar className={`${iconClasses(!!errors.preferredDate)} group-focus-within:text-teal-600 transition-colors z-10`} />
              <input id="preferredDate" type="date" min={todayStr} required disabled={isSubmitting} value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} className={`${inputClasses(!!errors.preferredDate)} pl-11 cursor-pointer`} />
            </div>
            {errors.preferredDate && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.preferredDate}</p>}
          </div>

          <div>
            <label className={labelClasses} htmlFor="preferredTime">Time Slot <span className="text-rose-500">*</span></label>
            <div className="relative group">
              <Clock className={`${iconClasses(!!errors.preferredTime)} group-focus-within:text-teal-600 transition-colors`} />
              <select id="preferredTime" disabled={isSubmitting} value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })} className={`${inputClasses(!!errors.preferredTime)} pl-11 appearance-none cursor-pointer`}>
                {timeOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>
            {errors.preferredTime && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.preferredTime}</p>}
          </div>
        </div>

        <div>
          <label className={labelClasses} htmlFor="reason">Reason for Visit <span className="text-rose-500">*</span></label>
          <select id="reason" required disabled={isSubmitting} value={formData.reason} onChange={(e) => { setFormData({ ...formData, reason: e.target.value }); if (e.target.value && errors.reason) { setErrors((prev) => { const next = { ...prev }; delete next.reason; return next; }); } }} className={`${inputClasses(!!errors.reason)} appearance-none cursor-pointer`}>
            <option value="" disabled>Select a reason</option>
            {reasonOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
          </select>
          {errors.reason && <p className="text-xs text-rose-500 mt-2 font-medium">{errors.reason}</p>}
        </div>

        <div>
          <label className={labelClasses} htmlFor="notes">Additional Notes (Optional)</label>
          <textarea id="notes" rows={3} disabled={isSubmitting} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Mention symptoms, prior ultrasound, or specific medical queries..." className={inputClasses(false)} />
        </div>

        <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-4 shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer text-left select-none group">
            <div className="relative flex items-center justify-center mt-1">
              <input type="checkbox" id="consent" checked={hasConsent} onChange={(e) => { setHasConsent(e.target.checked); if (e.target.checked && errors.consent) { setErrors((prev) => { const next = { ...prev }; delete next.consent; return next; }); } }} disabled={isSubmitting} className="peer appearance-none w-5 h-5 rounded border-2 border-slate-300 checked:border-teal-600 checked:bg-teal-600 transition-colors cursor-pointer" />
              <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <span className="text-sm text-slate-700 leading-relaxed font-medium">
              I agree to be contacted about my appointment request and accept the <Link to="/privacy-policy" className="font-bold text-teal-700 hover:text-teal-900 underline decoration-teal-300 underline-offset-4">Privacy Policy</Link>. <span className="text-rose-500">*</span>
            </span>
          </label>
          {errors.consent && <p className="text-xs text-rose-500 pl-9 mt-2 font-medium">{errors.consent}</p>}
        </div>

        {turnstileSiteKey && (
          <div>
            <div ref={turnstileContainerRef} className="min-h-[65px] flex items-center justify-center sm:justify-start" />
            {errors.turnstile && <p className="text-xs text-rose-500 mt-2 font-medium text-center sm:text-left">{errors.turnstile}</p>}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0B1B3D] py-4 px-6 text-sm sm:text-base font-bold text-white shadow-xl hover:bg-teal-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-h-[56px] hover:-translate-y-1">
          {isSubmitting ? (
            <><Loader2 className="h-5 w-5 animate-spin text-teal-400" /><span>Submitting Request...</span></>
          ) : (
            <><Calendar className="h-5 w-5 text-teal-400" /><span>Request Appointment</span></>
          )}
        </button>
      </div>
    </form>
  );
};
