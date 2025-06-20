import { Suspense } from 'react';
import DigitalMembershipSuccess from '@/components/DigitalMembershipSuccess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful - BizCivitas Digital Membership',
  description: 'Your BizCivitas Digital Membership payment was successful',
  robots: 'noindex, nofollow',
};

function SuccessPageContent() {
  return <DigitalMembershipSuccess />;
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
