import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      '12-regular': 'text-xs font-normal',
      '14-regular': 'text-sm font-normal',
      '14-medium': 'text-sm font-medium',
      '16-regular': 'text-base font-normal',
      '16-medium': 'text-base font-medium',
      '20-semi': 'text-xl font-semibold',
      '24-bold': 'text-2xl font-bold text-foreground'
    }
  },
  defaultVariants: {
    variant: '16-regular'
  }
});

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p';
export type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Tag> & {
  tag?: TypographyTag;
  children: React.ReactNode;
} & VariantProps<typeof typographyVariants>;

const Typography = <Tag extends TypographyTag = 'div'>({
  variant,
  tag = 'div',
  children,
  className,
  ...props
}: TypographyProps<Tag>) => {
  const Component = tag;
  return (
    <Component className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  );
};

type SpanProps = React.ComponentProps<'span'> & VariantProps<typeof typographyVariants>;

const Span = ({ variant, children, className, ...props }: SpanProps) => (
  <span className={cn(typographyVariants({ variant, className }))} {...props}>
    {children}
  </span>
);

export { Span, Typography, typographyVariants };
