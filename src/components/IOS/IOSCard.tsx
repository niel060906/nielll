import React from 'react';
import { cn } from '../../lib/utils';

export const IOSCard = ({ children, className, glass = false }: { children: React.ReactNode; className?: string; glass?: boolean }) => {
  return (
    <div className={cn(
      'rounded-2xl overflow-hidden transition-all duration-300',
      glass ? 'glass' : 'bg-neutral-900/50 dark:bg-neutral-900/50 border border-white/10',
      className
    )}>
      {children}
    </div>
  );
};

export const IOSSkeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-800 rounded-ios',
        className
      )} 
      {...props}
    />
  );
};
