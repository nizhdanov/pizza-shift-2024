import { type ReactNode } from 'react';

import { DebitCardForm } from './_components/DebitCardForm';
import { PersonDetailsForm } from './_components/PersonDetailsForm';
import { PaymentResponseProvider } from './_contexts/paymentResponse';
import { Stage, StageProvider, useStage } from './_contexts/stage';

const component: Record<Stage, ReactNode> = {
  personDetails: <PersonDetailsForm />,
  debitCard: <DebitCardForm />
};

const Container = () => {
  const { stage } = useStage();

  return component[stage];
};

export const PaymentPage = () => {
  return (
    <StageProvider defaultStage='personDetails'>
      <PaymentResponseProvider>
        <main className='container mt-6 space-y-4 md:mt-12'>
          <Container />
        </main>
      </PaymentResponseProvider>
    </StageProvider>
  );
};
