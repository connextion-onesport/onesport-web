'use client';

import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import {VenueList, VenueListSkeleton} from '@/components/venue';
import {Separator} from '@/components/ui/separator';
import CTA from '@/components/CTA';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getAllVenues, getHighestRatingVenues, getNearestVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import {Suspense, useEffect} from 'react';
import {getCurrentLocation} from '@/libs/utils';
import {venueListCategoryNames} from '@/libs/constants';

export default function HomePage() {
  const {latitude, setLatitude, longitude, setLongitude} = useLocationStore(state => state);
  const {categoryNearby, categoryRating, categoryAll} = useVenueStore(state => state);

  const queryClient = useQueryClient();

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);

    venueListCategoryNames.forEach(sport => {
      queryClient.prefetchQuery({
        queryKey: ['rating', sport],
        queryFn: () => getHighestRatingVenues({amount: 4, category: sport}),
      });
      queryClient.prefetchQuery({
        queryKey: ['nearby', latitude, longitude, sport],
        queryFn: () => getNearestVenues({latitude, longitude, amount: 4, category: sport}),
      });
      queryClient.prefetchQuery({
        queryKey: ['all', sport],
        queryFn: () => getAllVenues({amount: 4, category: sport}),
      });
    });
  }, [latitude, longitude, setLatitude, setLongitude, queryClient]);

  const {
    data: nearbyVenues,
    isLoading: loadingNearby,
    isError: errorNearby,
  } = useQuery({
    queryKey: ['nearby', latitude, longitude, categoryNearby],
    queryFn: () => getNearestVenues({latitude, longitude, amount: 4, category: categoryNearby}),
    enabled: !!latitude && !!longitude,
  });

  const {
    data: highestRatingVenues,
    isLoading: loadingHighestRating,
    isError: errorHighestRating,
  } = useQuery({
    queryKey: ['rating', categoryRating],
    queryFn: () => getHighestRatingVenues({amount: 4, category: categoryRating}),
  });

  const {
    data: allVenues,
    isLoading: loadingAll,
    isError: errorAll,
  } = useQuery({
    queryKey: ['all', categoryAll],
    queryFn: () => getAllVenues({amount: 4, category: categoryAll}),
    enabled: !latitude && !longitude,
  });

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Hero />

      {latitude && longitude ? (
        <VenueList
          data={nearbyVenues}
          category="nearby"
          isHeading={true}
          isCategory={true}
          isLoading={loadingNearby}
          isError={errorNearby}
          title="Dekat Kamu 🥳"
          description="Tempat olahraga di sekitarmu."
        />
      ) : (
        <VenueList
          data={allVenues}
          category="all"
          isHeading={true}
          isCategory={true}
          isLoading={loadingAll}
          isError={errorAll}
          title="Olahraga Seru ⛹🏻"
          description="Cek pilihan tempat yang bisa kamu coba."
        />
      )}

      <Separator />

      <VenueList
        data={highestRatingVenues}
        category="rating"
        isHeading={true}
        isCategory={true}
        isLoading={loadingHighestRating}
        isError={errorHighestRating}
        title="Rating Tertinggi ⭐️"
        description="Favorit dengan nilai terbaik dari pengguna."
      />

      {/* <CTA /> */}
      <NavbarBottom />
    </main>
  );
}
