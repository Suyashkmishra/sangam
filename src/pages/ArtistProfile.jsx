import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, Calendar, Heart, Award, ArrowLeft, PenTool, Music } from 'lucide-react';
import PoemCard from '../components/PoemCard';
import AudioPlayer from '../components/AudioPlayer';

export default function ArtistProfile() {
  const { id } = useParams();
  const { talents, submissions, gurus, userRole } = useContext(AppContext);

  // Find target artist (can be talent or guru)
  const talentProfile = talents.find(t => t.id === id);
  const guruProfile = gurus.find(g => g.id === id);
  const profile = talentProfile || guruProfile;

  if (!profile) {
    return (
      <div className="bg-dark-paper-texture min-h-screen flex flex-col items-center justify-center p-4">
        <p className="font-poetic text-xl text-cream-dark italic mb-4">"कलाकार नहीं मिले"</p>
        <p className="text-xs text-neutral-500 font-sans mb-6">The requested artist profile does not exist.</p>
        <Link to="/explore" className="px-5 py-2 bg-saffron text-cream rounded-xl text-xs font-bold font-sans">
          Back to Explore
        </Link>
      </div>
    );
  }

  // Get works of this artist
  const isGuru = !!guruProfile;
  const artistWorks = submissions.filter(sub => 
    isGuru ? sub.assignedGuruId === profile.id && sub.status === 'verified' : sub.artistId === profile.id
  );

  return (
    <div className="bg-dark-paper-texture min-h-screen py-10 px-4 md:px-8 fade-in-up">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link to="/explore" className="inline-flex items-center gap-1 text-xs text-cream-dark hover:text-cream font-sans mb-6 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Explore</span>
        </Link>

        {/* Profile Card Banner */}
        <div className="bg-ink-light border border-brown-light/20 rounded-3xl overflow-hidden shadow-xl mb-10">
          {/* Mock Banner */}
          <div className="h-44 md:h-56 bg-gradient-to-r from-brown-dark to-saffron/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-saffron/10 via-transparent to-transparent"></div>
          </div>

          {/* User Details */}
          <div className="p-6 md:p-8 relative flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-20">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-ink shadow-2xl relative z-10 bg-ink-light"
            />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <h1 className="font-display text-2xl md:text-4xl text-cream font-bold">{profile.name}</h1>
                {profile.stageName && (
                  <span className="text-sm text-saffron font-bold font-sans italic">({profile.stageName})</span>
                )}
                {isGuru && (
                  <span className="text-[10px] bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold uppercase">
                    Verified Guru
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-gold-light mt-1 font-sans font-semibold">
                {isGuru ? profile.title : profile.genre}
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs text-cream-dark mt-3 font-sans">
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-saffron" />
                  <span>{profile.city}, {profile.state || 'India'}</span>
                </div>
                {!isGuru && profile.dob && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-saffron" />
                    <span>Age: {new Date().getFullYear() - new Date(profile.dob).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-2">
              <button className="px-5 py-2.5 bg-saffron hover:bg-saffron-light text-cream font-sans font-bold text-xs md:text-sm rounded-xl transition-all shadow-md active:scale-98 border border-saffron-light/20 flex items-center gap-1">
                <Heart size={14} />
                <span>Follow</span>
              </button>
              {isGuru && userRole === 'talent' && (
                <button className="px-5 py-2.5 bg-transparent hover:bg-cream/5 border border-cream/30 hover:border-gold text-cream font-sans font-bold text-xs md:text-sm rounded-xl transition-all active:scale-98">
                  Request Mentorship
                </button>
              )}
            </div>
          </div>

          {/* Bio block */}
          <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-brown-light/10 pt-4">
            <h3 className="text-xs font-bold text-gold uppercase tracking-wider font-sans mb-1.5">Biography</h3>
            <p className="font-poetic text-sm leading-relaxed text-cream-dark italic">
              "{profile.bio}"
            </p>
            {isGuru && profile.philosophy && (
              <div className="mt-4 bg-ink border border-brown-light/10 p-4 rounded-2xl">
                <h4 className="text-[10px] text-saffron uppercase font-bold tracking-wider mb-1 font-sans">Teaching Philosophy</h4>
                <p className="font-poetic text-xs text-neutral-400 italic">"{profile.philosophy}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Works Section */}
        <div>
          <h2 className="font-display text-2xl text-cream font-bold border-b border-brown-light/10 pb-3 mb-6">
            {isGuru ? 'Verified Mentee Works' : 'Portfolio / Creations'}
          </h2>

          {artistWorks.length === 0 ? (
            <div className="text-center py-16 bg-ink-light/30 rounded-2xl border border-dashed border-brown-light/10">
              <p className="font-poetic text-base text-cream-dark italic">"कोई प्रकाशित रचना नहीं"</p>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">No verified pieces published yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {artistWorks.map(work => (
                <div key={work.id}>
                  {work.type === 'poetry' ? (
                    <PoemCard
                      title={work.title}
                      content={work.content}
                      author={work.artistStageName || work.artistName}
                      status={work.status}
                      date={work.date}
                      feedback={work.feedback}
                      guruName={work.assignedGuruName}
                    />
                  ) : (
                    <div className="flex justify-center bg-ink-light border border-brown-light/15 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-lg relative overflow-hidden">
                      {/* Wax stamp corner positioning */}
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] bg-gold/10 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold">Mudra Verified</span>
                      </div>
                      <AudioPlayer src={work.content} title={work.title} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
