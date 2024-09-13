import { FieldItemProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function useGetFieldsSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || ''; // Get search query

  const getFields = async () => {
    const response = await fetch('http://cymint.cloud:3000/api/venues'); 

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    let result: any = await response.json();

    console.log(result)

    if (searchQuery) {
      result = result.data.filter((field: any) => {
        const matchesQuery =
          field.name.toLowerCase().includes(searchQuery.toLowerCase())
          return matchesQuery; 
        });
    }
    

    return result; 
  };

  return useQuery({
    queryKey: ['fields', searchQuery],
    queryFn: getFields, 
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
}
 