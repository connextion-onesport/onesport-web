'use client';

import FilterButtonList from '@/components/FilterButtonList';
import FieldList from '@/components/FieldList';
import {Suspense, useState} from 'react';
import {useRouter} from 'next/navigation';
import NavbarMobile from '@/components/NavbarMobile';
import Searchbar from '@/components/Searchbar';

export default function FieldsPage() {
  const router = useRouter();
  const [searchField, setSearchField] = useState<string>('');

  const handleSearch = (newSearchField: string) => {
    setSearchField(newSearchField);
    router.push(`?search=${newSearchField}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <section className="flex flex-col gap-4 p-4 md:p-8">
        <Searchbar onSearch={handleSearch} />
        <FilterButtonList />
      </section>

      <NavbarMobile />

      <Suspense>
        <FieldList
          title="Rekomendasi Tempat Olahraga"
          description="Daftar tempat olahraga yang ada di OneSport"
        />
      </Suspense>
    </div>
  );
}
