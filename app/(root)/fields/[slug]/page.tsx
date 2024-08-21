'use client';

import useGetFieldDetails from '@/hooks/useGetFieldDetails';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {fasilitasDummy} from '@/libs/constants';
import {ratingAndReview} from '@/libs/constants';
import BookingField from '@/components/BookingField';
import Image from 'next/image';
import useGetFieldRecommendation from '@/hooks/useGetFieldRecommendation';
import FieldItem from '@/components/FieldItem';
import {formatNumber} from '@/libs/utils';

export default function BookingPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <VenueDetails />
      <ReviewAndRating />
      <FieldRecommendation />
    </div>
  );
}

function VenueDetails() {
  const {data, isLoading, isError, isSuccess} = useGetFieldDetails();
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
        <div className="flex flex-col">
          <div className="m-6 flex flex-col gap-3 sm:m-8 sm:flex-row sm:gap-2">
            <img
              src={data?.image}
              alt={data?.name}
              className="w-full rounded-xl object-cover sm:h-[250px] sm:w-1/2 lg:h-[392px]"
            />
            <div className="grid w-full grid-cols-2 gap-3 sm:w-1/2 sm:gap-2">
              <img src={data?.image} alt={data?.name} className="h-full rounded-lg object-cover" />
              <img src={data?.image} alt={data?.name} className="h-full rounded-lg object-cover" />
              <img src={data?.image} alt={data?.name} className="h-full rounded-lg object-cover" />
              <img src={data?.image} alt={data?.name} className="h-full rounded-lg object-cover" />
            </div>
          </div>

          {/* VENUE INFORMATION */}
          <div className="m-6 mt-0 rounded-lg border px-4 py-6 sm:m-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{data?.name}</h1>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <p className="w-fit rounded-full bg-[#65558F] px-2 py-1 text-base font-medium text-white">
                    4.8 km
                  </p>
                  <p className="content-center text-base font-semibold text-muted-foreground">
                    {data?.location}
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
                  Rp {data?.price_per_hour !== undefined ? formatNumber(data?.price_per_hour) : '-'}
                  <span className="text-sm font-semibold text-muted-foreground">/hours</span>
                </p>
                <Button
                  variant="default"
                  className="w-fit shadow-none"
                  onClick={() => setIsClicked(!isClicked)}
                >
                  Book Field
                </Button>
              </div>
            </div>
            <hr className="my-6 opacity-50" />
            <div className="mt-4 flex flex-col sm:flex-row">
              <div className="flex flex-col rounded-md rounded-b-none border-x border-t p-3 sm:w-1/2 sm:rounded-b-md sm:rounded-r-none sm:rounded-br-none sm:border-y sm:border-r-0">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{data?.name} Informasi</h2>
                  <div className="flex">
                    <Image src="/images/icons/star.svg" width={15} height={15} alt="star icon" />
                    <p className="text-sm text-muted-foreground">
                      4.6 <span>(10 review)</span>
                    </p>
                  </div>
                  <hr className="my-1" />
                  <p className="text-sm text-muted-foreground">
                    Gelora Bung Karno (GBK) adalah sebuah kompleks olahraga besar yang terletak di
                    kawasan Senayan, Jakarta, Indonesia. Kompleks ini dinamai sesuai dengan nama
                    Presiden pertama Indonesia, Soekarno, yang memiliki julukan `Bung Karno.` GBK
                    dibangun untuk menyelenggarakan...
                  </p>
                  <Button variant="link" className="shadow-none">
                    Load more
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-md rounded-t-none border-x border-y p-3 sm:w-1/2 sm:rounded-t-lg sm:rounded-bl-none sm:rounded-tl-none">
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

          {/* FIELD DETAILS */}
          <BookingField isClicked={isClicked} />
        </div>
      )}
    </>
  );
}

function ReviewAndRating() {
  return (
    <div className="m-6 flex flex-col rounded-lg border p-6 sm:m-8">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Review & Rating</h2>
        <Button variant="link">See All</Button>
      </div>
      <p className="w-2/3 text-base text-muted-foreground">
        Apa kata orang yang telah menyewa tempat ini!
      </p>
      <div className="mt-3 flex flex-col justify-between sm:flex-row">
        <div className="mx-auto flex flex-col content-center self-center">
          <div className="mx-auto flex h-20 w-20 justify-center rounded-full bg-muted">
            <h1 className="h-14 w-14 content-center self-center rounded-full bg-primary p-1 text-center text-2xl font-semibold text-white">
              4.6
            </h1>
          </div>
          <p className="text-center text-sm font-semibold text-primary">Bagus Sekali</p>
        </div>
        <div className="my-4 border-b sm:mx-6 sm:my-0 sm:border-r"></div>
        <div className="flex w-fit flex-row flex-wrap justify-center gap-6 sm:justify-end">
          {ratingAndReview.map(item => (
            <div
              className="flex w-56 flex-col rounded-lg border p-4 sm:w-80 md:w-56 lg:w-80"
              key={item.id}
            >
              <div className="flex justify-between">
                <div className="flex flex-row">
                  <Image
                    src="/images/icons/profilepic.svg"
                    alt="profile picture"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col self-center px-2">
                    <p className="text-sm font-semibold">Faza Abdillah</p>
                    <p className="text-xs text-muted-foreground">15 Juli 2024</p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Image src="/images/icons/star.svg" alt="star icon" width={25} height={25} />
                  <p className="self-center text-base text-muted-foreground">4.6</p>
                </div>
              </div>
              <hr className="my-3" />
              <p className="text-sm text-muted-foreground">
                “Enak banget tempatnya, cocok main bareng teman teman”
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldRecommendation() {
  const {data, isError, isSuccess} = useGetFieldRecommendation();
  return (
    <div className="m-6 flex flex-col gap-2 sm:m-8">
      <h1 className="text-lg font-semibold">Rekomendasi tempat lainnya</h1>
      <p className="text-base font-medium text-muted-foreground">
        Rekomendasi tempat yang mirip dengan Gelora Bung Karno
      </p>
      {isError && (
        <p className="text-center font-semibold">There was an error processing your request</p>
      )}
      {isSuccess && (
        <div className="my-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {data.map(({id, is_indoor, location, name, price_per_hour, image}) => (
            <FieldItem
              id={id}
              image={image}
              key={id}
              is_indoor={is_indoor}
              location={location}
              name={name}
              price_per_hour={price_per_hour}
            />
          ))}
        </div>
      )}
    </div>
  );
}
