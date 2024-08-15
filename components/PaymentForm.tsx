'use client';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from './ui/button';
import {useState} from 'react';
import {z} from 'zod';
import {Input} from './ui/input';
import {useForm} from 'react-hook-form';
import {paymentFormSchema} from '@/libs/validator';
import {zodResolver} from '@hookform/resolvers/zod';
import {RiInformationLine} from 'react-icons/ri';

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-background p-6">
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
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
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
  );
}
