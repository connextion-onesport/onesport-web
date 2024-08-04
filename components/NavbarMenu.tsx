'use client';

import {navbarRoutes} from '@/lib/constants';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function NavbarMenu() {
  const pathName = usePathname();

  return (
    <ul className="hidden gap-2 lg:flex">
      {navbarRoutes.map(route => (
        <li
          key={route.name}
          className={`${pathName === route.path ? 'font-bold text-primary' : 'text-slate-500'} whitespace-nowrap hover:text-primary md:h-10 md:rounded-md md:px-4 md:py-2`}
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}
