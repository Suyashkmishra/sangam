import React from 'react';

export default function MudraStamp({ status }) {
  if (status === 'verified') {
    return (
      <div className="relative inline-flex items-center justify-center select-none mudra-stamp">
        {/* Outer wavy wax circle */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-dark via-gold to-gold-light border-2 border-gold-dark shadow-md flex items-center justify-center relative">
          {/* Inner ring */}
          <div className="w-12 h-12 rounded-full border border-dashed border-brown-light/40 flex items-center justify-center flex-col">
            <span className="text-[10px] font-semibold text-brown tracking-wider uppercase leading-none">संगम</span>
            <span className="text-[8px] font-bold text-brown leading-none">VERIFIED</span>
          </div>
          {/* Subtle wax shine */}
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/20 blur-[1px]"></div>
        </div>
      </div>
    );
  }

  if (status === 'revision') {
    return (
      <div className="relative inline-flex items-center justify-center select-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-800 via-amber-600 to-amber-700 border-2 border-amber-900 shadow-md flex items-center justify-center relative">
          <div className="w-12 h-12 rounded-full border border-dashed border-amber-950/40 flex items-center justify-center flex-col">
            <span className="text-[10px] font-semibold text-cream tracking-wider uppercase leading-none font-sans">सुधार</span>
            <span className="text-[7px] font-bold text-cream leading-none">REVISE</span>
          </div>
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/10 blur-[1px]"></div>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="relative inline-flex items-center justify-center select-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800 border-2 border-neutral-900 shadow-md flex items-center justify-center relative">
          <div className="w-12 h-12 rounded-full border border-dashed border-neutral-600/40 flex items-center justify-center flex-col">
            <span className="text-[9px] font-semibold text-neutral-400 tracking-wider uppercase leading-none">प्रतीक्षा</span>
            <span className="text-[7px] font-bold text-neutral-400 leading-none">PENDING</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'declined') {
    return (
      <div className="relative inline-flex items-center justify-center select-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-vermilion-dark via-vermilion to-vermilion-light border-2 border-vermilion-dark shadow-md flex items-center justify-center relative">
          <div className="w-12 h-12 rounded-full border border-dashed border-vermilion-dark/40 flex items-center justify-center flex-col">
            <span className="text-[9px] font-semibold text-cream tracking-wider uppercase leading-none">अस्वीकृत</span>
            <span className="text-[7px] font-bold text-cream leading-none">DECLINED</span>
          </div>
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/10 blur-[1px]"></div>
        </div>
      </div>
    );
  }

  return null;
}
