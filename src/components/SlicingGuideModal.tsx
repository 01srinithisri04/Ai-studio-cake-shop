import React, { useState } from 'react';
import { X, Scissors, Utensils, CheckCircle, Info } from 'lucide-react';

interface SlicingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlicingGuideModal: React.FC<SlicingGuideModalProps> = ({ isOpen, onClose }) => {
  const [cutMethod, setCutMethod] = useState<'catering' | 'wedge'>('catering');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DD] overflow-hidden my-auto p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white text-[#201A18] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#ECE5DD] pb-4">
          <div className="text-xs uppercase tracking-widest text-[#8A7E76] font-medium">
            Sommelier Slicing Manual
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201A18] mt-1">
            Cake Slicing & Portion Guide
          </h3>
          <p className="text-xs text-[#6B625D]">
            How to maximize servings and achieve clean, razor-sharp patisserie slices.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex p-1 bg-[#F0EBE3] rounded-lg gap-1">
          <button
            onClick={() => setCutMethod('catering')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
              cutMethod === 'catering'
                ? 'bg-white text-[#201A18] shadow-xs'
                : 'text-[#6B625D] hover:text-[#201A18]'
            }`}
          >
            Catering Grid Cut (Weddings & Galas)
          </button>
          <button
            onClick={() => setCutMethod('wedge')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
              cutMethod === 'wedge'
                ? 'bg-white text-[#201A18] shadow-xs'
                : 'text-[#6B625D] hover:text-[#201A18]'
            }`}
          >
            Traditional Wedge Cut (Casual Gatherings)
          </button>
        </div>

        {/* Portion Chart */}
        <div className="p-4 bg-white rounded-xl border border-[#ECE5DD] space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#201A18]">
            Serving Capacity by Diameter ({cutMethod === 'catering' ? '1" × 2" event portions' : 'generous triangular wedges'})
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#ECE5DD] text-center">
              <div className="font-serif-display text-lg font-medium text-[#201A18]">6" Round</div>
              <div className="font-mono text-sm text-[#A58252] font-semibold tabular-nums">
                {cutMethod === 'catering' ? '12–14 portions' : '8–10 wedges'}
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#ECE5DD] text-center">
              <div className="font-serif-display text-lg font-medium text-[#201A18]">8" Round</div>
              <div className="font-mono text-sm text-[#A58252] font-semibold tabular-nums">
                {cutMethod === 'catering' ? '20–24 portions' : '14–16 wedges'}
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#ECE5DD] text-center">
              <div className="font-serif-display text-lg font-medium text-[#201A18]">10" Round</div>
              <div className="font-mono text-sm text-[#A58252] font-semibold tabular-nums">
                {cutMethod === 'catering' ? '32–38 portions' : '20–24 wedges'}
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#ECE5DD] text-center">
              <div className="font-serif-display text-lg font-medium text-[#201A18]">2-Tier Gala</div>
              <div className="font-mono text-sm text-[#A58252] font-semibold tabular-nums">
                {cutMethod === 'catering' ? '36–42 portions' : '26–30 wedges'}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Golden Cutting Rules */}
        <div className="space-y-3 text-xs text-[#554C47]">
          <div className="font-semibold uppercase tracking-wider text-[#201A18]">
            Chef’s Technique for Clean Cuts
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#A58252] font-bold">01.</span>
              <span>
                <strong>Dip Knife in Warm Water:</strong> Fill a tall container with steaming water. Submerge your chef knife blade for 10 seconds before each cut.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#A58252] font-bold">02.</span>
              <span>
                <strong>Wipe Between Slices:</strong> Always wipe the warm blade completely dry with a clean linen cloth between every single cut to keep the sponge layers pristine.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#A58252] font-bold">03.</span>
              <span>
                <strong>Serve at Room Temperature:</strong> Allow cake to sit out of the chiller for 45 minutes before slicing; this softens the European cultured butter for a velvety melt.
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#201A18] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#382F2C] transition-colors"
        >
          Got it, Close Guide
        </button>
      </div>
    </div>
  );
};
