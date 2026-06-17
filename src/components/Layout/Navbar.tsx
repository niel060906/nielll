import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, User, Play, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Pre-set dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-8",
      isScrolled ? "glass h-16 border-b" : "bg-transparent h-20"
    )}>
      <div className="flex items-center space-x-12">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white border border-white/20">
            <Play size={18} fill="white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            iStream<span className="font-light text-ios-blue">+</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={cn("text-sm font-semibold transition-all duration-300", location.pathname === '/' ? "text-white scale-105" : "text-white/60 hover:text-white")}>
            Home
          </Link>
          <Link to="/explore" className={cn("text-sm font-semibold transition-all duration-300", location.pathname === '/explore' ? "text-white scale-105" : "text-white/60 hover:text-white")}>
            Explore
          </Link>
          <Link to="/admin" className={cn("text-sm font-semibold transition-all duration-300", location.pathname.startsWith('/admin') ? "text-white scale-105" : "text-white/60 hover:text-white")}>
            Admin
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search favorites..." 
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-sm border-none focus:ring-2 focus:ring-ios-blue w-48 focus:w-64 transition-all outline-none"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
};
