'use client';

import {formatNumber} from '@/libs/utils';
import {FieldItemProps} from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {RiStarFill, RiTimeLine} from 'react-icons/ri';
import {useRouter} from 'next/navigation';

export default function FieldItem({
  id,
  is_indoor,
  location,
  name,
  ratingAvg,
  image,
  price_per_hour,
}: FieldItemProps) {
  const router = useRouter();

  return (
    <div
      className="h-full max-h-full rounded-xl border"
      onClick={() => router.push(`/fields/${id}`)}
    >
      <div className="relative flex h-48 w-full items-center justify-center">
        <Image
          src="/images/img_bicycle.webp"
          alt={name}
          fill
          className="absolute w-full rounded-t-xl object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-col gap-2">
          <p className="line-clamp-1 text-lg font-semibold">{name}</p>
          <div className="flex">
            <p className="mr-2 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
              {is_indoor ? 'Indoor' : 'Outdoor'}
            </p>
            <div className="flex items-center gap-2">
              <RiTimeLine className="h-4 w-4 text-muted-foreground" />
              <p className="self-center text-xs text-muted-foreground">04.00 - 20.00</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{location}</p>
          <div className="flex items-center gap-2">
            <RiStarFill className="h-6 w-6 text-amber-400" />
            <p className="text-sm text-muted-foreground">
              {ratingAvg}
              <span> (10 review)</span>
            </p>
          </div>
        </div>
        <div className="pt-5">
          <s className="text-base font-semibold text-muted-foreground">Rp 1.000.000</s>
          <p className="text-lg font-semibold">
            Rp {formatNumber(price_per_hour)}
            <span className="text-base font-semibold text-muted-foreground">/hours</span>
          </p>
        </div>
      </div>
    </div>
  );
}
