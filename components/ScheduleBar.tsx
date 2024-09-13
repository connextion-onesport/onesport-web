import React, {useEffect} from 'react';
import {Button} from './ui/button';
import DatePicker from './ui/date-picker';
import {addDays, format, isSameDay, startOfWeek} from 'date-fns';
import {cn} from '@/libs/utils';

export default function ScheduleBar({className}: {className: string}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [weekDates, setWeekDates] = React.useState<Date[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const startDate = startOfWeek(selectedDate, {weekStartsOn: 0}); // 0 represents Sunday
      const newWeekDates = Array.from({length: 7}, (_, i) => addDays(startDate, i));
      setWeekDates(newWeekDates);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date || new Date());
  };

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return (
    <div className={`${className} flex items-center justify-between gap-4 space-y-4`}>
      <div className="flex w-full justify-evenly space-x-2 overflow-x-auto pb-2 items-center">
        {weekDates.map((date, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              'flex flex-col self-center rounded-lg p-3 py-6 text-xs sm:text-sm',
              selectedDate && isSameDay(date, selectedDate)
                ? 'hover:bg-primary-dark ring-primary-dark bg-primary text-primary-foreground ring-2 hover:text-primary-foreground'
                : isSameDay(date, new Date())
                  ? 'hover:bg-accent-dark bg-accent text-accent-foreground hover:text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            onClick={() => setSelectedDate(date)}
          >
            {dayNames[date.getDay()]}
            <span>{format(date, 'd MMM yyyy')}</span>
          </Button>
        ))}
      </div>
      <DatePicker selectedDate={selectedDate} onSelect={handleDateSelect} />
    </div>
  );
}
