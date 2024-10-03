import Hero from '@/components/Hero';
import {NavbarBottom} from '@/components/navbar';
import { VenueList } from '@/components/venue';
import { Separator } from '@/components/ui/separator';
import CTA from '@/components/CTA';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col">
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <VenueList title="Pilih tempat terdekat 🥳" description="Tempat olahraga di sekitarmu." />
      </Suspense>
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <VenueList title="Rating tertinggi" description="Tempat olahraga dengan rating terbaik." />
      </Suspense>
      {/* <CTA /> */}
      <NavbarBottom />
    </main>
  );
}
