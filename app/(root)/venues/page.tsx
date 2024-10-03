'use client';

import {Suspense, useCallback, useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import Searchbar from '@/components/Searchbar';
import {FilterList} from '@/components/filter';
import {VenueList} from '@/components/venue';
import NavbarBottom from '@/components/navbar/NavbarBottom';

export default function VenuesPage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Suspense fallback={<div>Loading venues...</div>}>
        <VenuesPageContent />
      </Suspense>
    </main>
  );
}

function VenuesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchField, setSearchField] = useState<string>(searchParams.get('search') || '');
  const [orderField, setOrderField] = useState<string>(searchParams.get('order') || '');
  const [ratingField, setRatingField] = useState<number>(Number(searchParams.get('rating')) || 0);
  const [categoryField, setCategoryField] = useState<string>(searchParams.get('category') || '');

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (searchField) params.set('search', searchField);
    if (orderField) params.set('order', orderField);
    if (ratingField) params.set('rating', ratingField.toString());
    if (categoryField) params.set('category', categoryField);

    const newURL = `${pathname}?${params.toString()}`;
    router.push(newURL);
  }, [pathname, router, searchField, orderField, ratingField, categoryField]);

  useEffect(() => {
    updateURL();
  }, [searchField, orderField, ratingField, categoryField, updateURL]);

  const handleSearch = (newSearchField: string) => {
    setSearchField(newSearchField);
    updateURL();
  };

  const handleOrder = (newOrderField: string) => {
    setOrderField(newOrderField);
    updateURL();
  };

  const handleRating = (newRatingField: number) => {
    setRatingField(newRatingField);
    updateURL();
  };

  const handleCategory = (newCategoryField: string) => {
    setCategoryField(newCategoryField);
    updateURL();
  };

  return (
    <>
      <section className="flex flex-col gap-4 p-4 md:p-8">
        <Searchbar onSearch={handleSearch} />
        <FilterList onOrder={handleOrder} onRating={handleRating} onCategory={handleCategory} />
      </section>

      <NavbarBottom />

      <VenueList
        title="Rekomendasi Tempat Olahraga"
        description="Daftar tempat olahraga yang ada di OneSport"
      />
    </>
  );
}
