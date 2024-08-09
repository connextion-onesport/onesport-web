"use client";
import SportFieldItem from "./SportFieldItem";
import { useSearchParams } from "next/navigation";
import useGetFieldsSearch from "./useGetFieldsSearch";

const SportFieldsSearch = () => {
  const searchParams = useSearchParams();

  const { data, isError, isLoading, isFetching, isSuccess } =
    useGetFieldsSearch();

  if (isLoading) {
    return <p className="my-10 text-center text-lg">Loading...</p>;
  }

  return (
    <>
      <div className="py-4">
        <h1 className="py-3 text-3xl font-bold">
          Tempat olahraga yang kamu cari
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          Tempat olahraga yang kamu cari pada pencarian
        </p>
      </div>
      {isError && (
        <p className="text-center font-semibold">
          There was an error processing your request
        </p>
      )}
      {isFetching && (
        <p className="my-5 text-center text-lg font-semibold">
          Fetching data...
        </p>
      )}
      {isSuccess && (
        <div
          className={
            data && data.length > 0
              ? "grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-10"
              : "my-10 h-full"
          }
        >
          {data && data.length > 0 ? (
            data.map(
              ({ id, is_indoor, location, name, price_per_hour, image }) => (
                <SportFieldItem
                  id={id}
                  image={image}
                  key={id}
                  is_indoor={is_indoor}
                  location={location}
                  name={name}
                  price_per_hour={price_per_hour}
                />
              ),
            )
          ) : (
            <p className="text-center text-lg font-semibold">
              No fields found.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default SportFieldsSearch;
