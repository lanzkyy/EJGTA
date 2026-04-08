import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ChevronRight, 
  Download,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(savedUser);
    setUser(userData);

    fetch(`${import.meta.env.VITE_API_URL}/api/submissions/${userData.id}`)
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'under_review': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'accepted': return 'bg-green-50 text-green-700 border-green-100';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-secondary-50 text-secondary-700 border-secondary-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_review': return <AlertCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!user) return null;

  return (
    <div className="pt-16 pb-24 bg-secondary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/30">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight">Dashboard Penulis</h1>
            </div>
            <p className="text-secondary-600 font-medium">Selamat datang kembali, {user.name}. Pantau status naskah Anda di sini.</p>
          </div>
          <Link to="/submit" className="btn-primary py-4 px-8 rounded-2xl shadow-xl shadow-primary-500/30">
            <Plus className="w-5 h-5" /> Kirim Naskah Baru
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Naskah", value: submissions.length, icon: <FileText className="w-5 h-5" />, color: "bg-white" },
            { label: "Menunggu Review", value: submissions.filter(s => s.status === 'pending').length, icon: <Clock className="w-5 h-5" />, color: "bg-amber-50" },
            { label: "Sedang Ditinjau", value: submissions.filter(s => s.status === 'under_review').length, icon: <AlertCircle className="w-5 h-5" />, color: "bg-blue-50" },
            { label: "Diterima", value: submissions.filter(s => s.status === 'accepted').length, icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-green-50" },
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.color} p-6 rounded-2xl border border-secondary-100 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white rounded-lg border border-secondary-100 text-secondary-400">
                  {stat.icon}
                </div>
                <span className="text-2xl font-extrabold text-secondary-900">{stat.value}</span>
              </div>
              <div className="text-sm font-bold text-secondary-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-[2.5rem] border border-secondary-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-secondary-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-secondary-900">Naskah Aktif (Active Submissions)</h2>
            <div className="text-xs font-bold text-secondary-400 uppercase tracking-widest">Urutkan: Terbaru</div>
          </div>

          <div className="divide-y divide-secondary-50">
            {loading ? (
              <div className="p-20 text-center">
                <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-secondary-500 font-medium">Memuat data naskah...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-secondary-200" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">Belum Ada Naskah</h3>
                <p className="text-secondary-500 max-w-xs mx-auto mb-8">Anda belum mengirimkan naskah apa pun ke EJGTA.</p>
                <Link to="/submit" className="btn-primary inline-flex py-3 px-6">Mulai Pengiriman Pertama</Link>
              </div>
            ) : (
              submissions.map((item) => (
                <div key={item.id} className="p-8 hover:bg-secondary-50/50 transition-colors group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex-grow space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${getStatusStyle(item.status)}`}>
                          {getStatusIcon(item.status)} {item.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-secondary-400 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-secondary-400 font-medium flex items-center gap-1.5">
                          ID: #{item.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-[10px] font-bold rounded uppercase">
                          {item.category}
                        </span>
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-[10px] font-bold rounded uppercase">
                          {item.article_type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a 
                        href={`${import.meta.env.VITE_API_URL}/${item.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 text-secondary-600 rounded-xl text-sm font-bold hover:bg-secondary-50 transition-all"
                      >
                        <Download className="w-4 h-4" /> PDF / Word
                      </a>
                      <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-primary-100">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-8 bg-primary-600 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-primary-500/20">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Butuh Bantuan dengan Naskah Anda?</h3>
              <p className="text-primary-100">Tim editorial kami siap membantu Anda di setiap tahap publikasi.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/about" className="px-6 py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg">
                Hubungi Editor
              </Link>
              <Link to="/guidelines" className="px-6 py-3 bg-primary-700 text-white rounded-xl font-bold hover:bg-primary-800 transition-colors border border-primary-500">
                Panduan Penulis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
