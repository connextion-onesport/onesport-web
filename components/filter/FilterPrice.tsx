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

import {usePathname, useSearchParams, useRouter} from 'next/navigation';

export default function FilterPrice() {
  const [minimumPrice, setMinimumPrice] = useState<number | undefined>(undefined);
  const [maximumPrice, setMaximumPrice] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

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

    replace(`${pathName}?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Price" asChild>
        <Button
          variant="outline"
          className="h-8 rounded-full px-3 text-xs text-muted-foreground md:h-9 md:px-4 md:py-2 md:text-sm"
        >
          <span className="mr-1 flex aspect-square h-3 w-3 shrink-0 grow-0 items-center justify-center md:mr-2 md:h-4 md:w-4">
            <p className="text-xs font-bold text-muted-foreground md:text-sm">Rp</p>
          </span>
          Harga
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-lg flex-col gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Harga</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Pilih harga yang ingin Anda terapkan pada daftar produk.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <FilterPriceContent
          minimumPrice={minimumPrice}
          setMinimumPrice={setMinimumPrice}
          maximumPrice={maximumPrice}
          setMaximumPrice={setMaximumPrice}
        />
        <FilterPriceFooter handleFilter={handleFilter} />
      </DialogContent>
    </Dialog>
  );
}

interface FilterPriceContentProps {
  minimumPrice: number | undefined;
  setMinimumPrice: (price: number | undefined) => void;
  maximumPrice: number | undefined;
  setMaximumPrice: (price: number | undefined) => void;
}

export function FilterPriceContent({
  minimumPrice,
  setMinimumPrice,
  maximumPrice,
  setMaximumPrice,
}: FilterPriceContentProps) {
  const [activePriceRange, setActivePriceRange] = useState<string | undefined>(undefined);

  const setPriceMinimum300 = () => {
    setMinimumPrice(300000);
    setMaximumPrice(undefined);
    setActivePriceRange('above300');
  };

  const setPriceRange200to300 = () => {
    setMinimumPrice(200000);
    setMaximumPrice(300000);
    setActivePriceRange('200to300');
  };

  const setPriceRange100to200 = () => {
    setMinimumPrice(100000);
    setMaximumPrice(200000);
    setActivePriceRange('100to200');
  };

  const setPriceMaximum100 = () => {
    setMinimumPrice(undefined);
    setMaximumPrice(100000);
    setActivePriceRange('below100');
  };

  const handleMinimumPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    setMinimumPrice(value);
    setActivePriceRange(undefined);
  };

  const handleMaximumPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    setMaximumPrice(value);
    setActivePriceRange(undefined);
  };

  const preventMinus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  return (
    <div className="mb-auto grid grid-cols-2 gap-4 p-6">
      <div className="flex rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <div className="flex h-10 items-center justify-center bg-secondary p-3">
          <p className="text-sm font-bold text-muted-foreground">Rp</p>
        </div>
        <Input
          placeholder="Harga Minimum"
          type="number"
          className="h-10 rounded-l-none border-none shadow-none"
          onChange={handleMinimumPriceChange}
          onKeyDown={preventMinus}
          value={minimumPrice !== undefined ? minimumPrice : ''}
          min="0"
        />
      </div>
      <div className="flex rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <div className="flex h-10 items-center justify-center bg-secondary p-3">
          <p className="text-sm font-bold text-muted-foreground">Rp</p>
        </div>
        <Input
          placeholder="Harga Maksimum"
          type="number"
          className="h-10 rounded-l-none border-none shadow-none"
          onChange={handleMaximumPriceChange}
          onKeyDown={preventMinus}
          value={maximumPrice !== undefined ? maximumPrice : ''}
        />
      </div>

      <Button
        variant={activePriceRange === 'below100' ? 'default' : 'outline'}
        size="lg"
        className="font-normal"
        onClick={setPriceMaximum100}
      >
        Dibawah 100 rb
      </Button>
      <Button
        variant={activePriceRange === '100to200' ? 'default' : 'outline'}
        size="lg"
        className="font-normal"
        onClick={setPriceRange100to200}
      >
        100 Sampai 200 rb
      </Button>
      <Button
        variant={activePriceRange === '200to300' ? 'default' : 'outline'}
        size="lg"
        className="font-normal"
        onClick={setPriceRange200to300}
      >
        200 Sampai 300 rb
      </Button>
      <Button
        variant={activePriceRange === 'above300' ? 'default' : 'outline'}
        size="lg"
        className="font-normal"
        onClick={setPriceMinimum300}
      >
        Diatas 300 rb
      </Button>
    </div>
  );
}

function FilterPriceFooter({handleFilter}: {handleFilter: () => void}) {
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
