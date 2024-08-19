'use client';
import SportFieldItem from './SportFieldItem';
import {useSearchParams} from 'next/navigation';
import useGetFields from './useGetFields';
import SportFieldsSearch from './SportFieldListSearch';
import {Button} from './ui/button';
import React from 'react';
import {useState} from 'react';

const SportFields = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const dateQuery = searchParams.get('date') || '';

  const {
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetFields();

  if (isLoading) {
    return <p className="my-10 text-center text-lg">Loading...</p>;
  }

  return (
    <>
      {searchQuery || dateQuery ? <SportFieldsSearch /> : ''}
      <div className="py-4">
        <h1 className="py-3 text-3xl font-bold">Rekomendasi Tempat Olahraga</h1>
        <p className="text-lg font-medium text-muted-foreground">
          Daftar tempat olahraga yang ada di onesport
        </p>
      </div>
      {isError && (
        <p className="text-center font-semibold">There was an error processing your request</p>
      )}
      {isFetching && <p className="my-5 text-center text-lg font-semibold">Fetching data...</p>}
      {isSuccess && (
        <section
          className={
            data && data.pages.length > 0
              ? 'grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-10'
              : 'my-10 h-full'
          }
        >
          {data && data.pages.length > 0 ? (
            data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map(({id, is_indoor, location, name, price_per_hour, image}) => (
                  <SportFieldItem
                    id={id}
                    image={image}
                    key={id}
                    is_indoor={is_indoor}
                    location={location}
                    name={name}
                    price_per_hour={price_per_hour}
                  />
                ))}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-lg font-semibold">No fields found.</p>
          )}
        </section>
      )}
      <div className="flex p-4">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant="outline"
          className="mx-auto items-center rounded-full text-primary"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </div>
    </>
  );
};

export default SportFields;
