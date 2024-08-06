import {Button} from './ui/button';
import {RiMenuFill} from 'react-icons/ri';
import Image from 'next/image';
import {Separator} from './ui/separator';
import NavbarMenu from './NavbarMenu';
import NavbarAuth from './NavbarAuth';

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-4 p-4 sm:px-8 sm:py-4">
      <NavbarLogo />
      <NavbarMenu />
      <NavbarAction />
    </nav>
  );
}

function NavbarLogo() {
  return (
    <div className="flex items-center gap-2 text-nowrap">
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
