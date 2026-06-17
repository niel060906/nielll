import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { VideoCard } from '../components/VideoCard';
import { useVideos } from '../hooks/useVideos';
import { IOSSkeleton } from '../components/IOS/IOSCard';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IOSButton } from '../components/IOS/IOSButton';

export const Home = () => {
  const { videos, loading } = useVideos();

  const categories = [
    { title: 'Trending', videos: videos.filter(v => v.category === 'Trending' || !v.category) },
    { title: 'Recommended For You', videos: videos.filter(v => v.category === 'Recommended') },
    { title: 'New Uploads', videos: videos.slice(0, 8) },
  ];

  if (loading) {
// ...
    return (
      <div className="space-y-12 py-8">
        <IOSSkeleton className="w-full h-[60vh] rounded-ios-lg" />
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-6">
            <IOSSkeleton className="w-48 h-8 rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(j => (
                <IOSSkeleton key={j} className="aspect-video rounded-ios-lg overflow-hidden" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
          <Play size={48} className="text-white/20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">No content found</h2>
          <p className="text-white/40 max-w-sm font-medium">The global catalog is currently empty. Head to the admin panel to upload your first premium video.</p>
        </div>
        <Link to="/admin/upload">
          <IOSButton className="px-8">Upload Video</IOSButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-16">
      {videos[0] && <HeroBanner video={videos[0]} />}

      <div className="space-y-20">
        {categories.map((category, idx) => (
          category.videos.length > 0 && (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between group">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
                  <span>{category.title}</span>
                  <ChevronRight size={20} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </motion.section>
          )
        ))}
      </div>
    </div>
  );
};
