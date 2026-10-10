import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, Upload, User, Building2 } from 'lucide-react';

interface MediaPlaceholderProps {
  placeholderText: string;
  type?: 'doctor' | 'hospital' | 'logo' | 'general';
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'banner';
  className?: string;
  subtitle?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  placeholderText,
  type = 'general',
  aspectRatio = 'square',
  className = '',
  subtitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(placeholderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewSrc(url);
    }
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[4/5] sm:aspect-[3/4] max-h-[380px] sm:max-h-none',
    wide: 'aspect-[16/9]',
    banner: 'aspect-[21/9]',
  }[aspectRatio];

  const getIcon = () => {
    switch (type) {
      case 'doctor':
        return <User className="h-8 w-8 sm:h-10 sm:w-10 text-teal-700" />;
      case 'hospital':
        return <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-teal-700" />;
      default:
        return <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />;
    }
  };

  if (previewSrc) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${aspectClasses} ${className}`}>
        <img
          src={previewSrc}
          alt={
            type === 'doctor'
              ? 'Doctor portrait preview'
              : type === 'hospital'
              ? 'Hospital facility preview'
              : type === 'logo'
              ? 'Organization logo preview'
              : 'Uploaded image preview'
          }
          width={800}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button
          type="button"
          onClick={() => setPreviewSrc(null)}
          className="absolute top-2.5 right-2.5 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-xs hover:bg-black/90 cursor-pointer"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/90 p-4 sm:p-6 text-center transition-all hover:border-teal-500 hover:bg-slate-50 ${aspectClasses} ${className}`}
    >
      <div className="flex flex-col items-center gap-2.5 max-w-full">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white shadow-2xs border border-slate-200/60">
          {getIcon()}
        </div>

        <div className="max-w-xs space-y-1 px-2">
          <p className="font-mono text-[11px] sm:text-xs font-semibold text-slate-800 break-words [overflow-wrap:anywhere]">
            {placeholderText}
          </p>
          {subtitle && (
            <p className="text-[11px] text-slate-500 line-clamp-2">{subtitle}</p>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95">
            <Upload className="h-3 w-3 text-slate-400" />
            <span>Preview file</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
