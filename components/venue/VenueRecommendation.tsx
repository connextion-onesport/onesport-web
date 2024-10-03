import useGetFieldRecommendation from '@/hooks/useGetFieldRecommendation';
import {fieldImages} from '@/libs/constants';
import FieldItem from './VenueCard';
import {Skeleton} from '../ui/skeleton';

import {Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';

export default function VenueRecommendation() {
  const {data, isError, isSuccess} = useGetFieldRecommendation();
  const fieldData = data?.data;
  const limitedData = fieldData?.slice(0, 4);

  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledImages = shuffleArray(fieldImages);

  const defaultImage =
    'https://plus.unsplash.com/premium_photo-1667598736309-1ea3b0fb1afa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
          {limitedData?.map(
            ({
              id,
              is_indoor,
              name,
              price_per_hour,
              thumbnail,
              ratingAvg,
              locations,
              index,
            }: any) => (
              <FieldItem
                id={id}
                thumbnail={shuffledImages[id] || defaultImage}
                key={id}
                is_indoor={is_indoor}
                locations={locations}
                name={name}
                ratingAvg={ratingAvg}
                price_per_hour={price_per_hour}
              />
            )
          )}
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
