import { format } from "date-fns";
import { id } from "date-fns/locale";
import { obfuscateEmail } from "../../libs/utils";

interface StatusDetailProps {
  data: any;
}

export default function StatusDetail({data}: StatusDetailProps) {
  const {status, date, expiryTime, orderId} = data;
  const user = data.bookings[0].user;
  const email = user.email;

  const getUserStatus = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Berhasil';
      case 'PENDING':
        return 'Menunggu';
      case 'FAILED':
        return 'Gagal';
      case 'REFUNDED':
        return 'Dikembalikan';
      default:
        return 'Tidak Diketahui';
    }
  }
  
  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <p className="whitespace-nowrap text-xs text-muted-foreground">Status</p>
          <p className="whitespace-nowrap text-sm font-medium">{getUserStatus(status)}</p>
        </div>

        <div className="flex flex-col">
          <p className="whitespace-nowrap text-xs text-muted-foreground">Waktu Kadaluarsa</p>
          <p className="whitespace-nowrap text-sm font-medium">
            {format(expiryTime, "d MMM yyyy, HH:mm 'WIB'", {locale: id})}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <p className="whitespace-nowrap text-xs text-muted-foreground">Order ID</p>
          <p className="whitespace-nowrap text-sm font-medium">{orderId}</p>
        </div>

        <div className="flex flex-col">
          <p className="whitespace-nowrap text-xs text-muted-foreground">Tanggal Order</p>
          <p className="whitespace-nowrap text-sm font-medium">
            {format(date, "d MMM yyyy, HH:mm 'WIB'", {locale: id})}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="whitespace-nowrap text-xs text-muted-foreground">Email</p>
        <p className="whitespace-nowrap text-sm font-medium">{obfuscateEmail(email)}</p>
      </div>
    </section>
  );
}
