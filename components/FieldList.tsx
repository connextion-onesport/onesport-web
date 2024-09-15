'use client';

import React from 'react';
import FieldItem from './FieldItem';
import {usePathname, useSearchParams} from 'next/navigation';
import {Button} from './ui/button';
import {FieldItemProps, FieldListProps} from '@/types';
import useGetAllFields from '@/hooks/useGetAllFields';
import useGetFieldsSearch from '@/hooks/useGetFieldsSearch';
import {Skeleton} from './ui/skeleton';
import useGetFieldsByCategory from '@/hooks/useGetFieldsByCategory';
import {fieldImages} from '@/libs/constants';

export default function FieldList({title, description}: FieldListProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  const {
    data: fieldsData,
    isError: fieldsError,
    isLoading: fieldsLoading,
    isFetching: fieldsFetching,
    isSuccess: fieldsSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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

  const showLoading = fieldsLoading || searchLoading || categoryLoading;
  const showError = !showLoading && (fieldsError || searchError || categoryLoading);
  const showFetching =
    !showLoading && !showError && (fieldsFetching || searchFetching || categoryFetching);
  const showSuccess =
    !showLoading &&
    !showError &&
    !showFetching &&
    (fieldsSuccess || searchSuccess || categorySuccess);

  console.log('categorySuccess:', categorySuccess);
  console.log('categoryData:', categoryData);

  return (
    <section className="flex flex-col gap-8 p-4 md:p-8">
      {searchQuery ? (
        <FieldListHeader title="Tempat olahraga" description="Tempat olahraga sesuai pencarianmu" />
      ) : (
        <FieldListHeader title={title} description={description} pathName={pathName} />
      )}

      {showLoading && <LoadingSkeleton />}
      {showError && <LoadingSkeleton />}
      {showFetching && <LoadingSkeleton />}

      {showSuccess &&
        (searchQuery ? (
          searchSuccess ? (
            <FieldsSearch data={searchData} />
          ) : (
            <LoadingSkeleton />
          )
        ) : categoryQuery ? (
          categorySuccess ? (
            <FieldsCategory data={categoryData} />
          ) : (
            <LoadingSkeleton />
          )
        ) : fieldsSuccess ? (
          <FieldsList data={fieldsData} />
        ) : (
          <LoadingSkeleton />
        ))}

      {pathName !== '/' && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </section>
  );
}

interface FieldListHeaderProps {
  title: string;
  description: string;
  pathName?: string;
}

function FieldListHeader({title, description, pathName}: FieldListHeaderProps) {
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

interface FieldsListProps {
  data: {
    pages: Array<{
      data: any;
      nextPage?: number;
    }>;
  };
}

function FieldsList({data}: FieldsListProps) {
  const response = data.pages;
  const allFields = response[0].data;

  console.log('allFields', allFields);

  const hasFields = allFields.length > 0;
  console.log('hasFields', hasFields);

  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledImages = shuffleArray(fieldImages);

  const defaultImage =
    'https://plus.unsplash.com/premium_photo-1667598736309-1ea3b0fb1afa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      className={
        hasFields
          ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {hasFields ? (
        allFields.map((field: FieldItemProps, index: any) => (
          <FieldItem
            key={field.id}
            id={field.id}
            name={field.name}
            ratingAvg={field.ratingAvg}
            thumbnail={shuffledImages[index] || defaultImage}
            is_indoor={field.is_indoor}
            locations={field.locations}
            price_per_hour={field.price_per_hour}
            category={field.category}
          />
        ))
      ) : (
        <p className="text-center text-lg font-semibold">No fields found.</p>
      )}
    </div>
  );
}

function FieldsCategory({data}: FieldsCategoryProps) {
  const fieldsCategory = data.data;
  console.log('category data', data.data);

  return (
    <div
      className={
        fieldsCategory && fieldsCategory.length > 0
          ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {fieldsCategory && fieldsCategory.length > 0 ? (
        fieldsCategory.map((field: FieldItemProps) => (
          <React.Fragment key={field.id}>
            <FieldItem
              id={field.id}
              ratingAvg={field.ratingAvg}
              thumbnail={field.thumbnail}
              is_indoor={field.is_indoor}
              locations={field.locations}
              fields={field.fields}
              name={field.name}
              price_per_hour={field.price_per_hour}
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

interface FieldsSearchProps {
  data: FieldItemProps[] | undefined;
}
interface FieldsCategoryProps {
  data: any;
}

function FieldsSearch({data}: FieldsSearchProps) {
  return (
    <div
      className={
        data && data.length > 0
          ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'my-10 h-full'
      }
    >
      {data && data.length > 0 ? (
        data.map(field => (
          <React.Fragment key={field.id}>
            <FieldItem
              id={field.id}
              ratingAvg={field.ratingAvg}
              thumbnail={field.thumbnail}
              is_indoor={field.is_indoor}
              locations={field.locations}
              name={field.name}
              price_per_hour={field.price_per_hour}
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

function LoadMoreButton({fetchNextPage, hasNextPage, isFetchingNextPage}: LoadMoreButtonProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        variant="outline"
        className="text-primary"
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </Button>
    </div>
  );
}
