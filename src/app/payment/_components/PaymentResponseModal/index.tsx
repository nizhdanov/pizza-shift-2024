import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

import { useIsDesktop } from '@hooks/useIsDesktop';
import { ModalContent, SheetContent, SheetHeader } from '@ui/dialog';

import { usePaymentResponse } from '../../_contexts/paymentResponse';

const PaymentResponseModalContent = () => {
  return (
    <div className='md:scrollbar flex flex-col gap-6 md:h-full md:max-h-[476px] md:overflow-y-auto md:pr-4'></div>
  );
};

export const PaymentResponseModal = () => {
  const isDesktop = useIsDesktop();

  const { paymentResponse, setPaymentResponse } = usePaymentResponse();

  const open = !!paymentResponse;
  const clear = () => setPaymentResponse(null!);

  return (
    <Dialog open={open} onOpenChange={clear}>
      {isDesktop && <ModalContent className='max-w-max px-16'></ModalContent>}

      {!isDesktop && (
        <SheetContent side='bottom'>
          <SheetHeader action='close' divider={false} />
        </SheetContent>
      )}
    </Dialog>
  );
};
