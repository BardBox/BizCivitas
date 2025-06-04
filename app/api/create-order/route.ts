
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, membershipId, membershipName } = body;

    // Validate required fields
    if (!amount || !currency || !membershipId || !membershipName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, return a mock order response
    // In production, you would integrate with Razorpay API here
    const mockOrder = {
      id: `order_${Date.now()}`,
      entity: 'order',
      amount: amount,
      amount_paid: 0,
      amount_due: amount,
      currency: currency,
      receipt: `receipt_${membershipId}_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: {
        membership_id: membershipId,
        membership_name: membershipName,
      },
      created_at: Math.floor(Date.now() / 1000),
    };

    return NextResponse.json(mockOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
