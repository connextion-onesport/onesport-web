'use client';

import {RiArrowRightSLine, RiStarFill} from 'react-icons/ri';
import {Separator} from '../ui/separator';
import {Button} from '../ui/button';
import {useLocationStore, useVenueStore} from '@/providers/zustand-provider';
import {
  formatNumber,
  getCategoryImage,
  getDistanceFromLatLonInKm,
  getReviewCount,
  getVenueFacilityImage,
} from '@/libs/utils';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Skeleton} from '../ui/skeleton';
import Image from 'next/image';

import {
  PiClock,
} from 'react-icons/pi';

interface VenueDetailProps {
  data: any;
}

export default function VenueDetail({data}: VenueDetailProps) {
  const {scrollToSection, showDetails, setShowDetails} = useVenueStore(state => state);
  const {latitude, longitude} = useLocationStore(state => state);

  const handleClick = () => {
    scrollToSection('booking-field');
  };

  const {
    name,
    ratingAvg,
    reviewCount,
    minPrice,
    openHours,
    facilities,
    description,
    location,
    fields,
  } = data;

  const categories = fields.map((field: {category: {name: string}}) => field.category.name);

  const uniqueCategories: string[] = [...new Set(categories as string[])];

  const distance =
    location?.latitude && location?.longitude
      ? getDistanceFromLatLonInKm(latitude, longitude, location.latitude, location.longitude)
      : 0;

  return (
    <>
      <section className="flex flex-col gap-4 md:gap-8 md:rounded-2xl md:border md:p-8">
        <div className="flex justify-between gap-8 rounded-lg border p-4 md:rounded-none md:border-none md:p-0">
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-xl font-bold sm:text-2xl">{name}</h1>

            {distance > 0 && latitude !== 0 && longitude !== 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center whitespace-nowrap rounded-full bg-[#655581] px-3 py-1">
                  <p className="text-sm text-white">{distance.toFixed(1)} km</p>
                </div>

                <p className="line-clamp-1 text-base">{`${location.subDistrict}, ${location.city}`}</p>
              </div>
            )}

            <div className="flex items-center">
              <span className="flex aspect-square h-6 w-6 items-center justify-center">
                <RiStarFill className="h-full w-full text-yellow-400" />
              </span>
              <p className="ml-1">{ratingAvg}</p>

              <Separator orientation="vertical" className="mx-2" />

              <p className="text-base">{getReviewCount(reviewCount)}</p>
            </div>

            <div className="flex cursor-pointer items-center gap-1 whitespace-nowrap">
              <span className="flex aspect-square h-6 w-6 items-center justify-center">
                <PiClock className="h-full w-full" />
              </span>

              <p className="text-base">Buka {openHours}</p>
            </div>

            <div className="flex items-center gap-2">
              {uniqueCategories.map((category: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex cursor-pointer items-center gap-1 rounded-full bg-secondary px-3 py-1 hover:bg-accent hover:text-accent-foreground">
                    <div className="relative flex aspect-square h-5 w-5 items-center justify-center">
                      <Image
                        src={getCategoryImage(category)}
                        alt={category}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm">{category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden w-full max-w-60 flex-col gap-4 md:flex">
            <div className="flex flex-col rounded-lg border border-primary p-4">
              <p className="text-base font-medium text-muted-foreground">Mulai dari</p>
              <p className="flex items-center gap-1 text-xl font-bold">
                Rp{formatNumber(minPrice)}
                <span className="text-base font-medium text-muted-foreground">/jam</span>
              </p>
            </div>

            <Button size="lg" onClick={handleClick}>
              Pilih Lapangan
            </Button>
          </div>
        </div>

        <Separator className='hidden md:block' />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              className="flex min-h-32 flex-col gap-4 rounded-lg border bg-secondary p-4"
              target="_blank"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Lokasi</h2>

                <span className="flex w-fit cursor-pointer items-center text-sm font-bold text-primary hover:text-blue-700 md:text-base">
                  Buka Peta
                  <RiArrowRightSLine className="h-4 w-4 md:h-6 md:w-6" />
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <p className="line-clamp-1">{location.address}</p>
              </div>
            </Link>

            <div className="flex min-h-32 flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Fasilitas</h2>

                <Button
                  variant="link"
                  onClick={() => setShowDetails(true)}
                  className="flex h-fit w-fit items-center rounded-none p-0 text-sm font-bold text-primary hover:text-blue-700 hover:no-underline md:text-base"
                >
                  Lihat Semua <RiArrowRightSLine className="h-4 w-4 md:h-6 md:w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {facilities.map((facility: {id: string; name: string}) => (
                  <div key={facility.id} className="flex items-start gap-2">
                    <span className="relative flex aspect-square h-5 w-5 shrink-0 grow-0 items-center justify-center">
                      <Image
                        src={getVenueFacilityImage(facility.name)}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                    </span>
                    <p className="line-clamp-2 leading-tight">{facility.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-32 flex-col justify-between gap-4 rounded-lg border p-4">
            <p className="line-clamp-4 text-pretty">{description}</p>

            <Button
              variant="link"
              onClick={() => setShowDetails(true)}
              className="flex h-fit w-fit items-center rounded-none p-0 text-sm font-bold text-primary hover:text-blue-700 hover:no-underline md:text-base"
            >
              Baca Semua <RiArrowRightSLine className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>
      </section>

      <VenueDetailDialog showDetails={showDetails} setShowDetails={setShowDetails} data={data} />
    </>
  );
}

interface VenueDetailDialogProps {
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  data: any;
}

function VenueDetailDialog({showDetails, setShowDetails, data}: VenueDetailDialogProps) {
  const {name, description, facilities} = data;
  return (
    <Dialog open={showDetails} onOpenChange={setShowDetails}>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 rounded-none p-0 md:h-fit md:max-w-3xl md:rounded-xl">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>{name}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>{description}</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <div className="flex h-full w-full flex-col gap-8 px-6 py-10">
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Deskripsi</p>
            <p className="text-pretty">{description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Fasilitas</p>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {facilities.map((facility: {id: string; name: string}) => (
                <div key={facility.id} className="flex items-start gap-2">
                  <span className="relative flex aspect-square h-5 w-5 shrink-0 grow-0 items-center justify-center">
                    <Image
                      src={getVenueFacilityImage(facility.name)}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                  </span>
                  <p className="line-clamp-2 leading-tight">{facility.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VenueDetailSkeleton() {
  return (
    <section className="flex flex-col gap-8 rounded-2xl border px-4 py-8 md:px-8">
      <div className="flex justify-between gap-8">
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-6 w-3/4 md:w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/5" />
        </div>

        <div className="hidden w-full max-w-60 flex-col gap-4 md:flex">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </section>
  );
}