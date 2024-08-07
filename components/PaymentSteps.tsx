import {Separator} from './ui/separator';

export default function PaymentSteps() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl p-4 md:px-8 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary font-bold text-primary">
              1
            </span>
            <span className="font-bold text-primary">Information</span>
          </div>
          <Separator className="w-20" />
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground font-bold text-muted-foreground">
              2
            </span>
            <span className="foreground font-medium text-muted-foreground">Payment Method</span>
          </div>
          <Separator className="w-20" />
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground font-bold text-muted-foreground">
              3
            </span>
            <span className="foreground font-medium text-muted-foreground">Complete Order</span>
          </div>
        </div>

        <span className="whitespace-nowrap font-bold text-destructive">Cancel Booking</span>
      </div>
    </div>
  );
}
