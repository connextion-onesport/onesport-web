'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Button} from '../ui/button';

import {updatePaymentStatus} from '@/actions/payment';

import {differenceInSeconds} from 'date-fns';
import {formatTime} from '@/libs/utils';

import Link from 'next/link';

import {PiArrowClockwise, PiCheckFatFill, PiHourglassHighFill, PiXBold} from 'react-icons/pi';

interface StatusHeaderProps {
  data: any;
}

interface UpdatePaymentStatusProps {
  id: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';
}

export default function StatusHeader({data}: StatusHeaderProps) {
  const {status, expiryTime, id} = data;
  const venue = data.bookings[0].venue;

  const queryClient = useQueryClient();

  const {mutateAsync: updatePaymentStatusMutation} = useMutation({
    mutationFn: (payment: UpdatePaymentStatusProps) => updatePaymentStatus(payment),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['payment', id]});
    },
  });

  const expiryDate = new Date(expiryTime);
  const currentTime = new Date();
  const initialTimeLeft = differenceInSeconds(expiryDate, currentTime);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft > 0 ? initialTimeLeft : 0);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      updatePaymentStatusMutation({id, status: 'FAILED'});
    }
  }, [timeLeft, updatePaymentStatusMutation, id]);

  return (
    <div className="flex w-full flex-col justify-between gap-6 px-6 py-8 md:flex-row md:gap-8 md:px-8 md:py-10">
      {status === 'SUCCESS' && <StatusSuccess id={venue.id} />}
      {status === 'PENDING' && <StatusPending id={id} expiryTime={timeLeft} />}
      {status === 'FAILED' && <StatusFailed id={venue.id} />}
      {status === 'REFUNDED' && <StatusRefunded id={venue.id} />}
    </div>
  );
}

function StatusSuccess({id}: {id: string}) {
  return (
    <>
      <div className="flex aspect-square h-28 w-28 shrink-0 grow-0 items-center justify-center rounded-full bg-green-500">
        <PiCheckFatFill className="h-16 w-16 text-white" />
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold md:text-xl">Pembayaran Berhasil 🎉</h2>

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground md:text-base">Dibayar pada</p>
            <p className="text-sm font-medium md:text-base">23 December 2021, 21:13 WIB</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <Button variant="secondary" asChild className="rounded-full">
            <Link href={`/venues/${id}`}>
              <PiArrowClockwise className="mr-2 h-5 w-5" />
              Sewa Lagi Sekarang
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function StatusPending({id, expiryTime}: {id: string; expiryTime: number}) {
  return (
    <>
      <div className="flex aspect-square h-28 w-28 shrink-0 grow-0 items-center justify-center rounded-full bg-yellow-400">
        <PiHourglassHighFill className="h-16 w-16 text-white" />
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold md:text-xl">Menunggu Pembayaran 💳</h2>

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground md:text-base">Selesaikan dalam:</p>
            <p className="text-sm font-medium md:text-base">{formatTime(expiryTime)}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href={`/booking/status/${id}`}>
              <PiArrowClockwise className="mr-2 h-5 w-5" />
              Perbarui Status
            </Link>
          </Button>

          <Button asChild>
            <Link href="/booking/payment">Bayar Sekarang</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function StatusFailed({id}: {id: string}) {
  return (
    <>
      <div className="flex aspect-square h-28 w-28 shrink-0 grow-0 items-center justify-center rounded-full bg-red-500">
        <PiXBold className="h-16 w-16 text-white" />
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold md:text-xl">Pembayaran Gagal ❌</h2>

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground md:text-base">Kadaluarsa pada</p>
            <p className="text-sm font-medium md:text-base">23 December 2021, 21:13 WIB</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <Button variant="secondary" asChild className="rounded-full">
            <Link href={`/venues/${id}`}>
              <PiArrowClockwise className="mr-2 h-5 w-5" />
              Coba Lagi Yuk!
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function StatusRefunded({id}: {id: string}) {
  return (
    <>
      <div className="flex aspect-square h-28 w-28 shrink-0 grow-0 items-center justify-center rounded-full bg-blue-500">
        <PiCheckFatFill className="h-16 w-16 text-white" />
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold md:text-xl">Pembayaran Dikembalikan 💸</h2>

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground md:text-base">Refund diterima pada</p>
            <p className="text-sm font-medium md:text-base">23 December 2021, 21:13 WIB</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <Button variant="secondary" asChild className="rounded-full">
            <Link href={`/venues/${id}`}>
              <PiArrowClockwise className="mr-2 h-5 w-5" />
              Coba Sewa Lagi
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
