import PaymentDetail from '@/components/PaymentDetail';
import PaymentForm from '@/components/PaymentForm';
import PaymentPricing from '@/components/PaymentPricing';

export default function PaymentPage() {
  return (
    <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-x-8 gap-y-4 p-4 md:grid-cols-2 md:p-8">
      <div className="flex flex-col gap-4 md:gap-8">
        <PaymentDetail />
        <div className="md:hidden">
          <PaymentPricing />
        </div>
        <PaymentForm />
      </div>
      <div className="hidden md:block">
        <PaymentPricing />
      </div>
    </section>
  );
}
