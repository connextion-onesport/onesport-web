'use client';

import {useVenueStore} from '@/providers/zustand-provider';
import {Button} from '../ui/button';
import {formatNumber} from '@/libs/utils';

interface VenueMobileButtonProps {
  data: any;
}

export default function VenueMobileButton({data}: VenueMobileButtonProps) {
  const {scrollToSection} = useVenueStore(state => state);

  const handleClick = () => {
    scrollToSection('booking-field');
  };

  return (
    <div className="fixed bottom-0 z-10 flex w-full flex-col gap-4 border-t bg-background p-4 md:hidden">
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">Harga dari</p>
        <p className="text-lg font-semibold">
          Rp{formatNumber(data?.minPrice)}
          <span className="text-sm font-semibold text-muted-foreground">/Jam</span>
        </p>
      </div>

      <Button onClick={handleClick}>Pilih Lapangan</Button>
    </div>
  );
}
