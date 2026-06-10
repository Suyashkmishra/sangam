import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Check, ShieldCheck, Heart, Zap, Award, User, Upload, Globe } from 'lucide-react';

export default function RegisterTalent() {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState('');
  const [stageName, setStageName] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [artForm, setArtForm] = useState('Poetry'); // Poetry / Music / Both
  const [genre, setGenre] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [sampleWorkTitle, setSampleWorkTitle] = useState('');
  const [sampleWorkContent, setSampleWorkContent] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Rising Star');

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      description: '1 submission/month, basic profile',
      icon: <Heart size={20} className="text-neutral-500" />,
    },
    {
      name: 'Rising Star',
      price: '₹99/mo',
      description: '5 submissions, priority review',
      icon: <Zap size={20} className="text-saffron" />,
    },
    {
      name: 'Pro Artist',
      price: '₹249/mo',
      description: 'Unlimited submissions, featured listing',
      icon: <Award size={20} className="text-gold" />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !city || !state || !bio) {
      alert('Please fill in the required fields: Name, City, State, and Bio.');
      return;
    }

    const talentProfile = {
      name,
      stageName,
      dob,
      city,
      state,
      artForm,
      genre,
      bio,
      avatar: avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      sampleWork: sampleWorkTitle || 'My Initial Composition',
      plan: selectedPlan,
    };

    registerUser(talentProfile, 'talent');
    navigate('/dashboard/talent');
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-12 px-4 fade-in-up">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block text-saffron text-3xl font-devanagari mb-2">शुरुआत</div>
          <h1 className="font-display text-4xl text-cream font-bold mb-2">Begin Your Journey</h1>
          <p className="text-sm text-cream-dark font-sans max-w-md mx-auto">
            Create your Young Talent account to connect with verified mentors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-ink-light border border-brown-light/20 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <User size={18} className="text-saffron" />
              <span>Personal Details</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kabir Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Stage/Pen Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Kabir"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Lucknow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="UP"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Craft Details */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <Globe size={18} className="text-saffron" />
              <span>Your Craft / Sadhana</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Art Form *</label>
                <div className="flex gap-4">
                  {['Poetry', 'Music', 'Both'].map((art) => (
                    <button
                      key={art}
                      type="button"
                      onClick={() => setArtForm(art)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        artForm === art
                          ? 'bg-saffron border-saffron text-cream'
                          : 'bg-ink border-brown-light/30 text-cream-dark hover:border-gold/30'
                      }`}
                    >
                      {art}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Genre / Style *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ghazal, Folk, Classical Flute, Thumri"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Short Bio (Max 200 Chars) *</label>
                <textarea
                  required
                  maxLength={200}
                  rows={3}
                  placeholder="Tell us about your artistic journey and inspirations..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-saffron resize-none"
                />
                <span className="text-[10px] text-neutral-500 float-right mt-1">{bio.length}/200 chars</span>
              </div>
            </div>
          </div>

          {/* Section 3: Sample Work */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <Upload size={18} className="text-saffron" />
              <span>Initial Work Submission</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Piece Title</label>
                <input
                  type="text"
                  placeholder="e.g. Diya aur Baati"
                  value={sampleWorkTitle}
                  onChange={(e) => setSampleWorkTitle(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Profile Avatar URL (optional)</label>
                <input
                  type="url"
                  placeholder="Link to avatar image"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-saffron"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Poem Text or Audio Stream Link</label>
                <textarea
                  rows={4}
                  placeholder={artForm === 'Music' ? "Paste your audio URL link (e.g. SoundCloud, MP3 stream link)" : "Paste your poem verses here..."}
                  value={sampleWorkContent}
                  onChange={(e) => setSampleWorkContent(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-saffron resize-none font-poetic italic"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Plan Selector */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6">
              Select Your Sadhana Plan
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setSelectedPlan(p.name)}
                  className={`bg-ink border rounded-2xl p-4 cursor-pointer flex flex-col justify-between transition-all ${
                    selectedPlan === p.name
                      ? 'border-saffron bg-saffron/5 ring-1 ring-saffron'
                      : 'border-brown-light/20 hover:border-gold/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-cream font-sans uppercase">{p.name}</span>
                    {p.icon}
                  </div>
                  <div>
                    <span className="font-display text-lg text-gold font-bold block">{p.price}</span>
                    <span className="text-[10px] text-cream-dark leading-tight mt-1 block">{p.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="px-10 py-3.5 bg-saffron hover:bg-saffron-light text-cream font-sans font-bold rounded-xl transition-all shadow-lg shadow-saffron/10 border border-saffron-light/20 active:scale-98"
            >
              Register & Enter Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
