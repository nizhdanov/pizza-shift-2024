import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/lib/redux';
import { selectPizzaId } from '@modules/selectedItem';

import { Header } from './_components/Header';

const PizzaModal = lazy(() =>
  import('@/components/PizzaModal').then((module) => ({ default: module.PizzaModal }))
);

export const RootLayout = () => {
  const selectedPizzaId = useAppSelector(selectPizzaId);

  return (
    <>
      <Header />
      <Outlet />
      {!!selectedPizzaId && (
        <Suspense fallback={<div className='h-svh w-[200px] bg-white'></div>}>
          <PizzaModal />
        </Suspense>
      )}
    </>
  );
};
