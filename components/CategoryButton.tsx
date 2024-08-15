'use client';

import {useState} from 'react';
import {Button} from './ui/button';
import Modal from './Modal';
import CategoryModal from './CategoryModal';
import Image from 'next/image';
export default function CategoryButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outline"
        className="flex gap-2 rounded-full p-2 px-3 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Image
          src="/images/icons/filter.svg"
          width={16}
          height={16}
          alt="Category Filter Icon"
          className="text-muted-foreground"
        />
        Category
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} margin="my-32">
        <CategoryModal />
      </Modal>
    </>
  );
}
