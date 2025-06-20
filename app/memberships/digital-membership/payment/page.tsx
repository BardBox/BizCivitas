import { Suspense } from 'react';
import DigitalMembershipPayment from '@/components/DigitalMembershipPayment';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Membership Payment - BizCivitas',
  description: 'Complete your BizCivitas Digital Membership payment',
  robots: 'noindex, nofollow',
};

function PaymentPageContent() {
  return <DigitalMembershipPayment />;
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
