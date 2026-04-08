import React from 'react';
import { BookOpen, Mail, MapPin, Phone, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none">EJGTA</span>
                <span className="text-[10px] text-secondary-400 font-medium uppercase tracking-wider">Geology & Tech Journal</span>
              </div>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed">
              Electronic Journal of Geology, Technology, and Applications (EJGTA) adalah jurnal ilmiah peer-reviewed yang berfokus pada inovasi dalam bidang geologi dan teknologi.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary-800 rounded-full hover:bg-primary-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary-800 rounded-full hover:bg-primary-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary-800 rounded-full hover:bg-primary-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li><Link to="/archives" className="text-secondary-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Arsip Jurnal</Link></li>
              <li><Link to="/submit" className="text-secondary-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Kirim Naskah</Link></li>
              <li><Link to="/guidelines" className="text-secondary-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Panduan Penulis</Link></li>
              <li><Link to="/ethics" className="text-secondary-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Etika Publikasi</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-secondary-400">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm">Gedung Geologi, Lt. 3, Kampus Universitas Indonesia, Depok, Indonesia</span>
              </li>
              <li className="flex gap-3 text-secondary-400">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex gap-3 text-secondary-400">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm">editor@ejgta.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Newsletter</h4>
            <p className="text-secondary-400 text-sm">Dapatkan pembaruan terbaru mengenai artikel yang dipublikasikan.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Alamat email..." 
                className="bg-secondary-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <button className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-800 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-500 text-sm">
          <p>© 2026 EJGTA. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
