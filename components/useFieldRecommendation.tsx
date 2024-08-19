import {useQuery} from '@tanstack/react-query';

type SportFieldProps = {
  id: number;
  name: string;
  image: string;
  date: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
};
export default function useFieldRecommendation() {
  const getFields = async () => {
    const response = await fetch('http://localhost:3000/field?_start=0&_limit=4');

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    const result: SportFieldProps[] = await response.json();

    return result;
  };

  return useQuery({
    queryKey: ['field'],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
