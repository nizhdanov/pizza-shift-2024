import { ChevronLeftIcon } from 'lucide-react';

import { NoAddressesYetIllustration } from '@/components/illustrations/NoAddressesYetIllustration';
import { Button } from '@ui/button';
import { RadioGroup, RadioGroupCard } from '@ui/radio';
import { Span, Typography } from '@ui/typography';

import { useMyAddresses } from './hooks/useMyAddresses';

export const MyAddresses = () => {
  const { isEmpty, addresses, selectedAddress, next, onClick, addAddress, back } = useMyAddresses();

  return (
    <>
      <div className='flex items-center gap-2'>
        <Button onClick={back} variant='ghost' size='icon'>
          <ChevronLeftIcon />
        </Button>
        <Typography tag='h2' variant='24-bold'>
          Ваши адреса
        </Typography>
      </div>

      {isEmpty && (
        <div className='w-full max-w-form text-center'>
          <NoAddressesYetIllustration className='' />
          <Typography tag='p' variant='16-regular' className='text-muted-foreground'>
            Адресов пока нет
          </Typography>
        </div>
      )}

      <div className='flex w-full max-w-form flex-col gap-4'>
        {!isEmpty && (
          <RadioGroup defaultValue={selectedAddress!.value} asChild>
            <ul className='flex flex-col gap-4'>
              {addresses.map((address) => (
                <li key={address.value + address.apartment} className='flex min-h-20'>
                  <RadioGroupCard
                    onClick={() => onClick(address)}
                    value={address.value}
                    className='flex w-full flex-col text-left'
                  >
                    <Typography variant='16-medium'>
                      {`${address.value}, кв ${address.apartment}`}
                    </Typography>
                    <Span variant='14-regular' className='text-muted-foreground'>
                      {address.comment}
                    </Span>
                  </RadioGroupCard>
                </li>
              ))}
            </ul>
          </RadioGroup>
        )}

        <div className='mt-6 flex flex-col gap-4 md:flex-row'>
          {!isEmpty && (
            <Button disabled={!selectedAddress} onClick={next} className='w-full md:order-2'>
              Выбрать
            </Button>
          )}
          <Button onClick={addAddress} variant='secondary' className='w-full md:order-1'>
            Добавить адрес
          </Button>
        </div>
      </div>
    </>
  );
};
