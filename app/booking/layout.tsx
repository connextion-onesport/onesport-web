import {BookingNavbar} from '@/components/booking';

export default function BookingLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="flex h-full min-h-dvh w-full flex-col bg-accent">
      <BookingNavbar />
      {children}
    </main>
  );
}
