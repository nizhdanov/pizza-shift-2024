import { useAppDispatch } from '@/lib/redux';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button } from '@ui/button';
import { Span, Typography } from '@ui/typography';
import { choosePizza } from '@modules/selectedItem';
import { BASE_URL } from '@constants/baseUrl';

interface PizzaCardProps {
  pizza: Pizza;
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const isDesktop = useIsDesktop();
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(choosePizza(pizza.id));
  };

  return (
    <>
      {isDesktop && (
        <section className='flex h-full flex-col items-center gap-6'>
          <img alt={pizza.name} src={`${BASE_URL}${pizza.img}`} />
          <div className='flex h-full flex-col justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <Typography tag='h3' variant='20-semi'>
                {pizza.name}
              </Typography>
              <Typography tag='p' variant='16-regular'>
                {pizza.description}
              </Typography>
            </div>
            <div className='flex flex-col gap-6'>
              <Span variant='20-semi'>от {pizza.sizes[0].price} ₽</Span>
              <Button onClick={openModal}>Выбрать</Button>
            </div>
          </div>
        </section>
      )}

      {!isDesktop && (
        <section className='flex cursor-pointer gap-6' onClick={openModal}>
          <img
            width={116}
            height={116}
            alt={pizza.name}
            src={`${BASE_URL}${pizza.img}`}
            className='size-[116px]'
          />
          <div className='flex flex-col gap-2 text-left'>
            <Typography tag='h3' variant='16-medium'>
              {pizza.name}
            </Typography>
            <Typography tag='p' variant='12-regular'>
              {pizza.description}
            </Typography>
            <Span variant='16-medium'>от {pizza.sizes[0].price} ₽</Span>
          </div>
        </section>
      )}
    </>
  );
};
