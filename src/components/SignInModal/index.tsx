import { ReactNode } from 'react';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  ModalContent,
  SheetContent,
  SheetHeader
} from '@ui/dialog';
import { Input, PatternInput } from '@ui/input';
import { Typography } from '@ui/typography';
import { type AuthStage } from '@modules/auth';

import { useSignInModal } from './hooks/useSignInModal';

const OtpStage = () => {
  const { form, onSubmit } = useSignInModal();

  return (
    <>
      <DialogDescription asChild>
        <Typography tag='p' variant='16-regular'>
          Введите проверочный код для входа в личный кабинет
        </Typography>
      </DialogDescription>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-form flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PatternInput
                    format='### ###'
                    placeholder='Проверочный код'
                    allowEmptyFormatting
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-6 w-full md:w-[328px]'>
            Войти
          </Button>
        </form>
      </Form>
    </>
  );
};

const PhoneStage = () => {
  const { field, nextStage } = useSignInModal();

  return (
    <>
      <DialogDescription asChild>
        <Typography tag='p' variant='16-regular'>
          Введите номер телефона для входа в личный кабинет
        </Typography>
      </DialogDescription>
      <PatternInput format='+7 ### ### ## ##' allowEmptyFormatting {...field} />
      <Button onClick={nextStage} className='mt-6 w-full md:w-[328px]'>
        Продолжить
      </Button>
    </>
  );
};

const component: Record<NonNullable<AuthStage>, ReactNode> = {
  otp: <OtpStage />,
  phone: <PhoneStage />
};

const SignInModalContent = () => {
  const { stage } = useSignInModal();

  if (stage === null) return;

  return (
    <>
      <DialogTitle asChild>
        <Typography tag='h2' variant='24-bold'>
          Авторизация
        </Typography>
      </DialogTitle>
      {component[stage]}
    </>
  );
};

export const SignInModal = () => {
  const isDesktop = useIsDesktop();

  const { isOpen, onClose } = useSignInModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isDesktop && (
        <ModalContent className='max-w-max px-16'>
          <SignInModalContent />
        </ModalContent>
      )}

      {!isDesktop && (
        <SheetContent side='bottom' className='max-h-svh overflow-y-auto'>
          <SheetHeader divider={false} action='back' />
          <SignInModalContent />
        </SheetContent>
      )}
    </Dialog>
  );
};
