'use client';

import {VenuesPage} from '@/pages';
import {dehydrate, HydrationBoundary, useQueryClient} from '@tanstack/react-query';
import {getInfiniteVenues} from '@/actions/venue';
import {useLocationStore} from '@/providers/zustand-provider';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    order?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    rating?: string;
  };
}) {
  const {latitude, longitude} = useLocationStore(state => state);

  const queryClient = useQueryClient();

  const search = searchParams?.search || '';
  const order = searchParams?.order || '';
  const category = searchParams?.category || '';
  const min_price = searchParams?.min_price ? Number(searchParams.min_price) : 0;
  const max_price = searchParams?.max_price ? Number(searchParams.max_price) : 0;
  const rating = searchParams?.rating ? Number(searchParams.rating) : 0;

  queryClient.prefetchQuery({
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <VenuesPage searchParams={searchParams} />
    </HydrationBoundary>
  );
}
