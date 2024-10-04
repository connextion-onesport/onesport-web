'use client';

import {Dispatch, useState} from 'react';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

import {RiMapPinLine, RiSearchLine} from 'react-icons/ri';

export default function Searchbar() {
  const [searchField, setSearchField] = useState<string>('');

  const handleSearch = () => {
    console.log(searchField);
  };

  return (
    <form
      className="flex h-12 w-full items-center gap-2 rounded-full border bg-background pl-4 pr-2"
      onSubmit={e => e.preventDefault()}
    >
      <SearchbarInput searchField={searchField} setSearchField={setSearchField} />

      <Button
        size="icon"
        aria-label="Searchbar Button"
        onClick={handleSearch}
        className="shrink-0 grow-0 rounded-full"
      >
        <RiSearchLine className="h-6 w-6 text-white" />
      </Button>
    </form>
  );
}

interface SearchbarInputProps {
  searchField: string;
  setSearchField: Dispatch<string>;
}

function SearchbarInput({searchField, setSearchField}: SearchbarInputProps) {
  return (
    <div className="flex h-full w-full items-center">
      <RiMapPinLine className="h-6 w-6 text-primary" />

      <Input
        type="search"
        placeholder="Cari Lapangan"
        value={searchField}
        onChange={e => {
          setSearchField(e.target.value);
        }}
        className="rounded-none border-none text-base shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
