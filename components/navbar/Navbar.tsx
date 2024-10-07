'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from '../ui/button';
import {navbarRoutes} from '@/libs/constants';
import {RiSearchLine} from 'react-icons/ri';
import {useAuthStore} from '@/providers/zustand-provider';
import NavbarMobileMenu from './NavbarMobileMenu';
import {AuthProfile} from '../auth';
import {useQuery} from '@tanstack/react-query';
import {getUser} from '@/actions/auth';
import {User} from 'next-auth';

export default function Navbar() {
  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  return (
    <nav className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-2 p-4 md:px-8 md:py-4">
      <NavbarMobileMenu user={user} />
      <NavbarLogo />
      <NavbarMenu />
      <SearchButton />
      <AuthButton user={user} />
    </nav>
  );
}

function NavbarLogo() {
  return (
    <Link href="/" className="flex h-10 cursor-pointer items-center gap-2 sm:mr-auto md:mr-0">
      <Image
        src="/images/logo_shape.webp"
        height={40}
        width={40}
        alt="OneSport Logo"
        className="h-9 w-9 rounded-full"
      />

      <h1 className="text-xl font-bold text-primary">OneSport</h1>
    </Link>
  );
}

function NavbarMenu() {
  const pathName = usePathname();

  return (
    <ul className="hidden gap-2 lg:flex">
      {navbarRoutes.map(route => (
        <li
          key={route.name}
          className={`${pathName === route.path ? 'font-bold text-primary' : 'text-slate-500'} whitespace-nowrap hover:text-primary md:h-10 md:px-4 md:py-2`}
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}

function SearchButton() {
  return (
    <Button asChild size="icon" variant="ghost" className="h-10 w-10 md:hidden">
      <Link href="/venues">
        <RiSearchLine className="h-6 w-6" />
      </Link>
    </Button>
  );
}

interface AuthButtonProps {
  user: any;
}

function AuthButton({user}: AuthButtonProps) {
  const {setCurrentStep, setShowAuth} = useAuthStore(state => state);

  const handleCurrentStep = (currentStep: string) => {
    setShowAuth(true);
    setCurrentStep(currentStep);
  };

  return (
    <div className="hidden items-center gap-2 md:flex">
      {user ? (
        <AuthProfile user={user} />
      ) : (
        <>
          <Button
            variant="outline"
            size="lg"
            className="px-4"
            onClick={() => handleCurrentStep('login')}
          >
            Masuk
          </Button>
          <Button size="lg" className="px-4" onClick={() => handleCurrentStep('register')}>
            Daftar
          </Button>
        </>
      )}
    </div>
  );
}
