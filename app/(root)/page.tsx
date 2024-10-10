'use client';

import {dehydrate, HydrationBoundary, useQueryClient} from '@tanstack/react-query';
import {getVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import {useEffect} from 'react';
import {getCurrentLocation} from '@/libs/utils';
import {HomePage} from '@/components/pages';
import {venueListCategoryNames} from '@/libs/constants';
import {useDebouncedCallback} from 'use-debounce';

export default function Page() {
  const {latitude, setLatitude, longitude, setLongitude} = useLocationStore(state => state);

  const queryClient = useQueryClient();

  const handleGetCurrentLocation = useDebouncedCallback(() => {
    getCurrentLocation(setLatitude, setLongitude);
  }, 300);

  useEffect(() => {
    handleGetCurrentLocation();

    return () => {
      handleGetCurrentLocation.cancel();
    };
  }, [handleGetCurrentLocation]);

  useEffect(() => {
    const prefetchVenues = async () => {
      await Promise.all(
        venueListCategoryNames.map(async category => {
          await queryClient.prefetchQuery({
            queryKey: ['nearby', latitude, longitude, category],
            queryFn: () => getVenues({latitude, longitude, category}),
          });
          await queryClient.prefetchQuery({
            queryKey: ['rating', category],
            queryFn: () => getVenues({category}),
          });
          await queryClient.prefetchQuery({
            queryKey: ['all', category],
            queryFn: () => getVenues({category}),
          });
        })
      );
    };

    if (latitude && longitude) {
      prefetchVenues();
    }
  }, [latitude, longitude, queryClient]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
}
