import React from 'react';
import { cn } from '../../lib/utils';

interface IOSTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const IOSTextField = React.forwardRef<HTMLInputElement, IOSTextFieldProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-[13px] font-medium text-gray-500 dark:text-gray-400 ml-1 px-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-white/10 border border-white/5 focus:bg-white/15 focus:ring-2 focus:ring-ios-blue text-white rounded-2xl transition-all duration-300 outline-none placeholder:text-white/30',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-[12px] text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

IOSTextField.displayName = 'IOSTextField';
