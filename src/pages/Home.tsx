import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Users, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Download,
  Eye,
  Calendar,
  ChevronRight,
  Database,
  BarChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

const articles = [
  {
    id: 1,
    title: "Analisis Geospasial untuk Mitigasi Bencana Tanah Longsor di Kawasan Pegunungan Jawa Barat",
    authors: "Budi Santoso, Siti Aminah, David Wilson",
    abstract: "Penelitian ini menggunakan pemodelan geospasial tingkat lanjut untuk memetakan zona kerawanan tanah longsor dengan akurasi tinggi...",
    date: "12 Maret 2026",
    category: "Geologi Terapan",
    views: 1240,
    downloads: 450
  },
  {
    id: 2,
    title: "Implementasi Machine Learning dalam Klasifikasi Batuan Berdasarkan Data Mikroskopis Digital",
    authors: "Ahmad Fauzi, Maria Garcia",
    abstract: "Studi ini mengeksplorasi penggunaan Convolutional Neural Networks (CNN) untuk mengotomatisasi proses identifikasi mineral dalam sayatan tipis batuan...",
    date: "5 Februari 2026",
    category: "Teknologi Informasi Geologi",
    views: 890,
    downloads: 320
  },
  {
    id: 3,
    title: "Dampak Eksploitasi Air Tanah terhadap Penurunan Muka Tanah di Kawasan Pesisir Jakarta Utara",
    authors: "Linda Kusuma, Robert Chen",
    abstract: "Penelitian longitudinal selama 5 tahun menunjukkan korelasi kuat antara laju ekstraksi air tanah dengan kecepatan penurunan muka tanah...",
    date: "20 Januari 2026",
    category: "Hidrogeologi",
    views: 2100,
    downloads: 680
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6 text-primary-600" />,
    title: "Publikasi Cepat",
    description: "Proses review yang efisien namun tetap ketat, memastikan artikel Anda terbit tepat waktu."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary-600" />,
    title: "Peer-Reviewed",
    description: "Seluruh naskah melalui proses review double-blind oleh para pakar di bidangnya."
  },
  {
    icon: <Database className="w-6 h-6 text-primary-600" />,
    title: "Terindeks Global",
    description: "Artikel Anda akan mudah ditemukan di database jurnal internasional terkemuka."
  },
  {
    icon: <BarChart className="w-6 h-6 text-primary-600" />,
    title: "Analitik Artikel",
    description: "Pantau dampak publikasi Anda dengan data statistik pembaca dan kutipan yang real-time."
  }
];

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(14,165,233,0.08)_0%,rgba(255,255,255,0)_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6">
              Terbitan Terbaru: Vol. 12 No. 1 (2026)
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-secondary-900 mb-6 tracking-tight">
              Platform Publikasi Ilmiah <br />
              <span className="text-primary-600">Geologi & Teknologi</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-secondary-600 mb-10 leading-relaxed">
              EJGTA memfasilitasi diseminasi penelitian berkualitas tinggi untuk memajukan ilmu pengetahuan di bidang geologi dan aplikasinya.
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Cari artikel, penulis, atau kata kunci..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 shadow-xl shadow-secondary-200/50 outline-none text-lg transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                Cari
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Impact Factor", value: "3.24" },
            { label: "Artikel Terbit", value: "1,200+" },
            { label: "Penulis Aktif", value: "450+" },
            { label: "Index Score", value: "Q2" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm text-center">
              <div className="text-3xl font-bold text-secondary-900 mb-1">{stat.value}</div>
              <div className="text-sm text-secondary-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Articles & Announcements */}
          <div className="lg:col-span-8 space-y-16">
            {/* Featured Articles */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 mb-2">Terbitan Terkini</h2>
                  <p className="text-secondary-600">Temukan riset terbaru dari komunitas peneliti kami.</p>
                </div>
                <Link to="/archives" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
                  Lihat Semua <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="space-y-6">
                {articles.map((article, idx) => (
                  <motion.div 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-2xl border border-secondary-100 p-6 hover:shadow-xl hover:shadow-secondary-200/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-secondary-400 text-xs">
                          <Calendar className="w-3 h-3" /> {article.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-secondary-400 text-xs font-medium">
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.views}</span>
                        <span className="flex items-center gap-1"><Download className="w-4 h-4" /> {article.downloads}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-secondary-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {article.abstract}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-50">
                      <p className="text-secondary-400 text-xs font-medium italic">{article.authors}</p>
                      <div className="flex gap-2">
                        <button className="btn-secondary py-1.5 px-3 text-xs">
                          <FileText className="w-3.5 h-3.5" /> PDF
                        </button>
                        <button className="btn-primary py-1.5 px-3 text-xs">
                          Baca Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Announcements Section */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 mb-2">Pengumuman</h2>
                  <p className="text-secondary-600">Berita dan informasi terbaru dari dewan redaksi.</p>
                </div>
                <Link to="/announcements" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
                  Lihat Semua <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border-l-4 border-l-primary-600 border border-secondary-100 shadow-sm">
                  <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest block mb-2">10 April 2026</span>
                  <h4 className="font-bold text-secondary-900 mb-2">Panggilan untuk Makalah: Edisi Khusus Mitigasi Bencana</h4>
                  <p className="text-xs text-secondary-500 line-clamp-2">Kami mengundang para peneliti untuk mengirimkan naskah mengenai teknologi terbaru dalam mitigasi bencana geologi...</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-l-accent-600 border border-secondary-100 shadow-sm">
                  <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest block mb-2">01 April 2026</span>
                  <h4 className="font-bold text-secondary-900 mb-2">Pembaruan Panduan Penulis Tahun 2026</h4>
                  <p className="text-xs text-secondary-500 line-clamp-2">Terdapat perubahan pada format kutipan dan template naskah. Mohon unduh template terbaru di sidebar...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Features/Why Publish Section */}
      <section className="bg-secondary-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Mengapa Publikasi di EJGTA?</h2>
            <p className="text-secondary-600 text-lg">Kami menawarkan pengalaman publikasi yang modern dengan dukungan editorial yang komprehensif.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-secondary-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-secondary-900 mb-3">{feature.title}</h4>
                <p className="text-secondary-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-[2rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-700 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">Siap Mempublikasikan Riset Anda?</h2>
              <p className="text-primary-100 text-lg mb-8">Bergabunglah dengan ribuan peneliti lainnya dan sebarkan dampak penelitian Anda ke seluruh dunia melalui platform kami.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/submit" className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-center hover:bg-primary-50 transition-colors shadow-lg">
                  Kirim Naskah Sekarang
                </Link>
                <Link to="/guidelines" className="px-8 py-4 bg-primary-700 text-white rounded-xl font-bold text-center hover:bg-primary-800 transition-colors border border-primary-500">
                  Panduan Penulis
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <Users className="text-white w-8 h-8 mb-4" />
                  <div className="text-white font-bold">10k+</div>
                  <div className="text-primary-100 text-xs">Reviewer Ahli</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <Clock className="text-white w-8 h-8 mb-4" />
                  <div className="text-white font-bold">45 Hari</div>
                  <div className="text-primary-100 text-xs">Rata-rata Review</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <ShieldCheck className="text-white w-8 h-8 mb-4" />
                  <div className="text-white font-bold">Sinta 2</div>
                  <div className="text-primary-100 text-xs">Akreditasi Nasional</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <ChevronRight className="text-white w-8 h-8 mb-4" />
                  <div className="text-white font-bold">Scopus</div>
                  <div className="text-primary-100 text-xs">Indexing Internasional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
