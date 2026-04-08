import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', bio: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        institution: 'Institut Teknologi Bandung', // Mock data
        bio: 'Peneliti di bidang Geologi Terapan.' // Mock data
      });
    }
  }, [navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('Profil berhasil diperbarui!');
    setTimeout(() => setSuccess(''), 3000);
  };

  if (!user) return null;

  return (
    <div className="pt-16 pb-24 bg-secondary-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-secondary-900 mb-2">Profil Saya</h1>
          <p className="text-secondary-600">Kelola informasi akun dan pengaturan publikasi Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Avatar & Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-secondary-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-primary-600 text-white text-3xl font-bold rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/30">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-secondary-900">{user.name}</h2>
              <p className="text-sm text-secondary-500 mb-6">{user.email}</p>
              <div className="px-4 py-1.5 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block">
                Author / Penulis
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-secondary-100 shadow-sm">
              <h3 className="font-bold text-secondary-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-600" /> Keamanan Akun
              </h3>
              <button className="w-full py-3 bg-secondary-50 text-secondary-600 rounded-xl text-sm font-bold hover:bg-secondary-100 transition-colors">
                Ganti Password
              </button>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] border border-secondary-100 shadow-sm overflow-hidden"
            >
              <div className="p-8 md:p-12">
                {success && (
                  <div className="mb-8 bg-green-50 border border-green-100 p-4 rounded-2xl flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm text-green-800 font-bold">{success}</p>
                  </div>
                )}

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                        <User className="w-4 h-4" /> Nama Lengkap
                      </label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-100 bg-secondary-50 text-secondary-400 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-700">Afiliasi / Institusi</label>
                    <input 
                      type="text" 
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-700">Bio Singkat</label>
                    <textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-secondary-50">
                    <button type="submit" className="btn-primary py-4 px-8 shadow-xl shadow-primary-500/30">
                      <Save className="w-5 h-5" /> Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
