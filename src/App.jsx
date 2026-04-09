import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Activity, 
  MessageCircle, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  Bell,
  User,
  LogOut,
  BarChart3,
  Search,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  HeartPulse,
  MessageSquareHeart,
  Pill,
  Check,
  XCircle,
  Trash2,
  LayoutGrid,
  HelpCircle,
  Utensils,
  Play,
  AlertTriangle,
  Phone,
  Thermometer,
  Wind,
  Heart,
  Briefcase,
  Asterisk,
  BookOpen,
  Users
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AdminDashboard, 
  AdminPatients, 
  AdminEducationCMS, 
  AdminEmergencyLogs 
} from './AdminViews';
import { supabase } from './supabaseClient';

// --- SHARED COMPONENTS ---
const Layout = ({ children, activeTab }) => {
  const navigate = useNavigate();
  return (
    <div className="mobile-container pb-32">
      <header className="header-top">
        <div className="brand-section">
          <div className="w-8 h-8 bg-[#006257] rounded-lg flex items-center justify-center text-white">
            <HeartPulse size={18} />
          </div>
          <h2>CHEMO CARE</h2>
        </div>
        <div className="flex gap-3">
           <div style={{ padding: '8px', position: 'relative' }}>
             <Bell size={24} className="text-slate-600" />
             <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: '#b71c1c' }}></div>
           </div>
           <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e0f2f1' }}>
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
        </div>
      </header>
      
      {children}

      <nav className="bottom-nav">
        {[
          { id: 'home', icon: LayoutDashboard, label: 'Home', to: '/' },
          { id: 'monitor', icon: BarChart3, label: 'Monitoring', to: '/monitor' },
          { id: 'edu', icon: BookOpen, label: 'Edukasi', to: '/education' },
          { id: 'emergency', icon: Asterisk, label: 'Emergency', to: '/emergency' },
        ].map((item) => (
          <Link key={item.id} to={item.to} className={`nav-item ${activeTab === item.id ? 'active' : ''}`}>
            <div className="nav-icon-container">
              <item.icon size={20} strokeWidth={activeTab === item.id ? 3 : 2} />
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const RegistrationView = ({ onComplete }) => {
  return (
    <div className="mobile-container pt-8 animate-enter">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <div style={{ width: '32px', height: '32px', backgroundColor: '#006257', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
             <HeartPulse size={18} />
           </div>
           <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#006257', letterSpacing: '0.5px' }}>CHEMO CARE</h2>
        </div>
        <HelpCircle size={20} className="text-slate-400" />
      </header>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '40px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#1e293b', lineHeight: '1.2', marginBottom: '8px' }}>Registrasi</h1>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', lineHeight: '1.6' }}>Lengkapi profil Anda untuk mempersonalisasi perjalanan perawatan Anda.</p>
        </div>
        <div style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: '#006257', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 10px 25px rgba(0,98,87,0.2)' }}>
           <User size={32} color="white" />
           <div style={{ position: 'absolute', bottom: '0', right: '0', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
             <Plus size={14} color="#006257" />
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <User color="#006257" size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#334155' }}>Informasi Pribadi</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="label-field">Nama Pasien</label>
              <input type="text" placeholder="Masukkan nama lengkap" className="input-field" />
            </div>
            <div>
              <label className="label-field">Nomor Rekam Medis</label>
              <input type="text" placeholder="Contoh: MC-2023-001" className="input-field" />
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Stethoscope color="#006257" size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#334155' }}>Detail Klinis</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="label-field">Diagnosis</label>
              <input type="text" placeholder="Diagnosis utama" className="input-field" />
            </div>
            <div>
              <label className="label-field">Regimen Kemoterapi</label>
              <select className="input-field" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                <option>Pilih regimen</option>
                <option>Doxorubicin + Cyc</option>
                <option>Fluorouracil</option>
              </select>
            </div>
            <div>
              <label className="label-field">Tanggal Kemoterapi Berikutnya</label>
              <input type="date" className="input-field" />
            </div>
          </div>
        </section>

        <div>
          <button onClick={onComplete} className="btn-action" style={{ padding: '20px', marginTop: '12px' }}>
            Konfirmasi Registrasi
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', fontWeight: '500', color: '#64748b', marginTop: '16px', lineHeight: '1.6' }}>
            Dengan mengonfirmasi, Anda menyetujui Kebijakan Privasi kami terkait data kesehatan.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- INITIAL STATE ---
const INITIAL_QUESTIONS = [
  { 
    id: 'pain', 
    text: "Seberapa parah tingkat nyeri yang Anda rasakan? (0-10)", 
    type: "range", 
    max: 10,
    category: "A. NYERI"
  },
  { 
    id: 'nausea', 
    text: "Apakah Anda merasakan mual hari ini?", 
    type: "boolean",
    category: "B. MUAL"
  },
  { 
    id: 'vomiting', 
    text: "Apakah Anda mengalami muntah hari ini?", 
    type: "boolean",
    category: "C. MUNTAH"
  },
  { 
    id: 'fatigue', 
    text: "Apakah Anda merasakan kelelahan yang luar biasa?", 
    type: "boolean",
    category: "D. KELELAHAN"
  },
  { 
    id: 'appetite', 
    text: "Bagaimana nafsu makan Anda hari ini?", 
    type: "choice",
    options: ["Normal", "Berkurang", "Tidak nafsu makan"],
    category: "E. PERUBAHAN NAFSU MAKAN"
  },
  { 
    id: 'diarrhea', 
    text: "Berapa kali Anda BAB hari ini?", 
    type: "choice",
    options: ["Tidak", "1–3 kali", "4-6 kali", "≥ 7 kali"],
    category: "F. DIARE"
  },
  { 
    id: 'dizziness', 
    text: "Apakah Anda merasa pusing?", 
    type: "range",
    max: 10,
    category: "G. PUSING"
  },
  { 
    id: 'bowel', 
    text: "Bagaimana keluhan BAB Anda?", 
    type: "choice",
    options: ["Lancar (1-2x)", "Cair (4-6x)", "Keras (Tidak BAB >3 hari)", "Sangat Sering (>7x / Berdarah)"],
    category: "H. KELUHAN BAB"
  },
  { 
    id: 'hairloss', 
    text: "Apakah Anda mengalami rambut rontok?", 
    type: "boolean",
    category: "I. RAMBUT RONTOK"
  },
];

const INITIAL_GUIDANCE = {
  // Pain
  'pain-low': {
    status: 'green',
    text: "Lakukan Teknik Relaksasi: Tarik napas dalam melalui hidung (hitung sampai 4), tahan sebentar, lalu buangkan perlahan melalui mulut (hitung sampai 6). Ulangi 3-4 kali.",
    education: "pindah_perhatian"
  },
  'pain-mid': {
    status: 'yellow',
    text: "Minum Obat Sesuai Jadwal: Pastikan Anda sudah meminum obat pereda nyeri yang diresepkan dokter sesuai dosisnya. Jangan menunggu nyeri sangat berat.",
    education: "pijat_lembut"
  },
  'pain-high': {
    status: 'red',
    text: "SEGERA HUBUNGI DOKTER: Nyeri tidak reda dengan obat. Gunakan fitur pesan untuk konsultasi cepat.",
    education: "posisi_tidur"
  },
  
  // Nausea/Vomiting
  'nausea-true': {
    status: 'yellow',
    text: "Makan Sedikit tapi Sering: Gunakan porsi kecil, pilih makanan suhu ruangan/dingin. Hindari bau menyengat.",
    education: "diet_mual"
  },
  'vomiting-true': {
    status: 'red',
    text: "WASPADA DEHIDRASI: Jika muntah terus-menerus dan tidak ada cairan masuk, segera ke IGD.",
    education: "hidrasi_mual"
  },

  // Appetite
  'appetite-Tidak nafsu makan': {
    status: 'yellow',
    text: "Pola Makan: Makan 5–6 kali sehari porsi kecil. Pilih tinggi protein (telur, daging, susu). Contoh: Sup Ayam Suwir.",
    education: "protein_tinggi"
  },

  // Diarrhea
  'diarrhea-1–3 kali': {
    status: 'green',
    text: "Tetap hidrasi. Minum 2,5L air & makan rendah serat (Bubur/Pisang).",
  },
  'diarrhea-4-6 kali': {
    status: 'yellow',
    text: "MULAI LEMAS? Segera ke IGD terdekat jika kondisi tidak membaik.",
  },
  'diarrhea-≥ 7 kali': {
    status: 'red',
    text: "BAHAYA: ≥ 7 kali BAB/hari atau tidak bisa aktivitas. SEGERA KE IGD.",
  },

  // Dizziness
  'dizziness-low': {
    status: 'green',
    text: "Duduk santai, minum 1 gelas air putih. Bangunlah secara bertahap.",
  },
  'dizziness-mid': {
    status: 'yellow',
    text: "Vertigo: Istirahat berbaring total. Gunakan pegangan saat berdiri.",
  },
  'dizziness-high': {
    status: 'red',
    text: "JANGAN BERDIRI! Risiko jatuh tinggi. Segera minta bantuan keluarga untuk ke IGD.",
  },

  // Bowel
  'bowel-Cair (4-6x)': {
    status: 'yellow',
    text: "Diare Ringan: Pastikan cairan 2,5-3 Liter. Makan sesuai panduan edukasi.",
  },
  'bowel-Keras (Tidak BAB >3 hari)': {
    status: 'yellow',
    text: "Sembelit: Minum air hangat/teh herbal, konsumsi pepaya matang/apel.",
  },
  'bowel-Sangat Sering (>7x / Berdarah)': {
    status: 'red',
    text: "SEGERA KE IGD: BAB >7 kali, ada darah, atau nyeri perut hebat.",
  },

  // Hair Loss
  'hairloss-true': {
    status: 'yellow',
    text: "Perawatan: Gunakan sampo bayi, jangan menggunakan pengering rambut, gunakan sisir bergigi jarang. Rambut akan tumbuh kembali 3-6 bulan setelah selesai.",
  }
};

// --- HELPER COMPONENTS ---
const Card = ({ children, className = "" }) => (
  <div className={`glass-card ${className}`}>
    {children}
  </div>
);

// --- PATIENT VIEWS ---
const PatientHome = ({ questions }) => {
  const navigate = useNavigate();
  
  return (
    <Layout activeTab="home">
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="page-title">Halo, Ibu Sarah</h1>
        <p className="page-subtitle">Semoga hari ini penuh dengan ketenangan. Mari pantau kesehatan Anda bersama kami.</p>
      </motion.section>

      {/* Main Schedule Card */}
      <div className="card-gradient shadow-xl shadow-[#006257]/10">
        <div className="flex justify-between items-start mb-6">
           <div>
              <span className="bg-[#004d40] text-[9px] font-black text-white px-3 py-1.5 rounded-lg uppercase tracking-widest mb-3 inline-block">Jadwal Terdekat</span>
              <h3 className="text-xl font-black mb-2">Kemoterapi Sesi 4</h3>
              <div className="flex items-center gap-2 text-[#004d40] font-bold text-xs opacity-90">
                 <Bell size={14} />
                 <span>Kamis, 24 Oktober 2024 - 09:00</span>
              </div>
           </div>
        </div>
        <button className="bg-[#004d40] text-white px-6 py-2.5 rounded-xl font-bold text-xs mb-8">Detail Jadwal</button>
        <div className="flex justify-center">
           <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop" className="w-full h-full object-crop" />
           </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-4">
        <div onClick={() => navigate('/monitor')} className="card-main flex items-center justify-between cursor-pointer group hover:border-[#006257]/20">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center text-[#006257]">
               <Activity size={24} />
             </div>
             <div>
               <h4 className="font-bold text-slate-800 text-sm">Monitoring Mandiri</h4>
               <p className="text-[10px] text-slate-400 font-medium">Catat gejala & kondisi harian Anda</p>
             </div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-[#006257] transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card-main flex flex-col items-center gap-4 text-center cursor-pointer">
             <div className="w-12 h-12 rounded-xl bg-[#e3f2fd] flex items-center justify-center text-[#1976d2]">
               <Settings size={22} />
             </div>
             <div>
               <h4 className="font-bold text-slate-800 text-xs">Tools</h4>
               <p className="text-[9px] text-slate-400 font-medium mt-1">Kalkulator BMI & Pengingat Obat</p>
             </div>
          </div>
          <div onClick={() => navigate('/education')} className="card-main flex flex-col items-center gap-4 text-center cursor-pointer">
             <div className="w-12 h-12 rounded-xl bg-[#e1f5fe] flex items-center justify-center text-[#0288d1]">
               <BookOpen size={22} />
             </div>
             <div>
               <h4 className="font-bold text-slate-800 text-xs mt-1">Edukasi</h4>
             </div>
          </div>
        </div>

        {/* Emergency Alert Card */}
        <div className="bg-[#ffebee] border border-red-100 rounded-[28px] p-6 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#c62828] flex items-center justify-center text-white shadow-lg">
              <Asterisk size={28} />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#c62828]">Darurat (IGD)</h4>
              <p className="text-[10px] text-red-700 font-bold opacity-70">Hubungi bantuan medis segera</p>
            </div>
          </div>
          <button className="bg-[#b71c1c] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider" onClick={() => navigate('/emergency')}>PANGGIL</button>
        </div>

        {/* Weekly Recap Recap */}
        <div className="card-main !bg-slate-50 !border-none p-8">
           <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-slate-800 text-sm">Kilas Balik Pekan Ini</h4>
              <span className="text-[10px] text-slate-400 font-bold">Lihat Tren</span>
           </div>
           <div className="h-24 flex items-end justify-around gap-2 mb-6">
              {[0.4, 0.6, 0.3, 0.8, 0.5, 0.7, 0.4].map((h, i) => (
                <div key={i} className="flex-1 bg-white rounded-lg relative group overflow-hidden">
                  <div className={`w-full bg-[#006257] rounded-lg absolute bottom-0 transition-all duration-700`} style={{ height: `${h * 100}%` }}></div>
                </div>
              ))}
           </div>
           <div className="flex justify-around text-[9px] font-black text-slate-300 uppercase gap-2 mb-6">
              <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
           </div>
           <p className="text-center text-[10px] font-bold text-slate-500 italic mt-4 opacity-80">"Anda melakukan kemajuan yang sangat baik hari ini."</p>
        </div>
      </div>

      <div className="fixed bottom-32 right-8 z-20">
        <button 
          onClick={() => navigate('/chat')}
          style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#006257', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,98,87,0.4)', border: 'none', cursor: 'pointer' }}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </Layout>
  );
};







const SelfControl = ({ questions, guidance }) => {
  const [answers, setAnswers] = useState({
    pain: 0,
    nausea: null,
    vomiting: 0,
    fatigue: null,
    diarrhea: null,
    note: ''
  });
  const [activeTabName, setActiveTabName] = useState('utama');
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {
    try {
      const { error } = await supabase.from('monitoring_reports').insert([{
        pain_level: answers.pain,
        nausea: answers.nausea || 'Tidak ada',
        vomiting_frequency: answers.vomiting,
        fatigue: answers.fatigue || 'Segar',
        diarrhea: answers.diarrhea || 'Tidak ada',
        others: answers.others || [],
        note: answers.note
      }]);
      if (error) console.error("Gagal mengirim laporan:", error);
    } catch (e) {
      console.error(e);
    }
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <Layout activeTab="monitor">
        <div className="animate-enter pb-12">
          <div className="flex flex-col items-center justify-center py-12 text-center">
             <div className="w-24 h-24 rounded-full bg-[#e0f2f1] flex items-center justify-center text-[#006257] mb-6 shadow-xl shadow-[#006257]/10">
                <Check size={48} strokeWidth={3} />
             </div>
             <h2 className="text-3xl font-black text-slate-800 mb-2">Analisis Selesai</h2>
             <p className="text-sm font-medium text-slate-400 mb-10">Laporan harian Anda telah dianalisis oleh sistem.</p>
          </div>

          <div className="space-y-6">
             {Object.keys(answers).map((key, i) => {
               const val = answers[key];
               if (val === null) return null;

               // Simplified logic for demo
               let status = 'green';
               let text = 'Pertahankan istirahat yang cukup.';
               
               if (key === 'pain') {
                 if (val >= 1 && val <= 3) { status = 'green'; text = 'Lakukan Teknik Relaksasi.'; }
                 else if (val >= 4 && val <= 6) { status = 'yellow'; text = 'Minum Obat Sesuai Jadwal: pastikan Ibu/Saudari sudah meminum obat pereda nyeri yang diresepkan dokter.'; }
                 else if (val > 6) { status = 'red'; text = 'Segera hubungi tim medis. Jika nyeri tidak reda, chat fitur pesan.'; }
                 else { text = 'Tidak ada rasa nyeri, sangat baik!'; }
               }

               if (key === 'nausea' && val === 'Berat') { status = 'red'; text = 'Risiko dehidrasi. Segera ke IGD.'; }
               
               const theme = status === 'red' ? 'info-red' : (status === 'yellow' ? 'info-amber' : 'info-emerald');

               return (
                 <div key={key} className={`card-main !p-6 border-l-8 ${status === 'red' ? 'border-l-red-500' : (status === 'yellow' ? 'border-l-amber-500' : 'border-l-emerald-500')}`}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</h4>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${theme}`}>{status}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed">{text}</p>
                 </div>
               );
             })}
          </div>

          <button onClick={() => navigate('/')} className="btn-action mt-12 py-5">
            Kembali ke Beranda
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeTab="monitor">
      <div className="animate-enter">
        <h1 className="page-title">Monitoring Mandiri</h1>
        <p className="page-subtitle">Bagaimana kondisi Anda hari ini? Laporan rutin membantu tim medis memberikan perawatan terbaik.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#e0f2f1', padding: '6px', borderRadius: '16px', marginBottom: '32px' }}>
           <button onClick={() => setActiveTabName('utama')} style={{ flex: 1, padding: '12px 0', background: activeTabName === 'utama' ? '#006257' : 'transparent', color: activeTabName === 'utama' ? 'white' : '#006257', borderRadius: '12px', fontSize: '13px', fontWeight: activeTabName === 'utama' ? '800' : '700', border: 'none', cursor: 'pointer' }}>Gejala Utama</button>
           <button onClick={() => setActiveTabName('tambahan')} style={{ flex: 1, padding: '12px 0', background: activeTabName === 'tambahan' ? '#006257' : 'transparent', color: activeTabName === 'tambahan' ? 'white' : '#006257', borderRadius: '12px', fontSize: '13px', fontWeight: activeTabName === 'tambahan' ? '800' : '700', border: 'none', cursor: 'pointer' }}>Gejala Tambahan</button>
           <button onClick={() => setActiveTabName('catatan')} style={{ flex: 1, padding: '12px 0', background: activeTabName === 'catatan' ? '#006257' : 'transparent', color: activeTabName === 'catatan' ? 'white' : '#006257', borderRadius: '12px', fontSize: '13px', fontWeight: activeTabName === 'catatan' ? '800' : '700', border: 'none', cursor: 'pointer' }}>Catatan</button>
        </div>

        {activeTabName === 'utama' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="mb-10">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2f1] flex items-center justify-center text-[#006257]">
                <Activity size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm">Skala Nyeri</h3>
           </div>
           <p className="text-[10px] font-bold text-slate-400 mb-6 leading-relaxed">Tentukan tingkat nyeri yang Anda rasakan saat ini (0-10)</p>
           <div className="btn-choice-grid mb-8">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                let emoji = '😄';
                if (num >= 1 && num <= 2) emoji = '🙂';
                else if (num >= 3 && num <= 4) emoji = '😐';
                else if (num >= 5 && num <= 6) emoji = '😟';
                else if (num >= 7 && num <= 8) emoji = '😫';
                else if (num >= 9 && num <= 10) emoji = '😭';

                return (
                  <motion.div 
                    key={num} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={answers.pain === num ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                    onClick={() => setAnswers({...answers, pain: num})}
                    className={`choice-box ${answers.pain === num ? 'active' : ''}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 8px' }}
                  >
                    <motion.span 
                      animate={answers.pain === num ? { scale: 1.2, rotate: [0, -10, 10, -10, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ fontSize: '24px' }}
                    >
                      {emoji}
                    </motion.span>
                    <span>{num}</span>
                  </motion.div>
                );
              })}
           </div>
        </section>

        <section className="mb-10">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#e1f5fe] flex items-center justify-center text-[#0288d1]">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm">Mual</h3>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Ringan', 'Sedang', 'Berat'].map((option) => (
                <div 
                  key={option} 
                  onClick={() => setAnswers({...answers, nausea: option})}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: '16px', border: answers.nausea === option ? '2px solid #006257' : '2px solid #f1f5f9', background: answers.nausea === option ? '#f0f9f8' : 'white', cursor: 'pointer' }}
                >
                   <span style={{ fontSize: '14px', fontWeight: '800', color: '#334155' }}>{option}</span>
                   <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: answers.nausea === option ? '6px solid #006257' : '2px solid #cbd5e1', transition: 'all 0.2s' }}></div>
                </div>
              ))}
           </div>
        </section>

        <section className="mb-12">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#fee2e2] flex items-center justify-center text-[#ef4444]">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">Muntah</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Frekuensi dalam 24 jam terakhir</p>
              </div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'white', border: '2px solid #f1f5f9', borderRadius: '20px' }}>
              <button 
                onClick={() => answers.vomiting > 0 && setAnswers({...answers, vomiting: answers.vomiting - 1})}
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: answers.vomiting > 0 ? '#f8fafc' : '#f1f5f9', border: 'none', color: answers.vomiting > 0 ? '#1e293b' : '#cbd5e1', cursor: answers.vomiting > 0 ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '300' }}
              >
                -
              </button>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontWeight: '900', fontSize: '36px', color: '#1e293b' }}>{answers.vomiting}</span>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '700' }}>kali</span>
              </div>
              
              <button 
                onClick={() => setAnswers({...answers, vomiting: answers.vomiting + 1})}
                style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#e0f2f1', border: 'none', color: '#006257', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '300' }}
              >
                +
              </button>
           </div>
        </section>
          </motion.div>
        )}

        {activeTabName === 'tambahan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <section className="mb-12">
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <LayoutDashboard size={20} color="#475569" />
              <h3 style={{ fontWeight: '800', color: '#1e293b', fontSize: '16px', marginTop: '4px' }}>Kelelahan</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: 'Segar', icon: '😊' },
                  { label: 'Lemas', icon: '😐' },
                  { label: 'Sangat Lemas', icon: '😴' },
                ].map((item) => (
                  <div 
                    key={item.label}
                    onClick={() => setAnswers({...answers, fatigue: item.label})}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 8px', borderRadius: '16px', border: answers.fatigue === item.label ? '2px solid #006257' : '2px solid #f1f5f9', background: answers.fatigue === item.label ? '#f0f9f8' : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
                  >
                     <span style={{ fontSize: '24px' }}>{item.icon}</span>
                     <span style={{ fontSize: '12px', color: answers.fatigue === item.label ? '#006257' : '#64748b', fontWeight: answers.fatigue === item.label ? '800' : '600' }}>{item.label}</span>
                  </div>
                ))}
              </div>
           </div>
        </section>

        <section className="mb-12">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ffebee] flex items-center justify-center text-red-500">
                <Utensils size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm">Diare</h3>
           </div>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['Tidak ada', '1-3x', '4-6x', '>= 7x'].map((option) => (
                <div 
                  key={option}
                  onClick={() => setAnswers({...answers, diarrhea: option})}
                  style={{ padding: '16px 24px', borderRadius: '32px', border: answers.diarrhea === option ? '2px solid #c62828' : '2px solid #f1f5f9', background: answers.diarrhea === option ? '#c62828' : 'white', color: answers.diarrhea === option ? 'white' : '#64748b', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}
                >
                  {option}
                </div>
              ))}
           </div>
        </section>

        <h3 className="text-base font-black text-slate-800 mb-6">Gejala Lainnya</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
           {['Pusing / Vertigo', 'Rambut Rontok', 'Susah BAB (Konstipasi)'].map((item, i) => {
             const isSelected = answers.others?.includes(item);
             return (
               <div 
                 key={i} 
                 onClick={() => {
                   let arr = answers.others || [];
                   if (arr.includes(item)) arr = arr.filter(x => x !== item);
                   else arr = [...arr, item];
                   setAnswers({...answers, others: arr});
                 }}
                 style={{ padding: '24px', borderRadius: '24px', background: 'white', display: 'flex', flexDirection: 'column', gap: '8px', border: isSelected ? '2px solid #006257' : '1px solid #f1f5f9', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}
               >
                  <LayoutDashboard size={20} color="#64748b" />
                  <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>{item}</span>
                  <Plus size={16} color={isSelected ? "#006257" : "#64748b"} />
               </div>
             );
           })}
        </div>
          </motion.div>
        )}

        {activeTabName === 'catatan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="mb-12">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#e0f2f1] flex items-center justify-center text-[#006257]">
                    <MessageSquareHeart size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm">Catatan Tambahan</h3>
               </div>
               <textarea 
                  value={answers.note || ''}
                  onChange={(e) => setAnswers({...answers, note: e.target.value})}
                  placeholder="Apakah ada keluhan lain yang ingin Anda sampaikan kepada tim medis?"
                  style={{ width: '100%', height: '160px', padding: '20px', borderRadius: '24px', border: '1px solid #e2e8f0', background: 'white', fontSize: '14px', color: '#334155', resize: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}
               />
            </section>
          </motion.div>
        )}

        <button onClick={handleFinish} className="btn-action !py-5 shadow-xl shadow-[#006257]/20 mb-12">
          Kirim Laporan <Send size={18} />
        </button>
        <p className="text-center text-[10px] font-medium text-slate-400 max-w-[240px] mx-auto opacity-70 mb-20">
           Semua data akan dikirim langsung ke tim medis Anda.
        </p>
      </div>
    </Layout>
  );
};

const EmergencyView = () => {
  return (
    <Layout activeTab="emergency">
      <div className="animate-enter">
        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '24px', textAlign: 'center', marginBottom: '32px', position: 'relative', border: '1px solid #f1f5f9' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <AlertTriangle size={64} color="#334155" style={{ marginBottom: '16px' }} />
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
               <AlertTriangle size={20} color="#334155" />
             </div>
             <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>Status Darurat</h2>
             <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
               Jika Anda mengalami salah satu gejala di bawah ini, segera hubungi Instalasi Gawat Darurat (IGD) terdekat. Jangan menunggu hingga jadwal kontrol berikutnya.
             </p>
             <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', border: '1px solid #475569', backgroundColor: 'transparent', color: '#1e293b', borderRadius: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>
               <Phone size={14} /> PANGGIL DARURAT
             </button>
           </div>
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Gejala Harus Diwaspadai</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '32px' }}>
           {[
             { i: Thermometer, t: "Demam", d: "Suhu tubuh di atas 38.0°C disertai menggigil." },
             { i: Wind, t: "Sesak Napas", d: "Sesak napas mendadak atau kesulitan bernapas." },
             { i: Heart, t: "Nyeri Dada", d: "Nyeri dada, rasa tertekan, atau berdebar kencang." },
             { i: XCircle, t: "Muntah Parah", d: "Muntah terus-menerus yang tidak reda dengan obat." },
             { i: Briefcase, t: "Pendarahan/Disfungsi", d: "Pendarahan yang tidak wajar atau memar spontan di area tubuh." },
           ].map((item, idx) => (
             <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #f8fafc' }}>
                <item.i size={20} color="#475569" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{item.t}</h4>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>{item.d}</p>
             </div>
           ))}
        </div>
      </div>
    </Layout>
  );
};

const EducationView = () => {
  return (
    <Layout activeTab="edu">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Panduan Restoratif Anda</h1>
        <p className="page-subtitle">Berdasarkan laporan gejala terakhir Anda, kami menyusun langkah-langkah praktis untuk membantu Anda merasa lebih nyaman hari ini.</p>
        
        <div className="card-main !p-0 overflow-hidden mb-10">
          <div className="bg-[#e0f2f1] p-6 flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#004d40]">
               <Activity size={20} />
             </div>
             <h3 className="font-black text-[#004d40]">Edukasi Manajemen Nyeri</h3>
          </div>
          <div className="p-6 space-y-6">
             {[
               { n: 1, t: "Teknik Relaksasi", d: "Tarik napas dalam melalui hidung (hitung sampai 4), tahan, lalu buang perlahan melalui mulut (hitung sampai 6). Ulangi 3-4 kali sehari sambil duduk tegak/berbaring santai." },
               { n: 2, t: "Teknik Pengalihan Perhatian", d: "Fokuslah pada hal yang Anda sukai, seperti mendengarkan musik, menonton, membaca, atau mengobrol." },
               { n: 3, t: "Pijatan Lembut", d: "Gunakan kompres hangat pd area kaku, kompres dingin u/ area berdenyut. Hindari area yang baru saja diradiasi." },
               { n: 4, t: "Atur Posisi Tidur", d: "Punggung: terlentang bantal di lutut. Leher: bantal di lekukan. Perut: setengah duduk." },
             ].map((step) => (
               <div key={step.n} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#b2dfdb] flex items-center justify-center text-[#00796b] font-black text-xs shrink-0">{step.n}</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{step.t}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.d}</p>
                  </div>
               </div>
             ))}
             
             <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '16px', marginTop: '24px', borderLeft: '4px solid #f57f17' }}>
                <h4 style={{ fontWeight: '800', fontSize: '13px', color: '#f57f17', marginBottom: '8px' }}>Kapan Harus Minum Obat?</h4>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>Patuhi jadwal tepat waktu! Jangan menunggu nyeri menjadi "sangat berat". Catat skala 0-10 di aplikasi dan segera hubungi jika nyeri tidak kunjung reda.</p>
             </div>
             <button 
               onClick={() => alert("Memutar panduan audio pernapasan...")}
               style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#006257', color: 'white', padding: '16px', borderRadius: '32px', fontSize: '14px', fontWeight: '800', border: 'none', cursor: 'pointer', marginTop: '16px' }}
             >
               <Play size={14} fill="currentColor" /> Mulai Audio Terpandu
             </button>
          </div>
        </div>

        <div className="card-main p-8 border-l-8 border-l-[#81d4fa]">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#e1f5fe] flex items-center justify-center text-[#0288d1]">
                <Utensils size={20} />
              </div>
              <h3 className="font-black text-slate-800">Mual & Muntah</h3>
           </div>
           <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">Kelola rasa tidak nyaman pada perut dengan penyesuaian diet sederhana.</p>
           <ul className="space-y-4 mb-8">
              {[
                "Makan porsi kecil namun sering (6-8 kali sehari).",
                "Pilih cairan dingin atau es batu untuk hidrasi.",
                "Hindari makanan beraroma tajam atau berminyak."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                   <div className="mt-1"><CheckCircle2 size={16} className="text-[#00796b]" /></div>
                   <span className="text-xs font-bold text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
           </ul>
           <button 
             onClick={() => alert("Mengunduh Menu Diet Rekomendasi (PDF)...")}
             style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#e1f5fe', color: '#0288d1', borderRadius: '16px', border: 'none', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}
           >
             Lihat Menu Diet Rekomendasi
             <ChevronRight size={18} />
           </button>
        </div>
      </motion.div>
    </Layout>
  );
};

const AdminLayout = ({ children }) => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Bypass untuk mode demo
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setSession({
        user: { email: 'admin@gmail.com', id: 'dummy-admin-id' }
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ff]">
        <div className="bg-white p-8 rounded-[24px] shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#1e1b4b] mb-2">Admin Login</h2>
            <p className="text-slate-500 text-sm">Masuk ke panel kontrol Chemotherapy</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition">
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f3ff] overflow-hidden relative">
      <div className="bg-blobs">
        <div className="blob blob-1 opacity-20"></div>
        <div className="blob blob-2 opacity-20"></div>
      </div>
      
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-2xl border-r border-indigo-50 flex flex-col z-20 shadow-xl">
        <div className="p-8 border-b border-indigo-50 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[18px] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-200">E</div>
          <span className="font-extrabold text-2xl tracking-tighter text-[#1e1b4b]">E-Chemo</span>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          {[
            { to: "/admin", icon: LayoutDashboard, label: "Ringkasan" },
            { to: "/admin/patients", icon: Users, label: "Data Pasien" },
            { to: "/admin/education", icon: BookOpen, label: "CMS Edukasi" },
            { to: "/admin/emergency", icon: AlertTriangle, label: "Log Darurat" },
            { to: "/admin/questions", icon: Settings, label: "Pengaturan Input" }
          ].map((item) => (
            <Link 
              key={item.label}
              to={item.to} 
              className="flex items-center gap-4 p-4 rounded-2xl text-[#6366f1] font-bold hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
            >
              <item.icon size={22} className="group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-indigo-50">
           <button onClick={handleLogout} className="flex items-center gap-4 p-4 w-full rounded-2xl text-red-400 font-bold hover:bg-red-50 transition-all group">
             <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
             Keluar
           </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 relative z-10">
        {children}
      </main>
    </div>
  );
};





const AdminQuestions = ({ questions, setQuestions, guidance, setGuidance }) => {
  const [newQ, setNewQ] = useState("");
  const [newType, setNewType] = useState("boolean");
  const [qGuidance, setQGuidance] = useState({ true: "", false: "", high: "", low: "" });

  const addQuestion = () => {
    if (!newQ) return;
    const newId = 'q' + (questions.length + 1);
    const qObj = { id: newId, text: newQ, type: newType };
    
    setQuestions([...questions, qObj]);
    
    const newG = { ...guidance };
    if (newType === 'boolean') {
      newG[`${newId}-true`] = qGuidance.true || "Petunjuk untuk jawaban Ya";
      newG[`${newId}-false`] = qGuidance.false || "Petunjuk untuk jawaban Tidak";
    } else {
      newG[`${newId}-high`] = qGuidance.high || "Petunjuk untuk nilai tinggi";
      newG[`${newId}-low`] = qGuidance.low || "Petunjuk untuk nilai rendah";
    }
    setGuidance(newG);

    setNewQ("");
    setQGuidance({ true: "", false: "", high: "", low: "" });
  };

  const removeQuestion = (id) => {
     setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Konfigurasi Input</h1>
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] leading-none">Automasi Diagnosa & Edukasi</p>
      </header>
      
      <Card className="mb-12 p-10 bg-white/60 border-white shadow-premium">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
              <Plus size={20} />
           </div>
           <h3 className="text-xl font-bold text-slate-800">Tambah Pertanyaan Baru</h3>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Teks Pertanyaan</label>
              <input 
                type="text" 
                value={newQ} 
                onChange={(e) => setNewQ(e.target.value)}
                placeholder="Contoh: Apakah Anda merasa mual?"
                className="w-full p-4 bg-white border border-slate-100 rounded-[22px] focus:outline-none focus:ring-4 ring-indigo-50 transition-all font-bold text-slate-700 shadow-sm"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tipe Input</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full p-4 bg-white border border-slate-100 rounded-[22px] focus:outline-none focus:ring-4 ring-indigo-50 transition-all font-bold text-slate-700 shadow-sm appearance-none"
              >
                <option value="boolean">🔘 Pilihan Ya/Tidak</option>
                <option value="range">📏 Skala (0-10)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50/80 p-8 rounded-[38px] border border-slate-100">
            <div className="flex justify-between items-center mb-6">
               <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Petunjuk Medis Otomatis</h4>
               <Settings size={16} className="text-slate-300" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {newType === 'boolean' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-3">Reaksi Jika "Ya"</label>
                    <textarea 
                      value={qGuidance.true}
                      onChange={(e) => setQGuidance({...qGuidance, true: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-100 rounded-[28px] text-sm font-medium min-h-[120px] focus:ring-4 ring-green-50 outline-none transition-all"
                      placeholder="Apa yang harus dilakukan pasien?"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-3">Reaksi Jika "Tidak"</label>
                    <textarea 
                      value={qGuidance.false}
                      onChange={(e) => setQGuidance({...qGuidance, false: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-100 rounded-[28px] text-sm font-medium min-h-[120px] focus:ring-4 ring-slate-100 outline-none transition-all"
                      placeholder="Instruksi alternatif..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-3">Skala Tinggi (&gt;5)</label>
                    <textarea 
                      value={qGuidance.high}
                      onChange={(e) => setQGuidance({...qGuidance, high: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-100 rounded-[28px] text-sm font-medium min-h-[120px] focus:ring-4 ring-red-50 outline-none transition-all"
                      placeholder="Penanganan gejala berat..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-3">Skala Rendah (≤5)</label>
                    <textarea 
                      value={qGuidance.low}
                      onChange={(e) => setQGuidance({...qGuidance, low: e.target.value})}
                      className="w-full p-5 bg-white border border-slate-100 rounded-[28px] text-sm font-medium min-h-[120px] focus:ring-4 ring-indigo-50 outline-none transition-all"
                      placeholder="Tips pencegahan ringan..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={addQuestion}
            className="btn-primary w-full py-6 rounded-[32px] text-base shadow-xl"
          >
            <Check size={20} /> Simpan Konfigurasi Pertanyaan
          </button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 mb-8 px-2 flex items-center gap-3">
           <LayoutGrid size={22} className="text-indigo-600" /> Daftar Input Aktif
        </h3>
        {questions.map((q, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            key={q.id}
          >
            <Card className="p-6 bg-white flex items-center justify-between border-transparent hover:border-indigo-100 shadow-sm transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                   {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{q.text}</h4>
                  <div className="flex gap-4 mt-1.5">
                     <p className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-tighter">
                        Mode: {q.type === 'boolean' ? 'Boolean Selection' : 'Range Slider'}
                     </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeQuestion(q.id)}
                className="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- CHAT COMPONENT ---

const ChatView = ({ isAdmin = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo Dokter, saya merasa mual setelah kemo pagi tadi.", sender: 'patient', time: '10:30' },
    { id: 2, text: "Halo Pak Ahmad. Sudah coba minum air jahe hangat?", sender: 'doctor', time: '10:35' },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      text: input,
      sender: isAdmin ? 'doctor' : 'patient',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className={`flex flex-col h-full bg-[#f8fafc] ${isAdmin ? '' : 'mobile-container'} animate-fade-in`}>
      <header className="p-6 bg-white flex items-center gap-4 border-b border-indigo-50 sticky top-0 z-20">
        {!isAdmin && <Link to="/" className="text-indigo-400 p-2 hover:bg-indigo-50 rounded-full transition-colors"><ChevronLeft size={24} /></Link>}
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 rotate-3 shadow-sm">
           <User size={24} />
        </div>
        <div>
          <h3 className="font-extrabold text-[#1e1b4b] leading-tight">{isAdmin ? 'Ahmad Zakaria' : 'Dr. Sarah Smith'}</h3>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1.5 pt-0.5">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === (isAdmin ? 'doctor' : 'patient') ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%] group">
               <div className={`p-4 shadow-sm text-sm font-bold leading-relaxed ${
                 m.sender === (isAdmin ? 'doctor' : 'patient') 
                   ? 'bg-indigo-600 text-white rounded-t-[24px] rounded-bl-[24px] rounded-br-[6px]' 
                   : 'bg-white text-[#1e1b4b] rounded-t-[24px] rounded-br-[24px] rounded-bl-[6px] border border-indigo-50'
               }`}>
                 {m.text}
               </div>
               <p className={`text-[9px] mt-2 font-black uppercase tracking-widest text-indigo-300 ${m.sender === (isAdmin ? 'doctor' : 'patient') ? 'text-right' : 'text-left'}`}>
                 {m.time}
               </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-indigo-50 flex gap-4 items-center">
        <div className="flex-1 p-1 bg-indigo-50/50 rounded-full border border-indigo-50 flex items-center pr-1 focus-within:ring-2 ring-indigo-200 transition-all shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Tulis pesan..."
            className="flex-1 p-3 px-5 bg-transparent text-sm font-bold text-[#1e1b4b] placeholder:text-indigo-200 focus:outline-none"
          />
          <button 
            onClick={send}
            className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 active:scale-90 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP ---
function App() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [guidance, setGuidance] = useState(INITIAL_GUIDANCE);
  const [isRegistered, setIsRegistered] = useState(false);

  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  if (!isRegistered && !isAdminRoute) {
    return <RegistrationView onComplete={() => setIsRegistered(true)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientHome questions={questions} />} />
        <Route path="/monitor" element={<SelfControl questions={questions} guidance={guidance} />} />
        <Route path="/education" element={<EducationView />} />
        <Route path="/emergency" element={<EmergencyView />} />
        <Route path="/chat" element={<ChatView />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/patients" element={<AdminLayout><AdminPatients /></AdminLayout>} />
        <Route path="/admin/education" element={<AdminLayout><AdminEducationCMS /></AdminLayout>} />
        <Route path="/admin/emergency" element={<AdminLayout><AdminEmergencyLogs /></AdminLayout>} />
        <Route path="/admin/questions" element={<AdminLayout><AdminQuestions questions={questions} setQuestions={setQuestions} guidance={guidance} setGuidance={setGuidance} /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
