import Footer from '@/components/Footer';
import {Navbar} from '@/components/navbar';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className="sticky top-0 z-10 overflow-hidden bg-background shadow-sm">
        <Navbar />
      </header>
      {children}
      <footer className="mb-[68px] bg-slate-950 px-6 pt-10 md:mb-0 md:px-8 md:pt-12">
        <Footer />
      </footer>
    </>
  );
}
