import {VenueList} from '@/components/venue';
import {Suspense} from 'react';

export default function UserVenuesPage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VenueList
          title="Sewa lapangan terakhir kamu"
          description="Berikut adalah lapangan yang pernah kamu sewa."
        />
      </Suspense>
    </main>
  );
}
