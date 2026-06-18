import React, { useState } from 'react';
import { IOSButton } from '../../components/IOS/IOSButton';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, LogIn, AlertCircle, LogOut } from 'lucide-react';

export const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);
    try {
      const success = await login(password);
      if (!success) {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    await logout();
  };

  // If already logged in, redirect away
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

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
            <p className="text-white/40 font-medium">Verified Identity Required</p>
          </div>
        </div>

      <form onSubmit={handleLogin} className="space-y-6">
          <p className="text-white/60 text-sm">
            Please enter the administrative password to access catalog management.
          </p>

          <div className="space-y-2">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-ios-blue/50 transition-all text-center tracking-widest"
              autoFocus
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-2xl text-sm font-medium border border-red-400/20"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <IOSButton 
            type="submit"
            disabled={loading || !password}
            size="full" 
            className="h-14 font-black tracking-widest uppercase flex items-center justify-center space-x-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                <span>Gain Access</span>
              </>
            )}
          </IOSButton>

          {isAuthenticated && (
            <div className="space-y-4 pt-2">
              <button 
                type="button"
                onClick={handleSignOut}
                className="flex items-center justify-center space-x-2 text-white/40 hover:text-red-400 transition-colors w-full group"
              >
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
              </button>
            </div>
          )}
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
