import React from 'react';
import SearchbarInput from './SearchbarInput';
import SearchbarCalendar from './SearchbarCalendar';
import {Button} from './ui/button';
import {RiSearchLine} from 'react-icons/ri';
import {Separator} from './ui/separator';

export default function Searchbar() {
  return (
    <div className="flex w-full max-w-screen-md items-center gap-4 rounded-full border px-4">
      <div className="flex w-full">
        <SearchbarInput />
        <Separator orientation="vertical" />
        <SearchbarCalendar />
      </div>

      <Button size="icon" className="rounded-full">
        <RiSearchLine />
      </Button>
    </div>
  );
}
