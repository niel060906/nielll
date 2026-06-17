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
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-ios-blue to-purple-600 p-1 shadow-2xl mb-4">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <span className="text-4xl font-black italic tracking-tighter text-white">N</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            About <span className="text-ios-blue italic">Nell</span>
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Unveiling a curated experience of cinematic moments and digital artistry. 
            iStream+ is more than a platform; it's a movement driven by passion.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-[40px] p-10 border-white/5 space-y-4"
          >
            <div className="w-12 h-12 bg-ios-blue/20 rounded-2xl flex items-center justify-center text-ios-blue mb-2">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold">Content Disclaimer</h3>
            <p className="text-white/50 leading-loose">
              All videos showcased on this platform are meticulously sourced from various global platforms to provide a unified, premium viewing experience. We celebrate creators worldwide.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-[40px] p-10 border-white/5 space-y-4"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-2">
              <Heart size={24} />
            </div>
            <h3 className="text-2xl font-bold">The Vision</h3>
            <p className="text-white/50 leading-loose">
              Nell's vision for iStream+ is to bridge the gap between fragmented content sources and a seamless, high-fidelity user interface that feels like the future of entertainment.
            </p>
          </motion.div>
        </div>

        {/* Socials */}
        <div className="pt-12 text-center space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Connect with the community</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.link}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={cn(
                  "flex items-center space-x-3 px-8 py-4 rounded-full border border-white/10 font-bold transition-all hover:border-white/30",
                  social.color.replace('bg-', 'hover:bg-') + "/20 hover:text-white text-white/70"
                )}
              >
                <social.icon size={20} />
                <span>{social.label}</span>
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
