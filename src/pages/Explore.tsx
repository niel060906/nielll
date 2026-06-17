import React, { useState } from 'react';
import { useVideos } from '../hooks/useVideos';
import { VideoCard } from '../components/VideoCard';
import { IOSSkeleton } from '../components/IOS/IOSCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { IOSTextField } from '../components/IOS/IOSTextField';
import { IOSButton } from '../components/IOS/IOSButton';

export const Explore = () => {
  const { videos, loading } = useVideos(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Trending', 'Recommended', 'Originals', 'Cinema'];

  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <IOSSkeleton key={i} className="aspect-video rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="py-8 space-y-10">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white">Discovery</h1>
          <p className="text-white/40 font-medium tracking-tight">Explore the global collection of premium narratives</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           {categories.map(cat => (
             <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-ios-blue text-white shadow-lg shadow-ios-blue/20' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                }`}
             >
                {cat}
             </button>
           ))}
        </div>

        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <IOSTextField 
            placeholder="Search the global mainframe..." 
            className="pl-12 h-14"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
            <Search size={40} />
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Mainframe returned no matches</p>
        </div>
      )}
    </div>
  );
};
