import React from 'react';
import { Users, Eye, Video as VideoIcon, BarChart3, TrendingUp } from 'lucide-react';
import { useVideos, useRealtimeStats } from '../../hooks/useVideos';
import { motion } from 'motion/react';
import { IOSCard } from '../../components/IOS/IOSCard';
import { cn } from '../../lib/utils';

export const Dashboard = () => {
  const { videos: recentVideos } = useVideos(5);
  const stats = useRealtimeStats();

  const statCards = [
    { label: 'Total Videos', value: stats.totalVideos, icon: VideoIcon, color: 'text-blue-500' },
    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'text-purple-500' },
    { label: 'Engagement', value: stats.totalLikes.toLocaleString(), icon: TrendingUp, color: 'text-green-500' },
    { label: 'Active Users', value: '1,240', icon: Users, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <IOSCard className="p-6 flex flex-col space-y-4 bg-neutral-900/40 border border-white/5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-ios-blue shadow-lg shadow-ios-blue/20")}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-white mt-1 tracking-tighter">{stat.value}</h3>
              </div>
            </IOSCard>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white">Recently Uploaded</h2>
        <IOSCard className="overflow-hidden bg-neutral-900/20 border border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Video</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Views</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentVideos.map((video) => (
                <tr key={video.id} className="border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={video.thumbnail_url} className="w-12 h-8 rounded-lg object-cover" />
                      <span className="font-bold text-sm text-white">{video.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">
                      {video.category || 'Trending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {video.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5 text-ios-blue">
                      <div className="w-2 h-2 rounded-full bg-ios-blue animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </IOSCard>
      </div>
    </div>
  );
};

