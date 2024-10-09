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
import {
  cn,
  convertHourToDate,
  formatPrice,
  getCategoryImage,
  getFieldFacilityImage,
} from '@/libs/utils';

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
import {Skeleton} from '../ui/skeleton';
import {ReloadIcon} from '@radix-ui/react-icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createBookings} from '@/actions/venue';
import {ScrollArea} from '../ui/scroll-area';

import {
  PiTShirt,
  PiCourtBasketball,
  PiSoccerBallFill,
  PiTennisBall,
  PiCardsThree,
  PiPlusCircle,
  PiBasketball,
  PiSoccerBall,
  PiVolleyball,
} from 'react-icons/pi';
import {GiWhistle, GiStopwatch, GiRunningShoe, GiShuttlecock, GiSoccerKick} from 'react-icons/gi';
import {FaClipboardList} from 'react-icons/fa';
import {FaTableTennisPaddleBall} from 'react-icons/fa6';

interface VenueBookingProps {
  fields: any;
  user: any;
}

export default function VenueBooking({fields, user}: VenueBookingProps) {
  const categories = fields.map((field: any) => field.category);

  return (
    <section
      id="booking-field"
      className="flex flex-col gap-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white p-4 md:p-8"
    >
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold sm:text-2xl">Pilih Lapangan</h2>

        <div className="flex flex-col gap-4">
          <BookingSchedule />
          <BookingCategory categories={categories} />
        </div>
      </div>

      <BookingList fields={fields} user={user} />
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

function BookingCategory({categories}: {categories: string[]}) {
  const {categoryBooking, setCategoryBooking} = useVenueStore(state => state);

  const uniqueCategories = Array.from(new Set(categories.map((category: any) => category.name)));

  const handleSelectCategory = (category: string) => {
    setCategoryBooking(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={categoryBooking === 'Semua' ? 'default' : 'outline'}
        onClick={() => handleSelectCategory('Semua')}
        className={`${categoryBooking === 'Semua' && 'text-white'} h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm`}
      >
        Semua
      </Button>

      {uniqueCategories.map((category: string, index: number) => (
        <Button
          key={index}
          variant={categoryBooking === category ? 'default' : 'outline'}
          onClick={() => handleSelectCategory(category)}
          className={`${categoryBooking === category && 'text-white'} h-8 rounded-full px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

interface BookingListProps {
  fields: any;
  user: any;
}

function BookingList({fields, user}: BookingListProps) {
  const {categoryBooking} = useVenueStore(state => state);

  const filteredFields = fields.filter(
    (field: any) => categoryBooking === 'Semua' || field.category.name === categoryBooking
  );

  return (
    <div className="flex flex-col gap-8">
      {filteredFields.map((field: any) => (
        <BookingCard key={field.id} field={field} user={user} />
      ))}
    </div>
  );
}

interface BookingCardProps {
  field: any;
  user: any;
}

function BookingCard({field, user}: BookingCardProps) {
  const [showBooking, setShowBooking] = useState(false);
  const {setShowAuth} = useAuthStore(state => state);
  const {dayOfWeek} = useVenueStore(state => state);

  const name = field.name;
  const image = field.images[0].image;

  const category = field.category.name;
  const schedules = field.availableHours.filter(
    (schedule: any) => schedule.dayOfWeek === dayOfWeek
  );
  const prices = schedules.map((schedule: any) => schedule.pricePerHour);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  const facilities = field.facilities.map((facility: any) => facility.facility.name);

  const handleBooking = () => {
    if (user) {
      setShowBooking(true);
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-lg bg-white shadow lg:flex-row lg:items-start lg:gap-8 lg:p-4">
        <div className="relative aspect-video max-h-56 w-full overflow-hidden lg:max-w-96">
          <Image src={image} alt={name} fill className="rounded-t-xl object-cover lg:rounded-xl" />
          <span className="absolute left-4 top-4 flex h-8 items-center justify-center rounded-full bg-white px-3 text-sm text-muted-foreground">
            {field.isIndoor ? 'Indoor' : 'Outdoor'}
          </span>
        </div>

        <div className="flex w-full flex-col justify-center p-4 lg:p-0">
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-1 text-lg font-semibold">{field.name}</h3>
            <div className="flex w-fit items-center gap-1 whitespace-nowrap rounded-full bg-secondary px-3 py-1">
              <span className="relative flex aspect-square h-4 w-4 shrink-0 grow-0 items-center justify-center">
                <Image
                  src={getCategoryImage(category)}
                  alt={category}
                  layout="fill"
                  className="object-contain"
                />
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
                {facilities.map((facility: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="relative flex aspect-square h-4 w-4 shrink-0 grow-0 items-center justify-center">
                      <Image
                        src={getFieldFacilityImage(facility)}
                        alt={facility}
                        layout="fill"
                        className="object-contain"
                      />
                    </span>
                    <p className="text-sm">{facility}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm">Mulai dari</p>
              <span className="mb-2 flex items-center gap-1">
                <p className="text-lg font-bold">{formatPrice(minPrice)}</p>
                <p className="text-sm font-medium">/Jam</p>
              </span>

              <Button size="lg" onClick={handleBooking}>
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BookingDialog
        field={field}
        user={user}
        showBooking={showBooking}
        setShowBooking={setShowBooking}
      />
    </>
  );
}

interface BookingDialogProps {
  field: any;
  user: any;
  showBooking: boolean;
  setShowBooking: (showBooking: boolean) => void;
}

function BookingDialog({field, user, showBooking, setShowBooking}: BookingDialogProps) {
  return (
    <Dialog open={showBooking} onOpenChange={setShowBooking}>
      <DialogContent className="flex h-dvh max-w-lg flex-col gap-0 p-0 md:h-3/4 md:max-w-3xl md:rounded-xl">
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

  const category = field.category.name;

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const isToday = bookingDate.toDateString() === currentDate.toDateString();

  const schedules = field.availableHours.filter(
    (schedule: {dayOfWeek: number}) => schedule.dayOfWeek === dayOfWeek
  );

  const sortedSchedules = schedules.sort((a: {hour: number}, b: {hour: number}) =>
    a.hour > b.hour ? 1 : -1
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

    const isSepakBola = category === 'Sepak Bola';
    const duration = isSepakBola ? 2 : 1;

    if (isSelected) {
      setSelectedSlots(prev => [
        ...prev,
        {startHour: hour, endHour: hour + duration, price: pricePerHour},
      ]);
      setTotalPrice(prev => prev + pricePerHour);
      setTotalHour(prev => prev + duration);
    } else {
      setSelectedSlots(prev => prev.filter(slot => slot.startHour !== hour));
      setTotalPrice(prev => prev - pricePerHour);
      setTotalHour(prev => prev - duration);
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

      await createBookingMutation({venueId: field.venueId, userId: user.id, bookings});
      resetForm();
      router.push('/booking/review');
    } catch (error) {
      console.error('Failed to book field', error);
      throw new Error('Failed to book field. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedSlots([]);
    setTotalHour(0);
    setTotalPrice(0);
  };

  const isDisabled = (schedule: {hour: number}) => {
    const {hour} = schedule;
    const isPastHour = isToday && currentHour >= hour;

    return isPastHour;
  };

  useEffect(() => {
    resetForm();
  }, [bookingDate]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-none">
      <BookingSchedule />

      <ScrollArea className="mb-auto">
        <div className="grid grid-cols-1 gap-y-4 p-4 md:grid-cols-2 md:gap-x-6 md:gap-y-6 md:p-6">
          {sortedSchedules.map((schedule: {id: string; hour: number; pricePerHour: number}) => (
            <div className="flex justify-between gap-4 border-b p-4" key={schedule.id}>
              <div className="flex gap-3">
                <Checkbox
                  id={schedule.hour.toString()}
                  disabled={isDisabled(schedule)}
                  checked={selectedSlots.some(slot => slot.startHour === schedule.hour)}
                  onCheckedChange={e => handleSlotSelection(schedule, e === true)}
                  className="aspect-square h-6 w-6 shrink-0 grow-0 self-center"
                />
                <div className="flex flex-col">
                  <label
                    htmlFor={schedule.hour.toString()}
                    className={`relative flex gap-3 text-sm md:text-base ${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'}`}
                  >
                    {schedule.hour === 24
                      ? '00.00 - 01.00'
                      : schedule.hour === 23
                        ? '23.00 - 00.00'
                        : category === 'Sepak Bola'
                          ? `${schedule.hour}.00 - ${schedule.hour + 2}.00`
                          : `${schedule.hour}.00 - ${schedule.hour + 1}.00`}
                  </label>
                  <p
                    className={`${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'} text-sm md:text-base`}
                  >
                    {isDisabled(schedule) ? 'Booked' : 'Kosong'}
                  </p>
                </div>
              </div>
              <p
                className={`${!isDisabled(schedule) ? 'text-black' : 'text-muted-foreground'} self-center text-sm font-semibold md:text-base`}
              >
                Rp{formatNumber(schedule.pricePerHour)}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-4 border-t p-6">
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
