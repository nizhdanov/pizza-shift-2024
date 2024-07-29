import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { personDetailsSchema } from '@/lib/zod/personDetailsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { fillAddresses } from '@modules/address';
import { setPaymentStage } from '@modules/stage';
import { fillPerson, selectPerson } from '@modules/user';

export const usePersonDetailsForm = () => {
  const dispatch = useAppDispatch();

  const defaultValues = useAppSelector(selectPerson);

  const form = useForm<z.infer<typeof personDetailsSchema>>({
    resolver: zodResolver(personDetailsSchema),
    defaultValues: {
      phone: defaultValues.phone ?? '',
      email: defaultValues.email ?? '',
      firstname: defaultValues.firstname ?? '',
      lastname: defaultValues.lastname ?? ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const onSubmit = (data: z.infer<typeof personDetailsSchema>) => {
    dispatch(fillAddresses());
    dispatch(
      fillPerson({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email
      })
    );

    dispatch(setPaymentStage('myAddresses'));
  };

  return {
    form,
    onSubmit
  };
};
