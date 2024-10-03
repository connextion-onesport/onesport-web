import useGetFieldRecommendation from '@/hooks/useGetFieldRecommendation';
import {Skeleton} from '../ui/skeleton';
import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';
import VenueCard from './VenueCard';
import {FieldItemProps} from '@/types';

export default function VenueRecommendation() {
  const {data, isError, isSuccess} = useGetFieldRecommendation();

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Rekomendasi tempat lainnya</h2>
        <p className="text-base font-medium text-muted-foreground">
          Rekomendasi tempat yang mirip dengan Gelora Bung Karno
        </p>
      </div>

      {isError && (
        <p className="text-center font-semibold">There was an error processing your request</p>
      )}

      {isSuccess && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((field: FieldItemProps, index: any) => (
            <VenueCard
              key={field.id}
              id={field.id}
              name={field.name}
              images={field.images}
              location={field.location}
              isIndoor={field.isIndoor}
              ratingAvg={field.ratingAvg}
              reviewCount={field.reviewCount}
              openHours={field.openHours}
              minPrice={field.minPrice}
              category={field.category}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function VenueRecommendationSkeleton() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-1/3 md:w-1/4" />
        <Skeleton className="h-6 w-3/4 md:w-1/2" />
      </div>

      <Carousel className="flex w-full overflow-hidden">
        <CarouselContent className="h-full">
          {[...Array(5)].map((_, index) => (
            <CarouselItem
              key={index}
              className="h-full min-h-[438px] w-full min-w-72 max-w-96 md:basis-1/4"
            >
              <Skeleton className="h-full w-full rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
