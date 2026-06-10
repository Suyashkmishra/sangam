import React, { useContext } from 'react';
import { Award, MapPin, Calendar, Languages, CheckCircle2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function GuruCard({ guru, onSelect, showAction = true }) {
  const { currentUser, userRole } = useContext(AppContext);
  const isAssigned = currentUser && currentUser.assignedGuruId === guru.id;

  return (
    <div className="bg-ink-light border border-brown-light/30 rounded-2xl p-6 shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Background ink wash effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div>
        {/* Header Profile Photo & Title info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={guru.avatar}
              alt={guru.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gold/70"
            />
            {/* Wax seal verified indicator */}
            <span className="absolute -bottom-1 -right-1 bg-gold text-brown rounded-full p-0.5 border border-gold-dark shadow-sm">
              <CheckCircle2 size={12} className="fill-brown text-gold" />
            </span>
          </div>
          <div>
            <h4 className="font-display text-xl text-cream group-hover:text-gold-light transition-colors font-semibold tracking-wide">
              {guru.name}
            </h4>
            <p className="text-xs text-saffron font-medium font-sans mt-0.5">{guru.title}</p>
            {guru.plan === 'Master' && (
              <span className="inline-block mt-1 text-[9px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                MASTER MENTOR
              </span>
            )}
          </div>
        </div>

        {/* Info Tags */}
        <div className="grid grid-cols-2 gap-2 text-xs text-cream-dark mb-4 font-sans border-y border-brown-light/10 py-3">
          <div className="flex items-center gap-1.5">
            <Award size={14} className="text-gold" />
            <span>{guru.experience} exp</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gold" />
            <span>{guru.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gold" />
            <span>{guru.availability}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Languages size={14} className="text-gold" />
            <span>{guru.languages.join(', ')}</span>
          </div>
        </div>

        {/* Specialization & Bio */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gold-light uppercase tracking-wider mb-1.5">Specialization</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {guru.specialization.split(', ').map((spec, i) => (
              <span key={i} className="text-[10px] bg-ink/60 border border-brown-light/30 px-2 py-0.5 rounded text-cream-dark">
                {spec}
              </span>
            ))}
          </div>
          <p className="text-xs text-cream-dark leading-relaxed font-poetic italic">
            "{guru.bio}"
          </p>
        </div>
      </div>

      {/* Action Button */}
      {showAction && (
        <div className="mt-2 pt-3 border-t border-brown-light/10">
          {isAssigned && userRole === 'talent' ? (
            <div className="w-full py-2 bg-gold/10 border border-gold/40 text-gold rounded-xl text-center text-xs font-semibold font-sans tracking-wide">
              Your Current Guru
            </div>
          ) : (
            <button
              onClick={() => onSelect && onSelect(guru)}
              className="w-full py-2 bg-saffron hover:bg-saffron-light text-cream rounded-xl text-xs font-semibold font-sans tracking-wide transition-all active:scale-98 shadow-sm flex items-center justify-center gap-1"
            >
              Connect for Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}
