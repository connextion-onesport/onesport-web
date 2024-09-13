import {API_URL} from '@/libs/constants';
import {FieldItemProps} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';

export default function useGetFieldDetails() {
  const params = useParams<{slug: string}>();
  const getFields = async () => {
    const response = await fetch(`${API_URL}/venues/${params.slug}`);

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    const result: any = await response.json();

    return result;
  };

  return useQuery({
    queryKey: ['field', params.slug],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
