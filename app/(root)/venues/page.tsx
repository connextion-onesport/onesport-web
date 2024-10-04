'use client';

import Searchbar from '@/components/Searchbar';
import {FilterList} from '@/components/filter';
import {VenueList} from '@/components/venue';
import NavbarBottom from '@/components/navbar/NavbarBottom';
import {useQuery} from '@tanstack/react-query';
import {getInfiniteVenues} from '@/actions/venue';

export default function VenuesPage() {
  const {
    data: venues,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['venues'],
    queryFn: () => getInfiniteVenues({pageParam: 0, pageSize: 12}),
  });

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <section className="flex flex-col gap-4 p-4 md:p-8">
        <Searchbar />
        <FilterList />
      </section>

      <NavbarBottom />

      <VenueList
        data={venues?.data}
        isCategory={false}
        isLoading={isLoading}
        isError={isError}
        title="Rekomendasi Lapangan Olahraga"
        description="Temukan lapangan olahraga terbaik di sekitarmu"
      />
    </main>
  );
}
