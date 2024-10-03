import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import { VenueList } from '@/components/venue';
import { Separator } from '@/components/ui/separator';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Hero />
      <VenueList title="Pilih tempat terdekat 🥳" description="Tempat olahraga di sekitarmu." />
      <Separator />
      <VenueList title="Rating tertinggi" description="Tempat olahraga dengan rating terbaik." />
      {/* <CTA /> */}
      <NavbarBottom />
    </main>
  );
}
