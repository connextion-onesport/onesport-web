'use client';

import {useQuery} from '@tanstack/react-query';
import {getVenueById} from '@/actions/venue';
import {
  VenueBreadcrumb,
  VenueImages,
  VenueDetail,
  VenueBooking,
  VenueReview,
  VenueBreadcrumbSkeleton,
  VenueImagesSkeleton,
  VenueDetailSkeleton,
  VenueBookingSkeleton,
  VenueReviewSkeleton,
} from '@/components/venue';
import {getUser} from '@/actions/auth';

export default function VenuePage({params}: {params: {id: string}}) {
  const id = params.id;

  const {
    data: venue,
    isLoading: venueLoading,
    isError: venueError,
  } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById({id}),
    enabled: !!id,
  });

  const {data: user, isLoading: userLoading, isError: userError} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !!id,
  });

  const isLoading = venueLoading || userLoading;
  const isError = venueError || userError;

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 md:gap-8 px-2 pb-10 pt-8 md:p-8">
        <VenueBreadcrumbSkeleton />
        <VenueImagesSkeleton />
        <VenueDetailSkeleton />
        <VenueBookingSkeleton />
        <VenueReviewSkeleton />
      </main>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
      <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 md:gap-8 px-2 pb-10 pt-8 md:p-8">
        <VenueBreadcrumb name={venue?.name} />
        <VenueImages data={venue} />
        <VenueDetail data={venue} />
        <VenueBooking fields={venue?.fields} user={user} />
        <VenueReview data={venue} />
      </main>
  );
}
