import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, ShieldCheck, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const About = () => {
  const [activeTab, setActiveTab] = useState('team');

  const tabs = [
    { id: 'team', label: 'Tim Editorial', icon: <Users className="w-4 h-4" /> },
    { id: 'scope', label: 'Fokus & Cakupan', icon: <Target className="w-4 h-4" /> },
    { id: 'policy', label: 'Kebijakan Review', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact', label: 'Kontak', icon: <Mail className="w-4 h-4" /> },
  ];

  const editorialTeam = [
    { name: "Prof. Dr. Ir. Ahmad Sudarsono", role: "Editor-in-Chief", institution: "Institut Teknologi Bandung, Indonesia" },
    { name: "Dr. Sarah Johnson", role: "Associate Editor", institution: "Stanford University, USA" },
    { name: "Dr. Kenji Tanaka", role: "Editorial Board Member", institution: "Kyoto University, Japan" },
    { name: "Dr. Maria Garcia", role: "Editorial Board Member", institution: "University of Madrid, Spain" },
    { name: "Dr. Budi Hermawan", role: "Technical Editor", institution: "Universitas Indonesia, Indonesia" },
  ];

  return (
    <div className="pt-16 pb-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-secondary-900 mb-4">Tentang Jurnal</h1>
          <p className="text-secondary-600 max-w-2xl text-lg">
            EJGTA adalah platform multidisiplin yang berkomitmen untuk memajukan penelitian di bidang geologi dan teknologi terapan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-secondary-100 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === tab.id 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-secondary-500 hover:bg-secondary-50'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-secondary-100 p-8 md:p-12 shadow-sm"
            >
              {activeTab === 'team' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-secondary-900">Dewan Redaksi</h3>
                  <div className="divide-y divide-secondary-50">
                    {editorialTeam.map((member, idx) => (
                      <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div>
                          <h4 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">{member.name}</h4>
                          <p className="text-sm text-secondary-500">{member.institution}</p>
                        </div>
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider rounded-lg self-start sm:self-center">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'scope' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary-900">Fokus dan Cakupan</h3>
                  <p className="text-secondary-600 leading-relaxed">
                    Electronic Journal of Geology, Technology, and Applications (EJGTA) menerbitkan artikel penelitian orisinal, artikel ulasan, dan studi kasus dalam spektrum geologi dan teknologi yang luas, termasuk namun tidak terbatas pada:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Geologi Struktur & Tektonik',
                      'Petrologi & Mineralogi',
                      'Geofisika Terapan',
                      'Hidrogeologi & Sumber Daya Air',
                      'Geologi Teknik & Geoteknik',
                      'Sistem Informasi Geografis (SIG)',
                      'Remote Sensing untuk Geologi',
                      'Mitigasi Bencana Geologi'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-4 bg-secondary-50 rounded-xl text-sm font-medium text-secondary-700">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'policy' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-secondary-900">Proses Peer Review</h3>
                  <div className="space-y-6 text-secondary-600 leading-relaxed">
                    <p>
                      EJGTA menerapkan proses **Double-Blind Peer Review**. Ini berarti identitas penulis disembunyikan dari reviewer, dan sebaliknya, sepanjang proses peninjauan.
                    </p>
                    <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                      <h4 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> Standar Etika
                      </h4>
                      <p className="text-sm text-primary-800">
                        Setiap naskah yang dikirimkan akan diperiksa orisinalitasnya menggunakan perangkat lunak pendeteksi plagiarisme (Turnitin/iThenticate) sebelum dikirim ke reviewer.
                      </p>
                    </div>
                    <p>
                      Rata-rata waktu yang dibutuhkan dari pengiriman hingga keputusan pertama adalah 4-6 minggu. Keputusan akhir untuk publikasi dibuat oleh Editor-in-Chief berdasarkan rekomendasi dari setidaknya dua reviewer ahli.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-secondary-900">Hubungi Kami</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-bold text-secondary-900 mb-1">Alamat Kantor</h5>
                          <p className="text-sm text-secondary-500">Gedung Geologi Lt. 3, Kampus ITB, Jl. Ganesha No. 10, Bandung, Indonesia</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-bold text-secondary-900 mb-1">Email Dukungan</h5>
                          <p className="text-sm text-secondary-500">support@ejgta.com<br />editor@ejgta.com</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-bold text-secondary-900 mb-1">Telepon</h5>
                          <p className="text-sm text-secondary-500">+62 (22) 1234-5678</p>
                        </div>
                      </div>
                    </div>
                    
                    <form className="space-y-4 bg-secondary-50 p-6 rounded-3xl border border-secondary-100">
                      <h4 className="font-bold text-secondary-900 flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-primary-600" /> Kirim Pesan Cepat
                      </h4>
                      <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm" />
                      <input type="email" placeholder="Email Anda" className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm" />
                      <textarea placeholder="Pesan Anda..." rows={4} className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-secondary-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"></textarea>
                      <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">Kirim Sekarang</button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
