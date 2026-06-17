import React from 'react';
import { Play, MoreHorizontal, Clock, Eye } from 'lucide-react';
import { Video } from '../types';
import { cn, formatViews } from '../lib/utils';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, priority = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col space-y-3 cursor-pointer group"
    >
      <Link to={`/watch/${video.id}`} className="block relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 ios-shadow group-hover:ios-shadow-lg transition-all duration-500">
        <img 
          src={video.thumbnail_url} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-xl p-3 rounded-full border border-white/20">
            <Play size={24} fill="white" className="text-white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-ios-blue w-[20%]"></div>
        </div>
      </Link>

      <div className="flex justify-between items-start px-1">
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm text-white group-hover:text-ios-blue transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-[11px] text-white/40 font-medium mt-0.5">
            {video.category || 'Originals'} • {formatViews(video.views)}
          </p>
        </div>
        <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">
          {video.duration || '12:45'}
        </span>
      </div>
    </motion.div>
  );
};
