'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {navbarMobileRoutes} from '@/libs/constants';
import {AuthDialog, AuthProfile} from '../auth';
import {RiUserLine} from 'react-icons/ri';
import {useAuthStore} from '@/providers/zustand-provider';
import {useQuery} from '@tanstack/react-query';
import {getUser} from '@/actions/auth';

export default function NavbarBottom() {
  const {showAuth, setShowAuth} = useAuthStore(state => state);

  const pathName = usePathname();

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  return (
    <div className="fixed bottom-0 z-10 mx-auto w-full max-w-screen-md overflow-hidden border-t bg-background p-4 md:hidden">
      <div className="grid w-full grid-cols-3 gap-4">
        {navbarMobileRoutes.map(route => {
          const isActiveRoute = pathName === route.path;

          return (
            <div key={route.name} className="flex items-center justify-center">
              <Link
                href={route.path}
                className="flex cursor-pointer flex-col items-center justify-center hover:text-primary"
              >
                {isActiveRoute ? (
                  <>
                    <route.activeIcon className="h-6 w-6 text-primary" />
                    <p className="text-xs text-primary">{route.name}</p>
                  </>
                ) : (
                  <>
                    <route.icon className="h-6 w-6" />
                    <p className="text-xs">{route.name}</p>
                  </>
                )}
              </Link>
            </div>
          );
        })}
        {user ? (
          <div className="flex items-center justify-center">
            <div className="flex cursor-pointer flex-col items-center justify-center hover:text-primary">
              <AuthProfile user={user} />
            </div>
          </div>
        ) : (
          <div onClick={() => setShowAuth(true)} className="flex items-center justify-center">
            <div className="flex cursor-pointer flex-col items-center justify-center hover:text-primary">
              <RiUserLine className="h-6 w-6" />
              <p className="text-xs">Akun</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
