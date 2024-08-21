'use client';

import * as React from 'react';
import {addDays, format} from 'date-fns';
// import {Calendar as CalendarIcon} from 'lucide-react';
import {RiCalendarEventFill} from 'react-icons/ri';
import {DateRange} from 'react-day-picker';

import {cn} from '@/libs/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export function DatePickerWithRange({className}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'link'}
            className={cn(
              'justify-start border-none bg-none text-left font-normal shadow-none',
              !date && 'text-muted-foreground'
            )}
          >
            <RiCalendarEventFill className="h-6 w-6 text-primary" />
            {/* {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )} */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
