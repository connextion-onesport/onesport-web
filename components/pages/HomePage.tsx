'use client'

import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import {VenueList} from '@/components/venue';
import {Separator} from '@/components/ui/separator';
import {useQuery} from '@tanstack/react-query';
import {getVenues} from '@/actions/venue';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';

export default function HomePage() {
  const {latitude, longitude} = useLocationStore(state => state);
  const {categoryNearby, categoryRating, categoryAll} = useVenueStore(state => state);

  const {
    data: nearbyVenues,
    isLoading: loadingNearby,
    isError: errorNearby,
  } = useQuery({
    queryKey: ['nearby', latitude, longitude, categoryNearby],
    queryFn: () => getVenues({latitude, longitude, category: categoryNearby}),
    enabled: !!latitude && !!longitude,
  });

  const {
    data: highestRatingVenues,
    isLoading: loadingHighestRating,
    isError: errorHighestRating,
  } = useQuery({
    queryKey: ['rating', categoryRating],
    queryFn: () => getVenues({category: categoryRating}),
  });

  const {
    data: allVenues,
    isLoading: loadingAll,
    isError: errorAll,
  } = useQuery({
    queryKey: ['all', categoryAll],
    queryFn: () => getVenues({category: categoryAll}),
  });

  const sortedNearbyVenues = nearbyVenues?.sort((a, b) => a.distance - b.distance)
  const sortedHighestRatingVenues = highestRatingVenues?.sort((a, b) => b.ratingAvg - a.ratingAvg)

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Hero />

      {latitude && longitude ? (
        <VenueList
          data={sortedNearbyVenues}
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
        data={sortedHighestRatingVenues}
        category="rating"
        isHeading={true}
        isCategory={true}
        isLoading={loadingHighestRating}
        isError={errorHighestRating}
        title="Rating Tertinggi ⭐️"
        description="Favorit dengan nilai terbaik dari pengguna."
      />

      <NavbarBottom />
    </main>
  );
}