import { CircleCheckIcon } from 'lucide-react';

import { cmMap, doughMap, sizeMap, toppingMap } from '@/lib/constants/pizzaMap';
import { Button } from '@ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@ui/tabs';
import { Span, Typography } from '@ui/typography';
import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';
import { cn } from '@utils/cn';
import { CartItem } from '@modules/cart';

interface PizzaCardProps {
  pizza: Pizza;
  open: boolean;
  setOpen: (open: boolean) => void;

  selectedSize: PizzaSize;
  setSelectedSize: (selectedSize: PizzaSize) => void;

  selectedDough: PizzaDough;
  setSelectedDough: (selectedDough: PizzaDough) => void;

  selectedToppings: PizzaIngredient[];
  handleSelectTopping: (topping: PizzaIngredient) => void;

  addToCart: (pizza: CartItem) => void;
}

export const PizzaCardMobile = ({
  open,
  setOpen,
  pizza,
  handleSelectTopping,
  selectedDough,
  selectedSize,
  selectedToppings,
  setSelectedDough,
  setSelectedSize,
  addToCart
}: PizzaCardProps) => (
  <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger>
      <section className='flex gap-6'>
        <img
          width={116}
          height={116}
          alt={pizza.name}
          src={`https://shift-backend.onrender.com${pizza.img}`}
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
    </SheetTrigger>
    <SheetContent side='bottom' className='max-h-svh overflow-y-auto'>
      <SheetHeader divider={false} />
      <div className='mb-[88px] flex flex-col gap-8 px-4'>
        <img
          alt={pizza.name}
          src={`https://shift-backend.onrender.com${pizza.img}`}
          className='size-[220px] self-center'
        />

        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <SheetTitle asChild>
              <Typography tag='h2' variant='24-bold'>
                {pizza.name}
              </Typography>
            </SheetTitle>
            <Span variant='14-regular'>{`${cmMap[selectedSize.name]} см, ${doughMap[selectedDough.name].toLowerCase()} тесто`}</Span>
            <SheetDescription asChild>
              <Typography tag='p' variant='16-regular'>
                {pizza.description}
              </Typography>
            </SheetDescription>
          </div>

          <div className='flex flex-col gap-4'>
            <Tabs defaultValue={selectedSize.name}>
              <TabsList className='w-full'>
                {pizza.sizes.map((size) => (
                  <TabsTrigger
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    value={size.name}
                  >
                    {sizeMap[size.name]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs defaultValue={selectedDough.name}>
              <TabsList className='w-full'>
                {pizza.doughs.map((dough) => (
                  <TabsTrigger
                    key={dough.name}
                    onClick={() => setSelectedDough(dough)}
                    value={dough.name}
                  >
                    {doughMap[dough.name]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className='flex flex-col gap-1'>
            <Typography tag='p' variant='16-medium'>
              Добавить по вкусу
            </Typography>

            <div className='grid grid-cols-3 gap-2 py-2'>
              {pizza.toppings.map((topping) => (
                <div
                  key={topping.name}
                  onClick={() => handleSelectTopping(topping)}
                  className={cn(
                    'relative m-1 flex w-fit flex-col gap-3 rounded-lg p-2 shadow-md',
                    selectedToppings.includes(topping) && 'outline outline-primary'
                  )}
                >
                  {selectedToppings.includes(topping) && (
                    <CircleCheckIcon className='absolute right-1 top-1 size-5 text-primary' />
                  )}
                  <img
                    alt={topping.name}
                    src={`https://shift-backend.onrender.com${topping.img}`}
                    className='aspect-square size-[88px]'
                  />
                  <div className='flex h-14 flex-col items-center justify-between text-center'>
                    <Span variant='12-regular'>{toppingMap[topping.name]}</Span>
                    <Span variant='14-medium'>{topping.cost} ₽</Span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-background p-4'>
        <Button
          className='w-full'
          onClick={() => {
            addToCart({
              id: pizza.id,
              description: pizza.description,
              doughs: selectedDough,
              name: pizza.name,
              size: selectedSize,
              toppings: selectedToppings,
              count: 1,
              img: pizza.img
            });
            setOpen(false);
          }}
        >
          В корзину за{' '}
          {calculatePizzaPrice({
            doughs: selectedDough,
            size: selectedSize,
            toppings: selectedToppings
          })}{' '}
          ₽
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);
