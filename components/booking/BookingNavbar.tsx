import Image from 'next/image';
import Link from 'next/link';
import BookingStepper from './BookingStepper';

export default function BookingNavbar() {
  return (
    <section className="flex w-full bg-background">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row justify-between gap-2 bg-background p-4 md:px-8 md:py-4">
        <Logo />

        <BookingStepper />
      </div>
    </section>
  );
}

function Logo() {
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
