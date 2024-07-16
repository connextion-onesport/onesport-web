import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background">
        <Navbar />
      </header>
      {children}
      <footer className="bg-neutral-950 px-6 pt-10 md:px-8 md:pt-12">
        <Footer />
      </footer>
    </>
  );
}
