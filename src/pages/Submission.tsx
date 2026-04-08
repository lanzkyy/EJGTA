import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  AlertCircle,
  FileSearch
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Submission = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [checklist, setChecklist] = useState({
    format: false,
    original: false,
    anonymous: false,
    privacy: false
  });
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    abstract: '',
    category: '',
    articleType: '',
    keywords: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleNext = () => {
    if (step === 1) {
      if (!Object.values(checklist).every(v => v)) {
        setError('Harap setujui semua persyaratan di bawah ini sebelum melanjutkan.');
        return;
      }
    }
    if (step === 2 && !file) {
      setError('Harap unggah file naskah Anda.');
      return;
    }
    if (step === 3) {
      if (!metadata.title || !metadata.abstract || !metadata.category || !metadata.articleType) {
        setError('Semua kolom wajib (tanda *) harus diisi.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('title', metadata.title);
    formData.append('category', metadata.category);
    formData.append('articleType', metadata.articleType);
    if (file) formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengirim naskah!');
      
      setSuccess(true);
      setStep(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const steps = [
    { id: 1, name: "Mulai (Start)" },
    { id: 2, name: "Unggah Naskah" },
    { id: 3, name: "Isi Metadata" },
    { id: 4, name: "Konfirmasi" },
    { id: 5, name: "Selesai" }
  ];

  return (
    <div className="pt-16 pb-24 bg-secondary-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                  step === s.id ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30' : 
                  step > s.id ? 'bg-green-500 text-white border-green-500' : 'bg-white text-secondary-300 border-secondary-100'
                }`}>
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${step === s.id ? 'text-primary-600' : 'text-secondary-400'}`}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 w-full bg-secondary-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              className="h-full bg-primary-600"
            />
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-secondary-200 border border-secondary-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {error && (
              <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-800 font-bold">{error}</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: START */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-secondary-900 mb-2">Langkah 1: Memulai Pengiriman</h2>
                    <p className="text-secondary-500">Harap baca dan centang semua daftar periksa pengiriman di bawah ini.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-secondary-900 flex items-center gap-2 uppercase tracking-widest text-xs">Daftar Periksa Pengiriman</h3>
                    {[
                      { id: 'original', label: 'Naskah belum pernah diterbitkan sebelumnya atau sedang dalam pertimbangan jurnal lain.' },
                      { id: 'format', label: 'File naskah dalam format OpenOffice, Microsoft Word, atau RTF.' },
                      { id: 'anonymous', label: 'Teks mematuhi persyaratan gaya dan bibliografi yang digariskan dalam Panduan Penulis.' },
                      { id: 'privacy', label: 'Saya menyetujui Pernyataan Privasi EJGTA untuk penggunaan data saya dalam proses ini.' }
                    ].map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setChecklist({...checklist, [item.id]: !checklist[item.id as keyof typeof checklist]})}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 ${
                          checklist[item.id as keyof typeof checklist] ? 'border-primary-600 bg-primary-50/30' : 'border-secondary-50 hover:border-secondary-200'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                          checklist[item.id as keyof typeof checklist] ? 'bg-primary-600 border-primary-600 text-white' : 'border-secondary-200 bg-white'
                        }`}>
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <p className={`text-sm font-medium leading-relaxed ${checklist[item.id as keyof typeof checklist] ? 'text-secondary-900' : 'text-secondary-500'}`}>
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: UPLOAD */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-secondary-900 mb-2">Langkah 2: Unggah Naskah</h2>
                    <p className="text-secondary-500">Pilih file naskah dari komputer Anda untuk diunggah ke server kami.</p>
                  </div>

                  <div className="border-2 border-dashed border-secondary-200 rounded-[2.5rem] p-16 text-center bg-secondary-50/50 hover:border-primary-500 transition-colors group relative">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-secondary-300 mx-auto mb-6 shadow-sm group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300">
                      {file ? <FileText className="w-10 h-10 text-primary-600" /> : <Upload className="w-10 h-10" />}
                    </div>
                    {file ? (
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-secondary-900">{file.name}</h4>
                        <p className="text-secondary-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-secondary-900">Klik untuk memilih file</h4>
                        <p className="text-secondary-500 text-sm">Format yang didukung: .doc, .docx, .pdf (Maks. 10MB)</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-800 font-medium">Pastikan Anda telah menghapus nama penulis dari teks untuk mematuhi aturan *Double-Blind Review*.</p>
                  </div>
                </div>
              )}

              {/* STEP 3: METADATA */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-secondary-900 mb-2">Langkah 3: Masukkan Metadata</h2>
                    <p className="text-secondary-500">Lengkapi detail informasi mengenai naskah Anda.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700">Judul Naskah *</label>
                      <textarea 
                        value={metadata.title}
                        onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                        placeholder="Masukkan judul lengkap..." rows={3}
                        className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-700">Abstrak *</label>
                      <textarea 
                        value={metadata.abstract}
                        onChange={(e) => setMetadata({...metadata, abstract: e.target.value})}
                        placeholder="Masukkan abstrak naskah..." rows={6}
                        className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-700">Kategori *</label>
                        <select 
                          value={metadata.category}
                          onChange={(e) => setMetadata({...metadata, category: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-secondary-200 bg-white"
                        >
                          <option value="">Pilih Kategori...</option>
                          <option value="Geologi Terapan">Geologi Terapan</option>
                          <option value="Teknologi Informasi">Teknologi Informasi Geologi</option>
                          <option value="Hidrogeologi">Hidrogeologi</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-700">Tipe Artikel *</label>
                        <select 
                          value={metadata.articleType}
                          onChange={(e) => setMetadata({...metadata, articleType: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl border-none ring-1 ring-secondary-200 bg-white"
                        >
                          <option value="">Pilih Tipe...</option>
                          <option value="Research Article">Research Article</option>
                          <option value="Review Article">Review Article</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRMATION */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-secondary-900 mb-2">Langkah 4: Konfirmasi</h2>
                    <p className="text-secondary-500">Tinjau kembali data Anda sebelum mengirimkan naskah.</p>
                  </div>

                  <div className="bg-secondary-50 rounded-[2rem] p-8 border border-secondary-100 space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-secondary-100 shadow-sm">
                      <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                        <FileSearch className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-1">Judul Naskah</div>
                        <p className="text-secondary-900 font-bold leading-tight">{metadata.title}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-white rounded-2xl border border-secondary-100 shadow-sm">
                        <div className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-1">Kategori</div>
                        <p className="text-secondary-900 font-bold">{metadata.category}</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-secondary-100 shadow-sm">
                        <div className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-1">File</div>
                        <p className="text-secondary-900 font-bold truncate">{file?.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex gap-4">
                    <AlertTriangle className="w-6 h-6 text-primary-600 shrink-0" />
                    <p className="text-sm text-primary-800 font-medium">Dengan mengklik "Kirim Naskah Sekarang", Anda menyatakan bahwa data di atas sudah benar dan siap untuk diproses oleh editor.</p>
                  </div>
                </div>
              )}

              {/* STEP 5: SUCCESS */}
              {step === 5 && (
                <div className="text-center py-12 space-y-8">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-secondary-900 mb-4">Pengiriman Berhasil!</h2>
                    <p className="text-secondary-500 max-w-md mx-auto leading-relaxed text-lg">
                      Terima kasih, naskah Anda telah berhasil dikirim ke dewan redaksi EJGTA. Anda akan menerima notifikasi email segera.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="btn-primary py-4 px-8">Lihat Dashboard Saya</button>
                    <button onClick={() => navigate('/')} className="btn-secondary py-4 px-8">Kembali ke Beranda</button>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="mt-12 pt-8 border-t border-secondary-50 flex justify-between items-center">
                <button 
                  onClick={handleBack} 
                  disabled={step === 1}
                  className={`flex items-center gap-2 font-bold transition-colors ${step === 1 ? 'text-secondary-200 cursor-not-allowed' : 'text-secondary-500 hover:text-secondary-900'}`}
                >
                  <ArrowLeft className="w-5 h-5" /> Sebelumnya
                </button>
                
                {step === 4 ? (
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-primary py-4 px-10 shadow-xl shadow-primary-500/30"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>Kirim Naskah Sekarang <Send className="w-5 h-5" /></>
                    )}
                  </button>
                ) : (
                  <button 
                    onClick={handleNext}
                    className="btn-primary py-4 px-10 shadow-xl shadow-primary-500/30"
                  >
                    Lanjutkan <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Submission;
