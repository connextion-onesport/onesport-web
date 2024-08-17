'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {navbarMobileRoutes} from '@/libs/constants';
import AuthDialog from './AuthDialog';

export default function NavbarMobile() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 z-10 mx-auto w-full max-w-screen-md overflow-hidden border-t bg-background p-4 md:hidden">
      <ul className="grid w-full grid-cols-3 gap-4">
        {navbarMobileRoutes.map(route => {
          const isActiveRoute = pathName === route.path;

          return (
            <li key={route.name} className="flex items-center justify-center">
              <Link
                href={route.path}
                className="flex cursor-pointer flex-col items-center justify-center hover:text-primary"
              >
                {isActiveRoute ? (
                  <>
                    <route.activeIcon className="h-6 w-6 text-primary" />
                    <span className="text-xs text-primary">{route.name}</span>
                  </>
                ) : (
                  <>
                    <route.icon className="h-6 w-6" />
                    <span className="text-xs">{route.name}</span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
        <li className="flex cursor-pointer flex-col items-center justify-center hover:text-primary">
          <AuthDialog authVariant={'login'} />
          <span className="text-xs">Akun</span>
        </li>
      </ul>
    </div>
  );
}
