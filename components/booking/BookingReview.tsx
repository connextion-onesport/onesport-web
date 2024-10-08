import {Button} from '../ui/button';

import {Separator} from '../ui/separator';
import {ScrollArea} from '@/components/ui/scroll-area';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {deleteBooking} from '@/actions/payment';

import {format} from 'date-fns';
import {id} from 'date-fns/locale';

import {formatPrice, getReviewCount} from '@/libs/utils';

import Link from 'next/link';

import {PiArrowLeft, PiArrowRight, PiStarFill, PiTrash, PiTrashSimple} from 'react-icons/pi';
import { Skeleton } from '../ui/skeleton';

interface BookingReviewProps {
  fields: any;
  venue: any;
  isLoading: boolean;
  isError: boolean;
}

export default function BookingReview({fields, venue, isLoading, isError}: BookingReviewProps) {
  const queryClient = useQueryClient();

  const {mutateAsync: deleteBookingMutation} = useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fields']});
    },
  });

  if (isLoading) {
    return <Skeleton className='h-[774px] bg-white' />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <section className="flex max-h-[774px] flex-col rounded-xl bg-background">
      <div className="flex flex-col gap-4 px-4 pb-0 pt-4 lg:gap-6 lg:px-6 lg:pt-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{venue?.name}</h2>
          <div className="flex items-center">
            <span className="flex aspect-square h-5 w-5 items-center justify-center">
              <PiStarFill className="h-full w-full text-yellow-400" />
            </span>
            <p className="ml-1 text-sm">{venue?.ratingAvg}</p>

            <Separator orientation="vertical" className="mx-2" />

            <p className="text-sm">{getReviewCount(venue?.reviewCount)}</p>
          </div>
        </div>

        <Separator />
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-4 px-4 py-4 lg:p-6">
          {fields.map((booking: any) => (
            <div key={booking.id} className="flex flex-col rounded-xl border">
              <div className="flex flex-col gap-4 px-4 pb-0 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="line-clamp-1 whitespace-nowrap font-semibold">
                    {booking?.field.name}
                  </h3>

                  <Button
                    size="icon"
                    variant="link"
                    className="h-6 w-6 rounded-sm text-red-500 no-underline"
                    onClick={() => deleteBookingMutation(booking.id)}
                  >
                    <PiTrashSimple className="h-5 w-5" />
                  </Button>
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
                    <p className="whitespace-nowrap text-sm font-medium">{`${format(booking?.startTime, 'HH.mm')} - ${format(booking?.endTime, 'HH.mm')}`}</p>
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
      <div className="flex flex-col items-center justify-center gap-4 px-4 pb-4 pt-0 md:gap-6 md:px-6 md:pb-6">
        <Separator />

        <Link
          href={`/venues/${venue.id}`}
          className="flex items-center self-center whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <PiArrowLeft className="mr-1 h-5 w-5" />
          Tambah Jadwal
        </Link>
      </div>
    </section>
  );
}
