'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Button} from './ui/button';
import {heroCategories} from '@/libs/constants';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Searchbar from './Searchbar';

export default function Hero() {
  const router = useRouter();
  const [searchField, setSearchField] = useState<string>('');

  const handleSearch = (newSearchField: string) => {
    setSearchField(newSearchField);
    router.push(`/fields?search=${newSearchField}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex w-full items-center justify-center">
        <HeroImage />
        <HeroBackground />

        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-8 p-4 md:p-8">
          <HeroText />
          <div className="w-full max-w-2xl">
            <Searchbar onSearch={handleSearch} />
          </div>
          <HeroCategoryDesktop />
        </div>
      </div>

      <HeroCategoryMobile />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="hidden md:flex">
      <div className="aspect-video min-h-[672px] w-full">
        <Image
          src="/images/img_bicycle.webp"
          alt="Person riding a bicycle"
          className="object-cover"
          fill
          priority
        />
      </div>

      <span className="absolute inset-0 bg-slate-950 opacity-40" />
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="flex min-h-[320px] w-full bg-gradient-to-b from-blue-900 to-blue-400 md:hidden" />
  );
}

function HeroText() {
  return (
    <div className="flex flex-col gap-4 text-center text-white">
      <h2 className="text-4xl font-medium leading-tight md:hidden md:text-5xl">
        Find the right
        <br />
        <span className="relative mr-1 whitespace-nowrap">
          <span className="absolute -bottom-1 -left-2 -right-2 -top-1 -rotate-1 bg-background md:-bottom-0 md:-left-3 md:-right-3 md:-top-0" />
          <span className="relative font-bebas font-bold text-blue-500">sport field</span>
        </span>{' '}
        venue,
        <br />
        right away
      </h2>
      <h2 className="hidden text-5xl font-medium leading-tight md:block">
        Find the right
        <span className="relative ml-6 whitespace-nowrap">
          <span className="absolute -bottom-1 -left-2 -right-2 -top-1 -rotate-1 bg-primary md:-bottom-0 md:-left-3 md:-right-3 md:-top-0" />
          <span className="relative font-bebas font-bold">sport field</span>
        </span>
        <br />
        venue, right away
      </h2>
    </div>
  );
}

function HeroCategoryDesktop() {
  const firstLineCategories = heroCategories.filter(category =>
    ['Basket', 'Pingpong', 'Softball', 'Track'].includes(category.name)
  );

  const secondLineCategories = heroCategories.filter(category =>
    ['Soccer', 'Baseball', 'Volley'].includes(category.name)
  );

  return (
    <div className="hidden flex-col items-center justify-center gap-4 md:flex">
      <div className="flex items-center gap-4">
        {firstLineCategories.map(category => (
          <Link
            key={category.name}
            href="#"
            className="flex flex-col items-center justify-center gap-1"
          >
            <Button className="h-12 w-12 rounded-full bg-[#F3ECEC] p-0 hover:bg-[#E6E6EF] md:h-16 md:w-16">
              <span className="rounded-full border-4 border-[#E6E6EF] bg-background p-[1px]">
                <Image
                  src={category.image}
                  height={32}
                  width={32}
                  alt={category.name}
                  className="h-8 w-8 text-primary md:h-10 md:w-10"
                />
              </span>
            </Button>
            <span className="text-sm text-white md:text-base">{category.name}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {secondLineCategories.map(category => (
          <Link
            key={category.name}
            href="#"
            className="flex flex-col items-center justify-center gap-1"
          >
            <Button className="h-12 w-12 rounded-full bg-[#F3ECEC] p-0 hover:bg-[#E6E6EF] md:h-16 md:w-16">
              <span className="rounded-full border-4 border-[#E6E6EF] bg-background p-[1px]">
                <Image
                  src={category.image}
                  height={40}
                  width={40}
                  alt={category.name}
                  className="h-8 w-8 md:h-10 md:w-10"
                />
              </span>
            </Button>
            <span className="text-sm text-white md:text-base">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HeroCategoryMobile() {
  const categories = heroCategories.filter(category =>
    ['Basket', 'Pingpong', 'Track', 'Soccer', 'Baseball', 'Volley'].includes(category.name)
  );

  return (
    <div className="grid w-full grid-cols-3 items-center justify-center gap-x-4 gap-y-6 p-6 md:hidden">
      {categories.map(category => (
        <Link
          key={category.name}
          href="#"
          className="mx-auto flex h-full min-h-28 w-full max-w-[100px] flex-col items-center gap-3 bg-background sm:max-w-full sm:gap-4 sm:rounded-md sm:p-6 sm:shadow sm:hover:bg-accent"
        >
          <Button
            size="icon"
            className="flex aspect-square h-full w-full items-center justify-center rounded-xl bg-background p-0 shadow hover:bg-accent sm:aspect-auto sm:justify-start sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:hover:bg-transparent"
          >
            <Image
              src={category.image}
              height={48}
              width={48}
              alt={category.name}
              className="h-11 w-11 sm:h-7 sm:w-7"
            />
          </Button>
          <p className="w-full text-center text-sm font-medium sm:text-start sm:text-base">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
