import { Navigate, Outlet, type To } from 'react-router-dom';

import { useAppSelector } from '@/lib/redux';
import { selectIsAuth } from '@modules/auth';

interface AuthWrapperProps {
  children?: React.ReactNode;
  redirectTo: To;
}

export const AuthWrapper = ({ children, redirectTo }: AuthWrapperProps) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate replace to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
