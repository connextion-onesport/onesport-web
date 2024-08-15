'use client';

import {Dispatch, useState} from 'react';
import {format} from 'date-fns';
import {DatePicker} from './ui/date-picker';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {RiMapPinLine, RiSearchLine} from 'react-icons/ri';
import {Separator} from './ui/separator';
import {SearchbarProps} from '@/types';

export default function Searchbar({onSearch}: SearchbarProps) {
  const [searchField, setSearchField] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    const dateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    onSearch(searchField, dateString);
  };

  return (
    <form
      className="relative flex h-12 w-full items-center rounded-full border bg-background"
      onSubmit={e => e.preventDefault()}
    >
      <SearchbarInput searchField={searchField} setSearchField={setSearchField} />
      <Separator orientation="vertical" className="h-full" />
      <SearchbarCalendar onDateChange={handleDateChange} />

      <Button
        size="icon"
        aria-label="Searchbar Button"
        onClick={handleSearch}
        className="absolute right-4 h-8 w-8 rounded-full"
      >
        <RiSearchLine className="h-5 w-5 text-white" />
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
    <div className="flex h-full w-1/2 items-center rounded-l-full px-4 hover:bg-accent hover:text-accent-foreground">
      <RiMapPinLine className="h-5 w-5 text-primary" />

      <Input
        type="search"
        placeholder="Venue, Area"
        value={searchField}
        onChange={e => {
          setSearchField(e.target.value);
        }}
        className="rounded-none border-none px-2 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}

interface SearchbarCalendarProps {
  onDateChange: (date: Date | undefined) => void;
}

function SearchbarCalendar({onDateChange}: SearchbarCalendarProps) {
  return (
    <div className="flex h-full w-1/2 rounded-r-full">
      <DatePicker onDateChange={onDateChange} />
    </div>
  );
}
