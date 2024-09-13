'use client';

import React, {useEffect} from 'react';
import {addDays, format, startOfWeek} from 'date-fns';
import {CalendarIcon} from '@radix-ui/react-icons';

import {cn} from '@/libs/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

type DatePickerProps = {
  selectedDate: any;
  onSelect: (date: Date | undefined) => void;
};

export default function DatePicker({selectedDate, onSelect}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'mt-0 flex h-full w-full max-w-fit items-center justify-center self-center rounded-none rounded-r-full border-none bg-background bg-none px-4 pt-0 text-left font-normal text-muted-foreground shadow-none placeholder:text-sm hover:bg-accent hover:text-accent-foreground',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          {selectedDate && format(selectedDate, 'PPP')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={date => date && onSelect(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
