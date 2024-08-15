'use client';

import React from 'react';
import FieldItem from './FieldItem';
import {usePathname, useSearchParams} from 'next/navigation';
import {Button} from './ui/button';
import {FieldItemProps, FieldListProps} from '@/types';
import useGetAllFields from '@/hooks/useGetAllFields';
import useGetFieldsSearch from '@/hooks/useGetFieldsSearch';

export default function FieldList({title, description}: FieldListProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const dateQuery = searchParams.get('date') || '';

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

  const showLoading = fieldsLoading || searchLoading;
  const showError = !showLoading && (fieldsError || searchError);
  const showFetching = !showLoading && !showError && (fieldsFetching || searchFetching);
  const showSuccess =
    !showLoading && !showError && !showFetching && (fieldsSuccess || searchSuccess);

  return (
    <section className="flex flex-col gap-8 p-4 md:p-8">
      {searchQuery || dateQuery ? (
        <FieldListHeader title="Tempat olahraga" description="Tempat olahraga sesuai pencarianmu" />
      ) : (
        <FieldListHeader title={title} description={description} pathName={pathName} />
      )}

      {showLoading && <LoadingMessage />}
      {showError && <ErrorMessage />}
      {showFetching && <FetchingMessage />}
      {showSuccess &&
        (fieldsSuccess ? <FieldsList data={fieldsData} /> : <FieldsSearch data={searchData} />)}

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

function LoadingMessage() {
  return <p className="my-10 text-center text-lg">Loading...</p>;
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
      data: FieldItemProps[] | undefined;
    }>;
  };
}

function FieldsList({data}: FieldsListProps) {
  return (
    <div
      className={
        data && data.pages.length > 0 ? 'grid grid-cols-2 gap-4 lg:grid-cols-4' : 'my-10 h-full'
      }
    >
      {data && data.pages.length > 0 ? (
        data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data?.map(field => (
              <FieldItem
                key={field.id}
                id={field.id}
                image={field.image}
                is_indoor={field.is_indoor}
                location={field.location}
                name={field.name}
                price_per_hour={field.price_per_hour}
              />
            ))}
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-lg font-semibold">No fields found.</p>
      )}
    </div>
  );
}

interface FieldsSearchProps {
  data: FieldItemProps[];
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
        data.map(({id, is_indoor, location, name, price_per_hour, image}) => (
          <FieldItem
            id={id}
            image={image}
            key={id}
            is_indoor={is_indoor}
            location={location}
            name={name}
            price_per_hour={price_per_hour}
          />
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
