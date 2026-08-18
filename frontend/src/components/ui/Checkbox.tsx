import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={`peer h-5 w-5 shrink-0 rounded-md border border-outline-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary appearance-none transition-colors ${className}`}
          {...props}
        />
        <motion.div
          className="absolute left-0 top-0 h-5 w-5 flex items-center justify-center text-primary-foreground pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: props.checked ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check size={14} strokeWidth={3} />
        </motion.div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
