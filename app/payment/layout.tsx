import Navbar from '@/components/navbar/Navbar';

export default function PaymentLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className="bg-background">
        <Navbar />
      </header>
      <main className="bg-accent">{children}</main>
    </>
  );
}
