'use client';

import {format, id} from 'date-fns';

import {Separator} from '../ui/separator';
import {ScrollArea} from '@/components/ui/scroll-area';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '../ui/tooltip';

import {formatPrice, getReviewCount} from '@/libs/utils';

import {PiQuestion, PiStarFill} from 'react-icons/pi';

interface StatusItemsProps {
  data: any;
}

export default function StatusItems({data}: StatusItemsProps) {
  const venue = data.bookings[0].venue;
  const bookings = data.bookings;

  const price = bookings.map((booking: any) => booking.price);
  const rentPrice = price.reduce((acc: number, curr: number) => acc + curr, 0);
  const serviceFee = 10000;
  const tax = (rentPrice + serviceFee) * 0.11;
  const totalPrice = rentPrice + serviceFee + tax;

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <div className="flex max-h-[551px] flex-col rounded-xl border md:max-h-[559px]">
        <div className="flex flex-col gap-4 border-b p-4 md:p-6">
          <div className="flex flex-col">
            <h2 className="font-semibold">{venue.name}</h2>
            <div className="flex items-center">
              <span className="flex aspect-square h-5 w-5 items-center justify-center">
                <PiStarFill className="h-full w-full text-yellow-400" />
              </span>
              <p className="ml-1 text-sm">{venue.ratingAvg}</p>

              <Separator orientation="vertical" className="mx-2 h-4" />

              <p className="text-sm">{getReviewCount(venue.reviewCount)}</p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[456px] md:h-[464px]">
          <div className="flex flex-col gap-4 p-4 md:p-6">
            {bookings.map((booking: any) => (
              <div key={booking?.id} className="flex flex-col rounded-xl border">
                <div className="flex flex-col gap-4 px-4 pb-0 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 whitespace-nowrap font-semibold">
                      {booking?.field.name}
                    </h3>
                  </div>
                  <Separator />
                </div>

                <div className="flex flex-col gap-4 p-4 lg:p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="whitespace-nowrap text-sm text-muted-foreground">Tanggal</p>
                      <p className="whitespace-nowrap text-sm font-medium">
                        {format(booking?.date, 'EEEE, dd MMM yyyy', {locale: id})}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="whitespace-nowrap text-sm text-muted-foreground">Jam Sewa</p>
                      <p className="whitespace-nowrap text-sm font-medium">{`${format(booking?.startTime, 'HH.mm')} - ${format(booking.endTime, 'HH.mm')}`}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 px-4 pb-4 pt-0">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="whitespace-nowrap text-sm font-medium">Biaya</p>
                    <p className="whitespace-nowrap text-sm font-semibold">
                      {formatPrice(booking?.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-4 border-t pt-4 md:pt-6">
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-sm text-muted-foreground">Biaya Sewa</p>
          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(rentPrice)}</p>
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

          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(serviceFee)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-sm text-muted-foreground">PPN 11%</p>
          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(tax)}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm font-semibold">Total Biaya</p>
            <p className="whitespace-nowrap text-sm font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
