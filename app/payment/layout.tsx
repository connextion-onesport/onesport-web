import Navbar from '@/components/Navbar';
import PaymentSteps from '@/components/PaymentSteps';
import React from 'react';

export default function PaymentLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className="bg-background">
        <Navbar />
      </header>
      <main className="bg-accent">
        <PaymentSteps />
        {children}
      </main>
    </>
  );
}
