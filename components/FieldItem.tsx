'use client';

import React from 'react';
import {formatNumber} from '@/libs/utils';
import {FieldItemProps} from '@/types';
import Image from 'next/image';
import {RiStarFill, RiTimeLine} from 'react-icons/ri';
import {useRouter} from 'next/navigation';
import {fieldImages} from '@/libs/constants';

const FieldItem: React.FC<FieldItemProps> = ({
  id,
  is_indoor,
  locations,
  name,
  ratingAvg,
  thumbnail,
  price_per_hour,
}) => {
  const router = useRouter();

  const address = locations && locations.length > 0 ? locations[0].address : 'Jakarta Pusat';

  return (
    <div
      className="h-full max-h-full rounded-xl border hover:-translate-y-1 hover:shadow-lg"
      onClick={() => router.push(`/fields/${id}`)}
    >
      <div className="relative flex h-56 w-full items-center justify-center">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="absolute w-full rounded-t-xl object-cover"
        />
        <h1 className="absolute bottom-0 left-0 z-auto rounded-tr-2xl bg-[#65558F] px-3 py-1 text-lg font-semibold text-white">
          4.6 Km
        </h1>
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
          <p className="text-sm text-muted-foreground">{address}</p>
          <div className="flex items-center gap-2">
            <RiStarFill className="h-6 w-6 text-amber-400" />
            <p className="text-sm text-muted-foreground">
              {parseFloat(ratingAvg.toFixed(1))}
              <span> (10 review)</span>
            </p>
          </div>
        </div>
        <div className="pt-5">
          <p className="text-xs text-muted-foreground">Mulai dari</p>
          <s className="text-base font-semibold text-muted-foreground">Rp 1.000.000</s>
          <p className="text-lg font-semibold">
            Rp {formatNumber(500000)}
            <span className="text-base font-semibold text-muted-foreground">/hours</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldItem;
