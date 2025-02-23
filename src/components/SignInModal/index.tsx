import { ReactNode } from 'react';
import { LoaderCircleIcon } from 'lucide-react';

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
  const { otpForm, phone, isLoading, onSubmit } = useSignInModal();
  return (
    <>
      <DialogDescription asChild>
        <Typography tag='p' variant='16-regular'>
          Введите проверочный код для входа в личный кабинет
        </Typography>
      </DialogDescription>

      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onSubmit)}
          className='flex w-full max-w-form flex-col items-stretch gap-4'
        >
          <Input defaultValue={phone} disabled />

          <FormField
            control={otpForm.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PatternInput format='### ###' placeholder='Проверочный код' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type='submit' className='mt-6 w-full'>
            {isLoading && <LoaderCircleIcon className='mr-2 animate-spin' />}
            Войти
          </Button>
        </form>
      </Form>
    </>
  );
};

const PhoneStage = () => {
  const { phoneForm, nextStage } = useSignInModal();

  return (
    <>
      <DialogDescription asChild>
        <Typography tag='p' variant='16-regular'>
          Введите номер телефона для входа в личный кабинет
        </Typography>
      </DialogDescription>
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(nextStage)}
          className='flex w-full max-w-form flex-col gap-4'
        >
          <FormField
            control={phoneForm.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PatternInput format='+7 ### ### ## ##' allowEmptyFormatting {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-6 w-full'>
            Продолжить
          </Button>
        </form>
      </Form>
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
    <div className='flex flex-col gap-6'>
      <DialogTitle asChild>
        <Typography tag='h2' variant='24-bold'>
          Авторизация
        </Typography>
      </DialogTitle>
      {component[stage]}
    </div>
  );
};

export const SignInModal = () => {
  const isDesktop = useIsDesktop();

  const { isOpen, onClose } = useSignInModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isDesktop && (
        <ModalContent className='max-w-lg px-16'>
          <SignInModalContent />
        </ModalContent>
      )}

      {!isDesktop && (
        <SheetContent side='bottom'>
          <SheetHeader divider={false} action='back' />
          <SignInModalContent />
        </SheetContent>
      )}
    </Dialog>
  );
};
