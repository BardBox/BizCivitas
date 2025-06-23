'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Success from '@/components/SuccessPage';
import type { Metadata } from 'next';

// Note: Metadata cannot be used in client components, 
// so we'll need to handle SEO differently if needed

function SuccessPageContent() {
  return <Success />;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
