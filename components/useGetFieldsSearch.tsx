import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

type SportFieldProps = {
  id: number;
  name: string;
  image: string;
  date: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
};

export default function useGetFieldsSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const dateQuery = searchParams.get("date") || "";

  const getFields = async () => {
    const response = await fetch("http://localhost:3000/field");

    if (!response.ok) {
      throw new Error("Fetching Error");
    }

    const result: SportFieldProps[] = await response.json();

    const filteredFields = result.filter((field) => {
      const matchesQuery =
        field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = dateQuery
        ? format(field.date, "yyyy-MM-dd") === dateQuery
        : true;

      return matchesQuery && matchesDate;
    });

    return filteredFields;
  };

  return useQuery({
    queryKey: ["field", searchQuery, dateQuery],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
