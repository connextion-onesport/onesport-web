import {Separator} from '@/components/ui/separator';
import React from 'react';

export default function PaymentPage() {
  return (
    <main className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-8 p-4 md:grid-cols-2 md:px-8 md:py-4">
      <section className="flex h-dvh w-full items-center justify-center rounded-md border">
        <h2>Payment Form</h2>
      </section>
      <section className="flex h-dvh w-full items-center justify-center rounded-md border">
        <h2>Payment Detail</h2>
      </section>
    </main>
  );
}
