import { Link } from 'react-router-dom';
import { BASE_URL } from '@constants/baseUrl';
import { PATHS } from '@constants/paths';
import { XIcon } from 'lucide-react';

import { CM_MAP, DOUGH_MAP, SIZE_MAP, TOPPING_MAP } from '@/lib/constants/map';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Span, Typography, typographyVariants } from '@ui/typography';
import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';

import { useCartPage } from './_hooks/useCartPage';

const toppingsToString = (toppings: CartPizza['toppings']) => {
  if (toppings.length > 0) {
    const tops = toppings
      .map((topping) => TOPPING_MAP[topping.name])
      .join(', ')
      .toLowerCase();
    return `+ ${tops}`;
  }
  return '';
};

export const CartPage = () => {
  const isDesktop = useIsDesktop();

  const { cart, totalPrice, decreaseCount, increaseCount, openModal, removeItem } = useCartPage();

  if (cart.length <= 0) {
    return (
      <main className='mt-6 text-center md:mt-12'>
        <Span variant='16-medium'>Ваша корзина пуста</Span>
      </main>
    );
  }

  return (
    <main className='container relative flex flex-col gap-6'>
      <ul className='flex flex-col divide-y divide-border md:mt-12 md:gap-6 md:divide-y-0'>
        {cart.map(({ value: pizza, size, doughs, toppings, count, uid }) => (
          <li key={uid} className='relative flex gap-4 py-6 md:py-0'>
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
                  onClick={() => openModal({ value: pizza, size, doughs, toppings, count, uid })}
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
        ))}
      </ul>

      {!isDesktop && (
        <div className='fixed inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-lg bg-background p-4 shadow-[0px_-6px_30px_0px_rgba(0,0,0,0.1)]'>
          <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
          <Link to={PATHS.payment} className='w-full'>
            Оформить заказ
          </Link>
        </div>
      )}

      {isDesktop && (
        <>
          <hr className='h-px bg-border' />

          <div className='flex items-center justify-between gap-4 bg-background'>
            <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
            <Link to={PATHS.payment} className='w-[328px]'>
              Оформить заказ
            </Link>
          </div>
        </>
      )}
    </main>
  );
};
