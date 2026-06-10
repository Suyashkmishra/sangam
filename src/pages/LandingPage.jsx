import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { PenTool, Music, Award, Users, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import GuruCard from '../components/GuruCard';

export default function LandingPage() {
  const { gurus, talents } = useContext(AppContext);

  // Showcase a couple of Gurus and artists
  const featuredGurus = gurus.slice(0, 2);
  
  const testimonials = [
    {
      text: "जो बात लफ़्ज़ों में बयाँ नहीं होती, वो सुरों में ढल जाती है। SANGAM didn't just review my classical songs; they connected me with an Ustad who corrected my breathing and raga transitions.",
      author: "Meera Devi",
      role: "Semi-Classical Singer",
      city: "Varanasi"
    },
    {
      text: "बहरे-सुख़न की बारीकियों को समझना हर नए लिखने वाले के लिए ज़रूरी है। On SANGAM, receiving advice directly from Ustad Rashid Khan was like having a mushaira mentor in my pocket.",
      author: "Kabir Sen",
      role: "Urdu Ghazal Poet",
      city: "Lucknow"
    }
  ];

  return (
    <div className="fade-in-up bg-dark-paper-texture min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 overflow-hidden border-b border-brown-light/25">
        {/* River metaphore flow line art background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="river-path" d="M-100 150 Q 300 120 720 400 T 1540 650" stroke="#C45C1A" strokeWidth="3" fill="none" />
            <path className="river-path" d="M-100 200 Q 350 280 720 400 T 1540 600" stroke="#D4AF37" strokeWidth="2.5" fill="none" style={{ animationDelay: '-5s' }} />
            <path className="river-path" d="M-100 250 Q 400 380 720 400 T 1540 550" stroke="#EDE8DC" strokeWidth="1.5" fill="none" style={{ animationDelay: '-12s' }} />
          </svg>
        </div>

        {/* Diya glowing graphic back glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full ink-wash-saffron pointer-events-none z-0"></div>

        <div className="max-w-5xl mx-auto text-center z-10 relative px-2">
          {/* Poetic Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/30 rounded-full px-4 py-1.5 mb-6 text-saffron text-xs md:text-sm font-semibold tracking-wider uppercase font-sans">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
            </span>
            Confluence of Poetic & Musical Souls
          </div>

          {/* Main calligraphic heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream mb-6 leading-tight">
            Where Young Voices <br />
            Find Their <span className="text-gold-light italic">Guru</span>
          </h1>

          {/* Tagline / Subtext */}
          <p className="text-base md:text-xl text-cream-dark font-poetic max-w-3xl mx-auto leading-relaxed mb-10">
            Submit your ghazals, kavitas, or classical audio compositions. Get authentic verification, 
            metrical critique, and public recognition from India's living legends. 
            <span className="block mt-2 text-saffron font-semibold">"Sacred Ink meets Digital Soul"</span>
          </p>

          {/* Dual CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Link
              to="/register/talent"
              className="w-full sm:w-auto px-8 py-3.5 bg-saffron hover:bg-saffron-light text-cream font-bold font-sans text-sm md:text-base rounded-xl transition-all shadow-md active:scale-98 border border-saffron-light/20 flex items-center justify-center gap-2 group"
            >
              <span>Join as Young Talent</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/register/guru"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-cream/5 text-cream border border-cream/30 hover:border-gold font-bold font-sans text-sm md:text-base rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Join as Guru / Mentor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SANGAM */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-b border-brown-light/10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative flex justify-center">
            {/* Elegant Vector / CSS Artwork showing Confluence */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-gradient-to-br from-brown/30 to-ink-light border border-brown-light/20 rounded-full shadow-2xl p-4">
              <div className="absolute inset-2 border-2 border-dashed border-gold/20 rounded-full mandala-slow-spin"></div>
              {/* Diya SVG center */}
              <div className="flex flex-col items-center z-10 text-center">
                {/* Diya lamp base */}
                <svg className="w-20 h-20 text-gold fill-current" viewBox="0 0 24 24">
                  <path className="diya-flame" d="M12,2 Q 13.5,6 12,9 Q 10.5,6 12,2 Z" fill="#C45C1A" />
                  <path d="M12,9 Q 13.5,12 15,15 Q 16.5,18 12,20 Q 7.5,18 9,15 Q 10.5,12 12,9 Z" fill="#D4AF37" />
                  <path d="M4,15 C 4,11 7,12 12,12 C 17,12 20,11 20,15 C 20,19 16,21 12,21 C 8,21 4,19 4,15 Z" fill="#2C1810" />
                </svg>
                <span className="font-devanagari text-2xl text-gold-light mt-2">संगम</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-4xl text-gold-light font-semibold mb-6">
              The Flow of Art and Wisdom
            </h2>
            <p className="font-poetic text-base md:text-lg leading-relaxed text-cream-dark mb-6">
              Like the sacred confluence of the Ganges, Yamuna, and Saraswati, SANGAM brings together two vibrant streams of heritage. On one side are the young, restless artists with fire in their bellies and ink on their fingers. On the other are the Ustads, Pandits, and Gurus who hold the metrics, the ragas, and the history.
            </p>
            <p className="font-poetic text-base md:text-lg leading-relaxed text-cream-dark mb-6">
              Too often, modern digital spaces reward noise over depth. SANGAM is a sanctuary built for refinement. Here, a piece of poetry is not just a caption; it is structured, verified, and stamped with authority.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 bg-ink-light px-4 py-2 rounded-xl border border-brown-light/20">
                <PenTool size={18} className="text-saffron" />
                <span className="text-xs font-sans text-cream">Metrical Critique</span>
              </div>
              <div className="flex items-center gap-2 bg-ink-light px-4 py-2 rounded-xl border border-brown-light/20">
                <Music size={18} className="text-saffron" />
                <span className="text-xs font-sans text-cream">Raga Correctness</span>
              </div>
              <div className="flex items-center gap-2 bg-ink-light px-4 py-2 rounded-xl border border-brown-light/20">
                <ShieldCheck size={18} className="text-saffron" />
                <span className="text-xs font-sans text-cream">Mudra Stamp Verification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-ink-light/50 border-b border-brown-light/10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold">How SANGAM Connects</h2>
            <p className="text-sm md:text-base text-cream-dark font-sans max-w-xl mx-auto mt-2">
              A transparent, supportive, and educational pathway for classical growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-6 relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/30 text-saffron flex items-center justify-center mb-4 text-lg font-bold font-mono">
                1
              </div>
              <h3 className="font-display text-xl text-gold-light font-semibold mb-2">Create Your Profile</h3>
              <p className="text-xs md:text-sm text-cream-dark font-poetic">
                Register either as a **Young Talent** showcasing your art form or a **Guru** willing to share your wisdom and critique submissions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-6 relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/30 text-saffron flex items-center justify-center mb-4 text-lg font-bold font-mono">
                2
              </div>
              <h3 className="font-display text-xl text-gold-light font-semibold mb-2">Submit & Assign</h3>
              <p className="text-xs md:text-sm text-cream-dark font-poetic">
                Upload your ghazal text or MP3 classical audio. Select a verified Guru or let our system route it to the appropriate master of the genre.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-ink-light border border-brown-light/20 rounded-2xl p-6 relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/30 text-saffron flex items-center justify-center mb-4 text-lg font-bold font-mono">
                3
              </div>
              <h3 className="font-display text-xl text-gold-light font-semibold mb-2">Refine & Verify</h3>
              <p className="text-xs md:text-sm text-cream-dark font-poetic">
                Receive metrical, phonetic, or melodic feedback. Once perfect, get the gold wax **Mudra Stamp** and show your verified badge to the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED GURUS */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-b border-brown-light/10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold">Featured Gurus & Mentors</h2>
            <p className="text-xs md:text-sm text-cream-dark font-sans mt-1">Ustads and Vidushis actively reviewing works</p>
          </div>
          <Link to="/explore" className="text-saffron hover:text-saffron-light text-sm font-semibold flex items-center gap-1 mt-2 md:mt-0">
            <span>Explore All Mentors</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gurus.map(guru => (
            <GuruCard key={guru.id} guru={guru} showAction={false} />
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS (SHAYARI STYLE) */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center relative">
        <div className="absolute top-10 left-10 text-saffron/5 font-display text-9xl pointer-events-none select-none">“</div>
        <div className="absolute bottom-10 right-10 text-saffron/5 font-display text-9xl pointer-events-none select-none">”</div>
        
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-gold-light font-bold">Poetic Testimonials</h2>
          <p className="text-xs text-cream-dark font-sans mt-1">From the confluences of our creative streams</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-parchment border border-parchment-dark rounded-2xl p-6 shadow-xl text-brown bg-parchment-texture relative">
              <p className="font-poetic text-sm md:text-base leading-relaxed italic mb-4">
                "{t.text}"
              </p>
              <div className="border-t border-brown-light/10 pt-3">
                <p className="font-sans text-xs uppercase tracking-wider text-saffron font-bold">{t.author}</p>
                <p className="text-[10px] text-brown/60 font-sans mt-0.5">{t.role} — {t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST STATS BAR */}
      <section className="bg-gradient-to-br from-brown-dark to-ink py-16 px-4 border-t border-brown-light/10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex justify-center mb-2"><Users size={28} className="text-gold" /></div>
            <p className="font-display text-3xl md:text-4xl text-cream font-bold">1,240+</p>
            <p className="text-xs text-cream-dark uppercase tracking-wider font-sans mt-1">Young Artists</p>
          </div>
          <div>
            <div className="flex justify-center mb-2"><Award size={28} className="text-gold" /></div>
            <p className="font-display text-3xl md:text-4xl text-cream font-bold">45+</p>
            <p className="text-xs text-cream-dark uppercase tracking-wider font-sans mt-1">Verified Gurus</p>
          </div>
          <div>
            <div className="flex justify-center mb-2"><FileCheck size={28} className="text-gold" /></div>
            <p className="font-display text-3xl md:text-4xl text-cream font-bold">3,890+</p>
            <p className="text-xs text-cream-dark uppercase tracking-wider font-sans mt-1">Works Reviewed</p>
          </div>
          <div>
            <div className="flex justify-center mb-2"><ShieldCheck size={28} className="text-gold" /></div>
            <p className="font-display text-3xl md:text-4xl text-cream font-bold">98.2%</p>
            <p className="text-xs text-cream-dark uppercase tracking-wider font-sans mt-1">Trust Score</p>
          </div>
        </div>
      </section>
    </div>
  );
}
