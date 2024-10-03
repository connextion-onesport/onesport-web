'use client';

import {getPaymentStatus} from '@/actions/payment';
import {StatusDetail, StatusHeader, StatusItems, StatusLine} from '@/components/booking';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {PiArrowLeft, PiChatCircleDots} from 'react-icons/pi';

export default function StatusPage({params}: {params: {id: string}}) {
  const id = params.id;

  const {data, isLoading, isError} = useQuery({
    queryKey: ['payment', {id}],
    queryFn: () => getPaymentStatus({id}),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col gap-6 px-2 py-6 md:px-6 md:py-10">
      <Link
        href="/venues"
        className="flex items-center self-end whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <PiArrowLeft className="mr-1 h-4 w-4" />
        Kembali
      </Link>

      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-background">
        <StatusHeader data={data} />
        <StatusLine />
        <div className="flex w-full flex-col gap-4 px-4 py-8 md:gap-6 md:px-6 md:py-10">
          <StatusDetail data={data} />
          <StatusItems data={data} />
        </div>
      </div>

      <Link
        href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&su=Laporan%20Transaksi&to=dimasyusufqurohman@gmail.com&body=Nama:%20Seseorang%0aEmail:%201*****3@123.com%0aKontak%20Alternatif:%20%0aOrder%20ID:%20${id}%0aJumlah%20Nominal%20Transaksi:%202000.00%0aLink%20Lapangan%20Tujuan:%20https://trakteer.id/ghostycomic%0aWaktu%20Transaksi:%2001%20October%202024%2014:12%0aMetode%20Pembayaran:%20GoPay%0aDeskripsi%20Tambahan:%20%0aE-mail%20E-Wallet:%20%0aNomor%20Telepon%20E-Wallet:%20%0aLink%20Status%20Pembayaran:%20https://onesport-web.vercel.app/booking/status/${id}--------------%0aMohon%20lampirkan%20juga%20bukti%20pembayaran%20dari%20aplikasi%20e-wallet/bank%20yang%20kamu%20gunakan`}
        className="flex items-center self-center whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <PiChatCircleDots className="mr-1 h-5 w-5" />
        Butuh bantuan?
      </Link>
    </div>
  );
}
