import { forwardRef, type InputHTMLAttributes } from 'react';
import {
  NumberFormatBase,
  PatternFormat,
  type PatternFormatProps,
  usePatternFormat
} from 'react-number-format';
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

export const PatternInput = forwardRef<HTMLInputElement, PatternFormatProps>(
  ({ className, ...props }, ref) => (
    <PatternFormat className={cn(inputVariants(), className)} getInputRef={ref} {...props} />
  )
);
PatternInput.displayName = 'PatternInput';

export const CardExpiryInput = forwardRef<HTMLInputElement, Omit<PatternFormatProps, 'format'>>(
  ({ className, ...props }, ref) => {
    const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

    if (!format) return;

    const _format = (val: string) => {
      let month = val.substring(0, 2);
      const year = val.substring(2, 4);

      if (month.length === 1 && Number(month.charAt(0)) > 1) {
        month = `0${month[0]}`;
      } else if (month.length === 2) {
        if (Number(month) === 0) {
          month = '01';
        } else if (Number(month) > 12) {
          month = '12';
        }
      }

      return format(`${month}${year}`);
    };

    return (
      <NumberFormatBase
        className={cn(inputVariants(), className)}
        getInputRef={ref}
        format={_format}
        {...rest}
      />
    );
  }
);
CardExpiryInput.displayName = 'CardExpiryInput';
