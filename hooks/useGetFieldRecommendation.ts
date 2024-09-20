import {API_URL} from '@/libs/constants';
import {FieldItemProps} from '@/types';
import {useQuery} from '@tanstack/react-query';

export default function useGetFieldRecommendation() {
  const getFields = async () => {
    const response = await fetch(`${API_URL}/venues?_start=0&_limit=4`);

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    const result: any = await response.json();

    // const limitedData = result.slice(0, 4);

    console.log(result)

    return result;
  };

  return useQuery({
    queryKey: ['field'],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
