'use client';

import axios from 'axios';
import {useInfiniteQuery} from '@tanstack/react-query';
import {FieldItemProps} from '@/types';
import {usePathname} from 'next/navigation';

const API_URL = 'http://localhost:5000';

export default function useGetAllFields() {
  const pathName = usePathname();
  const limitParam = pathName !== '/' ? 8 : 4;

  async function getAllFields({pageParam = 0}) {
    try {
      const response = await axios.get(`${API_URL}/fields`, {
        params: {
          _start: pageParam,
          _limit: limitParam,
        },
      });

      const fields: FieldItemProps[] = response.data;

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
    queryKey: ['fields'],
    queryFn: getAllFields,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextPage,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
