'use client';

import {useQueryClient} from '@tanstack/react-query';
import {Button} from '../ui/button';
import {Skeleton} from '../ui/skeleton';
import VenueCard from './VenueCard';
import {useLocationStore, usePaymentStore, useVenueStore} from '@/providers/zustand-provider';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import {bookingStatusNames, venueListCategoryNames} from '@/libs/constants';
import {getVenues} from '@/actions/venue';

interface VenueListProps {
  title: string;
  description: string;
  data: any;
  category?: string;
  amount?: number;
  isHeading?: boolean;
  isCategory?: boolean;
  isStatus?: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function VenueList({
  title,
  description,
  data,
  category,
  amount,
  isHeading,
  isCategory,
  isStatus,
  isLoading,
  isError,
}: VenueListProps) {
  const {latitude, longitude} = useLocationStore(state => state);

  if (isLoading) {
    return (
      <section className="flex w-full px-4 py-8 md:px-8">
        <VenueListSkeleton
          amount={amount}
          isHeading={isHeading}
          isCategory={isCategory}
          isStatus={isStatus}
        />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col gap-8 p-4 pb-8 md:p-8 md:pb-8">
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <Image src="/images/icons/sad.svg" width={128} height={128} alt="Tidak ada lapangan" />
          <p className="text-base font-medium text-muted-foreground md:text-lg">
            Terjadi kesalahan saat memuat data.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 px-4 py-8 md:px-8">
      {isHeading && (
        <Header
          title={title}
          description={description}
          category={category}
          isCategory={isCategory}
          isStatus={isStatus}
        />
      )}
      <List data={data} latitude={latitude} longitude={longitude} />
    </section>
  );
}

interface VenueListHeaderProps {
  title: string;
  description: string;
  category?: string;
  isCategory?: boolean;
  isStatus?: boolean;
}

function Header({title, description, category, isCategory, isStatus}: VenueListHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground sm:text-base">{description}</p>
      </div>

      {isStatus && <VenueStatus />}
      {isCategory && <VenueCategory category={category} />}
    </div>
  );
}

function VenueCategory({category}: {category?: string}) {
  const {
    categoryNearby,
    setCategoryNearby,
    categoryRating,
    setCategoryRating,
    categoryAll,
    setCategoryAll,
  } = useVenueStore(state => state);

  const handleCategory = (sport: string) => {
    if (category === 'nearby') {
      setCategoryNearby(sport);
    } else if (category === 'rating') {
      setCategoryRating(sport);
    } else {
      setCategoryAll(sport);
    }
  };

  return (
    <div className="flex items-center justify-between gap-8">
      <Carousel className="flex overflow-hidden lg:w-full">
        <CarouselContent>
          {venueListCategoryNames.map((sport, index) => (
            <CarouselItem key={index} className="min-w-fit basis-0 pl-4">
              <Button
                onClick={() => handleCategory(sport)}
                className={`${
                  (category === 'nearby' && categoryNearby === sport) ||
                  (category === 'all' && categoryAll === sport) ||
                  (category === 'rating' && categoryRating === sport)
                    ? 'text-white'
                    : ''
                } h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm`}
                variant={
                  (category === 'nearby' && categoryNearby === sport) ||
                  (category === 'all' && categoryAll === sport) ||
                  (category === 'rating' && categoryRating === sport)
                    ? 'default'
                    : 'secondary'
                }
              >
                {sport}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        variant="outline"
        className="h-8 rounded-full px-3 text-xs text-primary md:h-9 md:px-4 md:py-2 md:text-sm"
        asChild
      >
        <Link href="/venues">Lainnya</Link>
      </Button>
    </div>
  );
}

function VenueStatus() {
  const {selectedStatus, setSelectedStatus} = usePaymentStore(state => state);

  const handleStatus = (status: string) => {
    const statusMap: {[key: string]: string} = {
      Semua: 'ALL',
      Pending: 'PENDING',
      Konfirmasi: 'CONFIRMED',
      Dibatalkan: 'CANCELLED',
    };

    const statusValue = statusMap[status];
    setSelectedStatus(statusValue);
  };

  return (
    <div className="flex items-center justify-between gap-8">
      <Carousel className="flex overflow-hidden lg:w-full">
        <CarouselContent>
          {bookingStatusNames.map((status, index) => (
            <CarouselItem key={index} className="min-w-fit basis-0 pl-4">
              <Button
                onClick={() => handleStatus(status)}
                className="h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm"
                variant={
                  (status === 'Semua' && selectedStatus === 'ALL') ||
                  (status === 'Pending' && selectedStatus === 'PENDING') ||
                  (status === 'Konfirmasi' && selectedStatus === 'CONFIRMED') ||
                  (status === 'Dibatalkan' && selectedStatus === 'CANCELLED')
                    ? 'default'
                    : 'secondary'
                }
              >
                {status}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

interface ListProps {
  data: any;
  latitude: number;
  longitude: number;
}

function List({data, latitude, longitude}: ListProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Image src="/images/icons/sad.svg" width={128} height={2128} alt="Tidak ada lapangan" />
        <p className="text-base font-medium text-muted-foreground md:text-lg">
          Tidak ada lapangan yang ditemukan.
        </p>
      </div>
    );
  }

  return data.length > 4 ? (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((field: any) => (
        <VenueCard
          key={field.id}
          id={field.id}
          name={field.name}
          images={field.images}
          location={field.location}
          latitude={latitude}
          longitude={longitude}
          isIndoor={field.isIndoor}
          ratingAvg={field.ratingAvg}
          reviewCount={field.reviewCount}
          openHours={field.openHours}
          minPrice={field.minPrice}
          category={field.category}
          status={field.status}
          paymentId={field.paymentId}
        />
      ))}
    </div>
  ) : (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-screen-2xl"
    >
      <CarouselContent>
        {data.map((field: any) => (
          <CarouselItem key={field.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <VenueCard
                key={field.id}
                id={field.id}
                name={field.name}
                images={field.images}
                location={field.location}
                latitude={latitude}
                longitude={longitude}
                isIndoor={field.isIndoor}
                ratingAvg={field.ratingAvg}
                reviewCount={field.reviewCount}
                openHours={field.openHours}
                minPrice={field.minPrice}
                category={field.category}
                status={field.status}
                paymentId={field.paymentId}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

interface LoadingSkeletonProps {
  amount?: number;
  isHeading?: boolean;
  isCategory?: boolean;
  isStatus?: boolean;
}

export function VenueListSkeleton({
  amount = 4,
  isHeading,
  isCategory,
  isStatus,
}: LoadingSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      {isHeading && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-1/2 md:w-1/4" />
            <Skeleton className="h-6 w-3/4 md:w-2/4" />
          </div>

          {isCategory ||
            (isStatus && (
              <div className="flex items-center justify-between gap-8">
                <Carousel className="flex overflow-hidden lg:w-full">
                  <CarouselContent>
                    {[1, 2, 3, 4, 5].map(index => (
                      <CarouselItem key={index} className="min-w-fit basis-0 pl-4">
                        <Skeleton className="h-8 w-24 rounded-full px-3 md:h-9 md:px-4 md:py-2" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                <Skeleton className="h-8 w-24 rounded-full px-3 md:h-9 md:px-4 md:py-2" />
              </div>
            ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(amount)].map((_, index) => (
          <Skeleton key={index} className="h-[384px] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
