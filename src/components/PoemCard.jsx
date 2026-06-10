import React from 'react';
import MudraStamp from './MudraStamp';

export default function PoemCard({ title, content, author, status, date, feedback, guruName }) {
  return (
    <div className="bg-parchment border border-parchment-dark rounded-2xl p-6 md:p-10 shadow-xl text-brown max-w-2xl mx-auto relative overflow-hidden select-text bg-parchment-texture">
      {/* Decorative Corners */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-saffron/40 rounded-tl-sm pointer-events-none"></div>
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-saffron/40 rounded-tr-sm pointer-events-none"></div>
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-saffron/40 rounded-bl-sm pointer-events-none"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-saffron/40 rounded-br-sm pointer-events-none"></div>

      {/* Wax stamp watermark watermark */}
      {status && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-90 scale-90 md:scale-100 pointer-events-auto">
          <MudraStamp status={status} />
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl md:text-3xl text-brown font-semibold tracking-wide">
          {title}
        </h3>
        {author && (
          <p className="text-sm font-sans tracking-widest text-saffron font-medium uppercase mt-2">
            — {author} —
          </p>
        )}
        {date && (
          <p className="text-[11px] font-sans text-brown/50 mt-1">
            Dated: {date}
          </p>
        )}
      </div>

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-8 pointer-events-none">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-saffron/50"></div>
        {/* Simple mandala/diya SVG */}
        <svg className="w-5 h-5 text-saffron fill-current" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
        </svg>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-saffron/50"></div>
      </div>

      {/* Poem Body */}
      <div className="font-poetic text-lg md:text-xl leading-relaxed text-center text-brown-light whitespace-pre-line px-2 md:px-6 italic">
        {content}
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center mt-8 pointer-events-none">
        <svg className="w-8 h-4 text-saffron/30" viewBox="0 0 60 15" fill="none" stroke="currentColor">
          <path d="M5 7.5 Q 15 2 30 7.5 T 55 7.5" strokeWidth="1.5"/>
          <circle cx="30" cy="7.5" r="2" fill="currentColor"/>
        </svg>
      </div>

      {/* Feedback section if available */}
      {feedback && (
        <div className="mt-8 pt-6 border-t border-brown-light/10 text-left bg-white/40 rounded-xl p-4 md:p-5 border border-dashed border-brown-light/20">
          <h5 className="font-sans text-xs uppercase tracking-wider text-saffron font-bold mb-1">
            Guru Feedback — {guruName || 'Verified Expert'}
          </h5>
          <p className="font-poetic text-sm text-brown leading-relaxed italic">
            "{feedback}"
          </p>
        </div>
      )}
    </div>
  );
}
