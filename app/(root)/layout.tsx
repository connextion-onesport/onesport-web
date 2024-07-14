import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mx-auto max-w-screen-2xl">
        <Navbar />
      </header>
      {children}
      <footer className="mx-auto max-w-screen-2xl">
        <Footer />
      </footer>
    </>
  );
}
