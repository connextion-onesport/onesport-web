'use client';

import {useState} from 'react';
import {RiMenuFill} from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from './ui/button';
import {Separator} from './ui/separator';
import AuthDialog from './AuthDialog';
import {navbarRoutes} from '@/lib/constants';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-4 p-4 md:px-8 md:py-4">
      {pathName === '/payment' ? (
        <NavbarLogo />
      ) : (
        <>
          <NavbarLogo />
          <NavbarMenu />
          <NavbarAction />
        </>
      )}
    </nav>
  );
}

function NavbarLogo() {
  return (
    <div className="flex h-10 items-center gap-2 text-nowrap">
      <Image
        src="/images/logo.svg"
        height={32}
        width={32}
        alt="OneSport Logo"
        className="rounded-full"
      />
      <h1 className="text-xl font-bold text-primary">OneSport</h1>
    </div>
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
          {/* <Link href={route.path}>{route.name}</Link> */}
          <Link href="/">{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}

function NavbarAction() {
  return (
    <div className="flex items-center gap-4">
      <Button size="icon" variant="ghost" className="hidden md:flex">
        <Image src="/images/icons/cart.svg" height={24} width={24} alt="Cart Icon" />
      </Button>
      <Separator orientation="vertical" className="hidden md:flex" />
      <NavbarAuth />
      <Button size="icon" variant="ghost" className="flex lg:hidden">
        <RiMenuFill size={24} />
      </Button>
    </div>
  );
}

function NavbarAuth() {
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
        Login
      </Button>
      <Button size="lg" className="px-4" onClick={() => handleAuthVariant('email')}>
        Register
      </Button>
    </div>
  );
}
