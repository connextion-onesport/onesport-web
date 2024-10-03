'use client';

import {Dispatch, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {createPayment} from '@/actions/payment';
import {paymentFormSchema, voucherFormSchema} from '@/libs/validators';
import {formatPrice} from '@/libs/utils';

import {Button} from '../ui/button';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';

import {FloatingLabelInput} from '../ui/input-float';
import {PhoneInput} from '../ui/input-phone';
import {Separator} from '../ui/separator';
import {ScrollArea} from '../ui/scroll-area';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

import {ArrowRightIcon, ReloadIcon} from '@radix-ui/react-icons';
import {RiInformationLine, RiPlaneFill} from 'react-icons/ri';
import {PiCaretRight, PiPaperPlaneRight, PiQuestion, PiTicket} from 'react-icons/pi';

interface PaymentFormProps {
  fields: any;
  user: any;
}

export default function BookingForm({fields, user}: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<boolean>(true);
  const router = useRouter();

  const bookingId = fields.map((booking: any) => booking.id);

  const price = fields.map((booking: any) => booking.price);
  const rentPrice = price.reduce((acc: number, curr: number) => acc + curr, 0);
  const serviceFee = 10000;
  const tax = (rentPrice + serviceFee) * 0.11;
  const totalPrice = rentPrice + serviceFee + tax;

  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '+62',
      isSelf: true,
      otherName: undefined,
    },
  });

  async function onPayment(values: z.infer<typeof paymentFormSchema>) {
    try {
      setIsSubmitting(true);

      setTimeout(async () => {
        await createPayment({bookingId, values});

        setIsSubmitting(false);
        router.push('/booking/payment');
      }, 1000);
    } catch (error: any) {
      console.error('Failed to create payment token', error);
      throw new Error('Failed to create payment token. Please try again later.');
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col rounded-xl bg-background">
        <div className="flex flex-col gap-4 px-4 pb-0 pt-4 lg:gap-6 lg:px-6 lg:pt-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Data Penyewa</h2>
            <p className="text-sm text-muted-foreground">
              Detail kontak ini untuk pengiriman e-tiket.
            </p>
          </div>

          <Separator />
        </div>

        <div className="flex flex-col gap-10 px-4 py-6 lg:px-6">
          <Form {...paymentForm}>
            <form
              id="payment-form"
              onSubmit={paymentForm.handleSubmit(onPayment)}
              className="space-y-2"
            >
              <FormField
                control={paymentForm.control}
                name="name"
                render={({field}) => (
                  <FormItem className="h-[68px] space-y-0">
                    <FormControl>
                      <FloatingLabelInput
                        type="text"
                        id="name"
                        label="Nama"
                        className="h-12"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paymentForm.control}
                name="phone"
                render={({field}) => (
                  <FormItem className="h-[68px] space-y-0">
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="ID"
                        countryCallingCodeEditable={false}
                        className="h-12"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paymentForm.control}
                name="email"
                render={({field}) => (
                  <FormItem className="h-[68px] space-y-0">
                    <FormControl>
                      <FloatingLabelInput
                        type="email"
                        id="email"
                        label="Email"
                        className="h-12"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-6">
                <FormField
                  control={paymentForm.control}
                  name="isSelf"
                  render={({field}) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={value => {
                            const boolValue = value === 'true' ? true : false;
                            setRadioValue(boolValue);
                            field.onChange(boolValue);
                            paymentForm.resetField('otherName');
                          }}
                          defaultValue={radioValue.toString()}
                          className="flex items-center gap-8"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Saya sendiri</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">Orang lain</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!radioValue && (
                  <FormField
                    control={paymentForm.control}
                    name="otherName"
                    render={({field}) => (
                      <FormItem className="h-[68px] space-y-0">
                        <FormControl>
                          <FloatingLabelInput
                            type="text"
                            id="otherName"
                            label="Nama orang lain"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      <VoucherDialog />

      <ConfirmationPrice
        rentPrice={rentPrice}
        tax={tax}
        serviceFee={serviceFee}
        totalPrice={totalPrice}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}

function VoucherDialog() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const voucherForm = useForm<z.infer<typeof voucherFormSchema>>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      voucher: '',
    },
  });

  async function onVoucher(values: z.infer<typeof voucherFormSchema>) {
    try {
      setTimeout(async () => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error: any) {
      console.error('Failed to create payment token', error);
      throw new Error('Failed to create payment token. Please try again later.');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-12 w-full justify-between border-none px-4 py-2"
        >
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <PiTicket className="h-4 w-4 text-white" />
            </span>
            Gunakan Voucher
          </span>

          <PiCaretRight className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col gap-0 p-0 sm:h-1/2">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Gunakan Voucher</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Gunakan Voucher</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <Form {...voucherForm}>
          <form
            onSubmit={voucherForm.handleSubmit(onVoucher)}
            className="flex w-full gap-4 self-start px-6 pb-0 pt-6"
          >
            <FormField
              control={voucherForm.control}
              name="voucher"
              render={({field}) => (
                <FormItem className="h-[68px] w-full space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      id="email"
                      type="text"
                      label="Voucher"
                      className="h-12 w-full"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" className="aspect-square h-12 w-12 shrink-0 grow-0">
              {isSubmitting ? (
                <ReloadIcon className="h-6 w-6 animate-spin" />
              ) : (
                <PiPaperPlaneRight className="h-6 w-6" />
              )}
            </Button>
          </form>
        </Form>

        <ScrollArea className="flex h-full w-full self-start rounded-b-lg">
          <div className="flex h-full flex-col gap-4 p-6"></div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface ConfirmationPriceProps {
  rentPrice: number;
  tax: number;
  serviceFee: number;
  totalPrice: number;
  isSubmitting: boolean;
}

function ConfirmationPrice({
  rentPrice,
  tax,
  serviceFee,
  totalPrice,
  isSubmitting,
}: ConfirmationPriceProps) {
  return (
    <div className="flex flex-col rounded-xl bg-background">
      <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Detail Biaya</h2>
          <p className="text-sm text-muted-foreground">
            Detail biaya yang harus dibayar oleh penyewa.
          </p>
        </div>
      </div>

      <div className="relative border-b-2 border-dashed">
        <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full bg-accent" />
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full bg-accent" />
      </div>

      <div className="flex flex-col gap-4 px-4 py-6 lg:px-6">
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-sm text-muted-foreground">Biaya Sewa</p>
          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(rentPrice)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-sm text-muted-foreground">Diskon</p>
          <p className="whitespace-nowrap text-sm font-medium">0</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="whitespace-nowrap text-sm text-muted-foreground">Biaya Transaksi</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PiQuestion className="h-4 w-4 text-primary" />
                </TooltipTrigger>
                <TooltipContent className="max-w-64 bg-background p-4 text-foreground shadow-lg">
                  <p className="font-medium">
                    Biaya untuk fee payment gateway dan platform services lainnya.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(serviceFee)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-sm text-muted-foreground">PPN 11%</p>
          <p className="whitespace-nowrap text-sm font-medium">{formatPrice(tax)}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm font-semibold">Total Biaya</p>
            <p className="whitespace-nowrap text-sm font-bold">{formatPrice(totalPrice)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pb-6 pt-0 lg:px-6">
        <Button type="submit" form="payment-form" className="h-12 w-full" disabled={isSubmitting}>
          {isSubmitting ? <ReloadIcon className="h-4 w-4 animate-spin" /> : 'Lanjutkan Pembayaran'}
        </Button>

        <ReschedulePolicyDialog />
      </div>
    </div>
  );
}

function ReschedulePolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex h-12 w-full justify-between px-4 py-2">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <RiInformationLine className="h-4 w-4 text-white" />
            </span>
            Kebijakan Reschedule & Pembatalan
          </span>

          <PiCaretRight className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogHeader className="w-full border-b-2 p-6">
          <DialogTitle>Kebijakan Reschedule & Pembatalan</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Kebijakan Reschedule & Pembatalan</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <p className="text-sm">
              Penyewa membatalkan reservasi hingga 5 hari sebelum waktu check-in.
            </p>
            <p className="text-sm font-medium text-green-500">100% Refund</p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <p className="text-sm">
              Penyewa membatalkan reservasi kurang dari 5 hari sebelum waktu check-in.
            </p>
            <p className="text-sm font-medium text-orange-500">50% Refund</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
