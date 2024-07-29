import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';

import { EmptyCartIllustration } from '@/components/illustrations/EmptyCartIllustration';
import { CM_MAP, DOUGH_MAP, SIZE_MAP } from '@/lib/constants/map';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { buttonVariants } from '@ui/button';
import { Span, Typography, typographyVariants } from '@ui/typography';
import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';
import { toppingsToString } from '@utils/toppingsToString';
import { BASE_URL } from '@constants/baseUrl';
import { PATHS } from '@constants/paths';

import { useCartPage } from './_hooks/useCartPage';

const CartCard = ({ count, doughs, pizzaId, size, toppings, uid }: CartItem) => {
  const isDesktop = useIsDesktop();

  const { pizza, decreaseCount, increaseCount, openModal, removeItem } = useCartPage(pizzaId);

  if (!pizza) return;

  return (
    <li className='relative flex gap-4 py-6 md:py-0'>
      <img alt={pizza.name} src={`${BASE_URL}${pizza.img}`} className='size-16 flex-none' />
      <div className='flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6'>
        <Typography tag='h4' variant='16-medium' className='md:w-[120px]'>
          {pizza.name}
        </Typography>
        <span className='min-h-8 text-xs font-regular md:w-[280px] md:text-sm'>{`${SIZE_MAP[size.name]} ${CM_MAP[size.name]} см, ${DOUGH_MAP[doughs.name].toLowerCase()} тесто ${toppingsToString(toppings)}`}</span>
        <div className='flex items-center justify-between md:gap-6'>
          <div className='flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-center text-xs font-regular md:text-sm'>
            <button className='size-4 md:size-5' onClick={() => decreaseCount(uid)}>
              –
            </button>
            <span className='size-4 md:size-5'>{count}</span>
            <button className='size-4 md:size-5' onClick={() => increaseCount(uid)}>
              +
            </button>
          </div>
          <button
            className={typographyVariants({
              variant: '12-regular',
              className: 'text-quartenery underline'
            })}
            onClick={() => openModal(uid)}
          >
            Изменить
          </button>
          {calculatePizzaPrice(size, doughs, toppings) * count} ₽
        </div>
      </div>

      {isDesktop && (
        <button className='absolute -right-1 -top-3 size-6' onClick={() => removeItem(uid)}>
          <XIcon />
        </button>
      )}
    </li>
  );
};

export const CartPage = () => {
  const isDesktop = useIsDesktop();

  const { cart, totalPrice } = useCartPage();

  if (cart.length <= 0) {
    return (
      <main className='mt-6 flex flex-col items-center gap-6 md:mt-12'>
        <EmptyCartIllustration />
        <Span variant='16-medium'>Ваша корзина пуста</Span>
        <Link to={PATHS.index} className={buttonVariants({ variant: 'link' })}>
          Перейти в меню
        </Link>
      </main>
    );
  }

  return (
    <main className='container relative flex flex-col gap-6'>
      <ul className='flex flex-col divide-y divide-border md:mt-12 md:gap-6 md:divide-y-0'>
        {cart.map((item) => (
          <CartCard key={item.uid} {...item} />
        ))}
      </ul>

      {!isDesktop && (
        <div className='fixed inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-lg bg-background p-4 shadow-[0px_-6px_30px_0px_rgba(0,0,0,0.1)]'>
          <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
          <Link to={PATHS.payment} className={buttonVariants({ className: 'w-full' })}>
            Оформить заказ
          </Link>
        </div>
      )}

      {isDesktop && (
        <>
          <hr className='h-px bg-border' />

          <div className='flex items-center justify-between'>
            <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
            <Link to={PATHS.payment} className={buttonVariants({ className: 'w-[328px]' })}>
              Оформить заказ
            </Link>
          </div>
        </>
      )}
    </main>
  );
};
