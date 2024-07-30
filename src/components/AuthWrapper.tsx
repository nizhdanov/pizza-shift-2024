import { Navigate, Outlet, type To } from 'react-router-dom';

interface AuthWrapperProps {
  children?: React.ReactNode;
  redirectTo: To;
}

export const AuthWrapper = ({ children, redirectTo }: AuthWrapperProps) => {
  const isAuth = false;

  if (!isAuth) {
    return <Navigate replace to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
