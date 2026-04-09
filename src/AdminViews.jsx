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

export const AdminDashboard = () => (
  <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
    <div>
      <h1 className="text-3xl font-extrabold text-[#1e293b] mb-1">Clinical Overview</h1>
      <p className="text-slate-500 font-medium">Real-time status of 1,248 patients under active monitoring.</p>
    </div>
    
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-[#ccfbf1] rounded-2xl flex items-center justify-center text-[#14b8a6]"><Users size={24}/></div>
          <span className="text-[10px] font-bold text-[#14b8a6] bg-[#f0fdfa] px-2 py-1 rounded-full">+12% this week</span>
        </div>
        <div><p className="text-4xl font-black text-[#1e293b]">1,248</p><p className="text-xs font-bold text-slate-400 mt-1">Active Patients</p></div>
      </div>
      <div className="bg-[#fee2e2] rounded-[24px] p-6 shadow-sm border border-red-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-[#ef4444] rounded-2xl flex items-center justify-center text-white"><AlertTriangle size={24}/></div>
          <span className="w-6 h-6 bg-red-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">4</span>
        </div>
        <div><p className="text-4xl font-black text-red-600">14</p><p className="text-xs font-bold text-red-400 mt-1">Critical Alerts</p></div>
      </div>
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500"><FileText size={24}/></div>
          <span className="text-[10px] font-bold text-slate-500">82% Completion</span>
        </div>
        <div><p className="text-4xl font-black text-[#1e293b]">312</p><p className="text-xs font-bold text-slate-400 mt-1">Reports Today</p></div>
      </div>
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-[#e0f2fe] rounded-2xl flex items-center justify-center text-[#0ea5e9]"><Activity size={24}/></div>
          <span className="text-[10px] font-bold text-[#0ea5e9]">Stability: Stable</span>
        </div>
        <div><p className="text-4xl font-black text-[#1e293b]">3.2</p><p className="text-xs font-bold text-slate-400 mt-1">Avg. Severity (1-10)</p></div>
      </div>
    </div>
  </div>
);

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
        <h1 className="text-3xl font-extrabold text-[#1e293b] mb-1">Patient Monitoring</h1>
        <p className="text-slate-500 font-medium">Real-time status updates and treatment compliance tracking.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-sm">All Patients</button>
        <button className="px-6 py-2 bg-transparent text-slate-500 rounded-full text-sm font-bold">Critical</button>
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
               <th className="pb-4">Patient Name</th>
               <th className="pb-4">Record ID</th>
               <th className="pb-4">Diagnosis</th>
               <th className="pb-4">Status</th>
             </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-700">
             {patients.map(p => (
               <tr key={p.id || p.name} className="border-b border-slate-50">
                 <td className="py-4">{p.name || p.full_name || 'N/A'}</td>
                 <td>#{p.record_id || p.id || 'MR-900'}</td>
                 <td>{p.diagnosis || 'Cancer'}</td>
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
    <h1 className="text-3xl font-extrabold text-[#1e293b]">Automated Education CMS</h1>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="p-4 bg-[#ccfbf1] text-[#0f766e] rounded-xl font-bold flex justify-between">Pain Management <span className="bg-[#14b8a6] text-white px-2 py-0.5 rounded-full text-[10px] uppercase">Active</span></div>
        <div className="p-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl cursor-pointer">Nausea & GI</div>
      </div>
      <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">Pain Management Module</h2>
        <textarea className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[120px]" placeholder="Module Introduction..."/>
        <button className="mt-4 bg-[#0f766e] text-white px-6 py-3 rounded-full font-bold">Save Changes</button>
      </div>
    </div>
  </div>
);

export const AdminEmergencyLogs = () => (
  <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
    <h1 className="text-3xl font-extrabold text-[#1e293b]">Critical Alerts</h1>
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex gap-6">
        <div className="w-1/3 bg-red-50 p-6 rounded-2xl text-red-700">
          <AlertTriangle size={32} className="mb-4"/>
          <h3 className="font-bold text-lg mb-2">Severe Vomiting</h3>
          <p className="text-xs">Reported 12 minutes ago.</p>
        </div>
        <div className="flex-1 space-y-4">
           <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
             <span className="font-bold">Contact: +1 555 012 3456</span>
             <button className="bg-[#0f766e] text-white px-4 py-2 rounded-lg font-bold">Dispatch Contact</button>
           </div>
        </div>
      </div>
    </div>
  </div>
);
