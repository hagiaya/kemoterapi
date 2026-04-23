import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Activity, Users, FileText, AlertTriangle, ChevronRight, CheckCircle, 
  MapPin, Plus, Clock, TrendingUp, Phone, Bell, LayoutGrid
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell
} from 'recharts';

export const AdminDashboard = () => {
  const [data, setData] = useState({ patients: 0, reports: 0, avgPain: 0, criticals: 0 });
  const [chartData, setChartData] = useState([]);
  const [gejalaData, setGejalaData] = useState([{n:'Nyeri', v:1},{n:'Mual', v:1},{n:'Lelah', v:1},{n:'Lainnya', v:1}]);

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

      // Calculate real chart data
      const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      const criticalCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

      if (rpts) {
        rpts.forEach(r => {
          if (!r.created_at) return;
          const date = new Date(r.created_at);
          let day = date.getDay(); // 0 is Sunday
          let localDay = day === 0 ? 6 : day - 1; // 0 is Mon, 6 is Sun
          dayCounts[localDay] += 1;
          if (r.pain_level > 6 || parseInt(r.vomiting_frequency) > 4) {
             criticalCounts[localDay] += 1;
          }
        });
      }

      setChartData([
        { name: 'Sen', Laporan: dayCounts[0], Kritis: criticalCounts[0] },
        { name: 'Sel', Laporan: dayCounts[1], Kritis: criticalCounts[1] },
        { name: 'Rab', Laporan: dayCounts[2], Kritis: criticalCounts[2] },
        { name: 'Kam', Laporan: dayCounts[3], Kritis: criticalCounts[3] },
        { name: 'Jum', Laporan: dayCounts[4], Kritis: criticalCounts[4] },
        { name: 'Sab', Laporan: dayCounts[5], Kritis: criticalCounts[5] },
        { name: 'Min', Laporan: dayCounts[6], Kritis: criticalCounts[6] },
      ]);

      // Calculate real symptom data
      let nyeri = 0, mual = 0, lelah = 0, lainnya = 0;
      if (rpts) {
        rpts.forEach(r => {
           if (r.pain_level > 3) nyeri += 1;
           if (r.nausea && r.nausea !== 'Tidak ada' && r.nausea !== 'Ringan') mual += 1;
           if (r.fatigue && r.fatigue !== 'Segar' && r.fatigue !== 'Lemas') lelah += 1; // Count Only Sangat Lemas feeling or any fatigue > 0
           if ((r.diarrhea && r.diarrhea !== 'Tidak ada') || (r.others && r.others?.length > 0)) lainnya += 1;
        });
      }
      
      // Prevent completely blank pie if data is empty, showing a grey circle or just keep it 0
      setGejalaData([
        {n:'Nyeri', v: nyeri},
        {n:'Mual', v: mual},
        {n:'Lelah', v: lelah},
        {n:'Lainnya', v: lainnya}
      ]);
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
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Pie data={gejalaData.every(d => d.v === 0) ? [{n:'Kosong', v:1}] : gejalaData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="v">
                {gejalaData.every(d => d.v === 0) ? (
                  <Cell fill="#f1f5f9" />
                ) : (
                  <>
                    <Cell fill="#0f766e"/>
                    <Cell fill="#14b8a6"/>
                    <Cell fill="#5eead4"/>
                    <Cell fill="#ccfbf1"/>
                  </>
                )}
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
  const [expandedId, setExpandedId] = useState(null);

  const handleVerify = async (id) => {
    try {
      const { error } = await supabase.from('patients').update({ status: 'Normal' }).eq('id', id);
      if (error) {
        alert("Gagal memverifikasi pasien: " + error.message);
      } else {
        alert("Pasien berhasil diverifikasi!");
        setPatients(patients.map(p => p.id === id ? { ...p, status: 'Normal', calculated_status: 'Normal' } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const [{ data: pts, error }, { data: rpts }] = await Promise.all([
        supabase.from('patients').select('*'),
        supabase.from('monitoring_reports').select('*')
      ]);
      
      if (error) {
        console.error('Error fetching patients:', error);
      } else if (pts) {
        const mapped = pts.map(p => {
          const patientReports = rpts ? rpts.filter(r => r.patient_id === p.id) : [];
          patientReports.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
          let status = 'Normal';
          if (p.status === 'Menunggu Verifikasi Admin') {
            status = 'Menunggu Verifikasi';
          } else if (patientReports.length > 0) {
            const latest = patientReports[0];
            if (latest.pain_level > 6 || parseInt(latest.vomiting_frequency) > 4 || latest.diarrhea === '>= 7x') status = 'Kritis';
            else if (latest.pain_level > 3 || latest.nausea === 'Berat' || latest.diarrhea === '4-6x') status = 'Bahaya';
          }
          return { ...p, calculated_status: status, reports: patientReports };
        });
        setPatients(mapped);
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
               <th className="pb-4"></th>
             </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-700">
             {patients.map(p => (
               <React.Fragment key={p.id || p.name}>
                 <tr onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} className="border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors group">
                   <td className="py-4 pl-2">{p.name || p.full_name || 'N/A'}</td>
                   <td>#{p.record_id || p.id || 'MR-900'}</td>
                   <td>{p.diagnosis || 'Kanker'}</td>
                   <td><span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black ${p.calculated_status === 'Kritis' ? 'bg-red-100 text-red-700' : p.calculated_status === 'Bahaya' ? 'bg-amber-100 text-amber-700' : p.calculated_status === 'Menunggu Verifikasi' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-700'}`}>{p.calculated_status || 'Normal'}</span></td>
                   <td className="text-slate-300 group-hover:text-indigo-500"><ChevronRight className={`transition-transform ${expandedId === p.id ? 'rotate-90' : ''}`} size={18}/></td>
                 </tr>
                 {expandedId === p.id && (
                   <tr className="bg-[#f8fafc]">
                     <td colSpan={5} className="p-6 border-b border-slate-100">
                         {p.calculated_status === 'Menunggu Verifikasi' && (
                           <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
                             <div>
                               <h4 className="font-bold text-yellow-800 text-sm">Akun Belum Diverifikasi</h4>
                               <p className="text-xs text-yellow-600 mt-1">Pasien ini mendaftar mandiri dan membutuhkan persetujuan Anda sebelum bisa login.</p>
                             </div>
                             <button onClick={() => handleVerify(p.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                               Setujui & Verifikasi
                             </button>
                           </div>
                         )}

                         <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                             <div className="flex-1">
                               <div className="flex items-center gap-2 mb-2">
                                 <Clock size={16} className="text-indigo-600" />
                                 <h4 className="font-bold text-slate-800 text-sm">Jadwal Kemoterapi Selanjutnya</h4>
                               </div>
                               <div className="flex gap-3">
                                 <input 
                                   type="date" 
                                   defaultValue={p.chemo_date}
                                   id={`date-${p.id}`}
                                   className="p-2.5 bg-white border border-indigo-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-100 transition-all"
                                 />
                                 <button 
                                   onClick={async () => {
                                     const newDate = document.getElementById(`date-${p.id}`).value;
                                     const { error } = await supabase.from('patients').update({ chemo_date: newDate }).eq('id', p.id);
                                     if (error) alert("Gagal update jadwal: " + error.message);
                                     else alert("Jadwal pasien berhasil diperbarui!");
                                   }}
                                   className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                                 >
                                   SIMPAN JADWAL
                                 </button>
                               </div>
                             </div>
                             <div className="flex-1 border-l border-indigo-100 pl-6 hidden md:block">
                               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Status Verifikasi</p>
                               <p className="text-xs font-bold text-slate-600">
                                 {p.status === 'Menunggu Verifikasi Admin' ? 'Menunggu konfirmasi keaktifan akun' : 'Akun Aktif & Terverifikasi'}
                               </p>
                             </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid size={16} className="text-indigo-500" />
                            <h4 className="font-bold text-slate-800 text-sm">Riwayat Analisis & Gejala Pasien</h4>
                          </div>
                        {p.reports && p.reports.length > 0 ? (
                            <div className="space-y-3">
                               {p.reports.map((r, i) => (
                                 <div key={r.id || i} className="bg-white p-5 rounded-[16px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between text-xs items-start md:items-center">
                                   <div>
                                      <p className="font-black text-slate-800 text-sm">{r.created_at ? new Date(r.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : 'Baru saja'}</p>
                                      <div className="flex gap-4 mt-2 text-slate-500 font-bold flex-wrap">
                                        <span>Nyeri: <span className={r.pain_level > 6 ? 'text-red-500' : ''}>{r.pain_level}/10</span></span>
                                        <span>Mual: {r.nausea || 'Aman'}</span>
                                        <span>Frekuensi Muntah: {r.vomiting_frequency}x</span>
                                        <span>Lelah: {r.fatigue || 'Segar'}</span>
                                        <span>Diare: {r.diarrhea || 'Tidak'}</span>
                                        {r.others && r.others.length > 0 && <span className="text-indigo-500">Lainnya: {r.others.join(', ')}</span>}
                                      </div>
                                      {r.note && (
                                         <div className="mt-3 p-3 bg-slate-50 rounded-xl text-slate-600 block text-[11px] border border-slate-100">
                                            <span className="font-bold text-slate-400">CATATAN:</span> {r.note}
                                         </div>
                                      )}
                                   </div>
                                 </div>
                               ))}
                            </div>
                        ) : <p className="text-xs text-slate-400 font-medium italic">Belum ada data riwayat laporan untuk pasien ini.</p>}
                     </td>
                   </tr>
                 )}
               </React.Fragment>
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

export const AdminEmergencyLogs = () => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const fetchLogs = async () => {
      const [{ data: pts }, { data: rpts }] = await Promise.all([
        supabase.from('patients').select('*'),
        supabase.from('monitoring_reports').select('*').order('created_at', { ascending: false })
      ]);
      
      if (rpts && pts) {
         const emergencies = rpts.filter(r => r.pain_level > 6 || parseInt(r.vomiting_frequency) > 4 || r.nausea === 'Berat' || r.diarrhea === '>= 7x').map(r => {
            const pt = pts.find(p => p.id === r.patient_id) || {};
            let type = 'Kondisi Kritis';
            if (r.pain_level > 6) type = 'Nyeri Hebat';
            else if (parseInt(r.vomiting_frequency) > 4) type = 'Muntah Parah';
            
            const timeDiff = Math.floor((new Date() - new Date(r.created_at)) / 60000);
            const timeStr = timeDiff < 60 ? `${timeDiff} menit yang lalu` : `${Math.floor(timeDiff/60)} jam yang lalu`;
            
            return {
              id: r.id,
              type,
              time: timeStr,
              patientName: pt.name || 'Pasien Anonim',
              record: pt.record_id || 'N/A'
            };
         });
         setLogs(emergencies);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12">
      <h1 className="text-3xl font-extrabold text-[#1e293b]">Peringatan Darurat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {logs.length === 0 ? <p className="text-slate-500 font-bold p-8 bg-white rounded-[32px] w-full text-center border border-slate-100 col-span-2 shadow-sm">Tidak ada peringatan medis darurat saat ini.</p> : logs.map(log => (
          <div key={log.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-red-100 flex gap-6 items-center">
            <div className="w-1/3 bg-red-50 p-6 rounded-3xl text-red-700 flex flex-col items-center text-center shrink-0">
              <AlertTriangle size={36} className="mb-3 opacity-90"/>
              <h3 className="font-black text-sm mb-2">{log.type}</h3>
              <p className="text-[10px] font-bold opacity-70">{log.time}</p>
            </div>
            <div className="flex-1 space-y-4">
               <div>
                 <h4 className="text-lg font-black text-slate-800">{log.patientName}</h4>
                 <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider text-indigo-500 bg-indigo-50 inline-block px-2 py-0.5 rounded-full">RM: {log.record}</p>
               </div>
               <div className="pt-2 border-t border-slate-100">
                 <button className="w-full bg-[#1e293b] text-white px-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-xl shadow-slate-200 hover:bg-black transition-colors"><Phone size={16}/> Tangani Sekarang</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
