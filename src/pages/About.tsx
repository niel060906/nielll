import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Globe, Mail, Heart, Github } from 'lucide-react';
import { IOSButton } from '../components/IOS/IOSButton';
import { cn } from '../lib/utils';

export const About = () => {
  const socials = [
    { icon: Instagram, label: 'Instagram', color: 'bg-pink-500', link: '#' },
    { icon: Twitter, label: 'Twitter', color: 'bg-blue-400', link: '#' },
    { icon: Youtube, label: 'YouTube', color: 'bg-red-600', link: '#' },
    { icon: Github, label: 'GitHub', color: 'bg-neutral-800', link: '#' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-[38%] bg-gradient-to-br from-ios-blue via-purple-600 to-pink-500 p-1 shadow-2xl mb-4 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full rounded-[36%] bg-black flex items-center justify-center overflow-hidden">
              <span className="text-5xl font-black italic tracking-tighter text-white transform -skew-x-12">N</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            About <span className="text-ios-blue italic animate-pulse">Nell</span>
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Unveiling a curated experience of cinematic moments and digital artistry. 
            iStream+ is a movement driven by vision and passion for premium content.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-[40px] p-10 border-white/5 space-y-4 hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 bg-ios-blue/20 rounded-2xl flex items-center justify-center text-ios-blue mb-2">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold">Content Curation</h3>
            <p className="text-white/50 leading-loose">
              Semua video didapatkan dari berbagai platform global. Kami mengkurasi momen-momen terbaik untuk memberikan pengalaman menonton yang seamless dalam satu interface yang modern.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-[40px] p-10 border-white/5 space-y-4 hover:bg-white/5 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-2">
              <Heart size={24} />
            </div>
            <h3 className="text-2xl font-bold">The Nell Vision</h3>
            <p className="text-white/50 leading-loose">
              Visi Nell untuk iStream+ adalah menjembatani konten yang terfragmentasi dengan antarmuka high-fidelity yang terasa seperti masa depan hiburan digital.
            </p>
          </motion.div>
        </div>

        {/* Socials */}
        <div className="pt-12 text-center space-y-10">
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-ios-blue">Follow Medsos Kami</h4>
            <p className="text-white/30 text-sm italic">Jangan lupa mengikuti media sosial kami untuk update terbaru</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.link}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={cn(
                  "flex flex-col items-center space-y-3 p-6 rounded-[32px] border border-white/5 transition-all bg-white/5",
                  "hover:border-white/20 hover:bg-white/10 group select-none cursor-pointer"
                )}
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:scale-110", social.color)}>
                  <social.icon size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pt-20 pb-12 flex flex-col items-center">
          <div className="glass rounded-full p-2 pl-8 pr-2 flex items-center space-x-4 border-white/10">
            <span className="text-sm font-medium text-white/40">Got something to share?</span>
            <IOSButton size="sm" className="rounded-full px-6 flex items-center space-x-2">
              <Mail size={16} />
              <span>Contact Nell</span>
            </IOSButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
