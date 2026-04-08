import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Search, Menu, X, User, Send, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
    setShowDropdown(false);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-secondary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-secondary-900 leading-none">EJGTA</span>
              <span className="text-[10px] text-secondary-500 font-medium uppercase tracking-wider">Geology & Tech Journal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors text-sm">Beranda</Link>
            <Link to="/archives" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors text-sm">Arsip</Link>
            <Link to="/about" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors text-sm">Tentang</Link>
            <Link to="/announcements" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors text-sm">Pengumuman</Link>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-secondary-500 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-secondary-200 mx-2"></div>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-secondary-700 font-bold text-sm hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  {user.name.split(' ')[0]}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-secondary-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-secondary-50 mb-2">
                      <div className="text-xs text-secondary-400 font-bold uppercase">Sudah Masuk Sebagai</div>
                      <div className="text-sm font-bold text-secondary-900 truncate">{user.name}</div>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard Jurnal
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium">
                      <User className="w-4 h-4" /> Profil Saya
                    </Link>
                    <hr className="my-2 border-secondary-50" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-secondary-600 hover:text-primary-600 font-bold text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Masuk
              </Link>
            )}
            
            <Link to="/submit" className="btn-primary py-2 px-5 text-sm shadow-lg shadow-primary-500/20">
              <Send className="w-4 h-4" />
              Kirim Naskah
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary-500 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-secondary-100 py-6 px-4 space-y-4 shadow-xl">
          <Link to="/" className="block text-secondary-600 font-bold">Beranda</Link>
          <Link to="/archives" className="block text-secondary-600 font-bold">Arsip</Link>
          <Link to="/about" className="block text-secondary-600 font-bold">Tentang Jurnal</Link>
          <Link to="/announcements" className="block text-secondary-600 font-bold">Pengumuman</Link>
          <hr className="border-secondary-100" />
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-secondary-900">{user.name}</div>
                    <div className="text-xs text-secondary-500">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 font-bold"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-secondary-600 font-bold">
                <User className="w-4 h-4" /> Masuk
              </Link>
            )}
            <Link to="/submit" className="btn-primary justify-center py-3">
              <Send className="w-4 h-4" /> Kirim Naskah
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
