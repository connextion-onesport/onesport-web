import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/ui/button';

import {footerColumnLinks, footerSocialMedia} from '@/libs/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-10 text-white md:gap-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row">
        <FooterLogo />
        <FooterColumns />
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white py-8 md:flex-row">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="md:hidden">
            <Image
              src="/images/logo_text.webp"
              width={697}
              height={128}
              alt="OneSport Logo"
              className="h-6 w-fit"
            />
          </Link>
          <p className="text-sm">© {year} OneSport. All rights reserved.</p>
        </div>

        <FooterSocialMedia />
      </div>
    </div>
  );
}

const FooterLogo = () => (
  <div className="min-w-xs hidden flex-col gap-4 md:flex">
    <Image
      src="/images/logo_shape.webp"
      width={128}
      height={128}
      alt="OneSport Logo"
      className="h-10 w-fit rounded-full"
    />
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">OneSport</h2>
      <p className="text-lg">
        Find the right sport field venue, <br /> right away.
      </p>
    </div>
  </div>
);

const FooterColumns = () => (
  <div className="grid w-full grid-cols-2 gap-8 md:max-w-2xl md:grid-cols-4">
    {footerColumnLinks.map(column => (
      <div key={column.title} className="flex flex-col gap-4">
        <span className="text-lg font-bold">{column.title}</span>
        <ul className="flex flex-col gap-2">
          {column.links.map(link => (
            <li key={link.name} className="text-sm hover:underline">
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const FooterSocialMedia = () => (
  <div className="flex items-center gap-2">
    {footerSocialMedia.map(social => (
      <Button
        key={social.name}
        asChild
        size="icon"
        variant="ghost"
        className="h-10 w-10 rounded-full"
        aria-label={social.name}
      >
        <Link href={social.link} target="_blank" rel="noopener noreferrer">
          <social.icon size="24" />
        </Link>
      </Button>
    ))}
  </div>
);
