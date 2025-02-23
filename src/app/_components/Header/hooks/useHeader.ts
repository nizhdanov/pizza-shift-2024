import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { openAuthModal, removeToken, selectIsAuth } from '@modules/auth';
import { selectTotalCount } from '@modules/cart';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectTotalCount);
  const isAuth = useAppSelector(selectIsAuth);

  const logout = () => {
    dispatch(removeToken());
  };

  const openModal = () => {
    dispatch(openAuthModal());
  };

  return {
    logout,
    isAuth,
    totalCount,
    openModal
  };
};
