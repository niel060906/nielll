import React, { useState } from 'react';
import { IOSButton } from '../../components/IOS/IOSButton';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, LogIn, AlertCircle, LogOut } from 'lucide-react';

export const AdminLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle, isAdmin, user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Login Error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setError(`DOMAIN NOT AUTHORIZED: The domain "${window.location.hostname}" is not whitelisted in your Firebase Console. Go to Authentication > Settings > Authorized Domains and add it.`);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Login popup was closed. Please try again.');
      } else if (err.code === 'auth/internal-error') {
        setError('Firebase Internal Error. This often happens if the Google Sign-In method is not enabled in the Firebase Console.');
      } else {
        setError(err.message || 'Authentication failed. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    await logout();
  };

  // If already logged in and is admin, redirect away
  React.useEffect(() => {
    if (user && isAdmin) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } else if (user && !isAdmin) {
      setError(`Access Denied: ${user.email} is not authorized.`);
    }
  }, [user, isAdmin, navigate, location]);

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

        <div className="space-y-6">
          <p className="text-white/60 text-sm">
            Only whitelisted administrators can access the global catalog management tools.
          </p>

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
            onClick={handleLogin} 
            disabled={loading}
            size="full" 
            className="h-14 font-black tracking-widest uppercase flex items-center justify-center space-x-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                <span>{user ? 'Switch Account' : 'Sign in with Google'}</span>
              </>
            )}
          </IOSButton>

          {user && (
            <div className="space-y-4 pt-2">
              {!isAdmin && (
                <div className="text-red-400 text-xs font-bold bg-red-400/5 p-3 rounded-xl border border-red-400/10">
                  Logged in as: <span className="text-white underline">{user.email}</span>
                  <br />
                  <span className="mt-1 block opacity-60">This email is not in the admin whitelist.</span>
                </div>
              )}
              
              <button 
                onClick={handleSignOut}
                className="flex items-center justify-center space-x-2 text-white/40 hover:text-red-400 transition-colors w-full group"
              >
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Sign out of {user.email}</span>
              </button>
            </div>
          )}
        </div>

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
