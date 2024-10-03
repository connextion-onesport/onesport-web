import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <div className="flex p-4 py-8 md:p-8 md:py-10">
      <section className="flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-blue-500 px-4 py-12 md:px-8 md:py-16">
        
        <h2 className="text-4xl md:text-6xl leading-snug text-white text-center">
          Jadwalkan Lapangan,
          <br /> Raih Momen Seru, Satu Tim Bersatu!
        </h2>

        <Button
          variant="outline"
          className="h-12 w-fit text-base font-semibold text-primary hover:text-primary"
        >
          Daftar Sekarang
        </Button>
      </section>
    </div>
  );
}
