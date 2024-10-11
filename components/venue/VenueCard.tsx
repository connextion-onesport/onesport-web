'use client';

import React, {useEffect, useState} from 'react';
import {formatNumber, getDistanceFromLatLonInKm} from '@/libs/utils';
import {FieldItemProps} from '@/types';
import Image from 'next/image';
import {PiStarFill, PiClock} from 'react-icons/pi';

import {Carousel, CarouselContent, CarouselItem, type CarouselApi} from '@/components/ui/carousel';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VenueCard({
  id,
  isIndoor,
  location,
  latitude,
  longitude,
  name,
  ratingAvg,
  reviewCount,
  images,
  openHours,
  minPrice,
  status,
  paymentId,
}: FieldItemProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const thumbnails = images?.map(image => image.image);

  const distance =
    location?.latitude && location?.longitude
      ? getDistanceFromLatLonInKm(latitude, longitude, location.latitude, location.longitude)
      : 0;

  return (
    <div
      onClick={() => {
        if (status === 'PENDING') {
          router.push('/booking/review');
        } else if (status === "CONFIRMED") {
          router.push(`/booking/status/${paymentId}`);
        } else {
          router.push(`/venues/${id}`);
        }
      }}
      className="h-full max-h-full cursor-pointer rounded-xl border hover:shadow-sm hover:transition hover:duration-700 hover:ease-in-out"
    >
      <div className="relative flex w-full">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {thumbnails?.map((thumbnail, index) => (
              <CarouselItem key={index} >
                <div className="relative flex h-56 w-full items-center justify-center rounded-t-xl">
                  <Image
                    src={thumbnail}
                    alt={name}
                    fill
                    className="absolute w-full rounded-t-xl object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {status === "PENDING" && (
          <div className="absolute top-2 left-2 flex items-center justify-center rounded-full bg-yellow-500 px-2 py-1">
            <p className="text-xs text-white">Pending</p>
          </div>
        )}

        {status === "CONFIRMED" && (
          <div className="absolute top-2 left-2 flex items-center justify-center rounded-full bg-green-500 px-2 py-1">
            <p className="text-xs text-white">Konfirmasi</p>
          </div>
        )}

        {status === "CANCELLED" && (
          <div className="absolute top-2 left-2 flex items-center justify-center rounded-full bg-red-500 px-2 py-1">
            <p className="text-xs text-white">Dibatalkan</p>
          </div>
        )}

        <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-secondary/50 px-2 py-1 text-xs text-white">
          <p className="text-xs text-white">
            {currentSlide}/{count}
          </p>
        </div>

        {distance > 0 && latitude !== 0 && longitude !== 0 && (
          <div className="absolute bottom-0 left-0 flex h-8 items-center justify-center rounded-tr-xl bg-[#655581] px-3 py-1">
            <p className="text-xs text-white">{distance.toFixed(1)} km</p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-col gap-2">
          <p className="line-clamp-1 text-lg font-semibold">{name}</p>

          <div className="flex flex-wrap gap-2">
            {isIndoor === 'Both' ? (
              <p className="mr-2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                Indoor & Outdoor
              </p>
            ) : (
              <p className="mr-2 whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                {isIndoor === 'Indoor' ? 'Indoor' : 'Outdoor'}
              </p>
            )}

            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="flex aspect-square h-5 w-5 items-center justify-center">
                <PiClock className="h-full w-full text-muted-foreground" />
              </span>

              <p className="text-sm text-muted-foreground">{openHours}</p>
            </div>
          </div>

          <p className="line-clamp-1 text-sm text-muted-foreground">{`${location?.subDistrict}, ${location?.city}`}</p>

          <div className="flex items-center">
            <span className="flex aspect-square h-5 w-5 items-center justify-center">
              <PiStarFill className="h-full w-full text-amber-400" />
            </span>
            <p className="ml-1 text-sm text-muted-foreground">{ratingAvg}</p>
            <p className="ml-2 text-sm text-muted-foreground">
              {reviewCount === 1 ? `(${reviewCount} Review)` : `(${reviewCount} Reviews)`}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">Mulai dari</p>
          <span className="flex items-center gap-1">
            <p className="text-lg font-bold">Rp{formatNumber(minPrice)}</p>
            <p className="text-sm font-medium">/jam</p>
          </span>
        </div>
      </div>
    </div>
  );
}
