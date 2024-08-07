import Hero from '@/components/Hero';
import NavbarMobile from '@/components/NavbarMobile';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Hero />
      <section className="p-4 sm:p-8"></section>
      <NavbarMobile />
    </main>
  );
}
