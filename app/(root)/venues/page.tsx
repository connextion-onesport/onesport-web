'use client';

import {Suspense, useCallback, useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

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

  console.log(venues);

  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      {/* <section className="flex flex-col gap-4 p-4 md:p-8">
        <Searchbar onSearch={handleSearch} />
        <FilterList onOrder={handleOrder} onRating={handleRating} onCategory={handleCategory} />
      </section> */}

      <NavbarBottom />
      {/* 
      <VenueList
        data={venues}
        isCategory={false}
        isLoading={isLoading}
        isError={isError}
        title="Rekomendasi Tempat Olahraga"
        description="Daftar tempat olahraga yang ada di OneSport"
      /> */}
    </main>
  );
}
