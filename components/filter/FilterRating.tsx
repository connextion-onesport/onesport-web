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
import {PiStarFill} from 'react-icons/pi';

import {usePathname, useSearchParams, useRouter} from 'next/navigation';

export default function FilterRating() {
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

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
      <DialogTrigger aria-label="Open Filter Rating" asChild>
        <Button
          variant="outline"
          className="rounded-full text-muted-foreground h-9 px-4 py-2 text-sm"
        >
          <PiStarFill className="mr-2 h-4 w-4" />
          Rating
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Rating</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Pilih rating yang ingin Anda terapkan pada daftar produk.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterRatingContent
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
        <FilterRatingFooter handleFilter={handleFilter} />
      </DialogContent>
    </Dialog>
  );
}

interface FilterRatingContentProps {
  selectedRating: number | undefined;
  setSelectedRating: (rating: number | undefined) => void;
}

export function FilterRatingContent({selectedRating, setSelectedRating}: FilterRatingContentProps) {
  const handleRating = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <div className="grid grid-cols-2 p-6">
      <Button
        variant={selectedRating === 4 ? 'default' : 'outline'}
        size="lg"
        className="rounded-l-full"
        onClick={() => handleRating(4)}
      >
        <PiStarFill className="mr-1 h-4 w-4" />
        4.0 +
      </Button>
      <Button
        variant={selectedRating === 4.5 ? 'default' : 'outline'}
        size="lg"
        className="rounded-r-full"
        onClick={() => handleRating(4.5)}
      >
        <PiStarFill className="mr-1 h-4 w-4" />
        4.5 +
      </Button>
    </div>
  );
}

function FilterRatingFooter({handleFilter}: {handleFilter: () => void}) {
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
