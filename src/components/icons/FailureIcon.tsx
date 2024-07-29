import { ComponentProps } from 'react';

export const FailureIcon = (props: ComponentProps<'svg'>) => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z'
      fill='url(#paint0_linear_8461_3100)'
    />
    <path
      d='M26 14L14 26'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14 14L26 26'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <defs>
      <linearGradient
        id='paint0_linear_8461_3100'
        x1='20'
        y1='40'
        x2='20'
        y2='-1.01356e-06'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#EF4343' />
        <stop offset='0.9531' stopColor='#E99A9A' />
      </linearGradient>
    </defs>
  </svg>
);
