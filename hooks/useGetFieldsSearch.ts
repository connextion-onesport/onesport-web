import { FieldItemProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function useGetFieldsSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || ''; // Get search query

  const getFields = async () => {
    const response = await fetch('http://localhost:5000/fields'); // Fetch fields from the API

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    let result: FieldItemProps[] = await response.json(); // Get all fields as an array

    // Filter fields based on the search query (if search query exists)
    if (searchQuery) {
      result = result.filter((field) => {
        const matchesQuery =
          field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          field.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesQuery; // Filtered fields by name or location match
      });
    }

    return result; // Return the sorted and filtered fields
  };

  return useQuery({
    queryKey: ['fields', searchQuery], // Update query key to include both search and order
    queryFn: getFields, // Function to get and filter the fields
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
}
 