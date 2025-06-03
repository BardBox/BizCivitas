
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful | BizCivitas Membership",
  description: "Your BizCivitas membership payment was successful. Welcome to our community!",
};

export default function PaymentSuccessPage() {
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
          <p className="text-gray-600">Welcome to BizCivitas! Your membership is now active.</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your membership details.
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
              className="block text-gray-600 hover:text-gray-700"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
