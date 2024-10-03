'use client';

import * as React from 'react';
import {CalendarIcon} from '@radix-ui/react-icons';
import {addDays, format, isAfter, isBefore, startOfToday} from 'date-fns';

import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

type DatePickerProps = {
  selectedDate: any;
  onSelect: (date: Date | undefined) => void;
};

export function DatePicker({selectedDate, onSelect}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger className="flex aspect-square shrink-0 grow-0 items-center justify-center rounded-md px-3 text-primary hover:bg-accent hover:text-accent-foreground">
        <CalendarIcon className="h-8 w-8" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={date => date && onSelect(date)}
          disabled={date =>
            isBefore(date, startOfToday()) || isAfter(date, addDays(startOfToday(), 30))
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
