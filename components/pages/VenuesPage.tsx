'use client';

import Searchbar from '@/components/Searchbar';
import {FilterList} from '@/components/filter';
import {VenueList, VenueListSkeleton} from '@/components/venue';
import NavbarBottom from '@/components/navbar/NavbarBottom';
import {useQuery} from '@tanstack/react-query';
import {getInfiniteVenues} from '@/actions/venue';
import {Suspense} from 'react';
import {useLocationStore} from '@/providers/zustand-provider';

interface VenuesPageProps {
  searchParams?: {
    search?: string;
    order?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    rating?: string;
  };
}

export default function VenuesPage({
  searchParams,
}: VenuesPageProps) {
  const {latitude, longitude} = useLocationStore(state => state);

  const search = searchParams?.search || '';
  const order = searchParams?.order || '';
  const category = searchParams?.category || '';
  const min_price = searchParams?.min_price ? Number(searchParams.min_price) : 0;
  const max_price = searchParams?.max_price ? Number(searchParams.max_price) : 0;
  const rating = searchParams?.rating ? Number(searchParams.rating) : 0;

  const {
    data: venues,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'venues',
      search,
      order,
      category,
      min_price,
      max_price,
      rating,
      latitude,
      longitude,
    ],
    queryFn: () =>
      getInfiniteVenues({
        pageParam: 0,
        pageSize: 12,
        search,
        order,
        category,
        min_price,
        max_price,
        rating,
        latitude,
        longitude,
      }),
  });

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <section className="flex flex-col gap-4 px-4 pb-0 pt-4 md:px-8 md:pt-8">
        <Searchbar />
        <FilterList />
      </section>

      <NavbarBottom />

      <Suspense
        key={search + order + category + min_price + max_price + rating}
        fallback={<VenueListSkeleton amount={8} isHeading={false} isCategory={false} />}
      >
        <VenueList
          data={venues?.data}
          isHeading={false}
          isCategory={false}
          isLoading={isLoading}
          isError={isError}
          amount={8}
          title="Rekomendasi Lapangan Olahraga"
          description="Temukan lapangan olahraga terbaik di sekitarmu"
        />
      </Suspense>
    </main>
  );
}
