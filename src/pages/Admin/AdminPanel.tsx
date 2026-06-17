import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, ListVideo, ChevronLeft, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IOSButton } from '../../components/IOS/IOSButton';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AnimatePresence, motion } from 'motion/react';

export const AdminPanel = () => {
  const { logout, isAuthenticated } = useAdminAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Upload, label: 'Upload Video', path: '/admin/upload' },
    { icon: ListVideo, label: 'Manage Videos', path: '/admin/manage' },
  ];

  return (
    <div className="py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-6">
        <div className="p-1 px-4">
          <h1 className="text-3xl font-black tracking-tight text-white">Admin</h1>
          <p className="text-white/40 font-medium text-sm tracking-tight">Mainframe Controller</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold transition-all duration-300",
                isActive 
                  ? "bg-ios-blue text-white shadow-lg shadow-ios-blue/20" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pt-8 px-4 space-y-3">
          <NavLink to="/">
            <IOSButton variant="secondary" size="sm" className="flex items-center space-x-2 w-full justify-start">
              <ChevronLeft size={16} />
              <span>Back to App</span>
            </IOSButton>
          </NavLink>
          
          <IOSButton 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 w-full justify-start text-red-500 hover:bg-red-500/10"
            onClick={async () => {
              if (confirm('Terminate admin session?')) {
                await logout();
                window.location.href = '/';
              }
            }}
          >
            <Lock size={16} />
            <span>Terminate Session</span>
          </IOSButton>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-grow glass rounded-3xl p-8 ios-shadow-lg min-h-[70vh] bg-neutral-900/40 border-white/5 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {!isAuthenticated && location.pathname !== '/admin/login' ? (
              <div className="flex items-center justify-center h-full">
                 <Navigate to="/admin/login" replace />
              </div>
            ) : (
              <Outlet />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
