import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type HTMLAttributes
} from 'react';
import {
  DialogClose,
  DialogContent,
  DialogOverlay as RadixDialogOverlay,
  DialogPortal
} from '@radix-ui/react-dialog';
import {} from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeftIcon, XIcon } from 'lucide-react';

import { cn } from '@utils/cn';

export const DialogOverlay = forwardRef<
  ElementRef<typeof RadixDialogOverlay>,
  ComponentPropsWithoutRef<typeof RadixDialogOverlay>
>(({ className, ...props }, ref) => (
  <RadixDialogOverlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName = 'DialogOverlay';

export const ModalContent = forwardRef<
  ElementRef<typeof DialogContent>,
  ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 flex w-full max-w-[960px] translate-x-[-50%] translate-y-[-50%] gap-8 border bg-background px-16 py-10 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
        <XIcon className='size-6' />
        <span className='sr-only'>Close</span>
      </DialogClose>
      {children}
    </DialogContent>
  </DialogPortal>
));

ModalContent.displayName = 'ModalContent';

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
);

interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof DialogContent>,
    VariantProps<typeof sheetVariants> {}

export const SheetContent = forwardRef<ElementRef<typeof DialogContent>, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
      </DialogContent>
    </DialogPortal>
  )
);

SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({
  className,
  children,
  action = 'back',
  divider = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  action?: 'close' | 'back';
  divider?: boolean;
}) => (
  <>
    <div
      className={cn('flex h-14 flex-none items-center justify-between px-4', className)}
      {...props}
    >
      <DialogClose className='size-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
        {action === 'back' ? <ChevronLeftIcon /> : <XIcon />}
      </DialogClose>
      {children}
    </div>
    {divider && <hr className='h-px bg-border' />}
  </>
);

export const SheetBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col px-4', className)} {...props} />
);
