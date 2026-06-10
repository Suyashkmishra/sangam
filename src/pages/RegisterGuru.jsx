import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Check, ShieldCheck, Heart, Zap, Award, User, Upload, BookOpen } from 'lucide-react';

export default function RegisterGuru() {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [awards, setAwards] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [philosophy, setPhilosophy] = useState('');
  const [languages, setLanguages] = useState('');
  const [availability, setAvailability] = useState('');
  const [avatar, setAvatar] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Verified Guru');

  const plans = [
    {
      name: 'Verified Guru',
      price: '₹199/mo',
      description: 'Verified badge, review up to 10 submissions/mo',
      icon: <ShieldCheck size={20} className="text-saffron" />,
    },
    {
      name: 'Master',
      price: '₹499/mo',
      description: 'Priority listing, unlimited reviews, earn commission',
      icon: <Award size={20} className="text-gold" />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !specialization || !bio) {
      alert('Please fill in the required fields: Name, Title, Specialization, and Bio.');
      return;
    }

    const guruProfile = {
      name,
      title,
      experience: experience || '10+ Years',
      specialization,
      awards,
      city: city || 'Varanasi',
      bio,
      philosophy: philosophy || 'Dedication to the craft breeds excellence.',
      languages: languages ? languages.split(',').map(l => l.trim()) : ['Hindi', 'English'],
      availability: availability || '5 hours/week',
      avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      plan: selectedPlan,
    };

    registerUser(guruProfile, 'guru');
    navigate('/dashboard/guru');
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-12 px-4 fade-in-up">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block text-gold text-3xl font-devanagari mb-2">मार्गदर्शन</div>
          <h1 className="font-display text-4xl text-cream font-bold mb-2">Join as Mentor / Guru</h1>
          <p className="text-sm text-cream-dark font-sans max-w-md mx-auto">
            Share your wisdom, certify rising talents, and protect classical heritage.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-ink-light border border-brown-light/20 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <User size={18} className="text-gold" />
              <span>Personal Details</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pandit Hari Prasad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Professional Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Hindustani Classical Vocals"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Years of Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 25 Years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Primary City</label>
                  <input
                    type="text"
                    placeholder="Varanasi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Availability (hours/wk)</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 hours/week"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Specialization & Credentials */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <BookOpen size={18} className="text-gold" />
              <span>Mentorship Expertise</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Specializations * (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ghazal, Ragas, Bansuri, Beher rhythm"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Affiliated Organizations / Awards (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Sangeet Natak Akademi"
                  value={awards}
                  onChange={(e) => setAwards(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Languages for Mentoring (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Hindi, Sanskrit, English"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Short Biography (Max 200 Chars) *</label>
                <textarea
                  required
                  maxLength={200}
                  rows={2}
                  placeholder="Summarize your professional background..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Mentorship Philosophy (Your 'Sadhana' view)</label>
                <textarea
                  rows={2}
                  placeholder="Explain your approach to teaching and correcting young artists..."
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl p-4 text-sm text-cream focus:outline-none focus:border-gold resize-none font-poetic italic"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Photo & Credentials */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6 flex items-center gap-2">
              <Upload size={18} className="text-gold" />
              <span>Identity Verification</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Profile Avatar URL (optional)</label>
                <input
                  type="url"
                  placeholder="Link to avatar image"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cream-dark mb-2">Upload Credentials / Awards certificate (optional)</label>
                <div className="w-full bg-ink/50 border border-dashed border-brown-light/30 rounded-xl px-4 py-2.5 text-xs text-cream-dark text-center cursor-pointer hover:border-gold/30 transition-colors">
                  Drag and drop credentials or click to browse
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Plan Selector */}
          <div>
            <h3 className="font-display text-xl text-gold-light border-b border-brown-light/10 pb-2 mb-6">
              Choose Your Expert Listing Plan
            </h3>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {plans.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setSelectedPlan(p.name)}
                  className={`bg-ink border rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all ${
                    selectedPlan === p.name
                      ? 'border-gold bg-gold/5 ring-1 ring-gold'
                      : 'border-brown-light/20 hover:border-gold/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-cream font-sans uppercase">{p.name}</span>
                    {p.icon}
                  </div>
                  <div>
                    <span className="font-display text-xl text-gold font-bold block">{p.price}</span>
                    <span className="text-[10px] text-cream-dark leading-snug mt-1 block">{p.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="px-10 py-3.5 bg-gold hover:bg-gold-light text-brown font-sans font-bold rounded-xl transition-all shadow-lg shadow-gold/10 border border-gold-dark/40 active:scale-98"
            >
              Verify Credentials & Enter Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
