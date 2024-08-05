'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {navbarMobileRoutes} from '@/lib/constants';
import AuthDialog from './AuthDialog';

export default function NavbarMobile() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 z-10 mx-auto w-full max-w-screen-md overflow-hidden border-t bg-background p-4 md:hidden">
      <ul className="grid w-full grid-cols-4 gap-4">
        {navbarMobileRoutes.map(route => {
          const isActiveRoute = pathName === route.path;

          return (
            <li key={route.name} className="flex items-center justify-center">
              <Link
                href={route.path}
                className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                {isActiveRoute ? (
                  <route.activeIcon className="h-6 w-6" />
                ) : (
                  <route.icon className="h-6 w-6" />
                )}
              </Link>
            </li>
          );
        })}
        <li className="flex items-center justify-center">
          <AuthDialog authVariant={'login'} />
        </li>
      </ul>
    </div>
  );
}
