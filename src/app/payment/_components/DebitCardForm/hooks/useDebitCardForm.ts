import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { debitCardSchema } from '@/lib/zod/debitCardSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectSelectedAddress } from '@modules/address';
import { selectPizzas } from '@modules/cart';
import {
  selectPizzaPaymentResult,
  setPaymentStage,
  setPizzaPaymentResult,
  usePostPizzaPaymentMutation
} from '@modules/pizza';
import { selectPerson } from '@modules/user';

export const useDebitCardForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof debitCardSchema>>({
    resolver: zodResolver(debitCardSchema),
    defaultValues: {
      cvv: '',
      expireDate: '',
      pan: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const [postPizzaPayment, { isLoading }] = usePostPizzaPaymentMutation();
  const paymentResult = useAppSelector(selectPizzaPaymentResult);
  const person = useAppSelector(selectPerson);
  const address = useAppSelector(selectSelectedAddress);
  const pizzas = useAppSelector(selectPizzas);

  const back = () => dispatch(setPaymentStage('myAddresses'));

  const onSubmit = async (debitCard: z.infer<typeof debitCardSchema>) => {
    if (address) {
      const response = await postPizzaPayment({
        receiverAddress: {
          apartment: address.apartment,
          house: address.house,
          street: address.street,
          comment: address.comment ?? ''
        },
        debitCard,
        person,
        pizzas
      });

      if (response.data) {
        dispatch(setPizzaPaymentResult(response.data));
      }
    } else {
      dispatch(setPaymentStage('myAddresses'));
    }
  };

  return { form, paymentResult, isLoading, onSubmit, back };
};
