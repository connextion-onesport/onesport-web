'use client'

import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import {VenueList, VenueListSkeleton} from '@/components/venue';
import {Separator} from '@/components/ui/separator';
import CTA from '@/components/CTA';
import {dehydrate, HydrationBoundary, useQuery, useQueryClient} from '@tanstack/react-query';
import {getAllVenues, getHighestRatingVenues, getNearestVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import {Suspense, useEffect} from 'react';
import {getCurrentLocation} from '@/libs/utils';
import {venueListCategoryNames} from '@/libs/constants';
import { HomePage } from '@/components/pages';

export default function Page() {
  const {latitude, setLatitude, longitude, setLongitude} = useLocationStore(state => state);

  const queryClient = useQueryClient();
  
  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
  }, [setLatitude, setLongitude]);

  venueListCategoryNames.forEach(category => {
    queryClient.prefetchQuery({
      queryKey: ['nearby', latitude, longitude, category],
      queryFn: () => getNearestVenues({latitude, longitude, amount: 4, category}),
    });

    queryClient.prefetchQuery({
      queryKey: ['rating', category],
      queryFn: () => getHighestRatingVenues({amount: 4, category}),
    });

    queryClient.prefetchQuery({
      queryKey: ['all', category],
      queryFn: () => getAllVenues({amount: 4, category}),
    });
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
}
