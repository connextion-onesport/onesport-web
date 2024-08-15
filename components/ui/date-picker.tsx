'use client';

import * as React from 'react';
import {format} from 'date-fns';

import {cn} from '@/libs/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {CalendarIcon} from '@radix-ui/react-icons';
interface DatePickerProps {
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({onDateChange}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'flex h-full w-full items-center justify-start rounded-none rounded-r-full border-none bg-background px-4 text-left font-normal text-muted-foreground shadow-none placeholder:text-sm hover:bg-accent hover:text-accent-foreground',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          // onSelect={setDate}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
