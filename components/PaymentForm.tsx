'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from './ui/button';
import {Dispatch, useEffect, useState} from 'react';
import {z} from 'zod';
import {Input} from './ui/input';
import {useForm} from 'react-hook-form';
import {paymentFormSchema} from '@/libs/validators';
import {zodResolver} from '@hookform/resolvers/zod';
import {RiInformationLine} from 'react-icons/ri';
import {createPaymentToken} from '@/actions/payment';

interface PaymentFormProps {
  step: number;
  setStep: Dispatch<number>;
}

const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';

export default function PaymentForm({step, setStep}: PaymentFormProps) {
  const [snapShown, setSnapShown] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientKey]);

  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onPayment(values: z.infer<typeof paymentFormSchema>) {
    console.log(values);
  }

  async function handlePaymentMethod() {
    const token = await createPaymentToken();

    if (!snapShown) {
      window.snap.embed(token, {
        embedId: 'snap-container',
      });

      setSnapShown(true);
      setStep(2);
    }
  }

  return (
    <>
      <section
        className={`${step === 1 ? 'flex flex-col gap-4 rounded-xl bg-background p-6' : 'hidden'}`}
      >
        <div className="flex flex-col">
          <h3 className="text-lg font-bold md:text-xl">Data Penyewa</h3>
          <p className="text-sm text-muted-foreground md:text-base">
            Detail kontak ini untuk pengiriman e-tiket.
          </p>
        </div>

        <Form {...paymentForm}>
          <form onSubmit={paymentForm.handleSubmit(onPayment)} className="space-y-4">
            <FormField
              control={paymentForm.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Nama sesuai KTP" className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paymentForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Nomor HP" className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paymentForm.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Alamat Email" className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-10 w-full"
              disabled={isSubmitting}
              onClick={handlePaymentMethod}
            >
              {isSubmitting ? 'Registering...' : 'Lanjutkan Pembayaran'}
            </Button>
          </form>
        </Form>

        <Button variant="outline" className="flex h-10 w-full justify-start gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <RiInformationLine className="h-4 w-4 text-white" />
          </span>
          Kebijakan Reschedule & Pembatalan
        </Button>
      </section>

      <div
        id="snap-container"
        className={`${step === 2 ? 'h-full w-full rounded-xl bg-background' : 'hidden'}`}
      ></div>
    </>
  );
}
