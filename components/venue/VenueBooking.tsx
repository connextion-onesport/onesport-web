'use client';

import {Button} from '../ui/button';
import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';
import {DatePicker} from '../ui/date-picker';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isBefore,
  startOfToday,
  getDay,
  isAfter,
} from 'date-fns';
import {id} from 'date-fns/locale';
import {cn, convertHourToDate, formatPrice} from '@/libs/utils';

import {DialogClose} from '@/components/ui/dialog';
import {formatNumber} from '@/libs/utils';
import {useRouter} from 'next/navigation';
import {Separator} from '../ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import {Checkbox} from '@/components/ui/checkbox';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {useAuthStore, useVenueStore} from '@/providers/zustand-provider';
import {AspectRatio} from '../ui/aspect-ratio';
import {PiCourtBasketball, PiSoccerBallFill} from 'react-icons/pi';
import {Skeleton} from '../ui/skeleton';
import {ReloadIcon} from '@radix-ui/react-icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createBookings} from '@/actions/venue';

interface VenueBookingProps {
  fields: any;
  user: any;
}

export default function VenueBooking({fields, user}: VenueBookingProps) {
  const categories = fields.map((field: any) => field.category);

  return (
    <section
      id="booking-field"
      className="flex flex-col gap-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:px-8"
    >
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">Pilih Lapangan</h2>

        <div className="flex flex-col gap-4">
          <BookingSchedule />
          <BookingCategory categories={categories} />
        </div>
      </div>

      {fields.map((field: any) => (
        <BookingCard key={field.id} field={field} user={user} />
      ))}
    </section>
  );
}

function BookingSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(startOfToday());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const {setDayOfWeek, setBookingDate} = useVenueStore(state => state);

  useEffect(() => {
    if (selectedDate) {
      const startDate = startOfWeek(selectedDate < startOfToday() ? startOfToday() : selectedDate, {
        weekStartsOn: 1,
      });
      const newWeekDates = Array.from({length: 7}, (_, i) => addDays(startDate, i));
      let selectedDayOfWeek = getDay(selectedDate);

      if (selectedDayOfWeek === 0) {
        selectedDayOfWeek = 7;
      }

      setBookingDate(selectedDate);
      setDayOfWeek(selectedDayOfWeek);
      setWeekDates(newWeekDates);
    }
  }, [selectedDate, setDayOfWeek, setBookingDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || startOfToday());
  };

  return (
    <div className="flex justify-between gap-8 rounded-lg bg-white p-4">
      <Carousel className="flex overflow-hidden lg:w-full">
        <CarouselContent>
          {weekDates.map((date, index) => (
            <CarouselItem key={index} className="min-w-fit basis-0">
              <Button
                variant="ghost"
                className={cn(
                  'flex h-14 flex-col px-4 text-sm font-normal',
                  selectedDate &&
                    isSameDay(date, selectedDate) &&
                    'hover:bg-primary-dark bg-primary text-primary-foreground hover:text-primary-foreground'
                )}
                onClick={() => setSelectedDate(date)}
                disabled={
                  isBefore(date, startOfToday()) || isAfter(date, addDays(startOfToday(), 30))
                }
              >
                {format(date, 'EEEE', {locale: id})}
                <p className="font-semibold">{format(date, 'd MMM yyyy', {locale: id})}</p>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Separator orientation="vertical" className="h-14" />

      <DatePicker selectedDate={selectedDate} onSelect={handleDateSelect} />
    </div>
  );
}

function BookingCategory({categories}: {categories: any}) {
  const sortedCategories = categories.sort((a: any, b: any) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        className="rounded-full text-primary hover:bg-primary hover:text-white"
      >
        Semua
      </Button>

      {sortedCategories.map((category: any) => (
        <Button
          key={category.id}
          variant="outline"
          className="rounded-full text-muted-foreground hover:bg-primary hover:text-white"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

interface BookingCardProps {
  field: any;
  user: any;
}

function BookingCard({field, user}: BookingCardProps) {
  const {dayOfWeek} = useVenueStore(state => state);

  const name = field.name;
  const image = field.images[0].image

  const category = field.category.name;
  const schedules = field.availableHours.filter(
    (schedule: any) => schedule.dayOfWeek === dayOfWeek
  );
  const prices = schedules.map((schedule: any) => schedule.pricePerHour);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <div className="flex flex-col rounded-lg bg-white shadow lg:flex-row lg:items-start lg:gap-8 lg:p-4">
      <div className="relative aspect-video max-h-56 min-w-96 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-t-xl object-cover lg:rounded-xl"
        />
        <span className="absolute left-4 top-4 flex h-8 items-center justify-center rounded-full bg-white px-3 text-sm text-muted-foreground">
          {field.isIndoor ? 'Indoor' : 'Outdoor'}
        </span>
      </div>

      <div className="flex w-full flex-col justify-center p-4 lg:p-0">
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-1 text-lg font-semibold">{field.name}</h3>
          <div className="flex w-fit items-center gap-1 whitespace-nowrap rounded-full bg-secondary px-3 py-1">
            <span className="flex aspect-square h-4 w-4 items-center justify-center">
              <PiSoccerBallFill className="h-full w-full" />
            </span>
            <p className="text-xs">{category}</p>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="flex aspect-square h-5 w-5 items-center justify-center">
              <PiCourtBasketball className="h-full w-full" />
            </span>
            <p className="text-sm">Lapangan {field.type}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col justify-between gap-4 sm:flex-col md:flex-row">
          <div className="flex flex-col gap-2 whitespace-nowrap">
            <p className="text-sm font-semibold">Fasilitas Lapangan</p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              <div className="flex gap-2">
                <Image src="/images/icons/bola.svg" alt="ball icon" width={15} height={15} />
                <p className="text-sm">3x Bola</p>
              </div>
              <div className="flex gap-2">
                <Image src="/images/icons/peluit.svg" alt="peluit icon" width={15} height={15} />
                <p className="text-sm">Wasit</p>
              </div>
              <div className="flex gap-2">
                <Image src="/images/icons/orang.svg" alt="people icon" width={15} height={15} />
                <p className="text-sm">10 Orang</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm">Mulai dari</p>
            <span className="mb-2 flex items-center gap-1">
              <p className="text-lg font-bold">{formatPrice(minPrice)}</p>
              <p className="text-sm font-medium">/Jam</p>
            </span>

            <BookingDialog field={field} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface BookingDialogProps {
  field: any;
  user: any;
}

function BookingDialog({field, user}: BookingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Pesan Sekarang
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 rounded-none p-0 md:h-fit md:max-w-3xl md:rounded-xl">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Pilih Jadwal</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Pilih Jadwal</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <BookingForm field={field} user={user} />
      </DialogContent>
    </Dialog>
  );
}

interface BookingFormProps {
  field: any;
  user: any;
}

interface Slot {
  startHour: number;
  endHour: number;
  price: number;
}

function BookingForm({field, user}: BookingFormProps) {
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [totalHour, setTotalHour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {dayOfWeek, bookingDate} = useVenueStore(state => state);

  const queryClient = useQueryClient();
  const router = useRouter();

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const isToday = bookingDate.toDateString() === currentDate.toDateString();

  const schedules = field.availableHours.filter(
    (schedule: {dayOfWeek: number}) => schedule.dayOfWeek === dayOfWeek
  );

  const {mutateAsync: createBookingMutation} = useMutation({
    mutationFn: createBookings,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['venue']});
    },
  });

  const handleSlotSelection = (
    schedule: {hour: number; pricePerHour: number},
    isSelected: boolean
  ) => {
    const {hour, pricePerHour} = schedule;

    // Update selected slots and total price
    if (isSelected) {
      setSelectedSlots(prev => [
        ...prev,
        {startHour: hour, endHour: hour + 1, price: pricePerHour},
      ]);
      setTotalPrice(prev => prev + pricePerHour);
      setTotalHour(prev => prev + 1);
    } else {
      setSelectedSlots(prev => prev.filter(slot => slot.startHour !== hour));
      setTotalPrice(prev => prev - pricePerHour);
      setTotalHour(prev => prev - 1);
    }
  };

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      const bookings = selectedSlots.map(slot => ({
        fieldId: field.id,
        venueId: field.venueId,
        userId: user.id,
        date: bookingDate,
        startTime: convertHourToDate(bookingDate, slot.startHour),
        endTime: convertHourToDate(bookingDate, slot.endHour),
        price: slot.price,
      }));

      console.log('Bookings to create:', bookings);
      await createBookingMutation({venueId: field.venueId, userId: user.id, bookings});
      resetForm();
      router.push('/booking/review');
    } catch (error) {
      console.error('Failed to book field', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedSlots([]);
    setTotalHour(0);
    setTotalPrice(0);
  };

  const isDisabled = (schedule: {isAvailable: boolean; hour: number}) => {
    return schedule.isAvailable === false || (isToday && currentHour >= schedule.hour);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-none">
      <BookingSchedule />
      <div className="flex h-full flex-col">
        <div className="my-auto grid grid-cols-1 gap-x-4 p-4 pt-4 sm:grid-cols-2 sm:gap-x-6 sm:p-6 md:gap-x-10">
          {schedules.map(
            (schedule: {id: string; hour: number; pricePerHour: number; isAvailable: boolean}) => (
              <div className="flex justify-between gap-4 border-b p-2 md:p-5" key={schedule.id}>
                <div className="flex gap-3">
                  <Checkbox
                    id={schedule.hour.toString()}
                    disabled={isDisabled(schedule)}
                    onCheckedChange={e => handleSlotSelection(schedule, e === true)}
                    className="aspect-square h-6 w-6 shrink-0 grow-0 self-center"
                  />
                  <div className="flex flex-col">
                    <label
                      htmlFor={schedule.hour.toString()}
                      className={`relative flex gap-3 text-xs sm:text-sm md:text-base ${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'}`}
                    >
                      {`${schedule.hour}.00 - ${schedule.hour + 1}.00`}
                    </label>
                    <p
                      className={`sm:text-sm md:text-base ${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'} text-xs`}
                    >
                      {schedule.isAvailable ? 'Kosong' : 'Booked'}
                    </p>
                  </div>
                </div>
                <p
                  className={`${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'} self-center text-xs font-semibold sm:text-sm md:text-base`}
                >
                  Rp{formatNumber(schedule.pricePerHour)}
                </p>
              </div>
            )
          )}
        </div>

        <div className="flex flex-col gap-4 border-t-2 p-6">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-muted-foreground">Total</p>
            <p className="text-xl font-semibold">
              Rp{formatNumber(totalPrice)}
              <span className="ml-1 font-medium text-muted-foreground">/ {totalHour} Jam</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary text-primary hover:text-primary"
              >
                Batal
              </Button>
            </DialogClose>
            <Button size="lg" disabled={isSubmitting || totalHour === 0} onClick={handleBooking}>
              {isSubmitting ? <ReloadIcon className="h-4 w-4 animate-spin" /> : 'Pesan Sekarang'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VenueBookingSkeleton() {
  return (
    <section className="flex flex-col gap-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:px-8">
      <div className="flex flex-col gap-8">
        <Skeleton className="h-6 w-1/3 bg-white md:w-1/4" />

        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full rounded-lg bg-white" />
          <div className="flex flex-wrap gap-2">
            {Array.from({length: 4}).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-1/5 rounded-full bg-white md:w-1/6 lg:w-1/12"
              />
            ))}
          </div>
        </div>
      </div>

      {Array.from({length: 3}).map((_, index) => (
        <Skeleton key={index} className="h-[512px] w-full rounded-lg bg-white lg:h-64" />
      ))}
    </section>
  );
}
