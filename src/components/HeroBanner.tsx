import React from 'react';
import { Play, Info } from 'lucide-react';
import { Video } from '../types';
import { IOSButton } from './IOS/IOSButton';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  video: Video;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ video }) => {
  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-12 ios-shadow-lg group mt-4">
      <img 
        src={video.thumbnail_url} 
        alt={video.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
      
      <div className="absolute bottom-10 left-12 z-20 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase text-white">
              Premiere
            </span>
            <span className="text-xs text-white/60 font-medium">New Selection</span>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
            {video.title}
          </h1>
          <p className="text-lg text-white/70 mb-8 line-clamp-2 max-w-md font-medium">
            Dive into an immersive experience with this exclusive masterpiece, now streaming globally.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link to={`/watch/${video.id}`}>
              <IOSButton className="flex items-center space-x-3 px-10 py-3 rounded-full bg-white text-black hover:bg-white/90">
                <Play size={18} fill="currentColor" />
                <span>Play Now</span>
              </IOSButton>
            </Link>
            <IOSButton variant="secondary" className="flex items-center space-x-3 px-10 py-3 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/10">
              <span>Details</span>
            </IOSButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
