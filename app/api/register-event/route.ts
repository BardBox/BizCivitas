import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business_name, email, phone, reason_to_attend } = body;

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
      
      return NextResponse.json(
        { error: 'Failed to register. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Registration successful',
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
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
