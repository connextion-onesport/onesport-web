'use client';

import {useQuery} from '@tanstack/react-query';
import {getVenueById} from '@/actions/venue';
import {
  VenueBreadcrumb,
  VenueImages,
  VenueDetail,
  VenueBooking,
  VenueReview,
  VenueRecommendation,
  VenueMobileButton,
  VenueBreadcrumbSkeleton,
  VenueImagesSkeleton,
  VenueDetailSkeleton,
  VenueBookingSkeleton,
  VenueReviewSkeleton,
  VenueRecommendationSkeleton,
} from '@/components/venue';
import {getUser} from '@/actions/auth';

export default function VenuePage({params}: {params: {slug: string}}) {
  const id = params.slug;

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById({id}),
    enabled: !!id,
  });

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 p-4 pb-10 pt-8 md:p-8">
        <VenueBreadcrumbSkeleton />
        <VenueImagesSkeleton />
        <VenueDetailSkeleton />
        <VenueBookingSkeleton />
        <VenueReviewSkeleton />
        <VenueRecommendationSkeleton />
      </main>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 p-4 pb-10 pt-8 md:p-8">
        <VenueBreadcrumb data={data?.name} />
        <VenueImages venues={data?.images} />
        <VenueDetail data={data} />
        <VenueBooking fields={data?.fields} user={user} />
        <VenueReview data={data} />
        <VenueRecommendation />
      </main>

      <VenueMobileButton data={data} />
    </>
  );
}
