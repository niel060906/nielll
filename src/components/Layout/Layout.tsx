import React from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollToTop } from '../ScrollToTop';

export const Layout = () => {
  const location = useLocation();
  const rootPath = location.pathname.split('/')[1] || 'root';

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-ios-blue/30 overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20 pb-40 px-4 md:px-8 max-w-[1400px] mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={rootPath}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
};
