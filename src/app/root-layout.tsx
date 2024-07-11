import { Outlet } from 'react-router-dom';

import { PizzaModal } from '@/components/PizzaModal';
import { useAppSelector } from '@/lib/store';
import { selectedItemSlice } from '@modules/selectedItem';

import { Header } from './_components/Header';

export const RootLayout = () => {
  const open = useAppSelector(selectedItemSlice.selectors.selectIsOpened);

  return (
    <>
      <Header />
      <Outlet />
      {open && <PizzaModal />}
    </>
  );
};
