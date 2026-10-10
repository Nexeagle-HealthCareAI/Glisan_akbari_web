import React from 'react';
import { X, MessageCircle, Phone, Copy, Check } from 'lucide-react';
import { HOSPITAL_PROFILE } from '../data/config';
import { HOSPITAL_NAME } from '../data/identity';
import { PlaceholderSlot } from './PlaceholderSlot';

interface WhatsAppNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppNoticeModal: React.FC<WhatsAppNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left space-y-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
               WhatsApp Appointment Desk
            </h3>
            <p className="text-xs text-slate-500">
              {HOSPITAL_NAME}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
          <span className="font-semibold text-slate-800 block">
            Official WhatsApp Number:
          </span>
          <PlaceholderSlot text={HOSPITAL_PROFILE.whatsappNumber} variant="block" labelHint="Client WhatsApp" />
          <p className="text-slate-500 pt-1">
            Once confirmed by the hospital, this link will directly open WhatsApp chat with the OPD desk.
          </p>
        </div>

        <div className="space-y-2">
          <a
            href={`tel:${HOSPITAL_PROFILE.phone.replace(/\s+/g, '')}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 py-2.5 text-xs font-bold text-white hover:bg-teal-900"
          >
            <Phone className="h-4 w-4" />
            <span>Call Reception Directly: {HOSPITAL_PROFILE.phone}</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
