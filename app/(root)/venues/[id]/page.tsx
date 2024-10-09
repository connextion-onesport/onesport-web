'use client';

import {dehydrate, HydrationBoundary, useQueryClient} from '@tanstack/react-query';
import {getVenueById} from '@/actions/venue';
import {getUser} from '@/actions/auth';
import { VenuePage } from '@/pages';

export default function Page({params}: {params: {id: string}}) {
  const id = params.id;

  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById({id}),
  });

  queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <VenuePage params={params} />
    </HydrationBoundary>
  );
}
