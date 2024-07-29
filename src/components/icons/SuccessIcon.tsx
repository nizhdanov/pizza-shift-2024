import { ComponentProps } from 'react';

export const SuccessIcon = (props: ComponentProps<'svg'>) => (
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
      fill='url(#paint0_linear_8461_3096)'
    />
    <path
      d='M28 14L17 25L12 20'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <defs>
      <linearGradient
        id='paint0_linear_8461_3096'
        x1='20'
        y1='40'
        x2='20'
        y2='-1.01356e-06'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#7DBA6E' />
        <stop offset='0.9531' stopColor='#C6E99A' />
      </linearGradient>
    </defs>
  </svg>
);
