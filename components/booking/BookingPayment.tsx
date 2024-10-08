'use client';

import {useEffect, useState} from 'react';
import { Skeleton } from '../ui/skeleton';

const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';

interface BookingPaymentProps {
  token: string;
  isLoading: boolean;
  isError: boolean
}

export default function BookingPayment({token, isLoading, isError}: BookingPaymentProps) {
  if (isLoading) {
    <Skeleton className='h-[774px] bg-white'  />
  }

  if (isError) {
    <div>error</div>
  }

  const [snapShown, setSnapShown] = useState<boolean>(false);
  const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    function handleSnap() {
      if (!snapShown && window.snap) {
        window.snap.embed(token, {
          embedId: 'snap-container',
        });

        setSnapShown(true);
      }
    }

    script.addEventListener('load', handleSnap);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleSnap);
      document.body.removeChild(script);
    };
  }, [clientKey, snapShown, token]);

  return (
    <div
      id="snap-container"
      className="order-2 h-[774px] w-full rounded-xl bg-background lg:order-1"
    />
  );
}
