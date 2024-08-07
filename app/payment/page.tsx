import PaymentDetail from '@/components/PaymentDetail';
import PaymentPricing from '@/components/PaymentPricing';

export default function PaymentPage() {
  return (
    <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-x-8 gap-y-4 p-4 md:grid-cols-2 md:p-8">
      <div className="flex flex-col gap-8">
        <PaymentDetail />
      </div>
      <PaymentPricing />
    </section>
  );
}
