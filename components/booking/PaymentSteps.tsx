import {Separator} from '../ui/separator';

export default function PaymentSteps({step}: {step: number}) {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center p-4 py-4 md:px-8">
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span
              className={`${step === 1 ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'} flex h-8 w-8 items-center justify-center rounded-full border font-bold`}
            >
              1
            </span>
            <span
              className={`${step === 1 ? 'font-bold text-primary' : 'foreground font-medium text-muted-foreground'}`}
            >
              Information
            </span>
          </div>

          <Separator className="w-20" />

          <div className="flex items-center gap-3 whitespace-nowrap">
            <span
              className={`${step === 2 ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'} flex h-8 w-8 items-center justify-center rounded-full border font-bold`}
            >
              2
            </span>
            <span
              className={`${step === 2 ? 'font-bold text-primary' : 'foreground font-medium text-muted-foreground'}`}
            >
              Payment Method
            </span>
          </div>

          <Separator className="w-20" />

          <div className="flex items-center gap-3 whitespace-nowrap">
            <span
              className={`${step === 3 ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'} flex h-8 w-8 items-center justify-center rounded-full border font-bold`}
            >
              3
            </span>
            <span
              className={`${step === 3 ? 'font-bold text-primary' : 'foreground font-medium text-muted-foreground'}`}
            >
              Complete Order
            </span>
          </div>
        </div>

        <div className="mx-auto flex items-center md:hidden">
          <div className="flex flex-col items-center gap-2 whitespace-nowrap">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary font-bold text-primary">
              {step === 1 && '1'}
              {step === 2 && '2'}
              {step === 3 && '3'}
            </span>
            <span className="font-bold text-primary">
              {step === 1 && 'Information'}
              {step === 2 && 'Payment Method'}
              {step === 3 && 'Complete Order'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
