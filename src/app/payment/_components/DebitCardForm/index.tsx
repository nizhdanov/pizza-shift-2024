import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useAppSelector } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Typography } from '@ui/typography';
import { cartSlice } from '@modules/cart';
import { usePostPizzaPaymentMutation } from '@modules/pizza';

import { PaymentResponseModal } from '../PaymentResponseModal';

const debitCardSchema = z.object({
  pan: z.string(),
  expireDate: z.string(),
  cvv: z.string()
});

export const DebitCardForm = () => {
  const form = useForm<z.infer<typeof debitCardSchema>>({
    resolver: zodResolver(debitCardSchema),
    defaultValues: {
      cvv: '111',
      expireDate: '11/11',
      pan: '1111 1111'
    }
  });

  const person = useAppSelector((state) => state.user.person);
  const receiverAddress = useAppSelector((state) => state.user.receiverAddress);
  const pizzas = useAppSelector(cartSlice.selectors.cartPizzas);

  const [postPizzaPayment] = usePostPizzaPaymentMutation();

  const onSubmit = async (data: z.infer<typeof debitCardSchema>) => {
    const response = await postPizzaPayment({
      debitCard: data,
      receiverAddress: {
        apartment: receiverAddress.apartment,
        house: receiverAddress.house,
        street: receiverAddress.street,
        comment: receiverAddress.comment ?? ''
      },
      person,
      pizzas
    });

    console.log(response);
  };

  return (
    <>
      <PaymentResponseModal />
      <Typography tag='h2' variant='24-bold'>
        Введите данные карты для оплаты
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-[382px] space-y-6'>
          <div className='space-y-4 rounded-lg bg-muted p-6'>
            <FormField
              control={form.control}
              name='pan'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex w-full gap-6'>
              <FormField
                control={form.control}
                name='expireDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Срок*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cvv'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type='submit' className='w-full'>
            Оплатить
          </Button>
        </form>
      </Form>
    </>
  );
};
