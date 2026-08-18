import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'warning' | 'error' | 'outline';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-variant text-on-surface-variant',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  warning: 'bg-tertiary/10 text-tertiary',
  error: 'bg-error/10 text-error',
  outline: 'border border-outline-variant text-on-surface-variant',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
