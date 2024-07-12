import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Typography } from '@ui/typography';

import { usePersonDetailsForm } from './hooks/usePersonDetailsForm';

export const PersonDetailsForm = () => {
  const {
    form,
    onSubmit,
    addressSelectRef,
    debouncedFindAddress,
    isPopoverOpened,
    selectAddress,
    addressSuggestions
  } = usePersonDetailsForm();
  return (
    <>
      <Typography tag='h2' variant='24-bold'>
        Введите ваши данные
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-[464px] space-y-4'>
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
                  <Input {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес*</FormLabel>
                <Popover open={isPopoverOpened}>
                  <FormControl>
                    <PopoverTrigger className='w-full'>
                      <Input
                        {...field}
                        onChange={(e) => {
                          debouncedFindAddress(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    autoFocus={false}
                    side='bottom'
                    align='start'
                    asChild
                  >
                    <ul
                      ref={addressSelectRef}
                      className='w-full max-w-[464px] divide-y divide-border rounded-xs'
                    >
                      {addressSuggestions.map((suggestion) => (
                        <li
                          key={suggestion.value}
                          onClick={() => selectAddress(suggestion)}
                          value={suggestion.value}
                          className='cursor-pointer py-1'
                        >
                          {suggestion.value}
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full md:w-[328px]'>
            Продолжить
          </Button>
        </form>
      </Form>
    </>
  );
};
