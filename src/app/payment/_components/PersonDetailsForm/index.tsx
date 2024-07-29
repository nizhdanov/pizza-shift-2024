import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button, buttonVariants } from '@ui/button';
import { Input, PatternInput } from '@ui/input';
import { Typography } from '@ui/typography';
import { PATHS } from '@constants/paths';

import { usePersonDetailsForm } from './hooks/usePersonDetailsForm';

export const PersonDetailsForm = () => {
  const { form, onSubmit } = usePersonDetailsForm();

  return (
    <>
      <div className='flex items-center gap-2'>
        <Link to={PATHS.cart} className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
          <ChevronLeftIcon />
        </Link>
        <Typography tag='h2' variant='24-bold'>
          Введите ваши данные
        </Typography>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-[464px] flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона*</FormLabel>
                <FormControl>
                  <PatternInput format='+7 ### ### ## ##' allowEmptyFormatting {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid}
            type='submit'
            className='mt-6 w-full md:w-[328px]'
          >
            Продолжить
          </Button>
        </form>
      </Form>
    </>
  );
};
