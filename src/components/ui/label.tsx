import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@utils/cn';

export const labelVariants = cva(
  'leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        '12-regular': 'text-xs font-regular',
        '14-regular': 'text-sm font-regular',
        '14-medium': 'text-sm font-medium',
        '16-regular': 'text-base font-regular',
        '16-medium': 'text-base font-medium',
        '20-semi': 'text-xl font-semibold',
        '24-bold': 'text-2xl font-bold text-foreground'
      }
    },
    defaultVariants: {
      variant: '14-regular'
    }
  }
);

export const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <Root ref={ref} className={cn(labelVariants({ variant }), className)} {...props} />
));

Label.displayName = 'Label';
