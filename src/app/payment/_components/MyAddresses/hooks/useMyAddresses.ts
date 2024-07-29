import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { chooseAddress, selectAddresses, selectSelectedAddress } from '@modules/address';
import { setPaymentStage } from '@modules/stage';

export const useMyAddresses = () => {
  const dispatch = useAppDispatch();
  const addAddress = () => dispatch(setPaymentStage('newAddress'));

  const addresses = useAppSelector(selectAddresses);
  const selectedAddress = useAppSelector(selectSelectedAddress);

  const isEmpty = addresses.length === 0;

  const back = () => dispatch(setPaymentStage('personDetails'));

  const next = () => {
    dispatch(setPaymentStage('debitCard'));
  };

  const onClick = (address: Address) => {
    dispatch(chooseAddress(address));
  };

  return {
    isEmpty,
    addresses,
    selectedAddress,
    next,
    onClick,
    addAddress,
    back
  };
};
