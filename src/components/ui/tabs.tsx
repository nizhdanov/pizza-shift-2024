import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';

import { cn } from '@utils/cn';

import { typographyVariants } from './typography';

export const Tabs = Root;

export const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-md bg-muted p-[2px] text-muted-foreground',
        typographyVariants({ variant: '14-regular' }),
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = List.displayName;

export const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-4 py-2.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = Trigger.displayName;

export const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = Content.displayName;
