'use client';

import {dehydrate, HydrationBoundary, useQuery, useQueryClient} from '@tanstack/react-query';
import {getAllVenues, getHighestRatingVenues, getNearestVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import { useEffect} from 'react';
import {getCurrentLocation} from '@/libs/utils';
import {HomePage} from '@/components/pages';

export default function Page() {
  const {latitude, setLatitude, longitude, setLongitude} = useLocationStore(state => state);

  const queryClient = useQueryClient();

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
  }, [setLatitude, setLongitude]);

  queryClient.prefetchQuery({
    queryKey: ['nearby', latitude, longitude],
    queryFn: () => getNearestVenues({latitude, longitude, amount: 4}),
  });

  queryClient.prefetchQuery({
    queryKey: ['rating'],
    queryFn: () => getHighestRatingVenues({amount: 4}),
  });

  queryClient.prefetchQuery({
    queryKey: ['all'],
    queryFn: () => getAllVenues({amount: 4}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
}
