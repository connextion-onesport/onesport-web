'use client';

import React, {Suspense} from 'react';
import FieldList from './FieldList';

export default function FieldHome() {
  return (
    <Suspense>
      <FieldList title="Pilih tempat terdekat 🥳" description="Tempat olahraga di sekitarmu." />
      <FieldList title="Rating tertinggi" description="Tempat olahraga dengan rating terbaik." />
    </Suspense>
  );
}
