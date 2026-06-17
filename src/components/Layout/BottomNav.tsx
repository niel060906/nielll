import React from 'react';
import { Home, Compass, Search, ListVideo, User, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: ListVideo, label: 'Admin', path: '/admin' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass flex items-center space-x-1 p-1.5 rounded-[32px] ios-shadow-lg border border-white/10 dark:bg-black/60">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2.5 rounded-[24px] transition-all duration-300 relative",
              isActive ? "bg-white/10 dark:bg-white/10 text-white" : "text-white/50 hover:text-white"
            )}
          >
            <item.icon 
              size={22} 
              className={cn("transition-colors duration-200", isActive ? "text-ios-blue" : "currentColor")} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={cn("text-[10px] font-bold mt-1 uppercase tracking-wider", isActive ? "text-ios-blue" : "currentColor")}>
              {item.label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="nav-active"
                className="absolute inset-0 bg-white/5 rounded-[24px]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};
