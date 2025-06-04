
import Link from "next/link";
import { Suspense } from "react";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    payment_id?: string;
    order_id?: string;
    signature?: string;
    membership?: string;
  }>;
}

function SuccessContent({ searchParams }: { searchParams: any }) {
  const paymentId = searchParams?.payment_id;
  const orderId = searchParams?.order_id;
  const membershipName = searchParams?.membership;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Welcome to BizCivitas! Your {membershipName || 'membership'} is now active.
          </p>
        </div>
        
        {paymentId && (
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Payment ID:</span> {paymentId}</p>
              {orderId && <p><span className="font-medium">Order ID:</span> {orderId}</p>}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your membership details and next steps.
          </p>
          <div className="space-y-3">
            <Link
              href="/events"
              className="block bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200"
            >
              Explore Events
            </Link>
            <Link
              href="/insights"
              className="block text-orange-600 hover:text-orange-700 font-medium"
            >
              Read Business Insights
            </Link>
            <Link
              href="/"
              className="block text-gray-500 hover:text-gray-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Need help?</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p>📞 +91 81606 79917</p>
            <p>📩 info@bizcivitas.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    }>
      <SuccessContent searchParams={params} />
    </Suspense>
  );
}
