'use client';

import {getUser} from '@/actions/auth';
import {getUserVenues} from '@/actions/payment';
import {VenueList} from '@/components/venue';
import {bookingStatusNames} from '@/libs/constants';
import {usePaymentStore} from '@/providers/zustand-provider';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

export default function UserVenuesPage() {
  const {selectedStatus} = usePaymentStore(state => state);

  const queryClient = useQueryClient();

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
    data: venues,
    isLoading: venuesLoading,
    isError: venuesError,
  } = useQuery({
    queryKey: ['bookings', userId, selectedStatus],
    queryFn: () => getUserVenues({id: userId, status: selectedStatus}),
    enabled: !!userId,
  });

  useEffect(() => {
    bookingStatusNames.forEach(status => {
      const statusMap: {[key: string]: string} = {
        Semua: 'ALL',
        Pending: 'PENDING',
        Konfirmasi: 'CONFIRMED',
        Dibatalkan: 'CANCELLED',
      };

      const statusValue = statusMap[status];

      queryClient.prefetchQuery({
        queryKey: ['bookings', userId, statusValue],
        queryFn: () => getUserVenues({id: userId, status: statusValue}),
      });
    });
  }, [queryClient, selectedStatus, userId]);

  return (
    <main className="mx-auto mb-auto flex h-full w-full max-w-screen-2xl flex-col">
      <VenueList
        data={venues}
        isHeading={true}
        isCategory={false}
        isStatus={true}
        isLoading={userLoading || venuesLoading}
        isError={userError || venuesError}
        title="Pesanan Saya"
        description="Lihat semua pesanan yang telah Anda buat."
      />
    </main>
  );
}
