import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { PenTool, Music, Users, CircleDollarSign, CheckSquare, Sparkles, ChevronRight, AlertCircle, Check, HelpCircle } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import PoemCard from '../components/PoemCard';
import MudraStamp from '../components/MudraStamp';

export default function DashboardGuru() {
  const { currentUser, submissions, talents, updateSubmissionStatus } = useContext(AppContext);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  
  // Filter submissions assigned to this guru
  const myQueue = submissions.filter(sub => sub.assignedGuruId === currentUser.id);
  
  // Count stats
  const pendingCount = myQueue.filter(sub => sub.status === 'pending').length;
  const verifiedCount = myQueue.filter(sub => sub.status === 'verified').length;
  const revisionCount = myQueue.filter(sub => sub.status === 'revision').length;

  // Selected Submission
  const activeSubmission = myQueue.find(sub => sub.id === selectedSubId) || myQueue.find(sub => sub.status === 'pending') || myQueue[0];

  // My Mentees (talents whose assignedGuru is this guru)
  const myMentees = talents.filter(t => t.assignedGuruId === currentUser.id);

  const handleAction = (status) => {
    if (!activeSubmission) return;
    if (!reviewNotes.trim()) {
      alert('Please write review feedback notes for the artist before submitting your decision.');
      return;
    }

    updateSubmissionStatus(activeSubmission.id, status, reviewNotes);
    alert(`Shubhaarambh! Piece "${activeSubmission.title}" marked as ${status.toUpperCase()} successfully.`);
    setReviewNotes('');
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-10 px-4 md:px-8 fade-in-up">
      <div className="max-w-6xl mx-auto">
        
        {/* Guru Profile Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-ink-light border border-brown-light/20 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent pointer-events-none"></div>
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gold"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-devanagari text-xl text-gold-light">आचार्य,</span>
                <span className="text-[10px] bg-gold/10 border border-gold/30 text-gold px-2.5 py-0.5 rounded-full font-bold uppercase font-sans">
                  {currentUser.plan} Mentor
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl text-cream font-bold mt-1">
                {currentUser.name}
              </h1>
              <p className="text-xs text-cream-dark font-sans mt-0.5">{currentUser.title} &bull; {currentUser.city}</p>
            </div>
          </div>

          {/* Completeness Bar */}
          <div className="w-full md:w-64 bg-ink border border-brown-light/10 p-3.5 rounded-xl">
            <div className="flex justify-between items-baseline text-xs mb-1">
              <span className="text-cream-dark font-sans">Profile Integrity</span>
              <span className="font-bold text-gold">90%</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gold h-1.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-ink-light border border-brown-light/25 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-neutral-800 text-neutral-400 rounded-xl"><CheckSquare size={20} /></div>
            <div>
              <span className="text-2xl text-cream font-bold block leading-none">{pendingCount}</span>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide uppercase mt-1 inline-block">Pending Queue</span>
            </div>
          </div>
          <div className="bg-ink-light border border-brown-light/25 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-gold/10 text-gold rounded-xl"><Sparkles size={20} /></div>
            <div>
              <span className="text-2xl text-gold font-bold block leading-none">{verifiedCount}</span>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide uppercase mt-1 inline-block">Verified Mudras</span>
            </div>
          </div>
          <div className="bg-ink-light border border-brown-light/25 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl"><AlertCircle size={20} /></div>
            <div>
              <span className="text-2xl text-amber-500 font-bold block leading-none">{revisionCount}</span>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide uppercase mt-1 inline-block">Revision Requests</span>
            </div>
          </div>
          <div className="bg-ink-light border border-brown-light/25 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-saffron/10 text-saffron rounded-xl"><CircleDollarSign size={20} /></div>
            <div>
              <span className="text-2xl text-cream font-bold block leading-none">₹8,450</span>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide uppercase mt-1 inline-block">Monthly Payout</span>
            </div>
          </div>
        </div>

        {/* Dash Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: Review Queue List & Mentees (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Review Queue Selectors */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-4 md:p-5 shadow-md">
              <h3 className="font-display text-lg text-cream border-b border-brown-light/10 pb-2 mb-3">
                Review Queue
              </h3>
              
              {myQueue.length === 0 ? (
                <p className="text-xs text-neutral-500 font-sans italic py-4">No works assigned to you yet.</p>
              ) : (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {myQueue.map(sub => {
                    const isActive = activeSubmission && activeSubmission.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubId(sub.id);
                          setReviewNotes(sub.feedback || '');
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isActive
                            ? 'bg-saffron/10 border-saffron shadow-sm'
                            : 'bg-ink border-brown-light/10 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-[10px] font-sans text-neutral-400 capitalize">{sub.type}</span>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                            sub.status === 'verified' ? 'bg-gold/10 text-gold border-gold/20' :
                            sub.status === 'revision' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            sub.status === 'pending' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' :
                            'bg-vermilion/10 text-vermilion border-vermilion/20'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                        <h4 className="font-display font-semibold text-sm text-cream truncate">{sub.title}</h4>
                        <p className="text-[10px] text-neutral-500 mt-1 font-sans">
                          Artist: <span className="font-medium text-cream">{sub.artistName}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mentees Grid */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-4 md:p-5 shadow-md">
              <h3 className="font-display text-lg text-cream border-b border-brown-light/10 pb-2 mb-4 flex items-center justify-between">
                <span>My Mentees</span>
                <Users size={16} className="text-gold" />
              </h3>

              {myMentees.length === 0 ? (
                <p className="text-xs text-neutral-500 font-sans italic">No active mentees matched yet.</p>
              ) : (
                <div className="space-y-3">
                  {myMentees.map(m => (
                    <div key={m.id} className="flex items-center justify-between bg-ink p-2.5 rounded-xl border border-brown-light/10">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-gold/30"
                        />
                        <div>
                          <h4 className="font-sans font-semibold text-xs text-cream">{m.name}</h4>
                          <p className="text-[9px] text-neutral-500 font-sans">{m.genre}</p>
                        </div>
                      </div>
                      <Link to={`/artist/${m.id}`} className="p-1 hover:bg-neutral-800 rounded text-gold">
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT PANEL: Work Details Split & Review Box (8 Cols) */}
          <div className="lg:col-span-8">
            {activeSubmission ? (
              <div className="space-y-6">
                
                {/* 1. Preview Work Container */}
                <div>
                  <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-4">
                    Active Submission Review
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4 text-xs font-sans text-cream-dark">
                    <span>Artist: <strong>{activeSubmission.artistName}</strong> ({activeSubmission.artistCity})</span>
                    <span>&bull;</span>
                    <span>Submitted on: {activeSubmission.date}</span>
                  </div>

                  {activeSubmission.type === 'poetry' ? (
                    <PoemCard
                      title={activeSubmission.title}
                      content={activeSubmission.content}
                      author={activeSubmission.artistStageName || activeSubmission.artistName}
                      status={activeSubmission.status}
                      date={activeSubmission.date}
                    />
                  ) : (
                    <div className="flex justify-center bg-ink-light border border-brown-light/15 rounded-2xl p-8">
                      <AudioPlayer src={activeSubmission.content} title={activeSubmission.title} />
                    </div>
                  )}
                </div>

                {/* 2. Review Action Panel */}
                <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-5 md:p-6 shadow-lg">
                  <h4 className="font-display text-lg text-cream border-b border-brown-light/10 pb-2 mb-4 flex items-center gap-2">
                    <CheckSquare size={16} className="text-saffron" />
                    <span>Critique & Decision Board</span>
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">
                        Guru Critique Notes (Visible to Artist) *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Provide feedback on classical metrics (Beher / Matra), breathing, vocal pitch alignment, pronunciation, or structural edits..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-gold resize-none font-poetic"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => handleAction('verified')}
                        className="flex-1 min-w-[120px] py-2.5 bg-gold hover:bg-gold-light text-brown font-sans font-bold text-xs md:text-sm rounded-xl transition-all shadow-md active:scale-98 border border-gold-dark/40 flex items-center justify-center gap-1"
                      >
                        <Check size={16} />
                        <span>Apply Mudra Stamp</span>
                      </button>
                      
                      <button
                        onClick={() => handleAction('revision')}
                        className="flex-1 min-w-[120px] py-2.5 bg-amber-600 hover:bg-amber-500 text-cream font-sans font-bold text-xs md:text-sm rounded-xl transition-all shadow-md active:scale-98 border border-amber-500/20 flex items-center justify-center gap-1"
                      >
                        <HelpCircle size={16} />
                        <span>Request Revision</span>
                      </button>
                      
                      <button
                        onClick={() => handleAction('declined')}
                        className="flex-1 min-w-[120px] py-2.5 bg-transparent hover:bg-vermilion/5 border border-vermilion/30 hover:border-vermilion text-cream font-sans font-bold text-xs md:text-sm rounded-xl transition-all active:scale-98 flex items-center justify-center gap-1"
                      >
                        <span>Decline Entry</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 bg-ink-light/30 rounded-2xl border border-dashed border-brown-light/10">
                <p className="font-poetic text-lg text-cream-dark italic">"कोई समीक्षा कतार खाली है"</p>
                <p className="text-xs text-neutral-500 font-sans mt-1">Select a submission from the queue to review.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
