import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type SportFieldProps = {
  id: number;
  name: string;
  image: string;
  date: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
};

export default function useGetFields() {
  // const getFields = async () => {
  //   const response = await fetch(
  //     "http://localhost:3000/field?_start=0&_limit=8",
  //   );
  //   const result: SportFieldProps[] = await response.json();

  //   if (!response.ok) {
  //     throw new Error("Fetching Error");
  //   }

  //   return result;
  // };

  const getFields = async ({ pageParam = 0 }) => {
    const response = await fetch(
      `http://localhost:3000/field?_start=${pageParam}&_limit=8`,
    );
    if (!response.ok) {
      throw new Error("Fetching Error");
    }
    const result: SportFieldProps[] = await response.json();
    return {
      data: result,
      nextPage: result.length === 8 ? pageParam + 8 : undefined,
    };
  };

  return useInfiniteQuery({
    queryKey: ["field"],
    queryFn: getFields,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });
}
