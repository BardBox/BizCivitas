
'use client'

import { useState } from 'react'

export default function RazorpayTest() {
  const [isLoading, setIsLoading] = useState(false)

  const handleTestPayment = async () => {
    setIsLoading(true)
    
    try {
      // Create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // ₹1 for testing
          currency: 'INR',
          receipt: `test_${Date.now()}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_erb8Nx1MrTJEfO', // Your test key
        amount: order.amount,
        currency: order.currency,
        name: 'BizCivitas',
        description: 'Test Payment',
        order_id: order.id,
        handler: function (response: any) {
          console.log('Payment Success:', response)
          alert('Payment successful! Check console for details.')
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#f97316',
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()

      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error)
        alert('Payment failed. Check console for details.')
      })

    } catch (error) {
      console.error('Error:', error)
      alert('Error creating payment. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Razorpay Test</h2>
      <p className="text-gray-600 mb-4">
        Click the button below to test a ₹1 payment using your Razorpay test credentials.
      </p>
      <button
        onClick={handleTestPayment}
        disabled={isLoading}
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Test Payment (₹1)'}
      </button>
      <p className="text-xs text-gray-500 mt-2">
        This is a test transaction. No real money will be charged.
      </p>
    </div>
  )
}
