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
import {Input} from '../ui/input';
import {LuFilter} from 'react-icons/lu';
import {PiCurrencyDollar} from 'react-icons/pi';

export default function FilterPrice() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Price" asChild>
        <Button variant="outline" className="rounded-full text-muted-foreground">
          <span className="mr-2 flex aspect-square h-4 w-4 shrink-0 grow-0 items-center justify-center">
            <p className="text-sm font-bold text-muted-foreground">Rp</p>
          </span>
          Harga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Harga</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Pilih harga yang ingin Anda terapkan pada daftar produk.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterPriceContent />
        <FilterPriceFooter />
      </DialogContent>
    </Dialog>
  );
}

export function FilterPriceContent() {
  const [priceRange, setPriceRange] = useState<{
    minimum: number | undefined;
    maximum: number | undefined;
  }>({
    minimum: undefined,
    maximum: undefined,
  });

  //the function to set minimum price to 250
  const setPriceMinimum250 = () => {
    setPriceRange({minimum: 250000, maximum: 0});
  };

  const setPriceMaximum150 = () => {
    setPriceRange({minimum: 0, maximum: 150000});
  };

  const setPriceRange150to250 = () => {
    setPriceRange({minimum: 150000, maximum: 250000});
  };

  // the function to handle price change in minimum input elements
  const handleMinimumPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    setPriceRange({...priceRange, minimum: value});
  };

  // the function to handle price change in maximum input elements
  const handleMaximumPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    setPriceRange({...priceRange, maximum: value});
  };

  // function to prevent users input minus value
  const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 p-6">
      <div className="flex rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <div className="h-full self-center bg-muted px-3 py-1 text-center text-base text-muted-foreground">
          Rp
        </div>
        <Input
          placeholder="Minimum Price"
          type="number"
          className="border-none shadow-none"
          onChange={handleMinimumPriceChange}
          onKeyDown={preventMinus}
          value={priceRange.minimum !== undefined ? priceRange.minimum : ''}
          min="0"
        ></Input>
      </div>
      <div className="flex rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <div className="h-full self-center bg-muted px-3 py-1 text-center text-base text-muted-foreground">
          Rp
        </div>
        <Input
          placeholder="Maximum Price"
          type="number"
          className="border-none shadow-none"
          onChange={handleMaximumPriceChange}
          onKeyDown={preventMinus}
          value={priceRange.maximum !== undefined ? priceRange.maximum : ''}
        ></Input>
      </div>
      <Button
        variant="outline"
        className="rounded-full font-normal text-muted-foreground"
        onClick={setPriceMaximum150}
      >
        Dibawah 150 rb
      </Button>
      <Button
        variant="outline"
        className="rounded-full font-normal text-muted-foreground"
        onClick={setPriceRange150to250}
      >
        150 Sampai 250 rb
      </Button>
      <Button
        variant="outline"
        className="rounded-full font-normal text-muted-foreground"
        onClick={setPriceMinimum250}
      >
        Diatas 250 rb
      </Button>
    </div>
  );
}

function FilterPriceFooter() {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="w-full rounded-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="w-full rounded-full">
        Terapkan
      </Button>
    </div>
  );
}
