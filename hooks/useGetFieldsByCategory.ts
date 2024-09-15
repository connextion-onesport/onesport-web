import { FieldItemProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function useGetFieldsByCategory() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category') || '';
  const orderQuery = searchParams.get('order') || '';

  const getFieldsByCategory = async () => {
    try {
      let apiUrl = 'http://cymint.cloud:3000/api/venues';
      let params: any = { category: categoryQuery };

      // If ordering by highest rating, we need to fetch all results to sort them properly
      if (orderQuery === 'highest-rating') {
        params._limit = 1000; // Adjust this number based on your maximum expected results
      }

      const response = await axios.get(apiUrl, { params });

      let fields = response.data;

      // Apply client-side sorting if highest-rating is selected
      if (orderQuery === 'highest-rating') {
        fields.sort((a: FieldItemProps, b: FieldItemProps) => 
          (b.ratingAvg || 0) - (a.ratingAvg || 0)
        );
      }

      return fields;
    } catch (error) {
      console.error('Error fetching fields:', error);
      throw new Error('Failed to fetch fields. Please try again later.');
    }
  };

  return useQuery({
    queryKey: ['fields', categoryQuery, orderQuery],
    queryFn: getFieldsByCategory,
    refetchOnWindowFocus: false,
    enabled: !!categoryQuery,
  });
}