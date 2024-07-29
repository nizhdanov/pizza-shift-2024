import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/lib/redux';
import { selectCartItems } from '@modules/cart';
import { PaymentStage, selectPaymentStage } from '@modules/stage';
import { PATHS } from '@constants/paths';

import { DebitCardForm } from './_components/DebitCardForm';
import { MyAddresses } from './_components/MyAddresses';
import { NewAddress } from './_components/NewAddress';
import { PersonDetailsForm } from './_components/PersonDetailsForm';

const component: Record<PaymentStage, ReactNode> = {
  personDetails: <PersonDetailsForm />,
  myAddresses: <MyAddresses />,
  newAddress: <NewAddress />,
  debitCard: <DebitCardForm />
};

const Container = () => {
  const stage = useAppSelector(selectPaymentStage);

  return component[stage];
};

export const PaymentPage = () => {
  const cartItems = useAppSelector(selectCartItems);

  if (cartItems.length === 0) {
    return <Navigate to={PATHS.index} replace />;
  }

  return (
    <main className='container mt-6 space-y-4 md:mt-12'>
      <Container />
    </main>
  );
};
