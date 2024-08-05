import {RiMapPin2Line, RiPinDistanceLine} from 'react-icons/ri';
import {Input} from './ui/input';

export default function SearchbarInput() {
  return (
    <div className="flex w-full items-center gap-2">
      <RiMapPin2Line className="h-6 w-6" />
      <Input className="w-full border-none p-0 shadow-none" />
    </div>
  );
}
