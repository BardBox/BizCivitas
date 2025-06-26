'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PaymentFormData, PaymentProps } from '@/types/payment.types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Loading component
const LoadingSpinner = ({ text = "Processing..." }: { text?: string }) => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
    <span>{text}</span>
  </div>
);

// Error toast component
const ErrorToast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

// Success toast component
const SuccessToast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

export default function Payment({ onClose, color = "#10b981", paidFor, amount, isEvent }: Partial<PaymentProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptLoadError, setScriptLoadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount || 0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<PaymentFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      gstNumber: '',
      whyToAttend: '',
      referredBy:''
    }
  });

  // // Watch form values for validation
  // const watchedValues = watch();

  // Load Razorpay script with error handling
  const loadRazorpayScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        if (window.Razorpay) {
          setIsScriptLoaded(true);
          resolve();
        } else {
          existingScript.addEventListener('load', () => {
            setIsScriptLoaded(true);
            resolve();
          });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      script.onload = () => {
        setIsScriptLoaded(true);
        setScriptLoadError(false);
        resolve();
      };

      script.onerror = () => {
        setScriptLoadError(true);
        setErrorMessage('Failed to load payment system. Please check your internet connection.');
        reject(new Error('Script load failed'));
      };

      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadRazorpayScript().catch(console.error);

    return () => {
      // Cleanup on unmount
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [loadRazorpayScript]);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  }, []);

  // Apply coupon code function
  const applyCouponCode = useCallback(async () => {
    if (!couponCode.trim()) {
      showError('Please enter a coupon code');
      return;
    }

    // Check if INNERCIRCLE coupon (case insensitive)
    if (couponCode.toUpperCase() !== 'INNERCIRCLE') {
      showError('Invalid coupon code');
      return;
    }

    setIsCouponLoading(true);
    try {
      // Apply 100% discount for INNERCIRCLE coupon
      setFinalAmount(0);
      setCouponApplied(true);
      showSuccess('INNERCIRCLE coupon applied! 100% discount - Event is now FREE!');
    } catch (error) {
      showError('Failed to apply coupon code');
    } finally {
      setIsCouponLoading(false);
    }
  }, [couponCode, showError, showSuccess]);

  // Remove coupon function
  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setCouponApplied(false);
    setFinalAmount(amount || 0);
    showSuccess('Coupon removed');
  }, [amount, showSuccess]);

  const retryScriptLoad = useCallback(async () => {
    setIsRetrying(true);
    setScriptLoadError(false);
    setErrorMessage(null);

    try {
      await loadRazorpayScript();
      showSuccess('Payment system loaded successfully!');
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  }, [loadRazorpayScript, showSuccess]);

  const onSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Extract UTM parameters from URL
      const utmParams = {
        utm_source: searchParams.get('utm_source') || "",
        utm_medium: searchParams.get('utm_medium') || "",
        utm_campaign: searchParams.get('utm_campaign') || ""
      };

      // If coupon is applied and amount is 0, register directly without payment
      if (couponApplied && finalAmount === 0) {
        const response = await fetch('/api/register-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            business_name: data.companyName,
            email: data.email,
            phone: data.phone,
            reason_to_attend: data.whyToAttend || 'Applied INNERCIRCLE coupon',
            eventSlug: 'free-registration', // You can modify this based on your needs
            couponCode: 'INNERCIRCLE',
            amount: 0,
            paidFor,
            referredBy : data.referredBy || '',
            ...utmParams
          })
        });

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 409) {
            // Phone number already exists
            throw new Error('This phone number has already been used to claim the INNERCIRCLE coupon. Each phone number can only claim the coupon once.');
          }
          throw new Error(result.error || 'Registration failed');
        }

        if (result.success) {
          showSuccess('Registration successful! Redirecting...');
          setTimeout(() => {
            router.push(`/success?registration_id=${result.registrationId}&paid_for=${encodeURIComponent(paidFor || '')}&amount=0&coupon=INNERCIRCLE&color=${encodeURIComponent(color)}`);
          }, 1500);
          return;
        } else {
          throw new Error(result.error || 'Registration failed');
        }
      }

      // Regular payment flow
      if (!isScriptLoaded || scriptLoadError) {
        showError('Payment system is not ready. Please try reloading the page.');
        return;
      }

      // Create order with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          amount: finalAmount,
          isEvent,
          paidFor,
          whyToAttend: isEvent ? data.whyToAttend : 'no',
          ...utmParams
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Configure Razorpay with enhanced error handling
      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'BizCivitas',
        description: paidFor,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          setIsLoading(true);
          try {
            // Verify payment with timeout
            const verifyController = new AbortController();
            const verifyTimeoutId = setTimeout(() => verifyController.abort(), 30000);

            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
              signal: verifyController.signal
            });

            clearTimeout(verifyTimeoutId);
            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              showSuccess('Payment successful! Redirecting...');
              // Small delay before redirect for better UX
              setTimeout(() => {
                router.push(`/success?payment_id=${response.razorpay_payment_id}&paid_for=${encodeURIComponent(paidFor || '')}&amount=${amount}&color=${encodeURIComponent(color)}`);
              }, 1500);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            showError('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
            setIsLoading(false);
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          gstNumber: data.gstNumber || '',
          paidFor: paidFor,
          ...utmParams
        },
        theme: {
          color: color,
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            showError('Payment was cancelled. You can try again.');
          },
          escape: true,
          backdropclose: false
        },
        retry: {
          enabled: true,
          max_count: 3
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', function (response: any) {
        setIsLoading(false);
        showError(`Payment failed: ${response.error.description || 'Unknown error occurred'}`);
      });

      razorpay.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      setIsLoading(false);

      if (error.name === 'AbortError') {
        showError('Request timed out. Please check your internet connection and try again.');
      } else {
        showError(error.message || 'Something went wrong. Please try again.');
      }
    }
  };

  // Calculate GST amount
  const TotalAmount = amount;

  return (
    <>
      {/* Toast Messages */}
      {errorMessage && (
        <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      {successMessage && (
        <SuccessToast message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}

      <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center mb-2">{paidFor}</h1>
              <p className="text-blue-100 text-center">Secure payment powered by Razorpay</p>
            </div>

            {/* Script Load Error */}
            {scriptLoadError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h3 className="text-red-800 font-medium">Payment System Error</h3>
                      <p className="text-red-700 text-sm">Unable to load payment system. Please check your connection.</p>
                    </div>
                  </div>
                  <button
                    onClick={retryScriptLoad}
                    disabled={isRetrying}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {isRetrying ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' },
                      pattern: { value: /^[A-Za-z\s]+$/, message: 'First name can only contain letters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.firstName
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    placeholder="Enter first name"
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                      pattern: { value: /^[A-Za-z\s]+$/, message: 'Last name can only contain letters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.lastName
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    placeholder="Enter last name"
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.email
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Enter email address"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit Indian phone number'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.phone
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Enter 10-digit phone number"
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register('companyName', {
                      required: 'Company name is required',
                      minLength: { value: 2, message: 'Company name must be at least 2 characters' }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.companyName
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    placeholder="Enter company name"
                    disabled={isLoading}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GST Number (Optional)
                  </label>
                  <input
                    {...register('gstNumber', {
                      pattern: {
                        value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                        message: 'Please enter a valid GST number'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${errors.gstNumber
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    placeholder="Enter GST number (optional)"
                    disabled={isLoading}
                  />
                  {errors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      {errors.gstNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Event specific field */}
              {isEvent && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to attend this event?
                  </label>
                  <textarea
                    {...register('whyToAttend')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us why you're interested in attending..."
                    disabled={isLoading}
                  />
                </div>
              )}
              {isEvent && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Referred By ? (Optional)
                  </label>
                  <textarea
                    {...register('referredBy')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter the name of the person who referred you (if any)"
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Coupon Code Section */}
              {isEvent && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Coupon Code
                  </h3>

                  {!couponApplied ? (
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg"
                        placeholder="Enter coupon code"
                        disabled={isLoading || isCouponLoading}
                      />
                      <button
                        type="button"
                        onClick={applyCouponCode}
                        disabled={isLoading || isCouponLoading || !couponCode.trim()}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
                      >
                        {isCouponLoading ? (
                          <LoadingSpinner text="Applying..." />
                        ) : (
                          'Apply'
                        )}
                      </button>
                    
                    </div>
              ) : (
              <div className="flex items-center justify-between bg-green-100 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-800">INNERCIRCLE Coupon Applied!</p>
                    <p className="text-sm text-green-700">100% Discount - Event is FREE</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-green-600 hover:text-green-800 font-medium"
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>
                  )}

              <div className="mt-3 text-sm text-gray-600">
                <p>💡 Use <strong>COUPON CODES</strong> for huge discount on registration!</p>
              </div>
          </div>
              )}

          {/* Amount Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Original Amount:</span>
                <span className="text-gray-900 font-medium">₹{((amount || 0) / 1.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Added GST 18%:</span>
                <span className="text-gray-900 font-medium">₹{((amount || 0) - ((amount || 0) / 1.18)).toFixed(2)}</span>
              </div>


              {couponApplied && (
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">INNERCIRCLE Discount:</span>
                  <span className="text-green-600 font-semibold">-₹{amount}</span>
                </div>
              )}

              <div className="border-t border-blue-200 pt-2 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                  <span className={`text-2xl font-bold ${finalAmount === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                    {finalAmount === 0 ? 'FREE' : `₹${finalAmount}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || (!isScriptLoaded && finalAmount > 0)}
            className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${finalAmount === 0
              ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white'
              : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white'
              }`}
          >
            {isLoading ? (
              <LoadingSpinner text="Processing..." />
            ) : finalAmount === 0 ? (
              'Register for FREE'
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </form>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div >
      </div >
    </>
  );
}