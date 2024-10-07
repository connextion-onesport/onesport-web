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
import {LuFilter} from 'react-icons/lu';
import {ScrollArea} from '../ui/scroll-area';
import {FilterOrderContent} from './FilterOrder';
import {FilterRatingContent} from './FilterRating';
import {FilterPriceContent} from './FilterPrice';
import {FilterCategoryContent} from './FilterCategory';

import {usePathname, useSearchParams, useRouter} from 'next/navigation';

export default function FilterAll() {
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [minimumPrice, setMinimumPrice] = useState<number | undefined>(undefined);
  const [maximumPrice, setMaximumPrice] = useState<number | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedOrder) {
      params.set('order', selectedOrder);
    } else {
      params.delete('order');
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    if (minimumPrice) {
      params.set('min_price', minimumPrice.toString());
    } else {
      params.delete('min_price');
    }

    if (maximumPrice) {
      params.set('max_price', maximumPrice.toString());
    } else {
      params.delete('max_price');
    }

    if (selectedRating) {
      params.set('rating', selectedRating.toString());
    } else {
      params.delete('rating');
    }

    replace(`${pathName}?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Button" asChild>
        <Button
          variant="outline"
          className="h-8 rounded-full px-3 text-xs text-muted-foreground md:h-9 md:px-4 md:py-2 md:text-sm"
        >
          <LuFilter className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="h-dvh max-w-lg gap-0 p-0 md:h-3/4">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Filter</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Use the filter to sort and find the products you are looking for.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterContent
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minimumPrice={minimumPrice}
          setMinimumPrice={setMinimumPrice}
          maximumPrice={maximumPrice}
          setMaximumPrice={setMaximumPrice}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        <FilterFooter handleFilter={handleFilter} />
      </DialogContent>
    </Dialog>
  );
}

interface FilterContentProps {
  selectedOrder: string | undefined;
  setSelectedOrder: (order: string | undefined) => void;
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string) => void;
  minimumPrice: number | undefined;
  setMinimumPrice: (price: number | undefined) => void;
  maximumPrice: number | undefined;
  setMaximumPrice: (price: number | undefined) => void;
  selectedRating: number | undefined;
  setSelectedRating: (rating: number | undefined) => void;
}

function FilterContent({
  selectedOrder,
  setSelectedOrder,
  selectedCategory,
  setSelectedCategory,
  minimumPrice,
  setMinimumPrice,
  maximumPrice,
  setMaximumPrice,
  selectedRating,
  setSelectedRating,
}: FilterContentProps) {
  return (
    <ScrollArea>
      <div className="mt-6 flex flex-col border-b">
        <p className="px-6 text-sm font-semibold">Urutkan</p>
        <FilterOrderContent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      </div>
      <div className="mt-6 flex flex-col border-b">
        <p className="px-6 text-sm font-semibold">Harga</p>
        <FilterPriceContent
          minimumPrice={minimumPrice}
          setMinimumPrice={setMinimumPrice}
          maximumPrice={maximumPrice}
          setMaximumPrice={setMaximumPrice}
        />
      </div>
      <div className="mt-6 flex flex-col border-b">
        <p className="px-6 text-sm font-semibold">Rating</p>
        <FilterRatingContent
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </div>
      <div className="mt-6 flex flex-col border-b">
        <p className="px-6 text-sm font-semibold">Kategori</p>
        <FilterCategoryContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </ScrollArea>
  );
}

function FilterFooter({handleFilter}: {handleFilter: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="h-12 w-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="h-12 w-full" onClick={handleFilter}>
        Terapkan
      </Button>
    </div>
  );
}
