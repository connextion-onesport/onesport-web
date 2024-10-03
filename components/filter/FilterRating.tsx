import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {useState, useEffect} from 'react';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Button} from '../ui/button';
import {LuFilter} from 'react-icons/lu';
import {PiStarFill} from 'react-icons/pi';

export default function FilterRating({
  onRating,
  rating,
}: {
  onRating: (value: number) => void;
  rating: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(rating || null);

  const handleApplyFilter = () => {
    if (selectedRating !== null) {
      onRating(selectedRating);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Rating" asChild>
        <Button variant="outline" className="rounded-full text-muted-foreground">
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
        <FilterRatingFooter onApply={handleApplyFilter} />
      </DialogContent>
    </Dialog>
  );
}

export function FilterRatingContent({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
}) {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    // Update activeButton when selectedRating changes
    if (selectedRating === 4.0) {
      setActiveButton(1);
    } else if (selectedRating === 4.5) {
      setActiveButton(2);
    } else {
      setActiveButton(null);
    }
  }, [selectedRating]);

  const handleClick = (buttonNumber: number, rating: number) => {
    if (activeButton === buttonNumber) {
      // Deactivate if clicked again
      setActiveButton(null);
      setSelectedRating(null);
    } else {
      setActiveButton(buttonNumber);
      setSelectedRating(rating);
    }
  };

  return (
    <div className="grid grid-cols-2 p-6">
      <Button
        variant={activeButton === 1 ? 'default' : 'outline'}
        className={`rounded-l-full border-r-white font-normal ${
          activeButton === 1 ? 'text-white' : 'text-muted-foreground'
        }`}
        onClick={() => handleClick(1, 4.0)}
      >
        <PiStarFill className="mr-1 h-4 w-4" />
        4.0 +
      </Button>
      <Button
        variant={activeButton === 2 ? 'default' : 'outline'}
        className={`rounded-r-full font-normal ${
          activeButton === 2 ? 'text-white' : 'text-muted-foreground'
        }`}
        onClick={() => handleClick(2, 4.5)}
      >
        <PiStarFill className="mr-1 h-4 w-4" />
        4.5 +
      </Button>
    </div>
  );
}

function FilterRatingFooter({onApply}: {onApply: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="w-full rounded-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="w-full rounded-full" onClick={onApply}>
        Terapkan
      </Button>
    </div>
  );
}
