'use client';

import {getUser} from '@/actions/auth';
import {getBookingPrice, getPaymentToken} from '@/actions/payment';
import {BookingPayment, BookingPricing} from '@/components/booking';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {PiArrowLeft} from 'react-icons/pi';

export default function PaymentPage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const id = user?.id as string;

  const {data: token} = useQuery({
    queryKey: ['token', id],
    queryFn: () => getPaymentToken({id}),
  });

  const {data: price} = useQuery({
    queryKey: ['price', id],
    queryFn: () => getBookingPrice({id}),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-2 py-6 md:px-6 md:py-10">
      <Link
        href="/user/venues"
        className="flex items-center self-start whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <PiArrowLeft className="mr-1 h-4 w-4" />
        Kembali
      </Link>

      <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <BookingPayment token={token as string} />
        </div>

        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <BookingPricing price={price} />
        </div>
      </div>
    </div>
  );
}
