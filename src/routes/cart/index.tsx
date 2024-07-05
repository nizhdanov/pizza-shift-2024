import { XIcon } from 'lucide-react';

import { cmMap, doughMap, sizeMap, toppingMap } from '@/lib/constants/pizzaMap';
import { useAppSelector } from '@/lib/store';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button } from '@ui/button';
import { Span, Typography, typographyVariants } from '@ui/typography';
import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';
import { cn } from '@utils/cn';

function toppingsToString(toppings: CartPizza['toppings']) {
  if (toppings.length > 0) {
    const tops = toppings
      .map((topping) => toppingMap[topping.name])
      .join(', ')
      .toLowerCase();
    return `+ ${tops}`;
  }
  return '';
}

export const CartPage = () => {
  const isDesktop = useIsDesktop();
  const cart = useAppSelector((state) => Object.values(state.cart));
  const totalPrice = cart.map((pizza) => calculatePizzaPrice(pizza)).reduce((a, b) => a + b, 0);

  const increaseCount = () => {};

  const decreaseCount = () => {};

  if (cart.length <= 0) {
    return (
      <main className='container flex h-full flex-col items-center justify-center gap-4 bg-background p-4'>
        <Span variant='16-medium'>Ваша корзина пуста</Span>
      </main>
    );
  }

  return (
    <main className='container relative flex flex-col gap-6'>
      <ul className='flex flex-col divide-y divide-border md:mt-12 md:gap-6 md:divide-y-0'>
        {cart.map((pizza) => (
          <li key={pizza.id} className='relative flex gap-4 py-6 md:py-0'>
            <img
              alt={pizza.name}
              src={`https://shift-backend.onrender.com${pizza.img}`}
              className='size-16 flex-none'
            />
            <div className='flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6'>
              <Typography tag='h4' variant='16-medium' className='md:w-[120px]'>
                {pizza.name}
              </Typography>
              <span
                className={cn(
                  'min-h-8 md:w-[280px]',
                  isDesktop
                    ? typographyVariants({ variant: '14-regular' })
                    : typographyVariants({ variant: '12-regular' })
                )}
              >{`${sizeMap[pizza.size.name]} ${cmMap[pizza.size.name]} см, ${doughMap[pizza.doughs.name].toLowerCase()} тесто ${toppingsToString(pizza.toppings)}`}</span>
              <div className='flex items-center justify-between md:gap-6'>
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-center',
                    isDesktop
                      ? typographyVariants({ variant: '14-regular' })
                      : typographyVariants({ variant: '12-regular' })
                  )}
                >
                  <button className='size-4 md:size-5'>–</button>
                  <span className='size-4 md:size-5'>{pizza.count}</span>
                  <button className='size-4 md:size-5'>+</button>
                </div>
                <button
                  className={typographyVariants({
                    variant: '12-regular',
                    className: 'text-quartenery underline'
                  })}
                >
                  Изменить
                </button>
                {calculatePizzaPrice(pizza)} ₽
              </div>
            </div>

            {isDesktop && (
              <button className='absolute -right-1 -top-3 size-6'>
                <XIcon />
              </button>
            )}
          </li>
        ))}
      </ul>

      {!isDesktop && (
        <div className='fixed inset-x-0 bottom-0 flex flex-col gap-4 rounded-t-lg bg-background p-4 shadow-[0px_-6px_30px_0px_rgba(0,0,0,0.1)]'>
          <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
          <Button className='w-full'>Оформить заказ</Button>
        </div>
      )}

      {isDesktop && (
        <>
          <hr className='h-px bg-border' />

          <div className='flex items-center justify-between gap-4 bg-background'>
            <Span variant='16-medium'>Стоимость заказа: {totalPrice} ₽</Span>
            <Button className='w-[328px]'>Оформить заказ</Button>
          </div>
        </>
      )}
    </main>
  );
};
