import React, { useState } from 'react';
import { IOSTextField } from '../../components/IOS/IOSTextField';
import { IOSButton } from '../../components/IOS/IOSButton';
import { videoService } from '../../services/videoService';
import { motion } from 'motion/react';
import { Upload, CheckCircle2, AlertCircle, Play } from 'lucide-react';

export const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    thumbnail_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    try {
      await videoService.uploadVideo(formData);
      setStatus('success');
      setFormData({ title: '', video_url: '', thumbnail_url: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tighter">New Selection</h2>
        <p className="text-white/40 font-medium tracking-tight">Expand the reach of your premium global catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <IOSTextField 
            label="Visual Narrative Title" 
            placeholder="Enter a captivating name..." 
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <IOSTextField 
            label="Source Stream URL (.mp4)" 
            placeholder="https://content.cdn.com/stream.mp4" 
            value={formData.video_url}
            onChange={e => setFormData({ ...formData, video_url: e.target.value })}
            required
            type="url"
          />
          <IOSTextField 
            label="Visual Cover Frame URL (.jpg/png)" 
            placeholder="https://content.cdn.com/cover.jpg" 
            value={formData.thumbnail_url}
            onChange={e => setFormData({ ...formData, thumbnail_url: e.target.value })}
            required
            type="url"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <IOSButton type="submit" size="full" disabled={loading} className="h-14 text-lg font-bold">
            {loading ? 'Transmitting Data...' : 'Broadcast to Marketplace'}
          </IOSButton>
          <IOSButton type="button" variant="ghost" size="full" onClick={() => setFormData({ title: '', video_url: '', thumbnail_url: '' })}>
            Clear Terminal
          </IOSButton>
        </div>
      </form>

      <motion.div
        animate={status !== 'idle' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
      >
        {status === 'success' && (
          <div className="flex items-center space-x-3 text-white font-bold glass-dark border-white/20 px-8 py-4 rounded-[28px] ios-shadow-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <span className="tracking-tight">Catalog updated successfully</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center space-x-3 text-white font-bold glass-dark border-red-500/20 px-8 py-4 rounded-[28px] ios-shadow-lg">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle size={18} />
            </div>
            <span className="tracking-tight">Failed to reach mainframe</span>
          </div>
        )}
      </motion.div>

      {/* Preview Section */}
      <div className="pt-4 space-y-4">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-center">Visual Verification</h3>
        <div className="aspect-video rounded-3xl overflow-hidden bg-neutral-900/60 border border-white/5 ios-shadow-lg group relative">
          {formData.thumbnail_url ? (
            <img src={formData.thumbnail_url} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/10 space-y-4">
              <Upload size={48} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Waiting for source...</p>
            </div>
          )}
          {formData.title && (
             <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-md">{formData.title}</h4>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
