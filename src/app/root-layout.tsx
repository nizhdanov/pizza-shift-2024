import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/lib/redux';
import { selectIsAuthModalOpen } from '@modules/auth';
import { selectPizzaId } from '@modules/selectedItem';

import { Header } from './_components/Header';

const PizzaModal = lazy(() =>
  import('@/components/PizzaModal').then((module) => ({ default: module.PizzaModal }))
);

const SignInModal = lazy(() =>
  import('@/components/SignInModal').then((module) => ({ default: module.SignInModal }))
);

export const RootLayout = () => {
  const selectedPizzaId = useAppSelector(selectPizzaId);
  const isAuthModalOpen = useAppSelector(selectIsAuthModalOpen);
  return (
    <>
      <Header />
      <Outlet />
      {!!selectedPizzaId && (
        <Suspense fallback={<div className='h-svh w-[200px] bg-white'></div>}>
          <PizzaModal />
        </Suspense>
      )}
      {isAuthModalOpen && (
        <Suspense fallback={<div className='h-svh w-[200px] bg-white'></div>}>
          <SignInModal />
        </Suspense>
      )}
    </>
  );
};
