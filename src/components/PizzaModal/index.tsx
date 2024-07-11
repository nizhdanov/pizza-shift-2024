import { BASE_URL } from '@constants/baseUrl';
import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { CircleCheckIcon } from 'lucide-react';

import { CM_MAP, DOUGH_MAP, SIZE_MAP, TOPPING_MAP } from '@/lib/constants/map';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button } from '@ui/button';
import { ModalContent, SheetContent, SheetHeader } from '@ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@ui/tabs';
import { Span, Typography } from '@ui/typography';
import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';
import { cn } from '@utils/cn';

import { usePizzaModal } from './hooks/usePizzaModal';

const PizzaModalContent = () => {
  const {
    pizza,
    selectDough,
    selectSize,
    selectTopping,
    selectedDough,
    selectedSize,
    selectedToppings
  } = usePizzaModal();

  return (
    <div className='md:scrollbar flex flex-col gap-6 md:h-full md:max-h-[476px] md:overflow-y-auto md:pr-4'>
      <div className='flex flex-col gap-2'>
        <DialogTitle asChild>
          <Typography tag='h2' variant='24-bold'>
            {pizza.name}
          </Typography>
        </DialogTitle>
        <Span variant='14-regular'>{`${CM_MAP[selectedSize.name]} см, ${DOUGH_MAP[selectedDough.name].toLowerCase()} тесто`}</Span>
        <DialogDescription asChild>
          <Typography tag='p' variant='16-regular'>
            {pizza.description}
          </Typography>
        </DialogDescription>
      </div>

      <div className='flex flex-col gap-4'>
        <Tabs defaultValue={pizza.sizes[1].name}>
          <TabsList className='w-full'>
            {pizza.sizes.map((size) => (
              <TabsTrigger key={size.name} onClick={() => selectSize(size)} value={size.name}>
                {SIZE_MAP[size.name]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Tabs defaultValue={pizza.doughs[0].name}>
          <TabsList className='w-full'>
            {pizza.doughs.map((dough) => (
              <TabsTrigger key={dough.name} onClick={() => selectDough(dough)} value={dough.name}>
                {DOUGH_MAP[dough.name]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className='flex flex-col gap-1'>
        <Typography tag='p' variant='16-medium'>
          Добавить по вкусу
        </Typography>

        <ul className='grid grid-cols-3 gap-2 py-2'>
          {pizza.toppings.map((topping) => (
            <li
              key={topping.name}
              onClick={() => selectTopping(topping)}
              className={cn(
                'relative m-1 flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg p-2 shadow-md',
                selectedToppings.includes(topping) && 'outline outline-primary'
              )}
            >
              {selectedToppings.includes(topping) && (
                <CircleCheckIcon className='absolute right-1 top-1 size-6 text-primary' />
              )}
              <img
                alt={topping.name}
                src={`${BASE_URL}${topping.img}`}
                className='size-[88px] md:size-[108px]'
              />
              <div className='flex h-14 flex-col items-center justify-between text-center'>
                <Span variant='12-regular'>{TOPPING_MAP[topping.name]}</Span>
                <Span variant='14-medium'>{topping.cost} ₽</Span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PizzaModalButton = () => {
  const { addToCart, selectedDough, selectedSize, selectedToppings } = usePizzaModal();

  return (
    <Button className='w-full' onClick={addToCart}>
      В корзину за {calculatePizzaPrice(selectedSize, selectedDough, selectedToppings)} ₽
    </Button>
  );
};

export const PizzaModal = () => {
  const isDesktop = useIsDesktop();

  const { pizza, open, clear } = usePizzaModal();

  return (
    <Dialog open={open} onOpenChange={clear}>
      {isDesktop && (
        <ModalContent className='max-w-max px-16'>
          <img
            width={220}
            height={220}
            alt={pizza.name}
            src={`${BASE_URL}${pizza.img}`}
            className='size-[220px]'
          />
          <div className='flex w-full max-w-[436px] flex-col gap-6'>
            <PizzaModalContent key='pizza-modal-content' />
            <PizzaModalButton />
          </div>
        </ModalContent>
      )}

      {!isDesktop && (
        <SheetContent side='bottom' className='max-h-svh overflow-y-auto'>
          <SheetHeader divider={false} />
          <div className='mb-[88px] flex flex-col gap-8 px-4'>
            <img
              alt={pizza.name}
              src={`${BASE_URL}${pizza.img}`}
              className='size-[220px] self-center'
            />
            <PizzaModalContent key='pizza-modal-content' />
          </div>

          <div className='fixed inset-x-0 bottom-0 bg-background p-4'>
            <PizzaModalButton />
          </div>
        </SheetContent>
      )}
    </Dialog>
  );
};
