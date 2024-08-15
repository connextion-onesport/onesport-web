'use client';

import FilterButtonList from '@/components/FilterButtonList';
import FieldList from '@/components/FieldList';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Searchbar from '@/components/Searchbar';
import NavbarMobile from '@/components/NavbarMobile';

const RentField: React.FC = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  const handleSearch = (newSearchField: string, newDateString: string) => {
    setSearchField(newSearchField);
    setDateString(newDateString);
    router.push(`?search=${newSearchField}&date=${newDateString}`);
  };
  
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <section className="flex flex-col gap-4 p-4 md:p-8">
        <Searchbar onSearch={handleSearch} />
        <FilterButtonList />
      </section>

      <NavbarMobile />

      <FieldList
        title="Rekomendasi Tempat Olahraga"
        description="Daftar tempat olahraga yang ada di OneSport"
        searchField={searchField}
        dateString={dateString}
      />
    </div>
  );
};

export default RentField;
