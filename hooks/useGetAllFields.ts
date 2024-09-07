'use client';

import axios from 'axios';
import {useInfiniteQuery} from '@tanstack/react-query';
import {FieldItemProps} from '@/types';
import {usePathname, useSearchParams} from 'next/navigation';

const API_URL = 'http://localhost:5000';

export default function useGetAllFields() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const limitParam = pathName !== '/' ? 8 : 4;
  const orderQuery = searchParams.get('order') || ''
  const ratingQuery = searchParams.get('rating') || ''
  const categoryQuery = searchParams.get('category') || ''

  async function getAllFields({pageParam = 0}) {
    try {

      const response = await axios.get(`${API_URL}/fields`, {
        params: {
          _start: pageParam,
          _limit: limitParam,
        },
      });

      let fields: FieldItemProps[] = response.data;
      
    if (orderQuery === 'highest-price') {
      fields.sort((a, b) => b.price_per_hour - a.price_per_hour); // Sort by highest price first
    } else if (orderQuery === 'lowest-price') {
      fields.sort((a, b) => a.price_per_hour - b.price_per_hour); // Sort by lowest price first
      } else if(orderQuery === 'highest-rating') {
        fields.sort((a,b) => b.ratingAvg - a.ratingAvg)
      }
      
      if (ratingQuery) {
        const ratingThreshold = parseFloat(ratingQuery);
        fields = fields.filter((field) => {
          const ratingAvg = typeof field.ratingAvg === 'number' ? field.ratingAvg : 0;
          return ratingAvg >= ratingThreshold;
        });
      }

      if (categoryQuery) {
        fields = fields.filter((field) => field.category === categoryQuery);
      }

      return {
        data: fields,
        nextPage: fields.length === limitParam ? pageParam + limitParam : undefined,
      };
    } catch (error) {
      console.error('Error fetching fields:', error);
      throw new Error('Failed to fetch fields. Please try again later.');
    }
  }

  return useInfiniteQuery({
    queryKey: ['fields', orderQuery, ratingQuery, categoryQuery],
    queryFn: getAllFields,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPage,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
