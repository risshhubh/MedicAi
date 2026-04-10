import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Activity, ChevronRight, User, Settings, LogOut, ChevronDown, BarChart3, Headset } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TopNav() {
  const location = useLocation();
  const hiddenRoutes = ['/login', '/signup'];
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const isDark = location.pathname === '/security';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
      isDark 
        ? 'bg-[#041d1a]/90 border-teal-900/20 text-white' 
        : 'bg-white/95 border-slate-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Activity size={24} />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MedicAi
</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-10 h-full">
            {[
              { name: 'Home', path: '/' },
              { name: 'Ai Analysis', path: '/analysis' },
              { name: 'How it Works', path: '/how-it-works' },
              { name: 'Security', path: '/security' },
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative py-8 ${isDark ? 'text-emerald-100' : 'text-slate-600'} text-xs uppercase tracking-[0.2em] font-black transition-colors hover:text-emerald-600 h-full flex items-center`}
                >
                  <span className={isActive ? (isDark ? 'text-emerald-400' : 'text-teal-600') : ''}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className={`absolute bottom-0 inset-x-0 h-1 ${isDark ? 'bg-emerald-400' : 'bg-teal-600'} rounded-full`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className={`hidden md:inline-flex items-center ${isDark ? 'text-emerald-100 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} font-bold text-sm transition-colors`}>
                  Log in
                </Link>
                <Link to="/signup" className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-600 text-xs font-black uppercase tracking-widest rounded-xl text-white hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all active:scale-95">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User size={18} />
                  </div>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 p-2 overflow-hidden">
                    <div className="py-1">
                      <Link 
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Activity className="mr-3 h-4 w-4 text-slate-400" />
                        Dashboard
                      </Link>
                      <Link 
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Settings className="mr-3 h-4 w-4 text-slate-400" />
                        Settings
                      </Link>
                      <Link 
                        to="/contact"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Headset className="mr-3 h-4 w-4 text-slate-400" />
                        Contact Us
                      </Link>
                      <div className="h-px bg-slate-100 my-1 mx-2"></div>
                      <button 
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="mr-3 h-4 w-4 text-red-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
