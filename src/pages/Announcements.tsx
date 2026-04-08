import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, ArrowRight, Bell } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Announcements = () => {
  const announcements = [
    {
      date: "10 April 2026",
      title: "Panggilan untuk Makalah: Edisi Khusus Mitigasi Bencana",
      excerpt: "Kami mengundang para peneliti untuk mengirimkan naskah mengenai teknologi terbaru dalam mitigasi bencana geologi untuk edisi khusus Vol. 12 No. 2.",
      category: "Call for Papers"
    },
    {
      date: "01 April 2026",
      title: "Pembaruan Panduan Penulis Tahun 2026",
      excerpt: "Terdapat perubahan pada format kutipan dan template naskah. Mohon unduh template terbaru di sidebar untuk pengiriman mulai Mei 2026.",
      category: "Journal Update"
    },
    {
      date: "15 Maret 2026",
      title: "EJGTA Terakreditasi SINTA 2",
      excerpt: "Kabar gembira! EJGTA telah resmi mendapatkan akreditasi SINTA 2 dari KEMENDIKBUDRISTEK. Terima kasih atas dukungan para penulis dan reviewer.",
      category: "Achievement"
    },
    {
      date: "01 Maret 2026",
      title: "Pengumuman Reviewer Terbaik Tahun 2025",
      excerpt: "Dewan redaksi memberikan penghargaan kepada 5 reviewer terbaik yang telah memberikan kontribusi luar biasa sepanjang tahun 2025.",
      category: "Event"
    }
  ];

  return (
    <div className="pt-16 pb-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-primary-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-primary-500/30">
            <Megaphone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-secondary-900 mb-2 tracking-tight">Pengumuman</h1>
            <p className="text-secondary-600 font-medium">Berita, informasi, dan pembaruan terkini dari dewan redaksi EJGTA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {announcements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-secondary-100 shadow-sm hover:shadow-xl hover:shadow-secondary-200/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-widest rounded-lg self-start">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-secondary-400 text-sm font-medium">
                    <Calendar className="w-4 h-4" /> {item.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-secondary-500 mb-8 leading-relaxed text-lg">
                  {item.excerpt}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-secondary-50">
                  <button className="flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all group">
                    Baca Selengkapnya <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1 text-secondary-300">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-8 flex justify-center">
              <button className="px-8 py-3 bg-white border border-secondary-200 text-secondary-700 font-bold rounded-xl hover:bg-secondary-50 transition-colors">
                Lihat Pengumuman Lama
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
