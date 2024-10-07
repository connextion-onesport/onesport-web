'use client';

import {getUser} from '@/actions/auth';
import {getAllBookingFields} from '@/actions/payment';
import {getVenueById} from '@/actions/venue';
import {BookingReview, BookingForm} from '@/components/booking';
import {usePaymentStore} from '@/providers/zustand-provider';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function ReviewPage() {
  const {venueId, setVenueId} = usePaymentStore(state => state);
  const router = useRouter();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const userId = user?.id as string;

  const {
    data: fields,
    isLoading: fieldsLoading,
    isError: fieldsError,
  } = useQuery({
    queryKey: ['fields', userId],
    queryFn: () => getAllBookingFields(userId),
  });

  const id = fields?.[0]?.venue?.id as string;

  const {
    data: venue,
    isLoading: venueLoading,
    isError: venueError,
  } = useQuery({
    queryKey: ['venue', id],
    queryFn: () => getVenueById({id}),
  });

  useEffect(() => {
    if (id) {
      setVenueId(id);
    }
  }, [id, setVenueId]);

  useEffect(() => {
    if (fields?.length === 0) {
      router.push(`/venues/${venueId}`);
    }
  }, [fields, router, venueId]);

  return (
    <div className="mx-auto grid h-full w-full max-w-screen-xl grid-cols-1 gap-4 px-2 py-8 lg:grid-cols-2 lg:px-8">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        <BookingForm
          fields={fields}
          user={user}
          isLoading={fieldsLoading || userLoading}
          isError={fieldsError || userError}
        />
      </div>

      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <BookingReview
          fields={fields}
          venue={venue}
          isLoading={fieldsLoading || venueLoading}
          isError={fieldsError || venueError}
        />
      </div>
    </div>
  );
}
