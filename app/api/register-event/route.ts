import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { sendFreeEventCelebration } from '@/lib/messaging';

const apiKey = process.env.TFT_API_KEY!;
const templateName = process.env.TFT_TEMPLATE_NAME || 'api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      business_name,
      email,
      phone,
      reason_to_attend,
      eventSlug,
      couponCode,
      amount,
      paidFor,
      utm_source,
      utm_medium,
      utm_campaign,
      referredBy
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Invalid phone number format. Please enter a valid 10-digit Indian phone number.' },
          { status: 400 }
        );
      }
    }

    // Handle LASTMINUTE coupon validation
    if (couponCode && couponCode.toUpperCase() === 'LASTMINUTE') {
      if (!phone) {
        return NextResponse.json(
          { error: 'Phone number is required for coupon redemption' },
          { status: 400 }
        );
      }

      // Check if phone number already used for LASTMINUTE coupon
      const { data: existingCouponUser, error: couponCheckError } = await supabase
        .from('attendees')
        .select('id, phone, coupon_code')
        .eq('phone', phone.trim())
        .eq('coupon_code', 'LASTMINUTE')
        .limit(1);

      if (couponCheckError) {
        console.error('Coupon check error:', couponCheckError);
        return NextResponse.json(
          { error: 'Failed to validate coupon. Please try again.' },
          { status: 500 }
        );
      }

      if (existingCouponUser && existingCouponUser.length > 0) {
        return NextResponse.json(
          { error: 'This phone number has already been used to claim the LASTMINUTE coupon. Each phone number can only claim the coupon once.' },
          { status: 409 }
        );
      }
    }


    // Insert into Supabase
    const { data, error } = await supabase
      .from('attendees')
      .insert([
        {
          name: name.trim(),
          business_name: business_name?.trim() || null,
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          reason_to_attend: reason_to_attend?.trim() || null,
          event_slug: eventSlug || null,
          coupon_code: couponCode?.toUpperCase() || null,
          amount_paid: amount || 0,
          paid_for: paidFor || null,
          referredBy: referredBy || null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          registration_type: couponCode?.toUpperCase() === 'LASTMINUTE' ? 'free_coupon' : 'regular',
          created_at: new Date().toISOString()
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // Handle duplicate email error
      if (error.code === '23505' && error.message.includes('email')) {
        return NextResponse.json(
          { error: 'This email is already registered for the event' },
          { status: 409 }
        );
      }

      // Handle duplicate phone error for coupon users
      if (error.code === '23505' && error.message.includes('phone') && couponCode?.toUpperCase() === 'LASTMINUTE') {
        return NextResponse.json(
          { error: 'This phone number has already been used to claim the LASTMINUTE coupon.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to register. Please try again.' },
        { status: 500 }
      );
    }

      await fetch(`https://official.thefuturetech.in/wapp/api/v2/send/bytemplate?apikey=${apiKey}&templatename=${templateName}&mobile=${phone?.trim() || null}&dvariables=${name.trim()},${data.id.slice(0,10)}`, {
        method: "POST",
      })

    return NextResponse.json(
      {
        success: true,
        message: couponCode?.toUpperCase() === 'LASTMINUTE'
          ? 'Free registration successful with LASTMINUTE coupon!'
          : 'Registration successful',
        registrationId: data.id,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          couponCode: data.coupon_code,
          registrationType: data.registration_type
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
