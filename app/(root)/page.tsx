import Hero from '@/components/Hero';
import NavbarMobile from '@/components/NavbarMobile';
import FieldHome from '@/components/FieldHome';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Hero />
      <NavbarMobile />
      <FieldHome />
    </main>
  );
}
