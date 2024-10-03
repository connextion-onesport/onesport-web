'use client';

import React, {Suspense, useState} from 'react';
import FieldItem from './VenueCard';
import {usePathname, useSearchParams} from 'next/navigation';
import {Button} from '../ui/button';
import {FieldItemProps, FieldListProps} from '@/types';
import useGetAllFields from '@/hooks/useGetAllFields';
import useGetFieldsSearch from '@/hooks/useGetFieldsSearch';
import {Skeleton} from '../ui/skeleton';
import useGetFieldsByCategory from '@/hooks/useGetFieldsByCategory';
import {fieldImages} from '@/libs/constants';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getAllVenues} from '@/actions/venue';
import VenueCard from './VenueCard';

export default function VenueList({title, description}: FieldListProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  const {
    data: fieldsData,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['venues'],
    queryFn: ({pageParam = 0}) => getAllVenues({pageParam}),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  const {
    // data: fieldsData,
    isError: fieldsError,
    isLoading: fieldsLoading,
    isFetching: fieldsFetching,
    isSuccess: fieldsSuccess,
  } = useGetAllFields();

  const {
    data: searchData,
    isError: searchError,
    isLoading: searchLoading,
    isFetching: searchFetching,
    isSuccess: searchSuccess,
  } = useGetFieldsSearch();

  const {
    data: categoryData,
    isError: categoryError,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    isSuccess: categorySuccess,
  } = useGetFieldsByCategory();

  const [itemsToShow, setItemsToShow] = useState(pathName === '/' ? 4 : 8);
  const [itemsToShowSearch, setItemsToShowSearch] = useState(8);
  const [itemsToShowCategory, setItemsToShowCategory] = useState(8);

  const showLoading = fieldsLoading || searchLoading || categoryLoading;
  const showError = !showLoading && (fieldsError || searchError || categoryLoading);
  const showFetching =
    !showLoading && !showError && (fieldsFetching || searchFetching || categoryFetching);
  const showSuccess =
    !showLoading &&
    !showError &&
    !showFetching &&
    (fieldsSuccess || searchSuccess || categorySuccess);

  const limitedData = fieldsData?.pages[0].data.slice(0, itemsToShow);

  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 8);
    setItemsToShowSearch(prev => prev + 8);
    setItemsToShowCategory(prev => prev + 8);
  };

  const hasMoreItems = () => {
    if (searchQuery && searchSuccess) {
      return searchData && searchData.length > itemsToShowSearch;
    } else if (categoryQuery && categorySuccess) {
      return categoryData && categoryData.data && categoryData.data.length > itemsToShowCategory;
    } else if (fieldsSuccess) {
      return fieldsData && fieldsData.pages[0] && fieldsData.pages[0].data.length > itemsToShow;
    }
    return false;
  };

  return (
    <section className="flex flex-col gap-8 p-4 pb-8 md:p-8 md:pb-8">
      {searchQuery ? (
        <VenueListHeader title="Tempat olahraga" description="Tempat olahraga sesuai pencarianmu" />
      ) : (
        <VenueListHeader title={title} description={description} pathName={pathName} />
      )}

      {showLoading && <LoadingSkeleton />}
      {showError && <LoadingSkeleton />}
      {showFetching && <LoadingSkeleton />}

      {showSuccess &&
        (searchQuery ? (
          searchSuccess ? (
            <VenuesSearch data={searchData?.slice(0, itemsToShowSearch)} />
          ) : (
            <LoadingSkeleton />
          )
        ) : categoryQuery ? (
          categorySuccess ? (
            <VenueCategories data={categoryData?.data.slice(0, itemsToShowCategory)} />
          ) : (
            <LoadingSkeleton />
          )
        ) : fieldsSuccess ? (
          <VenuesList data={limitedData} />
        ) : (
          <LoadingSkeleton />
        ))}

      {pathName !== '/' && showSuccess && hasMoreItems() && (
        <LoadMoreButton loadMoreItems={loadMoreItems} />
      )}
    </section>
  );
}

interface VenueListHeaderProps {
  title: string;
  description: string;
  pathName?: string;
}

function VenueListHeader({title, description, pathName}: VenueListHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold md:text-4xl">{title}</h3>
        <p className="text-base font-medium text-muted-foreground md:text-lg">{description}</p>
      </div>

      {pathName === '/' && <SportCategoryButtons />}
    </div>
  );
}

function SportCategoryButtons() {
  const sports = ['Soccer', 'Basket', 'Pingpong', 'Tennis'];

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-2 overflow-auto md:gap-4">
        {sports.map((sport, index) => (
          <Button
            key={index}
            className={`${index !== 0 && 'text-primary'} h-8 rounded-full px-3 py-2 text-xs md:h-9 md:px-4`}
            variant={index === 0 ? 'default' : 'secondary'}
          >
            {sport}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="h-8 rounded-full px-3 py-2 text-xs text-primary md:h-9 md:px-4"
      >
        Lainnya
      </Button>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[1, 2, 3, 4].map(index => (
        <Skeleton key={index} className="h-[418px] rounded-xl" />
      ))}
    </div>
  );
}

function ErrorMessage() {
  return <p className="text-center font-semibold">There was an error processing your request</p>;
}

function FetchingMessage() {
  return <p className="my-5 text-center text-lg font-semibold">Fetching data...</p>;
}

// interface FieldsListProps {
//   data: {
//     pages: Array<{
//       data: any;
//       nextPage?: number;
//     }>;
//   };
// }

function VenuesList({data}: any) {
  const hasFields = data?.length > 0;

  return (
    <div
      className={
        hasFields
          ? 'grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {hasFields ? (
        data.map((field: FieldItemProps, index: any) => (
          <VenueCard
            key={field.id}
            id={field.id}
            name={field.name}
            images={field.images}
            location={field.location}
            isIndoor={field.isIndoor}
            ratingAvg={field.ratingAvg}
            reviewCount={field.reviewCount}
            openHours={field.openHours}
            minPrice={field.minPrice}
            category={field.category}
          />
        ))
      ) : (
        <p className="text-center text-lg font-semibold">No fields found.</p>
      )}
    </div>
  );
}

interface VenuesCategoryProps {
  data: any;
}

function VenueCategories({data}: VenuesCategoryProps) {
  return (
    <div
      className={
        data && data.length > 0
          ? 'grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {data && data.length > 0 ? (
        data.map((field: FieldItemProps) => (
          <React.Fragment key={field.id}>
            <VenueCard
              key={field.id}
              id={field.id}
              name={field.name}
              images={field.images}
              location={field.location}
              isIndoor={field.isIndoor}
              ratingAvg={field.ratingAvg}
              reviewCount={field.reviewCount}
              openHours={field.openHours}
              minPrice={field.minPrice}
              category={field.category}
            />
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-lg font-semibold">No fields found.</p>
      )}
    </div>
  );
}

interface VenuesSearchProps {
  data: FieldItemProps[] | undefined;
}

function VenuesSearch({data}: VenuesSearchProps) {
  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledImages = shuffleArray(fieldImages);

  const defaultImage =
    'https://plus.unsplash.com/premium_photo-1667598736309-1ea3b0fb1afa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div
      className={
        data && data.length > 0
          ? 'grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {data && data.length > 0 ? (
        data.map(field => (
          <React.Fragment key={field.id}>
            <VenueCard
              key={field.id}
              id={field.id}
              name={field.name}
              images={field.images}
              location={field.location}
              isIndoor={field.isIndoor}
              ratingAvg={field.ratingAvg}
              reviewCount={field.reviewCount}
              openHours={field.openHours}
              minPrice={field.minPrice}
              category={field.category}
            />
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-lg font-semibold">No fields found.</p>
      )}
    </div>
  );
}

interface LoadMoreButtonProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

function LoadMoreButton({loadMoreItems}: {loadMoreItems: () => void}) {
  return (
    <Button
      onClick={loadMoreItems}
      variant="outline"
      className="mx-auto w-fit rounded-full text-primary"
    >
      Load More
    </Button>
  );
}
