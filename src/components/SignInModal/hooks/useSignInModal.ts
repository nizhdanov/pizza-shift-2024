import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { otpSchema, phoneSchema } from '@/lib/zod/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  closeAuthModal,
  selectAuthStage,
  selectIsAuthModalOpen,
  setAuthStage,
  setToken,
  usePostAuthOtpMutation
} from '@modules/auth';
import { clearUser, selectPhone, updatePhone, usePostSignInMutation } from '@modules/user';

export const useSignInModal = () => {
  const dispatch = useAppDispatch();

  const [postAuthOtp] = usePostAuthOtpMutation();
  const [postSignIn, { isLoading }] = usePostSignInMutation();

  const phone = useAppSelector(selectPhone);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const stage = useAppSelector(selectAuthStage);
  const isOpen = useAppSelector(selectIsAuthModalOpen);

  const onSubmit = async () => {
    try {
      const payload = await postSignIn({
        phone,
        code: Number(otpForm.getValues('otp').replaceAll(' ', ''))
      }).unwrap();
      dispatch(setToken(payload.token));
      // dispatch(fillPerson(payload.user));
      dispatch(closeAuthModal());
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    dispatch(clearUser());
    dispatch(closeAuthModal());
  };

  const nextStage = () => {
    const tempPhone = phoneForm.getValues('phone');
    postAuthOtp({ phone: tempPhone });
    dispatch(updatePhone(tempPhone));
    dispatch(setAuthStage('otp'));
  };

  return { isOpen, phoneForm, isLoading, phone, otpForm, stage, onSubmit, onClose, nextStage };
};
