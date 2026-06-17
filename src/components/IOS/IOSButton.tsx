import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface IOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const IOSButton = React.forwardRef<HTMLButtonElement, IOSButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-ios-blue text-white shadow-lg shadow-ios-blue/20',
      secondary: 'bg-white/10 backdrop-blur-xl text-white border border-white/10 hover:bg-white/20',
      danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20',
      ghost: 'bg-transparent text-white/60 hover:text-white',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm font-medium rounded-full',
      md: 'px-5 py-2.5 font-semibold rounded-2xl',
      lg: 'px-8 py-3.5 text-lg font-bold rounded-2xl',
      full: 'w-full py-4 text-lg font-bold rounded-2xl',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'transition-all duration-200 active:opacity-70 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

IOSButton.displayName = 'IOSButton';
