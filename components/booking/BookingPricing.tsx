import { formatPrice } from '@/libs/utils';

import { Separator } from '../ui/separator';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { PiQuestion } from 'react-icons/pi';
import { Skeleton } from '../ui/skeleton';


interface BookingPricingProps {
  price: any;
  isLoading: boolean;
  isError: boolean;
}

export default function BookingPricing({price, isLoading, isError}: BookingPricingProps) {

  if (isLoading) {
    return <Skeleton className='bg-white h-96' />
  }

  if (isError) {
    <div>error</div>
  }

  return (
    <section className="flex flex-col rounded-xl bg-background">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 px-4 pb-0 pt-4 lg:gap-6 lg:px-6 lg:pt-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Detail Biaya</h2>
            <p className="text-sm text-muted-foreground">
              Berikut adalah biaya yang perlu kamu bayar.
            </p>
          </div>

          <Separator />
        </div>

        <div className="flex flex-col gap-4 px-4 py-6 lg:px-6">
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm text-muted-foreground">Biaya Sewa</p>
            <p className="whitespace-nowrap text-sm font-medium">{formatPrice(price?.rentPrice) || 0}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm text-muted-foreground">Diskon</p>
            <p className="whitespace-nowrap text-sm font-medium">0</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="whitespace-nowrap text-sm text-muted-foreground">Biaya Transaksi</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PiQuestion className="h-4 w-4 text-primary" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-64 bg-background p-4 text-foreground shadow-lg">
                    <p className="font-medium">
                      Biaya untuk fee payment gateway dan platform services lainnya.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="whitespace-nowrap text-sm font-medium">{formatPrice(price?.serviceFee) || 0}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm text-muted-foreground">PPN 11%</p>
            <p className="whitespace-nowrap text-sm font-medium">{formatPrice(price?.tax) || 0}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Separator />
            <div className="flex items-center justify-between">
              <p className="whitespace-nowrap text-sm font-semibold">Total Biaya</p>
              <p className="whitespace-nowrap text-sm font-bold">{formatPrice(price?.totalPrice) || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
