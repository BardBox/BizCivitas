'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { gsap } from 'gsap';

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const registrationId = searchParams.get('registration_id');
  const color = searchParams.get('color') || '#10b981';
  const paidFor = searchParams.get('paid_for');
  const amount = searchParams.get('amount');
  const coupon = searchParams.get('coupon');

  // Refs for animations
  const cardRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const isFreeRegistration = coupon === 'LASTMINUTE' || amount === '0';

  useEffect(() => {
    // Simple entrance animations
    if (cardRef.current && thankYouRef.current && iconRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
      
      gsap.fromTo(iconRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.3)", delay: 0.3 }
      );
      
      gsap.fromTo(thankYouRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5 }
      );

      // Floating animation for decorative elements
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3
      });
    }
  }, []);

  return (
    <div style={{
      backgroundColor: `${hexToRgba(color, 0.1)}`
    }} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="floating-icon absolute top-20 left-20 w-6 h-6 text-yellow-400 opacity-60" />
        <Heart className="floating-icon absolute top-32 right-32 w-5 h-5 text-pink-400 opacity-60" />
        <Star className="floating-icon absolute bottom-32 left-32 w-6 h-6 text-purple-400 opacity-60" />
        <Sparkles className="floating-icon absolute bottom-20 right-20 w-5 h-5 text-blue-400 opacity-60" />
      </div>

      <div ref={cardRef} className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center relative">
        
        {/* Thank You Icon */}
        <div ref={iconRef} className="relative mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl"
            style={{ backgroundColor: color }}
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
        </div>

        {/* Thank You Message */}
        <div ref={thankYouRef}>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Thank You! 🎉
          </h1>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isFreeRegistration ? 'You\'re All Set!' : 'Payment Successful!'}
          </h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {isFreeRegistration 
            ? `Welcome aboard! You've successfully registered for ${paidFor} using the LASTMINUTE coupon.`
            : `Congratulations! Your BizCivitas ${paidFor} membership is now active. Welcome to our community!`
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
              <h4 className="font-semibold text-green-800">LASTMINUTE Coupon Applied!</h4>
            </div>
            <p className="text-sm text-green-700 text-center">
              You've successfully claimed your free event registration. Check your email for further details.
            </p>
          </div>
        )}

        {/* What's Next */}
        <div className="text-left mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              You'll receive a welcome email with access details
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              Join our exclusive member community
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            Go to Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={() => router.push('/memberships')}
            className="w-full border-2 font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-gray-50"
            style={{ borderColor: color, color: color }}
          >
            View All Memberships
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@bizcivitas.com" className="hover:underline" style={{ color }}>
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