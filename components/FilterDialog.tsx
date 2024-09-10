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
import OrderByContent from './OrderByContent';
import CategoryContent from './CategoryContent';
import PriceContent from './PriceContent';
import {Button} from './ui/button';
import RatingContent from './RatingContent';

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
export default function FilterDialog({
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
      <div className="pr-3">
        <DialogTrigger
          aria-label="Open Schedule Dialog"
          className="inline-flex items-center justify-center self-start whitespace-nowrap rounded-full border border-input bg-background p-2 px-3 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 w-4"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"></path>
          </svg>
          Filter
        </DialogTrigger>
      </div>
      <DialogContent className="m-0 max-h-screen max-w-max overflow-y-scroll p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
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
    <>
      <div className="flex flex-row justify-between border-b p-4">
        <p className="w-full items-center self-center text-center text-base font-semibold">
          Filter
        </p>
      </div>
      <div className="border-b">
        <OrderByContent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      </div>
      <div className="border-b">
        <PriceContent />
      </div>
      <div className="border-b">
        <RatingContent selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
      </div>
      <CategoryContent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}

function FilterFooter({onApply}: {onApply: () => void}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-5">
      <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        Close
      </DialogClose>
      <Button variant="default" className="rounded-full" onClick={onApply}>
        Apply Filter
      </Button>
    </div>
  );
}
