import { ChevronLeftIcon, LoaderCircleIcon } from 'lucide-react';

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
import { Popover, PopoverAnchor, PopoverContent } from '@ui/popover';
import { Typography } from '@ui/typography';

import { useNewAddress } from './hooks/useNewAddress';

// TODO: update address

export const NewAddress = () => {
  const {
    isOpen,
    isValid,
    isLoading,
    form,
    suggestions,
    inputRef,
    inputValue,
    onChange,
    onSubmit,
    onPointerDownOutside,
    back,
    selectSuggestion
  } = useNewAddress();

  return (
    <>
      <div className='flex items-center gap-2'>
        <Button onClick={back} variant='ghost' size='icon'>
          <ChevronLeftIcon />
        </Button>
        <Typography tag='h2' variant='24-bold'>
          Новый адрес
        </Typography>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-form flex-col gap-4'
        >
          <div className='space-y-[6px]'>
            <FormLabel onClick={() => inputRef.current?.focus()}>Город, улица и дом*</FormLabel>
            <Popover open={isOpen}>
              <PopoverAnchor className='relative'>
                <Input
                  value={inputValue}
                  onChange={onChange}
                  name='cityStreetHouse'
                  ref={inputRef}
                />
                {isLoading && (
                  <LoaderCircleIcon className='absolute right-0 top-0 m-3 size-6 animate-spin text-muted-foreground' />
                )}
              </PopoverAnchor>
              <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                onPointerDownOutside={onPointerDownOutside}
                align='start'
                asChild
              >
                <ul className='w-full max-w-form rounded-xs px-3 py-2'>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.value}
                      className='cursor-pointer rounded-xs px-3 py-2 hover:bg-muted'
                      onClick={() => selectSuggestion(suggestion.value)}
                    >
                      {suggestion.value ?? '@@@'}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          <div className='flex w-full justify-between gap-4'>
            <FormField
              control={form.control}
              name='floor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Этаж</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='apartament'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Квартира*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комментарий</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={!isValid} className='mt-6 w-full md:w-[328px]'>
            Добавить
          </Button>
        </form>
      </Form>
    </>
  );
};
