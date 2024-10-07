'use client';

import {Input} from '@/components/ui/input';
import {RiMapPinLine, RiSearchLine} from 'react-icons/ri';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
import {Button} from './ui/button';
import React from 'react';

export default function Searchbar() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {push, replace} = useRouter();

  const handleSearchVenues = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    replace(`/venues?${params.toString()}`);
  }, 300);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value;
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (pathName === '/') {
      push(`/venues?${params.toString()}`);
    }
  };

  return (
    <form
      className="flex h-12 w-full items-center gap-2 rounded-full border bg-background pl-4 pr-2"
      onSubmit={handleFormSubmit}
    >
      <div className="flex h-full w-full items-center">
        <RiMapPinLine className="h-6 w-6 text-primary" />
        <Input
          name="search"
          type="search"
          placeholder="Cari Lokasi atau Lapangan"
          className="rounded-none border-none text-base shadow-none focus-visible:ring-0"
          defaultValue={searchParams.get('search')?.toString()}
          onChange={pathName === '/venues' ? e => handleSearchVenues(e.target.value) : undefined}
        />
      </div>

      <Button type="submit" size="icon" className="aspect-square shrink-0 grow-0 rounded-full">
        <RiSearchLine className="h-6 w-6 text-white" />
      </Button>
    </form>
  );
}
