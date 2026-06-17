import React, { useState } from 'react';
import { IOSTextField } from '../../components/IOS/IOSTextField';
import { IOSButton } from '../../components/IOS/IOSButton';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, AlertCircle, Play } from 'lucide-react';

export const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 glass p-10 rounded-[40px] border-white/10 ios-shadow-lg text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-ios-blue rounded-2xl flex items-center justify-center text-white shadow-xl shadow-ios-blue/20">
            <Lock size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Mainframe Access</h1>
            <p className="text-white/40 font-medium">Identity verification required</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <IOSTextField 
            type="password"
            placeholder="System Access Key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-center text-xl tracking-[0.5em]"
            error={error ? "Invalid access key" : ""}
            autoFocus
          />
          
          <IOSButton type="submit" size="full" className="h-14 font-black tracking-widest uppercase">
            Authorize Entry
          </IOSButton>
        </form>

        <div className="pt-4">
          <button 
            onClick={() => navigate('/')}
            className="text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Return to Surface
          </button>
        </div>
      </motion.div>
    </div>
  );
};
