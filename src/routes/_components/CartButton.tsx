import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';

import { PATHS } from '@/lib/constants/paths';
import { useAppSelector } from '@/lib/store';
import { useIsDesktop } from '@hooks/useIsDesktop';

export const CartButton = () => {
  const isDesktop = useIsDesktop();
  const cart = useAppSelector((state) => Object.values(state.cart));

  const totalCount = cart.reduce((acc, curr) => acc + curr.count, 0);

  if (isDesktop) return;
  if (cart.length <= 0) return;

  return (
    <Link
      to={PATHS.cart}
      className='fixed bottom-4 right-4 flex size-14 items-center justify-center rounded-full bg-white shadow-[0px_0px_30px_1px_rgba(0,0,0,0.1)]'
    >
      <div className='absolute right-0 top-0 size-5 rounded-full bg-primary text-center text-sm font-medium text-white'>
        {totalCount}
      </div>

      <ShoppingCartIcon />
    </Link>
  );
};
