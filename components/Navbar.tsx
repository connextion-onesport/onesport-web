'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from './ui/button';
import AuthDialog from './AuthDialog';
import {navbarRoutes} from '@/libs/constants';
import {RiSearchLine} from 'react-icons/ri';

export default function Navbar() {
  const pathName = usePathname();
  const isPaymentPage = pathName === '/payment';

  return (
    <nav className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-2 p-4 md:px-8 md:py-4">
      {isPaymentPage ? (
        <NavbarLogo />
      ) : (
        <>
          <HamburgerButton />
          <NavbarLogo />
          <NavbarMenu />
          <SearchButton />
          <AuthButton />
        </>
      )}
    </nav>
  );
}

function NavbarLogo() {
  return (
    <Link href="/" className="flex h-10 cursor-pointer items-center gap-2 sm:mr-auto md:mr-0">
      <Image
        src="/images/logo_shape.svg"
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
          className={`${pathName === route.path ? 'font-bold text-primary' : 'text-slate-500'} whitespace-nowrap hover:text-primary md:h-10 md:rounded-md md:px-4 md:py-2`}
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}

function HamburgerButton() {
  return (
    <Button size="icon" variant="ghost" className="h-10 w-10 md:hidden">
      <Image src="/images/icons/menu.svg" height={24} width={24} alt="Menu Icon" />
    </Button>
  );
}

function SearchButton() {
  return (
    <Button asChild size="icon" variant="ghost" className="h-10 w-10 md:hidden">
      <Link href="/fields">
        <RiSearchLine className="h-6 w-6" />
      </Link>
    </Button>
  );
}

function AuthButton() {
  const [authVariant, setAuthVariant] = useState<string>('login');
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);

  const handleAuthVariant = (variant: string) => {
    setAuthVariant(variant);
    setShowAuthDialog(true);
  };

  return (
    <div className="hidden items-center gap-2 md:flex">
      {showAuthDialog && (
        <AuthDialog
          authVariant={authVariant}
          showAuth={showAuthDialog}
          setShowAuth={setShowAuthDialog}
        />
      )}

      <Button
        variant="outline"
        size="lg"
        className="px-4"
        onClick={() => handleAuthVariant('login')}
      >
        Masuk
      </Button>
      <Button size="lg" className="px-4" onClick={() => handleAuthVariant('email')}>
        Daftar
      </Button>
    </div>
  );
}
