import {Button} from './ui/button';
import {DatePickerWithRange} from './ui/date-picker-range';

export default function ScheduleBar({className}: {className: string}) {
  return (
    <div className={`${className}`}>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Senin
        <span>15 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Selasa
        <span>16 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Rabu
        <span>17 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Kamis
        <span>18 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Jumat
        <span>19 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Sabtu
        <span>20 Jul 2024</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-col self-center rounded-lg p-3 py-6 text-xs text-muted-foreground hover:bg-primary hover:text-white sm:text-sm"
      >
        Minggu
        <span>21 Jul 2024</span>
      </Button>
      <DatePickerWithRange className="justify-center self-center bg-none" />
    </div>
  );
}
