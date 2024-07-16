import Link from "next/link";
import { Button } from "./ui/button";
import LogoSvg from "./LogoSvg";
import { navbarLinks } from "@/lib/constants";
import { RiMenuFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-4 p-4 sm:px-8 sm:py-4">
      <div className="flex items-center gap-2 text-nowrap">
        <LogoSvg />
        <h1 className="text-xl font-bold text-primary">OneSport</h1>
      </div>

      <ul className="hidden gap-2 lg:flex">
        {navbarLinks.map((link) => (
          <li
            key={link.name}
            className="text-slate-500 hover:text-primary md:h-10 md:rounded-md md:px-4 md:py-2"
          >
            <Link href={link.url}>{link.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="outline"
            className="h-9 px-4 py-2 lg:h-10 lg:rounded-md lg:px-8"
          >
            Login
          </Button>
          <Button className="h-9 px-4 py-2 lg:h-10 lg:rounded-md lg:px-8">
            Register
          </Button>
        </div>

        <Button size="icon" variant="ghost" className="flex lg:hidden">
          <RiMenuFill size={24} />
        </Button>
      </div>
    </nav>
  );
}
