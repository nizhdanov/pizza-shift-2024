import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@utils/cn';

export const RadioGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = Root.displayName;

export const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'aspect-square size-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator className='flex items-center justify-center'>
        <Circle className='size-2.5 fill-current text-current' />
      </Indicator>
    </Item>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export const RadioGroupCard = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'rounded-lg border-2 px-3 py-2 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=unchecked]:border-border',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
});
RadioGroupCard.displayName = 'RadioGroupCard';
