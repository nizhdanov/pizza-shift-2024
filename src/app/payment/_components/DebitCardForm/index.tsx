import { ChevronLeftIcon } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@ui/button';
import { CardExpiryInput, PatternInput } from '@ui/input';
import { Typography } from '@ui/typography';

import { PaymentResultModal } from '../PaymentResultModal';

import { useDebitCardForm } from './hooks/useDebitCardForm';

export const DebitCardForm = () => {
  const { form, paymentResult, onSubmit, back } = useDebitCardForm();

  return (
    <>
      {paymentResult && <PaymentResultModal />}
      <div className='flex items-center gap-2'>
        <Button onClick={back} variant='ghost' size='icon'>
          <ChevronLeftIcon />
        </Button>
        <Typography tag='h2' variant='24-bold'>
          Введите данные карты для оплаты
        </Typography>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-[382px] flex-col gap-4'
        >
          <div className='space-y-4 rounded-lg bg-muted p-6'>
            <FormField
              control={form.control}
              name='pan'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер карты</FormLabel>
                  <FormControl>
                    <PatternInput format='#### ####' allowEmptyFormatting {...field} />
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
                    <FormLabel>Месяц/Год</FormLabel>
                    <FormControl>
                      <CardExpiryInput {...field} />
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
                      <PatternInput format='####' allowEmptyFormatting {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button disabled={!form.formState.isValid} type='submit' className='mt-6 w-full'>
            Оплатить
          </Button>
        </form>
      </Form>
    </>
  );
};
