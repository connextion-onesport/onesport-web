'use client';

import {useState} from 'react';
import PaymentDetail from '@/components/PaymentDetail';
import PaymentForm from '@/components/PaymentForm';
import PaymentPricing from '@/components/PaymentPricing';
import PaymentSteps from './PaymentSteps';

export default function PaymentSection() {
  const [step, setStep] = useState<number>(1);

  console.log('step', step);

  return (
    <>
      <PaymentSteps step={step} />

      <section className="mx-auto grid min-h-[773px] w-full max-w-screen-2xl grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-8">
        <div className="flex flex-col gap-4">
          {step === 1 && (
            <>
              <PaymentDetail />
              <div className="md:hidden">
                <PaymentPricing />
              </div>
            </>
          )}

          <PaymentForm step={step} setStep={setStep} />
        </div>

        <div className="hidden md:block">
          <PaymentPricing />
        </div>
      </section>
    </>
  );
}
