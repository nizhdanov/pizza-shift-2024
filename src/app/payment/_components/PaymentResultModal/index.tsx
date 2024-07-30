import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button } from '@ui/button';
import { ModalContent, SheetContent, SheetHeader } from '@ui/dialog';
import { Typography, typographyVariants } from '@ui/typography';
import { toppingsToString } from '@utils/toppingsToString';
import { FailureIcon } from '@icons/FailureIcon';
import { SuccessIcon } from '@icons/SuccessIcon';
import { useGetPizzaByIdResult } from '@modules/pizza';
import { CM_MAP, DOUGH_MAP, SIZE_MAP } from '@constants/map';

import { usePaymentResultModal } from './hooks/usePaymentResultModal';

const OrderField = ({ size, doughs, toppings, pizzaId, count, uid }: CartItem) => {
  const { pizza } = useGetPizzaByIdResult(pizzaId);

  return (
    <li
      key={uid}
      className={typographyVariants({ className: 'w-full', variant: '16-regular' })}
    >{`${pizza?.name}, ${SIZE_MAP[size.name].toLowerCase()} ${CM_MAP[size.name]} см, ${DOUGH_MAP[doughs.name].toLowerCase()} тесто ${toppingsToString(toppings)} х ${count}`}</li>
  );
};

const PaymentResultModalContent = () => {
  const { paymentResult, address, cartItems, totalPrice, onClick } = usePaymentResultModal();

  return (
    <div className='flex flex-col gap-6'>
      {!paymentResult?.success && (
        <>
          <FailureIcon className='size-14 self-center' />
          <DialogTitle asChild className='text-center'>
            <Typography tag='h2' variant='24-bold'>
              Произошла ошибка!
            </Typography>
          </DialogTitle>
          <DialogDescription asChild>
            <Typography tag='p' variant='16-regular'>
              {paymentResult?.reason}
            </Typography>
          </DialogDescription>
        </>
      )}
      {paymentResult?.success && (
        <>
          <SuccessIcon className='size-14 self-center' />
          <DialogTitle asChild className='text-center'>
            <Typography tag='h2' variant='24-bold'>
              Оплата прошла успешно!
            </Typography>
          </DialogTitle>
          <div className='flex flex-col gap-4'>
            <div className='space-y-1'>
              <Typography tag='h6' variant='12-regular'>
                Заказ
              </Typography>
              <ul>
                {cartItems.map((item) => (
                  <OrderField key={item.uid} {...item} />
                ))}
              </ul>
            </div>
            <div className='space-y-1'>
              <Typography tag='h6' variant='12-regular'>
                Адрес доставки
              </Typography>
              <Typography tag='p' variant='16-regular'>
                {address}
              </Typography>
            </div>
            <div className='space-y-1'>
              <Typography tag='h6' variant='12-regular'>
                Сумма заказа
              </Typography>
              <Typography tag='p' variant='16-regular'>
                {totalPrice} ₽
              </Typography>
            </div>
            <DialogDescription asChild>
              <Typography
                tag='p'
                variant='14-regular'
                className='text-center text-muted-foreground'
              >
                Вся информация была продублирована в SMS
              </Typography>
            </DialogDescription>
          </div>
          <Button onClick={onClick} variant='link' size='fit'>
            Перейти в заказы
          </Button>
        </>
      )}
    </div>
  );
};

export const PaymentResultModal = () => {
  const isDesktop = useIsDesktop();

  const { open, onClose } = usePaymentResultModal();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {isDesktop && (
        <ModalContent className='max-w-lg px-16'>
          <PaymentResultModalContent />
        </ModalContent>
      )}

      {!isDesktop && (
        <SheetContent side='bottom'>
          <SheetHeader action='close' divider={false} />
          <PaymentResultModalContent />
        </SheetContent>
      )}
    </Dialog>
  );
};
