import Hero from '@/components/Hero';
import FieldHome from '@/components/FieldHome';
import {NavbarBottom} from '@/components/navbar';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Hero />
      <NavbarBottom />
      <FieldHome />
    </main>
  );
}
