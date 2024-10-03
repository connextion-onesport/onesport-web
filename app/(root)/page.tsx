'use client';

import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import {VenueList} from '@/components/venue';
import {Separator} from '@/components/ui/separator';
import CTA from '@/components/CTA';
import {useQuery} from '@tanstack/react-query';
import {getAllVenues, getHighestRatingVenues, getNearestVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import {useEffect} from 'react';
import {getCurrentLocation} from '@/libs/utils';

export default function HomePage() {
  const {latitude, setLatitude, longitude, setLongitude} = useLocationStore(state => state);
  const {categoryNearby, categoryRating, categoryAll} = useVenueStore(state => state);

  useEffect(() => {
    getCurrentLocation(setLatitude, setLongitude);
  }, [setLatitude, setLongitude]);

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

  const isLoading = loadingNearby || loadingHighestRating || loadingAll;
  const isError = errorNearby || errorHighestRating || errorAll;

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Hero />
      {latitude && longitude ? (
        <VenueList
          data={nearbyVenues}
          category="nearby"
          isCategory={true}
          isLoading={isLoading}
          isError={isError}
          title="Dekat Kamu 🥳"
          description="Tempat olahraga di sekitarmu."
        />
      ) : (
        <VenueList
          data={allVenues}
          category="all"
          isCategory={true}
          isLoading={isLoading}
          isError={isError}
          title="Olahraga Seru ⛹🏻"
          description="Cek pilihan tempat yang bisa kamu coba."
        />
      )}
      <Separator />
      <VenueList
        data={highestRatingVenues}
        category="rating"
        isCategory={true}
        isLoading={isLoading}
        isError={isError}
        title="Rating Tertinggi ⭐️"
        description="Favorit dengan nilai terbaik dari pengguna."
      />
      {/* <CTA /> */}
      <NavbarBottom />
    </main>
  );
}
