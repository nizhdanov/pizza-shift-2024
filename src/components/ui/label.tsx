import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@utils/cn';

export const labelVariants = cva(
  'text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = 'Label';
