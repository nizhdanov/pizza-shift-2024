import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@utils/cn';

export const inputVariants = cva(
  'flex h-12 w-full rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={cn(inputVariants(), className)} ref={ref} {...props} />
  )
);
Input.displayName = 'Input';
