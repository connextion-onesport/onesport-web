import Link from "next/link";
import { Button } from "./ui/button";
import { FiMenu } from "react-icons/fi";
import LogoSvg from "./LogoSvg";
import { navLinks } from "@/lib/nav-link";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between px-[6.25rem] py-[1.56rem] max-sm:px-8 max-sm:py-4 md:px-8 md:py-4">
      <div className="flex items-center gap-[0.625rem]">
        <div className="navbar-logo">
          <LogoSvg />
        </div>
        <p className="text-xl font-bold leading-[1.875rem] text-[#3B82F6]">
          OneSport
        </p>
      </div>

      <ul className="gap-4 font-medium leading-6 text-[#79747E] max-sm:hidden md:hidden lg:flex lg:flex-row">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="flex flex-wrap items-center px-4 py-2 hover:text-[#3B82F6]"
          >
            <Link href={link.url}>{link.name}</Link>
          </li>
        ))}
        {/* <li key="home" className="flex flex-wrap items-center px-4 py-2">
          <Link href="/">Home</Link>
        </li>
        <li key="booking" className="flex flex-wrap items-center px-4 py-2">
          <Link href="/booking">Booking</Link>
        </li>
        <li key="about-us" className="flex flex-wrap items-center px-4 py-2">
          <Link href="/about-us">About Us</Link>
        </li>
        <li
          key="create-business"
          className="flex flex-wrap items-center px-4 py-2"
        >
          <Link href="/create-business">Register Business</Link>
        </li> */}
      </ul>

      <div className="flex flex-row flex-wrap gap-4 max-sm:gap-1">
        <Button
          size="xl"
          className="max-sm: text-small aspect-[1.75/1] items-center gap-0.5 font-semibold max-sm:h-[2rem] max-sm:w-[3.5rem] max-sm:text-xs md:w-[5.7rem]"
          variant="outline"
        >
          Login
        </Button>
        <Button
          size="xl"
          className="aspect-[2.15/1] items-center font-semibold max-sm:h-[2rem] max-sm:w-[4.3rem] max-sm:text-xs md:w-[7rem]"
        >
          Register
        </Button>

        <div className="toggle-menu flex-wrap items-center md:flex lg:hidden">
          <FiMenu role="button" style={{ fontSize: "1.8rem" }} />
        </div>
      </div>
    </nav>
  );
}
