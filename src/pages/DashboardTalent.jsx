import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Plus, Bell, Award, Sparkles, ChevronRight, PenTool, Music, BookOpen, Send, X } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import PoemCard from '../components/PoemCard';
import MudraStamp from '../components/MudraStamp';

export default function DashboardTalent() {
  const { currentUser, submissions, gurus, addSubmission, notifications } = useContext(AppContext);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState('poetry'); // 'poetry' or 'music'
  const [content, setContent] = useState('');

  // Filter submissions by current user
  const mySubmissions = submissions.filter(sub => sub.artistId === currentUser.id);

  // Find assigned Guru
  const assignedGuru = gurus.find(g => g.id === currentUser.assignedGuruId);

  // Unread notifications
  const recentNotifications = notifications.slice(0, 4);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill out the Title and Content before submitting.');
      return;
    }

    addSubmission({
      title,
      type,
      content
    });

    // Reset Form
    setTitle('');
    setContent('');
    setShowUploadModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'verified': return 'bg-gold/10 text-gold border-gold/30';
      case 'revision': return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'pending': return 'bg-neutral-500/10 text-neutral-400 border-neutral-750';
      default: return 'bg-vermilion/10 text-vermilion border-vermilion/30';
    }
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-10 px-4 md:px-8 fade-in-up">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-ink-light border border-brown-light/20 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-saffron/5 to-transparent pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-devanagari text-xl text-saffron">नमस्कार,</span>
              <span className="text-xs bg-saffron/10 border border-saffron/30 text-saffron px-3 py-0.5 rounded-full font-bold uppercase font-sans">
                {currentUser.plan} Plan
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-cream font-bold mt-1">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-sm text-cream-dark mt-1 font-poetic italic">
              "{currentUser.bio}"
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-saffron hover:bg-saffron-light text-cream font-sans font-bold rounded-xl transition-all shadow-md active:scale-98 border border-saffron-light/20 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Upload New Work</span>
          </button>
        </div>

        {/* Dash Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Submissions (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-baseline border-b border-brown-light/10 pb-3">
              <h2 className="font-display text-2xl text-cream font-bold">My Submissions</h2>
              <span className="text-xs text-cream-dark font-sans">{mySubmissions.length} pieces total</span>
            </div>

            {mySubmissions.length === 0 ? (
              <div className="text-center py-20 bg-ink-light/45 rounded-2xl border border-dashed border-brown-light/15">
                <p className="font-poetic text-lg text-cream-dark italic">"कोई रचना अपलोड नहीं की गई है"</p>
                <p className="text-xs text-neutral-500 font-sans mt-1">Submit your first creation to receive guru reviews!</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="mt-4 px-5 py-2 bg-saffron/10 border border-saffron/30 text-saffron hover:bg-saffron/20 rounded-xl text-xs font-bold transition-all"
                >
                  Submit Your First Piece
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {mySubmissions.map((sub) => (
                  <div key={sub.id} className="bg-ink-light border border-brown-light/20 rounded-2xl p-5 md:p-6 shadow-md">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          {sub.type === 'poetry' ? (
                            <span className="p-1 bg-saffron/10 text-saffron rounded text-xs"><PenTool size={12} /></span>
                          ) : (
                            <span className="p-1 bg-gold/10 text-gold rounded text-xs"><Music size={12} /></span>
                          )}
                          <span className="text-[10px] font-sans text-neutral-400 capitalize">{sub.type}</span>
                        </div>
                        <h3 className="font-display text-xl text-cream font-semibold">{sub.title}</h3>
                        <p className="text-[10px] text-neutral-500 font-sans">Uploaded on {sub.date}</p>
                      </div>

                      {/* Status badge */}
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider font-sans ${getStatusBadgeClass(sub.status)}`}>
                        {sub.status === 'verified' ? 'Verified ✅' : sub.status === 'revision' ? 'Revision Req ⚠️' : sub.status === 'pending' ? 'Pending ⏳' : 'Declined ❌'}
                      </span>
                    </div>

                    {/* Preview details */}
                    <div className="bg-ink/65 border border-brown-light/10 rounded-xl p-4 mb-4">
                      {sub.type === 'poetry' ? (
                        <p className="font-poetic text-sm leading-relaxed whitespace-pre-line italic text-cream-dark line-clamp-3">
                          {sub.content}
                        </p>
                      ) : (
                        <div className="flex justify-center">
                          <AudioPlayer src={sub.content} title={sub.title} />
                        </div>
                      )}
                    </div>

                    {/* Guru Feedback if exists */}
                    {sub.feedback ? (
                      <div className="border-t border-brown-light/10 pt-4 mt-4">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="text-xs font-bold text-gold uppercase tracking-wider font-sans">
                            Review by {sub.assignedGuruName}
                          </span>
                          {sub.status === 'verified' && (
                            <span className="text-[10px] text-green-500 font-sans font-medium">Mudra Stamp Applied</span>
                          )}
                        </div>
                        <p className="text-xs font-poetic leading-relaxed italic text-cream-dark bg-brown-dark/25 p-3 rounded-lg border border-brown-light/10">
                          "{sub.feedback}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-neutral-500 font-sans italic border-t border-brown-light/10 pt-3">
                        Awaiting review from {sub.assignedGuruName}...
                      </p>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Assigned Guru */}
            {assignedGuru && (
              <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-5 shadow-md">
                <h3 className="font-display text-lg text-gold-light border-b border-brown-light/10 pb-2 mb-4">
                  Assigned Guru
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={assignedGuru.avatar}
                    alt={assignedGuru.name}
                    className="w-12 h-12 rounded-full object-cover border border-gold/50"
                  />
                  <div>
                    <h4 className="font-display font-bold text-cream text-sm">{assignedGuru.name}</h4>
                    <p className="text-[10px] text-saffron font-medium">{assignedGuru.title}</p>
                  </div>
                </div>
                <p className="text-xs text-cream-dark leading-relaxed font-poetic italic mb-3">
                  "{assignedGuru.philosophy}"
                </p>
                <div className="bg-ink/50 rounded-xl p-3 border border-brown-light/10 text-[11px] text-neutral-400 space-y-1">
                  <p><strong>Languages:</strong> {assignedGuru.languages.join(', ')}</p>
                  <p><strong>Hours/Week:</strong> {assignedGuru.availability}</p>
                </div>
              </div>
            )}

            {/* Notifications Feed */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-5 shadow-md">
              <h3 className="font-display text-lg text-cream border-b border-brown-light/10 pb-2 mb-4 flex items-center justify-between">
                <span>Recent Activity</span>
                <Bell size={16} className="text-saffron" />
              </h3>

              <div className="space-y-4">
                {recentNotifications.map((n) => (
                  <div key={n.id} className="text-xs border-b border-brown-light/5 pb-3 last:border-0 last:pb-0">
                    <p className="text-cream leading-relaxed">{n.text}</p>
                    <span className="text-[10px] text-neutral-500 font-sans block mt-1">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Detail Info */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-5 shadow-md">
              <h3 className="font-display text-lg text-cream border-b border-brown-light/10 pb-2 mb-4 flex items-center justify-between">
                <span>Sadhana Account</span>
                <Award size={16} className="text-gold" />
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-cream-dark">Current Plan:</span>
                  <span className="font-bold text-gold font-sans">{currentUser.plan}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-cream-dark">Renewal Date:</span>
                  <span className="font-sans text-cream">21 Jun 2026</span>
                </div>
                <div className="border-t border-brown-light/10 pt-3 mt-1 text-center">
                  <Link
                    to="/pricing"
                    className="text-xs text-saffron hover:text-saffron-light font-bold flex items-center justify-center gap-1"
                  >
                    <span>Upgrade Plan Options</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5. MOCK UPLOAD MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-ink-light border border-brown-light/25 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative fade-in-up">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-cream transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="font-display text-2xl text-gold-light border-b border-brown-light/10 pb-2 mb-6">
                Upload Your Sadhana Work
              </h3>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-1">Piece Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghazal-e-Nafas"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2 text-sm text-cream focus:outline-none focus:border-saffron"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-1">Art Form Type *</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setType('poetry')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        type === 'poetry'
                          ? 'bg-saffron border-saffron text-cream'
                          : 'bg-ink border-brown-light/30 text-cream-dark'
                      }`}
                    >
                      Poetry / Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('music')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        type === 'music'
                          ? 'bg-saffron border-saffron text-cream'
                          : 'bg-ink border-brown-light/30 text-cream-dark'
                      }`}
                    >
                      Music (MP3 Demo link)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-1">
                    {type === 'poetry' ? 'Verse / Poetry Body *' : 'Audio Streaming Link (use URL below for mock test) *'}
                  </label>
                  {type === 'music' && (
                    <p className="text-[10px] text-neutral-500 mb-1">
                      Mock demo track URL is preloaded below: click submit to load HTML5 player.
                    </p>
                  )}
                  <textarea
                    required
                    rows={type === 'poetry' ? 5 : 2}
                    placeholder={type === 'poetry' ? "Enter your lines here..." : "e.g. https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-saffron font-poetic resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-5 py-2 rounded-xl text-xs font-bold font-sans text-cream-dark hover:bg-neutral-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-saffron hover:bg-saffron-light text-cream font-sans font-bold rounded-xl transition-all shadow-md flex items-center gap-1 text-xs"
                  >
                    <Send size={14} />
                    <span>Queue for Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
