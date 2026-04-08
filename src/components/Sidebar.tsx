import React from 'react';
import { 
  Download, 
  ShieldCheck, 
  BarChart3, 
  ExternalLink, 
  BookMarked,
  FileText
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="space-y-8">
      {/* Journal Info / ISSN */}
      <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
        <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-primary-600" /> Informasi Jurnal
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-secondary-50">
            <span className="text-xs text-secondary-500 font-medium">e-ISSN</span>
            <span className="text-xs font-bold text-secondary-900">2338-3456</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-secondary-50">
            <span className="text-xs text-secondary-500 font-medium">p-ISSN</span>
            <span className="text-xs font-bold text-secondary-900">2337-1234</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-xs text-secondary-500 font-medium">Penerbit</span>
            <span className="text-xs font-bold text-secondary-900 text-right">ITB Press</span>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-primary-600 p-6 rounded-2xl text-white shadow-lg shadow-primary-500/20">
        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary-200" /> Template Naskah
        </h4>
        <p className="text-xs text-primary-100 mb-6 leading-relaxed">
          Gunakan template resmi kami untuk mempercepat proses review.
        </p>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-bold group">
            MS Word (.docx) <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-bold group">
            LaTeX Template <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Indexing */}
      <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
        <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-6 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary-600" /> Terindeks Oleh
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {['Scopus', 'Sinta 2', 'DOAJ', 'Google Scholar', 'Crossref', 'EBSCO'].map((index) => (
            <div key={index} className="flex items-center justify-center p-3 bg-secondary-50 rounded-xl border border-secondary-100 hover:border-primary-200 hover:bg-white transition-all cursor-pointer group">
              <span className="text-[10px] font-bold text-secondary-400 group-hover:text-primary-600 uppercase tracking-tighter">
                {index}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 flex items-center justify-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
          Lihat Semua Indexing <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Visitor Stats */}
      <div className="bg-white p-6 rounded-2xl border border-secondary-100 shadow-sm">
        <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary-600" /> Statistik Pengunjung
        </h4>
        <div className="space-y-4">
          <div className="p-3 bg-secondary-50 rounded-xl">
            <div className="text-[10px] text-secondary-400 font-bold uppercase mb-1">Total Kunjungan</div>
            <div className="text-xl font-extrabold text-secondary-900">124,567</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-secondary-50 rounded-xl">
              <div className="text-[10px] text-secondary-400 font-bold uppercase mb-1">Hari Ini</div>
              <div className="text-sm font-bold text-secondary-900">1,230</div>
            </div>
            <div className="p-3 bg-secondary-50 rounded-xl">
              <div className="text-[10px] text-secondary-400 font-bold uppercase mb-1">Online</div>
              <div className="text-sm font-bold text-secondary-900">42</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
