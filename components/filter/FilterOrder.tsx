import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

import {useState} from 'react';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Button} from '../ui/button';
import {orderFilter} from '@/libs/constants';
import {PiSortAscending} from 'react-icons/pi';
import {usePathname, useSearchParams, useRouter} from 'next/navigation';

export default function FilterOrder() {
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>(undefined);
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

    replace(`${pathName}?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Order" asChild>
        <Button
          variant="outline"
          className="rounded-full text-muted-foreground h-9 px-4 py-2 text-sm"
        >
          <PiSortAscending className="mr-2 h-4 w-4" />
          Urutkan
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-lg flex-col gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Urutkan</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Pilih urutan yang ingin Anda terapkan pada daftar produk.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterOrderContent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        <FilterOrderFooter handleFilter={handleFilter} />
      </DialogContent>
    </Dialog>
  );
}

export function FilterOrderContent({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: string | undefined;
  setSelectedOrder: (order: string | undefined) => void;
}) {
  return (
    <RadioGroup
      value={selectedOrder}
      onValueChange={setSelectedOrder}
      className="mb-auto grid grid-cols-2 gap-x-4 gap-y-6 p-6"
    >
      {orderFilter.map(({id, htmlFor, value, text}) => (
        <div key={id} className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={htmlFor}>{text}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function FilterOrderFooter({handleFilter}: {handleFilter: () => void}) {
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
