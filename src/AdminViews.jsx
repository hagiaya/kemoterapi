import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Activity, Users, FileText, AlertTriangle, ChevronRight, CheckCircle, 
  MapPin, Plus, Clock, TrendingUp, Phone, Bell, LayoutGrid
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export const AdminDashboard = () => {
  const [data, setData] = useState({ patients: 0, reports: 0, avgPain: 0, criticals: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: pts }, { data: rpts }] = await Promise.all([
        supabase.from('patients').select('*'),
        supabase.from('monitoring_reports').select('*')
      ]);

      const pc = pts ? pts.length : 0;
      const rpc = rpts ? rpts.length : 0;
      const criticals = rpts ? rpts.filter(r => r.pain_level > 6 || parseInt(r.vomiting_frequency) > 4).length : 0;
      const avgPain = rpts && rpts.length > 0 ? (rpts.reduce((sum, r) => sum + r.pain_level, 0) / rpts.length).toFixed(1) : 0;
      
      setData({ patients: pc, reports: rpc, avgPain, criticals });

      // Generate dummy chart data for past 7 days based on today's report
      const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      setChartData(days.map((day, i) => ({
        name: day,
        Laporan: rpc > 0 ? Math.floor(Math.random() * rpc) + 1 : Math.floor(Math.random() * 5),
        Kritis: Math.floor(Math.random() * 2)
      })));
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1e293b] mb-1">Ringkasan Klinis</h1>
        <p className="text-slate-500 font-medium">Status terkini dari {data.patients} pasien dalam pemantauan aktif.</p>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-[#ccfbf1] rounded-2xl flex items-center justify-center text-[#14b8a6]"><Users size={24}/></div>
            <span className="text-[10px] font-bold text-[#14b8a6] bg-[#f0fdfa] px-2 py-1 rounded-full">+12% minggu ini</span>
          </div>
          <div><p className="text-4xl font-black text-[#1e293b]">{data.patients}</p><p className="text-xs font-bold text-slate-400 mt-1">Pasien Aktif</p></div>
        </div>
        <div className="bg-[#fee2e2] rounded-[24px] p-6 shadow-sm border border-red-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-[#ef4444] rounded-2xl flex items-center justify-center text-white"><AlertTriangle size={24}/></div>
            <span className="w-6 h-6 bg-red-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{data.criticals}</span>
          </div>
          <div><p className="text-4xl font-black text-red-600">{data.criticals}</p><p className="text-xs font-bold text-red-400 mt-1">Peringatan Kritis</p></div>
        </div>
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500"><FileText size={24}/></div>
            <span className="text-[10px] font-bold text-slate-500">Tingkat Pelaporan</span>
          </div>
          <div><p className="text-4xl font-black text-[#1e293b]">{data.reports}</p><p className="text-xs font-bold text-slate-400 mt-1">Laporan Masuk</p></div>
        </div>
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-[#e0f2fe] rounded-2xl flex items-center justify-center text-[#0ea5e9]"><Activity size={24}/></div>
            <span className="text-[10px] font-bold text-[#0ea5e9]">Rata-rata</span>
          </div>
          <div><p className="text-4xl font-black text-[#1e293b]">{data.avgPain}</p><p className="text-xs font-bold text-slate-400 mt-1">Tingkat Nyeri (0-10)</p></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 h-[400px]">
          <h3 className="font-extrabold text-slate-800 mb-6">Grafik Pelaporan Mingguan</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Bar dataKey="Laporan" fill="#0f766e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Kritis" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center">
          <h3 className="font-extrabold text-slate-800 mb-6 w-full text-left">Sebaran Gejala</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={[{n:'Nyeri', v:40},{n:'Mual', v:30},{n:'Lelah', v:20},{n:'Lainnya', v:10}]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="v">
                <Cell fill="#0f766e"/>
                <Cell fill="#14b8a6"/>
                <Cell fill="#5eead4"/>
                <Cell fill="#ccfbf1"/>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      // Assuming a 'users' or 'patients' table in Supabase
      const { data, error } = await supabase
        .from('patients')
        .select('*');
      
      if (error) {
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data || []);
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
  <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1e293b] mb-1">Pemantauan Pasien</h1>
        <p className="text-slate-500 font-medium">Update status secara real-time dan pelacakan kepatuhan pengobatan.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-sm">Semua Pasien</button>
        <button className="px-6 py-2 bg-transparent text-slate-500 rounded-full text-sm font-bold">Kritis</button>
      </div>
    </div>
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
      {loading ? (
        <p className="text-center text-slate-400 font-bold p-8">Memuat data pasien...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-slate-400 font-bold p-8">Belum ada data pasien di Supabase.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
             <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-black border-b border-slate-100">
               <th className="pb-4">Nama Pasien</th>
               <th className="pb-4">No. Rekam Medis</th>
               <th className="pb-4">Diagnosis</th>
               <th className="pb-4">Status</th>
             </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-700">
             {patients.map(p => (
               <tr key={p.id || p.name} className="border-b border-slate-50">
                 <td className="py-4">{p.name || p.full_name || 'N/A'}</td>
                 <td>#{p.record_id || p.id || 'MR-900'}</td>
                 <td>{p.diagnosis || 'Kanker'}</td>
                 <td><span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black bg-emerald-100 text-emerald-700`}>{p.status || 'Normal'}</span></td>
               </tr>
             ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
  );
};

export const AdminEducationCMS = () => (
  <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
    <h1 className="text-3xl font-extrabold text-[#1e293b]">Otomasi CMS Edukasi</h1>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="p-4 bg-[#ccfbf1] text-[#0f766e] rounded-xl font-bold flex justify-between">Manajemen Nyeri <span className="bg-[#14b8a6] text-white px-2 py-0.5 rounded-full text-[10px] uppercase">Aktif</span></div>
        <div className="p-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Mual & Pencernaan</div>
      </div>
      <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">Modul Manajemen Nyeri</h2>
        <textarea className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[120px]" placeholder="Pengenalan Modul..."/>
        <button className="mt-4 bg-[#0f766e] text-white px-6 py-3 rounded-full font-bold">Simpan Perubahan</button>
      </div>
    </div>
  </div>
);

export const AdminEmergencyLogs = () => (
  <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
    <h1 className="text-3xl font-extrabold text-[#1e293b]">Peringatan Darurat</h1>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex gap-6">
        <div className="w-1/3 bg-red-50 p-6 rounded-2xl text-red-700">
          <AlertTriangle size={32} className="mb-4"/>
          <h3 className="font-bold text-lg mb-2">Muntah Parah</h3>
          <p className="text-xs">Dilaporkan 12 menit yang lalu.</p>
        </div>
        <div className="flex-1 space-y-4">
           <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
             <span className="font-bold">Kontak: +62 812 3456 7890</span>
             <button className="bg-[#0f766e] text-white px-4 py-2 rounded-lg font-bold">Hubungi Pasien</button>
           </div>
        </div>
      </div>
    </div>
  </div>
);
