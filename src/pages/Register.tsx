import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowLeft, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Semua kolom wajib diisi!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Pendaftaran gagal!');
      
      setSuccess('Pendaftaran berhasil! Mengalihkan ke halaman login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-secondary-200 overflow-hidden border border-secondary-100"
      >
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-secondary-900">EJGTA</span>
            </Link>
            <h2 className="text-3xl font-extrabold text-secondary-900 mb-2">Daftar Akun Baru</h2>
            <p className="text-secondary-500 font-medium">Bergabunglah dengan komunitas peneliti EJGTA.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs text-red-800 font-bold">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-green-50 border border-green-100 p-4 rounded-xl flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <p className="text-xs text-green-800 font-bold">{success}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                <User className="w-4 h-4" /> Nama Lengkap
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap..." 
                className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com" 
                className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password..." 
                className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Konfirmasi Password
              </label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password..." 
                className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Daftar Akun
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <p className="text-secondary-500 font-medium text-sm">
              Sudah punya akun? <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors underline-offset-4 hover:underline">Masuk Sekarang</Link>
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-600 font-bold text-sm transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
