import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { authSchema } from '@/lib/zod/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  closeAuthModal,
  selectAuthStage,
  selectIsAuthModalOpen,
  setAuthStage
} from '@modules/auth';

export const useSignInModal = () => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      phone: '',
      otp: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const stage = useAppSelector(selectAuthStage);
  const isOpen = useAppSelector(selectIsAuthModalOpen);

  const field = form.control.register('phone');

  const onSubmit = () => {};

  const onClose = () => {
    dispatch(closeAuthModal());
  };

  const nextStage = () => {
    dispatch(setAuthStage('otp'));
  };

  return { isOpen, form, field, stage, onSubmit, onClose, nextStage };
};
