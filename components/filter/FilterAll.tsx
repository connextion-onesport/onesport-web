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
import {Separator} from '../ui/separator';
import {FilterOrderContent} from './FilterOrder';
import {FilterRatingContent} from './FilterRating';
import {FilterPriceContent} from './FilterPrice';
import {FilterCategoryContent} from './FilterCategory';

interface FilterDialogProps {
  onOrder: (value: string) => void;
  onRating: (value: number) => void;
  onCategory: (value: string) => void;
  order: string;
  rating: number;
  category: string;
}

interface FilterContentProps {
  selectedOrder: string | null;
  setSelectedOrder: (value: string) => void;
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
}
export default function FilterAll({
  onOrder,
  onRating,
  onCategory,
  order,
  rating,
  category,
}: FilterDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(order || null);
  const [selectedRating, setSelectedRating] = useState<number | null>(rating || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);

  const handleApplyFilter = () => {
    if (selectedRating !== null) {
      onRating(selectedRating);
      setIsOpen(false);
    }
    if (selectedOrder !== null) {
      onOrder(selectedOrder);
      setIsOpen(false);
    }
    if (selectedCategory !== null) {
      onCategory(selectedCategory);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Button" asChild>
        <Button variant="outline" className="rounded-full text-muted-foreground">
          <LuFilter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="h-3/4 max-w-lg gap-0 p-0">
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
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FilterFooter onApply={handleApplyFilter} />
      </DialogContent>
    </Dialog>
  );
}

function FilterContent({
  selectedOrder,
  setSelectedOrder,
  selectedRating,
  setSelectedRating,
  selectedCategory,
  setSelectedCategory,
}: FilterContentProps) {
  return (
    <ScrollArea>
      <FilterOrderContent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      <Separator />
      <FilterPriceContent />
      <Separator />
      <FilterRatingContent selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
      <Separator />
      <FilterCategoryContent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </ScrollArea>
  );
}

function FilterFooter({onApply}: {onApply: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="h-12 w-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="h-12 w-full" onClick={onApply}>
        Terapkan
      </Button>
    </div>
  );
}
