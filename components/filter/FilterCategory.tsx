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
import {LuFilter} from 'react-icons/lu';
import {PiCirclesThree} from 'react-icons/pi';

interface CategoryDialogProps {
  onCategory: (value: string) => void;
  category: string;
}

export default function FilterCategory({onCategory, category}: CategoryDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);

  const handleApplyFilter = () => {
    if (selectedCategory) {
      onCategory(selectedCategory);
      setIsOpen(false); // Menutup dialog setelah filter diterapkan
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Filter Category" asChild>
        <Button variant="outline" className="rounded-full text-muted-foreground">
          <PiCirclesThree className="mr-2 h-4 w-4" />
          Kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg gap-0 p-0">
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
        <FilterCategoryFooter onCategory={handleApplyFilter} />
      </DialogContent>
    </Dialog>
  );
}

interface CategoryContentProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
}

export function FilterCategoryContent({
  selectedCategory,
  setSelectedCategory,
}: CategoryContentProps) {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {categoryFilter.map(category => (
        <div
          className={`flex rounded-full border p-2 ${selectCategory === category.value ? 'bg-primary text-white' : ''}`}
          key={category.id}
        >
          <input
            type="radio"
            name="category"
            id={category.id}
            value={category.value}
            className="my-auto h-4 w-4 self-center"
            onChange={handleCheck}
          />
          <label htmlFor={category.htmlFor} className="px-3">
            {category.text}
          </label>
          <br />
        </div>
      ))}
    </div>
  );
}

function FilterCategoryFooter({onCategory}: {onCategory: () => void}) {
  return (
    <div className="flex items-center gap-4 border-t p-6">
      <DialogClose asChild>
        <Button variant="outline" className="w-full rounded-full">
          Kembali
        </Button>
      </DialogClose>
      <Button variant="default" className="w-full rounded-full" onClick={onCategory}>
        Terapkan
      </Button>
    </div>
  );
}
