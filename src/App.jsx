import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { Bell, User, Settings, Users, LogOut, Info, PenTool, Music, Sparkles } from 'lucide-react';

// Import Pages
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import ExplorePage from './pages/ExplorePage';
import RegisterTalent from './pages/RegisterTalent';
import RegisterGuru from './pages/RegisterGuru';
import DashboardTalent from './pages/DashboardTalent';
import DashboardGuru from './pages/DashboardGuru';
import ArtistProfile from './pages/ArtistProfile';

function Navigation() {
  const { userRole, currentUser, switchRole, notifications, markNotificationsAsRead } = useContext(AppContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDashboardClick = () => {
    if (userRole === 'talent') {
      navigate('/dashboard/talent');
    } else {
      navigate('/dashboard/guru');
    }
  };

  return (
    <header className="bg-ink border-b border-brown-light/20 sticky top-0 z-40 select-none backdrop-blur-md bg-ink/95">
      {/* Quick Role Switcher Bar */}
      <div className="bg-gradient-to-r from-saffron/20 via-gold/10 to-saffron/20 border-b border-brown-light/10 text-center py-2 px-4 flex justify-between items-center max-w-7xl mx-auto text-[11px] md:text-xs">
        <span className="text-cream-dark font-sans flex items-center gap-1.5">
          <Sparkles size={12} className="text-gold animate-pulse" />
          <span>Interactive Mode: Experience both perspectives</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-cream-dark font-sans">Active Role:</span>
          <button
            onClick={() => {
              switchRole('talent');
              navigate('/dashboard/talent');
            }}
            className={`px-3 py-1 rounded-full font-bold uppercase transition-all ${
              userRole === 'talent'
                ? 'bg-saffron text-cream border border-saffron-light/30 shadow-sm'
                : 'bg-ink/50 text-cream-dark border border-brown-light/25 hover:text-cream'
            }`}
          >
            Talent
          </button>
          <button
            onClick={() => {
              switchRole('guru');
              navigate('/dashboard/guru');
            }}
            className={`px-3 py-1 rounded-full font-bold uppercase transition-all ${
              userRole === 'guru'
                ? 'bg-gold text-brown border border-gold-dark/45 shadow-sm'
                : 'bg-ink/50 text-cream-dark border border-brown-light/25 hover:text-cream'
            }`}
          >
            Guru
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-saffron border border-saffron-light/30 flex items-center justify-center shadow-md shadow-saffron/10 group-hover:scale-105 transition-all">
            <svg className="w-5 h-5 text-cream fill-current" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
            </svg>
          </div>
          <div>
            <span className="font-display text-xl text-cream font-bold tracking-wider leading-none block">SANGAM</span>
            <span className="font-devanagari text-[10px] text-gold-light tracking-widest leading-none block mt-0.5">संगम</span>
          </div>
        </Link>

        {/* Main Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-medium">
          <Link
            to="/explore"
            className={`hover:text-gold-light transition-colors ${location.pathname === '/explore' ? 'text-gold' : 'text-cream-dark'}`}
          >
            Explore
          </Link>
          <Link
            to="/pricing"
            className={`hover:text-gold-light transition-colors ${location.pathname === '/pricing' ? 'text-gold' : 'text-cream-dark'}`}
          >
            Pricing
          </Link>
          <button
            onClick={handleDashboardClick}
            className={`hover:text-gold-light transition-colors ${location.pathname.startsWith('/dashboard') ? 'text-gold' : 'text-cream-dark'}`}
          >
            Dashboard
          </button>
        </nav>

        {/* Actions (Notif & User Dropdown) */}
        <div className="flex items-center gap-4">
          
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowUserDropdown(false);
                markNotificationsAsRead();
              }}
              className="p-2 rounded-xl bg-ink-light border border-brown-light/20 text-cream-dark hover:text-cream hover:border-gold/30 transition-all relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-saffron text-cream text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Box */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2.5 w-72 md:w-80 bg-ink-light border border-brown-light/25 rounded-2xl shadow-2xl p-4 z-50 fade-in-up">
                <h4 className="font-display text-sm font-bold text-cream border-b border-brown-light/10 pb-2 mb-3">
                  Notifications
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div key={n.id} className={`text-xs p-2.5 rounded-xl border ${n.read ? 'bg-ink/30 border-transparent text-cream-dark' : 'bg-saffron/5 border-saffron/20 text-cream'}`}>
                      <p className="leading-relaxed">{n.text}</p>
                      <span className="text-[9px] text-neutral-500 font-sans block mt-1">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowNotifDropdown(false);
              }}
              className="flex items-center gap-2 p-1 md:pr-3 rounded-full bg-ink-light border border-brown-light/20 hover:border-gold/30 transition-all text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-gold/45"
              />
              <span className="hidden md:inline text-xs font-semibold text-cream truncate max-w-[80px]">
                {currentUser.stageName || currentUser.name}
              </span>
            </button>

            {/* User Dropdown Box */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2.5 w-52 bg-ink-light border border-brown-light/25 rounded-2xl shadow-2xl p-2 z-50 text-xs font-sans text-cream-dark fade-in-up">
                <div className="p-3 border-b border-brown-light/10 mb-1.5">
                  <p className="font-bold text-cream truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-saffron mt-0.5 capitalize">{userRole} Account</p>
                </div>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    navigate(`/artist/${currentUser.id}`);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-cream transition-colors flex items-center gap-2"
                >
                  <User size={14} />
                  <span>Public Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleDashboardClick();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-cream transition-colors flex items-center gap-2"
                >
                  <Settings size={14} />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    navigate(userRole === 'talent' ? '/register/talent' : '/register/guru');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-cream transition-colors flex items-center gap-2"
                >
                  <Users size={14} />
                  <span>Register Another</span>
                </button>

                <div className="border-t border-brown-light/10 mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    <span>Logout (Exit)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

function MainApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Content views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/register/talent" element={<RegisterTalent />} />
          <Route path="/register/guru" element={<RegisterGuru />} />
          <Route path="/dashboard/talent" element={<DashboardTalent />} />
          <Route path="/dashboard/guru" element={<DashboardGuru />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="*" element={
            <div className="bg-dark-paper-texture min-h-[80vh] flex flex-col items-center justify-center p-4">
              <span className="font-devanagari text-5xl text-saffron mb-3">४०४</span>
              <p className="font-poetic text-lg text-cream-dark italic mb-4">"राह भटक गए हैं आप"</p>
              <p className="text-xs text-neutral-500 font-sans mb-6">The page you are looking for has flown away.</p>
              <Link to="/" className="px-5 py-2.5 bg-saffron text-cream rounded-xl text-xs font-bold font-sans">
                Return to Confluence
              </Link>
            </div>
          } />
        </Routes>
      </main>

      {/* Global Poetic Footer */}
      <footer className="bg-ink-dark border-t border-brown-light/20 py-10 px-4 text-center select-none">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="font-display text-lg text-cream font-bold">SANGAM</span>
            <span className="h-4 w-[1px] bg-brown-light/30"></span>
            <span className="font-devanagari text-xs text-gold-light tracking-wider">संगम</span>
          </div>
          
          <p className="font-poetic text-xs md:text-sm text-neutral-500 italic max-w-md mx-auto leading-relaxed">
            "दो नदियाँ जहाँ आकर मिलती हैं, वहीं सभ्यता का जन्म होता है। <br />
            Where two streams meet, there creative legacy breathes."
          </p>

          <div className="flex justify-center gap-6 text-xs text-cream-dark font-sans pt-2">
            <Link to="/explore" className="hover:text-saffron transition-colors">Explore</Link>
            <Link to="/pricing" className="hover:text-saffron transition-colors">Plans</Link>
            <a href="#about" className="hover:text-saffron transition-colors">Our Ethos</a>
            <a href="#support" className="hover:text-saffron transition-colors">Conservancy</a>
          </div>

          <p className="text-[10px] text-neutral-600 font-sans pt-4">
            &copy; {new Date().getFullYear()} SANGAM Platforms Inc. Made with ❤️ for Indian Classical Arts.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
