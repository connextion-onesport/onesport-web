import {Button} from './ui/button';
import Image from 'next/image';
import ScheduleBar from './ScheduleBar';
import ScheduleDialog from './ScheduleDialog';
import React from 'react';
import {fieldImages, fieldImagesIndoor, fieldImagesOutdoor} from '@/libs/constants';

interface BookingFieldProps {
  fieldsDataBooking: any;
}

const BookingField = React.forwardRef<HTMLDivElement, BookingFieldProps>(
  (fieldsDataBooking, ref) => {
    return (
      <section id="booking-field" ref={ref}>
        <div className="h-fit overflow-hidden bg-gradient-to-b from-[#E9EFFD] via-[#F8F8FB] to-[#D5E8FE] transition delay-75 ease-in-out">
          <BookingFieldHeader />
          <BookingFieldContent fieldsDataBooking={fieldsDataBooking} />
        </div>
      </section>
    );
  }
);

BookingField.displayName = 'BookingField';

function BookingFieldHeader() {
  return (
    <div className="flex flex-col gap-8 p-4 pb-0 sm:p-8 sm:pb-0 md:p-8 md:pb-0" id="bookingfield">
      <h2 className="text-2xl font-bold">Pilih Lapangan</h2>

      <div className="flex flex-col gap-4">
        <ScheduleBar className="justify-evenly rounded-lg bg-white px-2 py-3 shadow-sm sm:grid-cols-5 md:grid-cols-8" />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="rounded-full border-none bg-white text-xs text-primary shadow-none hover:bg-primary hover:text-white sm:text-sm"
          >
            All
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-none bg-white text-xs text-primary shadow-none hover:bg-primary hover:text-white sm:text-sm"
          >
            Soccer
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-none bg-white text-xs text-primary shadow-none hover:bg-primary hover:text-white sm:text-sm"
          >
            Basket
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-none bg-white text-xs text-primary shadow-none hover:bg-primary hover:text-white sm:text-sm"
          >
            Pingpong
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-none bg-white text-xs text-primary shadow-none hover:bg-primary hover:text-white sm:text-sm"
          >
            Tenis
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookingFieldContent(fieldsDataBooking: any) {
  const fieldsContent = fieldsDataBooking.fieldsDataBooking.fieldsDataBooking;

  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledImagesIndoor = shuffleArray(fieldImagesIndoor);
  const shuffledImagesOutdoor = shuffleArray(fieldImagesOutdoor);

  console.log(shuffledImagesIndoor);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      {fieldsContent?.map((fieldContent: any, index: number) => (
        <div
          className="relative flex flex-col rounded-lg bg-white p-5 sm:flex-row"
          key={fieldContent.id}
        >
          <Image
            key={fieldContent.isIndoor ? shuffledImagesIndoor[index] : shuffledImagesOutdoor[index]}
            src={fieldContent.isIndoor ? shuffledImagesIndoor[index] : shuffledImagesOutdoor[index]}
            alt={`${fieldContent.name} picture`}
            width={280}
            height={198}
            className="w-full self-start rounded-md sm:w-fit"
          />
          <p className="absolute left-8 mt-3 rounded-full bg-white px-2 text-sm text-muted-foreground">
            {fieldContent.isIndoor ? 'Indoor' : 'Outdoor'}
          </p>
          <div className="flex w-full flex-col justify-center px-0 pt-5 sm:px-5 sm:pt-0">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">{fieldContent.name}</h2>
              <div className="flex w-fit gap-1 rounded-full bg-muted px-2 py-1">
                <Image src="/images/icons/soccer.svg" alt="soccer icon" width={15} height={15} />
                <p className="text-sm text-muted-foreground">Soccer</p>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/images/icons/lapangan.svg" alt="field icon" width={15} height={15} />
                <p className="text-sm text-muted-foreground">Lapangan Rumput</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col justify-between sm:flex-col lg:flex-row">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Fasilitas Lapangan</p>
                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                  <div className="flex gap-2">
                    <Image src="/images/icons/bola.svg" alt="ball icon" width={15} height={15} />
                    <p className="text-sm">3x Bola</p>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/images/icons/peluit.svg"
                      alt="peluit icon"
                      width={15}
                      height={15}
                    />
                    <p className="text-sm">Wasit</p>
                  </div>
                  <div className="flex gap-2">
                    <Image src="/images/icons/orang.svg" alt="people icon" width={15} height={15} />
                    <p className="text-sm">10 Orang</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-4 lg:pt-0">
                <p className="text-sm text-muted-foreground">Harga dari</p>
                <p className="text-lg font-semibold">
                  Rp 500.000
                  <span className="text-sm font-semibold text-muted-foreground">/hours</span>
                </p>
                <ScheduleDialog />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldContent() {
  return (
    <div className="relative flex flex-col rounded-lg bg-white p-5 sm:flex-row">
      <Image
        src="/images/field1.svg"
        alt="field 1 picture"
        width={280}
        height={198}
        className="w-full self-start sm:w-fit"
      />
      <p className="absolute left-8 mt-3 rounded-full bg-white px-2 text-sm text-muted-foreground">
        Outdoor
      </p>
      <div className="flex w-full flex-col justify-between px-0 pt-5 sm:px-5 sm:pt-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Lapangan 1</h2>
          <p className="text-sm text-muted-foreground">Lapangan mini soccer vinyl</p>
          <div className="flex w-fit gap-1 rounded-full bg-muted px-2 py-1">
            <Image src="/images/icons/soccer.svg" alt="soccer icon" width={12} height={12} />
            <p className="text-sm text-muted-foreground">Soccer</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="mt-2 flex flex-col justify-between sm:flex-col lg:flex-row">
          <div className="grid grid-cols-2 gap-x-14 gap-y-5 self-start">
            <div className="flex gap-2 self-center">
              <Image src="/images/icons/mosque.svg" alt="mosque icon" width={18} height={18} />
              <p className="text-sm">Musholla</p>
            </div>
            <div className="flex gap-2 self-center">
              <Image src="/images/icons/loker.svg" alt="mosque icon" width={18} height={18} />
              <p className="text-sm">Loker</p>
            </div>
            <div className="flex gap-2 self-center">
              <Image src="/images/icons/parkir.svg" alt="mosque icon" width={18} height={18} />
              <p className="text-sm">Parkir</p>
            </div>
            <div className="flex gap-2 self-center">
              <Image src="/images/icons/shower.svg" alt="mosque icon" width={18} height={18} />
              <p className="text-sm">Shower</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-4 lg:pt-0">
            <p className="text-sm text-muted-foreground">Harga dari</p>
            <p className="text-lg font-semibold">
              Rp 500.000
              <span className="text-sm font-semibold text-muted-foreground">/hours</span>
            </p>
            <ScheduleDialog />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingField;
