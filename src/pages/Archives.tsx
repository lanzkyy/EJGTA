import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, ChevronRight, FileText, Download, Eye, Calendar } from 'lucide-react';

import Sidebar from '../components/Sidebar';

const issues = [
  {
    volume: "Vol. 12 No. 1 (2026)",
    title: "Inovasi Geologi dan Teknologi Terapan",
    date: "Maret 2026",
    articles: [
      { id: 1, title: "Analisis Geospasial untuk Mitigasi Bencana Tanah Longsor", authors: "Budi Santoso, et al.", views: 1240, downloads: 450 },
      { id: 2, title: "Implementasi Machine Learning dalam Klasifikasi Batuan", authors: "Ahmad Fauzi, et al.", views: 890, downloads: 320 },
      { id: 3, title: "Dampak Eksploitasi Air Tanah di Jakarta Utara", authors: "Linda Kusuma, et al.", views: 2100, downloads: 680 }
    ]
  },
  {
    volume: "Vol. 11 No. 2 (2025)",
    title: "Eksplorasi Sumber Daya Mineral Berkelanjutan",
    date: "Oktober 2025",
    articles: [
      { id: 4, title: "Karakterisasi Mineralogi Endapan Epithermal Low Sulfidation", authors: "Andi Wijaya, et al.", views: 1560, downloads: 540 },
      { id: 5, title: "Pemetaan Geofisika untuk Identifikasi Akuifer Air Tanah", authors: "Siti Rahma, et al.", views: 1120, downloads: 410 }
    ]
  }
];

const Archives = () => {
  return (
    <div className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-extrabold text-secondary-900 mb-4">Arsip Jurnal</h1>
            <p className="text-secondary-600 max-w-xl">Telusuri seluruh koleksi publikasi ilmiah EJGTA sejak tahun 2014 hingga saat ini.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative group flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Cari di arsip..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-secondary-200 rounded-xl text-secondary-600 hover:bg-secondary-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {issues.map((issue, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-secondary-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-8 bg-secondary-50/50 border-b border-secondary-100 flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900">{issue.volume}</h3>
                      <p className="text-secondary-500 font-medium">{issue.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-sm text-secondary-500 bg-white px-3 py-1.5 rounded-lg border border-secondary-200">
                      <Calendar className="w-4 h-4" /> {issue.date}
                    </span>
                    <button className="btn-primary py-2 text-sm">
                      Lihat Terbitan Lengkap
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-secondary-50">
                  {issue.articles.map((article) => (
                    <div key={article.id} className="p-6 hover:bg-primary-50/30 transition-colors group">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="flex-grow">
                          <h4 className="text-lg font-bold text-secondary-800 mb-1 group-hover:text-primary-600 transition-colors">{article.title}</h4>
                          <p className="text-secondary-500 text-sm font-medium">{article.authors}</p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <div className="flex items-center gap-4 text-secondary-400 text-xs font-semibold">
                            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {article.views}</span>
                            <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {article.downloads}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-primary-100">
                              <FileText className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-primary-100">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 bg-white border border-secondary-200 text-secondary-700 font-bold rounded-xl hover:bg-secondary-50 transition-colors">
            Tampilkan Terbitan Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Archives;
