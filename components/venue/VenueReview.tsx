import {Separator} from '../ui/separator';
import {Button} from '../ui/button';
import {format} from 'date-fns';
import {id} from 'date-fns/locale';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {getInitials} from '@/libs/utils';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {PiStarFill} from 'react-icons/pi';
import {Skeleton} from '../ui/skeleton';

interface VenueReviewProps {
  data: any;
}

export default function VenueReview({data}: VenueReviewProps) {
  const {ratingAvg, reviews} = data;

  const getRatingText = (ratingAvg: number) => {
    switch (true) {
      case ratingAvg >= 4.5:
        return 'Bagus Sekali';
      case ratingAvg >= 4:
        return 'Bagus';
      case ratingAvg >= 3:
        return 'Cukup Baik';
      default:
        return 'Perlu Peningkatan';
    }
  };

  const getRatingTextColor = (ratingAvg: number) => {
    switch (true) {
      case ratingAvg >= 4.5:
        return 'text-green-500';
      case ratingAvg >= 4:
        return 'text-primary';
      case ratingAvg >= 3:
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  const getRatingColor = (ratingAvg: number) => {
    switch (true) {
      case ratingAvg >= 4.5:
        return 'bg-green-500';
      case ratingAvg >= 4:
        return 'bg-primary';
      case ratingAvg >= 3:
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <section className="flex flex-col gap-8 overflow-hidden rounded-2xl border p-4 md:p-8">
      <div className="flex flex-col">
        <div className="flex justify-between gap-8">
          <h2 className="text-2xl font-bold">Review & Rating</h2>
          <Button variant="ghost" className="text-primary hover:text-primary">
            Lihat Semua
          </Button>
        </div>
        <p className="text-base font-medium text-muted-foreground">
          Apa kata orang yang telah menyewa tempat ini!
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex items-center justify-center border-b px-8 py-8 md:border-b-0 md:border-r md:px-14">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted">
              <div
                className={`${getRatingColor(ratingAvg)} flex h-20 w-20 items-center justify-center rounded-full p-1`}
              >
                <p className="text-center text-3xl font-semibold text-white">{ratingAvg}</p>
              </div>
            </div>
            <p
              className={`${getRatingTextColor(ratingAvg)} whitespace-nowrap text-center font-semibold`}
            >
              {getRatingText(ratingAvg)}
            </p>
          </div>
        </div>

        <Carousel className="flex w-full overflow-hidden">
          <CarouselContent className="h-full">
            {reviews.map((review: { id: string; user: { image: string; name: string }; createdAt: Date; rating: number; comment: string }) => (
              <CarouselItem key={review.id} className="min-h-40 min-w-96 md:basis-1/4">
                <div className="flex h-full w-full flex-col rounded-lg border p-4">
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage src={review.user.image} />
                        <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <p className="line-clamp-1 text-sm font-semibold">{review.user.name}</p>
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {format(review.createdAt, 'PPP', {locale: id})}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="flex aspect-square h-6 w-6 items-center justify-center">
                        <PiStarFill className="h-full w-full text-yellow-400" />
                      </span>
                      <p className="self-center text-base font-semibold">
                        {review.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <p className="line-clamp-3 text-sm">{review.comment}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export function VenueReviewSkeleton() {
  return (
    <section className="flex flex-col gap-8 overflow-hidden rounded-2xl border p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-8">
          <Skeleton className="h-6 w-1/3 md:w-1/4" />
          <Skeleton className="h-6 w-1/6 md:w-1/12" />
        </div>
        <Skeleton className="h-6 w-3/4 md:w-1/2" />
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex items-center justify-center border-b px-8 py-8 md:border-b-0 md:border-r md:px-14">
          <div className="flex flex-col items-center justify-center gap-2">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        <Carousel className="flex w-full overflow-hidden">
          <CarouselContent className="h-full">
            {[...Array(4)].map((_, index) => (
              <CarouselItem key={index} className="min-h-40 min-w-96 md:basis-1/4">
                <Skeleton className="h-full w-full rounded-xl" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
