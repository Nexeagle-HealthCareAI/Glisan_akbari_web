import React from 'react';
import { X } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultReason,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-900/60 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-4 sm:my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-2 sm:p-4">
          <AppointmentForm
            defaultReason={defaultReason}
            isCompact
            onSuccess={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
