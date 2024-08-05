import Image from 'next/image';
import {AspectRatio} from './ui/aspect-ratio';
import {Button} from './ui/button';
import Link from 'next/link';
import {heroCategories} from '@/lib/constants';
import HeroCategory from './HeroCategory';
import Searchbar from './Searchbar';

export default function Hero() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4 md:p-8">
      {/* <AspectRatio ratio={16 / 9}>
        <Image src="/images/img_bicycle.webp" fill alt="Hero Image" className="object-cover" />
      </AspectRatio> */}
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-center text-4xl font-bold">
          OneSport,
          <br />
          the way you get healthy
        </h2>

        <p className="text-lg">Find your fit places</p>
      </div>
      <Searchbar />
      <HeroCategory />
    </div>
  );
}
