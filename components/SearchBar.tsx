// SearchBar.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DatePickerDemo } from "./ui/date-picker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (searchField: string, dateString: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchField, setSearchField] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
    onSearch(searchField, dateString);
  };

  return (
    <form className="flex w-full flex-row" onSubmit={(e) => e.preventDefault()}>
      <div className="w-1/2">
        {/* location icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 translate-x-2 translate-y-2 lg:translate-y-[0.9rem]"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"
            fill="#79747E"
          ></path>
        </svg>
        <Input
          type="search"
          placeholder="Venue, Area"
          className="rounded-l-full border-r-white px-8 placeholder:text-sm lg:py-6"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
        />
      </div>
      <div className="w-1/2">
        {/* date icon */}
        <svg
          width="17"
          height="17"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute translate-x-2 translate-y-[0.6rem] lg:translate-y-4"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 2.5C15 1.805 14.44 1.25 13.75 1.25C13.055 1.25 12.5 1.81 12.5 2.5H7.5C7.5 1.805 6.94 1.25 6.25 1.25C5.555 1.25 5 1.81 5 2.5H3.7525C3.07 2.5 2.5 3.06125 2.5 3.7525V16.2475C2.5 16.93 3.06125 17.5 3.7525 17.5H16.2475C16.93 17.5 17.5 16.9387 17.5 16.2475V3.7525C17.5 3.07 16.9387 2.5 16.2475 2.5H15ZM17.5075 0C18.8837 0 20 1.11875 20 2.4925V17.5075C19.9997 18.1684 19.737 18.8022 19.2696 19.2696C18.8022 19.737 18.1684 19.9997 17.5075 20H2.4925C1.83155 19.9997 1.19776 19.737 0.730402 19.2696C0.26304 18.8022 0.000331221 18.1684 0 17.5075L0 2.4925C0 1.11625 1.11875 0 2.4925 0H17.5075ZM9.38125 5H10.6187C10.9675 5 11.25 5.2675 11.25 5.63125V6.86875C11.2514 6.95202 11.2359 7.03471 11.2047 7.11191C11.1735 7.18911 11.127 7.25923 11.0681 7.31812C11.0092 7.37701 10.9391 7.42346 10.8619 7.4547C10.7847 7.48595 10.702 7.50135 10.6187 7.5H9.38125C9.29798 7.50135 9.21529 7.48595 9.13809 7.4547C9.06089 7.42346 8.99077 7.37701 8.93188 7.31812C8.87299 7.25923 8.82654 7.18911 8.7953 7.11191C8.76405 7.03471 8.74865 6.95202 8.75 6.86875V5.63125C8.75 5.2825 9.0175 5 9.38125 5ZM13.1313 5H14.3687C14.7175 5 15 5.2675 15 5.63125V6.86875C15.0014 6.95202 14.9859 7.03471 14.9547 7.11191C14.9235 7.18911 14.877 7.25923 14.8181 7.31812C14.7592 7.37701 14.6891 7.42346 14.6119 7.4547C14.5347 7.48595 14.452 7.50135 14.3687 7.5H13.1313C13.048 7.50135 12.9653 7.48595 12.8881 7.4547C12.8109 7.42346 12.7408 7.37701 12.6819 7.31812C12.623 7.25923 12.5765 7.18911 12.5453 7.11191C12.5141 7.03471 12.4986 6.95202 12.5 6.86875V5.63125C12.5 5.2825 12.7675 5 13.1313 5ZM5.63125 8.75H6.86875C7.2175 8.75 7.5 9.0175 7.5 9.38125V10.6187C7.50135 10.702 7.48595 10.7847 7.4547 10.8619C7.42346 10.9391 7.37701 11.0092 7.31812 11.0681C7.25923 11.127 7.18911 11.1735 7.11191 11.2047C7.03471 11.2359 6.95202 11.2514 6.86875 11.25H5.63125C5.54798 11.2514 5.46529 11.2359 5.38809 11.2047C5.31089 11.1735 5.24077 11.127 5.18188 11.0681C5.12299 11.0092 5.07654 10.9391 5.0453 10.8619C5.01405 10.7847 4.99865 10.702 5 10.6187V9.38125C5 9.0325 5.2675 8.75 5.63125 8.75ZM9.38125 8.75H10.6187C10.9675 8.75 11.25 9.0175 11.25 9.38125V10.6187C11.2514 10.702 11.2359 10.7847 11.2047 10.8619C11.1735 10.9391 11.127 11.0092 11.0681 11.0681C11.0092 11.127 10.9391 11.1735 10.8619 11.2047C10.7847 11.2359 10.702 11.2514 10.6187 11.25H9.38125C9.29798 11.2514 9.21529 11.2359 9.13809 11.2047C9.06089 11.1735 8.99077 11.127 8.93188 11.0681C8.87299 11.0092 8.82654 10.9391 8.7953 10.8619C8.76405 10.7847 8.74865 10.702 8.75 10.6187V9.38125C8.75 9.0325 9.0175 8.75 9.38125 8.75ZM13.1313 8.75H14.3687C14.7175 8.75 15 9.0175 15 9.38125V10.6187C15.0014 10.702 14.9859 10.7847 14.9547 10.8619C14.9235 10.9391 14.877 11.0092 14.8181 11.0681C14.7592 11.127 14.6891 11.1735 14.6119 11.2047C14.5347 11.2359 14.452 11.2514 14.3687 11.25H13.1313C13.048 11.2514 12.9653 11.2359 12.8881 11.2047C12.8109 11.1735 12.7408 11.127 12.6819 11.0681C12.623 11.0092 12.5765 10.9391 12.5453 10.8619C12.5141 10.7847 12.4986 10.702 12.5 10.6187V9.38125C12.5 9.0325 12.7675 8.75 13.1313 8.75ZM5.63125 12.5H6.86875C7.2175 12.5 7.5 12.7675 7.5 13.1313V14.3687C7.50135 14.452 7.48595 14.5347 7.4547 14.6119C7.42346 14.6891 7.37701 14.7592 7.31812 14.8181C7.25923 14.877 7.18911 14.9235 7.11191 14.9547C7.03471 14.9859 6.95202 15.0014 6.86875 15H5.63125C5.54798 15.0014 5.46529 14.9859 5.38809 14.9547C5.31089 14.9235 5.24077 14.877 5.18188 14.8181C5.12299 14.7592 5.07654 14.6891 5.0453 14.6119C5.01405 14.5347 4.99865 14.452 5 14.3687V13.1313C5 12.7825 5.2675 12.5 5.63125 12.5ZM9.38125 12.5H10.6187C10.9675 12.5 11.25 12.7675 11.25 13.1313V14.3687C11.2514 14.452 11.2359 14.5347 11.2047 14.6119C11.1735 14.6891 11.127 14.7592 11.0681 14.8181C11.0092 14.877 10.9391 14.9235 10.8619 14.9547C10.7847 14.9859 10.702 15.0014 10.6187 15H9.38125C9.29798 15.0014 9.21529 14.9859 9.13809 14.9547C9.06089 14.9235 8.99077 14.877 8.93188 14.8181C8.87299 14.7592 8.82654 14.6891 8.7953 14.6119C8.76405 14.5347 8.74865 14.452 8.75 14.3687V13.1313C8.75 12.7825 9.0175 12.5 9.38125 12.5Z"
            fill="#79747E"
          />
        </svg>
        {/* date picker */}
        <DatePickerDemo onDateChange={handleDateChange} />
      </div>
      {/* search button */}
      <Button
        className="absolute right-0 h-fit w-6 -translate-x-6 translate-y-[0.4rem] rounded-full bg-primary p-[0.35rem] font-bold shadow-md md:w-7 lg:-translate-x-10 lg:translate-y-[0.6rem]"
        onClick={handleSearch}
      >
        {/* search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
        </svg>
      </Button>
    </form>
  );
};

export default SearchBar;
