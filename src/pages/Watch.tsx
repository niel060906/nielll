import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { videoService } from '../services/videoService';
import { db } from '../lib/firebase';
import { doc, onSnapshot, collection, query, limit, getDocs } from 'firebase/firestore';
import { Video } from '../types';
import { VideoCard } from '../components/VideoCard';
import { IOSSkeleton } from '../components/IOS/IOSCard';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Heart, PlusCircle } from 'lucide-react';

export const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [related, setRelated] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    
    // Increment views
    videoService.incrementViews(id).catch(console.error);

    // Listen to current video
    const unsubscribeVideo = onSnapshot(doc(db, "videos", id), (docSnap) => {
      if (docSnap.exists()) {
        setVideo({ id: docSnap.id, ...docSnap.data() } as Video);
      }
      setLoading(false);
    });

    // Fetch related videos
    const fetchRelated = async () => {
      const q = query(collection(db, "videos"), limit(10));
      const snapshot = await getDocs(q);
      const data = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() } as Video))
        .filter(v => v.id !== id)
        .slice(0, 4);
      setRelated(data);
    };

    fetchRelated();
    window.scrollTo(0, 0);

    return () => unsubscribeVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="py-8 space-y-8">
        <IOSSkeleton className="w-full aspect-video rounded-ios-lg" />
        <div className="flex flex-col space-y-4">
          <IOSSkeleton className="w-3/4 h-10 rounded-full" />
          <IOSSkeleton className="w-1/2 h-6 rounded-full" />
        </div>
      </div>
    );
  }

  if (!video) return <div className="py-20 text-center">Video not found</div>;

  return (
    <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <VideoPlayer 
          src={video.video_url} 
          poster={video.thumbnail_url} 
          title={video.title}
        />

        <div className="space-y-6">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
              {video.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/5">
              <div className="flex items-center space-x-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Views</span>
                  <span className="text-xl font-bold text-white tracking-tight">{video.views.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Duration</span>
                  <span className="text-xl font-bold text-white tracking-tight">{video.duration}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300 group">
                  <Heart size={18} className="group-hover:text-red-500 transition-colors" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
                <button className="flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300">
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white">About this select</h3>
            <p className="text-white/60 leading-relaxed font-medium text-lg">
              Experience the pinnacle of digital storytelling in {video.title}. A narrative meticulously crafted for a global audience, 
              featuring state-of-the-art production values and an immersive atmosphere that transcends standard streaming.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <h2 className="text-2xl font-bold tracking-tight text-white">Recommended</h2>
        <div className="flex flex-col space-y-12">
          {related.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
};
