import ScheduleBar from './ScheduleBar';
import {scheduleDummyData} from '@/lib/constants';
import {Button} from './ui/button';
import {useState} from 'react';
import {DialogClose} from './ui/dialog';
export default function FieldSchedule() {
  return (
    <div className="flex flex-col">
      <ScheduleHeader />
      <ScheduleContent />
    </div>
  );
}

function ScheduleHeader() {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg-font-semibold p-4 sm:p-6">Pilih Jadwal</h2>
      <ScheduleBar className="grid grid-cols-4 justify-evenly bg-[#FAFAFA] px-2 py-3 sm:grid-cols-5 md:grid-cols-8" />
    </div>
  );
}

function ScheduleContent() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalHour, setTotalHour] = useState<number>(0);
  const [check, setCheck] = useState<boolean>(false);
  //function to format the price number
  const formatNumber = (num: number) => {
    return Intl.NumberFormat('id-Id').format(num);
  };
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-x-4 p-4 pt-4 sm:grid-cols-2 sm:gap-x-6 sm:p-6 md:gap-x-10">
        {scheduleDummyData.map(schedule => (
          <div className="flex justify-between border-b p-2 md:p-5" key={schedule.id}>
            <div className="flex gap-3">
              <input
                type="checkbox"
                name={schedule.hour}
                disabled={schedule.availability === 'Booked'}
                className="w-4 self-center"
                onChange={e => {
                  if (e.target.checked) {
                    setTotalPrice(prevPrice => prevPrice + schedule.price);
                    setTotalHour(prevHour => prevHour + 1);
                    // setCheck(true)
                  } else {
                    setTotalPrice(prevPrice => prevPrice - schedule.price);
                    setTotalHour(prevHour => prevHour - 1);
                  }
                  totalHour && totalPrice == 0 ? setCheck(false) : setCheck(true);
                }}
              />
              <div className="flex flex-col">
                <label
                  htmlFor={schedule.hour}
                  className={`relative flex gap-3 text-xs sm:text-sm md:text-base ${schedule.availability === 'Booked' ? 'text-muted-foreground' : 'text-black'}`}
                >
                  {schedule.hour}
                </label>
                <p
                  className={`sm:text-sm md:text-base ${schedule.availability === 'Booked' ? 'text-muted-foreground' : 'text-black'} text-xs`}
                >
                  {schedule.availability}
                </p>
              </div>
            </div>
            <p className="text-semibold self-center text-xs sm:text-sm md:text-base">
              Rp {formatNumber(schedule.price)}
            </p>
          </div>
        ))}
      </div>

      <ScheduleFooter totalPrice={totalPrice} totalHour={totalHour} isChecked={check} />
    </div>
  );
}

function ScheduleFooter({
  totalPrice,
  totalHour,
  isChecked,
}: {
  totalPrice: number;
  totalHour: number;
  isChecked: boolean;
}) {
  //function to format the price number
  const formatNumber = (num: number) => {
    return Intl.NumberFormat('id-Id').format(num);
  };
  return (
    <div className="flex flex-col p-6 pt-0">
      <p className="text-muted-foreground">Total</p>
      <h2 className="text-lg font-semibold">
        Rp {formatNumber(totalPrice)}{' '}
        <span className="text-base text-muted-foreground">/ {totalHour} Hour</span>{' '}
      </h2>
      <ScheduleFooterButtons isChecked={isChecked} />
    </div>
  );
}

function ScheduleFooterButtons({isChecked}: {isChecked: boolean}) {
  return (
    <div className="flex w-full gap-4 pt-4">
      <DialogClose className="w-1/2">
        <Button variant="outline" className="w-full border-primary text-primary">
          Close
        </Button>
      </DialogClose>
      <Button variant={isChecked ? 'default' : 'outline'} className="w-1/2" disabled={!isChecked}>
        Book Field
      </Button>
    </div>
  );
}
