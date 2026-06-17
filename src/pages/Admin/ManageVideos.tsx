import React, { useState } from 'react';
import { Search, Edit2, Trash2, ExternalLink, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { videoService } from '../../services/videoService';
import { useVideos } from '../../hooks/useVideos';
import { Video } from '../../types';
import { IOSButton } from '../../components/IOS/IOSButton';
import { IOSTextField } from '../../components/IOS/IOSTextField';
import { IOSCard } from '../../components/IOS/IOSCard';
import { motion, AnimatePresence } from 'motion/react';

export const ManageVideos = () => {
  const { videos, loading } = useVideos();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', video_url: '', thumbnail_url: '' });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this premium content?')) {
      try {
        await videoService.deleteVideo(id);
      } catch (err) {
        console.error(err);
        alert('Failed to delete video');
      }
    }
  };

  const startEdit = (video: Video) => {
    setEditingId(video.id);
    setEditForm({
      title: video.title,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await videoService.updateVideo(editingId, editForm);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update video');
    }
  };

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Manage Catalog</h2>
          <p className="text-white/40 font-medium tracking-tight">Control with precision and power</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <IOSTextField 
            placeholder="Search catalog..." 
            className="pl-12"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              layout
            >
              <IOSCard className="p-4 bg-neutral-900/40 border border-white/5 hover:bg-neutral-900/60 transition-all duration-300">
                {editingId === video.id ? (
                  <div className="space-y-4 p-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <IOSTextField 
                        value={editForm.title} 
                        onChange={e => setEditForm({ ...editForm, title: e.target.value })} 
                        placeholder="Title"
                      />
                      <IOSTextField 
                        value={editForm.video_url} 
                        onChange={e => setEditForm({ ...editForm, video_url: e.target.value })} 
                        placeholder="Video URL"
                      />
                      <IOSTextField 
                        value={editForm.thumbnail_url} 
                        onChange={e => setEditForm({ ...editForm, thumbnail_url: e.target.value })} 
                        placeholder="Thumbnail URL"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <IOSButton variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                        <X size={18} className="mr-1" /> Cancel
                      </IOSButton>
                      <IOSButton size="sm" onClick={handleUpdate}>
                        <Check size={18} className="mr-1" /> Save Changes
                      </IOSButton>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 overflow-hidden">
                      <div className="relative w-24 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                        <img src={video.thumbnail_url} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-white line-clamp-1 truncate text-lg tracking-tight">{video.title}</h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">
                          {video.category || 'Originals'} • {video.views.toLocaleString()} Views • {(video.likes || 0).toLocaleString()} Likes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <IOSButton variant="secondary" size="sm" className="p-2.5 h-10 w-10 flex items-center justify-center rounded-xl" onClick={() => startEdit(video)}>
                        <Edit2 size={16} />
                      </IOSButton>
                      <IOSButton variant="danger" size="sm" className="p-2.5 h-10 w-10 flex items-center justify-center rounded-xl" onClick={() => handleDelete(video.id)}>
                        <Trash2 size={16} />
                      </IOSButton>
                    </div>
                  </div>
                )}
              </IOSCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredVideos.length === 0 && !loading && (
        <div className="py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
            <Search size={48} />
          </div>
          <div className="space-y-1">
            <p className="text-white font-bold text-xl">Mainframe returned no matches.</p>
            <p className="text-white/40 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        </div>
      )}

      {/* Pagination Mockup */}
      <div className="flex items-center justify-center space-x-6 pt-10">
        <IOSButton variant="secondary" size="sm" disabled className="w-12 h-12 flex items-center justify-center p-0 rounded-full border-white/5">
          <ChevronLeft size={20} />
        </IOSButton>
        <span className="text-sm font-black text-white/40 tracking-widest uppercase">Page 1 of 1</span>
        <IOSButton variant="secondary" size="sm" disabled className="w-12 h-12 flex items-center justify-center p-0 rounded-full border-white/5">
          <ChevronRight size={20} />
        </IOSButton>
      </div>
    </div>
  );
};
