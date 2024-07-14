import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between p-4">
      <div className="flex items-center">
        <p className="font-bold">OneSport</p>
      </div>

      <ul className="flex flex-row gap-4">
        <li className="px-4 py-2">
          <Link href="/">Home</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/booking">Booking</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/about-us">About Us</Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/create-business">Register Business</Link>
        </li>
      </ul>

      <div className="flex flex-row gap-4">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </nav>
  );
}
