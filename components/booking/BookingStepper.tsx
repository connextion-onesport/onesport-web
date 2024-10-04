'use client';

import {usePathname} from 'next/navigation';
import {Separator} from '../ui/separator';

export default function BookingStepper() {
  const pathName = usePathname();

  const steps = [
    {label: 'Review', path: '/booking/review', number: 1},
    {label: 'Bayar', path: '/booking/payment', number: 2},
    {label: 'Status', path: '/booking/status/[id]', number: 3},
  ];

  const currentStep = steps.find(step => pathName === step.path);

  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-2 whitespace-nowrap">
            <div
              className={`${
                currentStep?.number === step.number
                  ? 'border-primary text-primary'
                  : 'border-muted-foreground text-muted-foreground'
              } flex h-6 w-6 items-center justify-center rounded-full border font-bold`}
            >
              <p className="text-sm">{step.number}</p>
            </div>
            <p
              className={`${
                currentStep?.number === step.number
                  ? 'font-semibold text-primary'
                  : 'font-medium text-muted-foreground'
              }`}
            >
              {step.label}
            </p>
            {index < steps.length - 1 && <Separator className="w-14" />}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap md:hidden">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary">
          <p className="text-sm font-bold text-primary">{currentStep?.number}</p>
        </div>
        <p className="font-semibold text-primary">{currentStep?.label}</p>
      </div>
    </>
  );
}
