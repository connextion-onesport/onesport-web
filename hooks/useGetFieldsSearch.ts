import {FieldItemProps} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {format} from 'date-fns';
import {useSearchParams} from 'next/navigation';

export default function useGetFieldsSearch() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const dateQuery = searchParams.get('date') || '';

  const getFields = async () => {
    const response = await fetch('http://localhost:5000/fields');

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    const result: FieldItemProps[] = await response.json();

    const filteredFields = result.filter(field => {
      const matchesQuery =
        field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = dateQuery
        ? field.date !== undefined && format(new Date(field.date), 'yyyy-MM-dd') === dateQuery
        : true;

      return matchesQuery && matchesDate;
    });

    return filteredFields;
  };

  return useQuery({
    queryKey: ['field', searchQuery, dateQuery],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
