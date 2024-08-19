import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useState} from 'react';

type SportFieldProps = {
  id: string;
  name: string;
  image: string;
  date: string;
  price_per_hour: number;
  is_indoor: boolean;
  location: string;
};
export default function useVenueDetails() {
  const params = useParams<{slug: string}>();
  const getFields = async () => {
    const response = await fetch(`http://localhost:3000/field/${params.slug}`);

    if (!response.ok) {
      throw new Error('Fetching Error');
    }

    const result: SportFieldProps = await response.json();

    console.log(result);
    return result;
  };

  return useQuery({
    queryKey: ['field', params.slug],
    queryFn: getFields,
    refetchOnWindowFocus: false,
  });
}
