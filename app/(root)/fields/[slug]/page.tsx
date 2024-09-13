'use client';

import useGetFieldDetails from '@/hooks/useGetFieldDetails';
import {Dispatch, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {fasilitasDummy} from '@/libs/constants';
import {ratingAndReview} from '@/libs/constants';
import BookingField from '@/components/BookingField';
import Image from 'next/image';
import useGetFieldRecommendation from '@/hooks/useGetFieldRecommendation';
import FieldItem from '@/components/FieldItem';
import {formatNumber, scrollIntoTheView} from '@/libs/utils';
import {Separator} from '@/components/ui/separator';
import {FieldItemProps} from '@/types';
import Link from 'next/link';

export default function DetailPage() {
  const {data, isLoading, isError, isSuccess} = useGetFieldDetails();
  const ref = useRef<HTMLDivElement | null>(null);

  const fieldData = data?.data ?? data;

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <FieldDetails
        data={fieldData}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        handleClick={handleClick}
      />
      <BookingField ref={ref} />
      <ReviewAndRating />
      <FieldRecommendation />
      <BookMobileButton data={data} />
    </div>
  );
}

interface FieldDetailsProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  handleClick: () => void;
}

function FieldDetails({data, isLoading, isError, isSuccess, handleClick}: FieldDetailsProps) {
  const address =
    data?.locations && data?.locations.length > 0 ? data?.locations[0].address : 'Jakarta Pusat';

  return (
    <>
      {isError && <div className="">error</div>}
      {isLoading && (
        <div className="flex h-screen">
          {' '}
          <p className="m-auto text-center">Loading...</p>
        </div>
      )}
      {isSuccess && (
        <div className="flex flex-col gap-8 px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Image
              src="/images/field1.svg"
              alt={data?.name || 'Field Image'}
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-lg object-cover"
            />
            <div className="grid w-full grid-cols-4 gap-2 md:grid-cols-2">
              <Image
                src="/images/field1.svg"
                alt={data?.name || 'Field Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-lg object-cover"
              />
              <Image
                src="/images/field1.svg"
                alt={data?.name || 'Field Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-lg object-cover"
              />
              <Image
                src="/images/field1.svg"
                alt={data?.name || 'Field Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-lg object-cover"
              />
              <Image
                src="/images/field1.svg"
                alt={data?.name || 'Field Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* VENUE INFORMATION */}
          <div className="rounded-lg border p-4 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row md:gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{data?.name}</h1>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <p className="w-fit rounded-full bg-[#65558F] px-2 py-1 text-base font-medium text-white">
                    4.8 km
                  </p>
                  <p className="content-center text-base font-semibold text-muted-foreground">
                    {address}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Image src="/images/icons/clock.svg" alt="clock icon" width={15} height={15} />
                  <p className="text-sm text-muted-foreground">Open 04.00 - 20.00</p>
                </div>
                <div className="flex w-fit gap-1 rounded-full bg-muted px-2 py-1">
                  <Image src="/images/icons/soccer.svg" alt="soccer icon" width={12} height={12} />
                  <p className="text-sm text-muted-foreground">Soccer</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">Harga dari</p>
                <p className="text-lg font-semibold">
                  Rp{formatNumber(500000)}{' '}
                  <span className="text-sm font-semibold text-muted-foreground">/hours</span>
                </p>
                <Button className="w-fit" onClick={handleClick}>
                  Book Field
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1 rounded-lg border p-4">
                <h2 className="text-lg font-semibold">{data?.name} Informasi</h2>
                <div className="flex">
                  <Image src="/images/icons/star.svg" width={16} height={16} alt="star icon" />
                  <p className="text-sm text-muted-foreground">
                    {data?.ratingAvg} <span>(10 review)</span>
                  </p>
                </div>

                <Separator className="my-1" />

                <p className="line-clamp-4 text-pretty text-sm text-muted-foreground">
                  Gelora Bung Karno (GBK) adalah sebuah kompleks olahraga besar yang terletak di
                  kawasan Senayan, Jakarta, Indonesia. Kompleks ini dinamai sesuai dengan nama
                  Presiden pertama Indonesia, Soekarno, yang memiliki julukan `Bung Karno.` GBK
                  dibangun untuk menyelenggarakan...
                </p>

                <Button variant="ghost" className="text-primary">
                  Load more
                </Button>
              </div>

              <div className="flex flex-col gap-1 rounded-lg border p-4">
                <h2 className="text-lg font-semibold">Fasilitas {data?.name} </h2>
                <hr className="my-2" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {fasilitasDummy.map(facility => (
                    <div className="my-auto flex self-center" key={facility.name}>
                      <Image
                        src={facility.icon}
                        alt={facility.name}
                        width={18}
                        height={18}
                        className="mr-2"
                      />
                      <p className="text-sm">{facility.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ReviewAndRating() {
  return (
    <section className="flex p-4 md:p-8">
      <div className="flex flex-col gap-4 overflow-hidden rounded-lg border p-4 md:p-8">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Review & Rating</h2>
            <Button variant="ghost" className="text-primary">
              See All
            </Button>
          </div>
          <p className="text-base font-medium text-muted-foreground">
            Apa kata orang yang telah menyewa tempat ini!
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex items-center justify-center border-b p-4 md:border-b-0 md:border-r md:p-8">
            <div className="flex flex-col">
              <div className="mx-auto flex h-20 w-20 justify-center rounded-full bg-muted">
                <p className="h-14 w-14 content-center self-center rounded-full bg-primary p-1 text-center text-2xl font-semibold text-white">
                  4.6
                </p>
              </div>
              <p className="whitespace-nowrap text-center text-sm font-semibold text-primary">
                Bagus Sekali
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-auto">
            {ratingAndReview.map(item => (
              <div className="flex min-w-64 flex-col rounded-lg border p-4" key={item.id}>
                <div className="flex w-full justify-between">
                  <div className="flex gap-2">
                    <Image
                      src="/images/icons/profilepic.svg"
                      alt="profile picture"
                      width={40}
                      height={40}
                    />

                    <div className="flex flex-col whitespace-nowrap">
                      <p className="text-sm font-semibold">Faza Abdillah</p>
                      <p className="text-xs text-muted-foreground">15 Juli 2024</p>
                    </div>
                  </div>

                  <div className="flex whitespace-nowrap">
                    <Image src="/images/icons/star.svg" alt="star icon" width={25} height={25} />
                    <p className="self-center text-base text-muted-foreground">4.6</p>
                  </div>
                </div>

                <Separator className="my-2" />

                <p className="line-clamp-3 text-sm text-muted-foreground">
                  “Enak banget tempatnya, cocok main bareng teman teman” “Enak banget tempatnya,
                  cocok main bareng teman teman” “Enak banget tempatnya, cocok main bareng teman
                  teman” “Enak banget tempatnya, cocok main bareng teman teman”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldRecommendation() {
  const {data, isError, isSuccess} = useGetFieldRecommendation();

  return (
    <section className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Rekomendasi tempat lainnya</h2>
        <p className="text-base font-medium text-muted-foreground">
          Rekomendasi tempat yang mirip dengan Gelora Bung Karno
        </p>
      </div>

      {isError && (
        <p className="text-center font-semibold">There was an error processing your request</p>
      )}

      {isSuccess && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map(({id, is_indoor, name, price_per_hour, thumbnail, ratingAvg, locations}) => (
            <FieldItem
              id={id}
              thumbnail={thumbnail}
              key={id}
              is_indoor={is_indoor}
              locations={locations}
              name={name}
              ratingAvg={ratingAvg}
              price_per_hour={price_per_hour}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface BookMobileButtonProps {
  data: FieldItemProps | undefined;
}

function BookMobileButton({data}: BookMobileButtonProps) {
  return (
    <div className="fixed bottom-0 z-10 flex w-full flex-col gap-4 border-t bg-background p-6 md:hidden">
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">Harga dari</p>
        <p className="text-lg font-semibold">
          Rp{data?.price_per_hour !== undefined ? formatNumber(data?.price_per_hour) : '-'}{' '}
          <span className="text-sm font-semibold text-muted-foreground">/hours</span>
        </p>
      </div>

      <Button>Book Field</Button>
    </div>
  );
}
