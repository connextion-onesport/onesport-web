import Image from 'next/image';
import Link from 'next/link';
import {Button} from './ui/button';
import {heroCategories} from '@/lib/constants';

export default function HeroCategory() {
  const firstLineCategories = heroCategories.filter(category =>
    ['Basket', 'Pingpong', 'Softball', 'Track'].includes(category.name)
  );

  const secondLineCategories = heroCategories.filter(category =>
    ['Soccer', 'Baseball', 'Volley'].includes(category.name)
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-4">
        {firstLineCategories.map(category => (
          <Link
            key={category.name}
            href="#"
            className="flex flex-col items-center justify-center gap-1"
          >
            <Button className="h-16 w-16 rounded-full p-0">
              <span className="rounded-full border-4 bg-background p-[1px]">
                <Image src={category.image} height={40} width={40} alt={category.name} />
              </span>
            </Button>
            <span className="">{category.name}</span>
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
            <Button className="h-16 w-16 rounded-full p-0">
              <span className="rounded-full border-4 bg-background p-[1px] hover:border-background">
                <Image src={category.image} height={40} width={40} alt={category.name} />
              </span>
            </Button>
            <span className="">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
