'use client';

import {getUser} from '@/actions/auth';
import {getBookingPrice, getPaymentToken} from '@/actions/payment';
import {BookingPayment, BookingPricing} from '@/components/booking';
import {useQuery} from '@tanstack/react-query';

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

  console.log('price', price);
  console.log('token', token);

  return (
    <div className="mx-auto grid h-full w-full max-w-screen-xl grid-cols-1 gap-4 px-2 py-8 lg:grid-cols-2 lg:px-8">
      <div className="order-2 flex flex-col gap-4 lg:order-1">
        <BookingPayment token={token} />
      </div>

      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <BookingPricing price={price} />
      </div>
    </div>
  );
}
