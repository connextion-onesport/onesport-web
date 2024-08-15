import Hero from '@/components/Hero';
import NavbarMobile from '@/components/NavbarMobile';
import FieldList from '@/components/FieldList';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Hero />
      <NavbarMobile />
      <FieldList title="Pilih tempat terdekat 🥳" description="Tempat olahraga di sekitarmu." />
      <FieldList title="Rating tertinggi" description="Tempat olahraga dengan rating terbaik." />
    </main>
  );
}
