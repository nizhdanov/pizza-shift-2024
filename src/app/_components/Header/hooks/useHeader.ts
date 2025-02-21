import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { openAuthModal } from '@modules/auth';
import { selectTotalCount } from '@modules/cart';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectTotalCount);
  const isAuth = false;

  const openModal = () => {
    dispatch(openAuthModal());
  };

  return {
    isAuth,
    totalCount,
    openModal
  };
};
