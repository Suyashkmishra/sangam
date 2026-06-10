import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Filter, PenTool, Music, Sparkles } from 'lucide-react';
import GuruCard from '../components/GuruCard';
import PoemCard from '../components/PoemCard';
import AudioPlayer from '../components/AudioPlayer';

export default function ExplorePage() {
  const { gurus, submissions } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('works'); // 'works' or 'gurus'
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [artFormFilter, setArtFormFilter] = useState('all'); // 'all', 'poetry', 'music'
  const [cityFilter, setCityFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Available cities from both sources for dynamic filters
  const cities = ['all', ...new Set([
    ...gurus.map(g => g.city),
    ...submissions.map(s => s.artistCity)
  ])];

  // Filtering Logic
  const filteredWorks = submissions.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          work.artistName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArtForm = artFormFilter === 'all' || work.type === artFormFilter;
    const matchesCity = cityFilter === 'all' || work.artistCity === cityFilter;
    const matchesVerification = !verifiedOnly || work.status === 'verified';
    
    return matchesSearch && matchesArtForm && matchesCity && matchesVerification;
  });

  const filteredGurus = gurus.filter(guru => {
    const matchesSearch = guru.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guru.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArtForm = artFormFilter === 'all' || 
                           (artFormFilter === 'poetry' && (guru.specialization.toLowerCase().includes('poet') || guru.specialization.toLowerCase().includes('ghazal') || guru.specialization.toLowerCase().includes('literature'))) ||
                           (artFormFilter === 'music' && (guru.specialization.toLowerCase().includes('classical') || guru.specialization.toLowerCase().includes('flute') || guru.specialization.toLowerCase().includes('vocals') || guru.specialization.toLowerCase().includes('raga')));
    const matchesCity = cityFilter === 'all' || guru.city === cityFilter;
    
    return matchesSearch && matchesArtForm && matchesCity;
  });

  const handleConnectGuru = (guru) => {
    alert(`Request sent to connect with ${guru.name}. They will review your current submissions soon.`);
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-12 px-4 fade-in-up">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-cream font-bold mb-2">Explore the Confluence</h1>
          <p className="text-sm text-cream-dark font-poetic max-w-xl mx-auto">
            Discover verified creations of young classical artists, and browse directories of master Gurus.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8 border-b border-brown-light/10 pb-1">
          <div className="flex gap-8">
            <button
              onClick={() => { setActiveTab('works'); setSearchQuery(''); }}
              className={`pb-3 font-sans text-sm md:text-base font-bold tracking-wider uppercase border-b-2 transition-all ${
                activeTab === 'works'
                  ? 'border-saffron text-saffron'
                  : 'border-transparent text-cream-dark hover:text-cream'
              }`}
            >
              Verified Works
            </button>
            <button
              onClick={() => { setActiveTab('gurus'); setSearchQuery(''); }}
              className={`pb-3 font-sans text-sm md:text-base font-bold tracking-wider uppercase border-b-2 transition-all ${
                activeTab === 'gurus'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-cream-dark hover:text-cream'
              }`}
            >
              Master Gurus
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-4 md:p-6 mb-8 shadow-md">
          <div className="grid md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input
                type="text"
                placeholder={activeTab === 'works' ? "Search poems, compositions..." : "Search specialization, Ustad name..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink/75 border border-brown-light/30 rounded-xl pl-10 pr-4 py-2 text-sm text-cream placeholder-neutral-500 focus:outline-none focus:border-saffron transition-all"
              />
            </div>

            {/* Art Form Filter */}
            <div className="md:col-span-3">
              <select
                value={artFormFilter}
                onChange={(e) => setArtFormFilter(e.target.value)}
                className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-saffron transition-all"
              >
                <option value="all">All Art Forms</option>
                <option value="poetry">Poetry / Literature</option>
                <option value="music">Music / Classical Vocal</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="md:col-span-3">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-ink/75 border border-brown-light/30 rounded-xl px-3 py-2 text-sm text-cream focus:outline-none focus:border-saffron transition-all capitalize"
              >
                <option value="all">All Cities</option>
                {cities.filter(c => c !== 'all').map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Toggle (Verified Only) */}
            <div className="md:col-span-2 flex items-center justify-end">
              {activeTab === 'works' ? (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded bg-ink border-brown-light/30 text-saffron focus:ring-0"
                  />
                  <span className="text-xs text-cream-dark hover:text-cream transition-colors">Verified Only</span>
                </label>
              ) : (
                <div className="text-xs text-gold flex items-center gap-1">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>100% Certified Gurus</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Dynamic List Content */}
        {activeTab === 'works' ? (
          <div>
            {filteredWorks.length === 0 ? (
              <div className="text-center py-20 bg-ink-light/30 rounded-2xl border border-dashed border-brown-light/10">
                <p className="font-poetic text-lg text-cream-dark italic">"कोई रचना नहीं मिली"</p>
                <p className="text-xs text-neutral-500 font-sans mt-1">No verified submissions match your query.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredWorks.map((work) => (
                  <div key={work.id} className="bg-ink-light/80 border border-brown-light/20 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                    <div>
                      {/* Subtitle */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          {work.type === 'poetry' ? (
                            <span className="p-1.5 bg-saffron/10 text-saffron rounded"><PenTool size={14} /></span>
                          ) : (
                            <span className="p-1.5 bg-gold/10 text-gold rounded"><Music size={14} /></span>
                          )}
                          <span className="text-xs font-sans text-cream-dark capitalize">{work.type} &bull; {work.artistCity}</span>
                        </div>
                        {work.status === 'verified' && (
                          <span className="text-[10px] bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold">
                            Mudra Verified ✅
                          </span>
                        )}
                      </div>

                      {/* Header title */}
                      <h3 className="font-display text-xl text-cream font-semibold mb-2">{work.title}</h3>
                      <p className="text-xs text-neutral-400 mb-4">Submitted by: <span className="text-saffron font-bold font-sans">{work.artistName}</span> on {work.date}</p>

                      {/* Content block */}
                      <div className="mb-6 bg-ink border border-brown-light/10 rounded-xl p-4 overflow-hidden">
                        {work.type === 'poetry' ? (
                          <p className="font-poetic text-sm leading-relaxed whitespace-pre-line italic text-cream-dark line-clamp-4">
                            {work.content}
                          </p>
                        ) : (
                          <div className="flex justify-center">
                            <AudioPlayer src={work.content} title={work.title} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer feedback */}
                    {work.feedback && (
                      <div className="bg-brown-dark/25 rounded-lg p-3 border border-brown-light/10 text-xs mt-2">
                        <span className="font-bold text-gold uppercase text-[9px] block mb-1">Guru Review ({work.assignedGuruName}):</span>
                        <p className="text-cream-dark font-poetic italic line-clamp-2">"{work.feedback}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredGurus.length === 0 ? (
              <div className="text-center py-20 bg-ink-light/30 rounded-2xl border border-dashed border-brown-light/10">
                <p className="font-poetic text-lg text-cream-dark italic">"कोई गुरु नहीं मिले"</p>
                <p className="text-xs text-neutral-500 font-sans mt-1">No Gurus match your search filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGurus.map((guru) => (
                  <GuruCard
                    key={guru.id}
                    guru={guru}
                    onSelect={handleConnectGuru}
                    showAction={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
