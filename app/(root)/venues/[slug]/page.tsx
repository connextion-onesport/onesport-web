'use client';

import {useQuery} from '@tanstack/react-query';
import {getVenueById, getVenueRecommendation} from '@/actions/venue';
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

  const {data: venue, isLoading, isError} = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById({id}),
    enabled: !!id,
  });

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !!id,
  });

  const venueId = venue?.id;
  const fields = venue?.fields;
  const category = fields?.[0].category.name;

  const {data: recommendations} = useQuery({
    queryKey: ['recommendation', venueId, category],
    queryFn: () => getVenueRecommendation({id: venueId!, category: category!}),
    enabled: !!category && !!venueId,
  })

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
        <VenueBreadcrumb name={venue?.name} />
        <VenueImages venues={venue?.images} />
        <VenueDetail data={venue} />
        <VenueBooking fields={venue?.fields} user={user} />
        <VenueReview data={venue} />
        <VenueRecommendation data={recommendations} />
      </main>

      <VenueMobileButton data={venue} />
    </>
  );
}
