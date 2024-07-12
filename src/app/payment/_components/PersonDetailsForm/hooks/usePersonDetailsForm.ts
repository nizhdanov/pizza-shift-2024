import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useClickOutside, useDebounceCallback } from '@siberiacancode/reactuse';
import { z } from 'zod';

import { useStage } from '@/app/payment/_contexts/stage';
import { postAddressSuggestions } from '@/lib/api/dadata/postAddressSuggestions';
import { useAppDispatch } from '@/lib/store';
import { personDetailsSchema } from '@/lib/zod/personDetailsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSlice } from '@modules/user';

export const usePersonDetailsForm = () => {
  const form = useForm<z.infer<typeof personDetailsSchema>>({
    resolver: zodResolver(personDetailsSchema),
    defaultValues: {
      phone: '+78005553535',
      email: 'myemail@mail.ru',
      firstname: 'Никита',
      lastname: 'Жданов',
      address: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const dispatch = useAppDispatch();

  const [addressSuggestions, setAddressSuggestions] = useState<PostAddressSuggestionsResponse>([]);
  const [selectedAddress, setSelectedAddress] = useState<PostAddressSuggestionsResponse[0]>(null!);

  const addressSelectRef = useRef(null);
  const { setStage } = useStage();

  useClickOutside(addressSelectRef, () => {
    setAddressSuggestions([]);
  });

  const isPopoverOpened = addressSuggestions.length > 0;

  const findAddress = async (query: string) => {
    const suggestions = await postAddressSuggestions(query);
    setAddressSuggestions(suggestions);
  };

  const debouncedFindAddress = useDebounceCallback(findAddress, 300);

  const selectAddress = (address: PostAddressSuggestionsResponse[0]) => {
    setSelectedAddress(address);
    form.setValue('address', address.value);
    setAddressSuggestions([]);
  };

  const onSubmit = (data: z.infer<typeof personDetailsSchema>) => {
    dispatch(
      userSlice.actions.fillPerson({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone
      })
    );
    dispatch(
      userSlice.actions.fillReceiverAddress({
        apartment: selectedAddress?.data.flat || '',
        house: selectedAddress?.data.house || '',
        street: selectedAddress?.data.street || '',
        value: selectedAddress?.value || ''
      })
    );
    setStage('debitCard');
  };

  return {
    form,
    debouncedFindAddress,
    onSubmit,
    addressSelectRef,
    selectAddress,
    isPopoverOpened,
    addressSuggestions
  };
};
