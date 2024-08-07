import Image from 'next/image';
import {RiStarFill} from 'react-icons/ri';
import {Separator} from './ui/separator';

export default function PaymentPricing() {
  return (
    <section className="flex flex-col gap-4 rounded-md bg-background p-4 md:p-8">
      <div className="flex items-start gap-4 rounded-md border p-2">
        <div className="flex aspect-video w-36 items-center justify-center">
          <Image
            src="/images/img_bicycle.webp"
            width={256}
            height={144}
            alt="Gelora Bung Karno"
            className="w-36 rounded-md object-cover"
          />
        </div>

        <div className="flex w-full flex-col">
          <span className="line-clamp-2 font-bold md:text-lg">Gelora Bung Karno</span>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground md:text-base">
              <RiStarFill className="h-4 w-4 text-amber-400" />
              4.6
            </span>
            <span className="h-1 w-1 rounded-full bg-black" />
            <span className="line-clamp-1 text-sm text-muted-foreground md:text-base">
              Kuningan, Jakarta Pusat
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-lg font-bold md:text-xl">Rincian Biaya</h2>
        <span className="text-sm text-muted-foreground md:text-base">
          Berikut adalah biaya yang perlu kamu bayar.
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Biaya Sewa Lapangan
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">Rp500.000</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Biaya Sewa Perlengkapan
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">Rp0</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm text-muted-foreground md:text-base">
            Biaya Transaksi
          </span>
          <span className="whitespace-nowrap text-sm font-medium md:text-base">Rp0</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-sm font-medium md:text-base">Total Biaya</span>
          <span className="whitespace-nowrap text-sm font-bold md:text-base">Rp500.000</span>
        </div>
      </div>
    </section>
  );
}
