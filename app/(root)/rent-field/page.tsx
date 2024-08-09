// import SearchBar from "@/components/SearchBar";
"use client";
import FilterButtonList from "@/components/FilterButtonList";
import SportFieldList from "@/components/SportFieldList";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const RentField: React.FC = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");

  const handleSearch = (newSearchField: string, newDateString: string) => {
    setSearchField(newSearchField);
    setDateString(newDateString);
    router.push(`?search=${newSearchField}&date=${newDateString}`);
  };
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 p-6 sm:p-8">
      <SearchBar onSearch={handleSearch} />
      <FilterButtonList />
      <SportFieldList searchField={searchField} dateString={dateString} />
    </div>
  );
};

export default RentField;
