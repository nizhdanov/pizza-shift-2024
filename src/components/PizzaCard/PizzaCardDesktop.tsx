import { CircleCheckIcon } from 'lucide-react';

import { cmMap, doughMap, sizeMap, toppingMap } from '@/lib/constants/pizzaMap';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@ui/dialog';
import { DialogDescription, DialogTitle } from '@ui/dialog';
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

export const PizzaCardDesktop = ({
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
  <section className='flex h-full flex-col items-center gap-6'>
    <img alt={pizza.name} src={`https://shift-backend.onrender.com${pizza.img}`} />
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Выбрать</Button>
          </DialogTrigger>
          <DialogContent className='max-w-max px-16'>
            <img
              width={220}
              height={220}
              alt={pizza.name}
              src={`https://shift-backend.onrender.com${pizza.img}`}
              className='size-[220px]'
            />
            <div className='flex w-full max-w-[436px] flex-col gap-6'>
              <div className='scrollbar flex h-full max-h-[476px] flex-col gap-6 overflow-y-auto pr-4'>
                <div className='flex flex-col gap-2'>
                  <DialogTitle asChild>
                    <Typography tag='h2' variant='24-bold'>
                      {pizza.name}
                    </Typography>
                  </DialogTitle>
                  <Span variant='14-regular'>{`${cmMap[selectedSize.name]} см, ${doughMap[selectedDough.name].toLowerCase()} тесто`}</Span>
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

                  <Tabs defaultValue={pizza.doughs[0].name}>
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
                          <CircleCheckIcon className='absolute right-1 top-1 size-6 text-primary' />
                        )}
                        <img
                          alt={topping.name}
                          src={`https://shift-backend.onrender.com${topping.img}`}
                          className='aspect-square size-[108px]'
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </section>
);
