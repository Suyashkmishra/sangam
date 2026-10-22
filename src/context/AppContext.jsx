import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const AppContext = createContext();

const initialSubmissions = [
  {
    id: 'sub-1',
    title: 'Aina-e-Dil (आईना-ए-दिल)',
    artistId: 'talent-1',
    artistName: 'Kabir Sen',
    artistStageName: 'Kabir',
    artistCity: 'Lucknow',
    type: 'poetry',
    content: `दिल की बस्ती भी अजब बस्ती है दोस्तों,
लूटने वाले को तरसती है दोस्तों।

आँख रोती है तो रोने दो इसे,
यह सावन की तरह बरसती है दोस्तों।

जिसके ख़्वाबों में खोए रहते हैं हम,
वह भी क्या हमसफ़र तरसती है दोस्तों।`,
    status: 'verified',
    assignedGuruId: 'guru-1',
    assignedGuruName: 'Ustad Rashid Khan',
    date: '2026-05-18',
    feedback: 'A beautiful exploration of classical rhythm (Beher). The flow is mature, and the choice of words evokes deep emotions. The transition between the second and third sher is seamless. Excellent work, beta.',
    rating: 5,
  },
  {
    id: 'sub-2',
    title: 'Bhairavi Thumri - Ras ke Bhare Torey Nain',
    artistId: 'talent-2',
    artistName: 'Meera Devi',
    artistStageName: 'Meera',
    artistCity: 'Varanasi',
    type: 'music',
    content: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    status: 'pending',
    assignedGuruId: 'guru-2',
    assignedGuruName: 'Pandit Hari Prasad',
    date: '2026-05-20',
    feedback: '',
  },
  {
    id: 'sub-3',
    title: 'Shunya se Anant (शून्य से अनंत)',
    artistId: 'talent-1',
    artistName: 'Kabir Sen',
    artistStageName: 'Kabir',
    artistCity: 'Lucknow',
    type: 'poetry',
    content: `शून्य से यात्रा शुरू हुई,
अनंत की ओर बहती गई।
सांसें थमी तो पता चला,
मंजिल तो मेरे पास ही थी।

लहरें उठती हैं सागर में जैसे,
उठती रही उम्मीदें भी वैसे।
मगर साहिल पर आकर जाना,
तलाश तो खुद की जारी थी।`,
    status: 'revision',
    assignedGuruId: 'guru-1',
    assignedGuruName: 'Ustad Rashid Khan',
    date: '2026-05-19',
    feedback: 'The imagery is profound, Kabir. However, in the second line of the first stanza, there is a slight break in the metrical rhythm (Matra count). Try adjusting "अनंत की ओर बहती गई" to match the syllable tempo of the first line. Perhaps "अनंत राह पर बहती गई" or similar. Re-submit once adjusted.',
  }
];

const mockGurus = [
  {
    id: 'guru-1',
    name: 'Ustad Rashid Khan',
    title: 'Master of Ghazals & Urdu Literature',
    specialization: 'Ghazal, Nazm, Urdu Poetry, Beher (Metre)',
    experience: '32 Years',
    awards: 'Sangeet Natak Akademi Award, Padma Shri nominee',
    city: 'Lucknow',
    bio: 'Dedicated to preserving the classical art of Lakhnavi Urdu poetry. Believes that poetry is the breath of the soul made audible.',
    philosophy: 'A poet must first learn to listen to silence before they can write words that resonate with history.',
    languages: ['Urdu', 'Hindi', 'English'],
    availability: '8 hours/week',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    plan: 'Master',
  },
  {
    id: 'guru-2',
    name: 'Pandit Hari Prasad',
    title: 'Doyen of Hindustani Classical Flute & Vocals',
    specialization: 'Hindustani Classical, Thumri, Ragas, Bansuri',
    experience: '40 Years',
    awards: 'Padma Vibhushan recipient, Kalidas Samman',
    city: 'Varanasi',
    bio: 'Belongs to the Senia-Maihar Gharana. Spent four decades performing across the globe and tutoring young virtuosos.',
    philosophy: 'Sur (note) and Laya (tempo) are not elements of music, they are elements of the universe. Align with them, and you align with God.',
    languages: ['Hindi', 'Sanskrit', 'Bengali'],
    availability: '6 hours/week',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200',
    plan: 'Verified Guru',
  },
  {
    id: 'guru-3',
    name: 'Vidushi Jayashree',
    title: 'Carnatic Vocal Virtuoso & Composer',
    specialization: 'Carnatic Classical, Kritis, Raga Alpana, Rhythm systems',
    experience: '26 Years',
    awards: 'Sangeet Kalanidhi, Tamil Isai Sangam Award',
    city: 'Chennai',
    bio: 'Renowned for her expressive storytelling through Carnatic vocals. Mentors classical artists globally in pitch accuracy and emotive expression (Bhava).',
    philosophy: 'Technical perfection is the body of music, but Bhava (feeling) is the soul. Never sacrifice the soul for speed.',
    languages: ['Tamil', 'Telugu', 'Kannada', 'English'],
    availability: '10 hours/week',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    plan: 'Verified Guru',
  }
];

const mockTalents = [
  {
    id: 'talent-1',
    name: 'Kabir Sen',
    stageName: 'Kabir',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    dob: '2002-08-14',
    artForm: 'Poetry',
    genre: 'Ghazal & Sufi Poetry',
    bio: 'Weaving classical Lucknowi Urdu structure with modern sensibilities. Writing since I was 16.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    sampleWork: 'Aina-e-Dil',
    plan: 'Rising Star',
    assignedGuruId: 'guru-1',
  },
  {
    id: 'talent-2',
    name: 'Meera Devi',
    stageName: 'Meera',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    dob: '2004-03-22',
    artForm: 'Music',
    genre: 'Semi-Classical & Thumri',
    bio: 'Trained under local experts in Varanasi. Seeking guru guidance to refine raga transitions and classical voice modulation.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    sampleWork: 'Bhairavi Thumri',
    plan: 'Free',
    assignedGuruId: 'guru-2',
  }
];

// Helper mappers between Supabase snake_case and React camelCase
const mapProfileFromDb = (p) => ({
  id: p.id,
  name: p.name,
  stageName: p.stage_name || p.name,
  role: p.role,
  title: p.title || '',
  specialization: p.specialization || '',
  experience: p.experience || '',
  awards: p.awards || '',
  city: p.city || '',
  state: p.state || '',
  dob: p.dob || '',
  artForm: p.art_form || 'Poetry',
  genre: p.genre || '',
  bio: p.bio || '',
  philosophy: p.philosophy || '',
  languages: p.languages || [],
  availability: p.availability || '',
  avatar: p.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  sampleWork: p.sample_work || '',
  plan: p.plan || 'Free',
  assignedGuruId: p.assigned_guru_id || 'guru-1'
});

const mapSubmissionFromDb = (s) => ({
  id: s.id,
  title: s.title,
  artistId: s.artist_id,
  artistName: s.artist_name,
  artistStageName: s.artist_stage_name || s.artist_name,
  artistCity: s.artist_city,
  type: s.type,
  content: s.content,
  status: s.status,
  assignedGuruId: s.assigned_guru_id,
  assignedGuruName: s.assigned_guru_name,
  date: s.date,
  feedback: s.feedback || '',
  rating: s.rating
});

const mapNotificationFromDb = (n) => ({
  id: n.id,
  text: n.text,
  type: n.type || 'info',
  date: n.date || 'Just now',
  read: !!n.read
});

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('sangam_role') || 'talent';
  });

  const [gurus, setGurus] = useState(mockGurus);
  const [talents, setTalents] = useState(mockTalents);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('sangam_user');
    if (savedUser) return JSON.parse(savedUser);
    return userRole === 'talent' ? mockTalents[0] : mockGurus[0];
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('sangam_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      text: 'Ustad Rashid Khan verified your piece "Aina-e-Dil"! ✅',
      type: 'success',
      date: '2 hours ago',
      read: false
    },
    {
      id: 'notif-2',
      text: 'Ustad Rashid Khan requested a revision on "Shunya se Anant". 📝',
      type: 'revision',
      date: '1 day ago',
      read: false
    },
    {
      id: 'notif-3',
      text: 'Welcome to SANGAM! Complete your profile to match with your ideal Guru.',
      type: 'info',
      date: '3 days ago',
      read: true
    }
  ]);

  // Load live data from Supabase if tables exist
  useEffect(() => {
    async function fetchFromSupabase() {
      try {
        // Fetch profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (!profilesError && profilesData && profilesData.length > 0) {
          const dbGurus = profilesData.filter(p => p.role === 'guru').map(mapProfileFromDb);
          const dbTalents = profilesData.filter(p => p.role === 'talent').map(mapProfileFromDb);
          if (dbGurus.length > 0) setGurus(dbGurus);
          if (dbTalents.length > 0) setTalents(dbTalents);
        }

        // Fetch submissions
        const { data: subsData, error: subsError } = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!subsError && subsData && subsData.length > 0) {
          setSubmissions(subsData.map(mapSubmissionFromDb));
        }

        // Fetch notifications
        const { data: notifsData, error: notifsError } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false });

        if (!notifsError && notifsData && notifsData.length > 0) {
          setNotifications(notifsData.map(mapNotificationFromDb));
        }
      } catch (err) {
        console.warn('Supabase initial fetch note (using local cache):', err);
      }
    }

    fetchFromSupabase();
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sangam_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('sangam_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sangam_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Switch role helper
  const switchRole = (newRole) => {
    setUserRole(newRole);
    if (newRole === 'talent') {
      setCurrentUser(talents[0] || mockTalents[0]);
    } else {
      setCurrentUser(gurus[0] || mockGurus[0]);
    }
  };

  // Add Submission (Poetry or Music)
  const addSubmission = async (newSub) => {
    const subObj = {
      id: `sub-${Date.now()}`,
      artistId: currentUser.id,
      artistName: currentUser.name,
      artistStageName: currentUser.stageName || currentUser.name,
      artistCity: currentUser.city || 'Lucknow',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      assignedGuruId: currentUser.assignedGuruId || 'guru-1',
      assignedGuruName: gurus.find(g => g.id === (currentUser.assignedGuruId || 'guru-1'))?.name || 'Ustad Rashid Khan',
      feedback: '',
      ...newSub
    };

    setSubmissions(prev => [subObj, ...prev]);

    const newNotification = {
      id: `notif-${Date.now()}`,
      text: `Your new submission "${subObj.title}" has been uploaded and queued for review.`,
      type: 'info',
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Asynchronously sync to Supabase
    try {
      await supabase.from('submissions').insert({
        id: subObj.id,
        title: subObj.title,
        artist_id: subObj.artistId,
        artist_name: subObj.artistName,
        artist_stage_name: subObj.artistStageName,
        artist_city: subObj.artistCity,
        type: subObj.type,
        content: subObj.content,
        status: subObj.status,
        assigned_guru_id: subObj.assignedGuruId,
        assigned_guru_name: subObj.assignedGuruName,
        date: subObj.date,
        feedback: subObj.feedback
      });

      await supabase.from('notifications').insert({
        id: newNotification.id,
        user_id: subObj.artistId,
        text: newNotification.text,
        type: newNotification.type,
        date: newNotification.date,
        read: newNotification.read
      });
    } catch (err) {
      console.warn('Supabase sync note on submission:', err);
    }
  };

  // Update Submission (Approve / Reject / Request Revision)
  const updateSubmissionStatus = async (subId, status, feedback) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === subId) {
        return { ...sub, status, feedback };
      }
      return sub;
    }));

    const targetSub = submissions.find(s => s.id === subId);
    if (targetSub) {
      let statusEmoji = '📝';
      if (status === 'verified') statusEmoji = '✅';
      if (status === 'revision') statusEmoji = '⚠️';
      if (status === 'declined') statusEmoji = '❌';

      const newNotif = {
        id: `notif-${Date.now()}`,
        text: `Your submission "${targetSub.title}" is now marked as ${status.toUpperCase()} ${statusEmoji} by ${currentUser.name}.`,
        type: status === 'verified' ? 'success' : status === 'revision' ? 'revision' : 'info',
        date: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);

      // Asynchronously sync to Supabase
      try {
        await supabase
          .from('submissions')
          .update({ status, feedback })
          .eq('id', subId);

        await supabase.from('notifications').insert({
          id: newNotif.id,
          user_id: targetSub.artistId,
          text: newNotif.text,
          type: newNotif.type,
          date: newNotif.date,
          read: newNotif.read
        });
      } catch (err) {
        console.warn('Supabase sync note on review:', err);
      }
    }
  };

  // Register user (talent or guru)
  const registerUser = async (profileData, role) => {
    const newUser = {
      id: `${role}-${Date.now()}`,
      ...profileData,
      role,
      avatar: profileData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    };

    if (role === 'talent') {
      newUser.assignedGuruId = 'guru-1';
      setTalents(prev => [...prev, newUser]);
    } else {
      setGurus(prev => [...prev, newUser]);
    }

    setUserRole(role);
    setCurrentUser(newUser);

    const welcomeNotif = {
      id: `notif-${Date.now()}`,
      text: `Shubhaarambh! Welcome to SANGAM, ${newUser.name}. Your account is registered as ${role.toUpperCase()}.`,
      type: 'success',
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    // Asynchronously sync to Supabase
    try {
      await supabase.from('profiles').insert({
        id: newUser.id,
        name: newUser.name,
        stage_name: newUser.stageName || newUser.name,
        role: newUser.role,
        title: newUser.title || null,
        specialization: newUser.specialization || null,
        experience: newUser.experience || null,
        awards: newUser.awards || null,
        city: newUser.city || null,
        state: newUser.state || null,
        dob: newUser.dob || null,
        art_form: newUser.artForm || null,
        genre: newUser.genre || null,
        bio: newUser.bio || null,
        philosophy: newUser.philosophy || null,
        languages: newUser.languages || [],
        availability: newUser.availability || null,
        avatar: newUser.avatar,
        sample_work: newUser.sampleWork || null,
        plan: newUser.plan || (role === 'talent' ? 'Rising Star' : 'Verified Guru'),
        assigned_guru_id: newUser.assignedGuruId || null
      });

      await supabase.from('notifications').insert({
        id: welcomeNotif.id,
        user_id: newUser.id,
        text: welcomeNotif.text,
        type: welcomeNotif.type,
        date: welcomeNotif.date,
        read: welcomeNotif.read
      });
    } catch (err) {
      console.warn('Supabase sync note on register:', err);
    }
  };

  // Update Plan
  const updatePlan = async (role, newPlan) => {
    setCurrentUser(prev => ({
      ...prev,
      plan: newPlan
    }));
    
    const planNotif = {
      id: `notif-${Date.now()}`,
      text: `Your plan has been updated to "${newPlan}". Thank you for supporting the arts!`,
      type: 'success',
      date: 'Just now',
      read: false
    };
    setNotifications(prev => [planNotif, ...prev]);

    // Asynchronously sync to Supabase
    try {
      await supabase
        .from('profiles')
        .update({ plan: newPlan })
        .eq('id', currentUser.id);

      await supabase.from('notifications').insert({
        id: planNotif.id,
        user_id: currentUser.id,
        text: planNotif.text,
        type: planNotif.type,
        date: planNotif.date,
        read: planNotif.read
      });
    } catch (err) {
      console.warn('Supabase sync note on plan update:', err);
    }
  };

  // Clear Notifications
  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      userRole,
      currentUser,
      submissions,
      gurus,
      talents,
      notifications,
      switchRole,
      addSubmission,
      updateSubmissionStatus,
      registerUser,
      updatePlan,
      markNotificationsAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};
