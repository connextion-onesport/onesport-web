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
import {orderByModal} from '@/libs/constants';
import { PiSortAscending } from 'react-icons/pi';

export default function FilterOrder({
  onOrder,
  order,
}: {
  onOrder: (value: string) => void;
  order: string;
}) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(order || null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleApplyFilter = () => {
    if (selectedOrder) {
      onOrder(selectedOrder);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Order" asChild>
        <Button variant="outline" className="rounded-full text-muted-foreground">
          <PiSortAscending className="mr-2 h-4 w-4" />
          Urutkan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Urutkan</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Pilih urutan yang ingin Anda terapkan pada daftar produk.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterOrderContent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        <FilterOrderFooter onApply={handleApplyFilter} />
      </DialogContent>
    </Dialog>
  );
}

export function FilterOrderContent({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: string | null;
  setSelectedOrder: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(event.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {orderByModal.map(({id, htmlFor, value, text}) => (
        <label htmlFor={htmlFor} key={id} className="relative flex gap-3">
          <input
            type="radio"
            name="orderBy"
            id={id}
            value={value}
            className="peer my-auto h-4 w-4 self-center border-gray-300"
            onChange={handleChange}
            checked={value === selectedOrder}
          />
          {text}
        </label>
      ))}
    </div>
  );
}

function FilterOrderFooter({onApply}: {onApply: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="rounded-full w-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="rounded-full w-full" onClick={onApply}>
        Terapkan
      </Button>
    </div>
  );
}
