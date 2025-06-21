'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Success() {
  const [countdown, setCountdown] = useState(8);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const registrationId = searchParams.get('registration_id');
  const color = searchParams.get('color');
  const paidFor = searchParams.get('paid_for');
  const amount = searchParams.get('amount');
  const coupon = searchParams.get('coupon');

  const isFreeRegistration = coupon === 'GODIGITAL' || amount === '0';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div style={{
      backgroundColor: `${hexToRgba(color || '#FFFFFF', 0.2)}`
    }} className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          isFreeRegistration ? 'bg-green-100' : `bg-[${color}]/50`
        }`}>
          <CheckCircle className={`w-12 h-12 ${
            isFreeRegistration ? 'text-green-600' : 'text-gray-900'
          }`} />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isFreeRegistration ? 'Registration Successful!' : 'Payment Successful!'}
        </h1>

        <p className="text-gray-600 mb-6">
          {isFreeRegistration 
            ? `Congratulations! You've successfully registered for ${paidFor} using the GODIGITAL coupon.`
            : `Congratulations! Your BizCivitas ${paidFor} has been activated successfully.`
          }
        </p>

        {/* Registration/Payment Details */}
        {(paymentId || registrationId) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              {isFreeRegistration ? 'Registration Details' : 'Payment Details'}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              {paymentId && (
                <p><span className="font-medium">Payment ID:</span> {paymentId}</p>
              )}
              {registrationId && (
                <p><span className="font-medium">Registration ID:</span> {registrationId}</p>
              )}
              {coupon && (
                <p><span className="font-medium">Coupon Applied:</span> {coupon}</p>
              )}
              {amount && (
                <p><span className="font-medium">Amount:</span> {amount === '0' ? 'FREE' : `₹${amount}`}</p>
              )}
            </div>
          </div>
        )}

        {/* Special message for coupon users */}
        {isFreeRegistration && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h4 className="font-semibold text-green-800">GODIGITAL Coupon Applied!</h4>
            </div>
            <p className="text-sm text-green-700 text-center">
              You've successfully claimed your free event registration. Check your email for further details.
            </p>
          </div>
        )}

        {/* Membership Benefits */}
        <div className="text-left mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              You'll receive a welcome email with access details
            </li>

          </ul>
        </div>

        {/* Countdown */}
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className={`text-sm text-[${color}]`}>
            Redirecting to homepage in <span className="font-bold">{countdown}</span> seconds...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
          >
            Go to Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={() => router.push('/memberships')}
            className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            View All Memberships
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@bizcivitas.com" className="text-green-600 hover:text-green-700">
              support@bizcivitas.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


function hexToRgba(hex: string, opacity: number): string {
  let parsed = hex.replace('#', '');

  if (parsed.length === 3) {
    parsed = parsed
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}