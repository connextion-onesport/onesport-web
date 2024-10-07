import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {useState} from 'react';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Button} from '../ui/button';
import {categoryFilter} from '@/libs/constants';
import {PiCirclesThree} from 'react-icons/pi';
import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';

export default function FilterCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    replace(`${pathName}?${params.toString()}`);

    setSelectedCategory(undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Category" asChild>
        <Button
          variant="outline"
          className="h-8 rounded-full px-3 text-xs text-muted-foreground md:h-9 md:px-4 md:py-2 md:text-sm"
        >
          <PiCirclesThree className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
          Kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-lg flex-col gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Kategori</DialogTitle>
          <VisuallyHidden>
            <DialogDescription></DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterCategoryContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FilterCategoryFooter handleFilter={handleFilter} />
      </DialogContent>
    </Dialog>
  );
}

export function FilterCategoryContent({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string) => void;
}) {
  return (
    <div className="mb-auto grid grid-cols-2 gap-4 p-6">
      {categoryFilter.map((category, index) => (
        <Button
          key={index}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="lg"
          className="w-full justify-start pl-4"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

function FilterCategoryFooter({handleFilter}: {handleFilter: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" size="lg" className="w-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" size="lg" className="w-full" onClick={handleFilter}>
        Terapkan
      </Button>
    </div>
  );
}
