import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'border border-primary text-primary bg-transparent hover:bg-primary/10',
  ghost: 'bg-transparent text-on-surface hover:bg-surface-variant',
  danger: 'bg-error text-on-error hover:bg-error/90',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm font-semibold',
  lg: 'px-8 py-4 text-base font-semibold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        className={`inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        whileTap={{ scale: 0.97 }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
