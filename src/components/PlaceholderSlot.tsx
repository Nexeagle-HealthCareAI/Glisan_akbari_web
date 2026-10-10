import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';

interface PlaceholderSlotProps {
  text: string;
  className?: string;
  variant?: 'inline' | 'block' | 'prominent';
  labelHint?: string;
}

export const PlaceholderSlot: React.FC<PlaceholderSlotProps> = ({
  text,
  className = '',
  variant = 'inline',
  labelHint,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'block') {
    return (
      <div
        className={`group relative max-w-full overflow-hidden rounded-lg border border-dashed border-amber-300 bg-amber-50/70 p-3 text-amber-900 transition-colors hover:bg-amber-50 ${className}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-1">
            {labelHint && (
              <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700">
                {labelHint}
              </span>
            )}
            <p className="font-mono text-[11px] sm:text-xs font-medium text-amber-950 leading-relaxed break-words break-all [overflow-wrap:anywhere]">
              {text}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            title="Copy placeholder tag"
            aria-label="Copy placeholder tag"
            className="shrink-0 rounded p-1 text-amber-700 opacity-70 transition-opacity hover:bg-amber-100 hover:opacity-100"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <span
        className={`inline-flex max-w-full items-center gap-1.5 rounded-md border border-dashed border-amber-400 bg-amber-50/90 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-amber-900 shadow-2xs break-words break-all [overflow-wrap:anywhere] ${className}`}
      >
        <Info className="h-3 w-3 shrink-0 text-amber-600" />
        <span className="break-words break-all min-w-0 [overflow-wrap:anywhere]">{text}</span>
        <button
          type="button"
          onClick={handleCopy}
          title="Copy tag"
          aria-label="Copy tag"
          className="ml-1 shrink-0 rounded p-0.5 text-amber-700 hover:text-amber-950"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
        </button>
      </span>
    );
  }

  return (
    <span
      className={`inline font-mono text-[11px] sm:text-xs text-amber-800 underline decoration-amber-300 decoration-dotted underline-offset-2 break-words break-all [overflow-wrap:anywhere] ${className}`}
      title="Client field placeholder"
    >
      {text}
    </span>
  );
};
