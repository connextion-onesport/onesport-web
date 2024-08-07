import Image from 'next/image';

export default function PaymentDetail() {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-background p-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold md:text-xl">Detail Pesanan</h3>
        <p className="text-sm text-muted-foreground md:text-base">
          Cek detail pesananmu di bawah ini!
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Tanggal
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">
            Rabu, 17 Juli 2024
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Jam Sewa
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">19:00 - 20:00</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Biaya
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">Rp500.000</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Kategori Olahraga
          </span>
          <span className="flex gap-1 whitespace-nowrap rounded-full border bg-accent px-2 py-0.5 text-xs font-medium md:text-sm">
            <Image src="/images/icons/soccer.svg" height={16} width={16} alt="Soccer Icon" />
            Soccer
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Tipe Lapangan
          </span>
          <span className="whitespace-nowrap rounded-full border bg-accent px-2 py-0.5 text-xs font-medium md:text-sm">
            Outdoor
          </span>
        </div>
      </div>
    </section>
  );
}
