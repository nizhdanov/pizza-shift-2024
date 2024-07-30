import { type ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { newAddressScheme } from '@/lib/zod/newAddressScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounceCallback } from '@hooks/useDebounceCallback';
import { addAddress, chooseAddress } from '@modules/address';
import { setPaymentStage } from '@modules/stage';
import {
  chooseSuggestion,
  clearSelectedSuggestion,
  clearSuggestions,
  fetchSuggestions,
  selectLoadingSuggestions,
  selectSelectedSuggestion,
  selectSuggestions
} from '@modules/suggestion';

export const useNewAddress = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof newAddressScheme>>({
    resolver: zodResolver(newAddressScheme),
    defaultValues: {
      apartament: '',
      comment: '',
      floor: ''
    }
  });

  const suggestions = useAppSelector(selectSuggestions);
  const isLoading = useAppSelector(selectLoadingSuggestions);
  const selectedSuggestion = useAppSelector(selectSelectedSuggestion);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const isOpen = suggestions.length > 0;

  const isValid = selectedSuggestion !== null && form.formState.isValid;

  const back = () => {
    dispatch(setPaymentStage('myAddresses'));
    dispatch(clearSuggestions());
    dispatch(clearSelectedSuggestion());
  };

  const getSuggestions = async (query: string) => {
    await dispatch(fetchSuggestions(query));
  };

  const debouncedGetSuggestions = useDebounceCallback(getSuggestions, 500);

  const onPointerDownOutside = () => {
    dispatch(clearSuggestions());
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedGetSuggestions(value);
    dispatch(clearSelectedSuggestion());

    if (event.target.value.length === 0) {
      dispatch(clearSuggestions());
    }
  };

  const selectSuggestion = (value: string) => {
    setInputValue(value);
    dispatch(chooseSuggestion(value));
  };

  const onSubmit = (data: z.infer<typeof newAddressScheme>) => {
    const address: Address = {
      apartment: data.apartament,
      city: selectedSuggestion!.data.city ?? 'null',
      house: selectedSuggestion!.data.house ?? 'null',
      street: selectedSuggestion!.data.street ?? 'null',
      value: selectedSuggestion!.value,
      comment: data.comment
    };

    dispatch(addAddress(address));
    dispatch(chooseAddress(address));
    dispatch(setPaymentStage('myAddresses'));
  };

  return {
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
  };
};
