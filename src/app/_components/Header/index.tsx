import { Link } from 'react-router-dom';
import {
  ClockIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingCartIcon,
  UserRoundIcon
} from 'lucide-react';

import { PATHS } from '@/lib/constants/paths';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { Button, buttonVariants } from '@ui/button';
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  SheetBody,
  SheetContent,
  SheetHeader
} from '@ui/dialog';
import { Span } from '@ui/typography';
import { cn } from '@utils/cn';
import { FullLogoIcon } from '@icons/FullLogoIcon';

import { useHeader } from './hooks/useHeader';

const AuthButtons = () => {
  const { isAuth, openModal, logout } = useHeader();

  return (
    <>
      {!isAuth && (
        <Button onClick={openModal} variant='ghost' size='md'>
          <LogInIcon className='mr-2 size-5' />
          <Span variant='16-medium' color='body-primary'>
            Войти
          </Span>
        </Button>
      )}
      {isAuth && (
        <Button onClick={logout} variant='ghost' size='md'>
          <LogOutIcon className='mr-2 size-5' />
          <Span variant='16-medium' color='body-primary'>
            Выйти
          </Span>
        </Button>
      )}
    </>
  );
};

export const Header = () => {
  const isDesktop = useIsDesktop();

  const { isAuth, totalCount } = useHeader();

  return (
    <>
      <header className='container flex h-14 items-center justify-between md:h-20'>
        <div className='flex flex-none items-center'>
          <Link to={PATHS.index}>
            <FullLogoIcon />
          </Link>

          {/* <div className='mx-8 flex items-center'>
            <MapPinIcon className='mr-2 size-4' />
            <Span variant='12-regular' color='body-primary'>
              Санкт-Петербург
            </Span>
          </div> */}
        </div>

        {isDesktop && (
          <nav
            className={cn(
              'ml-8 flex w-full items-center',
              isAuth ? 'justify-between' : 'justify-end'
            )}
          >
            {isAuth && (
              <div>
                <Link
                  to={PATHS.profile}
                  className={buttonVariants({ variant: 'ghost', size: 'md' })}
                >
                  <UserRoundIcon className='mr-2 size-5' />
                  <Span variant='16-medium' color='body-primary'>
                    Профиль
                  </Span>
                </Link>

                <Link
                  to={PATHS.orders}
                  className={buttonVariants({ variant: 'ghost', size: 'md' })}
                >
                  <ClockIcon className='mr-2 size-5' />
                  <Span variant='16-medium' color='body-primary'>
                    Заказы
                  </Span>
                </Link>
              </div>
            )}

            <div>
              <Link
                to={PATHS.cart}
                className={buttonVariants({ variant: 'ghost', size: 'md', className: 'relative' })}
              >
                {totalCount > 0 && (
                  <div className='absolute -right-1 -top-1 size-5 rounded-full bg-primary text-center text-sm font-medium text-white'>
                    {totalCount}
                  </div>
                )}
                <ShoppingCartIcon className='mr-2 size-5' />
                <Span variant='16-medium' color='body-primary'>
                  Корзина
                </Span>
              </Link>

              <AuthButtons />
            </div>
          </nav>
        )}

        {!isDesktop && (
          <Dialog>
            <DialogTrigger>
              <MenuIcon />
            </DialogTrigger>
            <SheetContent>
              <SheetHeader action='close'>
                <DialogTitle className='sr-only'>Меню</DialogTitle>
                <DialogDescription className='sr-only'>Меню</DialogDescription>
              </SheetHeader>
              <SheetBody className='items-start gap-2'>
                {isAuth && (
                  <>
                    <Link
                      to={PATHS.profile}
                      className={buttonVariants({ variant: 'ghost', size: 'md' })}
                    >
                      <UserRoundIcon className='mr-2 size-5' />
                      <Span variant='16-medium' color='body-primary'>
                        Профиль
                      </Span>
                    </Link>

                    <Link
                      to={PATHS.orders}
                      className={buttonVariants({ variant: 'ghost', size: 'md' })}
                    >
                      <ClockIcon className='mr-2 size-5' />
                      <Span variant='16-medium' color='body-primary'>
                        Заказы
                      </Span>
                    </Link>
                  </>
                )}

                <Link to={PATHS.cart} className={buttonVariants({ variant: 'ghost', size: 'md' })}>
                  <ShoppingCartIcon className='mr-2 size-5' />
                  <Span variant='16-medium' color='body-primary'>
                    Корзина
                  </Span>
                </Link>

                <AuthButtons />
              </SheetBody>
            </SheetContent>
          </Dialog>
        )}
      </header>
      <hr className='h-px bg-border' />
    </>
  );
};
